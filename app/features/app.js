var app = angular.module('torbitFeApp', [
  'ngCookies',
  'ngResource',
  'ngRoute'
]);

app.config(function ($routeProvider, $httpProvider, $provide) {

  // Global Application Settings
  var appConfig = {
    serverUrl: 'http://166.78.104.55',
    clientId: '860dc32cb99cfbd85ea19b49f448371036be8770'
  };

  // Routes
  $routeProvider
    .when('/', {
      templateUrl: 'features/main/main.html',
      controller: 'MainCtrl'
    })
    .when('/signon', {
      templateUrl: 'features/signon/signon.html',
      controller: 'SignOnCtrl'
    })
    .otherwise({
      redirectTo: '/signon'
    });

  // Add X-User-Id to all requests so that the backend
  // server can know which client application is calling it
  $httpProvider.interceptors.push(function() {
    return {
      'request': function(config) {
        config.headers['X-User-Id'] = appConfig.clientId;
        return config;
      }
    };
  });
});
