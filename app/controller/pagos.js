const Pago = require('../models/pago');
const Bancos = require('../models/bancos');
const Estudiante = require("../models/pago");
const {
  sendOk,
  sendError,
  newPago
} = require('./help');

exports.create = (function (req, res) {
  // console.log(`Se va a hacer un usuario de ${req.body.getJSON()}`);
  console.log(req.body);
  const pago = new models.Pago(req.body);
  // console.log(models.Pago.find({"referencia":req.body.referencia}));

  respondOrRedirect({req, res}, `/articles/${pago._id}`, pago, {
    type: 'success',
    text: 'Successfully created article!'
  });
});
// exports.destroy=function (req,res,next,id) {
//
// };


// returnPago
//       .create({
//         banco: req.body.banco,
//         referencia: req.body.referencia,
//         fecha: req.body.fecha,
//         monto: req.body.monto,
//         pagoId: req.body.pagoId,
//
//       }, {})
//       .then(todo => res.status(200).send(todo))
//       .catch(error => res.status(400).send(error));
// };

// const modelStudent=require("../model/estudiante")
// let students= {
//     pago1: {
//         id: 1,
//         nombre: "Jack",
//         apellido: "Davis",
//         proyecto: "inicial",
//     },
//     student2: {
//         id: 2,
//         nombre: "Mary",
//         apellido: "Taylor",
//         proyecto: "inicial",
//     },
//     student3: {
//         id: 3 ,
//         nombre: "Peter",
//         apellido: "Thomas",
//         proyecto: "inicial",
//     },
//     student4: {
//         id: 4,
//         nombre: "Peter",
//         apellido: "Thomas",
//         proyecto: "inicial",
//     }
// };
// exports.create = function (req, res) {

// console.log("--->Se ha agregado el pago de %s", req.body.name);
// res.send("ok")
// };
// exports.findAll=function (req,res) {
//     console.log("--->Find All: \n");
//     res.send("deleted");
// };
// exports.findOne=function (req,res) {
//     console.log("--->Find customer: \n");
//     res.send("founded") ;
//
// };
//
// exports.update=function (req,res) {
//     console.log("--->Update Successfully, customers: \n" )
// };
//
// exports.delete=function (req,res) {
//     console.log("--->After deletion, customer list:\n");
//       res.end("deleted");
// } ;
