import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import Citas_cliente from '../components/Citas_cliente'
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ClienteCitas() {
  const { auth } = useContext(AuthContext);
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
        console.log(res.data);
      } catch (err) {
        console.error("Error al obtener citas del cliente", err);
      }
    };
    fetchCitas();
  }, [auth]);

  return (
    <div className="container mt-4 tablas">
      <Citas_cliente citas={citas}/>
    </div>
  );
}

export default ClienteCitas;
