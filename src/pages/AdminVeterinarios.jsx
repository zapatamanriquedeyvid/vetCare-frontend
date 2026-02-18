import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function AdminVeterinarios() {
  const { auth ,setAuth} = useContext(AuthContext);
  const [veterinarios, setVeterinarios] = useState([]);

  const fetchVeterinarios = async () => {
    try {
      const res = await api.get("/admin/veterinarios", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setVeterinarios(res.data);
    } catch (err) {
      console.error("Error al obtener veterinarios del admin", err);
    }
  };
  useEffect(() => {
    fetchVeterinarios();
  }, [auth]);

  const columns = [
    { header: "IdVeterinario", accessor: "idVeterinario" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Apellido", accessor: "apellido" },
    { header: "Especialidad", accessor: "especialidad" },
    { header: "Email", accessor: "email" },
    { header: "Telefono", accessor: "telefono" },
    { header: "Estado", accessor: "estado" },
    { header: "Acciones", accessor: "acciones" },

  ];

  return (
    <div className="container mt-4 tablas">
      <h2>Lista de Veterinarios</h2>
      <br/>
      <DataTable columns={columns} data={veterinarios} endpoint="/admin/veterinarios" onRefresh={fetchVeterinarios} />
    </div>
  );
}

export default AdminVeterinarios;