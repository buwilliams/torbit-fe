var app = angular.module('torbitFeApp', [
  'ngCookies',
  'ngResource',
  'ngRoute'
]);

app.config(function ($routeProvider) {
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
});
