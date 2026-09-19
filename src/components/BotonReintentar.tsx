import '../styles/BotonReintentar.css'

interface BotonReintentarProps {
    onReintentar: () => void;
    deshabilitado: boolean;
}

const BotonReintentar = ({
  onReintentar,
  deshabilitado,
}: BotonReintentarProps) => {
  return (
    <button
      type="button"
      className="boton-reintentar"
      onClick={onReintentar}
      disabled={deshabilitado}
    >
      Reintentar
    </button>
  )
}

export default BotonReintentar