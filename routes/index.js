const ctrl_estudiante = require("../controller").estudiantes;
const ctrl_pago = require("../controller").pagos;

module.exports = (app) => {
  /* GET home page. */
  app.get('/', function (req, res, next) {
    console.log("SUP");
    res.render('./../public/views/index.ejs');
  });


  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Ñapa Api!'
  }));

  app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
  }));
};
