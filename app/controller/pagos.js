const {Pago,Estudiante,Padre} = require('../models/');
const {sendOk, sendError, newPago} = require('./help');
module.exports = {
//READ Obtener JSON de un pago especifico
  findOne: function(req, res) {
    const msg = `Encontrado el Pago ${req.params.pagoId} de ${req.params.id} `;
    Pago.findById(req.params.pagoId).exec(function(err, found) {
      if (err || !found) {
        sendError('No ' + msg, res, err);
      } else {
        sendOk(msg, res, found);
      }
    });
  },
//UPDATE
  update: function(req, res) {
    let newData = newPago(req);
    Pago.findByIdAndUpdate(
      req.params.pagoId,
      {$set: newData},
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
      function(err, pago) {
        if (err) {
          sendError(`Problemas al actualizar ${req.params.pagoId}`, res, err);
        } else {
          sendOk(`actualizado ${req.params.id} ${pago}`, res, pago);
        }
      }
    );
  },
//DELETE
  delete: async function(req, res) {
    const pagoId = req.params.pagoId;
    console.log(`Se va a borrar ${pagoId}`);
    try{
      await Promise.all([
      Estudiante.update({},{$pull:{"pagos":pagoEliminable._id}},{multi:true}),
      Padre.update({},{$pull:{"pagos":pagoEliminable._id}},{multi:true}),
      Pago.findByIdAndRemove(req.params.pagoId),
      ]);
      sendOk(`Borrado ${req.params.id}`, res);
    } catch (e) {sendError(`Problemas Eliminando ${req.params.id}`,res,e)}
  },
};
