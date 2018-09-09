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
    tlf: '125',
  }, {
    nombre: 'Paola',
    apellido: 'Zorrilla',
    email: '-',
    grupo: 'Inicial',
    tlf: '125',
  }
];
const pagos = [{
  banco: "00Banesco",
  referencia: "125",
  monto: `69`,
  fecha: '2018-01-15'
}, {
  banco: "11Banco De Venezuela",
  referencia: "123",
  monto: '6868',
  fecha: '2018-02-15'
}, {
  banco: "22Banesco",
  referencia: "124",
  monto: '500',
  fecha: '2018-01-02',

}, {
  banco: "33Banco Fondo Comun",
  monto: '666',
  referencia: "126",
  fecha: '2018-03-02',
},
    {
        banco: "44Comun",
        monto: '666',
        referencia: "126",
        fecha: '2018-03-02',
    },
    {
        banco: "55Comun",
        monto: '666',
        referencia: "126",
        fecha: '2018-03-02',
    }];


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
    let paola=await Estudiante.crear(usr[0]);
    // paola.agregarPago(pagos[2])
    console.log(await Estudiante.crearPagoById(paola._id,pagos[5]))

}




