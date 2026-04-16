import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import ListaMascotas from "../components/ListaMascotas";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


function ClienteMascotas() {
  const { auth } = useContext(AuthContext);
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

  return (
    <div className="container mt-4 tablas">
      <h2>Lista de Mascotas del Cliente</h2>
      <br/>
      <ListaMascotas data={citas}/>
    </div>
  );
}

export default ClienteMascotas;