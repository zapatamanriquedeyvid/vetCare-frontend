import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Citas_cliente from '../components/Citas_cliente'

function VeterinarioCitas() {
  const { auth } = useContext(AuthContext);
  const [citas, setCitas] = useState([]);

    useEffect(() => {
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

    fetchCitas();
  }, [auth]);



  return (
    <div className="container mt-4 tablas">
      <h2>Lista de Mis Citas</h2>
      <br/>
      <Citas_cliente citas={citas} auth={auth}/> 
    </div>
  );
}

export default VeterinarioCitas;
