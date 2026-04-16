import React from "react";
import { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import ModalError from "./ModalError";
import { Form } from "react-bootstrap";

export default function ModalClientes({ show, onClose, row, endpoint, data }) {
  const { auth } = useContext(AuthContext);
  const [veterinarios, setVeterinarios] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [formData, setFormData] = useState({
    idCliente: "",
    nombre: "",
    apellido: "",
    dni: "",
    direccion: "",
    telefono: "",
    email: "",
    password: "",
    estado: "",
    idVeterinario: "",
    nomVet: "",
  });

  useEffect(() => {
    if (row) {
      setFormData({
        idCliente: row.idCliente,
        nombre: row.nombre,
        apellido: row.apellido,
        dni: row.dni,
        direccion: row.direccion,
        telefono: row.telefono,
        email: row.email,
        estado: row.estado,
        idVeterinario: row.idVeterinario,
      });
    } else {
      setFormData({
        idCliente: "",
        nombre: "",
        apellido: "",
        dni: "",
        direccion: "",
        telefono: "",
        email: "",
        password: "",
        estado: "",
        idVeterinario: "",
      });
    }
  }, [row]);

  //lista veterinario
  useEffect(() => {
    if (show) {
      api
        .get("/admin/veterinarios", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((res) => {
          setVeterinarios(res.data);
        });
    }
  }, [auth, show]);

  //mostrar vet en modal editar
  useEffect(() => {
    if (row && data && veterinarios.length > 0) {
      const cliente = data.find((item) => item.idCliente === row.idCliente);
      const vet = veterinarios.find(
        (v) => v.idVeterinario == cliente.idVeterinario,
      );
      setFormData((prev) => ({
        ...prev,
        idVeterinario: vet ? vet.idVeterinario : "",
        nomVet: cliente.nomVet || "",
      }));
    }
  }, [row, veterinarios, data]);

  if (!show) return null;

  const handleChange = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  let Request = [];
  if (row) {
    Request = [
      "nombre",
      "apellido",
      "dni",
      "direccion",
      "telefono",
      "email",
      "estado",
      "idVeterinario",
    ];
  } else {
    Request = [
      "idCliente",
      "nombre",
      "apellido",
      "dni",
      "direccion",
      "telefono",
      "email",
      "password",
      "estado",
      "idVeterinario",
    ];
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    //objeto que obtiene solo los datos a enviar para la peticion
    const dataToSend = Request.reduce((acc, key) => {
      acc[key] = formData[key];
      return acc;
    }, {});

    try {
      if (row) {
        // Modo edición
        await api.patch(`${endpoint}/${row.idCliente}`, dataToSend, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        console.log("actualizar: ");
        console.log(dataToSend);
      } else {
        // Modo registro: "admin/citas/registro"
        await api.post(`${endpoint}/registro`, dataToSend, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        console.log("Registrar: ");
        console.log(dataToSend);
      }
      onClose();
    } catch (err) {
      console.error("Error al guardar cita", err);
      console.log(dataToSend);
      setErrorMessage(err.response?.data?.message || "Error inesperado");
      
      setShowErrorModal(true);
      return;
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title">
              {row ? "Editar Clientes" : "Registrar Nuevos Clientes"}
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <Form onSubmit={handleSubmit} className="p-4  row g-3">
              <Form.Group className="mb-3 col-md-6">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ingrese nombre"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Ingrese apellido"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label>DNI</Form.Label>
                <Form.Control
                  type="number"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  placeholder="Ingrese DNI"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  placeholder="Ingrese dirección"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="number"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Ingrese teléfono"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ingrese correo electrónico"
                  autoComplete="new-email"
                  required
                /> 
              </Form.Group>

              {row ? (
                <input type="hidden"></input>
              ) : (
                <Form.Group className="mb-3 col-md-6">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ingrese una contraseña"
                    autoComplete="new-password"
                    required
                  /> 
                </Form.Group>
              )}

              <Form.Group className="mb-3 col-md-6">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un estado</option>
                  <option value="ACTIVO">ACTIVO</option>
                  <option value="INACTIVO">INACTIVO</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3 col-md-6">
                <Form.Label>Veterinario</Form.Label>
                <Form.Select
                  name="idVeterinario"
                  value={formData.idVeterinario}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione Veterinario...</option>
                  {veterinarios.map((v) => (
                    <option key={v.idVeterinario} value={v.idVeterinario}>
                      {v.nombre + " " + v.apellido}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  {row ? "Actualizar" : "Guardar"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancelar
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <ModalError
        show={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message={errorMessage}
      />
    </div>
  );
}
