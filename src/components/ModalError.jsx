import React from "react";
import { Modal, Button } from "react-bootstrap";

function ModalError({show,onClose,message}) {


  
  return (
    <div>
      <Modal show={show} onHide={onClose} style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
        <Modal.Header className="bg-danger" closeButton>
          <Modal.Title>Error al registrar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalError;
