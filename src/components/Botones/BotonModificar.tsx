import { Link } from "react-router-dom"
import { PropsBotones } from "../Props/PropsInterfaces"

export const BotonModificar:React.FC<PropsBotones> = ({entidad, id}) => {
    return(
        <>
        <Link to={`/${entidad}/editar/${id}`}>
            <button type="button" className="btn btn-warning">Editar</button>
        </Link>
        </>
    )
}