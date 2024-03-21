import jwt from 'jsonwebtoken'

export function comprobarUsuarioRegister({ nombreUsuario, email, contrasena, contrasena2 }) {
    const usuarioNulo = comprobarObjetoNULL({ nombreUsuario, email, contrasena, contrasena2 })
    if (usuarioNulo == false) {
        return false
    } else if (nombreUsuario.length <= 2 || nombreUsuario.length > 16 || email.length <= 5 || email.length > 255 || contrasena.length < 8 || contrasena.length > 60 || !/\d/.test(contrasena) || !/[\W_]/.test(contrasena || contrasena != contrasena2)) {
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
    } else if (email.length <= 5 || email.length > 255 || contrasena.length < 8 || contrasena.length > 60 || !/\d/.test(contrasena) || !/[\W_]/.test(contrasena)) {
        return false
    }
    return true
}

export function comprobarUsuarioGoogle({ email }) {
    const usuarioNulo = comprobarObjetoNULL({ email })
    if (usuarioNulo == false) {
        return false
    } else if (email.length <= 5 || email.length > 255) {
        return false
    }
    return true
}

export function comprobarUsuarioGithub({ email }) {
    const usuarioNulo = comprobarObjetoNULL({ email })
    if (usuarioNulo == false) {
        return false
    } else if (email.length <= 5 || email.length > 255) {
        return false
    }
    return true
}

export function comprobarTitulo({ titulo }) {
    const usuarioNulo = comprobarObjetoNULL({ titulo })
    if (usuarioNulo == false) {
        return false
    }
    return true
}

export function comprobarPostProyecto({ titulo, descripcion, duracionEstimada, limiteUsuarios, etiquetas, plataformas }) {
    return titulo && titulo.length > 0 && titulo.length <= 255
        && descripcion && descripcion.length > 0 && descripcion.length <= 255
        && duracionEstimada && duracionEstimada > 0 && duracionEstimada <= 100
        && limiteUsuarios && limiteUsuarios > 0 && limiteUsuarios <= 100
        && etiquetas && etiquetas.length > 0 && etiquetas.length <= 255
        && plataformas && plataformas.length > 0 && plataformas.length <= 255
}



export function verificarToken(token) {
    let respuesta
    const secretKey = process.env.secretKey

    jwt.verify(token, secretKey, (error, decodificado) => {
        if (error) {
            // El token no es válido
            console.error('Error al verificar el token:', error.message);
            // Puedes manejar el error de acuerdo a tus necesidades (por ejemplo, respondiendo con un error 401)
            respuesta = false
        } else {
            // El token es válido
            // Puedes acceder a la información del usuario a través de decodedToken
            respuesta = decodificado
        }
    })

    return respuesta
}