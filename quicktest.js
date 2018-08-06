const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/orcaestra', {userNewUrlParser: true}).catch((err) => console.log(err));
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {

  console.log('Connected');
  let PagoSchema = require("./db/models/pagos")(mongoose.Schema);
  let EstudianteSchema = require("./db/models/estudiante")(mongoose.Schema, PagoSchema);

  let Estudiante = mongoose.model('Estudiantes', EstudianteSchema);
  let Pago = mongoose.model('Pagos', PagoSchema);
  let pago1 = new Pago({
    banco: "Venezuela",
    referencia: "AAAA",
    monto: 1000,
  });
  let pago2 = new Pago({
    banco: "provincial",
    referencia: "BBBB",
    monto: 1000,
  });
  let alejandro = new Estudiante({
    nombre: 'Fernando',
    apellido: 'Duran',
    email: 'aledurax@gmail.com',
    numero: '04265919060',
    grupo: 'IMB',
    pagos: [pago1, pago2],
  });

  alejandro.save(function (err, ale) {
    if (err) return console.error(err);
    console.log("Guardado");
  })
});
