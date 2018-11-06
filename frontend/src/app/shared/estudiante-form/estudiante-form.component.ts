import { Component, OnInit } from '@angular/core';
import {Estudiante} from './estudiante';
import {Grupos} from '../grupos'
@Component({
  selector: 'app-estudiante-form',
  templateUrl: './estudiante-form.component.html',
  styleUrls: ['./estudiante-form.component.css']
})
export class EstudianteFormComponent implements OnInit {
  model=new Estudiante();
  grupos=[];
  constructor() { }

  ngOnInit() {
    this.grupos=Grupos;
  }

}
