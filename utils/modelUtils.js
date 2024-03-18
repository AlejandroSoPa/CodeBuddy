import mysql from "mysql2/promise"

export async function conexionBBDD() {
    const config = {
        host: "localhost",
        port: 3306,
        user: "super",
        password: "1q2w·E4r5t6y",
        database: "codeBuddy"
    }
    
    const connection = await mysql.createConnection(config)
}

export function comprobarUsuarioRegister({ nombreUsuario, email, contrasena, contrasena2 }) {
    const usuarioNulo = comprobarObjetoNULL({ nombreUsuario, email, contrasena, contrasena2 })
    if (usuarioNulo == false) {
        return false
    } else if (nombreUsuario.length <= 2 || nombreUsuario.length > 16 || email.length <= 5 || email.length > 255 || contrasena.length < 8 || contrasena.length > 60 || !/\d/.test(contrasena) || !/[\W_]/.test(contrasena || contrasena != contrasena2)){
        return false
    }
    return true
}

function comprobarObjetoNULL(objeto) {
    for (let key in objeto) {
        if (objeto[key] == null) {
            return false
        }
    }
    return true
}

export function comprobarUsuarioLogin({ email, contrasena }) {
    const usuarioNulo = comprobarObjetoNULL({ email, contrasena })
    if (usuarioNulo == false) {
        return false
    } else if (email.length <= 5 || email.length > 255 || contrasena.length < 8 || contrasena.length > 60 || !/\d/.test(contrasena) || !/[\W_]/.test(contrasena)){
        return false
    }
    return true
}

export function comprobarUsuarioGoogle({ email }) {
    const usuarioNulo = comprobarObjetoNULL({ email})
    if (usuarioNulo == false) {
        return false
    } else if (email.length <= 5 || email.length > 255){
        return false
    }
    return true
}

export function comprobarUsuarioGithub({ email }) {
    const usuarioNulo = comprobarObjetoNULL({ email})
    if (usuarioNulo == false) {
        return false
    } else if (email.length <= 5 || email.length > 255){
        return false
    }
    return true
}
