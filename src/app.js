const express = require('express'),
  path = require('path'),
  app = express(),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  favicon = require('serve-favicon');

const {
  PagosRoutes,
  EstudiantesRoutes,
  PadresRoutes,
  MainRoutes
} =require('./routes');

// configure dotenv
require('dotenv').config();

module.exports = function (mongoose){
  mongoose.Promise = global.Promise;

// view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use('/public', express.static(path.join(__dirname, 'public')));

  app.use(favicon(path.join(__dirname, 'public', 'resources', 'favicon.ico')));

//Routes
  app.get('/', function(req, res){
    res.status(200).json('hello world');
  });

//   app.use('/', MainRoutes);
//   app.use("/api/pagos",PagosRoutes);
  // app.use("/api/estudiantes",EstudiantesRoutes);
  // app.use("/api/padres",PadresRoutes);
  return app;
};
