import medico1 from '../assets/svg/medico1.svg'
import medico2 from '../assets/svg/medico2.svg'
import medico3 from '../assets/svg/medico3.svg'
import { Container, Row, Col, Card } from "react-bootstrap";

function ServicesSection() {
  return (
    <section id="services" className="py-5">
      <Container >
        <h2 className="text-center mb-4">Nuestros Servicios</h2>
        <Row>
          <Col md={4}>
            <Card className="card shadow-lg border-0 mb-4">
              <Card.Body>
                <img style={{backgroundColor:"rgba(100, 100, 100, 0.49)", padding:"10px", margin:"5px", borderRadius:"5px"}} src={medico1} alt="medico1" width={55}/>
                <Card.Title>Consulta General</Card.Title>
                <Card.Text>Atención médica básica para tu mascota.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="card shadow-lg border-0 mb-4">
              <Card.Body>
                <img style={{backgroundColor:"rgba(100, 100, 100, 0.49)", margin:"5px", borderRadius:"5px"}} src={medico2} alt="medico2" width={55}/>
                <Card.Title>Vacunación</Card.Title>
                <Card.Text>Protección contra enfermedades comunes.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="card shadow-lg border-0 mb-4">
              <Card.Body>
                <img style={{backgroundColor:"rgba(100, 100, 100, 0.49)", margin:"5px", borderRadius:"5px"}} src={medico3} alt="medico3" width={55}/>
                <Card.Title>Cirugía</Card.Title>
                <Card.Text>Procedimientos seguros y profesionales.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ServicesSection;
