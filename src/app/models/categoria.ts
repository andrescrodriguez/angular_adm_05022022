import { Articulo } from "./articulo";


export interface Categoria{
    Id: number;
    Nombre: string;
    NombreDeRuta: string;
    Articulos: Articulo[];
    Imagen: string;
}