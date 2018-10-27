let express = require('express'),
  router = express.Router(),
  Estudiante = require('../controller/estudiantes');


router.get('/estudiantes/:id', Estudiante.findOne);
router.get('/estudiantes/', Estudiante.findAll);
//READ Obtener JSON de un estudiante especifico
router.get('/estudiantes/:banco', Estudiante. findAllByBanco);

//READ Obtener JSON de los estudiantes que han hecho pagos desde tal banco
router.get('/estudiantes/:ano/:mes', Estudiante.findAllByMonthYear);
//CREATE -- Añadir Nuevo estudiante a la DB
router.post('/estudiantes/new', Estudiante.create);
//UPDATE -- Actualizar Usuario
router.put('/estudiantes/:id/', Estudiante.update);
//DELETE - remueve a un estudiante y a sus pagos de la Db
router.delete('/estudiantes/:id/', Estudiante.delete);
//PAGOS

router.post('/estudiantes/:id/pago', Estudiante.crearPagoById);
//READ Obtener JSON de un pago especifico
router.get('/estudiantes/:id/pago/:pagoId', Pago.findOne);
