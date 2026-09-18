import "../styles/TarjetaElementos.css";
import type { Character } from "../types/api";

interface TarjetaElementosProps {
    personaje: Character;
}

const TarjetaElementos = ({ personaje }: TarjetaElementosProps) => {
    return (
        <div className="tarjeta-elementos__item">
            <h3>{personaje.name}</h3>
            <p>Estado: {personaje.status}</p>
            <p>Especie: {personaje.species}</p>
        </div>
    );
};

export default TarjetaElementos;