const mongoose = require('mongoose'),
  IP = process.env.IP || 'localhost',
  PORT = process.env.PORT || 1234;
DB = process.env.ORCAESTRA_DB || "mongodb://duranzno:ale123@ds039778.mlab.com:39778/orcaestra-tests";
console.log(DB)
mongoose.connect(DB, { useNewUrlParser: true })
  .then(() => console.log(`Base de Datos Conectada`))
  .catch(err => {
    console.log(`Error de Conexion de Base de Datos: ${err.message}`);
    process.exit();
  });

const app = require('./app')(mongoose);
app.listen(PORT, function () {
  // console.log(process.env);
  console.log(
    `Servidor Node escuchando en http://${IP}/:${PORT}`
  );
});
