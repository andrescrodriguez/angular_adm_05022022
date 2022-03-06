import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosAbmComponent } from './articulos/articulos-abm/articulos-abm.component';
import { ArticulosListComponent } from './articulos/articulos-list/articulos-list.component';
import { CrearCuentaComponent } from './autenticacion/crear-cuenta/crear-cuenta.component';
import { InicioDeSesionComponent } from './autenticacion/inicio-de-sesion/inicio-de-sesion.component';
import { CategoriasAbmComponent } from './categorias/categorias-abm/categorias-abm.component';
import { CategoriasListComponent } from './categorias/categorias-list/categorias-list.component';
import { EsAdminGuard } from './es-admin.guard';
import { GaleriaComponent } from './galeria/galeria.component';
import { UsuariosAbmComponent } from './usuarios/usuarios-abm/usuarios-abm.component';
import { UsuariosListComponent } from './usuarios/usuarios-list/usuarios-list.component';

const routes: Routes = [
  { path:'articulos', component: ArticulosListComponent, canActivate: [EsAdminGuard] },
  { path: 'articulo/:cryptoid', component: ArticulosAbmComponent, canActivate: [EsAdminGuard] },
  { path: 'articulo', component: ArticulosAbmComponent, canActivate: [EsAdminGuard] },
  { path: 'categorias', component: CategoriasListComponent, canActivate: [EsAdminGuard] },
  { path: 'categoria/:cryptoid', component: CategoriasAbmComponent, canActivate: [EsAdminGuard] },
  { path: 'categoria', component: CategoriasAbmComponent, canActivate: [EsAdminGuard] },
  { path: 'usuarios', component: UsuariosListComponent, canActivate: [EsAdminGuard] },
  { path: 'usuario/:cryptoid', component: UsuariosAbmComponent, canActivate: [EsAdminGuard] },
  { path: 'galeria', component: GaleriaComponent, canActivate: [EsAdminGuard] },
  { path: 'inicio-de-sesion', component: InicioDeSesionComponent },
  { path: 'crear-cuenta', component: CrearCuentaComponent, canActivate: [EsAdminGuard] },
  { path: '**', redirectTo: '', canActivate: [EsAdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
