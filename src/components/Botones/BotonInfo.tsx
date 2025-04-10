import { Link } from "react-router-dom"

export const BotonInfo = ({entidad, id}) => {
    return(
        <>
        <Link to={`/${entidad}/info/${id}`}>
            <button type="button" className="btn btn-primary">Ver</button>
        </Link>
        </>
    )
}