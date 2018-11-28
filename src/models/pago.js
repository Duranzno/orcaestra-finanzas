'use strict';
/**
 * Module dependencies.
 */
const mongoose = require('mongoose');

/**
 * Pago Schema
 */
let PagoSchema = new mongoose.Schema({
  banco: {
    type: String,
    required: true,
    default: '',
  },
  referencia: {
    type: String,
    required: true,
    default: '',
  },
  fecha: {
    type: Date,
    default: Date.now(),
  },
  monto: {
    type: Number,
    required: true,
    default: 0,
  },
});

/**
 * Validations
 */
/**
 * Pre-save hook
 */

/**
 * Methods
 */
PagoSchema.statics = {
  crear: async function(pagoNuevo) {
    let pThis = this;
    if (pagoNuevo.referencia === null || pagoNuevo.referencia === '') {
      console.error(new Error('No tiene referencia el pago nuevo'));
    }
    
    if(typeof pagoNuevo._id==="undefined"){
      return await pThis.findOneAndUpdate(
      {
        referencia: pagoNuevo.referencia,
      },
      pagoNuevo,
      {upsert: true, runValidators: true, new: true}
    );
    }
    else
    {
      return await pThis.findOneAndUpdate(
      {
        // referencia: pagoNuevo.referencia,
        _id:pagoNuevo._id,
      },
      pagoNuevo,
      {upsert: true, runValidators: true, new: true}
    );  
    }
    

    // return p;
  },
};

module.exports = mongoose.model('Pagos', PagoSchema);
