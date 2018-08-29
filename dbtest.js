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
//var
const usr = [
  {
    nombre: 'Isabel Del Valle',
    apellido: 'Sierra Sotillo',
    email: '-',
    grupo: 'Inicial',
    tlf: '-',
    pagos: [],
  }, {
    nombre: 'Paola',
    apellido: 'Zorrilla',
    email: '-',
    grupo: 'Inicial',
    tlf: '-',
    pagos: [],
  }
];
const pagos = [{
  banco: "Banesco",
  referencia: "125",
  monto: '100',
  fecha: '2018-01-15'
}, {
  banco: "Banco De Venezuela",
  referencia: "123",
  monto: '100',
  fecha: '2018-02-15'
}, {
  banco: "Banesco",
  referencia: "124",
  monto: '200',
  fecha: '2018-01-02',

}, {
  banco: "Banco Fondo Comun",
  monto: '100',
  referencia: "125",
  fecha: '2018-03-02',
}];
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
  // const i=await Estudiante.crear(usr[0]),
  //     p=await Estudiante.crear(usr[1]),
  //     b1=await Estudiante.crearPagoById(i._id,pagos[0]),
  //     b2=await Estudiante.crearPagoById(p._id,pagos[2]),
  //     b3=await Estudiante.crearPagoById(i._id,pagos[1]),
  //     b4=await Estudiante.crearPagoById(p._id,pagos[3]);
  //


}




