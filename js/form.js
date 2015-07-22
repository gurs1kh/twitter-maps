var formApp = angular.module('formApp', []);

var country = "";
var favorites = "";
var retweets = "";
var locationShow = false;
var language = false;
var date = false;

formApp.controller('formCtrl', function($scope, $http){
	//url encode this
	$scope.query = null;
	$scope.latitude = null;
	$scope.longitude = null;
	$scope.radius = null;
	$scope.lang = null;
	$scope.country = null;
	$scope.date = null;
	$scope.favorites = null;
	$scope.retweets = null;
	$scope.locationShow = false;
	$scope.langShow = false;
	$scope.countryShow = false;
	$scope.dateShow = false;
	$scope.favoritesShow = false;
	$scope.retweetsShow = false;
	$scope.miles = ["1", "5", "10", "20", "50", "100", "1000", "10,000"];
	$scope.languages = ["en", "ar"];
	$scope.countries = ["us", "uk", "ar"];

	$scope.isDisabled = function(a,b,c,d,e,f){
	  return (a ||
		$scope.locationShow && b || 
		$scope.locationShow && c ||
		$scope.dateShow && d || 
		$scope.favoritesShow && e ||
		$scope.retweetsShow && f);
	}

	$scope.submitSearch = function(){
		var radius = null;
		if ($scope.radius)
			radius = $scope.radius + "mi";
		
		var query = {
			q: $scope.query,
			location: {
				coordinates: [$scope.latitude, $scope.longitude],
				radius: radius
			},
			lang: $scope.lang,
			date: $scope.date,
			country: $scope.country,
			retweets: $scope.retweets,
			favorites: $scope.favorites
		}
		search(query);
	}
});