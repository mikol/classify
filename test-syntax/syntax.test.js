// XXX: These tests use syntax (for example, `function* (a) {yield a;}`) that is
// not supported by all runtimes. In `../test/classify.test.js`, we import this
// file and ignore all syntax errors (since we expect correct code to generate
// syntax errors in some runtimes). This means that if this file contains an
// *unexpected* syntax issue, no error will be reported and none of these tests
// will run so *be careful*.

(function (context) {
// -----------------------------------------------------------------------------

'use strict';

var id = '';
var dependencies = ['../classify', 'actually', 'matches', 'criteria'];

function factory(classify, actually, matches) {
  scope('Syntax-Sensitive Tests',
  function () {
    test('`(function* (a) {yield a;}())`: What is it? "generator".',
    function () {
      actually(matches, 'generator', classify((function* (a) {yield a;}())));
    });
  });
}

// -----------------------------------------------------------------------------
var n = dependencies.length;
var o = 'object';
var r = /([^-_\s])[-_\s]+([^-_\s])/g;
function s(m, a, b) { return a + b.toUpperCase(); }
context = typeof global === o ? global : typeof window === o ? window : context;
if (typeof define === 'function' && define.amd) {
  define(dependencies, function () {
    return factory.apply(context, [].slice.call(arguments));
  });
} else if (typeof module === o && module.exports) {
  for (; n--;) { dependencies[n] = require(dependencies[n]); }
  module.exports = factory.apply(context, dependencies);
} else {
  for (; n--;) { dependencies[n] = context[dependencies[n]]; }
  context[id.replace(r, s)] = factory.apply(context, dependencies);
}
}(this));
