var http = require('http'),
	  httpServer = require('http-server'),
    httpProxy = require('http-proxy'),
    colors = require('colors'),
    url = require('url'),
    lib = require('./lib/stuff');


// 
// Using http-server to serve static files, custom logic goes through proxy
// 
var port = 8001,
    host = 'localhost',
    log = console.log,
    requestLogger;

requestLogger = function(req) {  
  log('[%s] "%s %s"', (new Date).toUTCString(), req.method.cyan, req.url.magenta);  
}

var staticServer = httpServer.createServer({logFn: requestLogger});
  staticServer.listen(port, host, function() {
    log('Starting up http-server, serving '.yellow
      + staticServer.root.cyan
      + ' on port: '.yellow
      + port.toString().cyan);
    log('Hit CTRL-C to stop the server'.red);    
  });
//
// Create a proxy server with custom application logic
//

var proxy = httpProxy.createProxyServer({});
var proxyRouter = {
    '/api/getservers': lib.getServers
    };    

var server = require('http').createServer(function(req, res) {
  var query = url.parse(req.url).pathname;
  typeof proxyRouter[query] === 'function' 
  ? proxyRouter[query](req, res) 
  : proxy.web(req, res, { target: 'http://localhost:8001' })  
});

server.listen(8000);

