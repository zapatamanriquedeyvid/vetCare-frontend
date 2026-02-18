const SelectVeterinario = ({ value, onChange, veterinarios, row }) => (
  <>
    <label className="form-label">Veterinario</label>
    <select
      className="form-select"
      onChange={(e) => onChange(e, "idVeterinario")}
      required
    >
      {row ? 
        <option >{value}</option>
      : 
        <option value="" >
          Seleccione un Veterinario
        </option>
      }
      {veterinarios.map((v) => (
        <option key={v.idVeterinario} value={v.idVeterinario}>
          {v.nombre}
        </option>
      ))}
    </select>
  </>
);

export default SelectVeterinario;
