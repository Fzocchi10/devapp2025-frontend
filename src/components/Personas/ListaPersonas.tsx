import { useEffect, useState } from "react";
import apiClient from "../apiClient/apiClient";
import { PersonaConID } from "../../modelos/Persona";
import { Navbar } from "../Navbar/Navbar";
import { BotonAgregarPersona } from "../Botones/BotonAgregarPersona";
import { AccionesTabla } from "../Botones/AccionesTabla";

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

          {personas.length === 0 ? (
            <div>No se encontraron personas.</div>
          ) : (
            <>
            <div className="position-relative mb-4">
              <h2 className="text-center my-4">Lista de Personas</h2>
            <div className="position-absolute end-0 top-0">
                   <BotonAgregarPersona />
            </div>
            </div>
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th className="text-center">DNI</th>
                  <th className="text-center">Nombre</th>
                  <th className="text-center">Apellido</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {personas.map((persona) => (
                  <tr key={persona.id}>
                    <td className="text-center">{persona.dni}</td>
                    <td className="text-center">{persona.nombre}</td>
                    <td className="text-center">{persona.apellido}</td>
                    <td className="text-center">
                      <AccionesTabla entidad={"personas"} id={persona.id} />
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