// src/componentes/Paginacion/Paginacion.tsx
import { useState, useEffect } from "react";
import { PropsPaginacion } from "../Props/PropsInterfaces";


function Paginacion<T>({ elementos, cantidad, onPaginaChange }: PropsPaginacion<T>) {
  const [paginaActual, setPaginaActual] = useState(1);
  const totalPaginas = Math.ceil(elementos.length / cantidad);

  const inicio = (paginaActual - 1) * cantidad;
  const fin = Math.min(inicio + cantidad, elementos.length);

  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  useEffect(() => {
    onPaginaChange(elementos.slice(inicio, fin));
  }, [paginaActual, elementos, cantidad, onPaginaChange]);

  return (
    <div className="d-flex justify-content-center align-items-center mt-3 gap-3">
        <nav aria-label="Paginación" className="d-flex align-items-center gap-3">
        <span className="text fw-bold">
            Mostrando del {inicio + 1} al {fin} de {elementos.length} resultados
        </span>  

        <ul className="pagination mb-0">
            <li className="page-item">
            <button className="page-link" onClick={() => cambiarPagina(paginaActual - 1)}>
                Anterior
            </button>
            </li>
            
            <li className="page-item"> 
            <button className="page-link" onClick={() => cambiarPagina(paginaActual + 1)}>
                Siguiente
            </button>
            </li>
        </ul>
        </nav>
    </div>
  );
}

export default Paginacion;
