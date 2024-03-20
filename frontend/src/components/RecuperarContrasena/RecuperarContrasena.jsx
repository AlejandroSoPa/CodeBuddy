import React from 'react'
import './RecuperarContrasena.css'

export function RecuperarContrasena() {

    return (
        <section className="recuperarContrasena">
            <h2>RECUPERAR CONTRASEÑA</h2>
            <span className="subTitulo">¿No recuerdas tu contraseña? ¡No te preocupes! Te ayudamos a recuperarla.</span>

            <form action="">
                <input type="password" name="nuevaContrasena" className="nuevaContrasena" placeholder='Nueva contraseña' min="8" max="60" required />
                <input type="password" name="nuevaContrasenaRepetida" className="nuevaContrasenaRepetida" placeholder='Repite la nueva contraseña' min="8" max="60" required />
                <button className='botonEnviar'>Cambiar contraseña</button>
            </form>

        </section>
    )
}