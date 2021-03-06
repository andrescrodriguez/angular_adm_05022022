import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ABM } from '../interfaces/abm';
import { Articulo } from '../models/articulo';
import { Response } from '../models/response';


@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  apiURL = environment.apiURL + '/articulo';
  
  constructor(private http: HttpClient) 
  { 

  }

  // obtenerTodos(pagina: number, cantidadDeRegistrosAMostrar: number) {
  //   var params = new HttpParams();
  //   params = params.append('Pagina', pagina.toString());
  //   params = params.append('RegistrosPorPagina', cantidadDeRegistrosAMostrar.toString());
  //   return this.http.get<Articulo[]>(this.apiURL, {observe: 'response', params}); 
  //   // el observe: 'response' es para leer la cabecera http
  //   // tiene que retornar un Observable<any> porque con observe ya no se devuelve solo articulo[]
  // }

  obtenerTodos(pagina: number, cantidadDeRegistrosAMostrar: number) {
    var params = new HttpParams();
    params = params.append('Pagina', pagina.toString());
    params = params.append('RegistrosPorPagina', cantidadDeRegistrosAMostrar.toString());
    return this.http.post<Response>(this.apiURL + "/getAllWithPagination", {observe: 'response', params}); 
    // el observe: 'response' es para leer la cabecera http
    // tiene que retornar un Observable<any> porque con observe ya no se devuelve solo articulo[]
  }
  
  obtenerPorId(id: number) {
    return this.http.get<Articulo>(this.apiURL + '/getById?id=' + id);
  }

  guardar(articulo: any) {
    return this.http.post(this.apiURL + '/new', articulo);
  }

  editar(id: number, articulo: any) {
    return this.http.put<Articulo>(this.apiURL + '/edit?id=' + id, articulo);
  }

  bajaLogica(id: number) {
    
  }

  eliminar(id: number) {
    return this.http.delete(this.apiURL + "/delete?id=" + id);
  }
}
