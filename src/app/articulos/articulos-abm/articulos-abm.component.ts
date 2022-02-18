import { Location } from '@angular/common';
import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from 'src/app/categorias/categorias.service';
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

  constructor(private formBuilder: FormBuilder, 
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoriasService: CategoriasService,
    private articulosService: ArticulosService) { }

  formGroup: FormGroup;
  errores: string[];
  // categorias: [];
  // contenidoMarkDown: string;

  // categoriasNoSeleccionadas: multipleSelectorModel[] = 
  // [
  //   {llave: 1, valor: 'Peliculas'},
  //   {llave: 2, valor: 'Series'},
  //   {llave: 3, valor: 'Teatro'},
  //   {llave: 4, valor: 'Cine'},
  //   {llave: 5, valor: 'Parque'},
  //   {llave: 6, valor: 'Caminatas'}
  // ];
  // categoriasSeleccionadas: multipleSelectorModel[] = 
  // [
  //   {llave: 7, valor: 'Peliculas Online'}
  // ];

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
      Foto: '',
      IdCategoria: ['', Validators.required]
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
        n.forEach(element => {
          const categoria: KeyValue = { 
            key: element.id.toString(), 
            value: element.nombre.trim() 
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
          
          this.formGroup.patchValue({
            Titulo:  n.titulo,
            PreLectura: n.preLectura,
            Contenido: n.contenido,
            NombreDeRuta: n.nombreDeRuta,
            FechaHoraPublicacion: n.fechaHoraPublicacion,
            idImagen: '',
            IdCategoria: n.idCategoria.toString()
          })

          // desplegable de categorías
          this.idCategoriaSelected = n.idCategoria.toString();

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

    console.log(this.formGroup.value);

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

  
  // guardar(): void {
  //   if (this.encontrarControlesInvalidos()){
  //     return;
  //   }

  //   //generar un arreglo con los items seleccionados de la lista de selector multiple
  //   const idsArr = this.categoriasSeleccionadas.map(x => x.llave);
  //   console.log(idsArr);

  //   // con esta propiedad accedo a todos los valores del formulario
  //   console.log(this.formGroup.value);
  // }

  // private leerValoresURL(){
  //   this.activatedRoute.queryParams.subscribe(params => {

  //     var objeto: any = {};

  //     if(params.titulo){
  //       objeto.Titulo = params.titulo;
  //     }

  //     this.formGroup.patchValue(objeto);

  //   });
  // }

 

  imagenSeleccionada(imagen){
    this.formGroup.get('idImagen').setValue(imagen.id.toString());
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
