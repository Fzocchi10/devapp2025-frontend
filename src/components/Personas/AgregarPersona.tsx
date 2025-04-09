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
        fechaNacimiento: new Date(''),
        genero: null,
        donanteDeOrganos: false,
        autos: [],
    });
    const [error, setError] = useState<string>("");
    const [agregada,setAgregada] = useState<boolean>(false);
    const navigate = useNavigate();

    const agregar = async () => {
        try {
            await apiClient.post(AGREGARPERSONA);
            setAgregada(true);
            navigate('/personas');
        } catch (err: any) {
            if (!err?.response) {
                setError('Error al agregar a la persona');
            }
            
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPersona((prevPersona) => ({
            ...prevPersona,
            [name]: value,
        }));
    };

    return(
        <>
            <Navbar />
            {error}
            <div className="centrarContenido">
            <h1>Agregar Persona</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:  
                    <input 
                        type="text" 
                        name="nombre" 
                        value={persona.nombre} 
                        onChange={handleChange} 
                    />
                </label>
                <br />
                <label>
                    Apellido:  
                    <input 
                        type="text" 
                        name="apellido" 
                        value={persona.apellido} 
                        onChange={handleChange} 
                    />
                </label>
                <br />
                <label>
                    DNI:  
                    <input 
                        type="text" 
                        name="dni" 
                        value={persona.dni} 
                        onChange={handleChange} 
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
                <button type="submit" onClick={agregar}>Confirmar</button>
            </form>
            {agregada && <p>La persona fue agregada con éxito.</p>}
        </div>
        </>
    )
}

export default AgregarPersona;