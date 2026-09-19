import type { Character } from '../types/api'

import TarjetaElementos from './TarjetaElementos'

interface ListaElementosProps {
  personajes: Character[]
  onSeleccionar: (personaje: Character) => void
  favoritos: number[]
  onAlternarFavorito: (id: number) => void
}

const ListaElementos = ({
  personajes,
  onSeleccionar,
  favoritos,
  onAlternarFavorito,
}: ListaElementosProps) => {
  return (
    <section className="lista-elementos">
      <h2>Personajes</h2>

      <div className="lista-elementos__contenedor">
        {personajes.map((personaje) => (
          <TarjetaElementos
            key={personaje.id}
            personaje={personaje}
            onSeleccionar={onSeleccionar}
            esFavorito={favoritos.includes(personaje.id)}
            onAlternarFavorito={onAlternarFavorito}
          />
        ))}
      </div>
    </section>
  )
}

export default ListaElementos