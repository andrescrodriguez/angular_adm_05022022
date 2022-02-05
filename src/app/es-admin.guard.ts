import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from './seguridad/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class EsAdminGuard implements CanActivate {

  constructor (private seguridadService: SeguridadService,
    private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // esta logueado
    if(this.seguridadService.estaLogueado() === true){
      // es admin
      if(this.seguridadService.obtenerRol() === 'admin'){
        return true;
      }
      else{
        this.router.navigate(['/']);
        return false;
      }
    }
    else{
      this.router.navigate(['/inicio-de-sesion']);
      return false;
    }

  }
  
}
