import type { Character } from '../types/api';
import '../styles/DetalleElemento.css'

interface DetalleElementoProps {
    personaje: Character;
    onVolver: () => void;
}

function DetalleElemento({ personaje,
    onVolver
}: DetalleElementoProps) {
    return (
        <section className="detalle-elemento">

            <button type="button" onClick={onVolver}>
                Volver
            </button>

            <img src={personaje.image} alt={personaje.name} />

            <h2>{personaje.name}</h2>
            <p>Estado: {personaje.status}</p>
            <p>Especie: {personaje.species}</p>
            <p>Género: {personaje.gender}</p>
            <p>Tipo: {personaje.type || 'No especificado'}</p>
            <p>Origen: {personaje.origin.name}</p>
            <p>Ubicación: {personaje.location.name}</p>
            <p>Episodios: {personaje.episode.length}</p>



        </section>
    );
}

export default DetalleElemento