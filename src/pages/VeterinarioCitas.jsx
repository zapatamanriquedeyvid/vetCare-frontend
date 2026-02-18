import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function VeterinarioCitas() {
  const { auth ,setAuth} = useContext(AuthContext);
  const [citas, setCitas] = useState([]);

  const fetchCitas = async () => {
    try {
      const res = await api.get("/veterinario/citas", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setCitas(res.data);
    } catch (err) {
      console.error("Error al obtener citas del veterinario", err);
    }
  };
  useEffect(() => {
    fetchCitas();
  }, [auth]);

  const columns = [
    { header: "IdCita", accessor: "idcita" },
    { header: "Nombre del Cliente", accessor: "nombreCliente" },
    { header: "Fecha de Cita", accessor: "fechaCita" },
    { header: "Hora de Cita", accessor: "horaCita" },
    { header: "Estado", accessor: "estado" },
    { header: "Motivo", accessor: "motivo" },
    { header: "Mascota", accessor: "nombreMascota" },
  ];

  return (
    <div className="container mt-4 tablas">
      <h2>Lista de Mis Citas</h2>
      <br/>
      <DataTable columns={columns} data={citas} endpoint="/veterinario/citas"onRefresh={fetchCitas}  />
    </div>
  );
}

export default VeterinarioCitas;
