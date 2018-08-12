if (typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('Cuentas.csv');
var address_of_cell = 'A1'
// var desiredCell=sheet[address_of_cell]
// var desiredValue=(desiredCell?desiredCell.v:undefined)

var sheet = workbook.Sheets[workbook.SheetNames[0]]
// console.log(workbook.Props);
rangefirstCell = {c: 0, r: 0};
rangeLastCell = {c: 0, r: 10};
var myRange = {s: rangefirstCell, e: rangeLastCell};
console.log(myRange)
var range = XLSX.utils.decode_range(sheet['!ref']);
// console.log(range);
//console.log(XLSX.utils.encode_range(range));
// console.log(range.e.c);
// console.log(range.e.r);
const COL_DATE = {c: 0, r: 0};
const COL_REF = {c: 1, r: 0};
const COL_DESCR = {c: 2, r: 0};
const COL_DEB = {c: 3, r: 0};
const COL_CRE = {c: 4, r: 0};
const COL_TYPE = {c: 6, r: 0};

for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
  // Example: Get second cell in each row, i.e. Column "B"
  // for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
  const secondCell = sheet[XLSX.utils.encode_cell({r: rowNum, c: COL_CRE.c})];
  // NOTE: secondCell is undefined if it does not exist (i.e. if its empty)
  console.log(secondCell.v); // secondCell.v contains the value, i.e. string or number
  // }
}

// console.log(XLSX.utils.encode_cell[rangefirstCell]);

// var wb=XLSX.utils.book_new();
