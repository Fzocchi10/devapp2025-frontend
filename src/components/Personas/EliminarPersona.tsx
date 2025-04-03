import { Link, useNavigate, useParams} from "react-router-dom";
import apiClient from "../apiClient/apiClient";
import { useState } from "react";
import { BotonGenerico } from "../Botones/BotonGenerico";

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
                setErrMsg('Error al eliminar el vehículo');
            }
        }
    };

    return (
        <>
            <div className="centrarContenido">
                <h2>Eliminar Vehículo</h2>
                <p>¿Estás seguro de que deseas eliminar el vehículo con id: {id}?</p>
                <BotonGenerico funcion={eliminar} titulo={"Confirmar"} className={"btn btn-dark"}/>
                <Link to="/personas">
                    <BotonGenerico funcion={""} titulo={"Cancelar"} className={"btn btn-dark"}/>
                </Link>
            </div>
        </>
    );
};
