const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/orcaestra';
mongoose.connect(mongoDB);
const app = require('./src/app');

app.listen(process.env.PORT || 3000, function() {
  console.log(
    `Servidor Node escuchando en ${process.env.IP}/:${process.env.PORT}`
  );
});
