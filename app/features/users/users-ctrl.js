var app = angular.module('torbitFeApp');

app.controller('UsersCtrl', function($scope, $http, Config) {

  $scope.getUsers = function() {
    $http.get(Config.serverUrl + '/users')
      .then(function(httpData) {
        console.log('users', httpData);
      }, function(httpData) {
        console.error('users', httpData);
      });
  };

});
