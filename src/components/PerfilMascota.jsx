import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "../assets/css/PerfilMascota.css"; // Importamos el CSS

export default function PerfilMascota() {
  const { idMascota } = useParams();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [mascota, setMascota] = useState(null);
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Obtener datos de la mascota
        const resMascota = await api.get(`/cliente/perfil/mascota/${idMascota}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setMascota(resMascota.data);

        // 2. Obtener citas de la mascota
        const resCitas = await api.get(`/cliente/citas/mascota/${idMascota}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });

        // Ordenar citas por fecha y hora (más reciente primero)
        const citasOrdenadas = [...resCitas.data].reverse();
        
        setCitas(citasOrdenadas);
      } catch (err) {
        console.error("Error al cargar datos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idMascota, auth.token]);

  const calcularEdad = (fechaNacimiento) => {
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    if (hoy.getMonth() < nacimiento.getMonth() || (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  if (loading) return <div className="container-mascotas"><p>Cargando información...</p></div>;
  if (!mascota) return <div className="container-mascotas"><p>No se encontró la mascota.</p></div>;

  return (
    <div className="container-mascotas animate-entry">
      <div className="perfil-card animate-entry">
        <button onClick={() => navigate(-1)} className="btn-regresar">
          ← Regresar
        </button>

        <div className="header-mascota">
          <div className="avatar-mascota">
            {mascota.especie?.toLowerCase() === "gato" ? "🐱" : "🐶"}
          </div>
          <div>
            <h1 className="nombre-mascota">{mascota.nombre}</h1>
            <p className="subtitulo-mascota">
              {mascota.especie} · {calcularEdad(mascota.fechaNacimiento)} años
            </p>
          </div>
        </div>

        <div className="grid-info">
          <InfoItem label="Raza" value={mascota.raza} icon="🐾" />
          <InfoItem label="Nacimiento" value={mascota.fechaNacimiento} icon="📅" />
          <InfoItem label="Peso" value={`${mascota.pesoActual} kg`} icon="⚖️" />
          <InfoItem label="Sexo" value={mascota.sexo} icon="❤️" />
        </div>
      </div>


      <h2 className="titulo-seccion">Citas de {mascota.nombre} ({citas.length})</h2>
      <div className="grid-citas">
        {citas.map((cita) => (
          <div key={cita.id} className="cita-card animate-entry">
            <div className="cita-header">
              <span className={`badge ${cita.estado === 'ATENDIDA' ? 'badge-atendida' : 'badge-pendiente'}`}>
                {cita.estado}
              </span>
            </div>
            <h3 className="cita-motivo">{cita.motivo || "Revisión general"}</h3>
            <div className="cita-detalle">📅 {cita.fechaCita}</div>
            <div className="cita-detalle">🕒 {cita.horaCita}</div>
            <div className="cita-detalle">🩺 {cita.nombreVeterinario || "Dr. asignado"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoItem({ label, value, icon }) {
  return (
    <div className="info-item">
      <span className="info-icon">{icon}</span>
      <div>
        <div className="info-label">{label}</div>
        <div className="info-value">{value}</div>
      </div>
    </div>
  );
}