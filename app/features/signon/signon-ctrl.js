var app = angular.module('torbitFeApp');

app.controller('SignOnCtrl', function($scope) {

  $scope.email = null;
  $scope.password = null;

  $scope.signon = function() {
    console.log(new Date(), $scope.email, $scope.password);
  };

});
