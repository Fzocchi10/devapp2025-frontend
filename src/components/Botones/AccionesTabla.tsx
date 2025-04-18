import { BotonEliminar } from "../Botones/BotonEliminar"
import { BotonInfo } from "../Botones/BotonInfo"
import { BotonModificar } from "../Botones/BotonModificar"

export const AccionesTabla = ({entidad, id}) => {
    return (
    <> 
        <div className="d-flex justify-content-center gap-2">
            <BotonInfo entidad={entidad} id={id} />
            <BotonModificar entidad={entidad} id={id}/>
            <BotonEliminar  entidad={entidad} id={id}/>
        </div>
    </>)
}