import { useState } from "react";
import { Persona } from "../../modelos/Persona";
import apiClient from "../apiClient/apiClient";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { FormularioPersona } from "./FormularioPersona";


const AgregarPersona = () => {
    const AGREGARPERSONA = '/persona';
    
    const [persona, setPersona] = useState<Persona>({
        nombre: '',
        apellido: '',
        dni: '',
        fechaNacimiento: null,
        genero: null,
        donanteDeOrganos: false,
        autos: [],
    });

    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const agregar = async () => {
        const regexNombreApellido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        const regexDni = /^\d+$/;

        if (!regexNombreApellido.test(persona.nombre)) {
            setError("El nombre solo debe contener letras.");
            return;
        }

        if (!regexNombreApellido.test(persona.apellido)) {
            setError("El apellido solo debe contener letras.");
            return;
            }

        if (!regexDni.test(persona.dni)) {
            setError("El DNI solo debe contener números.");
            return;
        }
        try {
            await apiClient.post(AGREGARPERSONA, JSON.stringify( persona ));
            navigate('/personas');
        } catch (err: any) {
            if (!err?.response) {
                setError('Error al agregar a la persona');
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

    return(
        <>
            <Navbar />

            <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="container d-flex justify-content-center mt-5">
                <div className="card p-4 shadow" style={{ maxWidth: '600px', width: '100%' }}>
                    <h2 className="text-center mb-4">Agregar Persona</h2>

                    <FormularioPersona
                        persona={persona}
                        onChange={cambio}
                        onSubmit={(e) => {e.preventDefault(); agregar()}}
                        donanteDeOrganos={() => { setPersona(prev => ({
                            ...prev,
                            donanteDeOrganos: !prev.donanteDeOrganos
                          }))}}
                        nombreBoton="Agregar"
                        error={error}
                        />
                </div>
                </div>
            </div>
            </div>

        </>
    )
}

export default AgregarPersona;