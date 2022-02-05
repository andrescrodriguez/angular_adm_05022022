import { Articulo } from "./articulo";


export interface Categoria{
    id: number;
    nombre: string;
    nombreDeRuta: string;
    articulos: Articulo[];
    imagen: string;
}