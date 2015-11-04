var app = angular.module('torbitFeApp');

app.controller('UsersCtrl', function($scope, $u, UsersFactory) {

  $scope.users = [];
  $scope.newUser = {};
  $scope.createMode = { show: false };
  $scope.message = { errorTitle: '', errorDetails: '' };

  $scope.init = function() {
    $scope.refresh();
  };

  $scope.save = function(form, user) {
    if(form.$invalid) { return; } // don't submit form if there are validation errors
    $scope.clearMessage();
    UsersFactory.updateUser(user, $scope.saveSuccess, $scope.saveError);
  };

  $scope.saveSuccess = function(updatedUser) {
    $scope.createMode.show = false;
    $scope.users.push(updatedUser);
  };

  $scope.saveError = function(httpResponse) {
    $scope.setMessage('Server Error', httpResponse.data);
  };

  $scope.delete = function(user) {
    if(!$scope.getConfirmation('Are you sure you want to delete '+user.email+'?')) { return; }
    $scope.clearMessage();
    UsersFactory.deleteUser(user.email,
      function() { // success
        $scope.deleteSuccess(user.email);
      }, $scope.deleteError);
  };

  $scope.deleteSuccess = function(email) {
    $u.remove($scope.users, { email: email });
  };

  $scope.deleteError = function(httpResponse) {
    $scope.setMessage('Server Error', httpResponse.data);
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

  // Put into it's own function so that it's mockable
  // in our unit tests
  $scope.getConfirmation = function(message) {
    return confirm(message);
  };

  (function() { $scope.init(); })();

});
