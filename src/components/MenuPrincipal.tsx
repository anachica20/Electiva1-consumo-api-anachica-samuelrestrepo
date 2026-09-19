import '../styles/MenuPrincipal.css'
import { useEffect, useState } from 'react'
import type { Character } from '../types/api'
import { getCharacters } from '../services/api'
import EstadoMensaje from './EstadoMensaje'
import ListaElementos from './ListaElementos'

export default function MenuPrincipal() {
  const [personajes, setPersonajes] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const cargarPersonajes = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await getCharacters(controller.signal)
        setPersonajes(data.results)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        const mensaje =
          error instanceof Error
            ? error.message
            : 'No fue posible cargar los personajes'

        setError(mensaje)
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    cargarPersonajes()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <main className="menu-principal">
      <header className="menu-header">
        <h1>Rick & Morty</h1>
        <button>Favoritos</button>
      </header>

      <section className="menu-contenido">
        <h2>Personajes</h2>
        <div className="busqueda-placeholder">Buscar personaje...</div>

        {loading ? (
          <EstadoMensaje type="cargando" message="Cargando personajes..." />
        ) : error ? (
          <EstadoMensaje type="error" message={error} />
        ) : personajes.length === 0 ? (
          <EstadoMensaje
            type="vacio"
            message="No se encontraron personajes."
          />
        ) : (
          <ListaElementos personajes={personajes} />
        )}
      </section>
    </main>
  )
}
