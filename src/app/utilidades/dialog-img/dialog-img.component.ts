import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Imagen } from 'src/app/models/imagen';

@Component({
  selector: 'app-dialog-img',
  templateUrl: './dialog-img.component.html',
  styleUrls: ['./dialog-img.component.css']
})
export class DialogImgComponent implements OnInit {

  imagen: Imagen;

  constructor(public dialogRef: MatDialogRef<DialogImgComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
  }

  onClickNo(){
    this.dialogRef.close();
  }

  imagenEvent(event){
    console.log("sera esto");
    this.imagen = event;
  }
}
