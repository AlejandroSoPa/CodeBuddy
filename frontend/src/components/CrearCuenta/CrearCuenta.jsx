import React from 'react'
import './CrearCuenta.css'

export function CrearCuenta() {

    let terminos = false
    return (
        <section className="crearCuenta">
            <h2>CREA TU CUENTA</h2>
            <span className="subTitulo">¡Vamos a crear tu cuenta!</span>

            <span className="formularioTitulo">Escribe tus credenciales abajo.</span>
            <form action="">
                <input type="text" name="nombreUsuario" className="nombreUsuario" placeholder='Nombre de usuario' min="2" max="16" required />
                <input type="email" name="correo" className="correo" placeholder='Correo electrónico' min="5" max="255" required />
                <input type="password" name="contrasena" className="contrasena" placeholder='Contraseña' min="8" max="60" required />
                <input type="password" name="confirmarContrasena" className="confirmarContrasena" placeholder='Repetir contraseña' min="8" max="60" required />
                {
                    terminos ?
                        <>
                            <input type="checkbox" name="terminos" id="terminos" className="terminos" required /> <label htmlFor="terminos">Acepta los Terminos de condicion y uso.</label>
                        </>
                        : null
                }
                <button className='botonEnviar'>Crear cuenta</button>
            </form>

        </section>
    )
}