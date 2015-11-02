var app = angular.module('torbitFeApp');

app.controller('UsersCtrl', function($scope, UsersFactory) {

  UsersFactory.getUsers();
  $scope.users = UsersFactory.data.users;

});
