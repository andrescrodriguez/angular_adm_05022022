import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ABM } from '../interfaces/abm';
import { Categoria } from '../models/categoria';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  apiURL = environment.apiURL + '/categoria';

  constructor(private http: HttpClient) { }
  
  obtenerTodos(pagina: number, cantidadDeRegistrosAMostrar: number) {
    var params = new HttpParams();
    params = params.append('Pagina', pagina.toString());
    params = params.append('RegistrosPorPagina', cantidadDeRegistrosAMostrar.toString());
    return this.http.post<Response>(this.apiURL + "/getAllWithPagination", {observe: 'response', params}); 
    // el observe: 'response' es para leer la cabecera http
    // tiene que retornar un Observable<any> porque con observe ya no se devuelve solo Categoria[]
  }

  obtenerPorId(id: number) {
    return this.http.get<Categoria>(this.apiURL + '/getById?id=' + id);
  }

  guardar(categoria: any) {
    return this.http.post(this.apiURL + '/new', categoria);
  }

  editar(id: number, categoria: any) {
    return this.http.put<Categoria>(this.apiURL + '/edit?id=' + id, categoria);
  }

  bajaLogica(id: number) {
    
  }

  eliminar(id: number) {
    return this.http.delete(this.apiURL + "/delete?id=" + id);
  }

  obtenerTodosPorUsuario() {
    return this.http.get<Categoria[]>(this.apiURL + '/getAll');
  }

  private construirFormData(categoria: Categoria) : FormData {
    const formData = new FormData();
    formData.append('Nombre', categoria.Nombre);
    formData.append('NombreDeRuta', categoria.NombreDeRuta);
    if(categoria.Imagen){
      formData.append('Imagen', categoria.Imagen);
    }
    return formData;
  }
}
