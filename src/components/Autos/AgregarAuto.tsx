import { useState } from "react";
import { Auto } from "../../modelos/Auto";
import apiClient from "../apiClient/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { FormularioAuto } from "./FormularioAuto";
import { UUID } from 'crypto';

export const AgregarAuto = () => {
    const { id } = useParams();
    const AGREGAR_AUTO = `/autos`;
    const navegar = useNavigate();

    const [auto, setAuto] = useState<Auto>({
        marca: '',
        modelo: '',
        anio: 0, 
        patente: '',
        color: '',
        numeroChasis: '',
        motor: '',
        duenioId: id as UUID
    });

    const [error, setError] = useState<string>('');

    const agregar = async () => {
        const RegexPatente = /^([A-Za-z]{3}\d{3}|[A-Za-z]{2}\d{3}[A-Za-z]{2})$/;
        
        if(auto.patente && !RegexPatente.test(auto?.patente)){
            setError("Patente no valida, formato correcto AAA000 o AA000AA");
            return;
        }
        try {
            await apiClient.post(AGREGAR_AUTO, {
                ...auto,
                anio: Number(auto.anio),
            });
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

    const cambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if(name == "anio"){
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
                        <h2 className="text-center mb-4">Agregar Auto</h2>

                        <FormularioAuto 
                            auto = {auto}
                            onChange={cambio}
                            onSubmit={(e)=>{e.preventDefault(); agregar();}}
                            nombreBoton="Agregar"
                            error={error}
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
