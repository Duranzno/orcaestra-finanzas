'use strict';
const mongoose = require("mongoose");
const gruposDisponibles = require("./grupos");

const Pago = require('./pago');
const StudentSchema = new mongoose.Schema({
  nombre: {
    type: String,
    default: "",
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    default: "",
    trim: true,
  },
  email: {
    type: String,
    default: "",
    trim: true,
  },
  grupo: {
    type: String,
    enum: gruposDisponibles,
    default: gruposDisponibles[0],
    trim: true,
  },
  tlf: {
    type: String,
    trim: true,
    default: "",
  },
  pagos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pago',
    }
  ],
  createdAt: {type: Date, default: Date.now}
});
/**
 * Validations
 */
StudentSchema.path('nombre').required(true, 'Nombre no puede estar en blanco');
StudentSchema.path('apellido').required(true, 'Apellido no puede estar en blanco');
StudentSchema.path('grupo').required(true, 'Grupo no puede estar en blanco');
/**
 * Pre-remove hook
 */

/**
 * Methods
 */
StudentSchema.methods = {};
/**
 * Statics
 */
StudentSchema.statics = {
  /**
   *eliminar
   *@param {Number} estId
   *@api private
   **/
  eliminarById: function (estId) {
    let estThis = this;
    estThis.findById(estId)
        .catch((err) => console.log(err))
        .then((est) => {
          if (est != null) {
            console.log(`Se ha encontrado a ${est.nombre}`);
            if (est.pagos != null) {
              Pago.remove({_id: {$in: est.pagos}})
                  .catch((err) => console.log(err))
                  .then(console.log(`Se eliminaron sus pagos`));
            }
            else {
              console.log("No tenia Pagos")
            }
            estThis.remove({"_id": est._id})
                .then(console.log("Se elimino el estudiante"))
                .catch(err => console.log(err));
          } else {
            console.log("No se ha encontrado este estudiante")
          }
        })
  },
  crearPagoById: async function (estId, pagoNuevo) {

    let estThis = this;
    if (pagoNuevo.referencia === null || pagoNuevo.referencia === '') {
      console.error("No ref");
      return new Error('No tiene referencia el pago nuevo')
    }
    console.log(`Se va a crear ${pagoNuevo.referencia}`);
    await Pago.findOneAndUpdate({"referencia": pagoNuevo.referencia}, pagoNuevo, {upsert: true, runValidators: true})
        .then((p) => {
          if (p) {
            console.log(`Se Creo el pago${p}`);
          }
          else {
            new Error('No se pudo crear el pago');
          }
        })
        .catch(err => console.error(err));
    let pago = await Pago.findOne({"referencia": pagoNuevo.referencia});
    let EstFound = await estThis.findOne({"_id": estId});
    console.log(`${estId} de ${EstFound}`);
    await EstFound.pagos.push(pago);
    await EstFound.save();

    console.log(`Se tiene el pago ${pago.referencia} del ${pago.banco} de ${estId}`);
    return pago;
  },

  crear: async function (eNuevo) {
    let estThis = this;
    const filtro = {
      "nombre": eNuevo.nombre,
      "apellido": eNuevo.apellido,
      "grupo": eNuevo.grupo,
    };
    if (eNuevo.hasOwnProperty("_id")) return eNuevo;

    console.log('eNuevo', eNuevo);

    let updated = await this.findOneAndUpdate(filtro, eNuevo, {upsert: true, runValidators: true})
        .catch(err => console.error(err));
    console.log(`${updated}`);
    return await estThis.findOne(filtro)
  },
};

module.exports = mongoose.model('Estudiantes', StudentSchema);



