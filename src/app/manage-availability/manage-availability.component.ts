import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { Logement } from '../../model/model.logement';
import { CalendrierService } from '../../services/calendrier.service';
import { Calendrier } from '../../model/model.Calendrier';

@Component({
  selector: 'app-manage-availability',
  templateUrl: './manage-availability.component.html',
  styleUrls: ['./manage-availability.component.css']
})
export class ManageAvailabilityComponent implements OnInit {
  savingErr: any;
  public date = moment();
  public dateForm: FormGroup;
  calenderToadd :Calendrier;
  currentLogement : Logement ;
  public listCalenderLogement : Calendrier[] ;
  public daysArr;
  constructor(private fb: FormBuilder  , private calendrierService : CalendrierService,private router: Router , private route: ActivatedRoute) {
    this.currentLogement = JSON.parse(localStorage.getItem('currentLogement'));
    console.log(this.currentLogement);
    this.initDateRange();
  }

  public initDateRange() {
    return (this.dateForm = this.fb.group({
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required]
    }));
  }

  public ngOnInit() {
    this.listCalenderLogement = new Array();
    this.calendrierService.get_CalendrierLogement(this.currentLogement.id_logement).subscribe(response => {
      if (response.err) {
        this.savingErr = response.err;
        //TODO : afficher le msg d'erreur
      } else {
        this.listCalenderLogement = response.listCalendrier ;
      }
    });

    this.daysArr = this.createCalendar(this.date);
    //initListCalender
  }

  public createCalendar(month) {
    let firstDay = moment(month).startOf('M');
    let days = Array.apply(null, { length: month.daysInMonth() })
      .map(Number.call, Number)
      .map(n => {
        return moment(firstDay).add(n, 'd');
      });

    for (let n = 0; n < firstDay.weekday(); n++) {
      days.unshift(null);
    }
    return days;
  }

  public nextMonth() {
    this.date.add(1, 'M');
    this.daysArr = this.createCalendar(this.date);
  }

  public previousMonth() {
    this.date.subtract(1, 'M');
    this.daysArr = this.createCalendar(this.date);
  }

  public todayCheck(day) {
    if (!day) {
      return false;
    }
    return moment().format('L') === day.format('L');
  }

  public reserve() {
    if (!this.dateForm.valid) {
      return;
    }
    let dateFromMoment = this.dateForm.value.dateFrom;
    let dateToMoment = this.dateForm.value.dateTo;
    this.calenderToadd = {date_debut:new Date(dateFromMoment) , date_fin:new Date(dateToMoment), logement:this.currentLogement};
    this.calendrierService.addInDispo(this.calenderToadd).subscribe(response => {
      if (response.err) {
        this.savingErr = response.err;
      } else {
        this.calenderToadd = response.calendrier ;
        this.listCalenderLogement.push(this.calenderToadd);
      }
    });
  }

  public isReserved(day) {
    
   
    if (this.listCalenderLogement) {
      
            for (var index = 0; index < this.listCalenderLogement.length; index++) {
              var element = this.listCalenderLogement[index];
              if ( moment(new Date(element.date_debut)).isSameOrBefore(day) && moment(new Date(element.date_fin)).isSameOrAfter(day)) {
                return true ;
              
              } ;
            }
          } 
    
  }

  public isSelected(day) {
   
    let dateFromMoment = moment(this.dateForm.value.dateFrom, 'MM/DD/YYYY');
    let dateToMoment = moment(this.dateForm.value.dateTo, 'MM/DD/YYYY');
    if (this.dateForm.valid) {
      return (
        dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)
      );
    }
    if (this.dateForm.get('dateFrom').valid) {
      return dateFromMoment.isSame(day);
    }
  }

  public selectedDate(day) {
    let dayFormatted = day.format('MM/DD/YYYY');
    if (this.dateForm.valid) {
      this.dateForm.setValue({ dateFrom: null, dateTo: null });
      return;
    }
    if (!this.dateForm.get('dateFrom').value) {
      this.dateForm.get('dateFrom').patchValue(dayFormatted);
    } else {
      this.dateForm.get('dateTo').patchValue(dayFormatted);
    }
}

}
