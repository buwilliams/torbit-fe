var app = angular.module('torbitFeApp', [
  'ngCookies',
  'ngResource',
  'ngRoute',
  'n3-line-chart'
]);

// Global App Config
app.constant('Config', {
  serverUrl: 'http://166.78.104.55',
  clientId: '860dc32cb99cfbd85ea19b49f448371036be8770'
});

app.config(function ($routeProvider, $httpProvider, Config) {

  // Routes
  $routeProvider
    .when('/home', {
      templateUrl: 'features/home/home.html',
      controller: 'HomeCtrl'
    })
    .when('/signon', {
      templateUrl: 'features/signon/signon.html',
      controller: 'SignOnCtrl'
    })
    .when('/report', {
      templateUrl: 'features/report/report.html',
      controller: 'ReportCtrl'
    })
    .otherwise({
      redirectTo: '/signon'
    });

  // Allow cookie to be stored from remote server
  $httpProvider.defaults.withCredentials = true;

  // Configures the format used in the body of POST or PUT
  var transformBody = function (data, headersGetter) {
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
  };

  $httpProvider.interceptors.push(function($q, $location) {
    return {
      'request': function(config) {

        // Add X-User-Id to all requests so that the backend
        // server can know which client application is calling it
        config.headers['X-User-Id'] = Config.clientId;

        // Configures the format used in the body of POST or PUT
        if(config.method === 'POST' || config.method === 'PUT') {
          config.transformRequest.unshift(transformBody);
          config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        return config;
      },
      'responseError': function(response) {
        if(response.status === 401 && response.config.url !== Config.serverUrl + '/login') {
          $location.path('/signon');
        }
        return $q.reject(response);
      }
    };
  });
});
