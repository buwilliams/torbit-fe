var app = angular.module('torbitFeApp');

app.controller('WrapperCtrl', function($scope, $state) {

  $scope.getActive = function(name) {
    console.log($state.current.name);
    if($state.current.name === 'wrapper.' + name) {
      return 'active';
    } else {
      return '';
    }
  };

});
