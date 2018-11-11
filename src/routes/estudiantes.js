let express=require('express'),
  router=express.Router(),
  {sendOk,sendError,newPago,newEstudiante} =require('./help');
const addr="/api/estudiantes/",
  {Estudiante}=require('../models/');


router.get('/', async function(req, res) {
  try {
   sendOk(
     'GET' + addr,
     res,
     await Estudiante.find({}).populate({path: 'pagos'})
   )}
  catch (e) {sendError(addr,res,e)}
},);
//READ Obtener JSON de un estudiante especifico
router.get('/:id',async function(req, res) {
  const estId = req.params.id;
  let e=await Estudiante.findById(estId).populate('pagos');
  console.log(e);
  try {
    sendOk(
     ` GET ${addr}:id Se encontro al estudiante ${estId}`,
     res,
     e
   )
  }catch (e) {
    sendError(`${addr}:id No existe el estudiante ${estId}`,res,e)
  }
});

router.get('/:ano/:mes',async function(req, res) {
  const filtroMes = req.params.mes,
    filtroAno = req.params.ano;
  try {
    const estIdDelBanco = await Estudiante.aggregate([
      {$unwind: '$pagos'},
      {
        $lookup: {
          from: 'pagos',
          localField: 'pagos',
          foreignField: '_id',
          as: 'pagos',
        },
      },
      {$unwind: '$pagos'},
      {
        $project: {
          mes: {$month: '$pagos.fecha'},
          ano: {$year: '$pagos.fecha'},
        },
      },
      {
        $match: {
          mes: Number.parseInt(filtroMes),
          ano: Number.parseInt(filtroAno),
        },
      },
      {
        $group: {_id: null, array: {$push: '$_id'}},
      },
      {
        $project: {array: true, _id: false},
      },
    ]);
    const idArray = estIdDelBanco[0].array;
    let result=await Estudiante.find({_id: {$in: idArray}}).populate('pagos');
    sendOk(`GET ${addr}/:ano/:mes`,res,result)
  }
  catch (e) {sendError(`GET ${addr}/:ano/:mes`,res,e)}
});


//READ Obtener JSON de los estudiantes que han hecho pagos desde tal banco
router.get('/:banco', async function(req, res) {
  const banco = req.params.banco;
  try {
    sendOk(
      ` GET ${addr}:banco`,
      res,
      await Estudiante.aggregate([
        {$unwind: '$pagos'},
        {$lookup: {
            from: 'pagos',
            localField: 'pagos',
            foreignField: '_id',
            as: 'pagos',
          },
        },
        {$match: {'resultingStuff.banco': banco}},
      ]));
  }catch (e) {
    sendError(`${addr}:id No existe el estudiante ${estId}`,res,e)
  }
});

//CREATE -- Añadir Nuevo estudiante a la DB
router.post('/', async function(req, res) {
  let newData = newEstudiante(req);
  try {
    sendOk(
      `POST ${addr}`,
      res,
      await Estudiante.create(newData)
    )
  }
   catch (e) {
    sendError(`POST ${addr}`,res,e)
   }
});
//UPDATE -- Actualizar Usuario
router.put('/:id', async function(req,res) {
  const estId=req.params.id,
    newData= newEstudiante(req);
  try {
    sendOk(
      `PUT ${addr}/:id`,
      res,
      await     Estudiante.findByIdAndUpdate(estId, {$set: newData})
    )
  }
  catch (e) {
    sendError(`PUT ${addr}/:id`,res,e)
  }
});
// //DELETE - remueve a un estudiante y a sus pagos de la Db
router.delete('/:id', async function(req, res) {
  const estId = req.params.id;
  try{
    await Estudiante.eliminarById(estId);
    sendOk(
      `Se elimino el usuario ${estId}`,
      res
    )
  }
  catch (e) {sendError(`DELETE ${addr}/:id`,res,e)}
},);

router.post('/:id/pago', async function(req, res) {
  const estId = req.params.id,pagoNuevo = newPago(req);
  try{
    await  Estudiante.agregarPagoById(estId, pagoNuevo);
    sendOk(`POST ${addr}/:id/pago`,
     res)
  } catch (e) {sendError(`POST ${addr}/:id/pago`,res,e)}

});


module.exports = router;
