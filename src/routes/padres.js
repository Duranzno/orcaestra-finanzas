let express = require('express'),
  router = express.Router(),
  { sendOk, sendError, newPago, newEstudiante, newPadre } = require('./help');
const addr = "/api/padres",
  { Padre, Estudiante } = require('../models/');

router.get('/', async function (req, res) {
  try {
    sendOk(
      `GET ${addr}/`,
      res,
      await Padre.find({}).populate({ path: 'pagos hijos' })
    )
  } catch (e) { sendError(`GET ${addr}/`, res, e) }
});
//READ Obtener JSON de un Padre especifico
router.get('/:id', async function (req, res) {
  const padId = req.params.id;
  try {
    sendOk(
      ` GET ${addr}:id Se encontro al Padre ${padId}`,
      res,
      await Padre.findOne({ _id: padId }).populate({ path: 'pagos hijos' })
    )
  } catch (e) {
    sendError(`${addr}:id No existe el estudiante ${padId}`, res, e)
  }
});

router.get('/:ano/:mes', async function (req, res) {
  const filtroMes = req.params.mes,
    filtroAno = req.params.ano;
  try {
    const estIdDelBanco = await Padre.aggregate([
      { $unwind: '$pagos' },
      {
        $lookup: {
          from: 'pagos',
          localField: 'pagos',
          foreignField: '_id',
          as: 'pagos',
        },
      },
      { $unwind: '$pagos' },
      {
        $project: {
          mes: { $month: '$pagos.fecha' },
          ano: { $year: '$pagos.fecha' },
        },
      },
      {
        $match: {
          mes: Number.parseInt(filtroMes),
          ano: Number.parseInt(filtroAno),
        },
      },
      {
        $group: { _id: null, array: { $push: '$_id' } },
      },
      {
        $project: { array: true, _id: false },
      },
    ]);
    if (!Array.isArray(estIdDelBanco) || !estIdDelBanco.length) {
      sendOk(`GET ${addr}/:ano/:mes`, res, {})
    } else {
      let idArray = estIdDelBanco[0].array;
      let result = await Padre.find({ _id: { $in: idArray } }).populate('pagos');

      sendOk(`GET ${addr}/:ano/:mes`, res, result)
    }

  }
  catch (e) { sendError(`GET ${addr}/:ano/:mes`, res, e) }
});

//CREATE -- Añadir Nuevo Padre a la DB
router.post('/', async function (req, res) {
  let newData = newPadre(req);
  try {
    sendOk(
      `POST ${addr}`,
      res,
      await Padre.create(newData)
    )
  }
  catch (e) {
    sendError(`POST ${addr}`, res, e)
  }
});

//UPDATE -- Actualizar Padre
router.put('/:id', async function (req, res) {
  const padId = req.params.id,
    newData = newPadre(req);
  try {
    sendOk(
      `PUT ${addr}/:id`,
      res,
      await Padre.findByIdAndUpdate(padId, { $set: newData })
    )
  }
  catch (e) {
    sendError(`PUT ${addr}/:id`, res, e)
  }
});

//DELETE - remueve a un Padre y a sus pagos de la Db
router.delete('/:id', async function (req, res) {
  const padId = req.params.id;
  try {
    await Padre.eliminar(padId);
    sendOk(
      `Se elimino el usuario ${padId}`,
      res
    )
  }
  catch (e) { sendError(`DELETE ${addr}/:id`, res, e) }
});
//PAGOS
router.post('/:id/pago', async function (req, res) {
  const padId = req.params.id, pagoNuevo = newPago(req);
  try {
    let pad = await Padre.findById(padId);
    await pad.agregarPago(pagoNuevo);
    sendOk(`POST ${addr}/:id/pago`,
      res)
  } catch (e) { sendError(`POST ${addr}/:id/pago`, res, e) }

});
router.delete('/:id/pago/:pagoId', async function (req, res) {
  const padId = req.params.id, pagoNuevo = newPago(req);
  const pagoId = req.params.pagoId || pagoNuevo._id;
  // console.log('estId',JSON.stringify(padId));
  // console.log('pagoId',JSON.stringify(pagoId));
  // console.log('pagoNuevo',JSON.stringify(pagoNuevo));
  if (typeof pagoNuevo._id == "undefined") { pagoNuevo._id = pagoId }
  try {
    let pad = await Padre.findById(padId);
    await pad.quitarPago(pagoNuevo);
    sendOk(`DELETE ${addr}:id/pago`,
      res)
  } catch (e) { sendError(`POST ${addr}/:id/pago`, res, e) }

});
//HIJOS
router.post('/:id/hijo', async function (req, res) {
  const padId = req.params.id, hijoNuevo = newEstudiante(req);
  try {
    let pad = await Padre.findById(padId);
    await pad.agregarHijo(hijoNuevo);
    sendOk(`POST ${addr}/:id/hijo`,
      res)
  } catch (e) { sendError(`POST ${addr}/:id/hijo`, res, e) }
});
router.get('/:id/:secId/:pagoId/pago', async function (req, res) {
  const padId = req.params.id,
    recibId = req.params.secId,
    pagoId = req.params.pagoId;
  try {
    await Padre.transferirPago(padId, recibId, pagoId);
    sendOk(`GET ${addr}/:id/:recibId/:pagoId/pago`,
      res)
  } catch (e) { sendError(`GET ${addr}/:id/:recibId/:pagoId/pago`, res, e) }
});

router.get('/:id/:secId/:hijoId/hijo', async function (req, res) {
  const padId = req.params.id,
    recibId = req.params.secId,
    hijoId = req.params.hijoId;
  try {
    await Padre.transferirHijo(padId, recibId, hijoId);
    sendOk(`GET ${addr}/:id/:recibId/:hijoId/hijo`,
      res)
  } catch (e) { sendError(`GET ${addr}/:id/:recibId/:hijoId/hijo`, res, e) }
});

router.delete('/:id/pago/:hijoId', async function (req, res) {
  const padId = req.params.id;
  const hijoId = req.params.hijoId;
  // console.log('estId',JSON.stringify(padId));
  // console.log('pagoId',JSON.stringify(pagoId));
  // console.log('pagoNuevo',JSON.stringify(pagoNuevo));
  try {
    let pad = await Padre.findById(padId);
    let hijo = await Estudiante.findById(hijoID);
    await pad.quitarHijo(hijo);
    sendOk(`DELETE ${addr}:id/hijo`,
      res)
  } catch (e) { sendError(`POST ${addr}/:id/pago`, res, e) }

});

module.exports = router;



