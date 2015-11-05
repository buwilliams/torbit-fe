var app = angular.module('torbitFeApp');

app.factory('SiteConfigFactory', function($http, $u, Config) {
  var factory = {};

  factory.data = {
    configs: []
  };

  factory.getConfigs = function(successFn, errorFn) {
    $http.get(Config.serverUrl + '/configs')
      .then(function(httpData) {
        $u.overwrite(factory.data.configs, httpData.data);
        if(!_.isUndefined(successFn)) {
          successFn(httpData.data);
        }
      }, function(httpData) {
        if(!_.isUndefined(errorFn)) {
          errorFn(httpData);
        }
      });
  };

  factory.createConfig = function(config, successFn, errorFn) {
    $http.put(Config.serverUrl + '/config', config)
      .then(function(httpData) {
        factory.data.configs.push(httpData.data);
        if(!_.isUndefined(successFn)) {
          successFn(httpData.data);
        }
      }, function(httpData) {
        if(!_.isUndefined(successFn)) {
          errorFn(httpData);
        }
      });
  };

  factory.updateConfig = function(config, successFn, errorFn) {
    var originalConfig = $u.find(factory.data.configs, { id: config.id });
    if(_.isUndefined(config)) {
      throw('Unable to find existing config to update.');
    }
    $http.post(Config.serverUrl + '/config', config)
      .then(function(httpData) {
        $u.overwrite(originalConfig, httpData.data);
        if(!_.isUndefined(successFn)) {
          successFn(httpData.data);
        }
      }, function(httpData) {
        if(!_.isUndefined(successFn)) {
          errorFn(httpData);
        }
      });
  };

  factory.deleteConfig = function(id, successFn, errorFn) {
    var params = { 'id': id };
    $http.delete(Config.serverUrl + '/config', { params: params })
      .then(function(httpData) {
        $u.remove(factory.data.configs, { id: id });
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
