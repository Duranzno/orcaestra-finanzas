//Require
const XLSX = require('xlsx');
const mongoose = require('mongoose');
const Pago = require('./app/models/pago');
const Estudiante = require('./app/models/estudiante');
const regex = require('./app/utils/excel/parseRegex');
const excelUtils = require('./app/utils/excel/extractXLSX');
const fetch = require('node-fetch');
//Addreses
let workbook = XLSX.readFile('./otherfiles/PlanillaPaola.xlsx');
let sheet = workbook.Sheets[workbook.SheetNames[0]];

estID = '5b782c5760097114a8361963';

let est = {
  nombre: 'Victor ',
  apellido: 'Hugo',
  email: 'notiene@barquismieto.com.ve',
  grupo: 'Sin Determinar',
  tlf: '456456',
  pagos: [],
};
let pag = {
  banco: 'Banco de Venezuela',
  referencia: '0210147236',
  monto: '2000000'
};
const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/orcaestra';

//------------------------------------------------
mongoose.connect(databaseUri, {useNewUrlParser: true,})
    .then(() => {
      console.log(`Base de Datos Conectada`)
    })
    .catch(err => console.log(`Error de Conexion de Base de Datos: ${err.message}`))
    .then(p => {


      ejecutar();
    });

//CODIGO A EJECUTAR


async function ejecutar() {
  let estR;
  let pagoR;
  // let estudiante= await Estudiante.crearPorCedula(estR);
  // let pago      = await Estudiante.crearPagoById(estudiante._id,pagoR);
  // console.log(pago)

  // excelUtils.extraerFila(20,sheet);
  fetch('http://localhost:3000/estudiantes').then(data => data.json()).then(a => console.log(a))
  // let arturo=await Estudiante.crear(est);
  // console.log(arturo)
  // let pago=Estudiante.crearPagoById(arturo._id,pag).catch(err=>console.error(err));
}




