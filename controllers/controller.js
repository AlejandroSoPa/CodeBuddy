import { Model } from "../models/mysql/model.js"

export class Controller {

    itWorks = async (req, res) => {
        res.send("It works!")
    }

    helloWorld = async (req, res) => {
        const response = await Model.helloWorld()
        res.json(response)
    }
}
