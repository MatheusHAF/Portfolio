import Home from './Home'
import Sobre from './Sobre'
import Projetos from './Projetos'
import Contato from './Contato'
import './StylesModules/Main.module.css'

function Main() {
    return(
        <main>
            <Home/>
            <Sobre/>
            <Projetos/>
            <Contato/>
        </main>
    )
}
export default Main