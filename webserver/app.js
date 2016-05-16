var express = require('express');
var path = require('path');
var http = require('http');
var https = require('https');
var fs = require('fs');
var storyboard = require('storyboard');
var wsListener = require('storyboard/lib/listeners/wsServer');
var config = require('../serverconfig.js');


var app = express();
var server = null;
var server2 = null;
var socketServer = null;

var request = require('request');

if (config.certificate && config.certificate.key && config.certificate.cert){
  server = https.createServer(config.certificate, app);

  if(config.webServer.redirectHTTP && config.webServer.redirectPort != ''){
    server2 = http.createServer(app);
  }
}else{
	server = http.createServer(app);
}

//var server = http.createServer(app);

storyboard.addListener(wsListener);

app.use(function (req, res, next) {
  storyboard.mainStory.info('WebServer', req.ip + ' - ' + req.method + ' - ' + req.originalUrl);
  next();
});

app.use(function(req, res, next) {
  if(!req.secure && config.webServer.redirectHTTP) {
	  return res.redirect(['https://', req.hostname, ":", config.webServer.port || process.env.PORT, req.url].join(''));
  }
  next();
});

app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/pads', express.static(path.resolve(__dirname, 'public')));
app.get('/config', function(req, res) {
    res.type('application/javascript');
    res.send('var config=JSON.parse(\'{"useSSL":true,"serverPort":"443","selfHosted":true,"socketUri":"socket.pad.fuechschen.org"}\')');
});

app.get('/lounge', function(req, res){
  res.sendFile(__dirname + '/public/lounge.html');
});

app.get('/lounge/announce.json', function(req, res){
  request.get('https://musiqpad.com/lounge/announce.json', function(err, resp, body){
    if(!err && [200, 304].indexOf(resp.statusCode) !== -1) res.status(200).json(JSON.parse(body));
    else res.status(500).send('Error from MusiqPad');
  });
});

app.get('/api/room', function(req,res){
  var roomInfo = {
    "slug": config.room.slug,
    "name": config.room.name,
    "people": null,
    "queue": null,
    "media": null,
  };
  res.send(roomInfo);
});

server.listen(config.webServer.port || process.env.PORT, config.webServer.address || process.env.IP, function(){
  var addr = server.address();
  storyboard.mainStory.info('WebServer', "Listening at " + addr.address + ":" + addr.port);
});

if(server2 != null){
  server2.listen(config.webServer.redirectPort || 80, config.webServer.address || process.env.IP, function(){
    var addr2 = server2.address();
    storyboard.mainStory.info('HTTP-WebServer', "Listening at", addr2.address + ":" + addr2.port);
  });
}

var setSocketServer = function(ss){
  socketServer = ss;
};

module.exports = {app: app, server: server, server2: server2, setSocketServer: setSocketServer};
