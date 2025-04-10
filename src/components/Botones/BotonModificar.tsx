import { Link } from "react-router-dom"

export const BotonModificar = ({entidad, id}) => {
    return(
        <>
        <Link to={`/${entidad}/editar/${id}`}>
            <button type="button" className="btn btn-warning">Editar</button>
        </Link>
        </>
    )
}