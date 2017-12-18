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
    { id_equip:'1', nom_equipement:'Produits de Base', checked:false},
    { id_equip:'2', nom_equipement:'Wifi', checked:false},
    { id_equip:'3', nom_equipement:'Télévision', checked:false},
    { id_equip:'4', nom_equipement:'Chauffage', checked:false},
    { id_equip:'5', nom_equipement:'Climatisation', checked:false}
  ]

myForm: FormGroup;
private currentUser : Client ;
newLogement: Logement ;x
savingErr: any = null;

liste_equipements:Equipement[];

liste_equip_after:Equipement[]=[{id_equip:1},
{id_equip:4}];




 constructor(private activatedRoute: ActivatedRoute,
             private router: Router,private logementService:LogementsServices,
             private clientService:ClientService,private formBuilder: FormBuilder,
             public equipement_service:EquipementService) {

  }



   selectedOptions() {
    return this.options
      .filter(opt => opt.checked)
      .map(opt => opt.id_equip);
  }

  Cheked(){
   this.selectedOptions();
   this.options = this.options.filter( x => x.checked == true);
  /*  for (let item of this.options) {
      this.liste_equip_after.push(new Equipement(parseInt(item.id_equip)));
    }*/
    console.log("test", this.options);
    console.log("test", this.liste_equip_after);
  }


  getEquipement(){
    this.equipement_service.getAllEquipement()
         .subscribe(data=>{this.liste_equipements=data;
             },err=>{console.log(err);})
      }

  onSaveLogement(dataForm){
    this.newLogement = {titre:dataForm.titre,nbt_voyageurs:dataForm.nbt_voyageurs,
                        nbr_chamber:dataForm.nbr_chamber,nbr_salle_bain:dataForm.nbr_salle_bain,
                        ville:dataForm.ville,code_postal:dataForm.code_postal,adresse:dataForm.adresse,
                        prix:dataForm.prix,description:dataForm.description,equipements:this.liste_equip_after,
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
        this.router.navigate(['/EspaceHote', {currentClient : this.currentUser  }]);
      }
    });

}

ngOnInit() {

  this.getEquipement();
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

}

