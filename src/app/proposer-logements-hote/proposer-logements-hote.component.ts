import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccordionConfig } from 'ngx-bootstrap/accordion';
import {Logement} from '../../model/model.logement';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestOptions , Headers } from '@angular/http';
import { LogementsServices } from '../../services/logements.service';
import { Client } from '../../model/model.client';
import { ClientService } from '../../services/client.service';
import {Equipement} from "../../model/model.equipement";
import {EquipementService} from "../../services/equipement.service";
import {Alert, AlertCenterService, AlertType} from "ng2-alert-center";
import {FileHolder} from "angular2-image-upload";
import {ImageServices} from "../../services/image.service";
import {Image} from "../../model/model.image";
export function getAccordionConfig(): AccordionConfig {
    return Object.assign(new AccordionConfig(), { closeOthers: true });
}
declare var $:any;
@Component({
  selector: 'app-proposer-logements-hote',
  templateUrl: './proposer-logements-hote.component.html',
  styleUrls: ['./proposer-logements-hote.component.css'],
  providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }, LogementsServices]
})
export class ProposerLogementsHoteComponent implements OnInit {

  options = [
    { id_equip:1, nom_equipement:'Produits de Base', checked:false},
    { id_equip:2, nom_equipement:'Wifi', checked:false},
    { id_equip:3, nom_equipement:'Télévision', checked:false},
    { id_equip:4, nom_equipement:'Chauffage', checked:false},
    { id_equip:5, nom_equipement:'Climatisation', checked:false}
  ]



myForm: FormGroup;
private currentUser : Client ;
newLogement: Logement ;
savingErr: any = null;

liste_equipements:Equipement[];

image_path;

image:Image;

liste_equip_after:Equipement[]=[{id_equip:1},
{id_equip:4}];




 constructor(private activatedRoute: ActivatedRoute,
             private router: Router,private logementService:LogementsServices,
             private clientService:ClientService,private formBuilder: FormBuilder,
             public equipement_service:EquipementService,
             private servicealert:AlertCenterService,
             private imageservice:ImageServices) {

  }

  sendAnAlertProposrer(msg:string ) {
    const alert = Alert.create(AlertType.SUCCESS, msg, 2500 ,true);
    this.servicealert.alert(alert);
  }
    timeout() {
      setTimeout(() => {
        this.router.navigate(['/EspaceHote', {currentClient : this.currentUser  }]);
      }, 3000);
    }

   selectedOptions() {
    return this.options
      .filter(opt => opt.checked)
      .map(opt => opt.id_equip);
  }

  Cheked(){
   this.selectedOptions();

   let options_slected:any[] = this.options.filter( x => x.checked == true);

   for (let op of options_slected) {

     delete op.checked;
      if(this.liste_equipements)
        {
          this.liste_equipements.push(op);
        }else
          {
            this.liste_equipements = [op];
          }
     console.log("for",op);
    }

    console.log("test", this.options);
    console.log("test0001", this.liste_equipements);
  }


  getEquipement(){   // Returner les equipements depuis la base de données
    this.equipement_service.getAllEquipement()
         .subscribe(data=>{this.liste_equipements=data;
             },err=>{console.log(err);})
      }

  onSaveLogement(dataForm){

    this.Cheked();

    this.newLogement = {titre:dataForm.titre,nbt_voyageurs:dataForm.nbt_voyageurs,
                        nbr_chamber:dataForm.nbr_chamber,nbr_salle_bain:dataForm.nbr_salle_bain,
                        ville:dataForm.ville,code_postal:dataForm.code_postal,adresse:dataForm.adresse,
                        prix:dataForm.prix,description:dataForm.description,equipements:this.liste_equipements,
                        client: JSON.parse(sessionStorage.getItem("currentUser"))};

    this.logementService.addLogements(this.newLogement).subscribe(response => {
      if (response.err) {
        this.savingErr = response.err;
      } else {
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        this.currentUser.isHote = true ;
        this.clientService.update(this.currentUser).subscribe(response => {
            if (response.err) {
             this.savingErr = response.err;
            }else{
            sessionStorage.setItem("currentUser", JSON.stringify(response.client));
            }
        });

        this.image = {path:this.image_path,logement:response.logement};

        this.imageservice.InsertImagePah(this.image).subscribe(response => {
          if (response.err) {
            this.savingErr = response.err;
          } else {
            console.log("insetion reussi!!");
          }
        });

        this.sendAnAlertProposrer('<span class="glyphicon glyphicon-ok"></span> ' +
          '<strong>Bien enregistré</strong> <hr class="message-inner-separator"> ' +
          '<p>Merci bien de penser aux <b>Disponibilités</b> de votre logement</p>');

          this.timeout();

      }
    });

}

ngOnInit() {

  //this.getEquipement();
  console.log("liste de equips",this.liste_equipements);

  this.myForm = this.formBuilder.group({
      date: null,
      range: null
    });
  $(document).ready(function () {
    var navListItems = $('div.setup-panel div a'),
            allWells = $('.setup-content'),
            allNextBtn = $('.nextBtn'),
          allPrevBtn = $('.prevBtn');

    allWells.hide();

    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
                $item = $(this);

        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-primary').addClass('btn-default');
            $item.addClass('btn-primary');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });

    allPrevBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");

            prevStepWizard.removeAttr('disabled').trigger('click');
    });

    allNextBtn.click(function(){
        var curStep = $(this).closest(".setup-content"),
            curStepBtn = curStep.attr("id"),
            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='url']"),
            isValid = true;

        $(".form-group").removeClass("has-error");
        for(var i=0; i<curInputs.length; i++){
            if (!curInputs[i].validity.valid){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }

        if (isValid)
            nextStepWizard.removeAttr('disabled').trigger('click');
    });

    $('div.setup-panel div a.btn-primary').trigger('click');
  });
}

  onUploadFinished(file: FileHolder) {

    //let path  = file.serverResponse;

    this.image_path = file.file.name;

    console.log("path" , JSON.stringify(file.serverResponse));
  }

}

