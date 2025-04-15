import { Link } from "react-router-dom"


export const BotonAgregarPersona = () => {
    return(
        <>
        <Link to={`/personas/agregar`}>
            <button type="button" className="btn btn-success"> Agregar</button>
        </Link>
        </>
    )
    

}