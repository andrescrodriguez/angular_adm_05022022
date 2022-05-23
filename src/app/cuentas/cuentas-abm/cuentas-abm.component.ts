import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CredencialesUsuarioDTO } from 'src/app/models/credenciales-usuario-dto';
import { Cuenta } from 'src/app/models/cuenta';
import { KeyValue } from 'src/app/models/key-value';
import { RespuestaAutenticacionDTO } from 'src/app/models/respuesta-autenticacion-dto';
import { Usuario } from 'src/app/models/usuario';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { parsearErroresAPI } from 'src/app/utilidades/errores-api/parsear-errores-api';
import { CuentasService } from '../cuentas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuentas-abm',
  templateUrl: './cuentas-abm.component.html',
  styleUrls: ['./cuentas-abm.component.css']
})
export class CuentasAbmComponent implements OnInit {

  claims: KeyValue[] = [{key: 'admin', value: 'admin'}]; 
  idClaimSelected: string;
  NombreMsj: string;
  errores: string[];
  btn: string;

  constructor(private formBuilder: FormBuilder, 
    private cuentasService: CuentasService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  formGroup: FormGroup;
  erroresAPI: string[] = [];

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      UserName: ['', {
        validators: [Validators.required]
      }],
      Email: ['', {
        validators: [Validators.required]
      }],
      Password: ['', {
        validators: [Validators.required]
      }],
      RepetirPassword: ['', {
        validators: [Validators.required]
      }],
      Claim: ['', {
        validators: [Validators.required]
      }]     
    });

    this.cargarFormGroup();
  }

  private cargarFormGroup() {
    
    var form = this.mostrarFormulario();
    console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQ")
    if(form[0] === "GUARDAR"){
      
    }
    else if(form[0] === "EDITAR"){
      this.cuentasService.obtenerPorId(parseInt(form[1])).subscribe({
        next: (n) => { 
          this.formGroup.patchValue({
            Email: n.Email,
            UserName: n.UserName,
            Password: '',
            RepetirPassword: ''
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

  claimSelected(claim) {
    this.formGroup.get("Claim").setValue(claim);
  }

  public accion(){
    var form = this.mostrarFormulario();
    if(form[0] === "GUARDAR"){ this.guardar(); }
    else if(form[0] === "EDITAR"){ this.editar(parseInt(form[1])); }
  }

  guardar() {
    this.cuentasService.guardar(this.formGroup.value).subscribe({
      next: (n) => { 
        Swal.fire(
          'Guardada exitosamente!',
          'Click para continuar',
          'success'
        ).then(() => {
          this.router.navigate(['/cuentas']);
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
    this.cuentasService.editar(id, this.formGroup.value).subscribe({
      next: (n) => { 
        Swal.fire(
          'Actualizada exitosamente!',
          'Click para continuar',
          'success'
        ).then(() => {
          this.router.navigate(['/cuentas']);
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

  obtenerMensajeErrorUserName() : string {
    var campo = this.formGroup.get('UserName');
    if (campo.hasError('required')){
      return 'El campo Usuario es requerido';
    }
    return '';
  }

  obtenerMensajeErrorEmail() : string {
    var campo = this.formGroup.get('Email');
    if (campo.hasError('required')){
      return 'El campo Email es requerido';
    }
    return '';
  }

  obtenerMensajeErrorPassword() : string {
    var campo = this.formGroup.get('Password');
    if (campo.hasError('required')){
      return 'El campo Password es requerido';
    }
    return '';
  }

  obtenerMensajeErrorRepetirPassword() : string {

    var campo = this.formGroup.get('RepetirPassword');
    if (campo.hasError('required')){
      return 'El campo Repetir Password es requerido';
    }
    return '';
  }

  

}
