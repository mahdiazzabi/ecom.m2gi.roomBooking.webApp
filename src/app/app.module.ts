import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RechercheLogementComponent } from './recherche-logement/recherche-logement.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
const appRoutes: Routes =[
  {path :'recherche' , component : RechercheLogementComponent},
  {path :'inscription' , component : InscriptionComponent},
  {path :'' , redirectTo:'/recherche' , pathMatch : 'full'},
  {path :'login' , component : LoginComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    RechercheLogementComponent,
    InscriptionComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
