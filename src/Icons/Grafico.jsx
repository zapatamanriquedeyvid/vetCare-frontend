const Grafico = ({ size, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 16 16"
  >
    <path d="M0 0h1v15h15v1H0V0zm3 12h2V5H3v7zm4 0h2V2H7v10zm4 0h2V8h-2v4z" />
  </svg>
);

export default Grafico;
