'use strict';
/**
 * Module dependencies.
 */
const mongoose = require("mongoose");

/**
 * Pago Schema
 */
let PagoSchema = new mongoose.Schema({
  banco: {
    type: String,
    required: true,
    default: "",
  },
  referencia: {
    type: String,
    required: true,
    default: "",
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
PagoSchema.statics = {};

module.exports = mongoose.model('Pago', PagoSchema);


