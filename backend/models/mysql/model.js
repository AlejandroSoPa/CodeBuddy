// Aqui iria toda la conexion a la base de datos


import mysql from "mysql2/promise"
// import validateUUID from "uuid-validate"

import dotenv from 'dotenv';
dotenv.config(); // inicializar dotenv

const config = {
    host: process.env.dbConnection,
    port: process.env.dbPort,
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: process.env.dbName
}

const connection = await mysql.createConnection(config)

import { v4 as uuidv4 } from "uuid";
import { comprobarUsuarioRegister, comprobarUsuarioLogin } from "../../../utils/modelUtils.js"
// Aqui es donde iran las consultas a la base de datos
export class Model {
    static async helloWorld() {
        return "Hello World!"
    }

    static async crearCuenta(nombreUsuario, email, contrasena, contrasena2, contrasenaEncriptada) {
        const usarioCorrecto = comprobarUsuarioRegister({ nombreUsuario, email, contrasena, contrasena2 });
        let resultados = {
            query: false,
            nombreExiste: false,
            emailExiste: false
        }

        if (usarioCorrecto == false) {
            return resultados
        } else {
            try {
                var [[{ contadorNombre }]] = await connection.query(
                    `SELECT COUNT(*) as contadorNombre FROM Usuario WHERE nombre = ?`,
                    [nombreUsuario]
                )

                var [[{ contadorEmail }]] = await connection.query(
                    `SELECT COUNT(*) as contadorEmail FROM Usuario WHERE correo = ?`,
                    [email]
                )
                if (contadorNombre === 1) {
                    resultados.nombreExiste = true
                }

                if (contadorEmail === 1) {
                    resultados.emailExiste = true
                }

                if (contadorNombre === 0 && contadorEmail === 0) {
                    const id = uuidv4();
                    await connection.query(
                        `INSERT INTO Usuario (id, nombre, correo, contrasena)
                        VALUES (?,?,?,?)`,
                        [id, nombreUsuario, email, contrasenaEncriptada]
                    )
                    resultados.query = true
                }
            } catch (e) {
                console.error(e.message)
            }
            return resultados
        }
    }

    static async iniciarSesion(email, contrasena, contrasenaEncriptada) {
        const usarioCorrecto = comprobarUsuarioLogin({ email, contrasena });
        if (usarioCorrecto == false) {
            return false
        } else {
            try {
                var duplicado = await connection.query(
                    `SELECT COUNT(*) FROM Usuario WHERE correo = ? AND contrasena = ?`,
                    [email, contrasenaEncriptada]
                )
                // Sacamos el valor del count debido que duplicado es una matriz multidimensional 
                // debido a que connection.query devuelve un arreglo de resultados
                const count = duplicado[0][0]['COUNT(*)'];

                if (count != 0) {
                    return true
                } else {
                    return false
                }
            } catch (e) {
                console.error(e.message)
            }
        }
    }

    static async iniciarSesionGoogle(email) {
        const usarioCorrecto = comprobarUsuarioLogin({ email, contrasena });
        try {
            var duplicado = await connection.query(
                `SELECT COUNT(*) FROM Usuario WHERE correo = ?`,
                [email]
            )
            // Sacamos el valor del count debido que duplicado es una matriz multidimensional 
            // debido a que connection.query devuelve un arreglo de resultados
            const count = duplicado[0][0]['COUNT(*)'];

            if (count != 0) {
                return true
            } else {
                return false
            }
        } catch (e) {
            console.error(e.message)
        }
    }

    static async iniciarSesionGithub(email) {
        const usarioCorrecto = comprobarUsuarioLogin({ email });
        try {
            var duplicado = await connection.query(
                `SELECT COUNT(*) FROM Usuario WHERE correo = ?`,
                [email]
            )
            // Sacamos el valor del count debido que duplicado es una matriz multidimensional 
            // debido a que connection.query devuelve un arreglo de resultados
            const count = duplicado[0][0]['COUNT(*)'];

            if (count != 0) {
                return true
            } else {
                return false
            }
        } catch (e) {
            console.error(e.message)
        }
    }
}