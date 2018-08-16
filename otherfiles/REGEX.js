//TODO EL Programa va a preferir pensar que tiene dos nombres y un apellido a dos apellidos y un nombre
function extraerNombreApellido(texto) {
  let estudiante = {nombre: '', apellido: ''};
  // let result = /[A-W]\w+/g[Symbol.match](texto);
  if (/-/.test(texto)) {
    estudiante.nombre = "Desconocido";
    estudiante.apellido = "Desconocido";
  } else if (/,/g.test(texto)) {
    let result = /[^,]+/g[Symbol.match](texto);
    estudiante.apellido = result[0];
    estudiante.nombre = result[1];
  } else {
    let result = (/[^\s]+/g[Symbol.match](texto));
    // result
    if (result && result.length === 2) {
      estudiante.nombre = result[0];
      estudiante.apellido = result[1];
    } else if (result && result.length === 3) {
      estudiante.nombre = result[0] + " " + result[1];
      estudiante.apellido = result[2];
    } else if (result && result.length === 4) {
      estudiante.nombre = result[0] + " " + result[1];
      estudiante.apellido = result[2] + " " + result[3];
    }
  }
  return estudiante;
}

function extraerPrimeraColumna(nombre) {
  if (/\//.test(nombre)) {
    let mEntreBarras = /[^\/]+/g[Symbol.match](nombre);
    mEntreBarras.forEach(function (item) {
      console.log(extraerNombreApellido(item));
    });
  }
  else {
    console.log(extraerNombreApellido(nombre))
  }
}




