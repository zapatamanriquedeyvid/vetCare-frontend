import React from "react";
import { Container } from "react-bootstrap";
import { TelephoneFill, EnvelopeFill, GeoAltFill, ClockFill } from "react-bootstrap-icons";

const Contacto = () => {
  return (
    <Container id="contact" className="card shadow-lg border-0 mb-4 text-center">
      <div className="card-body">
        <h3 className="card-title text-primary fw-bold">CONTACTO</h3>
        <h5 className="text-secondary mb-3">Agenda tu cita hoy</h5>
        <p className="card-text">
          Estamos listos para cuidar a tu mascota. Contáctanos y te atenderemos lo antes posible.
        </p>

        <ul className="list-group list-group-flush mt-3 ">
          <li className="list-group-item d-flex align-items-center justify-content-center">
            <TelephoneFill className="text-success me-2 fs-5" />
            +52 (555) 123–4567
          </li>
          <li className="list-group-item d-flex align-items-center justify-content-center">
            <EnvelopeFill className="text-danger me-2 fs-5" />
            contacto@vetcare.com
          </li>
          <li className="list-group-item d-flex align-items-center justify-content-center">
            <GeoAltFill className="text-info me-2 fs-5" />
            Av. Principal #123, Ciudad
          </li>
          <li className="list-group-item d-flex align-items-center justify-content-center">
            <ClockFill className="text-warning me-2 fs-5" />
            Lun–Sáb: 8:00 – 20:00
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default Contacto;
