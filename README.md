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

Bower:

```sh
bower install --save angular-http-loader
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

Whitelist the domains that you want the loader to show for:

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

Contributing
------------

We :heart: pull requests!

To contribute:

- Fork the repo
- Run `npm install`
- Run `bower install`
- Run `grunt workflow:dev` to watch for changes, lint, build and run tests as
  you're working
- Write your unit tests for your change
- Run `grunt package` to update the distribution files
- Check that the demo app works (acceptance tests to be added)
- Update README.md and, if necessary, the demo page
