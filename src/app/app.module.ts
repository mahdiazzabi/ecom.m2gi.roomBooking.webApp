import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InscriptionHoteComponent } from './inscription-hote/inscription-hote.component';
import { RechercheLogementComponent } from './recherche-logement/recherche-logement.component';
import { FormsModule } from '@angular/forms';
import { EspaceHoteComponent } from './espace-hote/espace-hote.component';
import { LogementsHoteComponent } from './logements-hote/logements-hote.component';
import { ProposerLogementsHoteComponent } from './proposer-logements-hote/proposer-logements-hote.component';
const appRoutes: Routes =[
  {path :'recherche' , component : RechercheLogementComponent},
  {path :'inscriptionHote' , component : InscriptionHoteComponent},
  {path :'' , redirectTo:'/recherche' , pathMatch : 'full'},
  {path :'EspaceHote' , component : EspaceHoteComponent},
  {path :'ProposerLogement' , component : ProposerLogementsHoteComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    InscriptionHoteComponent,
    RechercheLogementComponent,
    EspaceHoteComponent,
    LogementsHoteComponent,
    ProposerLogementsHoteComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
