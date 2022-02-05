import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  // permite manejar el campo de un formulario de manera individual
  // en vez de usar el FormGroup se usa el FormControl
  control: FormControl = new FormControl(); 
  opciones = [
    {valor: 'Calor', foto: 'https://m.guiadelocio.com/var/guiadelocio.com/storage/images/cine/archivo-peliculas/geminis/37423557-6-esl-ES/geminis.jpg'},
    {valor: 'Frio', foto: 'https://www.fotoefectos.com/efectos/grandes/goodfellas.jpg'},
    {valor: 'Bajo', foto: 'https://i.pinimg.com/474x/4a/a7/09/4aa709fb827464c325ee3c63f07b8a6c.jpg'},
    {valor: 'Bueno', foto: 'https://cdn.domestika.org/c_limit,dpr_auto,f_auto,q_auto,w_820/v1509556098/content-items/002/130/920/23032615_1453885808063402_2233926401809156054_n-original.jpg?1509556098'},
    {valor: 'Malo', foto: 'https://ep00.epimg.net/elpais/imagenes/2020/02/06/album/1580999639_454991_1581001437_album_normal.jpg'},
    {valor: 'Lindo', foto: 'https://i.pinimg.com/originals/4c/20/81/4c20811667fc8b619b2aab61c2e528f2.jpg'},
    {valor: 'Feo', foto: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1561060629-51ebhJXUZqL.jpg?crop=1xw:1xh;center,top&resize=480:*'}
  ];

  opcionesOriginales = this.opciones;  
  opcionesSeleccionadas = [];

  columnasAMostrar = ['Foto', 'Nombre', 'Accion'];
  @ViewChild(MatTable) table: MatTable<any>;

  constructor() { }

  ngOnInit(): void {
    this.control.valueChanges.subscribe(value => {
      console.log(value);
      this.opciones = this.opcionesOriginales;
      this.opciones = this.opciones.filter(x => x.valor.indexOf(value) !== -1);
      console.log(this.opciones);
    });
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){
    console.log(event.option.value);
    this.opcionesSeleccionadas.push(event.option.value);
    this.control.patchValue('');
    
    if(this.table !== undefined){
      this.table.renderRows();
    }
  }

  eliminar(element){
    const index = this.opcionesSeleccionadas.findIndex(x => x.valor === element.valor);
    this.opcionesSeleccionadas.splice(index,1);
    this.table.renderRows();
  }

  finalizaArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.opcionesSeleccionadas.findIndex(
      element => element === event.item.data
    );
    moveItemInArray(this.opcionesSeleccionadas, indicePrevio, event.currentIndex);
    this.table.renderRows();
  }
}
