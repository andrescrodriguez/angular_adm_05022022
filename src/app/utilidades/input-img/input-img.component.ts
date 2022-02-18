import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { toBase64 } from 'src/app/funciones';
import { FileServerImagenService } from 'src/app/galeria/file-server-imagen.service';
import { Imagen } from 'src/app/models/imagen';


@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent implements OnInit {

  @Output()
  imagenSeleccionada: EventEmitter<Imagen> = new EventEmitter<Imagen>();

  constructor(private fileServerImagenService: FileServerImagenService) { }

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
    this.fileServerImagenService.upload(this.file).subscribe(event => {
      // if (event.type === HttpEventType.UploadProgress){
      //   // this.progress = Math.round(100 * event.loaded / event.total);
      // }
      // else if (event.type === HttpEventType.Response) {
      //   // this.message = 'Upload success.';
      // }
      console.log(event);
      this.imagenSeleccionada.emit(event);
      this.file = null;
      this.btnSeleccionarCambiarTextoMethod();
    });
  }
}
