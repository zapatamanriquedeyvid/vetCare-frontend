import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function AdminMascotas() {
  const { auth ,setAuth} = useContext(AuthContext);
  const [mascotas, setMascotas] = useState([]);

  const fetchMascotas = async () => {
    try {
      const res = await api.get("/admin/mascotas", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setMascotas(res.data);
    } catch (err) {
      console.error("Error al obtener mascotas del cliente", err);
    }
  };
  useEffect(() => {
    fetchMascotas();
  }, [auth]);

  const columns = [
    { header: "IdMascota", accessor: "idMascota" },
    { header: "Nombre del Cliente", accessor: "nombreCliente" },
    { header: "Especie", accessor: "especie" },
    { header: "Fecha de Nacimiento", accessor: "fechaNacimiento" },
    { header: "Nombre de la Mascota", accessor: "nombre" },
    { header: "Peso Actual", accessor: "pesoActual" },
    { header: "Raza", accessor: "raza" },
    { header: "Sexo", accessor: "sexo" },
    { header: "Acciones", accessor: "acciones" },
  ];

  return (
    <div className="container mt-4 tablas">
      <h2>Lista de Mascotas</h2>
      <br/>
      <DataTable columns={columns} data={mascotas} endpoint="/admin/mascotas" onRefresh={fetchMascotas} />
    </div>
  );
}

export default AdminMascotas;
