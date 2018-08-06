'use strict';
module.exports = (Schema) => {
  return new Schema({
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
};
