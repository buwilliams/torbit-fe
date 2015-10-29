var app = angular.module('torbitFeApp');

app.controller('SignOnCtrl', function($scope, $http, $location, Config) {

  $scope.email = 'admin@torbit.com';
  $scope.password = 'torbit';
  $scope.errorMessage = '';
  $scope.statusMessage = '';

  $scope.signon = function() {
    $scope.statusMessage = '';
    $http.post(Config.serverUrl + '/login', { 'email': $scope.email, 'password': $scope.password })
      .then(function(httpData) {
        $location.path('/home');
      },
      function(httpData) {
        if(httpData.status === 401) {
          $scope.errorMessage = 'Invalid email or password. Try again.';
        } else {
          $scope.errorMessage = 'Server error (status code: '+httpData.status+'). Try again.';
        }
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
