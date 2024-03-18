import { Router } from "express"
import { Controller } from "../controllers/controller.js"

export const createRouter = () => {
    const router = Router()

    const dbController = new Controller()

    router.get("/", dbController.itWorks)
    router.get("/hello", dbController.helloWorld)
    router.post("/crearCuenta", dbController.crearCuenta)
    router.post("/iniciarSesion", dbController.iniciarSesion)
    router.post("/iniciarSesionGoogle", dbController.iniciarSesionGoogle)
    router.post("/iniciarSesionGithub", dbController.iniciarSesionGithub)
    router.get("/cogerPosts", dbController.cogerPosts)

    return router;
}