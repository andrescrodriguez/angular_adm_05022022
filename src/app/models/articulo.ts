import { Categoria } from "./categoria";
import { ImagenXArticulo } from "./imagenxarticulo";

export interface Articulo{
    id: string; 
    titulo: string;
    preLectura: string; 
    contenido: string;
    nombreDeRuta: string;
    idCategoria: number;  
    categoria: Categoria;
    categoriaNombre: string; 
    fechaHoraPublicacion: Date;
    fechaHoraAlta: Date;
    fechaHoraUltimaActualizacion: Date; 
    fechaHoraBaja: Date; 
    idImagen: number;
    imagenesXArticulos: ImagenXArticulo[]; 
}