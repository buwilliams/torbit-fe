var app = angular.module('torbitFeApp', [
  'ngCookies',
  'ngResource',
  'n3-line-chart',
  'ui.router',
  'LocalStorageModule'
]);

// Global App Config
app.constant('Config', {
  serverUrl: 'http://166.78.104.55',
  clientId: '860dc32cb99cfbd85ea19b49f448371036be8770'
});

app.value('User', {});

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, Config, localStorageServiceProvider) {

  // Routes
  $stateProvider
    .state('wrapper', {
      url: '',
      templateUrl: 'features/home/wrapper.html',
      controller: 'WrapperCtrl'
    })
    .state('wrapper.home', {
      url: '/home',
      templateUrl: 'features/home/home.html',
      controller: 'HomeCtrl'
    })
    .state('wrapper.signon', {
      url: '/signon',
      templateUrl: 'features/signon/signon.html',
      controller: 'SignOnCtrl'
    })
    .state('wrapper.charts', {
      url: '/charts',
      templateUrl: 'features/charts/charts.html',
      controller: 'ChartsCtrl'
    })
    .state('wrapper.users', {
      url: '/users',
      templateUrl: 'features/users/users.html',
      controller: 'UsersCtrl'
    })
    .state('wrapper.config', {
      url: '/config',
      templateUrl: 'features/site-config/site-config.html',
      controller: 'SiteConfigCtrl'
    });

  // For any unmatched url, redirect to /index
  $urlRouterProvider.otherwise('/home');

  // Configure local storage
  localStorageServiceProvider
    .setPrefix('torbitFeApp')
    .setStorageType('sessionStorage')
    .setNotify(true, true);

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

  $httpProvider.interceptors.push(function($q, $location, AuthFactory) {
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
          AuthFactory.removeUser();
          $location.path('/signon');
        }
        return $q.reject(response);
      }
    };
  });
});

app.run(function($rootScope, $state, $location, AuthFactory) {
  $rootScope.$on('$locationChangeSuccess', function() {
    // Check Authentication and redirect to sign-on page
    // if the user isn't signed in
    if(!AuthFactory.isAuthenticated()) {
      $state.go('wrapper.signon');
      return;
    }

    // Since the wrapper state shouldn't be visited (it's just the wrapper for
    // the other states), we can redirect them to the home state. This also
    // handles the case where they didn't supply any state.
    if($location.path() === '') {
      $state.go('wrapper.home');
    }
  });
});
