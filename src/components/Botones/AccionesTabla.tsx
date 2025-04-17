import { BotonEliminar } from "../Botones/BotonEliminar"
import { BotonInfo } from "../Botones/BotonInfo"
import { BotonModificar } from "../Botones/BotonModificar"

export const AccionesTabla = ({entidad, id}) => {
    return (
    <>
        <BotonInfo entidad={entidad} id={id} />
        <BotonModificar entidad={entidad} id={id}/>
        <BotonEliminar  entidad={entidad} id={id}/>
    </>)
}