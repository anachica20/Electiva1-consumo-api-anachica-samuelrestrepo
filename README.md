# Electiva 1 - Consumo de API

Aplicación web desarrollada con React, TypeScript y Vite para el consumo de una API pública de personajes de **Rick and Morty**.

El proyecto permite consultar personajes, buscar por nombre, visualizar información detallada, gestionar favoritos y manejar diferentes estados de carga de la aplicación.

## Tecnologías utilizadas

* React
* TypeScript
* Vite
* CSS
* API de Rick and Morty
* Fetch API
* LocalStorage

## Funcionalidades

### RF-01 - Listado de personajes

* Consulta de personajes mediante la API.
* Visualización de al menos 20 personajes.
* Cada personaje muestra información como nombre, estado y especie.

### RF-02 - Estados de la aplicación

* Estado de carga.
* Estado de error.
* Estado sin resultados.
* Estado exitoso.

### RF-03 - Búsqueda

* Campo de búsqueda controlado.
* Búsqueda de personajes por nombre.
* Retraso de 400 ms mediante `setTimeout`.
* Limpieza del temporizador mediante `useEffect`.

### RF-04 - Detalle de personaje

* Selección de un personaje.
* Visualización de información adicional.
* Opción para regresar al listado.

### RF-05 - Favoritos

* Marcar y desmarcar personajes como favoritos.
* Contador de personajes favoritos.
* Visualización de favoritos.
* Persistencia mediante `localStorage`.

### RF-06 - Reintento

* Manejo de errores durante las solicitudes.
* Botón para reintentar la carga sin recargar la página.

## Estructura del proyecto

```text
src/
├── components/
│   ├── BarraBusqueda.tsx
│   ├── BotonReintentar.tsx
│   ├── DetalleElemento.tsx
│   ├── EstadoMensaje.tsx
│   ├── ListaElementos.tsx
│   ├── MenuPrincipal.tsx
│   └── TarjetaElementos.tsx
├── services/
│   └── api.ts
├── styles/
│   ├── BarraBusqueda.css
│   ├── BotonReintentar.css
│   ├── MenuPrincipal.css
│   └── TarjetaElementos.css
├── types/
│   └── api.ts
└── main.tsx
```

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/anachica20/Electiva1-consumo-api-anachica-samuelrestrepo.git
```

Ingresar al proyecto:

```bash
cd Electiva1-consumo-api-anachica-samuelrestrepo
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el proyecto en desarrollo:

```bash
npm run dev
```

## Construcción del proyecto

Para generar la versión de producción:

```bash
npm run build
```

## Integrantes

* Ana Chica
* Samuel Restrepo

## API utilizada

Rick and Morty API.

https://rickandmortyapi.com/

## Código de verificación

Codigo de verificacion del enunciado: VRF-7QK2
