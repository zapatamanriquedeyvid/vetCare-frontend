import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import "../assets/css/veterinarioMascotas.css";

export default function VeterinarioMascotas() {
  const { idCliente } = useParams();
  const [mascota, setMascota] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Obtener datos de la mascota
        const resMascota = await api.get(`/veterinario/mascotas/${idCliente}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setMascota(resMascota.data);
        console.log(resMascota.data);
      } catch (err) {
        console.error("Error al cargar datos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idCliente, auth.token]);

  if (loading)
    return (
      <div className="container-mascotas">
        <p>Cargando información...</p>
      </div>
    );
  if (!mascota)
    return (
      <div className="container-mascotas">
        <p>No se encontró la mascota.</p>
      </div>
    );

  return (
    <div className="container mt-4 tablas">
      <button onClick={() => navigate(-1)} className="btn-regresar">
        ← Regresar
      </button>
      <div className="row g-4">
        {mascota.map((item, index) => (
          <div className="col-12 col-md-6 col-lg-4" key={index}>
            <div className="card card-mascota">
              {/* Cabecera: Imagen, Nombre y Sexo */}
              <div className="d-flex align-items-start mb-4">
                <div className="img-container">
                  <img
                    src={`https://ui-avatars.com/api/?name=${item.nombre}&background=random`}
                    alt={item.nombre}
                    className="img-mascota"
                  />
                  <span className="badge-especie">{item.especie}</span>
                </div>

                <div className="ms-3 flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3 className="h4 fw-bold mb-0" style={{ color: "#333" }}>
                      {item.nombre}
                    </h3>
                    <div
                      className={`gender-icon ${item.sexo === "H" ? "bg-danger-subtle text-danger" : "bg-primary-subtle text-primary"}`}
                    >
                      {item.sexo === "H" ? "♀" : "♂"}
                    </div>
                  </div>
                  <p className="text-muted small fw-medium mb-0">{item.raza}</p>
                </div>
              </div>

              {/* Bloques de Información */}
              <div className="row g-2 mb-4">
                <div className="col-6">
                  <div className="info-box">
                    <span className="fs-4 text-secondary opacity-50">📅</span>
                    <div>
                      <p className="info-label">Nacimiento</p>
                      <p className="info-value">{item.fechaNacimiento}</p>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="info-box">
                    <span className="fs-4 text-secondary opacity-50">⚖️</span>
                    <div>
                      <p className="info-label">Peso</p>
                      <p className="info-value">{item.pesoActual} kg</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
