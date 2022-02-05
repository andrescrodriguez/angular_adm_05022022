import { AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ciclo-de-vida',
  templateUrl: './ciclo-de-vida.component.html',
  styleUrls: ['./ciclo-de-vida.component.css']
})
export class CicloDeVidaComponent implements OnInit, OnChanges, OnDestroy, DoCheck, AfterViewInit {

  @Input()
  titulo;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("OnChanges");
    console.log(changes);
  }
  ngOnDestroy(): void {
    console.log("OnDestroy");
  }
  ngDoCheck(): void {
    console.log("DoCheck");
  }
  ngAfterViewInit(): void {
    console.log("AfterViewInit");
  }

  ngOnInit(): void {
    console.log("OnInit");
  }

}

// Ciclo de vida de un componente:
  // ----------------------------------------------------------------------------
  // OnInit => se usa para inicializar un componente
  // OnChanges => se dispara cuando son modificados los parametros de un componente desde fuera 
  //           => @Output()
  //           => SimpleChanges tiene: nombre de la propiedad, valor anterior, valor nuevo, si es la primera vez que fue editada
  // OnDestroy => es llamado justo antes de que un componente sea destruido.. 
  //           => ideal para limpiar recursos como: observables, intervalos de tiempo
  // DoCheck => es llamado cada vez que el detector de cambios de angular es ejecutado
  //         => se ejecuta ante cambios especiales como actualizacion de variables de propiedad, eventos, timer
  // AfterViewInit => permite ejecutar funcionalidad cuando los componentes hijos fueron renderizados
  //               => es como el DoCheck para los componentes hijos
  // AfterContentInit => se ejecuta luego de que el contenido proyectado en el componente ha sido inicializado
  // AfterContentChecked => es como el DoCheck para los componentes proyectados