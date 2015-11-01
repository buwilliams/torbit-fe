var app = angular.module('torbitFeApp');

app.controller('WrapperCtrl', function($scope, $state, User, AuthFactory) {

  AuthFactory.getUser();
  $scope.user = User;
  $scope.isAuth = AuthFactory.isAuthenticated;

  $scope.getActive = function(name) {
    if($state.current.name === 'wrapper.' + name) {
      return 'active';
    } else {
      return '';
    }
  };

  $scope.signout = function() {
    AuthFactory.removeUser();
    $state.go('wrapper.signon');
  };

});
