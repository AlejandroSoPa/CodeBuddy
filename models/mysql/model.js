// Aqui iria toda la conexion a la base de datos

/*
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
*/

// Aqui es donde iran las consultas a la base de datos
export class Model {
    static async helloWorld() {
        return "Hello World!"
    }
}