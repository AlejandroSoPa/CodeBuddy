// import React from "react";
import "./Header.css";

export function Header({ isLogged = false, nombreUsuario }) {
    if (isLogged) {
        nombreUsuario = "Pautronix996"
    }
    return (
        <header>
            <nav className="seccion1">
                <a href="/home" className="logo">
                    <img src="http://localhost:5173/src/assets/logo_88x88.png" alt="Logo de CodeBuddy" />
                </a>
                {/* /home o / en general */}
                <a href="/home" className="headerInicioTexto">
                    <img src="http://localhost:5173/src/assets/casa.svg" alt="Icono de casa" />
                    Inicio
                </a>
                {isLogged ?
                    (
                        <span className="headerUsuario">
                            <img src="http://localhost:5173/src/assets/usuario.svg" alt="Icono de usuario" />
                            {nombreUsuario}
                        </span>
                    ) : (
                        <>
                            <a href="/login">
                                <img src="http://localhost:5173/src/assets/iniciarSesion.svg" alt="Icono de usuario" />
                                Iniciar sesión
                            </a>

                            <a href="/register">
                                <img src="http://localhost:5173/src/assets/registrar.svg" alt="Icono de usuario" />
                                Registrarse
                            </a>
                        </>
                    )
                }
            </nav>
            <nav className="seccion2">
                <input type="text" placeholder="Buscar publicación..." />
            </nav>
            <nav className="seccion3">
                {isLogged ?
                    (
                        <>
                            <a href="/logout">
                                <img src="http://localhost:5173/src/assets/cerrarSesion.svg" alt="Icono de cerrar sesion" />
                            </a>
                            <a href="/configs">
                                <img src="http://localhost:5173/src/assets/configuracion.svg" alt="Icono de configuraciones" />
                            </a>
                        </>

                    ) : null
                }
                <div className="tema">
                    <button id="claro">
                        <img src="http://localhost:5173/src/assets/sol.svg" alt="Icono de sol modo claro" />
                    </button>
                    <button id="oscuro">
                        <img src="http://localhost:5173/src/assets/luna.svg" alt="Icono de luna modo oscuro" />
                    </button>
                </div>
            </nav>
        </header >
    )
}