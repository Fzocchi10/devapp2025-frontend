import { useEffect, useState } from "react";
import { Persona } from "../../modelos/Persona";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../apiClient/apiClient";
import { Navbar } from "../Navbar/Navbar";
import { FormularioPersona } from "./FormularioPersona";

export const ModificarPersona = () => {
    const { id } = useParams();
    const navegar = useNavigate();
    const MODIFICAR_PERSONA = `/persona/${id}`;
    const [encontrada, setEncontrada] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    
    const [persona, setPersona] = useState<Persona>({
        nombre: '',
        apellido: '',
        dni: '',
        fechaNacimiento: null,
        genero: null,
        donanteDeOrganos: false,
        autos: [],
    });

    useEffect(() => {
        const obtenerPersona = async () => {
            try {
                const res = await apiClient.get<Persona>(MODIFICAR_PERSONA);
                const data = res.data;

                if(data.fechaNacimiento){
                    data.fechaNacimiento = new Date(data.fechaNacimiento);
                }
                setPersona(data);
                setEncontrada(true);
            } catch (err){
                setError("No se pudo cargar la persona.");
                setEncontrada(false);
            }
        };
        obtenerPersona();
    }, [id])

    const modificar = async () => {
        const regexNombreApellido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        const regexDni = /^\d+$/;

        if (persona.nombre && !regexNombreApellido.test(persona.nombre)) {
            setError("El nombre solo debe contener letras.");
            return;
        }

        if (persona.apellido && !regexNombreApellido.test(persona.apellido)) {
            setError("El apellido solo debe contener letras.");
            return;
            }

        if (persona.dni && !regexDni.test(persona.dni)) {
            setError("El DNI solo debe contener números.");
            return;
        }
        try {
            await apiClient.put(MODIFICAR_PERSONA, persona);
            navegar('/personas');
        } catch (err: any) {
            if (!err?.response) {
                setError('Error al modificar a la persona');
            } else if (err.response?.status === 400) {
                setError('Los datos enviados son incorrectos o incompletos.');
            } else {
                setError('Error desconocido. Intenta nuevamente.');
            }
        }
    };

    const cambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'fechaNacimiento') {
            setPersona((prevPersona) => ({
                ...prevPersona,
                [name]: new Date(value),
            }));
        }else setPersona((prevPersona) => ({
            ...prevPersona,
            [name]: value,
        }));
    };

    return (
        <>
    <Navbar />
    {encontrada} ? (
    <div className="container mt-5 d-flex justify-content-center">
        <div className="card p-4 shadow" style={{ maxWidth: '600px', width: '100%' }}>
            <h2 className="text-center mb-4">Modificar Persona</h2>
            
            <FormularioPersona
                persona={persona}
                onChange={cambio}
                onSubmit={(e) => {e.preventDefault(); modificar()}}
                donanteDeOrganos={() => { setPersona(prev => ({
                    ...prev,
                    donanteDeOrganos: !prev.donanteDeOrganos
                  }))}}
                nombreBoton="Modificar"
                error={error}
            />
            
        </div>
    </div>) : {error}
    </>
    )
};
