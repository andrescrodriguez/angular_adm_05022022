import { Articulo } from "./articulo";
import { Imagen } from "./imagen";

export interface ImagenXArticulo{
    articuloId: number;
    articulo: Articulo;
    imagenId: number;
    imagen: Imagen;
}