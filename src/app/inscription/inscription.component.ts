import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../model/model.client';

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
  saveClient(){
    console.log(this.newClient );
  }
}
