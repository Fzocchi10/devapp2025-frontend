import { Link } from "react-router-dom"


export const BotonAgregarAuto= ({id}) => {
    return(
        <>
        <Link to={`/autos/agregar/${id}`}>
            <button type="button" className="btn btn-success"> Agregar auto</button>
        </Link>
        </>
    )
}