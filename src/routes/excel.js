let express=require('express'),
  router=express.Router(),
  multer = require('multer'),
  handleXLSX = require('../utils/excel/handleXLSX');

//INDEX -- Mostrar Todos
router.get('/', function(req, res) {
  let bancos = require('../models/bancos');
  let grupos = require('../models/grupos');
  res.render('../views/index', {grupos: grupos, bancos: bancos});
});
//MULTER | EXCEL
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.xlsx');
  },
});
var upload = multer({storage: storage});
router.post('/uploadPaola', upload.single('planilla'), (req, res) => {
  if (!req.file) {
    console.log('No file received');
    return res.send({
      success: false,
    });
  } else {
    console.log(`Received: ${req.file.filename}`);
    // console.log(req);
    handleXLSX.useSheetPaolaStyle(req.file.path);
    return res.send({
      success: true,
    });
  }
});
router.post('/uploadMarwan', upload.single('planilla'), (req, res) => {
  if (!req.file) {
    console.log('No file received');
    return res.send({
      success: false,
    });
  } else {
    console.log(`Received: ${req.file.filename}`);
    // handleXLSX.useSheetMarwanStyle(req.file.path);
    return res.send({
      success: true,
    });
  }
});

module.exports = router;


