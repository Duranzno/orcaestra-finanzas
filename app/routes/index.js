var express = require("express"),
    multer = require('multer'),
    router = express.Router(),
    Estudiante = require("../controller/estudiantes"),
    Pago = require("../controller/pagos");
handleXLSX = require("../utils/excel/handleXLSX");

//INDEX -- Mostrar Todos
router.get("/", function (req, res) {
  // console.log("bla");
  let bancos = require('../models/bancos');
  let grupos = require('../models/grupos');
  res.render("../views/index", {grupos: grupos, bancos: bancos});
});
//MULTER | EXCEL
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'app/public/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.xlsx')
  }
});
var upload = multer({storage: storage});
router.post('/', upload.single('planilla'), (req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log(`Received: ${req.file.filename}`);
    handleXLSX.useSheetPaolaStyle(req);
    return res.send({
      success: true
    })
  }
});


//ESTUDIANTE
//READ Obtener todos los JSON
router.get("/estudiantes/", Estudiante.findAll);
//READ Obtener JSON de un estudiante especifico
router.get("/estudiante/:id", Estudiante.findOne);
//CREATE -- Añadir Nuevo estudiante a la DB
router.post("/estudiante/new", Estudiante.create);
//UPDATE -- Actualizar Usuario
router.put("/estudiante/:id/", Estudiante.update);
//DELETE - remueve a un estudiante y a sus pagos de la Db
router.delete("/estudiante/:id/", Estudiante.delete);
//PAGOS

router.post('/estudiante/:id/pago', Estudiante.crearPagoById);
//READ Obtener JSON de un pago especifico
router.get('/estudiante/:id/pago/:pagoId', Pago.findOne);

//UPDATE
router.put('/estudiante/:id/pago/:pagoId', Pago.update);
//DELETE
router.delete('/estudiante/:id/pago/:pagoId', Pago.delete);
// router.post('*',(req,res)=>res.send("Wrong Post"));
// router.get('*',(req,res)=>res.send("Wrong Get"));
module.exports = router;






