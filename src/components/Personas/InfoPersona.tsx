import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { PersonaConID } from "../../modelos/Persona";
import { Auto } from "../../modelos/Auto";
import apiClient from "../apiClient/apiClient";
import { Navbar } from "../Navbar/Navbar";
import { TablaAuto } from "../Autos/TablaAuto";
import { BotonAgregarAuto } from "../Botones/BotonAgregarAuto";

const InfoPersona = () => {
    const {id} = useParams();
    const [persona,setPersona] = useState<PersonaConID>();
    const [autos, setAutos] = useState<Auto[]>([]);
    const [error, setError] = useState<string>('');

    const OBTENER_PERSONA = `/persona/${id}`;
    const OBTENER_AUTOS = `/persona/autos/${id}`;

    const obtenerPersona = async () => {
        try {
          const response = await apiClient.get<PersonaConID>(OBTENER_PERSONA);
          setPersona(response.data);
        } catch (err: any) {
          setError('Error al obtener la persona');
        }
      };

      const obtenerAutos = async () => {
        try {
          const response = await apiClient.get<Auto[]>(OBTENER_AUTOS);
          setAutos(response.data);
        } catch (err: any) {
          setError('Error al obtener los autos de la persona');
        }
      };



      useEffect(() => {
        obtenerPersona();
        obtenerAutos();
     }, []);



    return (
        <>
        <Navbar />
        {error}
        <div className="centrarContenido">
            <p><strong>Nombre:</strong>  {persona?.nombre}</p>
            <p><strong>Apellido:</strong>  {persona?.apellido}</p>
            <p><strong>Dni:</strong>  {persona?.dni}</p>
            <p><strong>Fecha de nacimiento:</strong>  {persona?.fechaNacimiento}</p>
            <p><strong>Es donante:</strong>  {persona?.donanteDeOrganos ? 'Si' : 'No'}</p>

            <BotonAgregarAuto id={persona?.id} />

            <TablaAuto autos={autos}/>
        </div>
        </>
    )
}

export default InfoPersona;