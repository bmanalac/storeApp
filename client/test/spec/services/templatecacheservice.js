'use strict';

describe('Service: templateCacheService', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var templateCacheService;
  beforeEach(inject(function (_templateCacheService_) {
    templateCacheService = _templateCacheService_;
  }));

  it('should do something', function () {
    expect(!!templateCacheService).toBe(true);
  });

});
