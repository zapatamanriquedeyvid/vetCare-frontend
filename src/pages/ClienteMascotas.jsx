import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ClienteMascotas() {
  const { auth ,setAuth} = useContext(AuthContext);
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const res = await api.get("/cliente/mascotas", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setCitas(res.data);
      } catch (err) {
        console.error("Error al obtener mascotas del cliente", err);
      }
    };
    fetchCitas();
  }, [auth]);

  const columns = [
    { header: "Nombre", accessor: "nombre" },
    { header: "Especie", accessor: "especie" },
    { header: "Fecha de Nacimiento", accessor: "fechaNacimiento" },
    { header: "Raza", accessor: "raza" },
    { header: "Peso Actual", accessor: "pesoActual" },
    { header: "Sexo", accessor: "sexo" },
  ];

  return (
    <div className="container mt-4 tablas">
      <h2>Lista de Mascotas del Cliente</h2>
      <br/>
      <DataTable columns={columns} data={citas} />
    </div>
  );
}

export default ClienteMascotas;