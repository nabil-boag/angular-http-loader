/* global beforeEach, describe, expect, inject, it, waits, runs, module */

describe('Angular HTTP loader', function () {
  var elem, scope, $rootScope;

  var loaderTemplate = '<script type="text/ng-template" ' +
    'id="example-loader.tpl.html">Loading {{title}}...</script>';

  beforeEach(function () {
    module('ng.httpLoader');
  });

  function compileDirective(tpl) {
    inject(function (_$rootScope_, $compile) {
      var html = tpl + loaderTemplate;
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
      elem = $compile(html)(scope);
    });
    scope.$digest();
  }

  describe('no defined methods', function () {
    beforeEach(function () {
      compileDirective(
        '<div ng-http-loader template="example-loader.tpl.html"></div>');
    });

    it('should open and close the loader', function () {
      //Arrange.
      $rootScope.$emit('loaderShow', 'FOO');

      //Act.
      scope.$digest();

      //Assert.
      expect(elem.find('div').attr('class')).not.toContain('ng-hide');

      //Act.
      $rootScope.$emit('loaderHide', 'FOO');
      scope.$digest();

      //Assert.
      expect(elem.find('div').attr('class')).toContain('ng-hide');
    });
  });

  describe('multiple methods', function () {
    beforeEach(function () {
      compileDirective('<div ng-http-loader methods="[\'POST\', \'PUT\']" ' +
        'template="example-loader.tpl.html"></div>');
    });

    it('should open and close the loader', function () {
      //Arrange.
      $rootScope.$emit('loaderShow', 'POST');

      //Act.
      scope.$digest();

      //Assert.
      expect(elem.find('div').attr('class')).not.toContain('ng-hide');

      //Act.
      $rootScope.$emit('loaderHide', 'POST');
      scope.$digest();

      //Assert.
      expect(elem.find('div').attr('class')).toContain('ng-hide');
    });

    it('should not open the loader', function () {
      //Arrange.
      $rootScope.$emit('loaderShow', 'GET');

      //Act.
      scope.$digest();

      //Assert.
      expect(elem.find('div').attr('class')).toContain('ng-hide');
    });
  });

  describe('single method', function () {
    beforeEach(function () {
      compileDirective('<div ng-http-loader methods="GET" ' +
        'template="example-loader.tpl.html"></div>');
    });

    it('should open and close the loader', function () {
      //Arrange.
      $rootScope.$emit('loaderShow', 'GET');

      //Act.
      scope.$digest();

      //Assert.
      expect(elem.find('div').attr('class')).not.toContain('ng-hide');

      //Act.
      $rootScope.$emit('loaderHide', 'GET');
      scope.$digest();

      //Assert.
      expect(elem.find('div').attr('class')).toContain('ng-hide');
    });

    it('should not open the loader', function () {
      //Arrange.
      $rootScope.$emit('loaderShow', 'POST');

      //Act.
      scope.$digest();

      //Assert.
      expect(elem.find('div').attr('class')).toContain('ng-hide');
    });
  });

  describe('lowercase method', function () {
    beforeEach(function () {
      compileDirective('<div ng-http-loader methods="get" ' +
        'template="example-loader.tpl.html"></div>');
    });

    it('should open and close the loader',
      function () {
        //Arrange.
        $rootScope.$emit('loaderShow', 'GET');

        //Act.
        scope.$digest();

        //Assert.
        expect(elem.find('div').attr('class')).not.toContain('ng-hide');
      });
  });

  describe('checking title showing on the template', function () {
    beforeEach(function () {
      compileDirective('<div ng-http-loader title="foo-fake" methods="POST" ' +
        'template="example-loader.tpl.html"></div>');
    });

    it('should the copy contain the established title', function () {
      //Arrange.
      $rootScope.$emit('loaderShow', 'POST');

      //Act.
      scope.$digest();

      //Assert.
      expect(elem.text()).toContain('foo-fake');
    });
  });

  describe('open the loader for a minimum ttl', function () {
    beforeEach(function () {
      compileDirective('<div ng-http-loader ttl="1"' +
        'template="example-loader.tpl.html"></div>');
    });

    it('should open close the loader with a minimum ttl', inject(
      function ($browser) {
        runs(function () {
          // Act
          $rootScope.$emit('loaderShow', 'FOO');
          scope.$digest();

          //Assert.
          expect(elem.find('div').attr('class')).not.toContain('ng-hide');

          //Act.
          $rootScope.$emit('loaderHide', 'FOO');
          scope.$digest();

          //Assert.
          expect(elem.find('div').attr('class')).not.toContain('ng-hide');
        });
        waits(1000);

        runs(function () {
          // Clear timeouts.
          $browser.defer.flush();

          //Assert.
          expect(elem.find('div').attr('class')).toContain('ng-hide');
        });
      }));

    it('should open close the loader with multiple requests', inject(
      function ($browser) {
        runs(function () {
          // Act
          $rootScope.$emit('loaderShow', 'FOO');
          scope.$digest();

          //Act.
          $rootScope.$emit('loaderHide', 'FOO');
          scope.$digest();

          //Assert.
          expect(elem.find('div').attr('class')).not.toContain('ng-hide');
        });
        waits(1000);

        runs(function () {
          // Act
          $rootScope.$emit('loaderShow', 'BAR');
          scope.$digest();

          // Clears timeouts.
          $browser.defer.flush();

          //Assert.
          expect(elem.find('div').attr('class')).not.toContain('ng-hide');

          //Act.
          $rootScope.$emit('loaderHide', 'FOO');
          scope.$digest();

          //Assert.
          expect(elem.find('div').attr('class')).toContain('ng-hide');
        });
      }
    ));
  });
});
