import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap';
import {InputTextareaModule, ButtonModule, SpinnerModule, FileUploadModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import { RechercheLogementComponent } from './recherche-logement/recherche-logement.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { EspaceHoteComponent } from './espace-hote/espace-hote.component';
import { LogementsHoteComponent } from './logements-hote/logements-hote.component';
import { ProposerLogementsHoteComponent } from './proposer-logements-hote/proposer-logements-hote.component';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ImageUploadModule } from "angular2-image-upload";

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
    InputTextareaModule, ButtonModule, SpinnerModule,FileUploadModule,
    BrowserModule,  ImageUploadModule.forRoot(), AccordionModule.forRoot(), ReactiveFormsModule, RouterModule.forRoot(appRoutes), FormsModule, BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
