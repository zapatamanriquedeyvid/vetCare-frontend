import { useState, useEffect } from "react";
import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ModalError from "./ModalError";
import * as Yup from "yup";
import SelectMascota from "./ui/SelectMascota";
import SelectCliente from "./ui/SelectCliente";
import SelectVeterinario from "./ui/SelectVeterinario";
import InputFecha from "./ui/InputFecha";
import InputHora from "./ui/InputHora";
import SelectEstado from "./ui/SelectEstado";
import InputEmail from "./ui/InputEmail";
import SelectSexo from "./ui/SelectSexo";
import PesoActual from "./ui/PesoActual";
function EditModalForm({ show, onClose, row, columns, endpoint }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [mascotas, setMascotas] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const { auth } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const inputComponents = {
    nombreMascota: SelectMascota,
    nombreCliente: SelectCliente,
    nombreVeterinario: SelectVeterinario,
    fechaNacimiento: (props) => (
      <InputFecha
        {...props}
        accessor="fecha de Nacimiento"
        max={new Date().toISOString().split("T")[0]}
      />
    ),
    fechaCita: (props) => (
      <InputFecha
        {...props}
        accessor="fechaCita"
        min={new Date().toISOString().split("T")[0]}
      />
    ),
    horaCita: (props) => <InputHora {...props} accessor="horaCita" />,
    estado: (props) => (
      <SelectEstado
        {...props}
        options={
          props.endpoint.includes("citas")
            ? ["PENDIENTE", "ATENDIDA", "CANCELADA"]
            : ["ACTIVO", "INACTIVO"]
        }
      />
    ),
    email: InputEmail,
    pesoActual: PesoActual,
    sexo: SelectSexo,
  };

  const getSchema = () => {
    if (endpoint.includes("citas")) { 
      return Yup.object().shape({
        fechaCita: Yup.date()
          .required("La fecha es obligatoria"),
        horaCita: Yup.string().required("La hora es obligatoria"),
        estado: Yup.string().oneOf(
          ["PENDIENTE", "ATENDIDA", "CANCELADA"],
          "Estado inválido",
        ),
      });
    }
    if (endpoint.includes("mascotas")) {
      return Yup.object().shape({
        nombre: Yup.string().required("Nombre obligatorio"),
        especie: Yup.string().required("Especie obligatoria"),
        raza: Yup.string().required("Raza obligatoria"),
        fechaNacimiento: Yup.date().required("Fecha obligatoria"),
        pesoActual: Yup.number().positive("Debe ser positivo"),
      });
    }
    if (endpoint.includes("veterinarios")) {
      return Yup.object().shape({
        nombre: Yup.string().required(),
        apellido: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(6,"La contraseña debe tener al menos 6 letras."),
        telefono: Yup.string().required(),
        especialidad: Yup.string().required(),
        estado: Yup.string().oneOf(["ACTIVO", "INACTIVO"]),
      });
    }
    if (endpoint.includes("clientes")) {
      return Yup.object().shape({
        nombre: Yup.string().required(),
        apellido: Yup.string().required(),
        dni: Yup.string().required(),
        email: Yup.string().email().required("Se requiere un email valido."),
        telefono: Yup.string().required(),
        direccion: Yup.string().required(),
        estado: Yup.string().oneOf(["ACTIVO", "INACTIVO"]),
      });
    }
    return Yup.object(); // esquema vacío por defecto
  };
  useEffect(() => {
    if (row) {
      const normalizado = { ...row };
      if (normalizado.sexo) {
        normalizado.sexo = normalizado.sexo.charAt(0).toUpperCase();
      }
      setFormData(normalizado);
    } else {
      setFormData({});
    }
  }, [row, show, endpoint]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mascotasRes, veterinariosRes, clientesRes] = await Promise.all([
          api.get("/admin/mascotas", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }),
          api.get("/admin/veterinarios", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }),
          api.get("/admin/clientes", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }),
        ]);
        setMascotas(mascotasRes.data);
        setVeterinarios(veterinariosRes.data);
        setClientes(clientesRes.data);
      } catch (err) {
        console.error("Error cargando datos", err);
      }
    };
    if (show) fetchData();
  }, [show]);

  if (!show) return null;

  const handleChange = (e, accessor) => {
    let value = e.target.value;
    setFormData({ ...formData, [accessor]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const schema = getSchema();
      await schema.validate(formData, { abortEarly: false });

      let idValue = null;
      if (row) {
        if (endpoint.includes("citas")) idValue = row.idCita;
        else if (endpoint.includes("mascotas")) idValue = row.idMascota;
        else if (endpoint.includes("veterinarios")) idValue = row.idVeterinario;
        else if (endpoint.includes("clientes")) idValue = row.idCliente;
      }
      
      if (!idValue && row) { setErrorMessage("No se encontró el ID en el registro"); setShowErrorModal(true); return; }
      let allowedFields = [];
      //datos que se envian al endpoint
      if (endpoint.includes("citas")) {
        if(row){
          allowedFields = ["estado","fechaCita","horaCita","idMascota","idVeterinario","motivo"];
        }else{
          allowedFields = ["idCliente","estado","fechaCita","horaCita","idMascota","idVeterinario","motivo"];
        }
      } else if (endpoint.includes("mascotas")) {
        if(row){
          allowedFields = ["nombre","especie","raza","fechaNacimiento","pesoActual","sexo"];
        }else{
          allowedFields = ["idCliente","nombre","especie","raza","fechaNacimiento","pesoActual","sexo"];
        }
      } else if (endpoint.includes("veterinarios")) {
        allowedFields = ["nombre","apellido","email","password","telefono","especialidad","estado"];
      } else if (endpoint.includes("clientes")) {
        if(row){
          allowedFields = ["direccion","apellido","dni","email","nombre","telefono","estado"];
        }else{
          allowedFields = ["direccion","apellido","dni","email","password","nombre","telefono","estado","idVeterinario"];
        }
      } else {
        throw new Error("Endpoint no soportado");
      }
      const payload = Object.fromEntries(
        Object.entries(formData).filter(([key]) => allowedFields.includes(key)),
      );
      // Normalizar sexo
      if (payload.sexo) { 
        payload.sexo = payload.sexo.toUpperCase().charAt(0); // asegura que sea H o M 
      }

      console.log(payload);
      if (row) {
        // PATCH para editar
        await api.patch(`${endpoint}/${idValue}`, payload, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        alert("Datos actualizados correctamente");
      } else {
        const newEndpoint = `${endpoint}/registro`;
        await api.post(newEndpoint, payload, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        alert("Nuevo registro creado correctamente");
      }

      onClose();

    } catch (err) {
      if (err.name === "ValidationError") {
        setErrorMessage(err.errors.join(", "));
      } else if (err.response) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Error inesperado al enviar datos");
      }
      setShowErrorModal(true);
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
  };


  const renderInput = (col,formData,handleChange,row,mascotas,clientes,veterinarios,endpoint,) => {
    const value = formData[col.accessor] || "";
    const Component = inputComponents[col.accessor];
    if (Component) {
      return (
        <Component col={col} value={value} accessor={col.accessor} onChange={handleChange} row={row} mascotas={mascotas} clientes={clientes} veterinarios={veterinarios} endpoint={endpoint}/>
      );
    }

    if (col.accessor.toLowerCase().startsWith("id")) {
      if (row) {
        return (
          <>
            <label className="form-label">{col.header}</label>
            <input
              type="number"
              className="form-control"
              value={value}
              disabled
              onChange={(e) => onChange(e, accessor)}
            />
          </>
        );
      } else {
        // Crear: no mostrar nada
        return null;
      }
    }

    return (
      <>
        <label className="form-label">{col.header}</label>
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={(e) => handleChange(e, col.accessor)}
          required
        />
      </>
    );
  };

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {row ? "Editar Registro" : "Nuevo Registro"}{" "}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                ></button>
              </div>
              <div className="modal-body">
                {columns
                  .filter((c) => c.accessor !== "acciones")
                  .map((col, idx) => (
                    <div className="mb-3" key={idx}>
                      {renderInput(
                        col,
                        formData,
                        handleChange,
                        row,
                        mascotas,
                        clientes,
                        veterinarios,
                        endpoint,
                      )}
                    </div>
                  ))}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}>
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}>
                  {loading ? "Guardando..." : "Guardar cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ModalError
        show={showErrorModal}
        onClose={() =>  setShowErrorModal(false)}
        message={errorMessage}
      />
    </>
  );
}

export default EditModalForm;
