const XLSX = require('xlsx'),
  Pago = require('../../../app/models/pago'),
  Estudiante = require('../../../app/models/estudiante'),
  Grupos = require('../../../app/models/grupos'),
  regex = require('./parseRegex'),
  dateUtil = require('./parseDate'),
  TAG = `extractXLSXMarwan|`;

const eCol = {
  cTimeStamp: 0,
  cNombreRep: 1,
  cApellRep: 2,
  cCedulaRep: 3,
  ctlfRep: 4,
  cCorreo: 5,
  cEst: [
    {nombre: 6, apellido: 7, grupo: 8},
    {nombre: 9, apellido: 10, grupo: 11},
    {nombre: 12, apellido: 13, grupo: 14},
  ],
  cBanco: 15,
  cDate: 16,
  cMonto: 17,
  cRef: 18,
};

function extraerCelda(sheet, rowNum, col) {
  let v = sheet[XLSX.utils.encode_cell({r: rowNum, c: col})];
  return typeof v !== 'undefined' ? v.v : '';
}

function extraerFila(sheet, rowNum) {
  const estudiantesRef = [
    extraerCelda(sheet, rowNum, eCol.cEst[0].nombre),
    extraerCelda(sheet, rowNum, eCol.cEst[1].nombre),
    extraerCelda(sheet, rowNum, eCol.cEst[2].nombre),
  ];
  //Creacion de Pago
  let newPago = extraerPago(sheet, rowNum);

  // Distribucion de Pago
  for (const [i, estRef] of estudiantesRef.entries()) {
    if (estRef) {
      let est = extraerEstudiante(sheet, rowNum, eCol.cEst[i]);

      Estudiante.crear(est)
        .then(est => {
          console.log(TAG, `creado/encontrado estudiante ${est.nombre}`);

          Estudiante.crearPagoById(est._id, pago)
            .then(p =>
              console.log(
                TAG,
                `Se agrego el pago ${p.referencia} a ${est.nombre} ${
                  est.apellido
                }`
              )
            )
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }
  }
}

// let extraerTodasFilas = function (sheet) {
//   let range = XLSX.utils.decode_range(sheet['!ref']); // get the range
//   for (let rowNum = 1; rowNum < range.e.r; rowNum++) {
//     let nombre = sheet[XLSX.utils.encode_cell({r: rowNum, c: 0})];
//     if (nombre === undefined) {
//       break
//     }
//     // console.log(TAG,nombre.v+' ' + rowNum);
//
//     extraerFila(sheet, rowNum)
//   }
// };

let agregarPagoPorReferencia = async function(pago) {
  if (pago.hasOwnProperty('_id')) {
    console.log(TAG, `ya existia el pago`);
    return pago;
  } //Ya existe el pago

  return await Pago.create(pago);
};

function esParteDelGrupo(grupoNuevo) {
  for (let i in Grupos) {
    if (Grupos[i] === grupoNuevo) {
      return true;
    }
  }
  return false;
}

let extraerPago = function(sheet, rowNum) {
  let fechaPago = extraerCelda(sheet, rowNum, eCol.cDate);
  fechaPago =
    fechaPago === '-' || fechaPago === ''
      ? new Date(Date.UTC(0, 0, 0, 0, 0, 0))
      : fechaPago;
  let pago = {
    banco: extraerCelda(sheet, rowNum, eCol.cBanco)
      ? extraerCelda(sheet, rowNum, eCol.cBanco)
      : 'Desconocido',
    referencia: extraerCelda(sheet, rowNum, eCol.cRef),
    fecha: dateUtil.parseDate(fechaPago),
    monto: extraerCelda(sheet, rowNum, eCol.cMonto)
      ? extraerCelda(sheet, rowNum, eCol.cMonto)
      : '0',
  };
  if (pago.fecha === '-' || pago.fecha === '') {
    pago.fecha = Date.now();
  }
  return pago;
};
let extraerEstudiante = function(sheet, rowNum, cEst) {
  let estudiante = {
    nombre: extraerCelda(sheet, rowNum, cEst.nombre)
      ? extraerCelda(sheet, rowNum, cEst.nombre)
      : 'Desconocido',
    apellido: extraerCelda(sheet, rowNum, cEst.apellido)
      ? extraerCelda(sheet, rowNum, cEst.apellido)
      : 'Desconocido',
    email: extraerCelda(sheet, rowNum, eCol.cCorreo)
      ? extraerCelda(sheet, rowNum, eCol.cCorreo)
      : '-',
    tlf: extraerCelda(sheet, rowNum, eCol.ctlfRep)
      ? extraerCelda(sheet, rowNum, eCol.ctlfRep)
      : '-',
    grupo: extraerCelda(sheet, rowNum, cEst.grupo)
      ? extraerCelda(sheet, rowNum, cEst.grupo)
      : 'Sin Determinar',
    instrumento: extraerCelda(sheet, rowNum, cEst.instrumento)
      ? extraerCelda(sheet, rowNum, cEst.instrumento)
      : 'Sin Determinar',
    pago: [],
  };
  if (!esParteDelGrupo(estudiante.grupo)) {
    estudiante.grupo = 'Sin Determinar';
  }
  return estudiante;
};

module.exports = {
  extraerEstudiante: extraerEstudiante,
  extraerFila: extraerFila,
  // extraerTodasFilas: extraerTodasFilas,
  // extraerPago:extraerPago,
  // agregarPorReferencia: agregarPorReferencia,
};
// let Pago = {
//   banco: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cBanco})].v,
//   referencia: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cRef})].v,
//   fecha: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cDate})].v,
//   monto: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cMonto})].v
// };
//
