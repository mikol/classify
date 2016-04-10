(function (context) {
// -----------------------------------------------------------------------------

'use strict';

var id = '';
var dependencies = [];

function factory() {
  var FUNCTION_NAME_RE = /^function ([^\s\(]+)\(/;
  var _classify = {}.toString.call.bind({}.toString);

  /**
   * Returns a remedial type string for `v`.
   *
   * @param {*} v - The value to test.
   * @param {Object.<string, boolean>} options
   * @param {boolean} errors - Return the precise error type instead of the
   *     generic `'error'` (for example, `'typeerror'`);
   *
   * @return {!string} One of `'arguments'`, `'array'`, `'arraybuffer'`,
   *     `'boolean'`, `'dataview'`, `'date'`, `'error'`, `'float32array'`,
   *     `'float64array'`, `'function'`, `'generator'`, `'int8array'`,
   *     `'int16array'`, `'int32array'`, `'map'`, `'nan'`, `'null'`, `'number'`,
   *     `'object'`, `'promise'`, `'regexp'`, `'set'`, `'string'`, `'symbol'`,
   *     `'uint8array'`, `'uint8clampedarray'`, `'uint16array'`,
   *     `'uint32array'`, `'undefined'`, `'weakmap'`, `'weakset'`, or – if `v`
   *     is a custom type – its lowercase constructor name.
   */
  return function classify(v, options) {
    if (options == null) {
      options = {};
    }

    if (v === null) {
      return 'null';
    }

    if (v === undefined) {
      return 'undefined';
    }

    var c = _classify(v).match(/ (.*)\]$/)[1].toLowerCase();

    if (c === 'number' && isNaN(v)) {
      return 'nan';
    }

    if (c === 'object' || (c === 'error' && options.errors)) {
      var C = v.constructor;

      if (C.name) {
        return C.name.toLowerCase();
      } else {
        var m = FUNCTION_NAME_RE.exec(C);
        if (m) {
          return m[1].toLowerCase();
        }
      }
    }

    return c;
  };
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
