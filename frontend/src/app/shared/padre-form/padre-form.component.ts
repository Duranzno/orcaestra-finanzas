import { Component, OnInit } from '@angular/core';
import {Padre} from './padre'
@Component({
  selector: 'app-padre-form',
  templateUrl: './padre-form.component.html',
  styleUrls: ['./padre-form.component.css']
})
export class PadreFormComponent implements OnInit {
  model=new Padre();
  constructor() { }

  ngOnInit() {
  }

}
