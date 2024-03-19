// import './componentsCSS/App.css'
// import { EjemploComponentes } from './components/EjemploComponentes'
import './App.css'

// Componentes
import { Header } from './components/Header/Header'
import { CrearCuenta } from './components/CrearCuenta/CrearCuenta'
import { IniciarSesion } from './components/IniciarSesion/InicialSesion'
import { RecuperarContrasena } from './components/RecuperarContrasena/RecuperarContrasena'
import { PostProyectoPreview } from './components/PostProyectoPreview/PostProyectoPreview'


export function App() {
    // const props = { inicialTextoH2: "Adiós2", textoH3: "Adiós3" }
    const ejemploProps = {
        id: "123",
        titulo: "Este texto es tan largo que no podria entrar dentro de lo que sea que sea esto",
        descripcion: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sapien dui, pellentesque id lorem quis, dignissim sodales nisi. Morbi dignissim varius imperdiet. Duis posuere, dolor ut luctus placerat, erat turpis cursus felis, eget cursus sem neque vel velit. Morbi laoreet, odio sit amet eleifend pretium, lectus tortor finibus lorem, quis consequat libero nunc facilisis dui. Quisque rutrum sodales dolor, vitae convallis nisl commodo non. In ultricies purus quis auctor feugiat. Quisque non dolor et magna mattis rutrum. Sed scelerisque nulla vel viverra tristique. Donec pulvinar est et egestas tincidunt. Praesent libero metus, ornare a nunc sit amet, ullamcorper sagittis orci. Vestibulum mi nisl, finibus sed elit quis, mollis blandit mi. Quisque consectetur rhoncus auctor. Aenean dignissim augue erat, vel malesuada mi gravida sit amet. Vivamus maximus felis et orci finibus dapibus a at sem. Sed tincidunt, nisi sit amet sodales dapibus, lectus orci consequat mauris, nec luctus dolor enim et ex.
        Donec condimentum laoreet leo in luctus. Quisque commodo pharetra tellus, et rhoncus elit iaculis sit amet. Vestibulum pretium molestie est quis eleifend. Quisque ornare libero at venenatis euismod. Vivamus volutpat quam porta lectus sodales, eget semper enim ultrices. Ut a nulla vitae augue elementum ultricies. Nulla fermentum dui quam, vel elementum purus pretium et.
        
        Integer eu vestibulum arcu. Ut egestas suscipit dui, ac commodo urna cursus sit amet. Etiam egestas, quam at porttitor aliquet, augue tortor porttitor odio, ut sagittis massa eros id elit. Ut fermentum magna quam, vel convallis purus vulputate vitae. Vivamus quis sagittis diam, ut eleifend augue. Proin porttitor ligula a eleifend sodales. Curabitur in ipsum blandit, faucibus nibh in, venenatis lacus. Fusce pulvinar nisi orci, nec convallis felis luctus vel. Sed ac sagittis odio. Pellentesque hendrerit porttitor leo. Praesent at massa nulla. Sed vel maximus lacus.
        
        Quisque laoreet, est vel suscipit accumsan, lacus neque pellentesque lorem, egestas auctor tellus sem sit amet quam. Etiam dapibus, nisl a laoreet pulvinar, nunc orci commodo diam, sed vehicula mi orci eget est. Vestibulum pellentesque vehicula turpis, in sagittis ligula venenatis eu. Sed malesuada dignissim tortor, ullamcorper tincidunt dolor condimentum id. Proin vel justo in neque sodales condimentum eget eget justo. Sed ac pretium lectus, interdum porttitor ligula. Nam leo justo, molestie ac feugiat efficitur, eleifend ut massa.
        
        Nunc dignissim hendrerit diam id tincidunt. Phasellus pellentesque odio ut est sodales, sit amet aliquam ex bibendum. Nam vitae ex id justo pretium sagittis ut eget libero. Sed interdum magna commodo varius fermentum. Nam vel nunc sit amet nulla tempus dictum. Quisque gravida magna quis tortor laoreet vulputate. Morbi ornare malesuada mauris a sollicitudin. Integer quis lectus ut velit euismod lobortis id non justo. Curabitur placerat risus eget ipsum ultrices, sed vehicula justo ullamcorper. Pellentesque blandit sem id pellentesque efficitur. Morbi ut pulvinar tellus. Mauris sodales justo sit amet varius ornare. `,
        etiquetas: ["PHP", "HTML", "CSS", "JavaScript", "Laravel", "React"],
        plataformas: ["WEB", "MOVIL", "Desktop"]
    }
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
                <div className='posts'>
                    <PostProyectoPreview {...ejemploProps} />
                    <PostProyectoPreview
                        id="124"
                        titulo="Titulo"
                        descripcion="Descripcion"
                        etiquetas={["PHP", "HTML", "CSS", "JavaScript", "Laravel", "React"]}
                        plataformas={["WEB", "MOVIL", "Desktop"]}
                    />
                    <PostProyectoPreview
                        id="125"
                        titulo="Titulo"
                        descripcion="Descripcion"
                        etiquetas={["PHP", "HTML", "CSS", "JavaScript", "Laravel", "React"]}
                        plataformas={["Desktop", "MOVIL", "Web"]}
                    />
                    <PostProyectoPreview
                        id="126"
                        titulo="Titulo"
                        descripcion="Descripcion"
                        etiquetas={["PHP", "HTML", "CSS", "JavaScript", "Laravel", "React"]}
                        plataformas={["WEB", "MOVIL", "Desktop"]}
                    />

                </div>

            </main>
            <div></div>
        </>
    )
}