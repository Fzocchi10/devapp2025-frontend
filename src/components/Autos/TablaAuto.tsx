import { useState } from "react";
import { Auto } from "../../modelos/Auto"
import { AccionesTabla } from "../Botones/AccionesTabla"
import Paginacion from "../Paginacion/Paginacion"

export const TablaAuto = ({ autos, cantidadE }: { autos: Auto[], cantidadE: number }) => {
    const [autosPaginados, setAutosPaginados] = useState<Auto[]>([]);

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
                        {autosPaginados.map((auto) => (
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
            <div className="fixed-bottom-0 start-0 w-100 bg-white py-2 border-top">
                <Paginacion elementos={autos} cantidad={cantidadE} onPaginaChange={setAutosPaginados} />
            </div>
            
        </>
    )
}
