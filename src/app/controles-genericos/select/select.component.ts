import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input()
  nombre: string;

  @Input()
  objetos: any[];

  @Input()
  valueSelected: string;

  @Output()
  valueSelectedEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    
  }

  selectionChangeEvent(id: string){
    this.valueSelectedEvent.emit(this.valueSelected);
  }

}
