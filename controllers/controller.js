import { Model } from "../models/mysql/model.js"

export class Controller {

    itWorks = async (req, res) => {
        res.send("It works!\n")
    }

    helloWorld = async (req, res) => {
        const response = await Model.helloWorld()
        res.json(response)
    }

    crearCuenta = async (req, res) => {
        let result = { status: "KO", result: "Invalid param" }
        const response = await Model.crearCuenta(req.body.nombre, req.body.email, req.body.password)
        if (response != null) {
            result = { status: "OK", result: response }
        } else {
            result = { status: "KO", result: "Error" }
        }
        res.json(result)
    }
}
