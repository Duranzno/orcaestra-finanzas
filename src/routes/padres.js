let express=require('express'),
  router=express.Router(),
  {sendOk,sendError,newPago,newEstudiante}=require('./help');
const addr="/api/padres",
  {Padre}=require('../models/');

router.get('/',async function(req,res) {
  try{
    sendOk(
      `GET ${addr}/`,
      res,
      await Padre.find({}).populate({path: 'pagos hijos'})
    )
  } catch (e) {sendError(`GET ${addr}/`, res, e) }
});
module.exports = router;



