import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { Cuenta } from 'src/app/models/cuenta';

@Component({
  selector: 'app-cuentas-list',
  templateUrl: './cuentas-list.component.html',
  styleUrls: ['./cuentas-list.component.css']
})
export class CuentasListComponent implements OnInit {

  constructor() { }

  cuentas: Cuenta[];

  columnasAMostrar = ['UserName', 'Email', 'Acciones'];
  @ViewChild(MatTable) table: MatTable<any>;
  
  cantidadTotalDeRegistros;
  paginaActual: number = 1;
  cantidadDeRegistrosAMostrar: number = 10;

  ngOnInit(): void {
    this.obtenerTodos(this.paginaActual, this.cantidadDeRegistrosAMostrar);
  }

  obtenerTodos(pagina: number, cantidadDeRegistrosAMostrar: number) {
    // this.articulosService.obtenerTodos(pagina, cantidadDeRegistrosAMostrar).subscribe((result : HttpResponse<Articulo[]>) => {
    //  this.cantidadTotalDeRegistros = result.headers.get('cantidadTotalDeRegistros');
    //  this.articulos = result.body;
    // });
  }

  actualizarPaginacion(event: PageEvent){
    this.paginaActual = event.pageIndex + 1;
    this.cantidadDeRegistrosAMostrar = event.pageSize;
    this.obtenerTodos(this.paginaActual, this.cantidadDeRegistrosAMostrar);
  }

  eliminar(articulo){
    // this.articulosService.eliminar(articulo.id).subscribe({
    //   next: n => { 
    //     this.obtenerTodos(this.paginaActual, this.cantidadDeRegistrosAMostrar);
    //     this.table.renderRows(); 
    //   },
    //   error: e => { console.error(e); }
    // });
  }

}
