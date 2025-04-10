import { Link } from "react-router-dom"


export const BotonAgregar = ({entidad}) => {
    return(
        <>
        <Link to={`/${entidad}/agregar`}>
            <button type="button" className="btn btn-success"> Agregar</button>
        </Link>
        </>
    )
    

}