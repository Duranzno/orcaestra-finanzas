'use strict';
const mongoose = require('mongoose');
const gruposDisponibles = require('./grupos');

const Pago = require('./pago');
const StudentSchema = new mongoose.Schema({
  nombre: {
    type: String,
    default: '',
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    default: '',
    trim: true,
  },
  email: {
    type: String,
    default: '',
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
    default: '',
  },
  pagos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pago',
    },
  ],
  createdAt: {type: Date, default: Date.now},
});
/**
 * Validations
 */
StudentSchema.path('nombre').required(true, 'Nombre no puede estar en blanco');
StudentSchema.path('apellido').required(true,'Apellido no puede estar en blanco');
StudentSchema.path('grupo').required(true, 'Grupo no puede estar en blanco');
/**
 * Pre-remove hook
 */

/**
 * Methods
 */
StudentSchema.methods = {
  agregarPago: async function(pagoNuevo) {
    try{
      let estThis = this;
      let pago = await Pago.crear(pagoNuevo);
      estThis.pagos.addToSet(pago._id);
      await estThis.save();
      return pago;
    }
    catch (e) {console.error(e)}
  },
};
/**
 * Statics
 */
StudentSchema.statics = {
  crear: async function(eNuevo) {
    try{
      const filtro = {nombre: eNuevo.nombre,apellido: eNuevo.apellido,grupo: eNuevo.grupo,
      };
      await this.findOneAndUpdate(filtro,eNuevo,
        {upsert: true, runValidators: true}
      );

      return await this.findOne(filtro);
    } catch (e) {
      console.error(e);
    }
  },
  agregarPagoById: async function(estId, pagoNuevo) {
    let est = await this.findById(estId);
    return await est.agregarPago(pagoNuevo);
  },
  eliminarById:async function(estId){
    try {
      let est= await this.findOne({"_id":estId});
      if (est.pagos&&est.pagos.length>0) await Pago.remove({_id: {$in: est.pagos}});
      await this.remove({"_id":estId});
    }
    catch (e) {console.error(e)}
  },
};

module.exports = mongoose.model('Estudiantes', StudentSchema);
