import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriasListComponent } from './categorias/categorias-list/categorias-list.component';
import { CategoriasAbmComponent } from './categorias/categorias-abm/categorias-abm.component';
import { ArticulosListComponent } from './articulos/articulos-list/articulos-list.component';
import { ArticulosAbmComponent } from './articulos/articulos-abm/articulos-abm.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';
import { UsuariosAbmComponent } from './usuarios/usuarios-abm/usuarios-abm.component';
import { InicioDeSesionComponent } from './autenticacion/inicio-de-sesion/inicio-de-sesion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MenuComponent } from './menu/menu.component';
import { RatingComponent } from './utilidades/rating/rating.component';
import { CicloDeVidaComponent } from './ciclo-de-vida/ciclo-de-vida.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InputImgComponent } from './utilidades/input-img/input-img.component';
import { SelectorMultipleComponent } from './selector-multiple/selector-multiple.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AutorizadoComponent } from './seguridad/autorizado/autorizado.component';
import { CrearCuentaComponent } from './autenticacion/crear-cuenta/crear-cuenta.component';
import { SeguridadInterceptorService } from './seguridad/seguridad-interceptor.service';
import { SelectComponent } from './controles-genericos/select/select.component';
import { QuillModule } from 'ngx-quill';
import { GaleriaComponent } from './galeria/galeria.component';
@NgModule({
  declarations: [
    AppComponent,
    CategoriasListComponent,
    CategoriasAbmComponent,
    ArticulosListComponent,
    ArticulosAbmComponent,
    UsuariosListComponent,
    UsuariosAbmComponent,
    InicioDeSesionComponent,
    MenuComponent,
    RatingComponent,
    CicloDeVidaComponent,
    InputImgComponent,
    SelectorMultipleComponent,
    AutocompleteComponent,
    AutorizadoComponent,
    CrearCuentaComponent,
    SelectComponent,
    GaleriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    QuillModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SeguridadInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
