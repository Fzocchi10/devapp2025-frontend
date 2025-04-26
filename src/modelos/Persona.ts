import { Auto } from "./Auto"

export enum Genero {
    Masculino = 'Masculino',
    Femenino = 'Femenino',
    NoBinario = 'No-Binario'
}

export type Persona = {
    id?: string,
    nombre : string,
    apellido : string,
    dni : string,
    fechaNacimiento: Date | null,
    genero: Genero | null,
    donanteDeOrganos: boolean,
    autos: Auto[]
}

export type PersonaConID = {
    id: string,
    nombre : string,
    apellido : string,
    dni : string,
    fechaNacimiento: Date,
    genero: Genero
    donanteDeOrganos: boolean,
    autos: Auto[]
  }
