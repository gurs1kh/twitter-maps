var map;
var circles;
var radius;

$(function() {
	map = L.map("map");
	map.setView([40, 30], 2);
	var layer = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map);
	var query = {
		q: "the",
		location: {
			coordinates: [0, 0],
			radius: "4000mi"
		},
		lang: null,
		date: null,
		country: null,
		retweets: 0,
		favorites: 0
	}
	search(query);
});

function search(query) {
	console.log(query);
	if (circles) {
		circles.forEach(function(circle) {
			map.removeLayer(circle);
		});
		circles = null;
	}
	
	var geocode;
	
	if (query.location && query.location.coordinates && query.location.radius) {
		geocode = query.location.coordinates[0] + "," 
				+ query.location.coordinates[1] + ","
				+ query.location.radius;
		if (geocode.substring(0,2) == ",,") geocode = null;
	}
	$.ajax({
		 url:'../services/getData.php',
		 data: {q: query.q, geocode: geocode, lang: query.lang, until: query.date},
		 type: "get",
		 dataType:"json",
		 success: function(data) {
			populateMap(data, query);
		 }
	});
};

function populateMap(data, query) {
	circles = new Array();
	console.log(data);
	var count = 0;
	radius = 100000;
	data.statuses.map(function(d){
		if (d.geo && d.geo.coordinates
		 && d.place && (!query.country || (query.country && d.place.country_code == query.country))
		 && (!query.retweets || (query.retweets && d.retweet_count >= query.retweets))
		 && (!query.favorites || (query.favorites && d.favorite_count >= query.favorites))) {
			var circle = new L.circle(d.geo.coordinates, radius, {color:'#55acee', fillColor:'white', fillOpacity:0.8, weight:5}).addTo(map);
			circles.push(circle);
			circle.selected = false;
			if (count < 1) {
				var info;
				$.ajax({
					url:'../services/getEmbeddedTweet.php',
					data: {id : d.id_str},
					type: "get",
					dataType:"json",
					success: function(tweet) {
						info = tweet.html;
						console.log(tweet);
						circle.bindPopup(info);
					}
				});
			}
			count++;
			
			var popup = L.popup()
				.setLatLng([d.geo.coordinates[0] + 0.7, d.geo.coordinates[1]])
				.setContent(d.user.name);
			
			circle.on("click", function(e) {
				$('#info').html(info);
				circles.forEach(function(c) { c.setRadius(radius); c.selected = false; });
				circle.setRadius(radius * 3);
				circle.selected = true;
			}).on('mouseover', function (e) {
				circle.setRadius(radius * 3);
				popup.openOn(map);
			}).on('mouseout', function (e) {
				circle.setRadius(e.target.selected ? radius * 3 : radius);
				popup._close();
			});
		}
	});
	handleZoom(circles);
}

function handleZoom(circles) {
	var myZoom = {
	  start:  map.getZoom(),
	  end: map.getZoom()
	};

	map.on('zoomstart', function(e) {
	   myZoom.start = map.getZoom();
	});

	map.on('zoomend', function(e) {
		myZoom.end = map.getZoom();
		var diff = myZoom.start - myZoom.end;
		if (diff > 0) {
			radius *= 2;
			circles.forEach(function(circle) {  circle.setRadius(circle.getRadius() * 2); });
		} else if (diff < 0) {
			radius /= 2;
			circles.forEach(function(circle) { circle.setRadius(circle.getRadius() / 2); });
		}
	});
}