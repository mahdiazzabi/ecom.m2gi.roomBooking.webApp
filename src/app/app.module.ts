import { MbscModule, mobiscroll } from '@mobiscroll/angular-trial';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RechercheLogementComponent } from './recherche-logement/recherche-logement.component';
import { FormsModule } from '@angular/forms';
import { EspaceHoteComponent } from './espace-hote/espace-hote.component';
import { LogementsHoteComponent } from './logements-hote/logements-hote.component';
import { ProposerLogementsHoteComponent } from './proposer-logements-hote/proposer-logements-hote.component';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';


const appRoutes: Routes =[
  {path :'recherche' , component : RechercheLogementComponent},
  {path :'inscription' , component : InscriptionComponent},
  {path :'' , redirectTo:'/recherche' , pathMatch : 'full'},
  {path :'login' , component : LoginComponent},
  {path :'EspaceHote' , component : EspaceHoteComponent},
  {path :'ProposerLogement' , component : ProposerLogementsHoteComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    RechercheLogementComponent,
    EspaceHoteComponent,
    LogementsHoteComponent,
    ProposerLogementsHoteComponent,
    InscriptionComponent,
    LoginComponent
  ],
  imports: [ 
    MbscModule,
    BrowserModule, RouterModule.forRoot(appRoutes), FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
