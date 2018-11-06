import { Component, OnInit } from '@angular/core';
import {PagoImpl, Bancos} from './pago';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pago-form',
  templateUrl: './pago-form.component.html',
  styleUrls: ['./pago-form.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]

})
export class PagoFormComponent implements OnInit {
  bancos:string[];
  model=new PagoImpl();
  today=new Date();
  constructor() { }

  ngOnInit() {
    this.bancos=Bancos;
  }
}
