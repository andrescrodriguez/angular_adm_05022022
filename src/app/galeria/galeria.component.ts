import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { toBase64 } from '../funciones';
import { FileServerImagenService } from './file-server-imagen.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  imagenBase64: string;
  public progress: number;
  public message: string;

  constructor(private fileServerImagenService: FileServerImagenService) { }

  ngOnInit(): void {
  }

  imagenSeleccionada(imagen){

    
    
      this.fileServerImagenService.upload(imagen).subscribe(event => {
        // if (event.type === HttpEventType.UploadProgress){
        //   // this.progress = Math.round(100 * event.loaded / event.total);
        // }
        // else if (event.type === HttpEventType.Response) {
        //   // this.message = 'Upload success.';
        // }
      });
  }
}
