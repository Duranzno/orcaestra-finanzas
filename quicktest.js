const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/orcaestra';
const mongoose = require('mongoose');
const Estudiante = require('./app/models/estudiante');
const Pago = require('./app/models/pago');
const Bancos = require("./app/models/bancos");


mongoose.set('bufferCommands', false);
mongoose.connect(databaseUri, {useNewUrlParser: true,})
    .then(() => console.log(`Base de Datos Conectada`))
    .catch(err => console.log(`Error de Conexion de Base de Datos: ${err.message}`));
var seedDB = require("./app/seeds");
require('dotenv').config();
seedDB();


setTimeout(() => {

}, 1000);


function eliminarById(id) {
  Estudiante.findOne(
      {_id: id},
      function (err, est) {
        if (est != null) {

          Pago.create({
            banco: "%",
            referencia: '@',
            monto: '1.'
          }, (err, p) => {
            est.pagos.push(p);
            est.save();
          });

          pagos = est.pagos;
          console.log(`Se ha encontrado a ${est.nombre}`);
        }
        else {
          console.log("No se ha encontrado este estudiante")
        }
      })
      .catch((err) => console.log(err))
      .then((estudiante) => {
        if (estudiante != null) {
          if (estudiante.pagos != null) {
            Pago.remove({_id: {$in: estudiante.pagos}})
                .catch((err) => console.log(err))
                .then((pago) => {
                  console.log(`Se elimino el pago ${pago.referencia} `);
                });
          } else {
            console.log("No tenia Pagos")
          }
          Estudiante.remove({"_id": estudiante._id})
              .then(console.log(estudiante.nombre))
              .catch(err => console.log(err));
        }
      });

}

