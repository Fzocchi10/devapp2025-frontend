import { Link } from "react-router-dom";
import { PropsBotones } from "../Props/PropsInterfaces";

export const BotonEliminar:React.FC<PropsBotones> = ({id, entidad}) => {
    return(
        <>  
            <Link to={`/${entidad}/eliminar/${id}`}>
                <button type="button" className="btn btn-danger">Borrar</button>
            </Link>
            
        </>
        
    );
}

