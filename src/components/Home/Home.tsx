import { Link } from "react-router-dom";
import { BotonGenerico } from "../Botones/BotonGenerico";

const Home = () => {
    return (
        <>
        <div className="button-container">
            <Link to="/personas">
                <BotonGenerico className={"agrandarBoton"} titulo={"Personas"} funcion={""}/>
            </Link>
            <Link to="/autos">
                <BotonGenerico className={"agrandarBoton"} titulo={"Autos"} funcion={""}/>
            </Link>
        </div>
            

        </>
    )
}

export default Home;