import { Categoria } from "./categoria";
import { Imagen } from "./imagen";

export interface Articulo{
    Id: string; 
    Titulo: string;
    PreLectura: string; 
    Contenido: string;
    NombreDeRuta: string;
    IdCategoria: number;  
    Categoria: Categoria;
    CategoriaNombre: string; 
    FechaHoraPublicacion: Date;
    FechaHoraAlta: Date;
    FechaHoraUltimaActualizacion: Date; 
    FechaHoraBaja: Date; 
    IdImagen: number;
    Subtitulo: string;
    MetaDescription: string;
    MetaTags: string;
    Imagen: Imagen[]; 
}