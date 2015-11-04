var app = angular.module('torbitFeApp');

app.controller('UsersCtrl', function($scope, $u, UsersFactory) {

  $scope.users = [];
  $scope.newUser = {};
  $scope.createMode = { show: false };
  $scope.message = { errorTitle: '', errorDetails: '' };

  $scope.init = function() {
    $scope.refresh();
  };

  $scope.save = function(mode, form, user) {
    $scope.clearMessage();
    if(form.$invalid) { return; } // don't submit form if there are validation errors
    UsersFactory.updateUser(user,
      function(updatedUser) { // success
        mode.show = false;
        $scope.users.push(updatedUser);
      },
      function(httpResponse) { // error
        $scope.setMessage('Server Error', httpResponse.data);
      });
  };

  $scope.delete = function(user) {
    $scope.clearMessage();
    if(!confirm('Are you sure you want to delete '+user.email+'?')) { return; }
    UsersFactory.deleteUser(user.email,
      function() { // success
        $u.remove($scope.users, { email: user.email });
      },
      function() { // error
        $scope.setMessage('Server Error', 'Unabled to delete this user.');
      });
  };

  $scope.refresh = function() {
    $scope.clearMessage();
    UsersFactory.getUsers(function() {
      var clonedUsers = angular.copy(UsersFactory.data.users);
      $u.overwrite($scope.users, clonedUsers);
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

  $scope.boolToStr = function(bool) {
    return bool ? 'true' : 'false';
  };

  $scope.setMessage = function(title, details) {
    $scope.message.errorTitle = title;
    $scope.message.errorDetails = details;
  };

  $scope.clearMessage = function() {
    $scope.message.errorTitle = '';
    $scope.message.errorDetails = '';
  };

  (function() { $scope.init(); })();

});
