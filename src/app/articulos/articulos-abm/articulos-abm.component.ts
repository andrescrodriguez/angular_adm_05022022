import { Location } from '@angular/common';
import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from 'src/app/categorias/categorias.service';
import { Categoria } from 'src/app/models/categoria';
import { Imagen } from 'src/app/models/imagen';
import { KeyValue } from 'src/app/models/key-value';
import { multipleSelectorModel } from 'src/app/selector-multiple/multiple-selector-model';
import { parsearErroresAPI } from 'src/app/utilidades/errores-api/parsear-errores-api';
import { generarNombreDeRuta } from 'src/app/utilidades/generar-nombre-de-ruta/generar-nombre-de-ruta';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primera-letra-mayuscula';
import Swal from 'sweetalert2';
import { ArticulosService } from '../articulos.service';

@Component({
  selector: 'app-articulos-abm',
  templateUrl: './articulos-abm.component.html',
  styleUrls: ['./articulos-abm.component.css']
})
export class ArticulosAbmComponent implements OnInit {

  btn: string;
  categorias: KeyValue[] = []; 
  idCategoriaSelected: string;
  imagen: Imagen;

  constructor(private formBuilder: FormBuilder, 
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriasService: CategoriasService,
    private articulosService: ArticulosService) { }

  formGroup: FormGroup;
  errores: string[];
  btnCustomText: string = "Galería";

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      Titulo:  ['', { validators: 
        [Validators.required,
        primeraLetraMayuscula()]
      }],
      PreLectura: ['', Validators.required],
      Contenido: ['', Validators.required],
      NombreDeRuta: ['', Validators.required],
      FechaHoraPublicacion: ['', Validators.required],
      IdImagen: 0,
      IdCategoria: ['', Validators.required],
      Subtitulo: '',
      MetaDescription: '',
      MetaTags: ''
    });

    this.setCategorias();
    this.cargarFormGroup();
    
    // this.leerValoresURL();

    // this.formGroup.valueChanges.subscribe(values => {
    //   this.escribirParametroEnUrl();
    // });
  }

  public categoriaSelected(id) {
    this.formGroup.get("IdCategoria").setValue(id);
  }

  private setCategorias(){
    this.categoriasService.obtenerTodosPorUsuario().subscribe({
      next: n => {
        (n["Categorias"] as Categoria[]).forEach(element => {
          const categoria: KeyValue = { 
            key: element.Id.toString(), 
            value: element.Nombre.trim() 
          };
          this.categorias.push(categoria);
        });
      },
      error: e => {}
    });
  }

  private cargarFormGroup() {

    var form = this.mostrarFormulario();

    if(form[0] === "GUARDAR"){
      this.setearNombreDeRuta();
    }
    else if(form[0] === "EDITAR"){
      this.setearNombreDeRuta();


      this.articulosService.obtenerPorId(parseInt(form[1])).subscribe({
        next: (n) => {
          console.log(n)
            this.formGroup.patchValue({
              Titulo: n.Titulo,
              PreLectura: n.PreLectura,
              Contenido: n.Contenido,
              NombreDeRuta: n.NombreDeRuta,
              FechaHoraPublicacion: n.FechaHoraPublicacion,
              IdImagen: n.IdImagen,
              IdCategoria: n.IdCategoria.toString(),
              Subtitulo: n.Subtitulo,
              MetaDescription: n.MetaDescription,
              MetaTags: n.MetaTags
            })
            
            // desplegable de categorías
            this.idCategoriaSelected = n.IdCategoria.toString();

            
            if (n.Imagen[0] !== undefined){
              this.imagen = n.Imagen[0];
            }

            
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

  setearNombreDeRuta(){
    var nombreDeRuta = this.formGroup.get('NombreDeRuta');
    if(nombreDeRuta.value === ''){
      this.formGroup.get('Titulo').valueChanges.subscribe(val => {
        var titulo = this.formGroup.get('Titulo').value;
        this.formGroup.patchValue({
          NombreDeRuta: generarNombreDeRuta(titulo)
        }); 
      });
    }
  }
  
  public accion(){
    var form = this.mostrarFormulario();
    if(form[0] === "GUARDAR"){ this.guardar(); }
    else if(form[0] === "EDITAR"){ this.editar(parseInt(form[1])); }
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

  public guardar(){
    
    this.articulosService.guardar(this.formGroup.value).subscribe({
        next: (n) => { 
          Swal.fire(
            'Guardada exitosamente!',
            'Click para continuar',
            'success'
          ).then(() => {
            this.router.navigate(['/articulos']);
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

    console.log(this.formGroup.value)

    this.articulosService.editar(id, this.formGroup.value).subscribe({
      next: (n) => { 
        Swal.fire(
          'Actualizada exitosamente!',
          'Click para continuar',
          'success'
        ).then(() => {
          this.router.navigate(['/articulos']);
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
  
  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  // validaciones
  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

  obtenerErrorCampoTitulo(): string{
    var campo = this.formGroup.get('Titulo');
    if(campo.hasError('required')){
      return 'El titulo es requerido';
    }
    else if(campo.hasError('primeraLetraMayuscula')){
      return campo.getError('primeraLetraMayuscula').mensaje;
    }
    return '';
  }

  obtenerErrorCampoSubtitulo(): string{
    var campo = this.formGroup.get('Subtitulo');
    if(campo.hasError('primeraLetraMayuscula')){
      return campo.getError('primeraLetraMayuscula').mensaje;
    }
    return '';
  }

  obtenerErrorCampoNombreDeRuta(): string{
    var campo = this.formGroup.get('NombreDeRuta');
    if(campo.hasError('required')){
      return 'El Nombre de Ruta es requerido';
    }
    return '';
  }

  obtenerErrorCampoCategoria(): string{
    return '';
  }

  obtenerErrorCampoPreLectura(): string{
    var campo = this.formGroup.get('PreLectura');
    if(campo.hasError('required')){
      return 'El PreLectura es requerido';
    }
    else if(campo.hasError('primeraLetraMayuscula')){
      return campo.getError('primeraLetraMayuscula').mensaje;
    }
    return '';
  }

  obtenerErrorCampoContenido(): string{
    var campo = this.formGroup.get('Contenido');
    if(campo.hasError('required')){
      return 'El Contenido es requerido';
    }
    else if(campo.hasError('primeraLetraMayuscula')){
      return campo.getError('primeraLetraMayuscula').mensaje;
    }
    return '';
  }

  obtenerErrorCampoMetaDescription(): string{
    var campo = this.formGroup.get('MetaDescription');
    if(campo.hasError('required')){
      return 'La meta descripción es requerida';
    }
    return '';
  }

  obtenerErrorCampoMetaTags(): string{
    var campo = this.formGroup.get('MetaTags');
    if(campo.hasError('required')){
      return 'Los meta tags son requeridos';
    }
    return '';
  }

  imagenSeleccionada(imagen){
    console.log(imagen);
    this.formGroup.get('IdImagen').setValue(imagen.Id);
  }

  btnCustomMethod(event){
    console.log(event);
  }



  // escribirParametroEnUrl(){
  //   var queryStrings = [];
    
  //   var valoresFormulario = this.formGroup.value;
  //   if(valoresFormulario.Titulo){
  //     queryStrings.push("titulo="+valoresFormulario.Titulo);
  //   }

  //   this.location.replaceState('articulo', queryStrings.join("&"));
  // }
}
