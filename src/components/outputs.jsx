import "../styles/outputs.scss";

export function Outputs({ texto }) {
  return <output className="output">{texto}</output>;
}
export function OutputsR({ nombre }) {
  return <output className="outputR">{nombre}</output>;
}
