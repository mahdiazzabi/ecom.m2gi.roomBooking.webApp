import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {InputTextareaModule, ButtonModule, SpinnerModule} from 'primeng/primeng';
import { AppComponent } from './app.component';
import { RechercheLogementComponent } from './recherche-logement/recherche-logement.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { EspaceHoteComponent } from './espace-hote/espace-hote.component';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { AccordionModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ImageUploadModule } from "angular2-image-upload";
import { ClientService } from '../services/client.service';
import { LogementsComponent } from './logements/logements.component';
import {HttpModule} from "@angular/http";
import { LogementsServices } from '../services/logements.service';
import { ProposerLogementsHoteComponent } from './proposer-logements-hote/proposer-logements-hote.component';
import { ManageAvailabilityComponent } from './manage-availability/manage-availability.component';
import { CalendrierService } from '../services/calendrier.service';
import { ComparateurComponent } from './comparateur/comparateur.component';
import { PanierComponent } from './panier/panier.component';
import { ReservationComponent } from './reservation/reservation.component';
import { DetailsLogementComponent } from './details-logement/details-logement.component';
import {AuthManager} from '../services/authManager';
import {AuthHoteManager} from '../services/authHoteManager';
import {EquipementService} from "../services/equipement.service";
import {AlertCenterModule} from "ng2-alert-center";
import {DialogModule} from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ImageServices} from "../services/image.service";
/*
import { TestimagesComponent } from './testimages/testimages.component';
import { FileUploadModule,FileSelectDirective } from 'ng2-file-upload';
import {UPLOAD_DIRECTIVES} from 'ng2-file-uploader/ng2-file-uploader';
*/


const appRoutes: Routes =[
  {path :'recherche' , component : RechercheLogementComponent},
  {path :'inscription' , component : InscriptionComponent},
  {path :'' , redirectTo:'/recherche' , pathMatch : 'full'},
  {path :'login' , component : LoginComponent},
  {path :'EspaceHote' , component : EspaceHoteComponent , canActivate : [AuthHoteManager]},
  {path:"logements", component:LogementsComponent},
  {path :'ProposerLogement' , component : ProposerLogementsHoteComponent},
  {path :'comparateur' , component : ComparateurComponent},
  {path :'panier' , component : PanierComponent},
  {path :'disponibilite' , component : ManageAvailabilityComponent},
  {path :'reservation' , component : ReservationComponent},
  {path :'disponibilite' , component : ManageAvailabilityComponent},
  {path:"detailsLogement", component : DetailsLogementComponent}


]
@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    RechercheLogementComponent,
    EspaceHoteComponent,
    ProposerLogementsHoteComponent,
    InscriptionComponent,
    LoginComponent,
    LogementsComponent,
    ManageAvailabilityComponent,
    ComparateurComponent,
    PanierComponent,
    DetailsLogementComponent,
    ReservationComponent
  ],
  imports: [
    AccordionModule.forRoot(), BsDatepickerModule.forRoot(), ImageUploadModule.forRoot(), InputTextareaModule, ButtonModule, SpinnerModule,
    BrowserModule, AccordionModule.forRoot(), ReactiveFormsModule, RouterModule.forRoot(appRoutes), FormsModule,HttpModule,AlertCenterModule,DialogModule
    ,BrowserAnimationsModule
  ],
  providers: [ClientService, LogementsServices, CalendrierService ,AuthManager , AuthHoteManager,EquipementService, ImageServices],
  bootstrap: [AppComponent]
})

export class AppModule { }
