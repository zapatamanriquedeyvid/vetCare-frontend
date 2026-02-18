import React from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate,useLocation  } from "react-router-dom";
import logo from '../assets/img/logo.png';


function NavigationBar() {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Navbar expand="lg"  className=' fixed-top bg-white shadow-sm'>
      <Container>
        <a href="/">
        <img src={logo} width={70} alt="Logo VetCare" className="img-fluid mb-3" />
        </a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {location.pathname !== "/api/sesion/login" && (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="btn ms-2 nav-link-custom" href="#inicio">Inicio</Nav.Link>
            <Nav.Link className="btn ms-2 nav-link-custom" href="#services">Servicios</Nav.Link>
            <Nav.Link className="btn ms-2 nav-link-custom" href="#nosotros">Nosotros</Nav.Link>
            <Nav.Link className="btn ms-2 nav-link-custom" href="#contact">Contacto</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
              <button className="btn btn-primary btn-sm fs-5 px-4" onClick={() => navigate("/api/sesion/login")}
              >
                Login
              </button>
          </Nav>
        </Navbar.Collapse>
            )}
      </Container>
    </Navbar>
  )
}

export default NavigationBar
