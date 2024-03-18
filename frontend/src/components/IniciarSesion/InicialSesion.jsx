import React, { useState } from 'react'
import './IniciarSesion.css'

import axios from 'axios'


export function IniciarSesion() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.post("http://localhost:3000/iniciarSesion", formData)
            console.log(response.data)
            if (response.data.status === "KO") {
                alert("El correo electrónico o la contraseña son incorrectos")
            }
        } catch (error) {
            console.error('Error al conectar con la API', error.message)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }

    return (
        <section className="iniciarSesion">
            <h2>INICIAR SESIÓN</h2>
            <span className="subTitulo">¡Qué alegría verte de vuelta! Ingresa tus credenciales para continuar.</span>

            <form onSubmit={handleSubmit}>
                <input type="email" name="email" className="email" placeholder='Correo electrónico' minLength="5" maxLength="255" required onChange={handleChange} />
                <input type="password" name="password" className="password" placeholder='Contraseña' minLength="8" maxLength="60" required onChange={handleChange} />
                <button className='botonEnviar'>Iniciar sesión</button>
            </form>

        </section>
    )
}