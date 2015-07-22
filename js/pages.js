var myApp = angular.module('myApp', ['ngRoute'])

var baseUrl = "https://api.twitter.com/1.1/search/tweets.json?q=";
var country = "";
var favorite = "";
var retweet = "";
var location = false;
var language = false;
var date = false;

myApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
    templateUrl: 'pages/map.html',
    controller: 'HomeController'
  })
   .when('/about/', {
    templateUrl: 'pages/about.html',
    controller: 'AboutController'
  })
   .when('/data/', {
    templateUrl: 'pages/data.html',
    controller: 'DataController'
  })
   .when('/links/', {
    templateUrl: 'pages/links.html',
    controller: 'LinkController'
  })
   .when('/twittermap/', {
    templateUrl: 'pages/maps.html',
    controller: 'MapController'
  })
})

myApp.controller('HomeController', function($scope, $http){
  //url encode this
    $scope.query = "";
    $scope.latitude = "";
    $scope.longitude = "";
    $scope.radius = "";
    $scope.langs = "";
    $scope.country = "";
    $scope.date = "2015-07-";
    $scope.favorite = "";
    $scope.retweet = "";
    $scope.locationShow = false;
    $scope.langsShow = false;
    $scope.countryShow = false;
    $scope.dateShow = false;
    $scope.favoriteShow = false;
    $scope.retweetShow = false;
    $scope.miles = ["1", "5", "10", "20", "50", "100", "1000", "10,000"];

    $scope.isDisabled = function(a,b,c,d,e,f){
      return (a ||
        $scope.locationShow && b || 
        $scope.locationShow && c ||
        $scope.dateShow && d || 
        $scope.favoriteShow && e ||
        $scope.retweetShow && f);
    }

    $scope.ajaxCall = function(){
      var query = $scope.query;

      //form query
      if($scope.locationShow){
        var location = true;
        query += "&geocode=" + $scope.latitude + "," + 
          $scope.longitude + "," + $scope.radius + "mi";
      }
      if($scope.langsShow){
        var language = true;
        query += "&lang=" + $scope.langs;
      }
      if($scope.dateShow){
        var date = true;
        query += "&until=" + $scope.date;
      }

      //expose desired variables
      if($scope.countryShow){
        country = $scope.country;
      }
      if($scope.favoriteShow){
      favorite = $scope.favorite;
      }
      if($scope.retweetShow){
        retweet = $scope.retweet;
      }

      /*
      var formattedURL = encodeURIComponent(query);
      $http.get(baseUrl + formattedURL).success(function(response){
            console.log(response);
        });
      */
    }
    //loadMap();
})

myApp.controller('AboutController', function($scope){
  $scope.about = "Here's some information about this page."
})

myApp.controller('DataController', function($scope){
  $scope.dat = "List of Data"
})

myApp.controller('LinkController', function($scope){
  $scope.lnk = "List of Links"
})

myApp.controller('MapController', function($scope){
  $scope.twitterMap = "Twitter Map"
})


