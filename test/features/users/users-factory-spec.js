describe('UsersFactory', function() {
  var $httpBackend, Config, Factory;

   // Set up the module
  beforeEach(module('torbitFeApp'));

  // Noop the ui.router since it will attempt to make
  // additional http requests for templates
  beforeEach(module('uiRouterNoop'));

  // Users Fixture
  beforeEach(module('fixture/users.json'));

  beforeEach(inject(function($injector) {
    Config = $injector.get('Config');
    Factory = $injector.get('UsersFactory');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('getUsers', function() {

    var fixture, usersRequestHandler;

    beforeEach(inject(function(_fixtureUsers_) {
      fixture = _fixtureUsers_;
      usersRequestHandler = $httpBackend.when('GET',
        Config.serverUrl + '/users').respond(fixture);
    }));

    it('should make the call to /users api', function() {
      $httpBackend.expectGET(Config.serverUrl + '/users');
      Factory.getUsers();
      $httpBackend.flush();
    });

    it('should load user fixture', function() {
      expect(fixture[0].email).toEqual('admin@torbit.com');
    });

    it('should invoke success fn', function() {
      var successFn = jasmine.createSpy();
      $httpBackend.expectGET(Config.serverUrl + '/users');
      Factory.getUsers(successFn);
      $httpBackend.flush();
      expect(successFn).toHaveBeenCalled();
    });

    it('should invoke error fn', function() {
      usersRequestHandler.respond(500);
      var successFn = jasmine.createSpy();
      var errorFn = jasmine.createSpy();
      $httpBackend.expectGET(Config.serverUrl + '/users');
      Factory.getUsers(successFn, errorFn);
      $httpBackend.flush();
      expect(successFn).not.toHaveBeenCalled();
      expect(errorFn).toHaveBeenCalled();
    });

  });

  describe('updateUser', function() {

    var fixture, userRequestHandler;

    beforeEach(inject(function(_fixtureUsers_) {
      fixture = _fixtureUsers_;
      userRequestHandler = $httpBackend.when('POST',
        Config.serverUrl + '/user').respond(fixture);
    }));

    it('should make the call to /user api as POST', function() {
      $httpBackend.expectPOST(Config.serverUrl + '/user');
      Factory.updateUser({});
      $httpBackend.flush();
    });

    it('should invoke success fn', function() {
      var successFn = jasmine.createSpy();
      $httpBackend.expectPOST(Config.serverUrl + '/user');
      Factory.updateUser({}, successFn);
      $httpBackend.flush();
      expect(successFn).toHaveBeenCalled();
    });

    it('should invoke error fn', function() {
      userRequestHandler.respond(500);
      var successFn = jasmine.createSpy();
      var errorFn = jasmine.createSpy();
      $httpBackend.expectPOST(Config.serverUrl + '/user');
      Factory.updateUser({}, successFn, errorFn);
      $httpBackend.flush();
      expect(successFn).not.toHaveBeenCalled();
      expect(errorFn).toHaveBeenCalled();
    });

  });

  describe('deleteUser', function() {

    var fixture, userRequestHandler, emailAddress = 'test@test.com';

    beforeEach(inject(function(_fixtureUsers_) {
      fixture = _fixtureUsers_;
      userRequestHandler = $httpBackend.when('DELETE',
        Config.serverUrl + '/user?email='+emailAddress).respond(fixture);
    }));

    it('should make the call to /user api as DELETE', function() {
      $httpBackend.expectDELETE(Config.serverUrl + '/user?email='+emailAddress);
      Factory.deleteUser(emailAddress);
      $httpBackend.flush();
    });

    it('should invoke success fn', function() {
      var successFn = jasmine.createSpy();
      $httpBackend.expectDELETE(Config.serverUrl + '/user?email='+emailAddress);
      Factory.deleteUser(emailAddress, successFn);
      $httpBackend.flush();
      expect(successFn).toHaveBeenCalled();
    });

    it('should invoke error fn', function() {
      userRequestHandler.respond(500);
      var successFn = jasmine.createSpy();
      var errorFn = jasmine.createSpy();
      $httpBackend.expectDELETE(Config.serverUrl + '/user?email='+emailAddress);
      Factory.deleteUser(emailAddress, successFn, errorFn);
      $httpBackend.flush();
      expect(successFn).not.toHaveBeenCalled();
      expect(errorFn).toHaveBeenCalled();
    });

  });

});
