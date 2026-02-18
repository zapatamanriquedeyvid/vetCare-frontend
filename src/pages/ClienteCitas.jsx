import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ClienteCitas() {
  const { auth ,setAuth} = useContext(AuthContext);
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const res = await api.get("/cliente/citas", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setCitas(res.data);
      } catch (err) {
        console.error("Error al obtener citas del cliente", err);
      }
    };
    fetchCitas();
  }, [auth]);

  const columns = [
    { header: "Fecha de Cita", accessor: "fechaCita" },
    { header: "Hora de Cita", accessor: "horaCita" },
    { header: "Estado", accessor: "estado" },
    { header: "Motivo", accessor: "motivo" },
    { header: "Veterinario", accessor: "nombreVeterinario" },
    { header: "Mascota", accessor: "nombreMascota" },
  ];

  return (
    <div className="container mt-4 tablas">
      <h2>Lista de Mis Citas</h2>
      <br/>
      <DataTable columns={columns} data={citas} />
    </div>
  );
}

export default ClienteCitas;
