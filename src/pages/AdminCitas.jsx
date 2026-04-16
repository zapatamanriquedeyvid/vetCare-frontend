import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function AdminCitas() {
  const { auth } = useContext(AuthContext);
  const [citas, setCitas] = useState([]);

  const fetchCitas = async () => {
    try {
      const res = await api.get("/admin/citas", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setCitas(res.data);
    } catch (err) {
      console.error("Error al obtener citas del admin", err);
    }
  };
  
  useEffect(() => {
    fetchCitas();
  }, [auth]);

  const columns = [
    { header: "IdCita", accessor: "idCita" },
    { header: "Nombre del Cliente", accessor: "nomCompCli" },
    { header: "Veterinario", accessor: "nomCompVet" },
    { header: "Nombre de la Mascota", accessor: "nombreMascota" },
    { header: "Fecha de Cita", accessor: "fechaCita" },
    { header: "Hora de Cita", accessor: "horaCita" },
    { header: "Motivo", accessor: "motivo" },
    { header: "Estado", accessor: "estado" },
    { header: "Acciones", accessor: "acciones" },
  ];

  return (
    <div className="w-100 mt-4 tablas">
      <h2>Lista de Citas</h2>

      <br/>
      <DataTable columns={columns} data={citas} endpoint="/admin/citas" onRefresh={fetchCitas} />
    </div>
  );
}

export default AdminCitas;