let express=require('express'),
  router=express.Router(),
  {sendOk,sendError} =require('./help');
const addr="/api/pagos/";
let Pago=require('../models/pago');
//Obtener pago directo

router.get('/:pagoid',async function(req, res){
  // sendOk("chevere",res,{referencia:123,"_id":id});
  await Pago.findById(req.params.pagoid, (err,pago)=>{
    if (err) sendError(res, err);
    sendOk("Enviado pago",res, pago)
  });
});
//Reemplazar directamente un pago
router.put('/:pagoId', async function (req, res) {
  try{
    let newData=req.body;
    newData._id=req.params.pagoId;
    console.log(newData);
    sendOk("Actualizado pago",res,await Pago.crear(newData))
  }
  catch (err) {
    console.error(err);
    sendError("Error actualizando pago",res, err);
  }
});

module.exports = router;


