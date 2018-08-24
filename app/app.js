const express = require('express'),
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    seedDB = require("./seeds"),
    cookieParser = require('cookie-parser'),
    favicon = require('serve-favicon');

// configure dotenv
require('dotenv').config();

//requiring routes
const indexRoutes = require("./routes");
// app.use(express.static(__dirname + "/public"));

// assign mongoose promise library and connect to database
mongoose.Promise = global.Promise;
const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/orcaestra';


mongoose.connect(databaseUri, {useNewUrlParser: true,})
    .then(() => {
      console.log(`Base de Datos Conectada`)
    })
    .catch(err => console.log(`Error de Conexion de Base de Datos: ${err.message}`));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(favicon(path.join(__dirname, 'public', 'resources', 'favicon.ico')));

// seedDB(); //seed the database

app.use("/", indexRoutes);


app.listen(3000, function () {
  console.log(`Servidor Node escuchando en ${process.env.IP}/:${process.env.PORT}`);
    }
);
