const Pago = require('../models/pago');
const Bancos = require('../models/bancos');
const Estudiante = require("../models/pago");
const {
  sendOk,
  sendError,
  newPago
} = require('./help');


//READ Obtener JSON de un pago especifico
exports.findOne = function (req, res) {
  const msg = `Encontrado el Pago ${req.params.pagoId} de ${req.params.id} `;
  Pago.findById(req.params.pagoId).exec(function (err, found) {
    if (err || !found) {
      sendError("No " + msg, res, err)
    } else {
      sendOk(msg, res, found)
    }
  });
};


//UPDATE
exports.update = function (req, res) {
  let newData = newPago(req);

  Pago.findByIdAndUpdate(req.params.pagoId, {$set: newData}, {
    new: true,
    upsert: true,
    runValidators: true
  }, function (err, pago) {
    if (err) {
      sendError(`Problemas al actualizar ${req.params.pagoId}`, res, err);
    }
    else {
      sendOk(`actualizado ${req.params.id} ${pago}`, res, pago);
    }
  })
};

//DELETE
exports.delete = function (req, res) {
  const estId = req.params.id;
  const pagoId = req.params.pagoId;
  console.log(`Se va a borrar ${pagoId}`);
  Pago.findByIdAndRemove(req.params.pagoId, function (err) {
    if (err) {
      sendError(`Problemas al borrar ${req.params.pagoId}`, res, err);
    }
    else {
      sendOk(`Borrado ${req.params.id}`, res);
    }
  })

};

