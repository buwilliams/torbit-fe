var app = angular.module('torbitFeApp');

app.factory('AuthFactory', function($u, User, localStorageService) {
  var factory = {};

  factory.isAuthenticated = function() {
    var user = localStorageService.get('User');
    return !_.isNull(user);
  };

  factory.getUser = function() {
    var user = localStorageService.get('User');
    if(user !== null) {
      $u.overwrite(User, user);
    }
  };

  factory.saveUser = function(user) {
    $u.overwrite(User, user);
    localStorageService.set('User', user);
  };

  factory.removeUser = function() {
    localStorageService.remove('User');
    $u.overwrite(User, {});
  };

  return factory;
});
