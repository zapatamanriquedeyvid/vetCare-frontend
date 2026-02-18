import React, { useEffect, useState, useContext } from "react";
import { Card } from "react-bootstrap";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import CalendarioIcon from "../Icons/CalendarioIcon";

function CitasAtendidasHoy() {
  const [citas, setCitas] = useState(0);
  const { auth } = useContext(AuthContext);

  const fetchCitas = async () => {
    try {
      const res = await api.get("/kpis/citas-atendidas-hoy", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setCitas(res.data);
    } catch (err) {
      console.error("Error al obtener citas atendidas", err);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Citas Atendidas/hoy <CalendarioIcon size={24} color="#0d6efd"/></Card.Title>
        <h2>{citas}</h2>
      </Card.Body>
    </Card>
  );
}

export default CitasAtendidasHoy;
