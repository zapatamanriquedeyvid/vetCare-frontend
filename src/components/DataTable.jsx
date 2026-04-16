import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useContext } from "react";
import EditModal from "./EditModal";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import ModalCitas from "./ModalCitas";
import ModalClientes from "./ModalClientes";

function DataTable({ columns, data, endpoint, onRefresh }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { auth } = useContext(AuthContext);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // o 5

  const filteredData = data.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(filter.toLowerCase()),
    ),
  );
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleEdit = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
    setSelectedRow(null);
    if (onRefresh) onRefresh();
  };

  const citaEstado = async (id, estado) => {
    try {
      await api.patch(`${endpoint}/${id}`, null, {
        params: { estado },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      alert("Estado actualizado correctamente");
      onRefresh();
    } catch (e) {
      console.log(id);
      console.error(e);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {auth.role !== "ADMIN" ? (
        <input type="hidden"></input>
      ) : (
        <button
          className="btn btn-success mb-3"
          onClick={() => {
            setSelectedRow(null);
            setShowModal(true);
          }}
        >
          ➕ Registrar
        </button>
      )}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar datos..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table className="table table-hover table-striped table-bordered align-middle shadow-sm">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                style={{ background: "#d5d6d6" }}
                key={index}
                className="text-center"
              >
                {col.header}
              </th>
            ))}
            {auth.role === "VETERINARIO" ? (
              <th style={{ background: "#d5d6d6" }} className="text-center">
                Cambiar estado
              </th>
            ) : (
              <></>
            )}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, i) => (
            <tr key={i}>
              {columns.map((col, j) => (
                <td key={j} className="text-center">
                  {col.accessor === "acciones" ? (
                    <>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => {
                          handleEdit(row);
                        }}
                      >
                        ✏️Editar
                      </button>
                    </>
                  ) : (
                    row[col.accessor]
                  )}
                </td>
              ))}
              {auth.role === "VETERINARIO" ? (
                <td className="text-center">
                  {row.estado === "PENDIENTE" ? (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => citaEstado(row.idcita, "atendida")}
                    >
                      Atendida
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => citaEstado(row.idcita, "pendiente")}
                    >
                      Pendiente
                    </button>
                  )}
                </td>
              ) : (
                <></>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      {(() => {
        switch (endpoint) {
          case "/admin/citas":
            return (
              <ModalCitas
                data={data}
                show={showModal}
                onClose={handleClose}
                row={selectedRow}
                columns={columns}
                endpoint={endpoint}
              />
            );
          case "/admin/clientes":
            return (
              <ModalClientes
                data={data}
                show={showModal}
                onClose={handleClose}
                row={selectedRow}
                columns={columns}
                endpoint={endpoint}
              />
            );
          default:
            return(
              <EditModal
                show={showModal}
                onClose={handleClose}
                row={selectedRow}
                columns={columns}
                endpoint={endpoint}
              />
            );
        }
      })()}
    </div>
  );
}
export default DataTable;
