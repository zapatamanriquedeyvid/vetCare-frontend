import { useState } from "react";

const SelectCliente = ({ value, onChange, clientes, row }) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  

  // Filtrar clientes según el texto ingresado
  const clientesFiltrados = clientes.filter((c) =>
    c.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <> 
      <label className="form-label">Cliente</label>
      {row ? (
        <input type="text" className="form-control" value={value} disabled />
      ) : (
        <div style={{ position: "relative" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar cliente..."
            value={selected ? selected.nombre : search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelected(null);}}
            required
          />
          {search && !selected &&(
            <ul
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                maxHeight: "200px",
                overflowY: "auto",
                background: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                zIndex: 10,
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {clientesFiltrados.length > 0 ? (
                clientesFiltrados.map((c) => (
                  <li
                    key={c.idCliente}
                    style={{ padding: "8px", cursor: "pointer" }}
                    onClick={() => {
                      onChange({ target: { value: c.idCliente } }, "idCliente");
                      setSelected(c); // guardamos el cliente elegido
                      setSearch("");   // limpiamos el texto para ocultar la lista
                    }}
                  >
                    {c.nombre} {c.apellido}
                  </li>
                ))
              ) : (
                <li style={{ padding: "8px", color: "#999" }}>
                  No se encontraron clientes
                </li>
              )}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default SelectCliente;
