'use strict';
const mongoose = require("mongoose");
const gruposDisponibles = require("./grupos");
const TAG = "modelEstudiante|";

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
        .catch((err) => console.log(TAG, err))
        .then((est) => {
          if (est != null) {
            console.log(TAG, `Se ha encontrado a ${est.nombre}`);
            if (est.pagos != null) {
              Pago.remove({_id: {$in: est.pagos}})
                  .catch((err) => console.log(TAG, err))
                  .then(console.log(TAG, `Se eliminaron sus pagos`));
            }
            else {
              console.log(TAG, "No tenia Pagos")
            }
            estThis.remove({"_id": est._id})
                .then(console.log(TAG, "Se elimino el estudiante"))
                .catch(err => console.log(TAG, err));
          } else {
            console.log(TAG, "No se ha encontrado este estudiante")
          }
        })
  },
  crearPagoById: async function (estId, pagoNuevo) {

    let estThis = this;
    if (pagoNuevo.referencia === null || pagoNuevo.referencia === '') {
      console.error("No ref");
      return new Error('No tiene referencia el pago nuevo')
    }
    console.log(TAG, `Se va a crear pago:${pagoNuevo.referencia}\n`);
    await Pago.findOneAndUpdate({"referencia": pagoNuevo.referencia}, pagoNuevo, {upsert: true, runValidators: true})
        .then((p) => {
          if (p) {
            console.log(TAG, `Se Creo el pago${p.referencia}\n`);
          }
          else {
            new Error('No se pudo crear el pago');
          }
        })
        .catch(err => console.error(err));
    let pago = await Pago.findOne({"referencia": pagoNuevo.referencia});
    let EstFound = await estThis.findOne({"_id": estId});
    // console.log(TAG,`${estId} de ${EstFound}`);
    await EstFound.pagos.push(pago);
    await EstFound.save();

    // console.log(TAG,`Se tiene el pago ${pago.referencia} del ${pago.banco} de ${estId}`);
    return pago;
  },

  crear: async function (eNuevo) {
    let estThis = this;
    const filtro = {
      "nombre": eNuevo.nombre,
      "apellido": eNuevo.apellido,
      "grupo": eNuevo.grupo,
    };
    if (eNuevo.hasOwnProperty("_id")) {
      console.log(TAG, `eNuevo ya tenia ._id por lo tanto ya es parte de la DB`);
      return eNuevo
    }

    let updated = await estThis.findOneAndUpdate(filtro, eNuevo, {upsert: true, runValidators: true})
        .then(est => {
          if (est)
            console.log(TAG, `se consiguió\\encontró ${est.nombre}`);
          else
            console.error(TAG, `se consiguió\\encontró ${est.nombre}`);
        })
        .catch(err => console.error(err));
    let letmesee = await estThis.findOne(filtro);
    console.log(TAG, "SE ENCONTRO Estudiante", letmesee, '\n');
    return letmesee;
  },
};

module.exports = mongoose.model('Estudiantes', StudentSchema);



