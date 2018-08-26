const XLSX = require('xlsx'),
    excelUtils = require('./app/utils/excel/extractXLSXMarwan');
const TAG = `quicktest|`;

let workbook = XLSX.readFile('./otherfiles/PlanillaMarwan.xlsx');
var sheet = workbook.Sheets[workbook.SheetNames[0]];

// console.log(TAG,excelUtils.extraerEstudiante(sheet,1,{nombre:  6,  apellido:    7, grupo:   8}));
excelUtils.extraerFila(sheet, 1);
