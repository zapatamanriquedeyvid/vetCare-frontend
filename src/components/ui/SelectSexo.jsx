const SelectSexo = ({ value, onChange, accessor, row }) => (
  <>
    <label htmlFor="sexo" className="form-label">Sexo</label>
    <select
      id="sexo"
      value={value}
      className="form-select"
      onChange={(e) => onChange(e, accessor)}
      required
    >
      {!row && <option value="">Seleccione un Sexo</option>}
      <option value="H">Hembra</option>
      <option value="M">Macho</option>
    </select>
  </>
);


export default SelectSexo;
