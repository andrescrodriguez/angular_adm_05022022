import { Articulo } from "./articulo";
import { Imagen } from "./imagen";

export interface ImagenXArticulo{
    ArticuloId: number;
        Articulo: Articulo;
        ImagenId: number;
        Imagen: Imagen;
}