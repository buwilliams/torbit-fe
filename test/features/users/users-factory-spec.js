describe('UsersFactory', function() {
  var $httpBackend, Config, Factory;

   // Set up the module
  beforeEach(module('torbitFeApp'));

  // Noop the ui.router since it will attempt to make
  // additional http requests for templates
  beforeEach(module('uiRouterNoop'));

  // Users Fixture
  beforeEach(module('fixture/users.json'));
  beforeEach(module('fixture/createUser.json'));

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

    var fixtureUsers, fixtureCreateUser, userRequestHandler;

    beforeEach(inject(function(_fixtureUsers_, _fixtureCreateUser_) {
      Factory.data.users = [];
      fixtureUsers = _fixtureUsers_;
      fixtureCreateUser = _fixtureCreateUser_;
      userRequestHandler = $httpBackend.when('POST',
        Config.serverUrl + '/user').respond(fixtureUsers);
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

    it('should create the user in the factory on success', function() {
      userRequestHandler.respond(200, fixtureCreateUser);
      $httpBackend.expectPOST(Config.serverUrl + '/user');
      Factory.updateUser({});
      $httpBackend.flush();
      expect(Factory.data.users[0].email).toEqual(fixtureCreateUser.email);
    });

    it('should update the user in the factory on success', function() {
      var copyFixture = angular.copy(fixtureCreateUser);
      copyFixture.name = 'Updated Name';
      Factory.data.users.push(fixtureCreateUser);
      userRequestHandler.respond(200, copyFixture);
      $httpBackend.expectPOST(Config.serverUrl + '/user');
      Factory.updateUser({});
      $httpBackend.flush();
      expect(Factory.data.users[0].email).toEqual(copyFixture.email);
    });

  });

  describe('deleteUser', function() {

    var fixtureCreateUser, userRequestHandler, emailAddress = 'test@test.com';

    beforeEach(inject(function(_fixtureCreateUser_) {
      Factory.data.users = [];
      fixtureCreateUser = _fixtureCreateUser_;
      userRequestHandler = $httpBackend.when('DELETE',
        Config.serverUrl + '/user?email='+emailAddress).respond(fixtureCreateUser);
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

    it('should remove the user from the factory data', function() {
      var copiedUser = angular.copy(fixtureCreateUser);
      copiedUser.email = emailAddress;
      Factory.data.users.push(copiedUser);
      $httpBackend.expectDELETE(Config.serverUrl + '/user?email='+emailAddress);
      Factory.deleteUser(copiedUser.email);
      $httpBackend.flush();
      expect(Factory.data.users.length).toEqual(0);
    });

  });

});
