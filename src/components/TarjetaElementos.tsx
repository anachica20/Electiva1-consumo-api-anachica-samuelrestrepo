import '../styles/TarjetaElementos.css'

import type { Character } from '../types/api'

interface TarjetaElementosProps {
  personaje: Character
  onSeleccionar: (personaje: Character) => void
  esFavorito: boolean
  onAlternarFavorito: (id: number) => void
}

const TarjetaElementos = ({
  personaje,
  onSeleccionar,
  esFavorito,
  onAlternarFavorito,
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

      <span
        className="tarjeta-elementos__favorito"
        onClick={(event) => {
          event.stopPropagation()
          onAlternarFavorito(personaje.id)
        }}
      >
        {esFavorito ? '★ Favorito' : '☆ Favorito'}
      </span>
    </button>
  )
}

export default TarjetaElementos