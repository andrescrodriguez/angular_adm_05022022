import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { Categoria } from 'src/app/models/categoria';
import { CategoriasService } from '../categorias.service';

@Component({
  selector: 'app-categorias-list',
  templateUrl: './categorias-list.component.html',
  styleUrls: ['./categorias-list.component.css']
})
export class CategoriasListComponent implements OnInit {

  constructor(private categoriasService: CategoriasService) { }

  categorias: Categoria[];

  columnasAMostrar = ['Nombre', 'NombreDeRuta', 'Acciones'];
  @ViewChild(MatTable) table: MatTable<any>;
  
  cantidadTotalDeRegistros;
  paginaActual: number = 1;
  cantidadDeRegistrosAMostrar: number = 10;

  ngOnInit(): void {
    this.obtenerTodos(this.paginaActual, this.cantidadDeRegistrosAMostrar);
  }

  obtenerTodos(pagina: number, cantidadDeRegistrosAMostrar: number) {
    this.categoriasService.obtenerTodos(pagina, cantidadDeRegistrosAMostrar).subscribe((result : HttpResponse<Categoria[]>) => {
     this.cantidadTotalDeRegistros = result.headers.get('cantidadTotalDeRegistros');
     this.categorias = result.body;
    });
  }

  actualizarPaginacion(event: PageEvent){
    this.paginaActual = event.pageIndex + 1;
    this.cantidadDeRegistrosAMostrar = event.pageSize;
    this.obtenerTodos(this.paginaActual, this.cantidadDeRegistrosAMostrar);
  }

  eliminar(categoria){
    this.categoriasService.eliminar(categoria.id).subscribe(() => {
      this.obtenerTodos(this.paginaActual, this.cantidadDeRegistrosAMostrar);
    },
    error => console.error(error));

    this.table.renderRows();
  }
}
