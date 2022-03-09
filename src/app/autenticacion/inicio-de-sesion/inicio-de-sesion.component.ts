import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CredencialesUsuarioDTO } from 'src/app/models/credenciales-usuario-dto';
import { RespuestaAutenticacionDTO } from 'src/app/models/respuesta-autenticacion-dto';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import { parsearErroresAPI } from 'src/app/utilidades/errores-api/parsear-errores-api';

@Component({
  selector: 'app-inicio-de-sesion',
  templateUrl: './inicio-de-sesion.component.html',
  styleUrls: ['./inicio-de-sesion.component.css']
})
export class InicioDeSesionComponent implements OnInit {

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
      }]     
    });
  }

  iniciarSesion() {
    
    const credencialesUsuarioDTO: CredencialesUsuarioDTO = {
      Email: this.formGroup.get('Email').value,
      Password: this.formGroup.get('Password').value
    };

    this.seguridadService.iniciarSesion(credencialesUsuarioDTO).subscribe({
      next: (n) => { 
        console.log("InicioDeSesionComponent-iniciarSesion")
        console.log(n)
        const respuestaAutenticacionDTO: RespuestaAutenticacionDTO = {
          Token: n['token'],
          Expiracion: n['expiracion'].toString()
        }
        this.seguridadService.guardarToken(respuestaAutenticacionDTO);
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

}
