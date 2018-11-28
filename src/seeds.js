const mongoose = require('mongoose');
const Estudiantes = require('./models/estudiante');
const Pagos = require('./models/pago');
const Grupos = require('./models/grupos');
const Bancos = require('./models/bancos');
const Padre = require('./models/padre');
const util = require('../test/utils');


const randLen=4;
function rand(rand){
  if(typeof Array.isArray(rand)){
    return rand[Math.floor(Math.random() * rand.length)]
  }
  else{
    return (typeof rand==="undefined")
        ?Math.floor(Math.random() * randLen)
        :Math.floor(Math.random() * rand)
  }  
}
async function seedDB() {
  mongoose.connection.dropCollection('pagos').then(function(listo) {
    if (listo) {
      console.log('seedDB | removed Pagos!');
    }
  });
  mongoose.connection.dropCollection('estudiantes').then(function(done) {
    if (done) {
      console.log('seedDB | removed Estudiantes!');
    }
  });
  mongoose.connection.dropCollection('padres').then(function(done) {
    if (done) {
      console.log('seedDB | removed padres!');
    }
  });
  
  for(let i=0;i<randLen;i++){
    try {
      let p= await Padre.crear(util.getMockPadre())
      console.log(`seedDB | Creado Padre ${p.nombre} ${p.apellido}`);
      let h=await p.agregarHijo(util.getMockStudent());
      console.log(`seedDB | Creado hijo ${h.nombre} de ${p.nombre}`);
      let pa=await p.agregarPago(util.getMockPago());
      console.log(`seedDB | Creado pago ${pa.banco} de ${p.nombre}`);
    }
    catch(e){
      console.error(e)
    }
  }
  // dataEstudiantes.forEach(function(seedEstudiantes) {
  //   Estudiantes.create(seedEstudiantes, function(err, estudiante) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(`Creado ${estudiante.nombre} | ${estudiante._id}`);

  //       // console.log(estudiante);
  //       //Crear un pago
  //       Pagos.create(
  //         {
  //           banco: Bancos[Math.floor(Math.random() * Bancos.length)],
  //           referencia: Math.floor(Math.random() * 1000 + 100).toString(),
  //           monto: Math.floor(Math.random() * 1000 + 100).toString(),
  //         },
  //         function(err, pago) {
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             estudiante.pagos.push(pago);
  //             estudiante.save();
  //             console.log(`Creado pago en ${pago.banco} | ${pago._id}`);
  //             // console.log(pago);
  //           }
  //         }
  //       );
  //     }
  //   });
  // });
  console.log('seedDB | Finalizado');
}

module.exports = seedDB;
// module.exports = seedDB();
