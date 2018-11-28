class DateModule {
    constructor(){
      this.monthNames=[
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
        'Diciembre',
      ];
    }   
  
    getMonthName(monthNumber) {
      return this.monthNames[monthNumber];
    }
  
    getFecha(date) {
      let value = typeof date === 'string' ? new Date(date) : date;
      return `${value.getDate()} ${getMesAno(value)}`;
    }
  
    arrayMeses(date) {
      date = date ? date : new Date();
      let nMonth = date.getMonth();
      let nYear = date.getFullYear();
      let meses = [];
      for (let i = 0; i < 12; i++) {
        meses.push(new Date(nYear - 1, i)); //AGREGO AL Array los meses del año pasado
      }
      for (let i = 0; i <= nMonth; i++) {
        meses.push(new Date(nYear, i)); //AGREGO AL Array los meses de este año hasta el actual
      }
      meses.pop(); //elimino el actual debido a que lo manejo no con su nombre sino con "Mes actual"
      return meses;
    }
  
    getMesAno(date) {
      let value = typeof date === 'string' ? new Date(date) : date;
      return `${this.getMonthName(value.getMonth())} ${value.getFullYear()}`;
    }
  
    getAnoMesURL(date) {
      return +date.getFullYear() + '/' + (date.getMonth() + 1) + '/';
    }
  
    // return {
    //   getFecha: getFecha,
    //   arrayMeses: arrayMeses,
    //   getMesAno: getMesAno,
    //   getAnoMesURL: getAnoMesURL,
    //   // getMonthName:getMonthName,
    // };
  }