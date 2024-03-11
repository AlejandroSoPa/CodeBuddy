import { useState } from 'react'

/*
Children es el contenido que se pone entre las etiquetas de apertura y cierre de un componente,
coge absolutamente todo lo que pongas entre medio, incluyendo otros componentes.
*/
export function EjemploComponentes({ children, textoH1, inicialTextoH2, textoH3 }) {
    // useState es un hook que devuelve un array con dos elementos, el primero es el valor de la variable y el segundo es una función para actualizarla
    //Ejemplos utiles para nuestro caso: para seguir a un usuario
    // No es el mejor ejemplo, uno bueno seria un boton de following, pero es lo que hay chaval
    const [textoH2, setTextoH2] = useState(inicialTextoH2)
    const actualizarTextoH2 = () => {
        const nuevoTexto = prompt("Introduce el nuevo texto")
        setTextoH2(nuevoTexto || textoH2)
    }


    return (
        <div>
            <h1>{children}</h1>
            <h2>{textoH2}</h2>
            <h3>{textoH3}</h3>
            <button onClick={actualizarTextoH2}>Cambiar texto</button>
        </div>
    )
}