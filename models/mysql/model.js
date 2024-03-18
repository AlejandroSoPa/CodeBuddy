// Aqui iria toda la conexion a la base de datos


// import validateUUID from "uuid-validate"

import {v4 as uuidv4} from "uuid";
import {comprobarUsuarioRegister, comprobarUsuarioLogin, conexionBBDD} from "../../utils/modelUtils.js"

const connection = conexionBBDD()

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

    static async cogerPosts() {
        try {
            const offset = parseInt(req.query.offset) || 0;
            const limit = 10;

            connection.query('SELECT * FROM PostProyecto LIMIT ?, ?', [offset, limit], (error, results) => {
                if (error) {
                    res.status(500).json({ message: error.message });
                } else {
                    res.json(results);
                }
            });
        } catch (e) {
            console.error(e.message)
        }
    }
}