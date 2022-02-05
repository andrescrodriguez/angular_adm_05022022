import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ArticulosListComponent } from './articulos/articulos-list/articulos-list.component';
import { SeguridadService } from './seguridad/seguridad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(){}
  ngOnInit(): void {
    
  }
  title = 'codemmy-admin';

  // me permite manejar la instancia de ArticulosListComponent si agregue el <app-articulos-list></app-articulos-list> en el html
  @ViewChild(ArticulosListComponent)
  articulosListComponent: ArticulosListComponent

  manejarRated(voto: number): void {
    alert(voto);
  }

  ejemplo(): void{
    // this.articulosListComponent
  }

  


}
