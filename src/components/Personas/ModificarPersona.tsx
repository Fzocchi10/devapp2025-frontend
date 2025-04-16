import { useState } from "react";
import { PersonaModificar } from "../../modelos/Persona";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../apiClient/apiClient";
import { Navbar } from "../Navbar/Navbar";

export const ModificarPersona = () => {
    const { id } = useParams();
    const navegar = useNavigate();
    const MODIFICAR_PERSONA = `/persona/${id}`;
    
    const [persona, setPersona] = useState<PersonaModificar>({
        nombre: undefined,
        apellido: undefined,
        dni: undefined,
        fechaNacimiento: undefined,
        genero: undefined,
        donanteDeOrganos: undefined,
    });
    const [error, setError] = useState<string>('');
    const [modificada, setModificada] = useState<boolean>(false);

    const modificar = async () => {
        try {
            await apiClient.put(MODIFICAR_PERSONA, persona);
            setModificada(true);
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

        setPersona((prevPersona) => ({
            ...prevPersona,
            [name]: value,
        }));
    };

    return (
        <>
            <Navbar />
            <div className="centrarContenido">
                <h1>Modificar Persona</h1>
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
                            value={persona.fechaNacimiento ? dateAText(new Date(persona.fechaNacimiento)) : ''}
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
                    <button type="submit" onClick={modificar}>Confirmar</button>
                </form>
                {modificada ? 
                    <p>La persona fue modificada con éxito.</p> : 
                    <p className="mensaje-error">{error}</p>}
            </div>
        </>
    );
};
