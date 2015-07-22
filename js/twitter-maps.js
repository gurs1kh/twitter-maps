var map;

$(function() {
	map = L.map("map");
	map.setView([40, 30], 2);
	var layer = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map);
	
	search("api");
});

function search(query) {
	$.ajax({
		 url:'getData.php',
		 data: {q : query},
		 type: "get",
		 dataType:"json",
		 success: function(data) {
			populateMap(data, map);
		 }
	});
};

function populateMap(data, map) {
	var circles = new Array();
	var count = 0;
	data.statuses.map(function(d){
		if (d.geo && d.geo.coordinates) {
			var circle = new L.circle(d.geo.coordinates, 10000, {color:'#55acee', fillColor:'white'}).addTo(map);
			circles.push(circle);
			circle.selected = false;
			var info;
			if (count < 5) {
				//var circle2 = new L.circle(d.geo.coordinates, 1000000, {color:'red'}).addTo(map);
				$.ajax({
					 url:'getEmbeddedTweet.php',
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
				.setLatLng([d.geo.coordinates[0] + 1, d.geo.coordinates[1]])
				.setContent(d.user.name);
				
			var popup2 = L.popup()
				.setLatLng([d.geo.coordinates[0] + 1, d.geo.coordinates[1]])
				.setContent(info);
			
			circle.on("click", function(e) {
				$("#info").html(info);
				popup2.openOn(map);
				circles.map(function(c) { c.setRadius(10000); c.selected = false; });
				circle.setRadius(100000);
				circle.selected = true;
			}).on('mouseover', function (e) {
				circle.setRadius(100000);
				popup.openOn(map);
			}).on('mouseout', function (e) {
				circle.setRadius(e.target.selected ? 100000 : 10000);
				popup._close();

			});
		}
	});
}