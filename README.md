HTTP Loader
===========

Angular component which monitors HTTP requests and shows a custom loader element
when calls start and hides it when they complete.

Maintainer: Mauro Gadaleta <<mauro.gadaleta@wonga.com>>

Installation
------------

Bower:

```sh
bower install --save angular-http-loader
```

Usage
-----

Load tempo-http-loader.min.js:

```html
<script src="path/to/tempo-http-loader.min.js"></script>
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

Add an HTML element with the `http-loader` directive. This will be displayed
while requests are pending:

```html
<div http-loader template="example/loader.tpl.html"></div>
```

### Different loaders for different methods

Monitor only `GET` requests:

```html
<div http-loader methods="GET" template="example/loader.tpl.html"></div>
```

Monitor POST and PUT requests:

```html
<div http-loader methods="['POST', 'PUT']" template="example/loader.tpl.html"></div>
```

### Adding a title to your template

HTTP loader allows you to pass a title to your template:

```html
<div http-loader title="example" methods="GET" template="example/loader.tpl.html"></div>
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
- Run `grunt workflow:dev` to watch for changes, lint, build and run tests as
  you're working
- Write your unit tests for your change
- Run `grunt package` to update the distribution files
- Check that the demo app works (acceptance tests to be added)
- Update README.md and, if necessary, the demo page
