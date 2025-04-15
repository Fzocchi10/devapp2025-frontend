import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Auto } from "../../modelos/Auto";
import apiClient from "../apiClient/apiClient";
import { Navbar } from "../Navbar/Navbar";

const InfoAuto = () => {
    const {id} = useParams();
    const [auto,setAuto] = useState<Auto>();
    const [error, setError] = useState<string>('');

    const OBTENER_AUTO = `/autos/${id}`;

    const obtenerAuto= async () => {
        try {
          const response = await apiClient.get<Auto>(OBTENER_AUTO);
          setAuto(response.data);
        } catch (err: any) {
          setError('Error al obtener el auto');
        }
      };

      useEffect(() => {
        obtenerAuto();
     }, []);

    return (
        <>
        <Navbar />
        {error}
        <div className="centrarContenido">
            <p><strong>Marca:</strong>  {auto?.marca}</p>
            <p><strong>Modelo:</strong>  {auto?.modelo}</p>
            <p><strong>Patente:</strong>  {auto?.patente}</p>
            <p><strong>Año:</strong>  {auto?.año}</p>
            <p><strong>Color:</strong>  {auto?.color}</p>
        </div>
        </>
    )
}

export default InfoAuto;