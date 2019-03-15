const XLSX = require('xlsx');
const excelUtils = require('./extractXLSX');
const excelUtilsM = require('./extractXLSXMarwan');

module.exports.useSheetPaolaStyle = function (internalPath) {
  let workbook = XLSX.readFile(internalPath);
  for (var i = 0; i < workbook.SheetNames.length; ++i) {
    var sheet = workbook.Sheets[workbook.SheetNames[i]];
    excelUtils.extraerTodasFilas(sheet);

  }
};
module.exports.useSheetMarwanStyle = function (internalPath) {
  let workbook = XLSX.readFile(internalPath);
  for (var i = 0; i < workbook.SheetNames.length; ++i) {

    var sheet = workbook.Sheets[workbook.SheetNames[i]];
    excelUtilsM.extraerTodasFila(sheet);
  }
};
