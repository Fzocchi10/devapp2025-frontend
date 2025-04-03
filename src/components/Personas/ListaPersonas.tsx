import { useEffect, useState } from "react";
import apiClient from "../apiClient/apiClient";
import { Persona } from "../../modelos/Persona";
import { BotonEliminar } from "../Botones/BotonEliminar";
import { Navbar } from "../Navbar/Navbar";

const ListaPersonas = () => {
    const OBTENERPERSONAS = '/persona';
    const [personas, setPersonas] = useState<Persona[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const obtenerPersonas = async () => {
          try {
            const response = await apiClient.get<Persona[]>(OBTENERPERSONAS);
            setPersonas(response.data);
          } catch (err: any) {
            setError('Error al obtener las personas');
          }
        };
        obtenerPersonas();
      }, []);

      return (
        <>
          <Navbar />
          {personas.length === 0 ? (
            <div>No se encontraron personas.</div>
          ) : (
            <>
            <table className="table table-dark">
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
                  <tr key={persona.id}>
                    <td>{persona.dni}</td>
                    <td>{persona.nombre}</td>
                    <td>{persona.apellido}</td>
                    <td>
                      <BotonEliminar id={persona.id} entidad={"personas"}/>
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

export default ListaPersonas;