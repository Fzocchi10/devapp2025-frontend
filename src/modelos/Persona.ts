import { Auto } from "./Auto"

export enum Genero {
    Masculino = 'Masculino',
    Femenino = 'Femenino',
    NoBinario = 'No-Binario'
}

export type Persona = {
    nombre : string,
    apellido : string,
    dni : string,
    fechaNacimiento: Date,
    genero: Genero | null,
    donanteDeOrganos: boolean,
    autos: Auto[]
}

export type PersonaConID = {
    id: number,
    nombre : string,
    apellido : string,
    dni : string,
    fechaNacimiento: Date,
    genero: Genero
    donanteDeOrganos: boolean,
    autos: Auto[]
  }