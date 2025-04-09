import { useEffect, useState } from "react";
import apiClient from "../apiClient/apiClient";
import { PersonaConID } from "../../modelos/Persona";
import { Navbar } from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const ListaPersonas = () => {
    const OBTENERPERSONAS = '/persona';
    const [personas, setPersonas] = useState<PersonaConID[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const obtenerPersonas = async () => {
          try {
            const response = await apiClient.get<PersonaConID[]>(OBTENERPERSONAS);
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
          {error}
          <Link to={"/agregar/persona"}>
            <button type="button" className="btn btn-success"> Agregar</button>
          </Link>
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
                      <Link to={`/eliminar/persona/${persona.id}`}>
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

export default ListaPersonas;