import { Model } from "../models/mysql/model.js"
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

export class Controller {

    itWorks = async (req, res) => {
        res.send("It works!\n")
    }

    helloWorld = async (req, res) => {
        const response = await Model.helloWorld()
        res.json(response)
    }

    crearCuenta = async (req, res) => {
        let result = {
            status: "KO", message: "Error al crear la cuenta", data: {
                nombreExiste: false,
                emailExiste: false
            }
        }
        let cadena = req.body.password

        const contrasenaEncriptada = crypto.createHash('sha512').update(cadena).digest('hex');
        const { query, nombreExiste, emailExiste } = await Model.crearCuenta(req.body.nombre, req.body.email, req.body.password, req.body.password2, contrasenaEncriptada)
        if (query) {
            result.status = "OK"
            result.message = "Cuenta creada"
        } else {
            result.message = "Error al crear la cuenta"
            result.data.nombreExiste = nombreExiste
            result.data.emailExiste = emailExiste
        }
        res.json(result)
    }

    iniciarSesion = async (req, res) => {
        let result = { status: "KO", message: "Error al iniciar sesion", data: {
            emailExiste: false,
            id: ''
            } 
        }

        let cadena = req.body.password
        const contrasenaEncriptada = crypto.createHash('sha512').update(cadena).digest('hex');
        const response = await Model.iniciarSesion(req.body.email, req.body.password, contrasenaEncriptada)
        if (response) {
            const usuario = {
                email: req.body.email,
                id: response.id
            }

            const token = jwt.sign(usuario, process.env.secretKey, { expiresIn: "4h" })
            result = { status: "OK", message: "Inicio de sesion correcto", data: { "token":token } }
        
        } else {
            result = { status: "KO", message: "Error al iniciar sesion", data: {} }
        }
        res.json(result)
    }

    iniciarSesionGoogle = async (req, res) => {
        let result = { status: "KO", message: "Error al iniciar sesion", data: {} }
        const response = await Model.iniciarSesionGoogle(req.body.email)
        if (response) {
            const usuario = {
                email: req.body.email
            }

            const token = jwt.sign(usuario, process.env.secretKey, { expiresIn: "2h" })
            result = { status: "OK", message: "Inicio de sesion correcto", data: { "token":token } }
        
        } else {
            result = { status: "KO", message: "Error al iniciar sesion", data: {} }
        }
        res.json(result)
    }

    iniciarSesionGithub = async (req, res) => {
        let result = { status: "KO", message: "Error al iniciar sesion", data: {} }
        const response = await Model.iniciarSesionGithub(req.body.email)
        if (response) {
            const usuario = {
                email: req.body.email,
            }

            const token = jwt.sign(usuario, process.env.secretKey, { expiresIn: "2h" })
            result = { status: "OK", message: "Inicio de sesion correcto", data: { "token":token } }
        
        } else {
            result = { status: "KO", message: "Error al iniciar sesion", data: {} }
        }
        res.json(result)
    }

    cogerPosts = async (req, res) => {
        try {
            let result;
            const response = await Model.cogerPosts(req, req.body.titulo);
            
            if (response !== false) {
                console.log(response)
                result = { status: "OK", message: "Posts obtenidos", data: response };
            } else {
                result = { status: "KO", message: "Error al obtener los proyectos", data: {} };
            }
    
            res.json(result);
        } catch (error) {
            console.error("Error en el controlador cogerPosts:", error.message);
            res.status(500).json({ status: "KO", message: "Error interno del servidor" });
        }
    }

}
