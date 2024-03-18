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
        let result = { status: "KO", message: "Error al crear la cuenta", data: {} }
        let cadena = req.body.password
        const contrasenaEncriptada = crypto.createHash('sha512').update(cadena).digest('hex');
        const response = await Model.crearCuenta(req.body.nombre, req.body.email, req.body.password, req.body.password2, contrasenaEncriptada)
        if (response) {
            result = { status: "OK", message: "Cuenta creada", data: {} }
        } else {
            result = { status: "KO", message: "Error al crear la cuenta", data: {} }
        }
        res.json(result)
    }

    iniciarSesion = async (req, res) => {
        let result = { status: "KO", message: "Error al iniciar sesion", data: {} }
        let cadena = req.body.password
        const contrasenaEncriptada = crypto.createHash('sha512').update(cadena).digest('hex');
        const response = await Model.iniciarSesion(req.body.email, req.body.password, contrasenaEncriptada)
        if (response) {
            const usuario = {
                email: req.body.email,
                password: contrasenaEncriptada,
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
        let result = { status: "KO", message: "Error al coger los posts", data: {} }
        const response = await Model.cogerPosts()
        if (response) {
            result = { status: "OK", message: "Posts cogidos", data: response }
        } else {
            result = { status: "KO", message: "Error al coger los posts", data: {} }
        }
        res.json(result)
    }

}
