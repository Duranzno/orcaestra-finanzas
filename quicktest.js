const {mongoose, Estudiante, Pago} = require("./app/models");
let rapido = new Pago(
    {
      "banco": "Fondo Comun",
      "referencia": "ZZZZ",
      "monto": "1000"
    }
);
rapido.save(
    function (err, fluffy) {
      if (err) return console.error(err);
      console.log('Guardado')
    }
);
Pago.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})
