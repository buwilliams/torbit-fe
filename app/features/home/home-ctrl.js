var app = angular.module('torbitFeApp');

app.controller('HomeCtrl', function($scope, $http, Config, User) {

  $scope.template = 'features/home/home.html';
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
