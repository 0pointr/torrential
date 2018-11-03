let http = require('http');
let url = require('url');
let query = require('querystring');

const { handleRequest } = require('./js/handlers.js');

let server = http.createServer( (req, res) => {
    handleRequest(req, res);
});

server.listen(9000);
