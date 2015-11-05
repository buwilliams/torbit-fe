var app = angular.module('torbitFeApp');

app.controller('SignOnCtrl', function($scope, $http, $location, Config, AuthFactory) {

  $scope.email = 'admin@torbit.com';
  $scope.password = 'torbit';
  $scope.errorMessage = '';
  $scope.statusMessage = '';

  $scope.signon = function() {
    $scope.statusMessage = '';
    var params = { 'email': $scope.email, 'password': $scope.password };
    var strParams = $scope.paramsToRequestStr(params);
    var config = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
    $http.post(Config.serverUrl + '/login', strParams, config)
      .then(function(httpData) {
        AuthFactory.saveUser(httpData.data);
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

  $scope.paramsToRequestStr = function(data) {
    var key, result = [];
    if (typeof data === "string") {
      return data;
    }
    for (key in data) {
      if (data.hasOwnProperty(key)) {
        result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
      }
    }
    return result.join("&");
  };

  $scope.$watch('email', function() {
    $scope.errorMessage = '';
  });

  $scope.$watch('password', function() {
    $scope.errorMessage = '';
  });

});
