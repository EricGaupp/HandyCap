var express = require("express");
var db = require("./db/models");
var path = require("path");

var app = express();
var PORT = 8080;

app.use('/', express.static(`${__dirname}/build`));

var apiRoutes = require('./routes/apiRoutes.js');
app.use('/api', apiRoutes);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("Listening on port %s", PORT);
    });
});