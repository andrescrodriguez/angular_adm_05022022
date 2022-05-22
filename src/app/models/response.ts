import { Articulo } from "./articulo";
import { Categoria } from "./categoria";
import { Imagen } from "./imagen";

export interface Response{
    articulos: Articulo[];
    categorias: Categoria[];
    imagenes: Imagen[];
    cantidadTotalDeRegistros: number;
}