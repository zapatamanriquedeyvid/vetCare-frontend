import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "../assets/css/MisCitas.css"; // para estilos adicionales
import pata from "../assets/svg/pata.svg";

const formatFecha = (fechaISO) => {
  const fecha = new Date(fechaISO);
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(fecha);
};

//CITAS del veterinario:
//idcita,nombreCliente,fechaCita,horaCita,estado,motivo,nombreMascota

//CITAS del cliente:
//nombreVeterinario,fechaCita,horaCita,estado,motivo,nombreMascota

function Citas_cliente({ citas, auth }) {
  const [filter, setFilter] = useState("TODAS");

  const rol = auth.role;

  const filteredCitas =
    (filter === "TODAS" ? citas : citas.filter((cita) => cita.estado.toUpperCase() === filter))
      .slice()
      .sort((a, b) => Number(b.idcita) - Number(a.idcita));

  const getEstadoClass = (estado) => {
    switch (estado.toUpperCase()) {
      case "PENDIENTE":
        return "estado-pendiente";
      case "ATENDIDA":
        return "estado-atendida";
      case "CANCELADA":
        return "estado-cancelada";
      default:
        return "estado-default";
    }
  };


  return (
    <div className="container my-4">
      {/* Filtros */}
      <ul className="nav nav-tabs mb-4">
        {["TODAS", "PENDIENTE", "ATENDIDA", "CANCELADA"].map((estado) => (
          <li className="nav-item" key={estado}>
            <button
              className={`nav-link ${filter === estado ? "active" : "inactive"}`}
              onClick={() => setFilter(estado)}
            >
              {estado.charAt(0) + estado.slice(1).toLowerCase()}
            </button>
          </li>
        ))}
      </ul>

      {/* Lista de citas */}
      <div className="citas-list">
        {filteredCitas.map((cita, index) => (
          <div
          className={`cita-item  p-3 mb-3 rounded border-${cita.estado.toLowerCase()}`}
          key={index}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="d-flex ">
                <img src={pata} />
                <h2 className="mx-2 my-0">{cita.nombreMascota}</h2>
              </div>
              <span className={`badge ${getEstadoClass(cita.estado)}`}>
                {cita.estado}
              </span>
            </div>
            <p className="mb-1">
              <b>Motivo: </b> {cita.motivo}
            </p>
            {rol === "CLIENTE" ? 
              <p className="mb-0"><b>👩‍⚕️ Veterinario:</b> {cita.nombreVeterinario}</p>
            : 
              <>
                <p className="mb-0"><b>🙍‍♂️ Dueño:</b> {cita.nombreCliente} </p>
              </>
            }
            <p className="mb-1"><b>📅 Fecha:</b> {formatFecha(cita.fechaCita)}</p>
            <p className="mb-1"><b>🕒 Hora:</b> {cita.horaCita}</p>
          </div>
        ))}
        {filteredCitas.length === 0 && (
          <p className="text-muted">No hay citas en esta categoría.</p>
        )}
      </div>
    </div>
  );
}

export default Citas_cliente;
