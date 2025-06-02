import { Link, useParams} from "react-router-dom";
import apiClient from "../apiClient/apiClient";
import { useState } from "react";

export const EliminarAuto= () => {
    const { id } = useParams();
    const [errMsg, setErrMsg] = useState<string>('');

    const ELIMINAR_AUTO = `/autos/${id}`; 

    const eliminar = async () => {
        try {
            await apiClient.delete(ELIMINAR_AUTO);
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('Error al eliminar el vehículo');
            }
        }
    };

    return (
        <>
        {errMsg && (
            <div className="alert alert-danger text-center">{errMsg}</div>
        )}

        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4 text-center">
                        <h2 className="mb-3">Eliminar Auto</h2>
                        <p>¿Estás seguro de que deseas eliminar el auto?</p>
                        
                        <div className="d-flex justify-content-center gap-3 mt-4">
                            <Link to="/autos">
                                <button onClick={eliminar} className="btn btn-primary">Confirmar</button>   
                            </Link>
                            <Link to="/autos">
                                <button className="btn btn-primary"> Cancelar</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};