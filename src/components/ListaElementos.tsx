import type { Character } from "../types/api";
import TarjetaElementos from "./TarjetaElementos";

interface ListaElementosProps {
    personajes: Character[];
}

const ListaElementos = ({ personajes }: ListaElementosProps) => {
    return (
        <section className="lista-elementos">
            <h2>Personajes</h2>

            <div className="lista-elementos__contenedor">
                {personajes.map((personaje) => (
                    <TarjetaElementos
                        key={personaje.id}
                        personaje={personaje}
                    />
                ))}
            </div>
        </section>
    );
};

export default ListaElementos;