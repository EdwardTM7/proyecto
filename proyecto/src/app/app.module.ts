import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';
import { InterpolacionComponent } from './interpolacion/interpolacion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { routing, appRoutingProviders } from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import { Router } from '@angular/router';



//componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    InterpolacionComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    routing,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'inicio',component:InicioComponent},
      {path:'perfil', component:PerfilComponent},
    ]),
    HttpClientModule

    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
