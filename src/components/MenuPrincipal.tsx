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

  const [favoritos, setFavoritos] = useState<number[]>(() => {
    const favoritosGuardados = localStorage.getItem('favoritos')

    if (!favoritosGuardados) {
      return []
    }

    try {
      const datos: unknown = JSON.parse(favoritosGuardados)

      if (
        Array.isArray(datos) &&
        datos.every((id) => typeof id === 'number')
      ) {
        return datos
      }

      return []
    } catch {
      return []
    }
  })

  const [mostrarFavoritos, setMostrarFavoritos] = useState(false)

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

  useEffect(() => {
    localStorage.setItem('favoritos', JSON.stringify(favoritos))
  }, [favoritos])

  const reintentar = () => {
    setIntento((actual) => actual + 1)
  }

  const alternarFavorito = (id: number) => {
    setFavoritos((actuales) =>
      actuales.includes(id)
        ? actuales.filter((favoritoId) => favoritoId !== id)
        : [...actuales, id]
    )
  }

  const personajesFavoritos = personajes.filter((personaje) =>
    favoritos.includes(personaje.id)
  )

  const cambiarVistaFavoritos = () => {
    setMostrarFavoritos((actual) => !actual)
    setPersonajeSeleccionado(null)
  }

  const personajesMostrados = mostrarFavoritos
    ? personajesFavoritos
    : personajes

  return (
    <main className="menu-principal">
      <header className="menu-header">
        <h1>Rick & Morty</h1>

        <button
          type="button"
          onClick={cambiarVistaFavoritos}
        >
          {mostrarFavoritos
            ? 'Ver personajes'
            : `Favoritos (${favoritos.length})`}
        </button>
      </header>

      <section className="menu-contenido">
        <h2>
          {mostrarFavoritos ? 'Mis favoritos' : 'Personajes'}
        </h2>

        {!mostrarFavoritos && (
          <BarraBusqueda
            valor={busqueda}
            onChange={setBusqueda}
          />
        )}

        {personajeSeleccionado ? (
          <DetalleElemento
            personaje={personajeSeleccionado}
            onVolver={() => setPersonajeSeleccionado(null)}
          />
        ) : error && !mostrarFavoritos ? (
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
        ) : loading && !mostrarFavoritos ? (
          <EstadoMensaje
            type="cargando"
            message="Cargando personajes..."
          />
        ) : personajesMostrados.length === 0 ? (
          <EstadoMensaje
            type="vacio"
            message={
              mostrarFavoritos
                ? 'No tienes personajes favoritos.'
                : 'No se encontraron personajes.'
            }
          />
        ) : (
          <ListaElementos
            personajes={personajesMostrados}
            onSeleccionar={setPersonajeSeleccionado}
            favoritos={favoritos}
            onAlternarFavorito={alternarFavorito}
          />
        )}
      </section>
    </main>
  )
}