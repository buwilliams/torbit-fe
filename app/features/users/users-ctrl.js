var app = angular.module('torbitFeApp');

app.controller('UsersCtrl', function($scope, $u, UsersFactory) {

  $scope.users = [];
  $scope.newUser = {};

  $scope.init = function() {
    $scope.refresh();
  };

  $scope.save = function(form, row) {
    if(form.$invalid) { return; } // don't submit form if there are validation errors
    console.log('form submitted', form.$error, form, row);
    return;
    //UsersFactory.updateUser(row);
  };

  $scope.cancel = function(row) {
    var originalRow = $u.find(UsersFactory.data.users, { email: row.email });
    if(!_.isUndefined(originalRow)) {
      $u.overwrite(row, originalRow);
    } else {
      // email wasn't found so assume the email address was changed
    }
  };

  $scope.cancelNewUser = function() {
    $u.empty($scope.newUser);
  };

  $scope.refresh = function() {
    UsersFactory.getUsers(function() {
      var clonedUsers = angular.copy(UsersFactory.data.users);
      $u.overwrite($scope.users, clonedUsers);
    });
  };

  $scope.boolToStr = function(bool) {
    return bool ? 'true' : 'false';
  };

  (function() { $scope.init(); })();

});
