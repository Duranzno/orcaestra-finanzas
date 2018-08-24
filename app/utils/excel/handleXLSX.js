const XLSX = require('xlsx');
const excelUtils = require('./extractXLSX');

module.exports.useSheetPaolaStyle = function (req) {
  let workbook = XLSX.readFile(internalPath);
  let sheet = workbook.Sheets[workbook.SheetNames[0]];
  excelUtils.extraerFila(20, sheet);
};
