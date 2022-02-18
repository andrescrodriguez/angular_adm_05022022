import { ImagenXArticulo } from "./imagenxarticulo";

export interface Imagen{
    id: number;
    nombre: string;
    extension: string;
    ruta: string;
    fechaHoraAlta: Date;
    imagenesXArticulos: ImagenXArticulo[];
}