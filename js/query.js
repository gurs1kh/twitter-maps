var queryApp = angular.module('queryApp', [])


queryApp.controller('queryCtrl', function($scope){
    //url encode this
    $scope.query = "";
    $scope.latitude = "";
    $scope.longitude = "";
    $scope.langs = "";
    $scope.country = "";
    $scope.date = "";
    $scope.favorite = "";
    $scope.retweet = "";

})

