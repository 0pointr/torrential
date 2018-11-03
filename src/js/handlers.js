const url = require('url');
const query = require('querystring');

const { addTorrentURL } = require('./transmission-client.js');
const { torrentSearch } = require('./init-torrent-search.js');
const { render } = require('./renderer.js');
const { static } = require('./static-file-handler.js');

module.exports = { handleRequest };

let asyncHandlers = new Set([ 'search', 'static', 'root', ]);
function handleRequest(req, res) {
    let path = url.parse(req.url).pathname;
	let handler = handlerResolver(path);
    handler(req, res);
	if (!asyncHandlers.has(handler.name)) end(res);
}

function handlerResolver(path) {
	switch (path) {
		case '/':
		case '':
			return root;

		case '/search':
			return search;

		case '/download':
			return download;

		default:
            return static;
//			return _404;
	}
}

function write200(res, headers) {
	headers = headers || {};
	writeHeaders(res, 200, Object.assign({}, {'Content-Type': 'text/html; charset=UTF-8'}, headers));
}

function writeHeaders(res, code, headerPairs={}) {	
	res.writeHead(code, headerPairs);
}

function end(res) { res.end(); }

function _404(req, res) {
	writeHeaders(res, 403);
	res.write("<h3>Page not found</h3>");
	end(res);
}

function root(req, res) {
	write200(res);
    render('home').then( resolved => { res.write(resolved); end(res); },
                         error => console.log(err));
}

function search(req, res) {
	let qParams = query.parse(url.parse(req.url).query);
	let q = qParams['q'];

	write200(res);
	if (!q) { end(res); return; }

	function writeResults(results) {
        render('search_results', {query: q, results})
        .then(resolved => { res.write(resolved); end(res); },
              error => console.log(err));
	}

	torrentSearch.search(q, 'All', 10)
		.then(function(results) { 
			console.log('results: ', results);
			writeResults(results);
		},
		      function(err) { console.log(err); end(res); }
		);
}

function download(req, res) {
	let qParams = query.parse(url.parse(req.url).query);
	let magnetUrl = qParams['magnetUrl'];

	write200(res);
	addTorrentURL(magnetUrl);
	res.write('<p>Download started</p>');
}
