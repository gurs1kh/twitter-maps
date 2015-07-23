var myApp = angular.module('myApp', ['ngRoute'])

var baseUrl = "https://api.twitter.com/1.1/search/tweets.json?q=";
var country = "";
var favorite = "";
var retweet = "";
var locationShow = false;
var language = false;
var date = false;

myApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
    templateUrl: 'pages/home.html'
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


