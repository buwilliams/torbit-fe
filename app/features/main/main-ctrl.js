var app = angular.module('torbitFeApp');

app.controller('MainCtrl', function($scope, $http, Config) {

  $scope.message = "Hello, world!";

  $scope.getUsers = function() {
    $http.get(Config.serverUrl + '/users')
      .then(function(httpData) {
        console.log('users', httpData);
      }, function(httpData) {
        console.error('users', httpData);
      });
  };

});
