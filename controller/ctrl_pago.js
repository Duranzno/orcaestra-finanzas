const Pago = require('../db/models/model_pago');
module.exports = {
  create(req, res) {
    return Pago
        .create({
          banco: req.body.banco,
          referencia: req.body.referencia,
          fecha: req.body.fecha,
          monto: req.body.monto,
          pagoId: req.body.pagoId,

        }, {})
        .then(todo => res.status(200).send(todo))
        .catch(error => res.status(400).send(error));
  }
}
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
