var app = angular.module('torbitFeApp');

app.controller('UsersCtrl', function($scope, UsersFactory) {

  UsersFactory.getUsers();
  $scope.users = UsersFactory.data.users;

  $scope.editUser = function() {
  };

  $scope.refresh = function() {
    UsersFactory.getUsers();
  };

  $scope.boolToStr = function(bool) {
    return bool ? 'true' : 'false';
  };

});
