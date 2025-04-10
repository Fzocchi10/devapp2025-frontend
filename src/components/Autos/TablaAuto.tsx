import { Auto } from "../../modelos/Auto"
import { BotonEliminar } from "../Botones/BotonEliminar"
import { BotonInfo } from "../Botones/BotonInfo"
import { BotonModificar } from "../Botones/BotonModificar"

export const TablaAuto = ({ autos }: { autos: Auto[] }) => {
    return (
        <>
            {autos.length === 0 ? (
                <div>No se encontraron autos.</div>
            ) : (
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th>Patente</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Año</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {autos.map((auto) => (
                            <tr key={auto.id}>
                                <td>{auto.patente}</td>
                                <td>{auto.marca}</td>
                                <td>{auto.modelo}</td>
                                <td>{auto.año}</td>
                                <td>
                                    <BotonInfo entidad={"autos"} id={auto.id} />
                                    <BotonModificar entidad={"autos"} id={auto.id}/>
                                    <BotonEliminar id={auto.id} entidad={"autos"} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}
