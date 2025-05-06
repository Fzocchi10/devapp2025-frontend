import { useEffect, useState } from "react";
import apiClient from "../apiClient/apiClient";
import { PersonaConID } from "../../modelos/Persona";
import { Navbar } from "../Navbar/Navbar";
import { BotonAgregarPersona } from "../Botones/BotonAgregarPersona";
import { AccionesTabla } from "../Botones/AccionesTabla";
import Paginacion from "../Paginacion/Paginacion";

const ListaPersonas = () => {
    const OBTENERPERSONAS = '/persona';
    const [personas, setPersonas] = useState<PersonaConID[]>([]);
    const [personasPaginadas, setPersonasPaginadas] = useState<PersonaConID[]>([]);
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
          <div className="position-relative mb-4">
              <h2 className="text-center my-4">Lista de Personas</h2>
            <div className="position-absolute end-0 top-0">
                   <BotonAgregarPersona />
            </div>
            </div>
          
          {error}

          {personas.length === 0 ? (
            <div>No se encontraron personas.</div>
          ) : (
            <>
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
                {personasPaginadas.map((persona) => (
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
            <div className="fixed-bottom start-0 w-100 bg-white py-3 border-top">
              <Paginacion elementos={personas} cantidad={10} onPaginaChange={setPersonasPaginadas}/>
            </div>
            </>
          )}
        </>
      );
}

export default ListaPersonas;