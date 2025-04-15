import { useState } from "react";
import { AutoSinID } from "../../modelos/Auto";
import apiClient from "../apiClient/apiClient";
import { useNavigate, useParams } from "react-router-dom";

export const AgregarAuto = () => {
    const { id } = useParams();
    const AGREGAR_AUTO = `/autos`;
    const navegar = useNavigate();

    const [auto, setAuto] = useState<AutoSinID>({
        marca: '',
        modelo: '',
        año: 0, 
        patente: '',
        color: '',
        numeroChasis: '',
        motor: '',
        dueñoId: Number(id)
    });

    const [error, setError] = useState<string>('');
    const [agregada, setAgregada] = useState<boolean>(false);

    const agregar = async () => {
        try {
            await apiClient.post(AGREGAR_AUTO, {
                ...auto,
                año: Number(auto.año),
            });
            setAgregada(true);
            navegar(`/personas/info/${id}`)
            setError('');
        } catch (err: any) {
            if (!err?.response) {
                setError('Error al agregar el auto');
            } else if (err.response?.status === 400) {
                setError('Los datos enviados son incorrectos o incompletos.');
            } else {
                setError('Error desconocido. Intenta nuevamente.');
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await agregar();
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
            <div className="centrarContenido">
                <h1>Agregar Auto</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Marca:
                        <input
                            type="text"
                            name="marca"
                            value={auto.marca}
                            onChange={cambio}
                        />
                    </label>
                    <br />
                    <label>
                        Modelo:
                        <input
                            type="text"
                            name="modelo"
                            value={auto.modelo}
                            onChange={cambio}
                        />
                    </label>
                    <br />
                    <label>
                        Año:
                        <input
                            type="text"
                            name="año"
                            value={auto.año}
                            onChange={cambio}
                        />
                    </label>
                    <br />
                    <label>
                        Patente:
                        <input
                            type="text"
                            name="patente"
                            value={auto.patente}
                            onChange={cambio}
                        />
                    </label>
                    <br />
                    <label>
                        Color:
                        <input
                            type="text"
                            name="color"
                            value={auto.color}
                            onChange={cambio}
                        />
                    </label>
                    <br />
                    <label>
                        Número de chasis:
                        <input
                            type="text"
                            name="numeroChasis"
                            value={auto.numeroChasis}
                            onChange={cambio}
                        />
                    </label>
                    <br />
                    <label>
                        Motor:
                        <input
                            type="text"
                            name="motor"
                            value={auto.motor}
                            onChange={cambio}
                        />
                    </label>
                    <br />
                    <button type="submit">Agregar</button>
                </form>
                {agregada ? (
                    <p>Auto agregado con éxito</p>
                ) : (
                    error && <p className="mensaje-error">{error}</p>
                )}
            </div>
        </>
    );
};
