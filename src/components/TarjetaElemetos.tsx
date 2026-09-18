import { Personaje } from "../types/api";

interface TarjetaElementosProps {
    personaje: Personaje;
}

const TarjetaElementos = ({ personaje }: TarjetaElementosProps) => {
    return (
        <div className="tarjeta-elementos__item">
            <img src={personaje.image} alt={personaje.name} />
            <h3>{personaje.name}</h3>
            <p>Estado: {personaje.status}</p>
            <p>Especie: {personaje.species}</p>
        </div>
    );
};

export default TarjetaElementos;