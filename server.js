const express = require("express");
// const store=require('./knex/store');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();
app.on('mount', function (parent) {
    console.log('Admin Mounted');
    console.log(parent); // refers to the parent app
});
app.use(favicon(path.join(__dirname, 'public', '/resources/favicon.ico')));
// support parsing of application/json type post data
app.engine('html', require('ejs').renderFile);
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public/'));

// app.use(function (req, res, next) {
//     console.log('Time: %d', Date.now());
//     console.log(JSON.stringify(req.body, null, 2));
//     next();
// });

require("./express/routes.js")(app);
const server = app.listen(3000);
