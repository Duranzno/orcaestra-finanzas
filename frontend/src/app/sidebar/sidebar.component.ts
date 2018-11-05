import { Component, OnInit } from '@angular/core';
import {sbDate} from './sidebar.date'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  months:Array<sbDate>;
  constructor() { }

  ngOnInit() {
    this.months=this.sbDate.getMonthArray();
  }

}

