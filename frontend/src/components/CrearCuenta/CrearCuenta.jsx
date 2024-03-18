import React, { useState } from 'react'
import axios from 'axios';
import './CrearCuenta.css'

export function CrearCuenta() {
    let terminos = false
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        password2: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { nombre, email, password, password2 } = comprobarUsuarioRegister(formData)
        if (!nombre) {
            alert("El nombre de usuario debe tener entre 3 y 16 caracteres")
            return
        }
        if (!email) {
            alert("El correo electrónico debe tener entre 5 y 255 caracteres")
            return
        }
        if (!password) {
            alert("La contraseña debe tener entre 8 y 60 caracteres, al menos un número y un caracter especial")
            return
        }
        if (!password2) {
            alert("Las contraseñas no coinciden")
            return
        }
        try {
            const response = await axios.post("http://localhost:3000/crearCuenta", formData)

            let mensaje = "Error al crear la cuenta, por favor intente de nuevo"
            if (response.data.status === "OK") {
                mensaje = "Cuenta creada"
            } else {
                const { nombreExiste, emailExiste } = response.data.data

                if (nombreExiste && emailExiste) {
                    mensaje = "El nombre de usuario y el correo electrónico ya existen"
                }
                else if (nombreExiste) {
                    mensaje = "El nombre de usuario ya existe"
                }
                else if (emailExiste) {
                    mensaje = "El correo electrónico ya existe"
                }
            }
            alert(mensaje)

        } catch (error) {
            console.error('Error al conectar con la API', error.message)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <section className="crearCuenta">
            <h2>CREA TU CUENTA</h2>
            <span className="subTitulo">¡Vamos a crear tu cuenta!</span>

            <span className="formularioTitulo">Escribe tus credenciales abajo.</span>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nombre" className="nombre" placeholder='Nombre de usuario' minlength="3" maxlength="16" required onChange={handleChange} />
                <input type="email" name="email" className="email" placeholder='Correo electrónico' minlength="5" maxlength="255" required onChange={handleChange} />
                <input type="password" name="password" className="password" placeholder='Contraseña' minlength="8" maxlength="60" required onChange={handleChange} />
                <input type="password" name="password2" className="password2" placeholder='Repetir contraseña' minlength="8" maxlength="60" required onChange={handleChange} />
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

function comprobarUsuarioRegister({ nombre, email, password, password2 }) {
    return {
        nombre: nombre.length >= 2 && nombre.length < 16 && nombre != null,
        email: email.length >= 5 && email.length < 255 && email != null,
        password: password.length >= 8 && password.length < 60 && /\d/.test(password) && /[\W_]/.test(password) && password != null,
        password2: password === password2 && password2 != null
    }
}