export function comprobarUsuarioRegister({ nombreUsuario, email, contrasena, contrasena2 }) {
    const usuarioNulo = comprobarObjetoNULL({ nombreUsuario, email, contrasena, contrasena2 })
    if (usuarioNulo == false) {
        return false
    } else if (nombreUsuario.length <= 2 || nombreUsuario.length > 16 || email.length <= 5 || contrasena.length < 8 || contrasena.length > 60 || !/\d/.test(contrasena) || !/[\W_]/.test(contrasena || contrasena != contrasena2)){
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
    const usuarioSinRegistrar = comprobarObjetoNULL({ email, contrasena })
    if (usuarioSinRegistrar == false) {
        return false
    } else if (email.length <= 5 || contrasena.length < 8 || contrasena.length > 60 || !/\d/.test(contrasena) || !/[\W_]/.test(contrasena)){
        return false
    }
    return true
}
