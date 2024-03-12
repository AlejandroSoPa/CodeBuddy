// import React from "react";
import "./Header.css";

export function Header({ isLogged = false, nombreUsuario }) {
    return (
        <header>
            <nav>
                <a href="/home">
                    <img src="http://localhost:5173/src/assets/logo_88x88.png" alt="Logo de CodeBuddy" />
                </a>
                <a href="/home">
                    <span className="headerInicioTexto">
                        <img src="http://localhost:5173/src/assets/casa.svg" alt="Icono de casa" />
                        Inicio
                    </span>
                </a>
                {isLogged ?
                    (
                        <span className="headerUsuario">
                            <img src="http://localhost:5173/src/assets/usuario.svg" alt="Icono de usuario" />
                            {nombreUsuario}
                        </span>
                    ) : (
                        <a href="/login">
                            <img src="http://localhost:5173/src/assets/iniciarSesion.svg" alt="Icono de usuario" />
                            Iniciar sesión
                        </a>

                    )
                }
            </nav>

        </header >
    )
}