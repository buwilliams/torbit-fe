var app = angular.module('torbitFeApp');

app.factory('SiteConfigFactory', function($http, $u, Config) {
  var factory = {};

  factory.data = {
    configs: [],
    defaultConfig: {
      "domain": "",
      "scripts": [],
      "redirects": {},
      "rewriterule": {}
    }
  };

  factory.getConfig = function(id) {

    if(id === 'new') {
      return factory.data.defaultConfig;
    } else {
      var config = $u.find(factory.data.configs, { id: id });
      return config;
    }
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
    $http.post(Config.serverUrl + '/config', config)
      .then(function(httpData) {
        factory.data.configs.push(httpData.data);
        if(!_.isUndefined(successFn)) {
          successFn(httpData.data);
        }
      }, function(httpData) {
        if(!_.isUndefined(errorFn)) {
          errorFn(httpData);
        }
      });
  };

  factory.updateConfig = function(config, successFn, errorFn) {
    var originalConfig = $u.find(factory.data.configs, { id: config.id });
    if(_.isUndefined(config)) {
      throw('Unable to find existing config to update.');
    }
    $http.put(Config.serverUrl + '/config', config)
      .then(function(httpData) {
        $u.overwrite(originalConfig, httpData.data);
        if(!_.isUndefined(successFn)) {
          successFn(httpData.data);
        }
      }, function(httpData) {
        if(!_.isUndefined(errorFn)) {
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
        if(!_.isUndefined(errorFn)) {
          errorFn(httpData);
        }
      });
  };

  factory.configToAngular = function(config) {
    var result = {
      domain: '',
      scripts: [],
      redirects: [],
      rewriterule: []
    };

    // id and domain
    if(!_.isUndefined(config.id)) { // id is optional
      result.id = config.id;
    }
    result.domain = config.domain;

    // scripts to object array
    _.each(config.scripts, function(script) {
      result.scripts.push({
        'value': script
      });
    });

    // redirects to array
    _.each(_.keys(config.redirects), function(key) {
      result.redirects.push({
        'key': key,
        'value': config.redirects[key]
      });
    });

    // rewriterules to array and flatten
    _.each(_.keys(config.rewriterule), function(key) {
      _.each(_.keys(config.rewriterule[key]), function(ruleKey) {
        result.rewriterule.push({
          'key': key,
          'ruleKey': ruleKey,
          'ruleValue': config.rewriterule[key][ruleKey]
        });
      });
    });

    return result;
  };

  factory.angularToConfig = function(ngConf) {
    var result = {
      domain: '',
      scripts: [],
      redirects: {},
      rewriterule: {}
    };

    // id and domain
    if(!_.isUndefined(ngConf.id)) { // id is optional
      result.id = ngConf.id;
    }
    result.domain = ngConf.domain;

    // scripts to plain array
    _.each(ngConf.scripts, function(script) {
      result.scripts.push(script.value);
    });

    // expand redirects
    _.each(ngConf.redirects, function(redirect) {
      result.redirects[redirect.key] = redirect.value;
    });

    // expand rewriterules
    _.each(ngConf.rewriterule, function(rewriterule) {
      if(_.isUndefined(result.rewriterule[rewriterule.key])) {
        result.rewriterule[rewriterule.key] = {};
      }
      result.rewriterule[rewriterule.key][rewriterule.ruleKey] = rewriterule.ruleValue;
    });

    return result;
  };

  return factory;
});
