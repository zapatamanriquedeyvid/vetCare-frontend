import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./api/PrivateRoute";
import AdminClientes from './pages/AdminClientes';
import ClienteCitas from './pages/ClienteCitas';
import ClienteMascotas from './pages/ClienteMascotas';
import AdminMascotas from './pages/AdminMascotas';
import AdminCitas from './pages/AdminCitas';
import AdminVeterinarios from './pages/AdminVeterinarios';
import VeterinarioCitas from './pages/VeterinarioCitas';
import VeterinarioClientes from './pages/VeterinarioClientes';
import VeterinarioMascotas from './pages/VeterinarioMascotas';
import Dashboard from './pages/Dashboard';
import Layout from "./pages/Layout";
import Index from "./pages/Index";
import PerfilMascota from "./components/PerfilMascota";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Pagina principal*/}
          <Route path="/" element={<Index />} />
          <Route path="/api/sesion/login" element={<Login />} />


          {/* consultas cliente*/}
          <Route path="/api/cliente" element={<Layout />}>
            <Route path="perfil" element={<Perfil />} />
            <Route path="mascotas" element={<PrivateRoute allowedRoles={["CLIENTE"]}><ClienteMascotas /></PrivateRoute>} />
            <Route path="mascota/:idMascota" element={<PerfilMascota />} />
            <Route path="citas" element={<PrivateRoute allowedRoles={["CLIENTE"]}><ClienteCitas /></PrivateRoute>} />
          </Route>

          {/* consultas admin */}
          <Route path="/api/admin" element={<Layout />}>
            <Route path="dashboard" element={<PrivateRoute allowedRoles={["ADMIN"]}><Dashboard /></PrivateRoute>} />
            <Route path="clientes" element={<PrivateRoute allowedRoles={["ADMIN"]}><AdminClientes /></PrivateRoute>} />
            <Route path="mascotas" element={<PrivateRoute allowedRoles={["ADMIN"]}><AdminMascotas /></PrivateRoute>} />

            <Route path="citas" element={<PrivateRoute allowedRoles={["ADMIN"]}><AdminCitas /></PrivateRoute>} />
            <Route path="veterinarios" element={<PrivateRoute allowedRoles={["ADMIN"]}><AdminVeterinarios /></PrivateRoute>} />
          </Route>

          {/*consultas veterinario */}
          <Route path="/api/veterinario" element={<Layout />}>
            <Route path="perfil" element={<Perfil />} />
            <Route path="citas" element={<PrivateRoute allowedRoles={["VETERINARIO"]}><VeterinarioCitas /></PrivateRoute>} />
            <Route path="Clientes" element={<PrivateRoute allowedRoles={["VETERINARIO"]}><VeterinarioClientes /></PrivateRoute>} />
            <Route path="mascotas/:idCliente" element={<VeterinarioMascotas />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

