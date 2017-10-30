import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../model/model.client';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  @Input() newClient: Client ;
  constructor() {
    this.newClient = new Client() ;
   }

  ngOnInit() {
    
  }

  onSaveClient(dataForm){
    console.log(dataForm)
  }
}
