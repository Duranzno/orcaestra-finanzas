const XLSX = require('xlsx');
const Pago = require('../../../app/models/pago');
const Estudiante = require('../../../app/models/estudiante');
const Grupos = require('../../../app/models/grupos');
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
let extraerFila = function (rowNum, sheet) {
  let colNombre = regex.extraerPosibleColumnaMultiple(
      sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cEst})].v);
  if (Array.isArray(colNombre)) {
    colNombre.forEach(function (item, index) {
      console.log(item, index);
      let estudiante = extraerEstudiante(sheet, rowNum, colNombre, index);
      let pago = extraerPago(sheet, rowNum);
      Estudiante.crear(estudiante).then((est) => {
        // console.error(err);
        if (est == null) {
          console.error(new Error("id creado de rowNum=" + rowNum + "=null"))
        }
        Estudiante.crearPagoById(est._id, pago)
            .then(p => console.log(p))
            .catch(err => console.error(err + rowNum));
      });
    })
  } else {
    let estudiante = extraerEstudiante(sheet, rowNum, colNombre);
    let pago = extraerPago(sheet, rowNum);
    Estudiante.crear(estudiante).then((est) => {
      // console.error(est);
      return Estudiante.crearPagoById(est._id, pago)
          .then(p => console.log(p))
          .catch(err => console.error(err));
    })
        .catch(err => console.error(err));
  }

};

let extraerTodasFilas = function (sheet) {
  let range = XLSX.utils.decode_range(sheet['!ref']); // get the range
  for (let rowNum = 50; rowNum < 75/*range.e.r*/; rowNum++) {
    let nombre = sheet[XLSX.utils.encode_cell({r: rowNum, c: 0})];
    if (nombre === undefined) {
      break
    }
    // console.log(nombre.v+' ' + rowNum);

    extraerFila(rowNum, sheet)
  }
};

let agregarPorReferencia = async function (pago) {
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

function esParteDelGrupo(grupoNuevo) {
  for (let i in Grupos) {
    if (Grupos[i] === (grupoNuevo)) {
      return true
    }
  }
  return false;
}

let extraerPago = function (sheet, rowNum) {
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
let extraerEstudiante = function (sheet, rowNum, colNombre, n) {
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
    if (!esParteDelGrupo(estudiante.grupo)) {
      estudiante.grupo = "Sin Determinar"
    }
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

module.exports = {
  extraerFila: extraerFila,
  extraerTodasFilas: extraerTodasFilas,
  agregarPorReferencia: agregarPorReferencia,
};
