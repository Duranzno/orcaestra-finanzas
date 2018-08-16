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
StudentSchema.path('tlf').required(true, 'Numero no puede estar en blanco');
/**
 * Pre-remove hook
 */

  /**
   * Methods
   */
  StudentSchema.methods = {
    /**
     *addPago
     *@param {Pago} pagoNuevo
     *@api private
     **/
    addPago: function (pagoNuevo) {
      this.pagos.push(pagoNuevo);
      return this.save();
    },
    /**
     *removePago
     *@param {String} pagoId
     *@api private
     **/
    removeComment: function (pagoId) {
      const index = this.pagos
          .map(pagos => pagos._id)
          .indexOf(pagoId);
      if (~index) this.pagos.splice(index, 1);
      else throw new Error('Pago no encontrado');
      return this.save();
    }
  };
  /**
   * Statics
   */
  StudentSchema.statics = {};
  mongoose.model('Estudiantes', StudentSchema);
  return StudentSchema;
};

