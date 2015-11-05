describe('SiteConfigFactory', function() {
  var $httpBackend, Config, Factory;

   // Set up the module
  beforeEach(module('torbitFeApp'));

  // Noop the ui.router since it will attempt to make
  // additional http requests for templates
  beforeEach(module('uiRouterNoop'));

  // Users Fixture
  beforeEach(module('fixture/siteConfig.json'));
  beforeEach(module('fixture/ngSiteConfig.json'));

  beforeEach(inject(function($injector) {
    Config = $injector.get('Config');
    Factory = $injector.get('SiteConfigFactory');
    $httpBackend = $injector.get('$httpBackend');
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('configToAngular', function() {

    var fixtureNgSiteConfig, fixtureSiteConfig;

    beforeEach(inject(function(_fixtureSiteConfig_, _fixtureNgSiteConfig_) {
      fixtureSiteConfig = _fixtureSiteConfig_;
      fixtureNgSiteConfig = _fixtureNgSiteConfig_;
    }));

    it('should transform siteConfig fixture into ngSiteConfig fixture', function() {
      var result = Factory.configToAngular(fixtureSiteConfig);
      expect(result).toEqual(fixtureNgSiteConfig);
    });

  });

  describe('configToAngular', function() {

    var fixtureNgSiteConfig, fixtureSiteConfig;

    beforeEach(inject(function(_fixtureSiteConfig_, _fixtureNgSiteConfig_) {
      fixtureSiteConfig = _fixtureSiteConfig_;
      fixtureNgSiteConfig = _fixtureNgSiteConfig_;
    }));

    it('should transform siteConfig fixture into ngSiteConfig fixture', function() {
      var result = Factory.angularToConfig(fixtureNgSiteConfig);
      expect(result).toEqual(fixtureSiteConfig);
    });

  });

});
