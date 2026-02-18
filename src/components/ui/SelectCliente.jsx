const SelectCliente = ({ value, onChange, clientes, row }) => (
  <>
    <label className="form-label">Cliente</label>
    {row ? (
      <input type="text" className="form-control" value={value} disabled />
    ) : (
      <select
        className="form-select"
        onChange={(e) => onChange(e, "idCliente")}
        required
      >
        <option value="">Seleccione cliente</option>
        {clientes.map((c) => (
          <option key={c.idCliente} value={c.idCliente}>
            {c.nombre}
          </option>
        ))}
      </select>
    )}
  </>
);

export default SelectCliente;
