import { Link, useNavigate, useParams} from "react-router-dom";
import apiClient from "../apiClient/apiClient";
import { useState } from "react";
import { BotonGenerico } from "../Botones/BotonGenerico";

export const EliminarAuto= () => {
    const { id } = useParams();
    const [errMsg, setErrMsg] = useState<string>('');
    const navigate = useNavigate();

    const ELIMINAR_AUTO = `/autos/${id}`; 

    const eliminar = async () => {
        try {
            await apiClient.delete(ELIMINAR_AUTO);
            navigate('/autos');
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('Error al eliminar el vehículo');
            }
        }
    };

    return (
        <>
            {errMsg}
            <div className="centrarContenido">
                <h2>Eliminar Auto</h2>
                <p>¿Estás seguro de que deseas eliminar el auto con id: {id}?</p>
                <BotonGenerico funcion={eliminar} titulo={"Confirmar"} className={"btn btn-dark"}/>
                <Link to="/autos">
                    <BotonGenerico funcion={""} titulo={"Cancelar"} className={"btn btn-dark"}/>
                </Link>
            </div>
        </>
    );
};