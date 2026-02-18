import React from "react";
import { Container } from "react-bootstrap";
import cat from "../assets/img/cat.png";
import check from '../assets/svg/check.svg'

const NosotrosCard = () => {
  return (
    <Container className="card shadow-lg border-0 mb-4" id="nosotros">
      <div className="row g-0 my-3">
        {/* Imagen lado izquierdo */}
        <div className="col-md-5 position-relative">
          <img
            src= {cat} // reemplaza con tu imagen real
            alt="Gatito VetCare"
            className="img-fluid rounded-start h-100 object-fit-cover"
          />
          <span className="badge bg-success position-absolute bottom-0 start-0 m-3 fs-6">
            +500 Mascotas atendidas
          </span>
        </div>

        {/* Texto lado derecho */}
        <div className="col-md-7">
          <div className="card-body"> 
            <h1 className="card-title text-primary fw-bold">SOBRE NOSOTROS</h1>
            <h5 className="text-secondary mb-3">Tu mascota en las mejores manos</h5>
            <p className="card-text">
              En <strong>VetCare</strong> nos dedicamos a brindar el mejor cuidado
              veterinario con pasión y profesionalismo. Nuestro equipo de especialistas
              trata a cada paciente como si fuera propio, combinando medicina de
              vanguardia con un trato cercano y cálido.
            </p>

            <ul className="list-group list-group-flush mt-3">
              <li className="list-group-item d-flex align-items-center ">
                <img src={check} alt="check" className="img-fluid me-2"/>
                Más de 15 años de experiencia
              </li>
              <li className="list-group-item d-flex align-items-center">
                <img src={check} alt="check" className="img-fluid me-2" />
                Equipo de veterinarios certificados
              </li>
              <li className="list-group-item d-flex align-items-center">
                <img src={check} alt="check" className="img-fluid me-2" />
                Tecnología de diagnóstico avanzada
              </li>
              <li className="list-group-item d-flex align-items-center">
                <img src={check} alt="check" className="img-fluid me-2" />
                Atención personalizada y humana
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NosotrosCard;
