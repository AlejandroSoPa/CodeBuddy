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
import { comprobarUsuarioRegister, comprobarUsuarioLogin, comprobarTitulo } from "../../../utils/modelUtils.js"
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
                if (contador != 0) {
                    resultados.query = true
                    resultados.id = id

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

    static async crearNuevaProyecto({ titulo, descripcion, duracionEstimada, limiteUsuarios, etiquetas, plataformas, idUsuario }) {
        let transaction

        try {
            const id = uuidv4()

            transaction = await connection.beginTransaction()

            await connection.query(
                `INSERT INTO PostProyecto (id, titulo, descripcion, duracionEstimada, limiteUsuarios, fechaCreacion, estado, idUsuario)
                VALUES (?,?,?,?,?, NOW(), "buscando", ?)`,
                [id, titulo, descripcion, duracionEstimada, limiteUsuarios, idUsuario],
                { transaction }
            )

            for (let idEtiqueta of etiquetas) {
                await connection.query(
                    `INSERT INTO PostProyectoEtiqueta (idPostProyecto, idEtiqueta)
                    VALUES (?,?)`,
                    [id, idEtiqueta],
                    { transaction }
                )
            }

            for (let idPlataforma of plataformas) {
                await connection.query(
                    `INSERT INTO PostProyectoPlataforma (idPostProyecto, idPlataforma)
                    VALUES (?,?)`,
                    [id, idPlataforma],
                    { transaction }
                )
            }

            await connection.commit(transaction)
            return true
        } catch (e) {

            await connection.rollback(transaction)

            console.error(e.message)
            return false
        }
    }

    static async cogerPosts(req, titulo) {
        const tituloComprobado = comprobarTitulo({ titulo });
        if (!tituloComprobado) {
            return false;
        } else {
            try {
                const tituloProyecto = `%${titulo}%`; // Agregamos los caracteres comodín para buscar coincidencias parciales

                const [contador] = await connection.query(
                    "SELECT COUNT(*) FROM PostProyecto WHERE titulo = ?;",
                    [tituloProyecto]
                )

                const offset = parseInt(req.query.offset) || 0;
                const limit = 10;

                if (contador !== 0) {
                    const [proyectos] = await connection.query(
                        `SELECT id, titulo, descripcion, limiteUsuarios, estado 
                        FROM PostProyecto 
                        WHERE titulo LIKE ? 
                        ORDER BY fechaCreacion ASC 
                        LIMIT ?, ?`,
                        [tituloProyecto, offset, limit]
                    )
                    for (let i = 0; i < proyectos.length; i++) {
                        const [etiquetas] = await connection.query(
                            `SELECT id, nombre 
                            FROM Etiqueta e
                            INNER JOIN PostProyectoEtiqueta pe ON e.id = pe.idEtiqueta
                            WHERE pe.idPostProyecto = ?`,
                            [proyectos[i].id]
                        )
                        proyectos[i].etiquetas = etiquetas
                    }
                    for (let i = 0; i < proyectos.length; i++) {
                        const [plataformas] = await connection.query(
                            `SELECT id, nombre 
                            FROM Plataforma p
                            INNER JOIN PostProyectoPlataforma pp ON p.id = pp.idPlataforma
                            WHERE pp.idPostProyecto = ?`,
                            [proyectos[i].id]
                        )
                        proyectos[i].plataformas = plataformas
                    }
                    return proyectos
                } else return false
            } catch (e) {
                console.error(e.message);
                // Manejar el error adecuadamente, puedes lanzar una excepción, enviar un mensaje de error, etc.
                return false;
            }
        }
    }
}