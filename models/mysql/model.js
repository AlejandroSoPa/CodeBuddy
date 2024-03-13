// Aqui iria toda la conexion a la base de datos


import mysql from "mysql2/promise"
// import validateUUID from "uuid-validate"

const config = {
    host: "localhost",
    port: 3306,
    user: "super",
    password: "1q2w·E4r5t6y",
    database: "codeBuddy"
}

const connection = await mysql.createConnection(config)

import {v4 as uuidv4} from "uuid";
import {comprobarUsuarioRegister, comprobarUsuarioLogin} from "../../utils/modelUtils.js"
// Aqui es donde iran las consultas a la base de datos
export class Model {
    static async helloWorld() {
        return "Hello World!"
    }

    static async crearCuenta(nombreUsuario, email, contrasena, contrasena2, contrasenaEncriptada) {
        const usarioCorrecto = comprobarUsuarioRegister({ nombreUsuario, email, contrasena, contrasena2 });
        if (usarioCorrecto == false) {
            return false
        } else {
            try {
                var duplicado = await connection.query(
                    `SELECT COUNT(*) FROM Usuario WHERE correo = ? OR nombre = ?`,
                    [email, nombreUsuario]
                )
                
                // Sacamos el valor del count debido que duplicado es una matriz multidimensional 
                // debido a que connection.query devuelve un arreglo de resultados
                const count = duplicado[0][0]['COUNT(*)'];

                if (count === 0) {
                    const id = uuidv4();
                    await connection.query(
                        `INSERT INTO Usuario (id, nombre, correo, contrasena)
                        VALUES (?,?,?,?)`,
                        [id, nombreUsuario, email, contrasenaEncriptada]
                    )
                } else {
                    return false
                }
            } catch (e) {
                console.error(e.message)
            }
            return true
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
}