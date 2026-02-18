const InputEmail = ({ value, onChange, row }) => (
  <>
    <label className="form-label">Email</label>
    <input
      type="email"
      className="form-control"
      value={value || ""}
      autoComplete="off"
      onChange={(e) => onChange(e, "email")}
    />
    {!row && (
      <>
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          autoComplete="new-password"
          onChange={(e) => onChange(e, "password")}
        />
      </>
    )}
  </>
);
export default InputEmail;
