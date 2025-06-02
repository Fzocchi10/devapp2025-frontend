export type Auto = {
    id?: string,
    marca: string,
    modelo : string,
    anio: number,
    patente : string,
    color: string,
    numeroChasis: string,
    motor: string,
    duenioId?: string;
}

export type AutoAgregar = {
    marca?: string,
    modelo? : string,
    anio?: number,
    patente ?: string,
    color?: string,
    numeroChasis?: string,
    motor?: string,
    duenioId?: string;
}

export type AutoInfo = {
    id: string,
    marca: string,
    modelo : string,
    anio: number,
    patente : string,
    color: string,
    numeroChasis: string,
    motor: string,
    duenio: string;
}

