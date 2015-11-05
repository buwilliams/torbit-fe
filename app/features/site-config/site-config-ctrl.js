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

  $scope.showNew = function() {
    $state.go('wrapper.editor', {'configId': 'new'});
  };

  $scope.showEdit = function(config) {
    $state.go('wrapper.editor', {'configId': config.id });
  };

  $scope.delete = function(config) {
    if(!$scope.getConfirmation('Are you sure you want to delete '+config.domain+'?')) { return; }
    $scope.clearMessage();
    SiteConfigFactory.deleteConfig(config.id,
      function() { // success
        $scope.deleteSuccess(config.id);
      }, $scope.deleteError);
  };

  $scope.deleteSuccess = function(configId) {
    $u.remove($scope.configs, { id: configId });
  };

  $scope.deleteError = function(httpResponse) {
    $scope.setMessage('Delete Error', httpResponse.data);
  };

  $scope.refresh = function() {
    $scope.clearMessage();
    SiteConfigFactory.getConfigs(function() {
      var clonedConfigs = angular.copy(SiteConfigFactory.data.configs);
      $u.overwrite($scope.configs, clonedConfigs);
    });
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

  (function() { $scope.init(); })();

});
