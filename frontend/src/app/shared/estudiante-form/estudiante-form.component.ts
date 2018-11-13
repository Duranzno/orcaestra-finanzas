import { Component, OnInit } from '@angular/core';
import {Estudiante} from './estudiante';
import {Grupos} from '../grupos';
import {EstudianteService} from './estudiante.service';
@Component({
  selector: 'app-estudiante-form',
  templateUrl: './estudiante-form.component.html',
  // styleUrls: ['./estudiante-form.component.css'],
  providers:[EstudianteService],
})
export class EstudianteFormComponent implements OnInit {
  model:Estudiante;
  grupos:Array<string>=[];
  constructor(
  	private service:EstudianteService
	) { }
  ngOnInit() {
  	this.model=new Estudiante();
    this.grupos=Grupos;
  }
  onSubmit(v):void {
  	this.service.post(v).subscribe();
    this.service.get()
      .subscribe(data=>console.log(data));

  		// .subscribe()
  }

}
