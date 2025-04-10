import { Link } from "react-router-dom";

export const BotonEliminar = ({id, entidad}) => {
    return(
        <>  
            <Link to={`/${entidad}/eliminar/${id}`}>
                <button type="button" className="btn btn-danger">Borrar</button>
            </Link>
            
        </>
        
    );
}

