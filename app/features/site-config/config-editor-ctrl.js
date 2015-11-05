var app = angular.module('torbitFeApp');

app.controller('ConfigEditorCtrl', function($scope, $u, $state, SiteConfigFactory) {

  $scope.config = {};
  $scope.message = { errorTitle: '', errorDetails: '' };

  $scope.init = function() {
    var id = $state.params.configId;
    var config = SiteConfigFactory.getConfig(id);
    if(_.isUndefined(config)) {
      $state.go('wrapper.config');
      return;
    }
    var angularConfig = SiteConfigFactory.configToAngular(config);
    $u.overwrite($scope.config, angularConfig);
  };

  $scope.save = function() {
    $scope.clearMessage();
    var config = SiteConfigFactory.angularToConfig($scope.config);
    if(_.isUndefined(config.id)) {
      SiteConfigFactory.createConfig(config, $scope.saveSuccess, $scope.saveError);
    } else {
      SiteConfigFactory.updateConfig(config, $scope.saveSuccess, $scope.saveError);
    }
  };

  $scope.saveSuccess = function() {
    $state.go('wrapper.config');
  };

  $scope.saveError = function(httpResponse) {
    $scope.setMessage('Error Saving', httpResponse.data);
  };

  $scope.cancel = function() {
    $state.go('wrapper.config');
  };

  $scope.addScript = function() {
    $scope.config.scripts.push({ 'value': ''});
  };

  $scope.removeScript = function(index) {
    $scope.config.scripts.splice(index, 1);
  };

  $scope.addRedirect = function() {
    $scope.config.redirects.push({
      'key': '',
      'value': ''
    });
  };

  $scope.removeRedirect = function(index) {
    $scope.config.redirects.splice(index, 1);
  };

  $scope.addRewriteRule = function() {
    $scope.config.rewriterule.push({
      'key': '',
      'ruleKey': '',
      'ruleValue': ''
    });
  };

  $scope.removeRewriteRule = function(index) {
    $scope.config.rewriterule.splice(index, 1);
  };

  $scope.setMessage = function(title, details) {
    $scope.message.errorTitle = title;
    $scope.message.errorDetails = details;
  };

  $scope.clearMessage = function() {
    $scope.message.errorTitle = '';
    $scope.message.errorDetails = '';
  };

  (function() { $scope.init(); })();

});
