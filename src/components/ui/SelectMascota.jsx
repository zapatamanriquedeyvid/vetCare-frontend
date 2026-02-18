const SelectMascota = ({ value, onChange, mascotas, row }) => (
  <>
    <label className="form-label">Mascota</label>
    <select
      className="form-select"
      onChange={(e) => onChange(e, "idMascota")}
      required
    >
      {row ? (
        <option>{value}</option>
      ) : (
        <option value="" >
          Seleccione una mascota
        </option>
      )}
      {mascotas.map((m) => (
        <option key={m.idMascota} value={m.idMascota}>
          {m.nombre}
        </option>
      ))}
    </select>
  </>
);

export default SelectMascota;
