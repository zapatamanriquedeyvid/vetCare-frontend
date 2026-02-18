const PesoActual = ({ value, onChange, accessor }) => {
  return (
    <>
      <label htmlFor="PesoActual" className="form-label">Peso Actual</label>
      <input type="number"
      value={value}
      className="form-control"
      onChange={(e) => onChange(e, accessor)}>
      </input>
    </>
  )
}

export default PesoActual
