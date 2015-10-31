describe('SignOnCtrl', function() {
  var $httpBackend, $scope, $location, createController, authRequestHandler, Config;

   // Set up the module
   beforeEach(module('torbitFeApp'));

   beforeEach(inject(function($injector) {
     Config = $injector.get('Config');
     $location = $injector.get('$location');
     // Get hold of a scope (i.e. the root scope)
     $scope = $injector.get('$rootScope');
     // The $controller service is used to create instances of controllers
     var $controller = $injector.get('$controller');

     // Set up the mock http service responses
     $httpBackend = $injector.get('$httpBackend');
     // backend definition common for all tests
     authRequestHandler = $httpBackend.when('POST', Config.serverUrl + '/login').respond();

     createController = function() {
       return $controller('SignOnCtrl', {'$scope' : $scope });
     };
   }));

   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  describe('$scope.signon', function() {

    it('$scope.email and password should be defaulted to torbit creds', function() {
      var ctrl = createController();
      expect($scope.email).toEqual('admin@torbit.com');
      expect($scope.password).toEqual('torbit');
    });

    it('should call the authentication server', function() {
      var ctrl = createController();
      $httpBackend.expectPOST(Config.serverUrl + '/login');
      $scope.signon();
      $httpBackend.flush();
    });

    it('should fail authentication', function() {
      authRequestHandler.respond(401, '');
      var ctrl = createController();
      $httpBackend.expectPOST(Config.serverUrl + '/login');
      $scope.signon();
      $httpBackend.flush();
      expect($scope.errorMessage).toBe('Invalid email or password. Try again.');
    });

    it('should handle server errors', function() {
      authRequestHandler.respond(500, '');
      var ctrl = createController();
      $httpBackend.expectPOST(Config.serverUrl + '/login');
      $scope.signon();
      $httpBackend.flush();
      expect($scope.errorMessage).toBe('Server error (status code: 500). Try again.');
    });

    it('should pass authentication', function() {
      authRequestHandler.respond(200, '');
      var ctrl = createController();
      $httpBackend.expectPOST(Config.serverUrl + '/login');
      $scope.signon();
      $httpBackend.flush();
      expect($location.path()).toBe('/home');
    });

  });

});
