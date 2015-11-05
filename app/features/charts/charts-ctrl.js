var app = angular.module('torbitFeApp');

app.controller('ChartsCtrl', function($scope, ChartsFactory) {

  $scope.data = ChartsFactory.data;
  $scope.options = ChartsFactory.options;
  $scope.days = '';

  $scope.init = function() {
    $scope.getTimeSeriesChart();
  };

  $scope.getTimeSeriesChart = function() {
    if($scope.days === '') {
      ChartsFactory.getData();
    } else {
      ChartsFactory.getData($scope.days);
    }
  };

  (function() { $scope.init(); })();

});
