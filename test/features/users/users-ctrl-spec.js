describe('UsersCtrl', function() {
  var $httpBackend, $scope, $location, createController, authRequestHandler, Config;

   // Set up the module
  beforeEach(module('torbitFeApp'));

  // Noop the ui.router since it will attempt to make
  // additional http requests for templates
  beforeEach(module('uiRouterNoop'));

  // Fixtures
  beforeEach(module('fixture/createUser.json'));

  beforeEach(inject(function($injector) {
    Config = $injector.get('Config');
    $location = $injector.get('$location');
    // Get hold of a scope (i.e. the root scope)
    $scope = $injector.get('$rootScope');
    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('UsersCtrl', {'$scope' : $scope });
    };
  }));

  describe('$scope.clearMessage', function() {

    var ctrl;

    beforeEach(function() {
      ctrl = createController();
    });

    it('should clear messages', function() {
      $scope.message.errorTitle = 'foo';
      $scope.message.errorDetails = 'bar';
      $scope.clearMessage();
      expect($scope.message.errorTitle).toEqual('');
      expect($scope.message.errorDetails).toEqual('');
    });

  });

  describe('$scope.save', function() {

    var ctrl, form;

    beforeEach(function() {
      ctrl = createController();
      form = { '$invalid': false };
    });

    it('should clear messages should be invoked', function() {
      var clearMessage = jasmine.createSpy();
      $scope.clearMessage = clearMessage;
      $scope.save(form, {});
      expect(clearMessage).toHaveBeenCalled();
    });

    it('should return immediately if form is invalid', function() {
      var clearMessage = jasmine.createSpy();
      form['$invalid'] = true;
      $scope.clearMessage = clearMessage;
      $scope.save(form, {});
      expect(clearMessage).not.toHaveBeenCalled();
    });

    it('should return immediately if form is invalid', function() {
      var clearMessage = jasmine.createSpy();
      form['$invalid'] = true;
      $scope.clearMessage = clearMessage;
      $scope.save(form, {});
      expect(clearMessage).not.toHaveBeenCalled();
    });

  });

  describe('$scope.saveSuccess', function() {
    var ctrl, form;

    beforeEach(function() {
      $scope.users = [];
      ctrl = createController();
      form = { '$invalid': false };
    });

    it('should set the createMode to false', function() {
      $scope.createMode.show = true;
      $scope.saveSuccess();
      expect($scope.createMode.show).toEqual(false);
    });

    it('should set add the new user to the users array', function() {
      var emailAddress = 'test@test.com';
      $scope.createMode.show = true;
      expect($scope.users.length).toEqual(0);
      $scope.saveSuccess({email:emailAddress});
      expect($scope.users[0].email).toEqual(emailAddress);
    });

  });

  describe('$scope.saveError', function() {
    var ctrl;

    beforeEach(function() {
      ctrl = createController();
    });

    it('should invoke setMessage()', function() {
      $scope.setMessage = jasmine.createSpy();
      $scope.saveError({ data: {}});
      expect($scope.setMessage).toHaveBeenCalled();
    });

  });

  describe('$scope.delete', function() {
    var ctrl;

    beforeEach(function() {
      ctrl = createController();
    });

    it('should exit immediately if user denies confirmation', function() {
      $scope.clearMessage = jasmine.createSpy();
      $scope.getConfirmation = function(message) { return false; };
      $scope.delete({});
      expect($scope.clearMessage).not.toHaveBeenCalled();
    });

    it('should clear message if the confirmation was true', function() {
      $scope.clearMessage = jasmine.createSpy();
      $scope.getConfirmation = function(message) { return true; };
      $scope.delete({});
      expect($scope.clearMessage).toHaveBeenCalled();
    });
  });

  describe('$scope.deleteSuccess', function() {
    var ctrl, fixtureCreateUser;

    beforeEach(inject(function(_fixtureCreateUser_) {
      fixtureCreateUser = _fixtureCreateUser_;
      $scope.users = [];
      ctrl = createController();
    }));

    it('should remove existing user from $scope.users', function() {
      $scope.users.push(fixtureCreateUser);
      expect($scope.users[0].email).toEqual(fixtureCreateUser.email);
      $scope.deleteSuccess(fixtureCreateUser.email);
      expect($scope.users.length).toEqual(0);
    });

  });

  describe('$scope.deleteError', function() {
    var ctrl;

    beforeEach(function() {
      ctrl = createController();
    });

    it('should invoke setMessage()', function() {
      $scope.setMessage = jasmine.createSpy();
      $scope.deleteError({ data: {}});
      expect($scope.setMessage).toHaveBeenCalled();
    });

  });

});
