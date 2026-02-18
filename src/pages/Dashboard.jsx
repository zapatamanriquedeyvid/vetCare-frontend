import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ClientesActivos from "../components/ClientesActivos";
import CitasAtendidasHoy from "../components/CitasAtendidasHoy";
import VeterinariosActivos from "../components/VeterinariosActivos";
import CitasMes from "../components/CitasMes";
import CitasPorMes from "../components/CitasPorMes";
import TopVeterinarios from "../components/TopVeterinarios";
import ReporteDinamicoPDF from "../components/ReporteDinamicoPDF";


function Dashboard() {
  const anioActual = new Date().getFullYear();

  return (
    <Container fluid className="mt-4">
      <h1 className="text-center mb-4">Panel de Control Veterinaria</h1>

      {/* Sección de KPIs principales */}
      <Row className="mb-4">
        <Col md={3}>
          <ClientesActivos />
        </Col>
        <Col md={3}>
          <CitasAtendidasHoy />
        </Col>
        <Col md={3}>
          <VeterinariosActivos />
        </Col>
        <Col md={3}> 
          <CitasMes />
        </Col>
      </Row>

      {/* Sección de reportes o gráficos */}
      <Row className="mb-4">
        <Col md={6}>
          <div className="p-3 border rounded bg-light">
            <CitasPorMes anio={anioActual}/>
          </div>
        </Col>
        <Col md={6}>
          <div className="p-3 border rounded bg-light">
            <h4>Citas Atendidas por Veterinario</h4>
            <TopVeterinarios/> 
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="p-4 border rounded bg-light">
            <ReporteDinamicoPDF/>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;

