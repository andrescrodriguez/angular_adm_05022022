export interface ABM{
    obtenerTodos(pagina: number, cantidadDeRegistrosAMostrar: number): any;
  
    obtenerPorId(id: number): any;
  
    guardar(objeto: any): any;
  
    editar(id: number, objeto: any): any;
  
    bajaLogica(id: number): any;
  
    eliminar(id: number): any;
}