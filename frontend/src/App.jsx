// import './componentsCSS/App.css'
// import { EjemploComponentes } from './components/EjemploComponentes'
import './App.css'
import axios from 'axios';

// Componentes
import { Header } from './components/Header/Header'
import { CrearCuenta } from './components/CrearCuenta/CrearCuenta'
import { IniciarSesion } from './components/IniciarSesion/InicialSesion'
import { RecuperarContrasena } from './components/RecuperarContrasena/RecuperarContrasena'


export function App() {
    // const props = { inicialTextoH2: "Adiós2", textoH3: "Adiós3" }

    return (
        // Hay que usar <></> para devolver varios elementos, <> </> es lo mismo que <React.Fragment></React.Fragment>
        <>
            {
                /*
                <EjemploComponentes inicialTextoH2={"Hola2"} textoH3="Hola3">
                    <i>Hola1</i>
                </EjemploComponentes>
    
                { Otra forma de pasar props }
                <EjemploComponentes {...props}>
                    Adiós1
                </EjemploComponentes>
                */
            }
            <Header />
            <main>
                <CrearCuenta />

            </main>
            <div></div>
        </>
    )
}