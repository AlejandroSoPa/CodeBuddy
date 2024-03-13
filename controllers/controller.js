import { Model } from "../models/mysql/model.js"
import jwt from "jsonwebtoken"
import crypto from "crypto"

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

            let decode = null

            jwt.verify(token, process.env.secretKey, (error, decodedToken) => {
                if (error) {
                    // El token no es válido
                    console.error('Error al verificar el token:', error.message);
                    // Puedes manejar el error de acuerdo a tus necesidades (por ejemplo, respondiendo con un error 401)
                } else {
                    // El token es válido
                    // console.log('Token verificado con éxito:', decodedToken);
                    // Puedes acceder a la información del usuario a través de decodedToken
                    decode = decodedToken
                }
            })

            result = { status: "OK", message: "Inicio de sesion correcto", data: { "token":token, "decode":decode } }
        } else {
            result = { status: "KO", message: "Error al crear la cuenta", data: {} }
        }
        res.json(result)
    }

}
