import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, allowedRoles }) {
  const { auth } = useContext(AuthContext);

  // Si no está autenticado, redirigir al login
  if (!auth) {
    return <Navigate to="/api/sesion/login" />;
  }

  if (!allowedRoles.includes(auth.role)) {
    return (
      <>
        <p>No tienes permisos para acceder</p>
        <Navigate to="/api/sesion/login" />
      </>
    );
  }
  

  return children;
}
 