import TarjetaElementos from "./TarjetaElementos";

const ListaElementos = ({ personajes }) => {
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