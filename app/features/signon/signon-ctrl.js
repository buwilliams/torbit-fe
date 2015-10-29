var app = angular.module('torbitFeApp');

app.controller('SignOnCtrl', function($scope, $http, Config, $location) {

  $scope.email = 'admin@torbit.com';
  $scope.password = 'torbit';
  $scope.errorMessage = '';
  $scope.statusMessage = '';

  $scope.signon = function() {
    $scope.statusMessage = 'Loading...';
    $http.post(Config.serverUrl + '/login', { email: $scope.email, password: $scope.password })
      .then(function(httpData) {
        $location.path('/home');
      },
      function(httpData) {
        $scope.errorMessage = 'Invalid email or password.';
      })
      .finally(function() {
        $scope.statusMessage = '';
      });
  };

  $scope.$watch('email', function() {
    $scope.errorMessage = '';
  });

  $scope.$watch('password', function() {
    $scope.errorMessage = '';
  });

});
