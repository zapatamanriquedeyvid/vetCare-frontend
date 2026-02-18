const SelectEstado = ({ value, onChange, options }) => (
  <>
    <label className="form-label">Estado</label>
    <select
      className="form-select"
      value={value || ""}
      onChange={(e) => onChange(e, "estado")}
    >
      {options[0] === "PENDIENTE"
      ?
        <option value="" disabled>
          Seleccione un estado(default: {options[0]})
        </option>
      :
      <option value="" disabled>
          Seleccione un estado(default: {options[0]})
        </option>
      }
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </>
);

export default SelectEstado;
