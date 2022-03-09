import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ABM } from '../interfaces/abm';
import { CredencialesUsuarioDTO } from '../models/credenciales-usuario-dto';
import { Cuenta } from '../models/cuenta';
import { RespuestaAutenticacionDTO } from '../models/respuesta-autenticacion-dto';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService implements ABM {

  apiURL = environment.apiURL + '/cuenta';
  private readonly llaveToken = 'token';
  private readonly llaveExpiracionToken = 'expiracion-token';
  private readonly campoRol = 'role';

  constructor(private http: HttpClient) { }
  
  crearCuenta(credencialesUsuarioDTO: any) {
    return this.http.post(this.apiURL + "/crear", credencialesUsuarioDTO);
  }

  iniciarSesion(credencialesUsuarioDTO: any) {
    return this.http.post(this.apiURL + "/login", credencialesUsuarioDTO);
  }

  estaLogueado() : boolean {
    const token = localStorage.getItem(this.llaveToken);

    if(!token){
      this.cerrarSesion();
      return false;
    }

    const expiracion = localStorage.getItem(this.llaveExpiracionToken);
    const expiracionFecha = new Date(expiracion);

    if(expiracionFecha <= new Date()){
      this.cerrarSesion();
      return false;
    }

    return true;
  }

  obtenerCampoJWT(campo: string) : string{
    const token = localStorage.getItem(this.llaveToken);
    if(!token) {return '';}
    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo];
  }

  cerrarSesion(){
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracionToken);
  }

  obtenerRol() : string {
    return this.obtenerCampoJWT(this.campoRol);
  }

  guardarToken(respuestaAutenticacionDTO: RespuestaAutenticacionDTO) {
    localStorage.setItem(this.llaveToken, respuestaAutenticacionDTO.Token);
    localStorage.setItem(this.llaveExpiracionToken, respuestaAutenticacionDTO.Expiracion.toString());
  }

  obtenerToken(){
    return localStorage.getItem(this.llaveToken);
  }

  obtenerTodos(pagina: number, cantidadDeRegistrosAMostrar: number): any{

  }
  
  obtenerPorId(id: number): any{
    
  }

  guardar(cuentaDTO: Cuenta) {
    return this.http.post(this.apiURL, cuentaDTO);
  }

  editar(id: number, objeto: any): any{
    
  }

  bajaLogica(id: number): any{
    
  }

  eliminar(id: number): any{
    
  }
}
