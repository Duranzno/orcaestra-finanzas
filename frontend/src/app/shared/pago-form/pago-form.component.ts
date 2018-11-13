import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {PagoImpl, Bancos} from './pago';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-pago-form',
  templateUrl: './pago-form.component.html',
  // styleUrls: ['./pago-form.component.css'],
  viewProviders: [ 
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter},
    { provide: ControlContainer, useExisting: NgForm },
 ],
  // providers: [ ],
})
export class PagoFormComponent implements OnInit {
  bancos:string[];
  model=new PagoImpl();
  today=new Date();
  ngOnInit() {
    this.bancos=Bancos;
    this.model.banco = this.bancos[0];

  }
}
