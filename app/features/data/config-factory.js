var app = angular.module('torbitFeApp');

app.factory('ConfigFactory', function() {

  var factory = {};

  factory.serverUrl = 'http://166.78.104.55';
  factory.clientId = '860dc32cb99cfbd85ea19b49f448371036be8770';

  return factory;
});
