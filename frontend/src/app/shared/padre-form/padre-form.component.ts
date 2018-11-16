import { Component, OnInit } from '@angular/core';
import {Padre} from './padre';
import {PadreService} from './padre.service'
@Component({
  selector: 'app-padre-form',
  templateUrl: './padre-form.component.html',
  // styleUrls: ['./padre-form.component.css']
})
export class PadreFormComponent implements OnInit {
  model:Padre;
  constructor(
  	private service:PadreService
	) { }
  ngOnInit() {
  	this.model=new Padre();
    
  }
  onSubmit(v):void {
  	this.service.post(v).subscribe();
    this.service.get()
      .subscribe(data=>console.log(data));

  		// .subscribe()
  }


}
