const mongoose = require('mongoose'),
  app = require('./app'),
  db = 'mongodb://127.0.0.1/orcaestra';

// const databaseUri="mongodb://admin:ale123.@ds157522.mlab.com:57522/orcaestra"
//  process.env.MONGODB_URI || 'mongodb://localhost:27017/orcaestra';
mongoose.connect(db,{useNewUrlParser: true})
  .then(() => console.log(`Base de Datos Conectada`))
  .catch(err => {
    console.log(`Error de Conexion de Base de Datos: ${err.message}`);
    process.exit();
  });

app.listen(process.env.PORT || 3000, function() {
  console.log(
    `Servidor Node escuchando en ${process.env.IP}/:${process.env.PORT}`
  );
});
