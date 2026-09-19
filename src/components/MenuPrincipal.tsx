import '../styles/MenuPrincipal.css'
import { useEffect, useState } from 'react'
import type { Character } from '../types/api'
import { getCharacters } from '../services/api'
import EstadoMensaje from './EstadoMensaje'
import ListaElementos from './ListaElementos'
import DetalleElemento from './DetalleElemento'
import BotonReintentar from './BotonReintentar'

export default function MenuPrincipal() {
  const [personajes, setPersonajes] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState<Character | null>(null)

  const cargarPersonajes = async (signal?: AbortSignal) => {
    try {
      const data = await getCharacters(signal)
      setPersonajes(data.results)
      setError(null)
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
      if (!signal?.aborted) {
        setLoading(false)
      }
    }
  }

  const reintentar = () => {
    setLoading(true)
    void cargarPersonajes()
  }

  useEffect(() => {
    const controller = new AbortController()

    getCharacters(controller.signal)
      .then((data) => {
        setPersonajes(data.results)
        setError(null)
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        const mensaje =
          error instanceof Error
            ? error.message
            : 'No fue posible cargar los personajes'

        setError(mensaje)
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

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

        {personajeSeleccionado ? (
          <DetalleElemento
            personaje={personajeSeleccionado}
            onVolver={() => setPersonajeSeleccionado(null)}
          />
        ) : error ? (
          <div className="estado-error">
            <EstadoMensaje type="error" message={error} />
            <BotonReintentar
              onReintentar={reintentar}
              deshabilitado={loading}
            />
          </div>
        ) : loading ? (
          <EstadoMensaje type="cargando" message="Cargando personajes..." />
        ) : personajes.length === 0 ? (

          <EstadoMensaje
            type="vacio"
            message="No se encontraron personajes."
          />
        ) : (
          <ListaElementos
            personajes={personajes}
            onSeleccionar={setPersonajeSeleccionado}
          />
        )}
      </section>
    </main>
  )
}
