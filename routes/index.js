const ctrl_estudiante = require("../controller").estudiantes;
const ctrl_pago = require("../controller").pagos;

module.exports = (app) => {
  /* GET home page. */
  app.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
  });

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Ñapa Api!'
  }));
  //API
  // app.get(    "/api/estudiantes")    //INDEX index
  // app.get(    "/api/estudiante/nuevo",)//NEW show new estudiante form
  app.post("/api/estudiante", ctrl_estudiante.create)   // CREATE create estudiante
  // app.get(    "/api/estudiante/:id")//SHOW get info about specific estudiante
  // app.get(    "/api/estudiante/:id/edit")//EDIT show edit form for one estudiante
  // app.put(    "/api/estudiante/:id")//UPDATE a particular estudiante
  // app.delete( "/api/estudiante/:id")//DESTROY Delete one estudiante

  // app.get(    "/api/estudiante/:id/pagoss")//get pagoss from a specific estudiante
  // app.get(    "/api/estudiante/:id/pagos")//get info to make pagos
  // app.post(   "/api/estudiante/:id/pagos")//create pagos
  // app.get(    "/api/estudiante/:id/pagos/:pid/edit")//EDIT show edit form for one estudiante
  // app.put(    "/api/estudiante/:id/pagos/:pid/edit")//UPDATE a particular estudiante
  // app.delete( "/api/estudiante/:id/pagos/:pid")//DESTROY Delete one estudiante
};
