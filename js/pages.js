var myApp = angular.module('myApp', ['ngRoute'])

myApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
    templateUrl: 'pages/maps.html',
    controller: 'MapsController'
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
})

myApp.controller('MapsController', function($scope){
  $scope.number = 10;
  loadMap();
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

$('p').on('click', function() {
  $(this).remove()
})