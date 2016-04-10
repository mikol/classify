(function (context) {
// -----------------------------------------------------------------------------

'use strict';

var id = '';
var dependencies =
    ['../classify', 'actually', 'matches', 'actually/throws', 'criteria'];

function factory(classify, actually, matches, throws) {
  scope('`classify()` correctly identifies values.',
  function () {
    test('`arguments`: What is it? "arguments".',
    function () {
      actually(matches, 'arguments', classify(arguments));
    });

    test('`[]`: What is it? "array".',
    function () {
      actually(matches, 'array', classify([]));
    });

    test('`new Array()`: What is it? "array".',
    function () {
      /* jshint -W053 */
      actually(matches, 'array', classify(new Array()));
      /* jshint +W053 */
    });

    if (typeof ArrayBuffer === 'function') {
      test('`new ArrayBuffer()`: What is it? "arraybuffer".',
      function () {
        actually(matches, 'arraybuffer', classify(new ArrayBuffer()));
      });
    }

    test('`false`: What is it? "boolean".',
    function () {
      actually(matches, 'boolean', classify(false));
    });

    test('`new Boolean()`: What is it? "boolean".',
    function () {
      /* jshint -W053 */
      actually(matches, 'boolean', classify(new Boolean()));
      /* jshint +W053 */
    });

    test('`0`: What is it? Not "boolean".',
    function () {
      actually(function (a, b) {return a !== b;}, 'boolean', classify(0));
    });

    if (typeof DataView === 'function') {
      test('`new DataView(new ArrayBuffer())`: What is it? "dataview".',
      function () {
        actually(matches,
            'dataview', classify(new DataView(new ArrayBuffer())));
      });
    }

    test('`new Date()`: What is it? "date".',
    function () {
      actually(matches, 'date', classify(new Date()));
    });

    test('`new Error()`: What is it? "error".',
    function () {
      actually(matches, 'error', classify(new Error()));
    });

    test('`new TypeError()`: What is it? "error".',
    function () {
      actually(matches, 'error', classify(new TypeError()));
    });

    test('`new TypeError()`: What is it, precisely? "typeerror".',
    function () {
      actually(matches, 'typeerror', classify(new TypeError(), {errors: true}));
    });

    if (typeof Float32Array === 'function') {
      test('`new Float32Array()`: What is it? "float32array".',
      function () {
        actually(matches, 'float32array', classify(new Float32Array()));
      });
    }

    if (typeof Float64Array === 'function') {
      test('`new Float64Array()`: What is it? "float64array".',
      function () {
        actually(matches, 'float64array', classify(new Float64Array()));
      });
    }

    test('`function () {}`: What is it? "function".',
    function () {
      actually(matches, 'function', classify(function () {}));
    });

    if (typeof Int8Array === 'function') {
      test('`new Int8Array()`: What is it? "int8array".',
      function () {
        actually(matches, 'int8array', classify(new Int8Array()));
      });
    }

    if (typeof Int16Array === 'function') {
      test('`new Int16Array()`: What is it? "int16array".',
      function () {
        actually(matches, 'int16array', classify(new Int16Array()));
      });
    }

    if (typeof Int32Array === 'function') {
      test('`new Int32Array()`: What is it? "int32array".',
      function () {
        actually(matches, 'int32array', classify(new Int32Array()));
      });
    }

    if (typeof Map === 'function') {
      test('`new Map()`: What is it? "map".',
      function () {
        actually(matches, 'map', classify(new Map()));
      });
    }

    test('`NaN`: What is it? Not "nan".',
    function () {
      actually(matches, 'nan', classify(NaN));
    });

    test('`null`: What is it? "null".',
    function () {
      actually(matches, 'null', classify(null));
    });

    test('`undefined`: What is it? Not "null".',
    function () {
      actually(function (a, b) {return a !== b;}, 'null', classify(undefined));
    });

    test('`0`: What is it? "number".',
    function () {
      actually(matches, 'number', classify(0));
    });

    test('`new Number(0)`: What is it? "number".',
    function () {
      /* jshint -W053 */
      actually(matches, 'number', classify(new Number(0)));
      /* jshint +W053 */
    });

    test('`NaN`: What is it? Not "number".',
    function () {
      actually(function (a, b) {return a !== b;}, 'number', classify(NaN));
    });

    test('`{}`: What is it? "object".',
    function () {
      actually(matches, 'object', classify({}));
    });

    test('`new Object()`: What is it? "object".',
    function () {
      /* jshint -W010 */
      actually(matches, 'object', classify(new Object()));
      /* jshint +W010 */
    });

    test('`null`: What is it? Not "object".',
    function () {
      actually(function (a, b) {return a !== b;}, 'object', classify(null));
    });

    test('`true`: What is it? Not "object".',
    function () {
      actually(function (a, b) {return a !== b;}, 'object', classify(true));
    });

    if (typeof Promise === 'function') {
      test('`Promise.resolve()`: What is it? "promise".',
      function () {
        actually(matches, 'promise', classify(Promise.resolve()));
      });

      test('`Promise.reject()`: What is it? "promise".',
      function () {
        actually(matches, 'promise', classify(Promise.reject()));
      });

      test('`new Promise(function () {})`: What is it? "promise".',
      function () {
        actually(matches, 'promise', classify(new Promise(function () {})));
      });

      test('`{then: function () {}}`: What is it? Not "promise".',
      function () {
        actually(function (a, b) {return a !== b;},
            'promise', classify({then: function () {}}));
      });
    }

    test('`/ /`: What is it? "regexp".',
    function () {
      actually(matches, 'regexp', classify(/ /));
    });

    test('`new RegExp(\'^(.*)$\')`: What is it? "regexp".',
    function () {
      actually(matches, 'regexp', classify(new RegExp('^(.*)$')));
    });

    test('`\'^(.*)$\'`: What is it? Not "regexp".',
    function () {
      actually(function (a, b) {return a !== b;}, 'regexp', classify('^(.*)$'));
    });

    if (typeof Set === 'function') {
      test('`new Set()`: What is it? "set".',
      function () {
        actually(matches, 'set', classify(new Set()));
      });
    }

    test('`\'\'`: What is it? "string".',
    function () {
      actually(matches, 'string', classify(''));
    });

    test('`new String(\'\')`: What is it? "string".',
    function () {
      actually(matches, 'string', classify(new String('')));
    });

    test('`null`: What is it? Not "string".',
    function () {
      actually(function (a, b) {return a !== b;}, 'string', classify(null));
    });

    if (typeof Symbol !== 'undefined') {
      test('`Symbol()`: What is it? "symbol".',
      function () {
        actually(matches, 'symbol', classify(Symbol()));
      });
    }

    if (typeof Uint8Array === 'function') {
      test('`new Uint8Array()`: What is it? "uint8array".',
      function () {
        actually(matches, 'uint8array', classify(new Uint8Array()));
      });
    }

    if (typeof Uint8ClampedArray === 'function') {
      test('`new Uint8ClampedArray()`: What is it? "uint8clampedarray".',
      function () {
        actually(matches,
            'uint8clampedarray', classify(new Uint8ClampedArray()));
      });
    }

    if (typeof Uint16Array === 'function') {
      test('`new Uint16Array()`: What is it? "uint16array".',
      function () {
        actually(matches, 'uint16array', classify(new Uint16Array()));
      });
    }

    if (typeof Uint32Array === 'function') {
      test('`new Uint32Array()`: What is it? "uint32array".',
      function () {
        actually(matches, 'uint32array', classify(new Uint32Array()));
      });
    }

    test('`(function () {})()`: What is it? "undefined".',
    function () {
      actually(matches, 'undefined', classify((function () {})()));
    });

    test('`void (0)`: What is it? "undefined".',
    function () {
      actually(matches, 'undefined', classify(void (0)));
    });

    test('`null`: What is it? Not "undefined".',
    function () {
      actually(function (a, b) {return a !== b;}, 'undefined', classify(null));
    });

    if (typeof WeakMap === 'function') {
      test('`new WeakMap()`: What is it? "weakmap".',
      function () {
        actually(matches, 'weakmap', classify(new WeakMap()));
      });
    }

    if (typeof WeakSet === 'function') {
      test('`new WeakSet()`: What is it? "weakset".',
      function () {
        actually(matches, 'weakset', classify(new WeakSet()));
      });
    }

    function CustomType() {}

    test('`new CustomType()`: What is it? "customtype".',
    function () {
      actually(matches, 'customtype', classify(new CustomType()));
    });

    test('`new (function () {})`: What is it? "object".',
    function () {
      actually(matches, 'object', classify(new (function () {})));
    });

    try {
      // TODO: Make this ADM/CJS/plain module agnostic.
      if (typeof module === o && module.exports) {
        require('../test-syntax/syntax.test');
      }
    } catch (e) {
      // Fails silently if the syntax-sensitive tests have an unexpected
      // syntactical issue.
      if (e.constructor + '' != SyntaxError) {
        throw e;
      }
    }
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
