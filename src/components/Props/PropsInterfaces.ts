export interface PropsBotones {
    entidad: string,
    id: string | undefined,
    
}

export interface PropsPaginacion<T>{
      elementos: T[];
      cantidad: number;
      onPaginaChange: (itemsPaginaActual: T[]) => void;
}