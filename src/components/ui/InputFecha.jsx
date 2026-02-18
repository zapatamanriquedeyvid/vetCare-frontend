const InputFecha = ({ value, onChange, accessor, min, max }) => (
  <>
    <label className="form-label">Fecha</label>
    <input
      type="date"
      className="form-control"
      value={value}
      min={min}
      max={max}
      onChange={(e) => onChange(e, accessor)}
      required
    />
  </>
);
export default InputFecha;
