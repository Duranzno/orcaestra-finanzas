import { Component, OnInit } from '@angular/core';
import {SbDate} from './sidebar.date'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  months:Array<SbDate>;
  constructor() { }

  ngOnInit() {
    this.months=SbDate.getMonthArray();
    // this.months=this.SbDate.getMonthArray();
  }
  select(month:SbDate){
    console.log(month?.url)
  }

}

