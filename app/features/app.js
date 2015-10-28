'use strict';

var app = angular.module('torbitFeApp', [
  'ngCookies',
  'ngResource',
  'ngRoute'
]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'features/main/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .otherwise({
      redirectTo: '/'
    });
});
