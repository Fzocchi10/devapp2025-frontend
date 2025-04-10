import { useState } from "react";
import { Persona } from "../../modelos/Persona";
import apiClient from "../apiClient/apiClient";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";


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
    const [agregada,setAgregada] = useState<boolean>(false);
    const navigate = useNavigate();

    const agregar = async () => {
        try {
            await apiClient.post(AGREGARPERSONA, JSON.stringify( persona ));
            setAgregada(true);
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

    const dateAText = (date: Date) => {
        const año = date.getFullYear();
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const dias = String(date.getDate()).padStart(2, '0');
        return `${año}-${mes}-${dias}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
            <div className="centrarContenido">
            <h1>Agregar Persona</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:  
                    <input 
                        type="text" 
                        name="nombre" 
                        value={persona.nombre} 
                        onChange={cambio} 
                    />
                </label>
                <br />
                <label>
                    Apellido:  
                    <input 
                        type="text" 
                        name="apellido" 
                        value={persona.apellido} 
                        onChange={cambio} 
                    />
                </label>
                <br />
                <label>
                    DNI:  
                    <input 
                        type="text" 
                        name="dni" 
                        value={persona.dni} 
                        onChange={cambio} 
                    />
                </label>
                <br />
                <label>
                    ¿Es donante de órganos?
                    <input 
                        type="checkbox" 
                        name="donanteDeOrganos" 
                        checked={persona.donanteDeOrganos} 
                        onChange={() => setPersona({ ...persona, donanteDeOrganos: !persona.donanteDeOrganos })} 
                    />
                </label>
                <br />
                <label>
                    Fecha de Nacimiento
                    <input 
                        type="date" 
                        name="fechaNacimiento" 
                        value={persona.fechaNacimiento ? dateAText(persona.fechaNacimiento): ''}
                        onChange={cambio} 
                    />
                </label>
                <br />
                <label>
                Género:
                <select
                    name="genero"
                    value={persona.genero || ''}
                    onChange={cambio}
                >
                    <option value="">Seleccionar género</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="No-Binario">No-Binario</option>
                </select>
                </label>
                <br />
                <button type="submit" onClick={agregar}>Confirmar</button>
            </form>
            {agregada ? 
                <p>La persona fue agregada con éxito.</p> : 
                <p className="mensaje-error">{error}</p>}
        </div>
        </>
    )
}

export default AgregarPersona;