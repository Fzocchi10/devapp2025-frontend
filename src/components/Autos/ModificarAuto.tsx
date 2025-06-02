import { useEffect, useState } from "react";
import { Auto } from "../../modelos/Auto";
import apiClient from "../apiClient/apiClient";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { FormularioAuto } from "./FormularioAuto";

export const ModificarAuto = () => {
    const { id } = useParams();
    const MODIFICAR_AUTO = `/autos/${id}`;
    const navegar = useNavigate();
    const [encontrado,setEncontrado] = useState<boolean>(false);

    const [auto, setAuto] = useState<Auto>({
        marca: '',
        modelo: '',
        anio: 0, 
        patente: '',
        color: '',
        numeroChasis: '',
        motor: ''
    });

    const [error, setError] = useState<string>('');

    useEffect(() => {
        const obtenerAuto = async () => {
            try {
                const res = await apiClient.get<Auto>(MODIFICAR_AUTO);
                const data = res.data;
                setAuto(data);
                setEncontrado(true);
            } catch (err){
                setError("No se pudo cargar el auto.");
                setEncontrado(false);
            }
        };
        obtenerAuto();
    }, [id])

    const modificar = async () => {
        const RegexPatente = /^([A-Za-z]{3}\d{3}|[A-Za-z]{2}\d{3}[A-Za-z]{2})$/;
        
        if(auto.patente && !RegexPatente.test(auto?.patente)){
            setError("Patente no valida, formato correcto AAA000 o AA000AA");
            return;
        }
        
        try {
            await apiClient.put(MODIFICAR_AUTO, {
                ...auto,
                anio: Number(auto.anio),
            });
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
            {encontrado} ? (
            <div className="container mt-5 d-flex justify-content-center">
                <div className="card p-4 shadow" style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-4">Modificar Auto</h2>
                  <FormularioAuto 
                    auto={auto}
                    onChange={cambio}
                    onSubmit={(e) => {e.preventDefault(); modificar()}}
                    nombreBoton="Modificar"
                    error={error}
                   />
            </div>
            </div>) : {error}
            
        </>
    );
};
