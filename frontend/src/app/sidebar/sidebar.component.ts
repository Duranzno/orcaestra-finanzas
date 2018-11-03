import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

}

class DateModule {
  monthNames:[
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]

  public getDateTitle(date:Date|string):string {
    let value = (typeof date === 'string') 
                  ? new Date(date) 
                  : date;
    return `${value.getDate()} ${this.getMonthAndYear(value)}`;
  }
  
  public getURL(date:Date) {
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/';
  }

  public getMonthArray():Array<Date> {
    const date = new Date();
    let nMonth = date.getMonth();
    let nYear = date.getFullYear();
    let meses:Array<Date>;
    for (let i = 0; i < 12; i++) {
      meses.push(new Date(nYear - 1, i)); //AGREGO AL Array los meses del año pasado
    }
    for (let i = 0; i <= nMonth; i++) {
      meses.push(new Date(nYear, i)); //AGREGO AL Array los meses de este año hasta el actual
    }
    meses.pop(); //elimino el actual debido a que lo manejo no con su nombre sino con "Mes actual"
    return meses;
  }

  private getMonthAndYear(date:Date):string {
    let value = typeof date === 'string' ? new Date(date) : date;
    return `${this.getMonthName(value.getMonth())} ${value.getFullYear()}`;
  }

  private getMonthName(monthNumber:number):string {
    return this.monthNames[monthNumber];
  }
}