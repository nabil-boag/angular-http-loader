/* global describe, beforeEach, module, it, inject, jasmine, expect, console */

describe('httpMethodInterceptor', function () {
  var httpMethodInterceptor, httpMethodInterceptorProvider, mockQ,
    mockRootScope, mockRejectPromise;

  beforeEach(function () {
    mockRejectPromise = { 'foo': 'bar' };
    mockQ = jasmine.createSpyObj('$q', ['when', 'reject']);
    mockQ.reject.andReturn(mockRejectPromise);
    mockRootScope = jasmine.createSpyObj('$rootScope', ['$emit']);

    module('ng.httpLoader.httpMethodInterceptor',
      function ($provide, _httpMethodInterceptorProvider_) {
        httpMethodInterceptorProvider = _httpMethodInterceptorProvider_;
        httpMethodInterceptorProvider.whitelistDomain('foo.bar');
        $provide.value('$q', mockQ);
        $provide.value('$rootScope', mockRootScope);
      }
    );

    inject(function (_httpMethodInterceptor_) {
      httpMethodInterceptor = _httpMethodInterceptor_;
    });
  });

  it("should not broadcast the show loader event if the domain is not " +
    "on the white list", function () {
    //Arrange.
    var config = { url: 'foo.wrong' };

    //Act.
    var response = httpMethodInterceptor.request(config);

    //Assert.
    expect(mockRootScope.$emit).not.toHaveBeenCalled();
    expect(response).toBe(config);
  });

  it("should broadcast the show loader event on the request method " +
    "and return the config", function () {
    //Arrange.
    var config = { method: 'GET', url: 'foo.bar' };

    //Act.
    var response = httpMethodInterceptor.request(config);

    //Assert.
    expect(mockRootScope.$emit)
      .toHaveBeenCalledWith('loaderShow', config.method);
    expect(response).toBe(config);
  });

  it("should not broadcast the hide event if the show event " +
    "was not already fired", function () {
    //Arrange.
    var response = { config: { method: 'GET', url: 'foo.bar' } };

    //Act.
    httpMethodInterceptor.response(response);

    //Assert.
    expect(mockRootScope.$emit)
      .not.toHaveBeenCalledWith('loaderHide', response.config.method);
  });

  it("should broadcast the hide event on the response method " +
    "and return the response", function () {
    //Arrange.
    var config = { url: 'foo.bar' },
      response = { config: { method: 'GET', url: 'foo.bar' } };

    //Act.
    httpMethodInterceptor.request(config);
    var res = httpMethodInterceptor.response(response);

    //Assert.
    expect(mockRootScope.$emit)
      .toHaveBeenCalledWith('loaderHide', response.config.method);
    expect(res).toBe(response);
  });

  it("should not broadcast the hide event on the response error " +
    "if the show event was not already fired", function () {
    //Arrange.
    var response = { config: { method: 'GET', url: 'foo.bar' } };

    //Act.
    var res = httpMethodInterceptor.responseError(response);

    //Assert.
    expect(mockRootScope.$emit)
      .not.toHaveBeenCalledWith('loaderHide', response.config.method);
    expect(res).toBe(mockRejectPromise);
  });

  it("should broadcast the hide loader event on the response error method " +
    "and return the reject promise", function () {
    //Arrange.
    var config = { url: 'foo.bar' },
      response = { config: { method: 'GET', url: 'foo.bar' } };

    //Act.
    httpMethodInterceptor.request(config);
    var res = httpMethodInterceptor.responseError(response);

    //Assert.
    expect(mockRootScope.$emit)
      .toHaveBeenCalledWith('loaderHide', response.config.method);
    expect(res).toBe(mockRejectPromise);
  });

  it("should only emit the hide event once all requests have closed",
    function () {
      // Arrange.
      var res,
        config = { url: 'foo.bar' },
        response = { config: { method: 'GET', url: 'foo.bar' } };

      //Act.
      httpMethodInterceptor.request(config);
      httpMethodInterceptor.request(config);
      res = httpMethodInterceptor.response(response);

      //Assert.
      expect(mockRootScope.$emit)
        .not.toHaveBeenCalledWith('loaderHide', response.config.method);
      expect(res).toBe(response);

      //Act.
      res = httpMethodInterceptor.response(response);

      //Assert.
      expect(mockRootScope.$emit)
        .toHaveBeenCalledWith('loaderHide', response.config.method);
      expect(res).toBe(response);
    });
});
