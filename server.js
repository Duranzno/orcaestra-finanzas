const express = require("express");
// const store=require('./knex/store');
const bodyParser = require('body-parser');
const app = express();
app.on('mount', function (parent) {
    console.log('Admin Mounted');
    console.log(parent); // refers to the parent app
});
// support parsing of application/json type post data
app.engine('html', require('ejs').renderFile);
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public/'));
app.use(function (req, res, next) {
    console.log('Time: %d', Date.now());
    console.log(JSON.stringify(req.body, null, 2));
    next();
});

const server = app.listen(3000, function () {
    let port = server.address().port;
    console.log("App listening at http://192.168.1.141:%s", port)
});
require("./express/routes.js")(app);
