import { useEffect, useState } from "react";
import apiClient from "../apiClient/apiClient";
import { Auto } from "../../modelos/Auto";
import { Navbar } from "../Navbar/Navbar";
import { TablaAuto } from "./TablaAuto";

const ListaAutos = () => {
    const OBTENERAUTOS = '/autos';
    const [autos, setAutos] = useState<Auto[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const obtenerAutos = async () => {
          try {
            const response = await apiClient.get<Auto[]>(OBTENERAUTOS);
            setAutos(response.data);
          } catch (err: any) {
            setError('Error al obtener los autos');
          }
        };
        obtenerAutos();
      }, []);

      return (
        <>
          <Navbar />
          {error}
          <h2 className="text-center my-4">Lista de Autos</h2>
          <TablaAuto autos={autos}/>
        </>
      );
}

export default ListaAutos;