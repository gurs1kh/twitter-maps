var myApp = angular.module('myApp', ['ngRoute'])

myApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
    templateUrl: '../templates/landing.html',
    controller: 'LandingController',
  })
   .when('/about/', {
    templateUrl: '../templates/about.html',
    controller: 'AboutController',
  })
   .when('/data/', {
    templateUrl: '../templates/data.html',
    controller: 'DataController',
  })
   .when('/links/', {
    templateUrl: '../templates/links.html',
    controller: 'LinkController',
  })
})

myApp.controller('LandingController', function($scope){
  $scope.number = 10
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