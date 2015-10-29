var app = angular.module('torbitFeApp');

app.controller('SignOnCtrl', function($scope, $http, Config) {

  $scope.email = 'admin@torbit.com';
  $scope.password = 'torbit';

  $scope.signon = function() {
    $http.post(Config.serverUrl + '/login', { email: $scope.email, password: $scope.password })
      .then(function(httpData) {
        console.log(httpData);
      },
      function(httpData) {
        console.error(httpData);
      });
  };

});
