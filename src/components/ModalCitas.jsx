import React from "react";
import { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import ModalError from "./ModalError";

function ModalCitas({ show, onClose, row, endpoint, data }) {
  const { auth } = useContext(AuthContext);
  const [veterinarios, setVeterinarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [formData, setFormData] = useState({
    idCita: "",
    nombreCliente: "",
    nombreVeterinario: "",
    nombreMascota: "",
    fechaCita: "",
    horaCita: "",
    motivo: "",
    estado: "",
    idVeterinario: "",
    idMascota: "",
    idCliente: "",
  });

  useEffect(() => {
    if (row) {
      setFormData({
        idCita: row.idCita,
        nombreCliente: row.nombreCliente,
        nombre: row.nombreVeterinario,
        nombreMascota: row.nombreMascota,
        fechaCita: row.fechaCita,
        horaCita: row.horaCita,
        motivo: row.motivo,
        estado: row.estado,
      });
    } else {
      setFormData({
        nombreCliente: "",
        nombre: "",
        nombreMascota: "",
        fechaCita: "",
        horaCita: "",
        motivo: "",
        estado: "",
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

  //lista cliente por veterinarios
  useEffect(() => {
    if (formData.idVeterinario) {
      api
        .get(`/admin/clientesxvet/${formData.idVeterinario}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((res) => {
          setClientes(res.data);
        });
    } else {
      setClientes([]);
    }
  }, [formData.idVeterinario, auth]);

  //lista mascotas por clientes
  useEffect(() => {
    if (formData.idCliente && formData.idVeterinario) {
      api
        .get(`/admin/mascotasxcli/${formData.idCliente}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((res) => {
          setMascotas(res.data);
        });
    } else {
      setMascotas([]);
    }
  }, [formData.idCliente, formData.idVeterinario, auth]);

  //mostrar vet en modal editar
  useEffect(() => {
    if (row && data && veterinarios.length > 0) {

      const cita = data.find((item)=> item.idCita === row.idCita );
      const vet = veterinarios.find((v) => v.idVeterinario == cita.idVeterinario);
      setFormData((prev) => ({
        ...prev,
        idVeterinario: vet ? vet.idVeterinario : "",
        nomCompVet: cita.nomCompVet || "",
      }));
    }
  }, [row, veterinarios,data]);

  useEffect(() => {
    if (row && data && clientes.length > 0) {
      
      const cita = data.find((item)=> item.idCita === row.idCita );
      const cli = clientes.find((c) => c.idCliente === cita.idCliente);
      setFormData((prev) => ({
        ...prev,
        idCliente: cli ? cli.idCliente : "",
        nomCompCli: cita.nomCompCli|| "",
      }));
    }
  }, [row, clientes,data]);

  useEffect(() => {
    if (row && mascotas.length > 0) {
      const pet = mascotas.find((m) => m.nomMascota === row?.nombreMascota);
      setFormData((prev) => ({
        ...prev,
        idMascota: pet ? pet.idMascota : "",
        nombreMascota: row?.nombreMascota || "",
      }));
    }
  }, [row, mascotas]);

  if (!show) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  let Request = [];
  if (row) {
    Request = [
      "idVeterinario",
      "idCliente",
      "idMascota",
      "estado",
      "fechaCita",
      "horaCita",
      "motivo",
    ];
  } else {
    Request = [
      "idCliente",
      "estado",
      "fechaCita",
      "horaCita",
      "idMascota",
      "idVeterinario",
      "motivo",
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
        await api.patch(`${endpoint}/${row.idCita}`, dataToSend, {
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
      setErrorMessage(err.response.data.message);
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
              {row ? "Editar Cita" : "Registrar Nueva Cita"}
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit} className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Veterinario</label>
                <select
                  type="from-select"
                  className="form-select"
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
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Fecha de Cita</label>
                <input
                  type="date"
                  className="form-control"
                  name="fechaCita"
                  value={formData.fechaCita}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Cliente</label>
                <select
                  className="form-select"
                  name="idCliente"
                  value={formData.idCliente}
                  onChange={handleChange}
                  required
                  disabled={!formData.idVeterinario}
                >
                  <option value="">Seleccione Cliente...</option>
                  {clientes.map((c) => (
                    <option key={c.idCliente} value={c.idCliente}>
                      {c.nomCompCli}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Hora de Cita</label>
                <input
                  type="time"
                  className="form-control"
                  name="horaCita"
                  value={formData.horaCita}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Mascota</label>
                <select
                  className="form-select"
                  name="idMascota"
                  value={formData.idMascota}
                  onChange={handleChange}
                  required
                  disabled={!formData.idCliente || !formData.idVeterinario}
                >
                  <option value="">Seleccione Mascota...</option>
                  {mascotas.map((c) => (
                    <option key={c.idMascota} value={c.idMascota}>
                      {c.nomMascota}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">Motivo</label>
                <textarea
                  className="form-control"
                  name="motivo"
                  value={formData.motivo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Estado</label>
                <select
                  className="form-select"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required>
                  <option value="">Seleccione...</option>
                  <option value="PENDIENTE">PENDIENTE</option>
                  <option value="ATENDIDA">ATENDIDA</option>
                  <option value="CANCELADA">CANCELADA</option>
                </select>
              </div>

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
            </form>
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

export default ModalCitas;
