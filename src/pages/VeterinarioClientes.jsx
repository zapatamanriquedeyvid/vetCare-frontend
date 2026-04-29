import { useContext,useEffect, useState  } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import correo from "../assets/svg/correo.svg";
import telefono from "../assets/svg/telefono.svg";
import direccion from "../assets/svg/direccion.svg";
import { Border, Justify } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function VeterinarioClientes(){
  const { auth } = useContext(AuthContext);
  const [Clientes, setClientes] = useState([]);

  useEffect(() => {
  const fetchClientes = async () => {
    try {
      const res = await api.get("/veterinario/clientes", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setClientes(res.data);
      console.log(res.data);
      
    } catch (err) {
      console.error("Error al obtener clientes del veterinario", err);
    }
  };
    fetchClientes();
  }, [auth]);

  const cardStyle = {
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    marginBottom: '20px',
    padding: '20px', 
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderRadius:'10px'
  };


  

  return (
    <div className="container mt-4 tablas">
      <h2>Lista de Mis Clientes</h2>
      <br/>
      {Clientes.map((cliente,index)=>(
        <div style={cardStyle} key={index}>
          {/* //perfil */}
          <div className="" style={{display:'flex',gap:'20px',alignItems:'center'}}>
              <img
                src={`https://ui-avatars.com/api/?name=${cliente.nombre}&background=random`}
                alt={cliente.nombre}
                className="img-mascota"
              />
            <div style={{ height:'100px'}}>
              <h3 className="m-0">{cliente.nombre}</h3>
              <p className="m-0"> DNI: {cliente.dni}</p>
            </div>
          </div>
          {/* //datos */}
          <div>
            <div style={{marginTop:'10px', display:'flex',gap:'20px'}}>
              <i><img src={correo}/></i>
              <p><strong>Correo: </strong> {cliente.email}</p>
              <i><img src={telefono}/></i>
              <p><strong>Teléfono:</strong> {cliente.telefono}</p>
            </div>
            <div style={{marginTop:'10px', display:'flex',gap:'20px'}}>
              <i><img src={direccion}/></i>
              <p><strong>Dirección:</strong> {cliente.direccion}</p>
            </div>
          </div>
          {/* //boton */}
          <div>
            <Link
              key={cliente.idCliente}
              to={`/api/veterinario/mascotas/${cliente.idCliente}`}
              style={{
                flex: "1 0 calc(33.333% - 16px)",
                maxWidth: "calc(33.333% - 16px)",
                textDecoration: "none",
              }}
            >Ver Mascotas</Link>
          </div>

        </div>
      ))}
    </div>
  );
}