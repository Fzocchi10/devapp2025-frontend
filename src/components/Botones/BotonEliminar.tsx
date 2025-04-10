import { Link } from "react-router-dom";

export const BotonEliminar = ({id, entidad}) => {
    return(
        <>  
            <Link to={`/${entidad}/${id}`}>
                <button type="button" className="btn btn-danger">Eliminar</button>
            </Link>
            
        </>
        
    );
}

