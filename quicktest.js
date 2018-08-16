//Require
const mongoose = require('mongoose');
const Pago = require('/app/models/pago');
const Estudiante = require('/app/models/estudiante');
//Addreses
let estId = '5b70a08298de990454b7ff1c';
let pagId = '5b70a08298de990454b7ff20';
let estudiante = {
  nombre: 'Harry',
  apellido: 'Potter',
  grupo: 'Sin Determinar',
  tlf: '11111',
  email: 'harrypotter@gmail.com',
};
let pago = {
  banco: 'Delsur',
  referencia: '@@@',
  monto: '123'
};
//------------------------------------------------
mongoose.connect(databaseUri, {useNewUrlParser: true,})
    .then(() => console.log(`Base de Datos Conectada`))
    .catch(err => console.log(`Error de Conexion de Base de Datos: ${err.message}`));


function testPOSTpago(req) {

}





