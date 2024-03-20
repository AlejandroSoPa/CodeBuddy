import React from 'react'
import './PostProyectoPreview.css'

export function PostProyectoPreview({ id, titulo, descripcion, etiquetas, plataformas }) {
    const LIMITADOR_ETIQUETAS = 6
    const LIMITADOR_PLATAFORMAS = 2

    function irPublicacion() {
        window.location.href = `/proyecto/${id}`
    }
    return (
        <article className="postProyectoPreview" onClick={irPublicacion}>
            <main>
                <header>
                    <h2 className="titulo">{titulo}</h2>
                </header>
                <p className='descripcion'>{descripcion}</p>
            </main>
            <aside>
                <div className='etiquetas'>
                    {etiquetas.slice(0, LIMITADOR_ETIQUETAS).map((etiqueta, index) => {
                        return <span key={index} className='etiqueta'>{etiqueta}</span>
                    })}
                </div>
                <div className="plataformas">
                    {plataformas.slice(0, LIMITADOR_PLATAFORMAS).map((plataforma, index) => {
                        return <span key={index} className='plataforma'>{plataforma}</span>
                    })}
                </div>
            </aside>

        </article>
    )
}