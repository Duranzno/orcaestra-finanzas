XLSX = require('xlsx');
var workbook = XLSX.readFile('./otherfiles/PlanillaPaola.xlsx');

var sheet = workbook.Sheets[workbook.SheetNames[0]];
rangeFirstCell = {c: 0, r: 0};
rangeLastCell = {c: 0, r: 10};
// var myRange={s:rangeFirstCell,e:rangeLastCell};
// myRange
var range = XLSX.utils.decode_range(sheet['!ref']);
range;
const eCol = {
  cEst: 0,
  cGrupo: 1,
  cInstr: 2,
  cBanco: 3,
  cDate: 4,
  cRef: 5,
  cMonto: 6,
};
// for (let rowNum=range.s.r;rowNum<=range.e.r;rowNum++){
let extraerFila;
rowNum, sheet;

function extraerFila(rowNum, sheet) {
  let pago = {
    banco: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cBanco})].v,
    referencia: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cRef})].v,
    fecha: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cDate})].v,
    monto: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cMonto})].v,
  };
  let estudiante = {
    nombre: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cEst})].v,
    apellido: 'REGEXP',
    email: 'x@x.com',
    tlf: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cGrupo})].v,
    grupo: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cGrupo})].v,
    instrumento: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cInstr})].v,
    pago: [],
  };
  console.log(pago);
  console.log(estudiante);
}
