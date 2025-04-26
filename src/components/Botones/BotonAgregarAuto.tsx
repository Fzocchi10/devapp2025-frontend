import { Link } from "react-router-dom"
import { PropsBotones } from "../Props/PropsInterfaces"


export const BotonAgregarAuto:React.FC<PropsBotones> = ({id}) => {
    return(
        <>
        <Link to={`/autos/agregar/${id}`}>
            <button type="button" className="btn btn-success"> Agregar auto</button>
        </Link>
        </>
    )
}