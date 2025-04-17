import { Link, useNavigate, useParams} from "react-router-dom";
import apiClient from "../apiClient/apiClient";
import { useState } from "react";

export const EliminarPersona = () => {
    const { id } = useParams();
    const [errMsg, setErrMsg] = useState<string>('');
    const navigate = useNavigate();

    const ELIMINAR_PERSONA = `/persona/${id}`; 

    const eliminar = async () => {
        try {
            await apiClient.delete(ELIMINAR_PERSONA);
            navigate('/personas');
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('Error al eliminar la persona');
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
                        <h2 className="mb-3">Eliminar Persona</h2>
                        <p>¿Estás seguro de que deseas eliminar la persona con ID: {id}?</p>
                        
                        <div className="d-flex justify-content-center gap-3 mt-4">
                            <button onClick={eliminar} className="btn btn-primary">Confirmar</button>
                            <Link to="/personas">
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