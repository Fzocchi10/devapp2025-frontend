export type Auto = {
    id: number,
    marca: string,
    modelo : string,
    año: number,
    patente : string,
    color: string,
    numeroChasis: string,
    motor: string,
    dueñoId: number;
}

export type AutoSinID = {
    marca: string,
    modelo : string,
    año: number,
    patente : string,
    color: string,
    numeroChasis: string,
    motor: string,
    dueñoId: number;
}