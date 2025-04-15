import { useEffect, useState } from "react";
import apiClient from "../apiClient/apiClient";
import { PersonaConID } from "../../modelos/Persona";
import { Navbar } from "../Navbar/Navbar";
import { BotonEliminar } from "../Botones/BotonEliminar";
import { BotonAgregarPersona } from "../Botones/BotonAgregarPersona";
import { BotonInfo } from "../Botones/BotonInfo";
import { BotonModificar } from "../Botones/BotonModificar";

const ListaPersonas = () => {
    const OBTENERPERSONAS = '/persona';
    const [personas, setPersonas] = useState<PersonaConID[]>([]);
    const [error, setError] = useState<string>("");

    const obtenerPersonas = async () => {
      try {
        const response = await apiClient.get<PersonaConID[]>(OBTENERPERSONAS);
        setPersonas(response.data);
      } catch (err: any) {
        setError('Error al obtener las personas');
      }
    };
    
    useEffect(() => {
         obtenerPersonas();
      }, []);

      return (
        <>
          <Navbar />
          
          {error}

          <BotonAgregarPersona />

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
                      <BotonInfo entidad={"personas"} id={persona.id}/>
                      <BotonModificar entidad={"personas"} id={persona.id} />
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