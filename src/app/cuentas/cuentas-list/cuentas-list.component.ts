import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { Cuenta } from 'src/app/models/cuenta';
import { Usuario } from 'src/app/models/usuario';
import { CuentasService } from '../cuentas.service';

@Component({
  selector: 'app-cuentas-list',
  templateUrl: './cuentas-list.component.html',
  styleUrls: ['./cuentas-list.component.css']
})
export class CuentasListComponent implements OnInit {

  constructor(private cuentasService: CuentasService) { }

  usuarios: Usuario[];

  columnasAMostrar = ['UserName', 'Email', 'Acciones'];
  @ViewChild(MatTable) table: MatTable<any>;
  
  cantidadTotalDeRegistros;
  paginaActual: number = 1;
  cantidadDeRegistrosAMostrar: number = 10;

  ngOnInit(): void {
    this.obtenerTodos(this.paginaActual, this.cantidadDeRegistrosAMostrar);
  }

  obtenerTodos(pagina: number, cantidadDeRegistrosAMostrar: number) {
    this.cuentasService.obtenerTodos(pagina, cantidadDeRegistrosAMostrar).subscribe({
      next: n => { 
        this.cantidadTotalDeRegistros = (n["CantidadTotalDeRegistros"] as number);
         this.usuarios = (n["Usuarios"] as Usuario[]);
         this.table.renderRows(); 
      },
      error: e => { console.error(e); }
    });
  }

  actualizarPaginacion(event: PageEvent){
    this.paginaActual = event.pageIndex + 1;
    this.cantidadDeRegistrosAMostrar = event.pageSize;
    this.obtenerTodos(this.paginaActual, this.cantidadDeRegistrosAMostrar);
  }

  eliminar(usuario){
    this.cuentasService.eliminar(usuario.Id).subscribe({
      next: n => { 
        this.obtenerTodos(this.paginaActual, this.cantidadDeRegistrosAMostrar);
        this.table.renderRows(); 
      },
      error: e => { console.error(e); }
    });
  }

}
