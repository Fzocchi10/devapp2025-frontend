import { useEffect, useState } from "react";
import apiClient from "../apiClient/apiClient";
import { Auto } from "../../modelos/Auto";
import { Navbar } from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const ListaAutos = () => {
    const OBTENERAUTOS = '/autos';
    const [autos, setAutos] = useState<Auto[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const obtenerAutos = async () => {
          try {
            const response = await apiClient.get<Auto[]>(OBTENERAUTOS);
            setAutos(response.data);
          } catch (err: any) {
            setError('Error al obtener los autos');
          }
        };
        obtenerAutos();
      }, []);

      return (
        <>
          <Navbar />{error}
          {autos.length === 0 ? (
            <div>No se encontraron autos.</div>
          ) : (
            <>
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
                      <Link to={`/autos/${auto.id}`}>
                        <button type="button" className="btn btn-danger">Eliminar</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </>
          )}
        </>
      );
}

export default ListaAutos;