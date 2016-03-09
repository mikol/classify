(function (context) {
/*jscs:disable validateIndentation*//*jscs:enable validateIndentation*/
// -----------------------------------------------------------------------------

'use strict';

var id = '';
var dependencies = [];

function factory() {
  var _classify = {}.toString.call.bind({}.toString);

  /**
   * Returns a remedial type string for `v`.
   *
   * @param {*} v - The value to test.
   *
   * @return {!string} One of `'array'`, `'boolean'`, `'date'`, `'error'`,
   *     `'function'`, `'nan'`, `'null'`, `'number'`, `'object'`, `'promise'`,
   *     `'regexp'`, `'string'`, `'symbol'`, or `'undefined'`.
   */
  return function classify(v) {
    if (v === null) {
      return 'null';
    }

    if (v === undefined) {
      return 'undefined';
    }

    if (typeof Promise === 'function' && v.constructor + '' === Promise + '') {
      return 'promise';
    }

    if (typeof v.then === 'function') {
      return 'thenable';
    }

    var c = _classify(v).match(/ (.*)\]$/)[1].toLowerCase();
    if (c === 'number' && isNaN(v)) {
      return 'nan';
    }

    return c;
  }
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
  for (; n--;) {dependencies[n] = require(dependencies[n]);}
  module.exports = factory.apply(context, dependencies);
} else {
  for (; n--;) {dependencies[n] = context[dependencies[n]];}
  context[id.replace(r, s)] = factory.apply(context, dependencies);
}
}(this));
