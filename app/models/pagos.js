'use strict';
/**
 * Module dependencies.
 */


module.exports = (mongoose) => {
  /**
   * Pago Schema
   */
  const Schema = mongoose.Schema;
  const PagoSchema = new Schema({
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
  PagoSchema.methods = {};

  /**
   * Statics
   */
  PagoSchema.statics = {};
  return PagoSchema;
};


