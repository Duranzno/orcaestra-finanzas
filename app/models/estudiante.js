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
StudentSchema.methods = {
    agregarPago:async function (pagoNuevo) {
        let estThis=this;
        let pago=await Pago.crear(pagoNuevo);
        estThis.pagos.addToSet(pago._id);
        estThis.save(function(error){
            if(error){console.error(TAG,``,error);}
            console.log(TAG,`Se agrego el pago ${pagoNuevo.referencia} del banco ${pagoNuevo.banco} a ${estThis.nombre} ${estThis.apellido}`);
            return pago;
        })

    },
};
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
  crearPagoById: async function (estId,pagoNuevo) {
      //Conseguir Estudiante existente
      //Buscar pago y si no existe crearlo
      //Agregar Pago al estudiante
      // console.log(TAG,`Crear PagoByID`)
     let est=await this.findById(estId);
      return await est.agregarPago(pagoNuevo);
    ;
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
        .catch(err => console.error(err));
    let letmesee = await estThis.findOne(filtro);
    console.log(TAG, "SE ENCONTRÓ\\CREÓ Estudiante", letmesee, '\n');
    return letmesee;
  },
};

module.exports = mongoose.model('Estudiantes', StudentSchema);



