let express=require('express'),
  router=express.Router(),
  {sendOk,sendError} =require('./help');

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
router.put('/:pagoId', async (req, res) => {
  try{
    const newData=req.body;
    newData._id=req.params.id;
    sendOk("Actualizado pago",res,await Pago.crear(newData))
  }
  catch (e) {
    sendError("Error actualizando pago",res, err);
  }
});

module.exports = router;


