// Aqui iria toda la conexion a la base de datos


// import validateUUID from "uuid-validate"

import {v4 as uuidv4} from "uuid";
import {comprobarUsuarioRegister, comprobarUsuarioLogin, conexionBBDD} from "../../utils/modelUtils.js"

//const connection = conexionBBDD()

import mysql from "mysql2/promise"

const config = {
    host: "localhost",
    port: 3306,
    user: "super",
    password: "1q2w·E4r5t6y",
    database: "codeBuddy"
}

const connection = await mysql.createConnection(config)

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
        let resultados = {
            query: false,
            emailExiste: false,
            id: ''
        }
        if (usarioCorrecto == false) {
            return false
        } else {
            try {
                var [[{ contador, id }]] = await connection.query(
                    `SELECT COUNT(*) as contador, id FROM Usuario WHERE correo = ? AND contrasena = ?`,
                    [email, contrasenaEncriptada]
                )
                
                // Sacamos el valor del count debido que duplicado es una matriz multidimensional 
                // debido a que connection.query devuelve un arreglo de resultados
                // const count = duplicado[0][0]['COUNT(*)'];
                
                console.log(contador, id)

                resultados.id = id

                if (contador != 0) {
                    resultados.query = true
                    resultados.emailExiste = true
                    return resultados
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

    static async cogerPosts(titulo) {
        const tituloComprobado = comprobarTitulo({ titulo });
        if (tituloComprobado == false) {
            return false
        } else {
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
}