import '../styles/MenuPrincipal.css'

import { useEffect, useState } from 'react'

import type { Character } from '../types/api'

import { getCharacters, getCharactersByName } from '../services/api'

import EstadoMensaje from './EstadoMensaje'

import ListaElementos from './ListaElementos'

import DetalleElemento from './DetalleElemento'

import BarraBusqueda from './BarraBusqueda'

import BotonReintentar from './BotonReintentar'

export default function MenuPrincipal() {
  const [personajes, setPersonajes] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [personajeSeleccionado, setPersonajeSeleccionado] =
    useState<Character | null>(null)
  const [busqueda, setBusqueda] = useState('')
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    const cargarPersonajes = async () => {
      setLoading(true)
      setError(null)

      try {
        if (busqueda.trim() === '') {
          const data = await getCharacters(controller.signal)
          setPersonajes(data.results)
        } else {
          const data = await getCharactersByName(
            busqueda,
            controller.signal
          )

          if (data === null) {
            setPersonajes([])
          } else {
            setPersonajes(data.results)
          }
        }
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === 'AbortError'
        ) {
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

    const timeout = setTimeout(() => {
      void cargarPersonajes()
    }, 400)

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [busqueda, intento])

  const reintentar = () => {
    setIntento((actual) => actual + 1)
  }

  return (
    <main className="menu-principal">
      <header className="menu-header">
        <h1>Rick & Morty</h1>
        <button>Favoritos</button>
      </header>

      <section className="menu-contenido">
        <h2>Personajes</h2>

        <BarraBusqueda
          valor={busqueda}
          onChange={setBusqueda}
        />

        {personajeSeleccionado ? (
          <DetalleElemento
            personaje={personajeSeleccionado}
            onVolver={() => setPersonajeSeleccionado(null)}
          />
        ) : error ? (
          <div className="estado-error">
            <EstadoMensaje
              type="error"
              message={error}
            />

            <BotonReintentar
              onReintentar={reintentar}
              deshabilitado={loading}
            />
          </div>
        ) : loading ? (
          <EstadoMensaje
            type="cargando"
            message="Cargando personajes..."
          />
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