import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function AdminClientes() {
  const { auth, setAuth } = useContext(AuthContext);
  const [clientes, setClientes] = useState([]);

  const fetchClientes = async () => {
    try {
      const res = await api.get("/admin/clientes", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setClientes(res.data);
    } catch (err) {
      console.error("Error al obtener clientes", err);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, [auth]);

  const columns = [
    { header: "IdCliente", accessor: "idCliente" },
    { header: "Nombre", accessor: "nombre" },
    { header: "Apellido", accessor: "apellido" },
    { header: "Dni", accessor: "dni" },
    { header: "Direccion", accessor: "direccion" },
    { header: "Telefono", accessor: "telefono" },
    { header: "Email", accessor: "email" },
    { header: "Estado", accessor: "estado" },
    { header: "Acciones", accessor: "acciones" },
  ];

  return (
    <div className="container mt-4 tablas">
      <h2>Lista de Clientes</h2>
      <br/>
      <DataTable columns={columns} data={clientes} endpoint="/admin/clientes"  onRefresh={fetchClientes}/>
    </div>
  );
}

export default AdminClientes;
