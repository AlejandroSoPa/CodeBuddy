import React from 'react'
import './IniciarSesion.css'

export function IniciarSesion() {

    return (
        <section className="iniciarSesion">
            <h2>INICIAR SESIÓN</h2>
            <span className="subTitulo">¡Qué alegría verte de vuelta! Ingresa tus credenciales para continuar.</span>

            <form action="">
                <input type="email" name="correo" className="correo" placeholder='Correo electrónico' min="5" max="255" required />
                <input type="password" name="contrasena" className="contrasena" placeholder='Contraseña' min="8" max="60" required />
                <button className='botonEnviar'>Iniciar sesión</button>
            </form>

        </section>
    )
}