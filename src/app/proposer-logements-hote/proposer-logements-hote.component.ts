
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccordionConfig } from 'ngx-bootstrap/accordion';
import {Logement} from '../../model/model.logement';
export function getAccordionConfig(): AccordionConfig {
    return Object.assign(new AccordionConfig(), { closeOthers: true });
}
declare var $:any;
@Component({
  selector: 'app-proposer-logements-hote',
  templateUrl: './proposer-logements-hote.component.html',
  styleUrls: ['./proposer-logements-hote.component.css'],
  providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }]
})
export class ProposerLogementsHoteComponent implements OnInit {

  myForm: FormGroup;
  log : Logement = new Logement();

  
constructor(private formBuilder: FormBuilder) { }

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


addLogement(log : Logement){
    console.log(log);
}

}

