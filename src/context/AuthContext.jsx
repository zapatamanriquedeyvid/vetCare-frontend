import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedAuth = localStorage.getItem("auth");
  const [auth, setAuth] = useState(storedAuth ? JSON.parse(storedAuth) : null);
  const navigate = useNavigate();

  // Al montar el contexto, intenta recuperar la sesión guardada
  useEffect(() => {
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      //Decodificar el token JWT para obtener expiracion
      const decoded = jwtDecode(parsed.token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("auth");
        setAuth(null);
        navigate("/api/sesion/login");
      } else {
        setAuth(parsed);
        //Calcular cuánto falta para expirar
        const tiempoRestante = decoded.exp * 1000 - Date.now();
        // Programar cierre de sesión automático
        const timer = setTimeout(() => {
          localStorage.removeItem("auth");
          setAuth(null);
          navigate("/api/sesion/login");
        }, tiempoRestante);
        return () => clearTimeout(timer);
      }
    }
  },[storedAuth, navigate]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
