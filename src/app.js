const express = require('express'),
  path = require('path'),
  app = express(),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  favicon = require('serve-favicon');
  seed=require('./seeds');
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
  // Add headers
  app.use(function (req, res, next) {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
	  
  
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Pass to next layer of middleware
      next();
  });
  seed();
//Routes
//   app.get('/', function(req, res){
//     res.status(200).json('hello world');
//   });

  app.use("/api/estudiantes",EstudiantesRoutes);
  app.use("/api/padres",PadresRoutes);
  app.use("/api/pagos",PagosRoutes);
  app.use('/', MainRoutes);
  return app;
};
