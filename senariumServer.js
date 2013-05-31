var express = require('express')
    , path = require('path')
    , _ = require('underscore')
    , http = require('http')
    , MongoStore = require('connect-mongo')(express)
    , mongourl = require('./mongo/MongoSetup');

var app = new require('./express/ExpressSetup').ExpressSetup(express,MongoStore,mongourl,__dirname);

var mongo = new (require('./mongo/MongoRepository')).MongoRepository(mongourl);

var UserController = new (require('./controllers/UserController')).UserController(mongo,app,express);

var server = http.createServer(app);

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
