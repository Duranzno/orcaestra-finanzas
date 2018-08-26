const XLSX = require('xlsx');
const excelUtils = require('./extractXLSX');
const excelUtilsM = require('./extractXLSXMarwan');


module.exports.useSheetPaolaStyle = function (internalPath) {
  let workbook = XLSX.readFile(internalPath);
  let sheet = workbook.Sheets[workbook.SheetNames[0]];
  excelUtils.extraerFila(sheet);
};
module.exports.useSheetMarwanStyle = function (internalPath) {
  let workbook = XLSX.readFile(internalPath);
  let sheet = workbook.Sheets[workbook.SheetNames[0]];
  excelUtilsM.extraerTodasFila(sheet);
};
