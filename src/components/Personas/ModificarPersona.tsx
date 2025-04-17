import { useState } from "react";
import { PersonaModificar } from "../../modelos/Persona";
import { Link, useNavigate, useParams } from "react-router-dom";
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
    <div className="container mt-5 d-flex justify-content-center">
        <div className="card p-4 shadow" style={{ maxWidth: '600px', width: '100%' }}>
        <h2 className="text-center mb-4">Modificar Persona</h2>

        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" name="nombre" value={persona.nombre} onChange={cambio} />
            </div>

            <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input type="text" className="form-control" name="apellido" value={persona.apellido} onChange={cambio} />
            </div>

            <div className="mb-3">
            <label className="form-label">DNI</label>
            <input type="text" className="form-control" name="dni" value={persona.dni} onChange={cambio} />
            </div>

            <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" name="donanteDeOrganos" checked={persona.donanteDeOrganos} onChange={() =>
                setPersona({ ...persona, donanteDeOrganos: !persona.donanteDeOrganos })} />
            <label className="form-check-label">¿Es donante de órganos?</label>
            </div>

            <div className="mb-3">
            <label className="form-label">Fecha de nacimiento</label>
            <input
                type="date"
                className="form-control"
                name="fechaNacimiento"
                value={persona.fechaNacimiento ? dateAText(persona.fechaNacimiento) : ''}
                onChange={cambio}
            />
            </div>

            <div className="mb-3">
            <label className="form-label">Género</label>
            <select className="form-select" name="genero" value={persona.genero || ''} onChange={cambio}>
                <option value="">Seleccionar género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="No-Binario">No-Binario</option>
            </select>
            </div>

            <div className="d-flex justify-content-center gap-3">
            <button type="submit" className="btn btn-primary" onClick={modificar}>
                Modificar
            </button>
            <Link to="/personas">
                <button type="button" className="btn btn-danger">Cancelar</button>
            </Link>
            </div>

            <div className="text-center mt-3">
            {modificada ? (
                <p className="text-success">La persona fue modificada con éxito.</p>
            ) : (
                <p className="text-danger">{error}</p>
            )}
            </div>
        </form>
        </div>
    </div>
    </>
    )
};
