import { Router } from "express"
import { Controller } from "../controllers/controller.js"

export const createRouter = () => {
    const router = Router()

    const dbController = new Controller()

    router.get("/", dbController.itWorks)
    router.get("/hello", dbController.helloWorld)
    router.post("/crearCuenta", dbController.crearCuenta)
    router.post("/iniciarSesion", dbController.iniciarSesion)

    return router;
}