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

});
