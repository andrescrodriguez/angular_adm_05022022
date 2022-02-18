import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { toBase64 } from '../funciones';
import { Imagen } from '../models/imagen';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  imagenBase64: string;
  public progress: number;
  public message: string;

  constructor() { }

  ngOnInit(): void {
  }

  imagenSeleccionada(id){
    
  }
}
