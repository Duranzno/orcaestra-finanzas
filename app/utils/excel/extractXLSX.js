const XLSX = require('xlsx');
const Pago = require('../../../app/models/pago');
const Estudiante = require('../../../app/models/estudiante');
const regex = require('./parseRegex');
const eCol = {
  cEst: 0,
  cGrupo: 1,
  cInstr: 2,
  cBanco: 3,
  cDate: 4,
  cRef: 5,
  cMonto: 6,
  cCedula: 7,
};
//FUNCIONES
module.exports.extraerFila = function (rowNum, sheet) {
  let colNombre = regex.extraerPosibleColumnaMultiple(
      sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cEst})].v);

  if (Array.isArray(colNombre)) {
    colNombre.forEach(function (item, index) {
      console.log(item, index);
      let estudiante = extraerEstudiante(sheet, rowNum, colNombre, index);
      let pago = extraerPago(sheet, rowNum);
      Estudiante.crear(estudiante).then((est) => {
        // console.error(err);
        Estudiante.crearPagoById(est._id, pago)
            .then(p => console.log(p))
            .catch(err => console.error(err));
      });
    })
  } else {
    let estudiante = extraerEstudiante(sheet, rowNum, colNombre);
    let pago = extraerPago(sheet, rowNum);
    Estudiante.crear(estudiante).then((est) => {
      console.error(est);
      return Estudiante.crearPagoById(est._id, pago)
          .then(p => console.log(p))
          .catch(err => console.error(err));
    })
        .catch(err => console.error(err));
  }
};

exports.agregarPorReferencia = async function (pago) {
  if (pago._id === null) {
    return pago
  }
  return await Pago.findOne({'referencia': pago.referencia})
      .then(found => {
        if (found) {
          console.log(found);
          return found
        } else {
          Pago.create(pago, (err, creado) => {
            return creado
          })
              .catch(err => console.error(err))
        }
      })
      .catch(err => console.error(err));
};
extraerPago = function (sheet, rowNum) {
  let pago = {
    banco: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cBanco})].v,
    referencia: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cRef})].v,
    fecha: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cDate})].v,
    monto: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cMonto})].v
  };
  if (pago.fecha === '-' || pago.fecha === "") {
    pago.fecha = Date.now();
  }
  return pago;
};

function extraerEstudiante(sheet, rowNum, colNombre, n) {
  let sheetGrupo = sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cGrupo})].v;
  let sheetInstr = sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cInstr})].v;
  if (typeof n === "number") {
    let estudiante = {
      nombre: '',
      apellido: '',
      email: '-',
      tlf: '-',//sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cCedula})].v,
      grupo: regex.extraerPosibleColumnaMultiple(sheetGrupo)[n] || 'Sin Determinar',
      instrumento: regex.extraerPosibleColumnaMultiple(sheetInstr)[n] || 'Sin Determinar',
      pago: []
    };
    estudiante = regex.extraerNombreApellido(colNombre[n], estudiante);
    return estudiante;
  }
  else {
    let estudiante = {
      nombre: '',
      apellido: '',
      email: '-',
      tlf: '-',
      grupo: sheetGrupo,
      instrumento: sheetInstr,
      pago: []
    };
    estudiante = regex.extraerNombreApellido(colNombre, estudiante);
    return estudiante;
  }
};
