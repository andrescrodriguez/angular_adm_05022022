import { Categoria } from "./categoria";
import { ImagenXArticulo } from "./imagenxarticulo";

export interface Articulo{
    id: number; 
    titulo: string
    preLectura: string 
    contenido: string
    nombreDeRuta: string
    idCategoria: number;  
    categoria: Categoria; 
    fechaHoraPublicacion: Date;
    fechaHoraAlta: Date;
    fechaHoraUltimaActualizacion: Date; 
    fechaHoraBaja: Date; 
    imagenesXArticulos: ImagenXArticulo[]; 
}