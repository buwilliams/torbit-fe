var app = angular.module('torbitFeApp');

app.factory('UsersFactory', function($http, Config, $u) {
  var factory = {};

  factory.data = {
    'users': []
  };

  // Gets the full list of users
  factory.getUsers = function(successFn, errorFn) {
    $http.get(Config.serverUrl + '/users')
      .then(function(httpData) {
        $u.overwrite(factory.data.users, httpData.data);
        if(!_.isUndefined(successFn)) {
          successFn(httpData.data);
        }
      }, function(httpData) {
        if(!_.isUndefined(errorFn)) {
          errorFn(httpData);
        }
      });
  };

  // Serves for editing and creating users
  factory.updateUser = function(user, successFn, errorFn) {
    $http.post(Config.serverUrl + '/user', user)
      .then(function(httpData) {
        var user = $u.find(factory.data.users, { email: httpData.data.email });
        if(!_.isUndefined(user)) {
          $u.overwrite(user, httpData.data);
        } else {
          factory.data.users.push(httpData.data);
        }
        if(!_.isUndefined(successFn)) {
          successFn(httpData.data);
        }
      }, function(httpData) {
        if(!_.isUndefined(errorFn)) {
          errorFn(httpData);
        }
      });
  };

  factory.deleteUser = function(email, successFn, errorFn) {
    var params = { 'email': email };
    $http.delete(Config.serverUrl + '/user', { params: params })
      .then(function(httpData) {
        $u.remove(factory.data.users, { email: email });
        if(!_.isUndefined(successFn)) {
          successFn(httpData.data);
        }
      }, function(httpData) {
        if(!_.isUndefined(errorFn)) {
          errorFn(httpData);
        }
      });
  };

  return factory;
});
