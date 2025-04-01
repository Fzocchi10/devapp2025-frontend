import { useEffect, useState } from "react";
import apiClient from "../apiClient/apiClient";
import { Persona } from "../../modelos/Persona";

const ListaPersonas = () => {
    const OBTENERPERSONAS = '/persona';
    const [personas, setPersonas] = useState<Persona[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const obtenerPersonas = async () => {
          try {
            const response = await apiClient.get<Persona[]>(OBTENERPERSONAS);
            console.log('Datos recibidos:', response.data);
            setPersonas(response.data);
          } catch (err: any) {
            setError('Error al obtener las personas');
          }
        };
        obtenerPersonas();
      }, []);

      return (
        <>
          {personas.length === 0 ? (
            <div>No se encontraron personas.</div>
          ) : (
            <>
            <p>Hola</p>
            <table className="table-dark">
              <thead>
                <tr>
                  <th>DNI</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {personas.map((persona) => (
                  <tr key={persona.dni}>
                    <td>{persona.dni}</td>
                    <td>{persona.nombre}</td>
                    <td>{persona.apellido}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </>
          )}
        </>
      );
}

export default ListaPersonas;