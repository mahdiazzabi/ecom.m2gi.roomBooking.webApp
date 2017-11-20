import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { AccordionModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ImageUploadModule } from "angular2-image-upload";
import { InscriptionService } from '../services/inscription.service';
import { LoginService } from '../services/login.service';
import { LogementsComponent } from './logements/logements.component';
import {LogementsServices} from "../services/logements.service";
import {HttpModule} from "@angular/http";

const appRoutes: Routes =[
  {path :'recherche' , component : RechercheLogementComponent},
  {path :'inscription' , component : InscriptionComponent},
  {path :'' , redirectTo:'/recherche' , pathMatch : 'full'},
  {path :'login' , component : LoginComponent},
  {path :'EspaceHote' , component : EspaceHoteComponent},
  {path:"logements", component:LogementsComponent},
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
    LoginComponent,
    LogementsComponent,
  ],
  imports: [
    AccordionModule.forRoot(), BsDatepickerModule.forRoot(), ImageUploadModule.forRoot(), InputTextareaModule, ButtonModule, SpinnerModule,FileUploadModule,
    BrowserModule,  ImageUploadModule.forRoot(), AccordionModule.forRoot(), ReactiveFormsModule, RouterModule.forRoot(appRoutes), FormsModule,HttpModule
  ],
  providers: [InscriptionService,LoginService,LogementsServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
