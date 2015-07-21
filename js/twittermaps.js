$(function() {
	twitterlib.search('rem', { filter: 'snapbird OR "snap bird"' }, function (tweets, options) {
		console.log(tweets);
		/*document.querySelector('#tweet').innerHTML = twitterlib.render(tweets[0]);
		alert('This is page ' + options.page + ', using filter: ' + options.filter);

		if (options.page == 1) {
			this.next(); // repeats the call
		}*/
	});
});