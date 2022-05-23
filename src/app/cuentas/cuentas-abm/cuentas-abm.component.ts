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

@Component({
  selector: 'app-cuentas-abm',
  templateUrl: './cuentas-abm.component.html',
  styleUrls: ['./cuentas-abm.component.css']
})
export class CuentasAbmComponent implements OnInit {

  claims: KeyValue[] = [{key: 'admin', value: 'admin'}]; 
  idClaimSelected: string;

  constructor(private formBuilder: FormBuilder, 
    private cuentaService: CuentasService,
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
  }

  claimSelected(claim) {
    this.formGroup.get("Claim").setValue(claim);
  }

  guardar() {
    
    const usuarioDTO: Usuario = {
      Id: 0,
      Email: this.formGroup.get('Email').value,
      UserName: this.formGroup.get('UserName').value,
      Password: this.formGroup.get('Password').value,
      Claim: this.formGroup.get('Claim').value
    };

    this.cuentaService.guardar(usuarioDTO).subscribe({
      next: (n) => { 
        this.router.navigate(['/cuentas']);
       },
      error: (e) => { 
        console.log("errores:")
        this.erroresAPI = parsearErroresAPI(e);
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
