import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "../assets/css/perfil.css";
import user from "../assets/svg/user.svg";
import correo from "../assets/svg/correo.svg";
import telefono from "../assets/svg/telefono.svg";
import direccion from "../assets/svg/direccion.svg";
import especialidades from "../assets/svg/especialidades.svg";

export default function Perfil() {
  const { auth } = useContext(AuthContext);
  const [perfil, setPerfil] = useState(null);
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    if (!auth) return;

    let endpoint = "";
    if (auth.role === "CLIENTE") {
      endpoint = "/cliente/perfil";
    } else if (auth.role === "VETERINARIO") {
      endpoint = "/veterinario/perfil";
    } else if (auth.role === "ADMIN") {
      endpoint = "/admin/perfil";
    } else {
      alert("Rol no autorizado");
      return;
    }

    // Obtener perfil
    api
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        setPerfil(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener perfil", err);
      });

    // Obtener citas si es cliente
    if (auth.role === "CLIENTE") {
      api
        .get("/cliente/citas", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((res) => {
          setCitas(res.data);
        })
        .catch((err) => {
          console.error("Error al obtener citas", err);
        });
    } else if (auth.role === "VETERINARIO") {
      api
        .get("/veterinario/citas", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);

          setCitas(res.data);
        })
        .catch((err) => {
          console.error("Error al obtener citas", err);
        });
    }
  }, [auth]);

  if (!perfil) return <p className="text-center mt-5">Cargando perfil...</p>;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0); // inicio del día

  const proximasCitas = citas
    .filter((cita) => {
      const fecha = new Date(cita.fechaCita);
      fecha.setHours(0, 0, 0, 0); // inicio del día de la cita
      return fecha >= hoy;
    })
    .sort((a, b) => new Date(a.fechaCita) - new Date(b.fechaCita))
    .slice(0, 3);

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {/* LADO IZQUIERDO: PERFIL ESTILO IMAGEN */}
        <div className="col-md-5 col-lg-4 " >
          <div className="perfil-container shadow-sm h-100">
            <div className="perfil-header ">
              <div className="perfil-avatar-circle">
                <i className="bi bi-person">
                  <img src={user} />
                </i>
              </div>
              <div>
                <h3 className="perfil-nombre">{`${perfil.nombre} ${perfil.apellido}`}</h3>
                <p className="perfil-subtitulo">
                  {auth.role === "CLIENTE"
                    ? "Cliente veterinaria VetCare"
                    : "Veterinario VetCare"}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="info-row">
              <div className="info-icon">
                <i className="bi bi-envelope">
                  <img src={correo} />
                </i>
              </div>
              <div className="info-content">
                <span className="info-label">Correo</span>
                <p className="info-value">{perfil.email}</p>
              </div>
            </div>

            {/* Teléfono */}
            <div className="info-row">
              <div className="info-icon">
                <i className="bi bi-telephone">
                  <img src={telefono} />
                </i>
              </div>
              <div className="info-content">
                <span className="info-label">Teléfono</span>
                <p className="info-value">{perfil.telefono}</p>
              </div>
            </div>

            {auth.role === "CLIENTE" && (
              <>
                {/* Dirección */}
                <div className="info-row">
                  <div className="info-icon">
                    <i className="bi bi-geo-alt">
                      <img src={direccion} />
                    </i>
                  </div>
                  <div className="info-content">
                    <span className="info-label">Dirección</span>
                    <p className="info-value">{perfil.direccion}</p>
                  </div>
                </div>
              </>
            )}

            {auth.role === "VETERINARIO" && (
              <div className="info-row">
                <div className="info-icon">
                  <i className="bi bi-award">
                    <img src={especialidades} />
                  </i>
                </div>
                <div className="info-content">
                  <span className="info-label">Especialidad</span>
                  <p className="info-value">{perfil.especialidad}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* LADO DERECHO: PRÓXIMAS CITAS */}
        <div className="col-md-7 col-lg-8">
          <div className="card shadow-sm citas-card">
            <div className="card-header bg-primary text-white py-3">
              <h4 className="mb-0 fs-5">Próximas Citas</h4>
            </div>
            <div className="card-body p-4">
              {proximasCitas.length === 0 ? (
                <p className="text-muted text-center py-4">
                  No tienes citas próximas
                </p>
              ) : (
                <div className="row">
                  {proximasCitas.map((cita, index) => (
                    <div key={index} className="col-12 mb-3">
                      <div className="p-3 border rounded-3 bg-white shadow-sm border-start  border-4">
                        <div className="row">
                          <div className="col-sm-6">
                            <p className="mb-1">
                              <strong>📅 Fecha:</strong> {cita.fechaCita}
                            </p>
                            <p className="mb-1">
                              <strong>⏰ Hora:</strong> {cita.horaCita}
                            </p>
                          </div>
                          <div className="col-sm-6 text-sm-end">
                            {auth.role === "CLIENTE" ? (
                              <>
                                <p className="mb-1 text-primary">
                                  <strong>🐾 Mascota: </strong>
                                  {cita.nombreMascota}
                                </p>
                                <p className="mb-0 text-muted small">
                                  Dr. {cita.nombreVeterinario}
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="mb-0 text-muted small">
                                  <strong>👤 Cliente: </strong>{cita.nombreCliente}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
