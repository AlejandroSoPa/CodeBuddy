// Aqui iria toda la conexion a la base de datos


import mysql from "mysql2/promise"
import validateUUID from "uuid-validate"

const config = {
    host: "localhost",
    port: 3307,
    user: "admin",
    password: "admin123",
    database: "moviesdb"
}

const connection = await mysql.createConnection(config)

import {v4 as uuidv4} from "uuid";
import {comprobarUsuario} from "../../utils/modelUtils.js"
// Aqui es donde iran las consultas a la base de datos
export class Model {
    static async helloWorld() {
        return "Hello World!"
    }

    static async crearCuenta(nombreUsuario, email, contrasena) {
        const usarioCorrecto = comprobarUsuario({ email, contrasena, nombreUsuario});
        if (usarioCorrecto == false) {
            return "Usuario incorrecto"
        } else {
            try {
                const id = uuidv4();
                await connection.query(
                    `INSERT INTO Usuario (id, nombre, correo, contrasena, idIdioma, descripcion, idNivel)
                    VALUES (?,?,?,SHA2(?,512))`,
                    [id, nombreUsuario, email, contrasena, 1, "", null]
                )
            } catch (e) {
                // Puede enviar al usuario info sensible
                throw new Error("Error create new movie")
                // Enviar error por ahi xD
            }
            return "Cuenta creada"
        }
    }
}