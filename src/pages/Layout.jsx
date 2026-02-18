import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Layout() {
  return (
    <div className="d-flex">
      {/* Barra lateral fija */}
      <Sidebar />

      {/* Contenido dinámico */}
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
