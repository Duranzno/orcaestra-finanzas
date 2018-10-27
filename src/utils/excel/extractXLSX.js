const XLSX = require('xlsx');
const Pago = require('../../models/pago');
const Estudiante = require('../../models/estudiante');
const Grupos = require('../../models/grupos');
const regex = require('./parseRegex');
const dateUtil = require('./parseDate');
const TAG = `extractXLSX|`;
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
function extraerFila(sheet, rowNum) {
  let cell = sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cEst})];
  if (typeof cell === 'undefined') {
    console.error(
      new Error(
        `La celda que se encuentra en ${eCol.cEst}:${rowNum} no pudo ser leida`
      )
    );
  }
  let colNombre = regex.extraerPosibleColumnaMultiple(cell.v);
  if (Array.isArray(colNombre)) {
    colNombre.forEach(function(item, index) {
      console.log(TAG, item, index);
      let estudiante = extraerEstudiante(sheet, rowNum, colNombre, index);
      let pago = extraerPago(sheet, rowNum);
      Estudiante.crear(estudiante).then(est => {
        if (est == null) {
          console.error(new Error('id creado de rowNum=' + rowNum + '=null'));
        }
        Estudiante.crearPagoById(est._id, pago)
          .then(p => console.log(TAG, 'arrayEstudiantes ', p))
          .catch(err => console.error(err + rowNum));
      });
    });
  } else {
    let estudiante = extraerEstudiante(sheet, rowNum, colNombre);
    let pago = extraerPago(sheet, rowNum);
    Estudiante.crear(estudiante)
      .then(est => {
        // console.error(est);
        return Estudiante.crearPagoById(est._id, pago)
          .then(p => console.log(TAG, 'unicoEstudiante ', p))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }
}

let extraerTodasFilas = function(sheet) {
  let range = XLSX.utils.decode_range(sheet['!ref']); // get the range
  for (let rowNum = 1; rowNum < range.e.r; rowNum++) {
    let nombre = sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cEst})];
    if (
      nombre === null ||
      typeof nombre === 'undefined' ||
      typeof nombre.v === 'undefined'
    ) {
      console.log(TAG, `Se imprimio hasta la fila ${rowNum - 1}`);
      break;
    }
    // console.log(TAG,nombre.v+' ' + rowNum-1);

    extraerFila(sheet, rowNum);
  }
};

let agregarPorReferencia = async function(pago) {
  if (pago._id === null) {
    return pago;
  }
  return await Pago.findOne({referencia: pago.referencia})
    .then(found => {
      if (found) {
        console.log(TAG, found);
        return found;
      } else {
        Pago.create(pago, (err, creado) => {
          return creado;
        }).catch(err => console.error(err));
      }
    })
    .catch(err => console.error(err));
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
  let fechaPago = sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cDate})].w;
  console.log(TAG, `fechaPago:${fechaPago}`);
  fechaPago =
    fechaPago === '-' || fechaPago === ''
      ? new Date(Date.UTC(2001, 0, 0, 0, 0, 0))
      : fechaPago;
  let pago = {
    banco: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cBanco})].v,
    referencia: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cRef})].v,
    fecha: dateUtil.parseDate(fechaPago),
    monto: sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cMonto})].v,
  };
  console.log(TAG, `pago.fecha:${pago.fecha}`);
  console.log(TAG, `Extraer Pago| ${pago.fecha}`);
  return pago;
};

let extraerEstudiante = function(sheet, rowNum, colNombre, n) {
  console.log(TAG, `EXTRAER ESTUDIANTE DE FILA ${rowNum}`);
  let sheetGrupo = sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cGrupo})].v;
  let sheetInstr = sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cInstr})].v;
  if (typeof n === 'number') {
    let estudiante = {
      nombre: '',
      apellido: '',
      email: '-',
      tlf: '-', //sheet[XLSX.utils.encode_cell({r: rowNum, c: eCol.cCedula})].v,
      grupo:
        regex.extraerPosibleColumnaMultiple(sheetGrupo)[n] || 'Sin Determinar',
      instrumento:
        regex.extraerPosibleColumnaMultiple(sheetInstr)[n] || 'Sin Determinar',
      pago: [],
    };
    if (!esParteDelGrupo(estudiante.grupo)) {
      estudiante.grupo = 'Sin Determinar';
    }
    estudiante = regex.extraerNombreApellido(colNombre[n], estudiante);
    return estudiante;
  } else {
    let estudiante = {
      nombre: '',
      apellido: '',
      email: '-',
      tlf: '-',
      grupo: sheetGrupo,
      instrumento: sheetInstr,
      pago: [],
    };
    estudiante = regex.extraerNombreApellido(colNombre, estudiante);
    return estudiante;
  }
};

module.exports = {
  extraerFila: extraerFila,
  extraerTodasFilas: extraerTodasFilas,
  extraerPago: extraerPago,
  agregarPorReferencia: agregarPorReferencia,
};
