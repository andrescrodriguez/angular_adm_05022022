import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { desencriptarAES, encriptarAES } from 'src/app/funciones';
import { Categoria } from 'src/app/models/categoria';
import { parsearErroresAPI } from 'src/app/utilidades/errores-api/parsear-errores-api';
import { generarNombreDeRuta } from 'src/app/utilidades/generar-nombre-de-ruta/generar-nombre-de-ruta';
import { capitalizarPrimeraLetra } from 'src/app/utilidades/strings/capitalize';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primera-letra-mayuscula';

import Swal from 'sweetalert2';
import { CategoriasService } from '../categorias.service';


@Component({
  selector: 'app-categorias-abm',
  templateUrl: './categorias-abm.component.html',
  styleUrls: ['./categorias-abm.component.css']
})
export class CategoriasAbmComponent implements OnInit {

  btn: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private categoriasService: CategoriasService, 
    private formBuilder: FormBuilder) { }

  NombreMsj: string;
  formGroup: FormGroup;
  errores: string[];

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      Id: 0,
      Nombre: ['', { validators: 
        [Validators.required,
        primeraLetraMayuscula()]
      }],
      NombreDeRuta: ''
    });

    this.cargarFormGroup();
  }

  mostrarFormulario(): string[]{
    
    const result: string[] = [];

    this.activatedRoute.paramMap.subscribe( params => {
      var _params = params['params'];
      
      if (Object.keys(_params).length === 0 
          && 
          _params.constructor === Object
        )
      { 
        this.btn = "Guardar";
        result.push("GUARDAR");
      }
      else { 
        this.btn = "Editar";
        result.push("EDITAR");
        result.push(_params['cryptoid']);
      }
     });

     return result;
  }
  
  setearNombreDeRuta(){
    var nombreDeRuta = this.formGroup.get('NombreDeRuta');
    if(nombreDeRuta.value === ''){
      this.formGroup.get('Nombre').valueChanges.subscribe(val => {
        var nombre = this.formGroup.get('Nombre').value;
        this.formGroup.patchValue({
          NombreDeRuta: generarNombreDeRuta(nombre)
        }); 
      });
    }
  }

  obtenerErrorCampoNombre(): string{
    var campo = this.formGroup.get('Nombre');
    if(campo.hasError('required')){
      return 'El Nombre es requerido';
    }
    else if(campo.hasError('primeraLetraMayuscula')){
      return campo.getError('primeraLetraMayuscula').mensaje;
    }
    return '';
  }

  private cargarFormGroup() {

    var form = this.mostrarFormulario();

    if(form[0] === "GUARDAR"){
      this.setearNombreDeRuta();
    }
    else if(form[0] === "EDITAR"){
      this.setearNombreDeRuta();
      this.categoriasService.obtenerPorId(parseInt(form[1])).subscribe({
        next: (n) => { 
          this.formGroup.patchValue({
            Nombre: n.Nombre,
            NombreDeRuta: n.NombreDeRuta
          })
          },
        error: (e) => { 
          this.errores = parsearErroresAPI(e);
          Swal.fire(
            'Ha surgido un error!',
            this.errores.join('<br>'),
            'error'
          )
          }
      });
    }
  }

  public accion(){
    var form = this.mostrarFormulario();
    if(form[0] === "GUARDAR"){ this.guardar(); }
    else if(form[0] === "EDITAR"){ this.editar(parseInt(form[1])); }
  }

  public guardar(){
    this.categoriasService.guardar(this.formGroup.value).subscribe({
        next: (n) => { 
          Swal.fire(
            'Guardada exitosamente!',
            'Click para continuar',
            'success'
          ).then(() => {
            this.router.navigate(['/categorias']);
          })
         },
        error: (e) => { 
          this.errores = parsearErroresAPI(e);
          Swal.fire(
            'Ha surgido un error!',
            this.errores.join('<br>'),
            'error'
          )
         }
    });
  }

  public editar(id: number){
    this.categoriasService.editar(id, this.formGroup.value).subscribe({
      next: (n) => { 
        Swal.fire(
          'Actualizada exitosamente!',
          'Click para continuar',
          'success'
        ).then(() => {
          this.router.navigate(['/categorias']);
        })
       },
      error: (e) => { 
        this.errores = parsearErroresAPI(e);
        Swal.fire(
          'Ha surgido un error!',
          this.errores.join('<br>'),
          'error'
        )
       }
    });
  }

}
