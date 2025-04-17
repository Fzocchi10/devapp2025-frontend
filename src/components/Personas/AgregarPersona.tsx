import { useState } from "react";
import { Persona } from "../../modelos/Persona";
import apiClient from "../apiClient/apiClient";
import { Link, useNavigate } from "react-router-dom";
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

            <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="container d-flex justify-content-center mt-5">
                <div className="card p-4 shadow" style={{ maxWidth: '600px', width: '100%' }}>
                    <h2 className="text-center mb-4">Agregar Persona</h2>

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
                        <input type="checkbox" className="form-check-input" name="donanteDeOrganos" checked={persona.donanteDeOrganos} onChange={cambio} />
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
                        <button type="submit" className="btn btn-primary" onClick={agregar}>
                            Confirmar
                        </button>
                        <Link to="/personas">
                            <button type="button" className="btn btn-danger">
                            Cancelar
                            </button>
                        </Link>
                    </div>
                    </form>

                    <div className="mt-3 text-center">
                    {agregada && <div className="alert alert-success">La persona fue agregada con éxito.</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    </div>
                </div>
                </div>
            </div>
            </div>

        </>
    )
}

export default AgregarPersona;