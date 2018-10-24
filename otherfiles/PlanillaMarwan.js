XLSX = require('xlsx');
var workbook = XLSX.readFile('./otherfiles/PlanillaMarwan.xlsx');
var aoc = 'A1';

var sheet = workbook.Sheets[workbook.SheetNames[0]];
rangeFirstCell = {c: 0, r: 0};
rangeLastCell = {c: 0, r: 10};
// var myRange={s:rangeFirstCell,e:rangeLastCell};
// myRange
var range = XLSX.utils.decode_range(sheet['!ref']);
range;
const eCol = {
  cTimeStamp: 0,
  cNombreRep: 1,
  cApellRep: 2,
  cCedulaRep: 3,
  ctlfRep: 4,
  cCorreo: 5,
  //Estudiante  1
  cNombreEst1: 6,
  cApellEst1: 7,
  cGrupoEst1: 8,
  cNombreEst2: 9,
  cApellEst2: 10,
  cGrupoEst2: 11,
  cNombreEst3: 12,
  cApellEst3: 13,
  cGrupoEst3: 14,
  cBanco: 15,
  cDate: 16,
  cMonto: 17,
  cRef: 18,
};
// for (let rowNum=range.s.r;rowNum<=range.e.r;rowNum++){
let rowNum = 1;
let Pago = {
  banco: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cBanco})].v,
  referencia: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cRef})].v,
  fecha: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cDate})].v,
  monto: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cMonto})].v,
};
let Estudiante = {
  nombre: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cNombreEst1})].v,
  apellido: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cApellEst1})].v,
  email: 'x@x.com',
  grupo: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cGrupoEst1})].v,
  // instrumento:sheet[XLSX.utils.encode_cell({r:rowNum, c:eCol.cInstr})].v,
  pago: [],
};
Estudiante;
Pago;
// }
