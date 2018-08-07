'use strict';

const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost:27017/orcaestra', {useNewUrlParser: true}).catch((err) => console.log(err));
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {

  console.log('Conectado a MongoDB con Mongoose');
});
let PagoSchema = require("./pagos")(mongoose);
let EstudianteSchema = require("./estudiante")(mongoose, PagoSchema);

let Estudiante = mongoose.model('Estudiantes', EstudianteSchema);
let Pago = mongoose.model('Pagos', PagoSchema);
module.exports = {mongoose, Estudiante, Pago};

