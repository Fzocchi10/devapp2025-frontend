import { useState } from "react";
import { AutoModificar } from "../../modelos/Auto";
import apiClient from "../apiClient/apiClient";
import { useNavigate, useParams } from "react-router-dom";
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
            <div className="centrarContenido">
                <h1>Modificar Auto</h1>
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
                    <button type="submit">Modificar</button>
                </form>
                {modificado ? (
                    <p>Auto modificado con éxito</p>
                ) : (
                    error && <p className="mensaje-error">{error}</p>
                )}
            </div>
        </>
    );
};
