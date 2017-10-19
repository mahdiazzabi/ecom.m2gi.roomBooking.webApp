import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InscriptionHoteComponent } from './inscription-hote/inscription-hote.component';
import { RechercheLogementComponent } from './recherche-logement/recherche-logement.component';
import { FormsModule } from '@angular/forms';
const appRoutes: Routes =[
  {path :'recherche' , component : RechercheLogementComponent},
  {path :'inscriptionHote' , component : InscriptionHoteComponent},
  {path :'' , redirectTo:'/recherche' , pathMatch : 'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    InscriptionHoteComponent,
    RechercheLogementComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
