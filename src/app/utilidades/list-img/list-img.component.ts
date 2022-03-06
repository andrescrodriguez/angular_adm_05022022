import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  index: number = 1;
  cantidadTotalDeRegistros: number;
  anteriorDisabled: boolean;
  siguienteDisabled: boolean;

  @Output()
  imagenEvent: EventEmitter<Imagen> = new EventEmitter<Imagen>();

  constructor(private fileServerImagenService: FileServerImagenService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.init();
  }

  listar(value){
    
    if(value === 'ANTERIOR'){
      if(this.index > 1){
        this.index--;
      }
      else {
        
      }
    }

    if(value === 'SIGUIENTE'){
      this.index++;
    }
    
    console.log(this.index);

    this.fileServerImagenService.obtenerTodos(this.index,10).subscribe((result : HttpResponse<Imagen[]>) => {
      // console.log(result.body);
      // console.log(result.headers.get('cantidadTotalDeRegistros'));
      this.imagenesList = result.body;

      this.cantidadTotalDeRegistros = parseInt(result.headers.get('cantidadTotalDeRegistros'));
    
      if((this.index * 10) > this.cantidadTotalDeRegistros){
        this.siguienteDisabled = true;
      }
      else{
        this.siguienteDisabled = false;
      }

      if(this.index === 1){
        this.anteriorDisabled = true;
      }
      else{
        this.anteriorDisabled = false;
      }
    });
  }

  init(){
    this.anteriorDisabled = true;
    this.siguienteDisabled = true;
  }

  openSnackBar(value){
    this.snackBar.open(value, 'Cerrar', {
      duration: 3000
    });
  }

  radioChange(value){
    const imagen = this.imagenesList.find(x => x.id === value);
    if(imagen !== undefined){
      this.imagenEvent.emit(imagen);
    }
  }
}


