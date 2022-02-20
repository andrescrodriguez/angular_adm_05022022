import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileServerImagenService } from 'src/app/galeria/file-server-imagen.service';
import { Imagen } from 'src/app/models/imagen';


@Component({
  selector: 'app-list-img',
  templateUrl: './list-img.component.html',
  styleUrls: ['./list-img.component.css']
})
export class ListImgComponent implements OnInit {

  imagenesList: Imagen[];
  imagenes: string[];

  constructor(private fileServerImagenService: FileServerImagenService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.fileServerImagenService.obtenerTodos(1,10).subscribe((result : HttpResponse<Imagen[]>) => {
      console.log(result.body);

      // result.body.forEach(element => {
      //   this.imagenes.push(element.ruta);
      // });
      
      
      console.log(result.headers.get('cantidadTotalDeRegistros'));

      this.imagenesList = result.body;
     });
  }

  openSnackBar(value){
    this.snackBar.open(value, 'Cerrar', {
      duration: 3000
    });
  }
}


