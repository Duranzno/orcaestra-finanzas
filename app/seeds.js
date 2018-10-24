const mongoose = require('mongoose');
const Estudiantes = require('./models/estudiante');
const Pagos = require('./models/pago');
const Grupos = require('./models/grupos');
const Bancos = require('./models/bancos');
const dataEstudiantes = [
  {
    nombre: 'Alejandro',
    apellido: 'Duran',
    email: 'aledurax@gmail.com',
    tlf: '1',
    cedula: '214125',
    grupo: Grupos[Math.floor(Math.random() * Grupos.length)],
  },
  {
    nombre: 'Fernando',
    apellido: 'Duran',
    email: 'aledurax@gmail.com',
    tlf: '2',
    cedula: '214124',
    grupo: Grupos[Math.floor(Math.random() * Grupos.length)],
  },
  {
    nombre: 'Jose',
    apellido: 'Duran',
    email: 'aledurax@gmail.com',
    tlf: '3',
    cedula: '214121',
    grupo: Grupos[Math.floor(Math.random() * Grupos.length)],
  },
  {
    nombre: 'Yuli',
    apellido: 'Duran',
    email: 'aledurax@gmail.com',
    tlf: '4',
    cedula: '214134',
    grupo: Grupos[Math.floor(Math.random() * Grupos.length)],
  },
];

function seedDB() {
  mongoose.connection.dropCollection('pagos').then(function(listo) {
    if (listo) {
      console.log('removed Pagos!');
    }
  });
  mongoose.connection.dropCollection('estudiantes').then(function(done) {
    if (done) {
      console.log('removed Estudiantes!');
    }
  });

  dataEstudiantes.forEach(function(seedEstudiantes) {
    Estudiantes.create(seedEstudiantes, function(err, estudiante) {
      if (err) {
        console.log(err);
      } else {
        console.log(`Creado ${estudiante.nombre} | ${estudiante._id}`);

        // console.log(estudiante);
        //Crear un pago
        Pagos.create(
          {
            banco: Bancos[Math.floor(Math.random() * Bancos.length)],
            referencia: Math.floor(Math.random() * 1000 + 100).toString(),
            monto: Math.floor(Math.random() * 1000 + 100).toString(),
          },
          function(err, pago) {
            if (err) {
              console.log(err);
            } else {
              estudiante.pagos.push(pago);
              estudiante.save();
              console.log(`Creado pago en ${pago.banco} | ${pago._id}`);
              // console.log(pago);
            }
          }
        );
      }
    });
  });
  console.log('Finalizado');
}

module.exports = seedDB;
// module.exports = seedDB();
