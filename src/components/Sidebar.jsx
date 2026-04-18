import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from '../assets/img/logo.png';
import out from '../assets/svg/out.svg'

const menuConfig = {
  ADMIN: [
    { label: "Dashboard", path: "/api/admin/dashboard" },
    { label: "Clientes", path: "/api/admin/clientes" },
    { label: "Mascotas", path: "/api/admin/mascotas" },
    { label: "Citas", path: "/api/admin/citas" },
    { label: "Veterinarios", path: "/api/admin/veterinarios" },
  ],
  VETERINARIO: [
    { label: "Perfil", path: "/api/veterinario/perfil" },
    { label: "Citas", path: "/api/veterinario/citas" },
    { label: "Clientes", path: "/api/veterinario/Clientes" },
  ],
  CLIENTE: [
    { label: "Perfil", path: "/api/cliente/perfil" },
    { label: "Mis Mascotas", path: "/api/cliente/mascotas" },
    { label: "Mis Citas", path: "/api/cliente/citas" },
  ],
};


function Sidebar() {
  const navigate = useNavigate();
  const { auth,setAuth } = useContext(AuthContext); // Obtener el contexto de autenticación
  if (!auth) return null;
  const role = auth.role;
  const items = menuConfig[role] || [];

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    navigate("/api/sesion/login");
  };  

  return (
    <div className="bg-white text-black d-flex flex-column justify-content-between align-items-center vh-100 p-3"  style={{ width: "350px", minHeight: "100vh" }}>
      <div style={{width:"250px" }}>
        <img src={logo} alt="Logo VetCare" className="img-fluid mb-3" />
        <ul className="nav flex-column">
          {items.map((item, index) => (
            <li className="nav-item" key={index} >
              <NavLink to={item.path} style={{borderRadius:10}} className={({ isActive }) => isActive ? "nav-link text-black active-link" : "nav-link text-black"} >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button className="btn btn-danger btn-sm fs-5 p-2" onClick={handleLogout}>
          <img src={out} alt="Cerrar sesión" className="me-2" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
