export const monthNames=[
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
];

export class sbDate{
    public name:string;
    public url:string;
    
    constructor(
        private date:Date=new Date()
        ){
            this.name=this.getMonthAndYear(date);
            this.url=this.getURL(date);
        }
    
    private getMonthAndYear(date:Date):string {
        return `${this.getMonthName(date.getMonth())} ${date.getFullYear()}`;
    }

    private getMonthName(monthNumber:number):string {
        return monthNames[monthNumber];
    }

    private getURL(date:Date):string {
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/';
    }
    
    
    static getMonthArray():Array<sbDate> {
      let meses: sbDate[] = [];
      let date = new Date();
      let nMonth = date.getMonth();
      let nYear = date.getFullYear();
      for (let i = 0; i < 12; i++) {
        meses.push(new sbDate(new Date(nYear - 1, i))); //AGREGO AL Array los meses del año pasado
      }
      for (let i = 0; i <= nMonth; i++) {
        meses.push(new sbDate(new Date(nYear, i))); //AGREGO AL Array los meses de este año hasta el actual
      }
      meses=meses.reverse();
      return meses;
  }

}