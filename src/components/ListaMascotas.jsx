import { Link } from "react-router-dom";

export default function ListaMascotas({ data }) {
  const calcularEdad = (fechaNacimiento) => {
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {data.map((mascota) => (
        <Link
          key={mascota.idMascota}
          to={`/api/cliente/mascota/${mascota.idMascota}`}
          style={{
            flex: "1 0 calc(33.333% - 16px)",
            maxWidth: "calc(33.333% - 16px)",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #e0e0e0",
              backgroundColor: "#f7f7f7",
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#efefef";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f7f7f7";
            }}
          >
            {/* IZQUIERDA */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              
              {/* ICONO */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#e6f0ea",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                🐶
              </div>

              {/* TEXTO */}
              <div>
                <div style={{ fontWeight: "600", fontSize: "16px", color: "#333" }}>
                  {mascota.nombre}
                </div>
                <div style={{ fontSize: "14px", color: "#666" }}>
                  {mascota.raza}
                </div>
                <div style={{ fontSize: "12px", color: "#888" }}>
                  {calcularEdad(mascota.fechaNacimiento)} años · {mascota.pesoActual} kg
                </div>
              </div>
            </div>

            {/* DERECHA */}
            <div style={{ fontSize: "18px", color: "#888" }}>
              ›
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

