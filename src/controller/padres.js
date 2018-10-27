const Padre = require('../models/padre'),
  Estudiante = require(`./src/models/estudiante`),
  Pago = require(`./src/models/pago`);

const {sendOk, sendError} = require('./help');

//READ Obtener todos los JSON
exports.findAll = function(req, res) {
  Padre.find({})
    .populate({
      path: 'hijos', //! Populate hijos AND pagos
    })
    .exec(function(err, todosPadres) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.status(200).json(todosPadres);
      }
    });
  // }
};
exports.findAllByBanco = function(req, res) {
  const banco = req.params.banco;
  Padre.aggregate([
    // {"$match": {"nombre": "Paola"}},
    {$unwind: '$pagos'},
    {
      $lookup: {
        from: 'pagos',
        localField: 'pagos',
        foreignField: '_id',
        as: 'pagos',
      },
    },
    {$match: {'resultingStuff.banco': banco}},
  ]).exec(function(err, todosPadres) {
    if (err) {
      console.log(err);
      // res.send(err)
    } else {
      console.log(
        `JSON con padres que hecho pagos desde el banco:${req.banco}`
      );
      res.status(200).json(todosPadres);
    }
  });
  // }
};

// exports.findAllByMonthYear = async function (req, res) {
//   let filtroMes = req.params.mes,
//       filtroAno = req.params.ano;

//   const estIdDelBanco = await Padre
//       .aggregate([
//         {"$unwind": "$pagos"},
//         {
//           "$lookup": {
//             "from": "pagos",
//             "localField": "pagos",
//             "foreignField": "_id",
//             "as": "pagos"
//           }
//         },
//         {"$unwind": "$pagos"},
//         {
//           "$project":
//               {
//                 "mes": {$month: "$pagos.fecha"},
//                 "ano": {$year: "$pagos.fecha"},
//               }
//         },
//         {
//           "$match":
//               {
//                 "mes": Number.parseInt(filtroMes),
//                 "ano": Number.parseInt(filtroAno),
//               }
//         },
//         {
//           $group: {_id: null, array: {$push: "$_id"}}
//         },
//         {
//           $project: {array: true, _id: false}
//         }

//       ]);
//   if(typeof estIdDelBanco[0]===`undefined`){
//       console.log(TAG,`No existen padres del mes:${filtroMes} del ${filtroAno}` );
//       res.json([{
//           nombre:``,
//           apellido:``,
//           email:``,
//           grupo:``,
//           tlf:``,
//       }]);
//   }
//   else {
//       const idArray = estIdDelBanco[0].array;
//       Padre.find({"_id": {"$in": idArray}})
//           .populate('pagos')
//           .exec(function (err, todosPadres) {
//               if (err) {
//                   console.log(err);
//                   res.send(err)
//               }
//               else {
//                   console.log(TAG,`Suministrados padres del ${filtroMes}/${filtroAno}`);
//                   res.status(200).json(todosPadres);
//               }
//           })
//   }

// };

//READ Obtener JSON de un padre especifico
exports.findOne = function(req, res) {
  const padId = req.params.id;
  const errMsg = `No existe el padre ${padId}`;
  console.log(`Se ha buscado ${padId}`);

  Padre.findOne({_id: padId})
    .populate('pagos')
    .then(padre => {
      if (padre == null) {
        sendError(errMsg, res);
      } else {
        sendOk('Se encontro al padre:', res, padre);
      }
    })
    .catch(err => sendError(errMsg, res, err));
};

//CREATE -- Añadir Nuevo padre a la DB
exports.create = function(req, res) {
  let newData = nuevoPad(req);
  console.log(`Se va a crear: ${newData.nombre}`);

  Padre.crear(newData)
    .then(est => sendOk('Se creo al padre:', res, est))
    .catch(err => sendError('No se creo ningun padre', res, err));
};

//UPDATE -- Actualizar Usuario
exports.update = function(req, res) {
  const estId = req.params.id;
  let newData = req.body;

  const errMsg = `No existe el padre|No se pudo actualizar ${estId}`;
  console.log(`Se va a actualizar ${estId}`);
  Padre.findByIdAndUpdate(estId, {$set: newData})
    .then(est => {
      if (est == null) {
        sendError(errMsg, res);
      } else {
        sendOk('Se actualizó al padre:', res);
      }
    })
    .catch(err => sendError(errMsg, res, err));
};

//DELETE - remueve a un padre y a sus pagos de la Db
exports.delete = async function(req, res) {
  const estId = req.params.id;
  console.log(`Se va a eliminar el Padre ${estId}`);

  await Padre.eliminarById(req.params.id);
  //TODO este timeout esta peligroso
  setTimeout(() => {
    Padre.findById(req.params.id).then(est => {
      if (est == null) {
        sendOk(`Se elimino el usuario`, res);
      } else sendError(`No se elimino a ${est.nombre}`, res, est);
    });
  }, 2000);
};

//Pagos
exports.crearPagoById = async function(req, res) {
  const estId = req.params.id;
  console.log(req.body.banco);
  let pagoNuevo = newPago(req);
  console.log(`Se va a acreditar a ${estId} el pago de ${pagoNuevo}`);
  Padre.crearPagoById(estId, pagoNuevo)
    .then(p => {
      sendOk('Creado', res, p);
    })
    .catch(e => {
      sendError('No creado', res, e);
    });

  // pago.then(p => {console.log(p);res.send(p)});
};

function nuevoPad(req) {
  let newData = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    tlf: req.body.tlf,
    pagos: req.body.pagos,
    hijos: req.body.hijos,
  };
  if (!Array.isArray(newData.pagos)) {
    newData.pagos = [];
  }
  if (!Array.isArray(newData.hijos)) {
    newData.hijos = [];
  }
  return newData;
}

function newPago(req) {
  let newData = {
    banco: req.body.banco,
    referencia: req.body.referencia,
    monto: req.body.monto,
  };
  // if (Bancos.indexOf(newData.banco) === -1) {
  //   newData.banco = Bancos[0]
  // }
  return newData;
}
