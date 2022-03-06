import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toBase64 } from 'src/app/funciones';
import { FileServerImagenService } from 'src/app/galeria/file-server-imagen.service';
import { Imagen } from 'src/app/models/imagen';
import { MatDialog } from '@angular/material/dialog';
import { DialogImgComponent } from 'src/app/utilidades/dialog-img/dialog-img.component';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent implements OnInit {
  
  @Input()
  imagen: Imagen;

  @Output()
  imagenSeleccionada: EventEmitter<Imagen> = new EventEmitter<Imagen>();

  @Input()
  btnCustomText: string;

  imagenURLDefault: string;

  constructor(private fileServerImagenService: FileServerImagenService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.btnSeleccionarCambiarTextoMethod();
  }

  btnCustomMethod(){
    
    const dialogRef = this.dialog.open(DialogImgComponent, {
      width: '100%',
      data: 'Seleccione la imagen'
    }); 
    dialogRef.afterClosed().subscribe(ref => {

      this.imagen = ref as Imagen;
      console.log(this.imagen.ruta);

      // this.btnCustomEvent.emit('');
      this.imagenBase64 = undefined;
      this.imagenURLDefault = this.imagen.ruta;
      this.file = null;
      this.btnSeleccionarCambiarTextoMethod();
      this.imagenSeleccionada.emit(ref);
    });
  }

  btnSeleccionarCambiarTextoMethod(){
    if(this.file == null){
      this.btnSeleccionarCambiarText = "Seleccionar Imagen"
    }
    else{
      this.btnSeleccionarCambiarText = "Cambiar Imagen"
    }
  }

  file: File;
  imagenBase64: string;
  btnSeleccionarCambiarText: string;

  change(event){
    
    if(event.target.files.length > 0){
      this.file = event.target.files[0];
      toBase64(this.file)
      .then((value: string) => {
        this.imagenBase64 = value;
        this.imagenURLDefault = "";
        this.btnSeleccionarCambiarTextoMethod();
      })
      .catch((error) => console.log(error));
    }
  }

  upload(){
    this.fileServerImagenService.upload(this.file).subscribe(event => {
      this.imagenSeleccionada.emit(event);
      this.file = null;
      this.btnSeleccionarCambiarTextoMethod();
    });
  }
}