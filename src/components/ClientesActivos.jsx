import React, { useEffect, useState, useContext } from "react";
import { Card } from "react-bootstrap";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import ClientesIcon from "../Icons/ClientesIcon";

function ClientesActivos( ) {
  const [activos, setActivos] = useState(0);
  const { auth, setAuth } = useContext(AuthContext);

  const ClientesActivos = async () => {
    try {
      const res = await api.get("/kpis/clientes-activos", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setActivos(res.data);
    } catch (err) {
      console.error("Error al obtener clientes Activos", err);
    }
  };

  useEffect(() => {
    ClientesActivos();
  }, []);

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Clientes Activos <ClientesIcon size={24} color="#0d6efd"/></Card.Title>
        <h2>{activos}</h2>
      </Card.Body>
    </Card>
    
  );
}

export default ClientesActivos;
