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

    var fixture;

    beforeEach(inject(function(_fixtureUsers_) {
      fixture = _fixtureUsers_;
    }));

    beforeEach(function() {
      var usersRequestHandler = $httpBackend.when('GET',
        Config.serverUrl + '/users').respond({});
    });

    it('should make the call to /users api', function() {
      $httpBackend.expectGET(Config.serverUrl + '/users');
      Factory.getUsers();
      $httpBackend.flush();
    });

    it('should load user fixture', function() {
      expect(fixture[0].email).toEqual('admin@torbit.com');
    });

  });

});
