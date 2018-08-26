//Require
const XLSX = require('xlsx');
const mongoose = require('mongoose');
const Pago = require('./app/models/pago');
const Grupos = require('./app/models/grupos');
const Estudiante = require('./app/models/estudiante');
const regex = require('./app/utils/excel/parseRegex');
const excelUtils = require('./app/utils/excel/extractXLSX');
const fetch = require('node-fetch');
const dateUtils = require('./app/utils/excel/parseDate');
const TAG = "quicktest|";

//Addreses
let workbook = XLSX.readFile('./otherfiles/PlanillaPaola.xlsx');
let sheet = workbook.Sheets[workbook.SheetNames[0]];

const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/orcaestra';

//------------------------------------------------
mongoose.connect(databaseUri, {useNewUrlParser: true,})
    .then(() => {
      console.log(TAG, `Base de Datos Conectada`)
    })
    .catch(err => console.log(TAG, `Error de Conexion de Base de Datos: ${err.message}`))
    .then(p => {
      ejecutar();
    });

async function ejecutar() {

}




