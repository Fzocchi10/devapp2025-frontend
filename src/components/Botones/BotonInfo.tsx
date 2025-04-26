import { Link } from "react-router-dom"
import { PropsBotones } from "../Props/PropsInterfaces"

export const BotonInfo:React.FC<PropsBotones> = ({entidad, id}) => {
    return(
        <>
        <Link to={`/${entidad}/info/${id}`}>
            <button type="button" className="btn btn-primary">Ver</button>
        </Link>
        </>
    )
}