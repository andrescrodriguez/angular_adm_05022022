import { ImagenXArticulo } from "./imagenxarticulo";

export interface Imagen{
    Id: number;
    Nombre: string;
    Extension: string;
    Ruta: string;
    FechaHoraAlta: Date;
    ImagenesXArticulos: ImagenXArticulo[];
}