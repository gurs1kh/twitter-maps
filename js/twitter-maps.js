var map;
var radius;

$(function() {
	map = L.map("map");
	map.setView([40, 30], 2);
	var layer = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map);
	search("api");
});

function search(query) {
	$.ajax({
		 url:'../services/getData.php',
		 data: {q : query},
		 type: "get",
		 dataType:"json",
		 success: function(data) {
			populateMap(data);
		 }
	});
};

function populateMap(data) {
	var circles = new Array();
	var count = 0;
	radius = 100000;
	data.statuses.map(function(d){
		if (d.geo && d.geo.coordinates) {
			var circle = new L.circle(d.geo.coordinates, radius, {color:'#55acee', fillColor:'white', fillOpacity:0.8, weight:8}).addTo(map);
			circles.push(circle);
			circle.selected = false;
			if (count < 5) {
				//var circle2 = new L.circle(d.geo.coordinates, 300000, {color:'red'}).addTo(map);
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
				.setLatLng([d.geo.coordinates[0] + 0.5, d.geo.coordinates[1]])
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