import React from "react";
import { Auto } from "../../modelos/Auto";
import { Link } from "react-router-dom";

interface Props {
    auto: Auto;
    onChange:(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e:React.FormEvent) => void;
    nombreBoton: string;
    error: string
}
export const FormularioAuto: React.FC<Props> = ({
    auto,
    onChange,
    onSubmit,
    nombreBoton,
    error
}) => {
    return (
        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Marca</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="marca"
                                    value={auto.marca}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Modelo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="modelo"
                                    value={auto.modelo}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Año</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="año"
                                    value={auto.año}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Patente</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="patente"
                                    value={auto.patente}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Color</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="color"
                                    value={auto.color}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Número de chasis</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="numeroChasis"
                                    value={auto.numeroChasis}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Motor</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="motor"
                                    value={auto.motor}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="d-flex justify-content-center gap-3">
                                <button type="submit" className="btn btn-primary">
                                    {nombreBoton}
                                </button>
                                <Link to="/autos">
                                    <button type="button" className="btn btn-danger">
                                        Cancelar
                                    </button>
                                </Link>
                            </div>

                            {error && <div className="mt-3 alert alert-danger">{error}</div>}
                        </form>
    )
}