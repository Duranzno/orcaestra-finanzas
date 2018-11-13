'use strict';
const mongoose = require('mongoose');
const TAG = 'modelRepresentante|';

const Pago = require('./pago');
const Estudiante = require('./estudiante');

const updateOptions = {multi: true,safe:true,runValidators:true,upsert:true};
const PadreSchema = new mongoose.Schema({
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
  hijos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Estudiantes',
    },
  ],
  createdAt: {type: Date, default: Date.now},
});

/**
 * Validations
 */
PadreSchema.path('nombre').required(true, 'Nombre no puede estar en blanco');
PadreSchema.path('apellido').required(true,'Apellido no puede estar en blanco');
/**
 * Methods
 */
PadreSchema.methods = {
  agregarHijo:async function(hijoNuevo){
    try{
      let padThis = this;
      let hijo = await Estudiante.crear(hijoNuevo);
      padThis.hijos.addToSet(hijo._id);
      await padThis.save();
      return hijo;
    }
    catch (e) {console.error(e)}
  },
  quitarHijo:async function(hijoEliminable){
    let id=hijoEliminable._id;
    if (typeof hijoEliminable!=='object'){
      let {_id}= await Estudiante.find({"nombre":hijoEliminable.nombre,"apellido":hijoEliminable.apellido,'grupo':hijoEliminable.grupo});
      id = _id;
    }
    await Estudiante.findByIdAndRemove(id);
    await this.update({$pull:{"hijos":hijoEliminable._id}},
      updateOptions)
  },
  agregarPago: async function(pagoNuevo) {
    let pago = await Pago.crear(pagoNuevo);
    this.pagos.addToSet(pago._id);
    await this.save();
    await Estudiante.updateMany(
        {"_id":{$in:this.hijos}},
        {$push:{pagos:pago}}
      );
    return pago;
  },
  quitarPago:async function(pagoEliminable){

    let id=pagoEliminable._id;
    if (typeof pagoEliminable!=='object'){
      let {_id}= await Pago.find({"referencia":pagoEliminable.referencia,"banco":pagoEliminable.banco});
      id = _id;
    }
      await Pago.remove(
        {"_id":id});
      await Estudiante.updateMany(
        {"_id":{$in:this.hijos}},
        {$pull:{pagos:id}}
      );
    await  this.update(
        {$pull:{"pagos":id}}, updateOptions
      );
  },
};

/**
 * Statics
 */
PadreSchema.statics = {
  crear: async function(pNuevo) {
    let padThis = this;
    const filtro = {
      nombre: pNuevo.nombre,
      apellido: pNuevo.apellido,
    };

    if (pNuevo.hasOwnProperty('_id')) {
      console.log(
        TAG,
        `eNuevo ya tenia ._id por lo tanto ya es parte de la DB`
      );
      return pNuevo;
    }
    await padThis
      .findOneAndUpdate(filtro, pNuevo, {upsert: true, runValidators: true})
      .catch(err => console.error(err));
    
    let pad= await padThis.findOne(filtro);
    if (pNuevo.hasOwnProperty('pago')) {await pad.agregarPago(pNuevo.pago)}
    return pad;
  },
  transferirPago:async function(trasnferidorId,transferidoId,pagoId){
    await this.update({'_id':transferidoId} ,{$push:{pagos:pagoId}},updateOptions);
    await this.update({'_id':trasnferidorId},{$pull:{pagos:pagoId}},updateOptions);
  },
  transferirHijo:async function(trasnferidorId,transferidoId,hijoId){
    await this.update({'_id':transferidoId} ,{$push:{hijos:hijoId}},updateOptions);
    await this.update({'_id':trasnferidorId},{$pull:{hijos:hijoId}},updateOptions);
  },
  eliminar:async function(id){
    let p=await this.findById(id);
    await Estudiante.remove({"_id":{$in:p.hijos}});
    await Pago.remove({"_id":{$in:p.pagos}});
    await this.remove({"_id":id});

  },
};

module.exports = mongoose.model('Padres', PadreSchema);
