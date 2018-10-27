//funciones de ayuda
const Bancos = require('../models/bancos');

function sendOk(okMsg, res, object) {
  if (object == null) {
    console.log(okMsg);
    res.send(okMsg);
  } else {
    console.log(okMsg + `\n${object}`);
    res.send(object);
  }
}

function newPago(req) {
  let newData = {
    banco: req.body.banco,
    referencia: req.body.referencia,
    monto: req.body.monto,
  };
  if (Bancos.indexOf(newData.banco) === -1) {
    newData.banco = Bancos[0];
  }
  return newData;
}

function sendError(errMsg, res, err) {
  if (err == null) {
    console.error(errMsg);
    res.status(400).send(errMsg);
  } else {
    console.error(err);
    res.status(400).send(errMsg);
  }
}

module.exports = {sendOk, sendError, newPago};
