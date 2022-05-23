import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  apiURL = environment.apiURL + '/cuenta';
  
  constructor(private http: HttpClient) { }

  obtenerTodos(pagina: number, cantidadDeRegistrosAMostrar: number) {
    var params = new HttpParams();
    params = params.append('Pagina', pagina.toString());
    params = params.append('RegistrosPorPagina', cantidadDeRegistrosAMostrar.toString());
    return this.http.post<Response>(this.apiURL + "/getAllWithPagination", {observe: 'response', params}); 
    // el observe: 'response' es para leer la cabecera http
    // tiene que retornar un Observable<any> porque con observe ya no se devuelve solo articulo[]
  }

  guardar(usuarioDTO: Usuario) {
    return this.http.post(this.apiURL + "/new", usuarioDTO);
  }

  obtenerPorId(id: number) {
    return this.http.get<Usuario>(this.apiURL + '/getById?id=' + id);
  }

  editar(id: number, articulo: any) {
    return this.http.put<Usuario>(this.apiURL + '/edit?id=' + id, articulo);
  }

  bajaLogica(id: number) {
    
  }

  eliminar(id: number) {
    return this.http.delete(this.apiURL + "/delete?id=" + id);
  }
}
