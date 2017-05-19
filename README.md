HTTP Loader
===========

Angular component which monitors HTTP requests and shows a custom loader element
when calls start and hides it when they complete.

Maintainer: Mauro Gadaleta <<mauro.gadaleta@wonga.com>>

Demo
------------
<http://wongatech.github.io/angular-http-loader/>


Travis Status
-------------

[![Build Status](https://travis-ci.org/wongatech/angular-http-loader.svg?branch=master)](https://travis-ci.org/wongatech/angular-http-loader)


Installation
------------

NPM:

```sh
npm install --save angular-http-loader
```

Usage
-----

Load angular-http-loader.min.js:

```html
<script src="path/to/angular-http-loader.min.js"></script>
```

Add the `ng.httpLoader` module as a dependency in your application:

```javascript
angular.module('demo', ['ng.httpLoader'])
```

Whitelist the external domains that you want the loader to show for:

```javascript
.config([
  'httpMethodInterceptorProvider',
  function (httpMethodInterceptorProvider) {
    httpMethodInterceptorProvider.whitelistDomain('github.com');
    httpMethodInterceptorProvider.whitelistDomain('twitter.com');
    // ...
  }
])
```

You can whitelist requests to the local server:

```javascript
.config([
  'httpMethodInterceptorProvider',
  function (httpMethodInterceptorProvider) {
    // ...
    httpMethodInterceptorProvider.whitelistLocalRequests();
    // ...
  }
])
```

Add an HTML element with the `ng-http-loader` directive. This will be displayed
while requests are pending:

```html
<div ng-http-loader template="example/loader.tpl.html"></div>
```

### Different loaders for different methods

Monitor only `GET` requests:

```html
<div ng-http-loader methods="GET" template="example/loader.tpl.html"></div>
```

Monitor POST and PUT requests:

```html
<div ng-http-loader methods="['POST', 'PUT']" template="example/loader.tpl.html"></div>
```

### Adding a title to your template

HTTP loader allows you to pass a title to your template:

```html
<div ng-http-loader title="example" methods="GET" template="example/loader.tpl.html"></div>
```

And use that in your template:

```html
<span>Loader for {{title}}</span>
```

### Minimum time to live

HTTP loader allows you to pass a ttl in seconds to your template.
This tells the loader to be visible at least for the given amount of time, i.e.

```html
<div ng-http-loader ttl="2" methods="GET" template="example/loader.tpl.html"></div>
```

_The loader should be now visible at least 2 seconds, independent of the total http request(s)
dispatched. Should the total amount of time of the request(s) be larger than the ttl,
the loader will dismiss when the last http request is done._

Contributing
------------

We :heart: pull requests!

To contribute:

- Fork the repo
- Run `npm install`
- Run `grunt workflow:dev` to watch for changes, lint, build and run tests as
  you're working
- Write your unit tests for your change
- Run `grunt package` to update the distribution files
- Check that the demo app works (acceptance tests to be added)
- Update README.md and, if necessary, the demo page
