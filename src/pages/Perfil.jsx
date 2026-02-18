import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const { auth ,setAuth} = useContext(AuthContext);
  const [perfil, setPerfil] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(!auth) return;

    let endpoint = "";
    if(auth.role === "CLIENTE") {
      endpoint = "/cliente/perfil";
    }else if(auth.role === "VETERINARIO") {
      endpoint = "/veterinario/perfil";
    }else if(auth.role === "ADMIN") {
      endpoint = "/admin/perfil";
    } else {
      alert("Rol no autorizado");
      return;
    }

    api.get(endpoint, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    .then((res) => {
      setPerfil(res.data);
    })
    .catch((err) => {
      console.error("Error al obtener perfil", err);
    });

  }, [auth]);


  if (!perfil) return <p className="text-center mt-5">Cargando perfil...</p>;

  return (
    <div className="perfil-container">
      <div className="card perfil-card">
        <div className="perfil-header">
          <h2>
            {`Perfil de ${auth.role.charAt(0).toUpperCase() + auth.role.slice(1).toLowerCase()}`}
          </h2>
        </div>
        <div className="perfil-body">
          <p><strong>Nombre:</strong> {perfil.nombre}</p>
          <p><strong>Apellido:</strong> {perfil.apellido}</p>
          <p><strong>Email:</strong> {perfil.email}</p>
          <p><strong>Teléfono:</strong> {perfil.telefono}</p>
          {auth.role === "CLIENTE" && (
            <>
              <p><strong>DNI:</strong> {perfil.dni}</p>
              <p><strong>Dirección:</strong> {perfil.direccion}</p>
            </>
          )}
          {auth.role === "VETERINARIO" && (
            <p><strong>Especialidad:</strong> {perfil.especialidad}</p>
          )}
        </div>
      </div>
    </div>
  );
}
