var app = angular.module('uiRouterNoop', []);

app.service('$state', function() {
  return {
    go: function() {}
  };
});
app.service('$urlRouter', function() { return {}; });
