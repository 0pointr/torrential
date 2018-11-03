let Transmission = require('transmission');
let transmission = new Transmission({
	 host: 'localhost',
	 port: 9091,
	 username: 'dd',
	 password: 'xyz',
  	 ssl: false,
	 url: '/transmission/rpc'});

function test() {
	console.log('Status: ', transmission.status);
	console.log('ok');
}

function addTorrentURL(url) {
	transmission.addUrl(url, function(err, result) {
		if (err) console.log(err);
		else {
			console.log(result);
            return result;
		}
	});
}

function removeTorrent(id) {
    transmission.remove([id], function (err, result) {
       if (err) { console.log(err); } 
        else {
            console.log(result);
            return result;
        }
    });
}

function removeTorrentAndDeleteData(id) {
    transmission.remove([id], true, function (err, result) {
       if (err) { console.log(err); } 
        else {
            console.log(result);
            return result;
        }
    });
}

function getActiveTorrentsInfo() {
    return transmission.active(function(err, results){
        if (!err) return results;
        else console.log(err);
    });
}

function getTorrentInfoById(ids) {
    if (!Array.isArray(ids)) ids = [ids];
    transmission.get(ids, function(err, results){
        if (!err) return results;
        else console.log(err);
    });
}

function getAllTorrentsInfo() {
    transmission.get(function(err, results){
        if (!err) return results;
        else console.log(err);
    });
}

function pauseTorrent(ids) {
    if (!Array.isArray(ids)) ids = [ids];
    transmission.stop(ids, function(err, arg){});
}

function startTorrent(ids) {
    if (!Array.isArray(ids)) ids = [ids];
    transmission.start(ids, function(err, results){
        if (!err) return results;
        else console.log(err);
    });
}

function getStats() {
    transmission.sessionStats(function(err, results){
        if (!err) return results;
        else console.log(err);
    });
}

test();

module.exports = { addTorrentURL, removeTorrent, removeTorrentAndDeleteData, getActiveTorrentsInfo,
                 getTorrentInfoById, getAllTorrentsInfo, pauseTorrent, startTorrent, getStats };
