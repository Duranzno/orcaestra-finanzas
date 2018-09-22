'use strict';
const mongoose = require("mongoose");
const TAG = "modelRepresentante|";

const Pago = require('./pago');
const Estudiante  = require("./estudiante");

const PadreSchema = new mongoose.Schema({
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
  hijos:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Est',
    },
  ],
  createdAt: {type: Date, default: Date.now}
});
/**
 * Validations
 */
PadreSchema.path('nombre').required(true, 'Nombre no puede estar en blanco');
PadreSchema.path('apellido').required(true, 'Apellido no puede estar en blanco');
/**
 * Pre-remove hook
 */

/**
 * Methods
 */
PadreSchema.methods = 
{
  agregarHijo:async function (hijoNuevo) {
      let padThis=this;
      let hijo=await Estudiante.crear(hijoNuevo);
      padThis.hijos.addToSet(hijo._id);
      padThis.save(function(error){
          if(error){console.error(TAG,``,error);}
          console.log(TAG,`Se agrego el hijo${hijoNuevo.nombre} ${hijoNuevo.apellido} a ${padThis.nombre} ${padThis.apellido}`);
          return hijo;
      })

  },
};
/**
 * Statics
 */
PadreSchema.statics = {
  /**
   *eliminar
   *@param {Number} estId
   *@api private
   **/
  // eliminarById: function (padID) {
  //   let estThis = this;
  //   estThis.findById(padID)
  //       .catch((err) => console.log(TAG, err))
  //       .then((est) => {
  //         if (est != null) {
  //           console.log(TAG, `Se ha encontrado a ${est.nombre}`);
  //           if (est.pagos != null) {
  //             Pago.remove({_id: {$in: est.pagos}})
  //                 .catch((err) => console.log(TAG, err))
  //                 .then(console.log(TAG, `Se eliminaron sus pagos`));
  //           }
  //           else {
  //             console.log(TAG, "No tenia Pagos")
  //           }
  //           estThis.remove({"_id": est._id})
  //               .then(console.log(TAG, "Se elimino el estudiante"))
  //               .catch(err => console.log(TAG, err));
  //         } else {
  //           console.log(TAG, "No se ha encontrado este estudiante")
  //         }
  //       })
  // },
  // crearPagoById: async function (padId,pagoNuevo) {
  //     //Conseguir Estudiante existente
  //     //Buscar pago y si no existe crearlo
  //     //Agregar Pago al estudiante
  //     // console.log(TAG,`Crear PagoByID`)
  //    let est=await this.findById(padId);
  //     return await est.agregarPago(pagoNuevo);
  //   ;
  // },

  // crear: async function (eNuevo) {
  //   let estThis = this;
  //   const filtro = {
  //     "nombre": eNuevo.nombre,
  //     "apellido": eNuevo.apellido,
  //     "grupo": eNuevo.grupo,
  //   };
  //   if (eNuevo.hasOwnProperty("_id")) {
  //     console.log(TAG, `eNuevo ya tenia ._id por lo tanto ya es parte de la DB`);
  //     return eNuevo
  //   }

  //   let updated = await estThis.findOneAndUpdate(filtro, eNuevo, {upsert: true, runValidators: true})
  //       .catch(err => console.error(err));
  //   let letmesee = await estThis.findOne(filtro);
  //   console.log(TAG, "SE ENCONTRÓ\\CREÓ Estudiante", letmesee, '\n');
  //   return letmesee;
  // },
};

module.exports = mongoose.model('padres',PadreSchema);



