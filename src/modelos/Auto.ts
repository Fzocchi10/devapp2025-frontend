export type Auto = {
    id?: string,
    marca: string,
    modelo : string,
    año: number,
    patente : string,
    color: string,
    numeroChasis: string,
    motor: string,
    dueñoId?: string;
}

export type AutoAgregar = {
    marca?: string,
    modelo? : string,
    año?: number,
    patente ?: string,
    color?: string,
    numeroChasis?: string,
    motor?: string,
    dueñoId?: string;
}

export type AutoInfo = {
    id: string,
    marca: string,
    modelo : string,
    año: number,
    patente : string,
    color: string,
    numeroChasis: string,
    motor: string,
    dueño: string;
}

