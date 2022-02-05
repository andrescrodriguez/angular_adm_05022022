import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { toBase64 } from 'src/app/funciones';


@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent implements OnInit {

  @Output()
  imagenSeleccionada: EventEmitter<File> = new EventEmitter<File>();

  constructor() { }

  ngOnInit(): void {
    this.btnSeleccionarCambiarTextoMethod();
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
        this.btnSeleccionarCambiarTextoMethod();
      })
      .catch((error) => console.log(error));
    }
  }

  upload(){
    this.imagenSeleccionada.emit(this.file);
    this.file = null;
    this.imagenBase64 = '';
    this.btnSeleccionarCambiarTextoMethod();
  }
}
