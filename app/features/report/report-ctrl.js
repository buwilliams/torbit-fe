var app = angular.module('torbitFeApp');

app.controller('ReportCtrl', function($scope, ReportFactory) {

  $scope.data = ReportFactory.data;
  $scope.options = ReportFactory.options;
  $scope.days = '';

  $scope.getReport = function() {
    if($scope.days === '') {
      ReportFactory.getData();
    } else {
      ReportFactory.getData($scope.days);
    }
  };

});
