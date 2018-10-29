//TODO EL Programa va a preferir pensar que tiene dos nombres y un apellido a dos apellidos y un nombre
exports.extraerNombreApellido = function(texto, e) {
  if (typeof e === 'undefined') {
    e = {nombre: '', apellido: ''};
  }
  let conEspacios = /[^\s]+/g;
  let desconocido = /-/;
  let conComaSeparadora = /,/g;

  if (desconocido.test(texto)) {
    e.nombre = 'Desconocido';
    e.apellido = 'Desconocido';
  } else if (conComaSeparadora.test(texto)) {
    let result = /[^,]+/g[Symbol.match](texto);
    e.apellido = result[0];
    e.nombre = result[1];
  } else {
    let result = conEspacios[Symbol.match](texto);
    result = parseArticulos(result);

    if (result && result.length === 2) {
      e.nombre = result[0];
      e.apellido = result[1];
    } else if (result && result.length === 3) {
      e.nombre = result[0] + ' ' + result[1];
      e.apellido = result[2];
    } else if (result && result.length === 4) {
      e.nombre = result[0] + ' ' + result[1];
      e.apellido = result[2] + ' ' + result[3];
    } else {
      console.error('NO SE SUPO QUE HACER CON EL NOMBRE');
    }
  }
  if (typeof e.grupo === 'undefined' || e.grupo === '-' || e.grupo === '') {
    e.grupo = 'Sin Determinar';
  }
  return e;

  function parseArticulos(arrayN) {
    //arrayN es el array de palabras que conforman el nombre
    //art es el articulo dentro del nombre "de" ó "del", en el caso de "de la" se trabaja internamente
    const del =
        arrayN.indexOf('del') === -1
          ? arrayN.indexOf('Del')
          : arrayN.indexOf('del'), //posicion articulo del
      de =
        arrayN.indexOf('de') === -1
          ? arrayN.indexOf('De')
          : arrayN.indexOf('de'), //posicion articulo de
      la =
        arrayN.indexOf('la') === -1
          ? arrayN.indexOf('La')
          : arrayN.indexOf('la'); //posicion articulo la
    if (de !== -1) {
      // console.log(TAG,`Hay un articulo:de en la posicion:${de}`);
      if (la !== -1) {
        // console.log(TAG,`Hay un articulo:la en la posicion:${la}`);
        arrayN[de + 2] = `${arrayN[de]} ${arrayN[la]} ${arrayN[de + 2]}`;
        arrayN.splice(la, 1);
      } else {
        arrayN[de + 1] = `${arrayN[de]} ${arrayN[de + 1]}`;
      }
      arrayN.splice(de, 1);
      return arrayN;
    } else if (del !== -1) {
      // console.log(TAG,`Hay un articulo:del en la posicion:${del}`);
      arrayN[del + 1] = `${arrayN[del]} ${arrayN[del + 1]}`;
      arrayN.splice(del, 1);
      return arrayN;
    } else {
      return arrayN;
    }
  }
};

/*extraerPosibleColumnaMultiple
*@params
* texto que va a ser revisado para ver si tiene mas de un elemento
* @return
*
* */
exports.extraerPosibleColumnaMultiple = function(texto) {
  if (/\//.test(texto))
    return /[^\/]+/g[Symbol.match](texto);
  else
    // console.log(TAG,extraerNombreApellido(nombre))
    // console.log(TAG,nombre);
    return texto;

};
