import React, { useState, useContext } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Container, Row, Col } from "react-bootstrap";

function ReporteDinamicoPDF() {
  const [tipoReporte, setTipoReporte] = useState("CITAS_DEL_MES");
  const [filtro, setFiltro] = useState("TODAS");
  const { auth } = useContext(AuthContext);

  // Opciones dinámicas según el tipo de reporte
  const opcionesFiltro = {
    CITAS_DEL_MES: ["TODAS", "ATENDIDA", "PENDIENTE", "CANCELADA"],
    CLIENTES: ["TODOS", "ACTIVO", "INACTIVO"],
    VETERINARIOS: ["TODOS", "ACTIVO", "INACTIVO"],
    MASCOTAS_PESO: ["TODOS", ">0", ">10", ">20", ">30"],
  };

  const generarPDF = async () => {
    try {
      let url = "";
      if (tipoReporte === "CITAS_DEL_MES") {
        url = `/reportes/citas-mes?estado=${filtro}`;
      } else if (tipoReporte === "CLIENTES") {
        url = `/reportes/clientes?filtro=${filtro}`;
      } else if (tipoReporte === "VETERINARIOS") {
        url = `/reportes/veterinarios?filtro=${filtro}`;
      } else if (tipoReporte === "MASCOTAS_PESO") {
        url = `/reportes/mascotas?filtro=${filtro}`;
      }

      const res = await api.get(url, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      const datos = res.data;
    let orientacion = "portrait"; // valor por defecto
    if (tipoReporte === "CLIENTES" || tipoReporte === "VETERINARIOS") {
      orientacion = "landscape"; // ejemplo: horizontales para tablas largas
    }

    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: orientacion,
    });

      doc.setFontSize(16);
      doc.text("REPORTES VETERINARIA", 14, 20);
      doc.setFontSize(12);
      doc.text(`Tipo: ${tipoReporte}`, 14, 30);
      doc.text(`Filtro: ${filtro}`, 14, 37);
      

      // Generar tabla con datos
      autoTable(doc, {
        head: [Object.keys(datos[0] || {})], // columnas dinámicas
        body: datos.map((d) => Object.values(d)),
        startY: 45,
          columnStyles: {
    0: { cellWidth: 'auto' } ,
    1: { cellWidth: 'auto' } ,
    2: { cellWidth: 'auto' } ,
    3: { cellWidth: 'auto' } ,
    4: { cellWidth: 'auto' } ,
    5: { cellWidth: 'auto' } ,
    6: { cellWidth: 'auto' } ,
    7: { cellWidth: 'auto' } ,
    8: { cellWidth: 'auto' } ,
    9: { cellWidth: 'auto' } 
  }
      });

      doc.save(`reporte_${tipoReporte}_${filtro}.pdf`);
    } catch (err) {
      console.error("Error al generar PDF", err);
    }
  };

  return (
    <div>
      <h3>Generar Reporte </h3>

      <Row >

        <Col>
        <label>Tipo de Reporte:</label>
          <select
            value={tipoReporte}
            class="form-select form-select-md mb-3 "
            onChange={(e) => {
              setTipoReporte(e.target.value);
              setFiltro(opcionesFiltro[e.target.value][0]); // reset filtro al primer valor
            }}
          >
            <option value="CITAS_DEL_MES">Citas del Mes</option>
            <option value="CLIENTES">Clientes</option>
            <option value="VETERINARIOS">Veterinarios</option>
            <option value="MASCOTAS_PESO">Mascotas por peso</option>
          </select>
        </Col>

        <Col>
          <label >Filtro:</label>
          <select
            class="form-select form-select-md mb-3"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            {opcionesFiltro[tipoReporte].map((op) => (
              <option key={op} value={op}>
                {op}
              </option>
            ))}
          </select>
        </Col>

        <Col>
        <br/>
          <button
            className="btn btn-primary btn-md"
            onClick={generarPDF}
          >
            Generar PDF
          </button>
        </Col>
      </Row>
    </div>
  );
}

export default ReporteDinamicoPDF;
