import React, { useContext, useEffect, useState } from "react";
import {Card} from 'react-bootstrap'
import api from '../api/axios'
import { AuthContext } from "../context/AuthContext";
import Grafico from "../Icons/Grafico";
function CitasMes() {
  const [citas,setCitas] = useState(0);
  const {auth} = useContext(AuthContext);
  
  const fetchCitasMes = async () =>{
    try{
      const res = await api.get("/kpis/citas-mes",{
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      setCitas(res.data);
    } catch (err) {
      console.error("Error al obtener citas del mes", err);
    }
  };
  useEffect(()=>{
    fetchCitasMes();
  },[]);


  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Citas Registradas/Mes <Grafico size={24} color="#0d6efd"/></Card.Title> <h2>{citas}</h2>
      </Card.Body>
    </Card>
  );
}

export default CitasMes;
