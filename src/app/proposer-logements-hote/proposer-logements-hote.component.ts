
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccordionConfig } from 'ngx-bootstrap/accordion';
import {Logement} from '../../model/model.logement';
import { ProposerLogementServices } from '../../services/ProposerLogement.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestOptions , Headers } from '@angular/http';
export function getAccordionConfig(): AccordionConfig {
    return Object.assign(new AccordionConfig(), { closeOthers: true });
}
declare var $:any;
@Component({
  selector: 'app-proposer-logements-hote',
  templateUrl: './proposer-logements-hote.component.html',
  styleUrls: ['./proposer-logements-hote.component.css'],
  providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }, ProposerLogementServices]
})
export class ProposerLogementsHoteComponent implements OnInit {

  myForm: FormGroup;

newLogement: Logement ;
savingErr: any = null;

 constructor(private activatedRoute: ActivatedRoute,
   private router: Router,private proposerlogementService:ProposerLogementServices,private formBuilder: FormBuilder) {

  }
  onSaveLogement(dataForm){
    this.newLogement = {titre:dataForm.titre,nbt_voyageurs:dataForm.nbt_voyageurs,nbr_chamber:dataForm.nbr_chamber,nbr_salle_bain:dataForm.nbr_salle_bain,ville:dataForm.ville,code_postal:dataForm.code_postal,adresse:dataForm.adresse,prix:dataForm.prix,description:dataForm.description};  
    this.proposerlogementService.addLogements(this.newLogement).subscribe(response => {
      if (response.err) {
        this.savingErr = response.err;
      } else {
        this.router.navigate(['/EspaceHote']);
      }
    });

}

ngOnInit() {
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

