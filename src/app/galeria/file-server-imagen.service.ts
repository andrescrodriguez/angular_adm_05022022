import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Imagen } from '../models/imagen';
import { Response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class FileServerImagenService {

  public progress: number;
  public message: string;
  apiURL = environment.apiURL + '/imagen';
  
  constructor(private http: HttpClient) { }

  upload(file) {
    if (file.length === 0) { return; }
    let fileToUpload = <File>file;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    console.log("ahora aca")
    console.log(fileToUpload.name)
    return this.http.post<Imagen>(this.apiURL + "/new", formData);
  }

  obtenerTodos(pagina: number, cantidadDeRegistrosAMostrar: number) {
    var params = new HttpParams();
    params = params.append('Pagina', pagina.toString());
    params = params.append('RegistrosPorPagina', cantidadDeRegistrosAMostrar.toString());
    return this.http.post<Response>(this.apiURL + "/getAllWithPagination", {observe: 'response', params}); 
    // el observe: 'response' es para leer la cabecera http
    // tiene que retornar un Observable<any> porque con observe ya no se devuelve solo articulo[]
  }
}
