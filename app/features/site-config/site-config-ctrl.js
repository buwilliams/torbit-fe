var app = angular.module('torbitFeApp');

app.controller('SiteConfigCtrl', function($scope, $u, $state, SiteConfigFactory) {

  $scope.showEditor = true;
  $scope.configs = [];
  $scope.newConfig = {};
  $scope.createMode = { show: false };
  $scope.message = { errorTitle: '', errorDetails: '' };

  $scope.init = function() {
    $scope.refresh();
  };

  $scope.save = function(form, config) {
    if(form.$invalid) { return; } // don't submit form if there are validation errors
    $scope.clearMessage();
    SiteConfigFactory.updateConfig(config, $scope.saveSuccess, $scope.saveError);
  };

  $scope.saveSuccess = function(updatedConfig) {
    $scope.createMode.show = false;
    $scope.configs.push(updatedConfig);
  };

  $scope.saveError = function(httpResponse) {
    $scope.setMessage('Server Error', httpResponse.data);
  };

  $scope.delete = function(config) {
    if(!$scope.getConfirmation('Are you sure you want to this config?')) { return; }
    $scope.clearMessage();
    Config.deleteConfig(config.id,
      function() { // success
        $scope.deleteSuccess(config.id);
      }, $scope.deleteError);
  };

  $scope.deleteSuccess = function(configId) {
    $u.remove($scope.configs, { id: configId });
  };

  $scope.deleteError = function(httpResponse) {
    $scope.setMessage('Server Error', httpResponse.data);
  };

  $scope.refresh = function() {
    $scope.clearMessage();
    SiteConfigFactory.getConfigs(function() {
      var clonedConfigs = angular.copy(SiteConfigFactory.data.configs);
      $u.overwrite($scope.configs, clonedConfigs);
    });
  };

  $scope.cancel = function(config) {
    var originalRow = $u.find(SiteConfigFactory.data.configs, { id: config.id });
    if(!_.isUndefined(originalRow)) {
      $u.overwrite(config, originalRow);
    }
  };

  $scope.cancelNewConfig = function() {
    $u.empty($scope.newConfig);
  };

  $scope.setMessage = function(title, details) {
    $scope.message.errorTitle = title;
    $scope.message.errorDetails = details;
  };

  $scope.clearMessage = function() {
    $scope.message.errorTitle = '';
    $scope.message.errorDetails = '';
  };

  // Put into it's own function so that it's mockable
  // in our unit tests
  $scope.getConfirmation = function(message) {
    return confirm(message);
  };

  $scope.createConfig = function() {
    $state.go('wrapper.editor', {'configId': 'new'});
  };

  (function() { $scope.init(); })();

});
