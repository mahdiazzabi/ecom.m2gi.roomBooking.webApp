import { Component, OnInit } from '@angular/core';
import { Hote } from '../../model/model.hote';

@Component({
  selector: 'app-inscription-hote',
  templateUrl: './inscription-hote.component.html',
  styleUrls: ['./inscription-hote.component.css']
})
export class InscriptionHoteComponent implements OnInit {
  newHote: Hote ;
  constructor() {
    this.newHote = new Hote() ;
   }

  ngOnInit() {
  }

  saveHote(){
    console.log(this.newHote );
  }
}
