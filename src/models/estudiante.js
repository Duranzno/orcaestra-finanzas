'use strict';
const gruposDisponibles = require('./grupos');
const mongoose = require('mongoose');
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
      ref: 'Pagos',
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
const updateOptions = {multi: true,safe:true,runValidators:true,upsert:true};

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
  quitarPago:async function(pagoEliminable){
    await this.update({$pull:{"pagos":pagoEliminable._id}},updateOptions)
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
    let est=  await this.findOne(filtro);
    if (eNuevo.hasOwnProperty('pago')) {est.agregarPago(eNuevo.pago)}
    return est;
    } catch (e) {
      console.error(e);
    }
  },
  agregarPagoById: async function(estId, pagoNuevo) {
    let est = await this.findById(estId);
    return await est.agregarPago(pagoNuevo);
  },
  eliminarById:async function(estId){
      let est= await this.findOne({"_id":estId});
      if (est.pagos&&est.pagos.length>0) await Pago.remove({_id: {$in: est.pagos}});
      await this.remove({"_id":estId});
  },
  transferirPago:async function(trasnferidorId,transferidoId,pagoId){
    await this.update({'_id':transferidoId} ,{$push:{pagos:pagoId}},updateOptions);
    await this.update({'_id':trasnferidorId},{$pull:{pagos:pagoId}},updateOptions);
  }
};

module.exports = mongoose.model('Estudiantes', StudentSchema);
