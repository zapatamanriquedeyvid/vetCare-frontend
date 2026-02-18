import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // decodificar JWT
import NavigationBar from '../components/NavigationBar'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/sesion/login", { email, password });
      const { token } = res.data;

      // Decodificar el token JWT para obtener role y userId
      const decoded = jwtDecode(token);
      const userId = decoded.sub; // el userId está en 'sub'
      const role = decoded.rol;

      // Guardar en contexto
      setAuth({ token, role, userId });

      // Guardar en localStorage para persistencia
      localStorage.setItem("auth", JSON.stringify({ token, role, userId }));

      if(role === "CLIENTE") {
        navigate("/api/cliente/perfil");
      }else if(role === "ADMIN") {
        navigate("/api/admin/dashboard");
      } else if(role === "VETERINARIO") {
        navigate("/api/veterinario/perfil");
      } else {
        alert("Rol no autorizado");
      }

    } catch (err) {
      alert("Credenciales inválidas");
    }
  };

  return (
    <>
    <NavigationBar/>
    <div className="login-container">
      <div className="card login-card">
        <h2 className="text-center mb-4">Login Veterinaria</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Ingresar
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
