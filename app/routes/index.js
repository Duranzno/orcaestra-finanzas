const pago = require('../controller/pagos');
module.exports = (app) => {
  /* GET home page. */
  app.get('/', function (req, res, next) {
    console.log(req.body);
    console.log(res.body);
    console.log(next.body);


    res.render('../views/index');
  });
  //user routes
  // app.get('/students',students.index);
  // app.post('/students/new',students.create);
  app.post('/api/pago/nuevo', (req, res) => {
    console.log(req.body);
    res.send(req.body);
    pago.create()
  });

  app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
  }));
};
