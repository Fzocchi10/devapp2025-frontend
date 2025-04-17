import { Auto } from "../../modelos/Auto"
import { AccionesTabla } from "../Botones/AccionesTabla"

export const TablaAuto = ({ autos }: { autos: Auto[] }) => {
    return (
        <>
            {autos.length === 0 ? (
                <div>No se encontraron autos.</div>
            ) : (
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center">Patente</th>
                            <th className="text-center">Marca</th>
                            <th className="text-center">Modelo</th>
                            <th className="text-center">Año</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {autos.map((auto) => (
                            <tr key={auto.id}>
                                <td className="text-center">{auto.patente}</td>
                                <td className="text-center">{auto.marca}</td>
                                <td className="text-center">{auto.modelo}</td>
                                <td className="text-center">{auto.año}</td>
                                <td className="text-center">
                                    <AccionesTabla entidad={"autos"} id={auto.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}
