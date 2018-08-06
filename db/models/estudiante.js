'use strict';
module.exports = (Schema, Pagos) => {
  let gruposDisponibles = require("./grupos");
  return new Schema({
    nombre: {
      type: String,
      required: true,
      default: "",
    },
    apellido: {
      type: String,
      required: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      default: "",
    },
    grupo: {
      type: String,
      required: true,
      enum: gruposDisponibles(),
      default: gruposDisponibles[0],
    },
    numero: {
      type: String,
      required: true,
      default: "",
    },
    pagos: {
      type: [Pagos]
    }

  });
};
