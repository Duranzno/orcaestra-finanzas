const XLSX = require('xlsx'),
    parseDate=require(`./app/utils/excel/parseDate`);
    excelUtils = require('./app/utils/excel/extractXLSXMarwan');
const TAG = `quicktest|`;

let workbook = XLSX.readFile('./otherfiles/PlanillaMarwan.xlsx');
var sheet = workbook.Sheets[workbook.SheetNames[0]];

// console.log(TAG,excelUtils.extraerEstudiante(sheet,1,{nombre:  6,  apellido:    7, grupo:   8}));
// excelUtils.extraerFila(sheet, 1);
let date =`05/06/2018`;
console.log(parseDate.parseDate(date))
