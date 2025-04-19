import { useState } from "react";
import { AutoModificar } from "../../modelos/Auto";
import apiClient from "../apiClient/apiClient";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

export const ModificarAuto = () => {
    const { id } = useParams();
    const MODIFICAR_AUTO = `/autos/${id}`;
    const navegar = useNavigate();

    const [auto, setAuto] = useState<AutoModificar>({
        marca: undefined,
        modelo: undefined,
        año: undefined, 
        patente: undefined,
        color: undefined,
        numeroChasis: undefined,
        motor: undefined,
    });

    const [error, setError] = useState<string>('');
    const [modificado, setModificado] = useState<boolean>(false);

    const modificar = async () => {
        const RegexPatente = /^([A-Za-z]{3}\d{3}|[A-Za-z]{2}\d{3}[A-Za-z]{2})$/;
        
        if(auto.patente && !RegexPatente.test(auto?.patente)){
            setError("Patente no valida, formato correcto AAA000 o AA000AA");
            return;
        }
        
        try {
            await apiClient.put(MODIFICAR_AUTO, {
                ...auto,
                año: Number(auto.año),
            });
            setModificado(true);
            navegar(`/autos/info/${id}`)
            setError('');
        } catch (err: any) {
            if (!err?.response) {
                setError('Error al modificar el auto');
            } else if (err.response?.status === 400) {
                setError('Los datos enviados son incorrectos o incompletos.');
            } else {
                setError('Error desconocido. Intenta nuevamente.');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await modificar();
    };

    const cambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if(name == "año"){
            setAuto((prevAuto) => ({
                ...prevAuto,
                [name] : Number(value)
        }))
        }else{
            setAuto((prevAuto) => ({
                ...prevAuto,
                [name]: value,
            }));
        }
        
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="container d-flex justify-content-center mt-5">
                        <div className="card p-4 shadow" style={{ maxWidth: '600px', width: '100%' }}>
                            <h2 className="text-center mb-4">Modificar Auto</h2>
                            
                            <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Marca:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="marca"
                                        value={auto.marca}
                                        onChange={cambio}
                                    />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Modelo:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="modelo"
                                        value={auto.modelo}
                                        onChange={cambio}
                                    />  
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Año:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="año"
                                        value={auto.año}
                                        onChange={cambio}
                                    />   
                            </div>
                    <div className="mb-3">
                    <label className="form-label">Patente:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="patente"
                            value={auto.patente}
                            onChange={cambio}
                        />
                    </div>
                             
                    <div className="mb-3">
                    <label className="form-label">Color:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="color"
                            value={auto.color}
                            onChange={cambio}
                        />
                    </div>
                    
                    
                    <div className="mb-3">
                    <label className="form-label">Número de chasis:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="numeroChasis"
                            value={auto.numeroChasis}
                            onChange={cambio}
                        />
                    </div>
                    
                    <div className="mb-3">
                    <label className="form-label">Motor:</label>
                        <input
                            type="text"
                            name="motor"
                            className="form-control"
                            value={auto.motor}
                            onChange={cambio}
                        />
                    </div>
                    
                    <div className="d-flex justify-content-center gap-3">
                        <button type="submit" className="btn btn-primary" onClick={modificar}>
                            Modificar
                        </button>
                        <Link to="/autos">
                            <button type="button" className="btn btn-danger">
                                Cancelar
                            </button>
                        </Link>
                    </div>
                </form>
                {modificado ? (
                    <p>Auto modificado con éxito</p>
                ) : (
                    error && <p className="mensaje-error">{error}</p>
                )}
            </div>
            </div>
            </div>
            </div>
        </>
    );
};
