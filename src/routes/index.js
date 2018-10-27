// var express = require('express'),
//   multer = require('multer'),
//   router = express.Router(),
//   Pago = require('../controller/pagos');
//   handleXLSX = require('../utils/excel/handleXLSX');
//
// //INDEX -- Mostrar Todos
// router.get('/', function(req, res) {
//   let bancos = require('../models/bancos');
//   let grupos = require('../models/grupos');
//   res.render('../views/index', {grupos: grupos, bancos: bancos});
// });
// //MULTER | EXCEL
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'app/public/uploads');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + '.xlsx');
//   },
// });
// var upload = multer({storage: storage});
// router.post('/uploadPaola', upload.single('planilla'), (req, res) => {
//   if (!req.file) {
//     console.log('No file received');
//     return res.send({
//       success: false,
//     });
//   } else {
//     console.log(`Received: ${req.file.filename}`);
//     // console.log(req);
//     handleXLSX.useSheetPaolaStyle(req.file.path);
//     return res.send({
//       success: true,
//     });
//   }
// });
// router.post('/uploadMarwan', upload.single('planilla'), (req, res) => {
//   if (!req.file) {
//     console.log('No file received');
//     return res.send({
//       success: false,
//     });
//   } else {
//     console.log(`Received: ${req.file.filename}`);
//     // handleXLSX.useSheetMarwanStyle(req.file.path);
//     return res.send({
//       success: true,
//     });
//   }
// });
//
// //ESTUDIANTE
// //READ Obtener todos los JSON
//
//
// //UPDATE
// router.put('/estudiante/:id/pago/:pagoId', Pago.update);
//
// //UPDATE
// router.put('/pago/:pagoId', (req, res) => {
//   console.log(TAG, `no implementado`);
//   res.send('no implementado');
// });
// //DELETE
// router.delete('/estudiante/:id/pago/:pagoId', Pago.delete);
// // router.post('*',(req,res)=>res.send("Wrong Post"));
// // router.get('*',(req,res)=>res.send("Wrong Get"));
// module.exports = router;
const MainRoutes=require("./excel"),
  PagosRoutes=require("./pagos"),
  EstudiantesRoutes="a",//require("./estudiantes"),
  PadresRoutes="b";//require("./padres");
module.exports={
  MainRoutes,
  PagosRoutes,
  EstudiantesRoutes,
  PadresRoutes
};
