var app = angular.module('torbitFeApp');

app.factory('UsersFactory', function($http, Config, $u) {
  var factory = {};

  factory.data = {
    'users': []
  };

  factory.getUsers = function(successFn, errorFn) {
    $http.get(Config.serverUrl + '/users')
      .then(function(httpData) {
        $u.overwrite(factory.data.users, httpData.data);
        if(!_.isUndefined(successFn)) {
          successFn(httpData.data);
        }
      }, function(httpData) {
        if(!_.isUndefined(successFn)) {
          errorFn(httpData);
        }
      });
  };

  return factory;
});
