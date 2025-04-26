import { Link } from "react-router-dom"
import { PropsBotones } from "../Props/PropsInterfaces"


export const BotonAgregarAuto:React.FC<PropsBotones> = ({id, entidad}) => {
    return(
        <>
        <Link to={`/${entidad}/agregar/${id}`}>
            <button type="button" className="btn btn-success"> Agregar auto</button>
        </Link>
        </>
    )
}