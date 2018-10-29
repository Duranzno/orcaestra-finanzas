const regex = require('./parseRegex');
const monthNames = [
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
let getMonthName=function (monthNumber){return monthNames[monthNumber]};

let getShortMonthName=function (monthNumber) {
  return getMonthName(monthNumber).substr(0, 3);
};

let getMesAno=function (date) {
  let value = (typeof date === 'string')? parseDate(date) : date;
  return `${getMonthName(value.getMonth())} ${value.getFullYear()}`;
};
let getFecha=function(date) {
  let value = typeof date === 'string' ? parseDate(date) : date;
  return `${value.getDate()} ${getMonthName(
    value.getMonth() + 1
  )} ${value.getFullYear()}`;
};

let parseDate=function (dateString) {
  //CONVIERTE MM/DD/YY a Objeto Date();
  if (typeof dateString === 'string') {
    let extraido = regex.extraerPosibleColumnaMultiple(dateString);
    extraido[2] =
      parseInt(extraido[2]) < 100 ? parseInt(extraido[2]) + 2000 : extraido[2];
    // console.log(`parseDate:`, extraido);
    return new Date(extraido[2], extraido[0] - 1, extraido[1]);
  } else {
    return dateString;
  }
};

module.exports = {
  getMesAno: getMesAno,
  parseDate: parseDate,
  getFecha:getFecha,
};
