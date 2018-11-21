const express = require('express'),
  path = require('path'),
  app = express(),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  favicon = require('serve-favicon');
  cors = require('cors'),
  seed=require('./seeds');
const {
  PagosRoutes,
  EstudiantesRoutes,
  PadresRoutes,
  MainRoutes
} =require('./routes');

const  originsWhitelist=[
  'http://localhost:4200',
  'http://192.168.1.141:4200',
  'http://productionurl.com'
]
let corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
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
  app.use(cors(corsOptions));
  app.use(favicon(path.join(__dirname, 'public', 'resources', 'favicon.ico')));
  // Add headers
  
  // seed();
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
