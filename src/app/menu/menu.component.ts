import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadService } from '../seguridad/seguridad.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  email: string;

  constructor(private seguridadService: SeguridadService, private router: Router) { }

  ngOnInit(): void {
    this.email = this.seguridadService.obtenerCampoJWT('email');
  }

  cerrarSesion() {
    this.seguridadService.cerrarSesion();
    this.email = this.seguridadService.obtenerCampoJWT('email');
    this.router.navigate(['/inicio-de-sesion']);
  }
}
