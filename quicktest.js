const db = require("./db/models/index");
var Sequelize = db.Sequelize;
var sequelize = db.sequelize;
// var Sequelize = require('sequelize');

var env = process.env.NODE_ENV || 'development';
// var config    = require('./db/config.js')[env];
// var sequelize = new Sequelize(config.database, config.username, config.password, config)
var estudiante = require('./db/models/estudiante')(sequelize, Sequelize);
var pago = require('./db/models/pago')(sequelize, Sequelize);

// estudiante.hasMany(pago,{as:"Pagos"})

let est = estudiante.create({
  nombre: 'John',
  apellido: "Snow",
  proyecto: 'Winterfell',
}).then(estudiante => {
  console.log(estudiante.get("nombre") + " " + estudiante.get("apellido"));
});
// console.log(est.get("nombre")+" "+est.get("apellido"));
// pago.create({banco:"Venezuela",estudianteId:est.dataValues.id}).then(pago=>{
//     // console.log(pago.get("banco"))
// });
// estudiante.setPagos([])

estudiante.findAll({attributes: ['id', 'nombre', "apellido"]})
    .then(estudiantes => estudiantes.forEach((value) => {
          // console.log("ESTUDIANTE");
          // console.log(value.dataValues);
        })
    );
pago.findAll({attributes: ['id', "banco", "referencia", "estudianteId"]})
    .then(pagos => pagos.forEach((value) => {
          // console.log("PAGOS");
          // console.log(value.dataValues);
        })
    )
;

proyectos = [
  "Coro de Padres",
  "Inicial",
  "Alma llanera",
  "IMA",
  "IMB",
  "PMA",
  "PMB ",
  "Pre Infantil",
  "Infantil",
  "Pre Juvenil",
  "Juvenil"
];
