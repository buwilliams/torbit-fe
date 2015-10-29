var app = angular.module('torbitFeApp', [
  'ngCookies',
  'ngResource',
  'ngRoute'
]);

// Global App Config
app.constant('Config', {
  serverUrl: 'http://166.78.104.55',
  clientId: '860dc32cb99cfbd85ea19b49f448371036be8770'
});

app.config(function ($routeProvider, $httpProvider, Config) {

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

  // Allow cookie to be stored from remote server
  $httpProvider.defaults.withCredentials = true;

  // Configures the format used in the body of POST
  $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
    var key, result = [];
    if (typeof data === "string") {
      return data;
    }
    for (key in data) {
      if (data.hasOwnProperty(key)) {
        result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
      }
    }
    return result.join("&");
  });

  // Add X-User-Id to all requests so that the backend
  // server can know which client application is calling it
  $httpProvider.interceptors.push(function($location) {
    return {
      'request': function(config) {
        config.headers['X-User-Id'] = Config.clientId;
        return config;
      },
      'responseError': function(response) {
        if(response.status === 401) {
          $location.path('/signon');
        }
        return response;
      }
    };
  });
});
