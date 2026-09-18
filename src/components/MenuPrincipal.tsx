import "../styles/MenuPrincipal.css";

export default function MenuPrincipal() {
    return (
        <main className="menu-principal">
            <header className="menu-header">
                <h1>Rick & Morty</h1>
                <button>Favoritos</button>
            </header>

            <section className="menu-contenido">
                <h2>Personajes</h2>

                <div className="busqueda-placeholder">
                    Buscar personaje...
                </div>

                <div className="lista-placeholder">
                    Aquí aparecerán los personajes
                </div>
            </section>
        </main>
    );
}