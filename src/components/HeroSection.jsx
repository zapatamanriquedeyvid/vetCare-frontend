import React from "react";
import { Container, Button ,Row,Col} from "react-bootstrap";
import vetcareBg from "../assets/img/vetcate.png";
function HeroSection() {
  return (
    <section id='inicio'
      className="text-white align-content-center"
      style={{
        backgroundImage: `linear-gradient(to right,rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)),url(${vetcareBg})`, // ruta de tu imagen
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "80vh",
      }}
    >
      <Container >
        <Row>
          {/* Columna limitada a 6/12 → mitad del ancho */}
          <Col md={6}>
            <h1>El mejor cuidado para tu mejor amigo</h1>
            <h5>
              Brindamos atención veterinaria integral con amor y
              profesionalismo. Tu mascota merece lo mejor.
            </h5>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default HeroSection;
