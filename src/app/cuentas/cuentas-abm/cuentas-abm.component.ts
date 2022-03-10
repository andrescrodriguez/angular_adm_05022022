import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredencialesUsuarioDTO } from 'src/app/models/credenciales-usuario-dto';
import { Cuenta } from 'src/app/models/cuenta';
import { KeyValue } from 'src/app/models/key-value';
import { RespuestaAutenticacionDTO } from 'src/app/models/respuesta-autenticacion-dto';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { parsearErroresAPI } from 'src/app/utilidades/errores-api/parsear-errores-api';

@Component({
  selector: 'app-cuentas-abm',
  templateUrl: './cuentas-abm.component.html',
  styleUrls: ['./cuentas-abm.component.css']
})
export class CuentasAbmComponent implements OnInit {

  claims: KeyValue[] = [{key: 'admin', value: 'admin'}]; 
  idClaimSelected: string;

  constructor(private formBuilder: FormBuilder, 
    private seguridadService: SeguridadService,
    private router: Router) { }

  formGroup: FormGroup;
  erroresAPI: string[] = [];

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
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
    
    const cuentaDTO: Cuenta = {
      id: 0,
      email: this.formGroup.get('Email').value,
      userName: this.formGroup.get('Email').value,
      password: this.formGroup.get('Password').value,
      claim: this.formGroup.get('Claim').value
    };

    this.seguridadService.guardar(cuentaDTO).subscribe({
      next: (n) => { 
        console.log(n)
        this.router.navigate(['/']);
       },
      error: (e) => { 
        console.log("errores:")
        this.erroresAPI = parsearErroresAPI(e);
       }
    });
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
