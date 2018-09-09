const TAG=`parseDate` ;
monthNames = [
  "Enero", "Febrero", "Marzo",
  "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre",
  "Octubre", "Noviembre", "Diciembre"
];

function getMonthName(monthNumber) {
  return monthNames[monthNumber];
}

function getShortMonthName(monthNumber) {
  return getMonthName(monthNumber).substr(0, 3);
}

let regex = require("./parseRegex");

function getMesAno(date) {
  let value = (typeof date === "string") ? parseDate(date) : date;
  return (`${getMonthName(value.getMonth() + 1)} ${value.getFullYear()}`);
}

function getFecha(date) {
  let value = (typeof date === "string") ? parseDate(date) : date;
  return (`${value.getDate()} ${getMonthName(value.getMonth() + 1)} ${value.getFullYear()}`);
}

function parseDate(string) {
  if (typeof string === "string") {
    let extraido = regex.extraerPosibleColumnaMultiple(string);
      extraido[2]=(parseInt(extraido[2])<100)?parseInt(extraido[2])+2000:extraido[2];
      console.log(TAG,`parseDate:`,extraido);
    return new Date(extraido[2], extraido[0] - 1, extraido[1]);
  } else {
    return string;
  }

}

module.exports = {
  getMesAno: getMesAno,
  parseDate: parseDate,
};
