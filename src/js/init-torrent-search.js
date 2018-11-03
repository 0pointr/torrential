const torrentSearch = require('torrent-search-api');

function init() {
	let enabled = ['Torrentz2', 'Torrent9', 'Rarbg'];
	for (let p of enabled)
		torrentSearch.enableProvider(p);
	// torrentSearch.enablePublicProviders();
	console.log(torrentSearch.getActiveProviders());
}

init();

module.exports = { torrentSearch };