const InputHora = ({ value, onChange, accessor }) => (
  <>
    <label className="form-label">Hora</label>
    <input
      type="time"
      className="form-control"
      value={value || ""}
      onChange={(e) => onChange(e, accessor)}
      required
    />
  </>
);

export default InputHora;