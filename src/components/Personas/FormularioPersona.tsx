import React from "react";
import {Persona} from "../../modelos/Persona";
import {Link} from "react-router-dom";

interface Props {
    persona: Persona;
    onChange:(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    donanteDeOrganos: () => void;
    nombreBoton: string;
    error: string;
}
export const FormularioPersona: React.FC<Props> = ({
    persona,
    onChange,
    donanteDeOrganos,
    onSubmit,
    nombreBoton,
    error
}) => {
    const dateAText = (date: Date) => {
        const año = date.getFullYear();
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const dias = String(date.getDate()).padStart(2, '0');
        return `${año}-${mes}-${dias}`;
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" name="nombre" value={persona.nombre} onChange={onChange} />
            </div>

            <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input type="text" className="form-control" name="apellido" value={persona.apellido} onChange={onChange} />
            </div>

            <div className="mb-3">
            <label className="form-label">DNI</label>
            <input type="text" className="form-control" name="dni" value={persona.dni} onChange={onChange} />
            </div>

            <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" name="donanteDeOrganos" checked={persona.donanteDeOrganos} onChange={donanteDeOrganos} />
            <label className="form-check-label">¿Es donante de órganos?</label>
            </div>

            <div className="mb-3">
            <label className="form-label">Fecha de nacimiento</label>
            <input
                type="date"
                className="form-control"
                name="fechaNacimiento"
                value={persona.fechaNacimiento ? dateAText(persona.fechaNacimiento) : ''}
                onChange={onChange}
            />
            </div>

            <div className="mb-3">
            <label className="form-label">Género</label>
            <select className="form-select" name="genero" value={persona.genero || ''} onChange={onChange}>
                <option value="">Seleccionar género</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="No-Binario">No-Binario</option>
            </select>
            </div>

            <div className="d-flex justify-content-center gap-3">
            <button type="submit" className="btn btn-primary">
                {nombreBoton}
            </button>
            <Link to="/personas">
                <button type="button" className="btn btn-danger">Cancelar</button>
            </Link>
            </div>

            {error && <div className="mt-3 alert alert-danger">{error}</div>}
           
        </form>
    )
}