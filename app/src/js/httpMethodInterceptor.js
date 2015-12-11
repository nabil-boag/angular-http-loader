/* global angular */

/**
 * Http method interceptor. Broadcast events for show or hide the loader.
 */
angular
  .module('ng.httpLoader.httpMethodInterceptor', [])

  .provider('httpMethodInterceptor', function () {
    var domains = [],
      whitelistLocalRequests = false;

    /**
     * Add domains to the white list
     *
     * @param {string} domain
     * Added Domain to the white list domains collection
     */
    this.whitelistDomain = function (domain) {
      domains.push(domain);
    };

    /**
     * White list requests to the local domain
     */
    this.whitelistLocalRequests = function () {
      whitelistLocalRequests = true;
    };

    this.$get = [
      '$q',
      '$rootScope',
      function ($q, $rootScope) {
        var numLoadings = 0;

        /**
         * Check if the url domain is on the whitelist
         *
         * @param {string} url
         *
         * @returns {boolean}
         */
        var isUrlOnWhitelist = function (url) {
          if (url.substring(0, 2) !== '//' &&
            url.indexOf('://') === -1 &&
            whitelistLocalRequests) {
            return true;
          }

          for (var i = domains.length; i--;) {
            if (url.indexOf(domains[i]) !== -1) {
              return true;
            }
          }

          return false;
        };

        /**
         * Emit hide loader logic
         *
         * @param {object} config
         * The response configuration
         */
        var checkAndHide = function (config) {
          if (isUrlOnWhitelist(config.url) &&
            (--numLoadings) === 0) {
            $rootScope.$emit('loaderHide', config.method);
          }
        };

        return {
          /**
           * Broadcast the loader show event
           *
           * @param {object} config
           *
           * @returns {object|Promise}
           */
          request: function (config) {
            if (isUrlOnWhitelist(config.url)) {
              numLoadings++;
              $rootScope.$emit('loaderShow', config.method);
            }

            return config || $q.when(config);
          },

          /**
           * Broadcast the loader hide event
           *
           * @param {object} response
           *
           * @returns {object|Promise}
           */
          response: function (response) {
            checkAndHide(response.config);

            return response || $q.when(response);
          },

          /**
           * Handle errors
           *
           * @param {object} response
           *
           * @returns {Promise}
           */
          responseError: function (response) {
            checkAndHide(response.config);

            return $q.reject(response);
          }
        };
      }
    ];
  })

  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.unshift('httpMethodInterceptor');
  }]);
