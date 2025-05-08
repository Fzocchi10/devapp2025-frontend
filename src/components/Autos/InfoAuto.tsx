import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AutoInfo } from "../../modelos/Auto";
import apiClient from "../apiClient/apiClient";
import { Navbar } from "../Navbar/Navbar";

const InfoAuto = () => {
    const {id} = useParams();
    const [auto,setAuto] = useState<AutoInfo>();
    const [error, setError] = useState<string>('');

    const OBTENER_AUTO = `/autos/${id}`;

    const obtenerAuto= async () => {
        try {
          const response = await apiClient.get<AutoInfo>(OBTENER_AUTO);
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
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow p-4 mb-4">
              <h3 className="card-title text-center mb-4">Informacion del auto</h3>
                <div className="card-body">
                <p><strong>Marca:</strong>  {auto?.marca}</p>
                <p><strong>Modelo:</strong>  {auto?.modelo}</p>
                <p><strong>Patente:</strong>  {auto?.patente}</p>
                <p><strong>Año:</strong>  {auto?.anio}</p>
                <p><strong>Color:</strong>  {auto?.color}</p>
                <p><strong>Motor:</strong>  {auto?.motor}</p>
                <p><strong>Numero de chasis:</strong>  {auto?.numeroChasis}</p>
                <p><strong>Dueño:</strong>  {auto?.duenio}</p>
              </div>
            </div>
            </div>
          </div>
        </>
    )
}

export default InfoAuto;