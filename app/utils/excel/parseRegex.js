//TODO EL Programa va a preferir pensar que tiene dos nombres y un apellido a dos apellidos y un nombre
exports.extraerNombreApellido = function (texto, e) {
  if (e == null) {
    let e = {nombre: '', apellido: ''}
  }
  let conEspacios = /[^\s]+/g;
  let desconocido = /-/;
  let conComaSeparadora = /,/g;

  if (desconocido.test(texto)) {
    e.nombre = "Desconocido";
    e.apellido = "Desconocido";
  } else if (conComaSeparadora.test(texto)) {
    let result = /[^,]+/g[Symbol.match](texto);
    e.apellido = result[0];
    e.nombre = result[1];
  } else {
    let result = (conEspacios[Symbol.match](texto));
    // result
    if (result && result.length === 2) {
      e.nombre = result[0];
      e.apellido = result[1];
    } else if (result && result.length === 3) {
      e.nombre = result[0] + " " + result[1];
      e.apellido = result[2];
    } else if (result && result.length === 4) {
      e.nombre = result[0] + " " + result[1];
      e.apellido = result[2] + " " + result[3];
    }
  }
  if (e.grupo && (e.grupo === "-" || e.grupo === "")) {
    e.grupo = "Sin Determinar";
  }
  return e;
};

/*extraerPosibleColumnaMultiple
*@params
* texto que va a ser revisado para ver si tiene mas de un elemento
* @return
*
* */
exports.extraerPosibleColumnaMultiple = function (texto) {
  if (/\//.test(texto)) {
    return /[^\/]+/g[Symbol.match](texto);
  } else {
    // console.log(extraerNombreApellido(nombre))
    // console.log(nombre);
    return texto;
  }
};





