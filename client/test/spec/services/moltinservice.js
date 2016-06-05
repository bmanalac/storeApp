'use strict';

describe('Service: moltinService', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var moltinService;
  beforeEach(inject(function (_moltinService_) {
    moltinService = _moltinService_;
  }));

  it('should do something', function () {
    expect(!!moltinService).toBe(true);
  });

});
