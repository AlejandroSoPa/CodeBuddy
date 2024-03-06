import { Model } from "../models/mysql/model.js"

export class Controller {

    helloWorld = async (req, res) => {
        const response = await Model.helloWorld()
        res.json(response)
    }
}
