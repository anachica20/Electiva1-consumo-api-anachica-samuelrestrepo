import "../styles/MenuPrincipal.css";
import { useEffect, useState } from "react";
import type { Character } from "../types/api";
import { getCharacters } from "../services/api";
import ListaElementos from "./ListaElementos";

export default function MenuPrincipal() {
    const [personajes, setPersonajes] = useState<Character[]>([]);

    useEffect(() => {
        getCharacters().then((data) => {
            setPersonajes(data.results);
        });
    }, []);

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

                <ListaElementos personajes={personajes} />
            </section>
        </main>
    );
}