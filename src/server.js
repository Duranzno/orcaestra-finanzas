const mongoose = require('mongoose'),
  // DB = process.env.MONGODB_URI || 'mongodb://localhost:27017/orcaestra',
  IP = process.env.IP || 'localhost',
  PORT = process.env.PORT || 1234;
DB = "mongodb://duranzno:ale123@ds039778.mlab.com:39778/orcaestra-tests"
// const databaseUri="mongoDB://admin:ale123.@ds157522.mlab.com:57522/orcaestra"
//  process.env.MONGODB_URI || 'mongoDB://localhost:27017/orcaestra';
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
