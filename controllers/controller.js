import { Model } from "../models/mysql/model.js"
import jwt from "jsonwebtoken"

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
        const response = await Model.crearCuenta(req.body.nombre, req.body.email, req.body.password, req.body.password2)
        if (response) {
            result = { status: "OK", message: "Cuenta creada", data: {} }
        } else {
            result = { status: "KO", message: "Error al crear la cuenta", data: {} }
        }
        res.json(result)
    }

    iniciarSesion = async (req, res) => {
        let result = { status: "KO", message: "Error al iniciar sesion", data: {} }
        const response = await Model.crearCuenta(req.body.email, req.body.password)
        if (response) {
            result = { status: "OK", message: "Inicio de sesion correcto", data: {} }
        } else {
            result = { status: "KO", message: "Error al crear la cuenta", data: {} }
        }
        res.json(result)
    }

}
