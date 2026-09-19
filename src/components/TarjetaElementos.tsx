import '../styles/TarjetaElementos.css'
import type { Character } from '../types/api'

interface TarjetaElementosProps {
  personaje: Character
  onSeleccionar: (personaje: Character) => void
}

const TarjetaElementos = ({
  personaje,
  onSeleccionar,
}: TarjetaElementosProps) => {
  return (
    <button
      type="button"
      className="tarjeta-elementos__item"
      onClick={() => onSeleccionar(personaje)}
    >
      <h3>{personaje.name}</h3>
      <p>Estado: {personaje.status}</p>
      <p>Especie: {personaje.species}</p>
    </button>
  )
}

export default TarjetaElementos