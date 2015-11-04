var app = angular.module('torbitFeApp');

app.controller('UsersCtrl', function($scope, $u, UsersFactory) {

  $scope.users = [];
  $scope.newUser = {};

  $scope.init = function() {
    $scope.refresh();
  };

  $scope.save = function(mode, form, user) {
    if(form.$invalid) { return; } // don't submit form if there are validation errors
    UsersFactory.updateUser(user,
      function(updatedUser) { // success
        mode = false; // does this work? doesn't appear to
        var user = $u.find($scope.users, { email: updatedUser.email });
        if(!_.isUndefined(user)) {
          $u.overwrite(user, updatedUser);
        } else {
          $scope.users.push(updatedUser);
        }
      },
      function() { // error
        alert('unable to save user');
      });
  };

  $scope.delete = function(user) {
    UsersFactory.deleteUser(user.email,
      function() { // success
        $u.remove($scope.users, { email: user.email });
      },
      function() { // error
        alert('unable to delete user');
      });
  };

  $scope.cancel = function(user) {
    var originalRow = $u.find(UsersFactory.data.users, { email: user.email });
    if(!_.isUndefined(originalRow)) {
      $u.overwrite(user, originalRow);
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
