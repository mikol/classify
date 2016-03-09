'use strict';

require('criteria'); /* globals scope, test */

const classify = require('../classify');

scope('`classify()` correctly identifies values.',
function () {
  test('`[]`: What is it? "array".',
  function (must) {
    must.true(() => classify([]) === 'array');
  });

  test('`new Array()`: What is it? "array".',
  function (must) {
    /* jshint -W053 */
    must.true(() => classify(new Array) === 'array');
    /* jshint +W053 */
  });

  test('`false`: What is it? "boolean".',
  function (must) {
    must.true(() => classify(false) === 'boolean');
  });

  test('`new Boolean()`: What is it? "boolean".',
  function (must) {
    /* jshint -W053 */
    must.true(() => classify(new Boolean()) === 'boolean');
    /* jshint +W053 */
  });

  test('`0`: What is it? Not "boolean".',
  function (must) {
    must.true(() => classify(0) !== 'boolean');
  });

  test('`new Date()`: What is it? "date".',
  function (must) {
    must.true(() => classify(new Date()) === 'date');
  });

  test('`new Error()`: What is it? "error".',
  function (must) {
    must.true(() => classify(new Error()) === 'error');
  });

  test('`new TypeError()`: What is it? "error".',
  function (must) {
    must.true(() => classify(new TypeError()) === 'error');
  });

  test('`function () {}`: What is it? "function".',
  function (must) {
    must.true(() => classify(function () {}) === 'function');
  });

  test('`null`: What is it? "null".',
  function (must) {
    must.true(() => classify(null) === 'null');
  });

  test('`undefined`: What is it? Not "null".',
  function (must) {
    must.true(() => classify(undefined) !== 'null');
  });

  test('`0`: What is it? "number".',
  function (must) {
    must.true(() => classify(0) === 'number');
  });

  test('`new Number(0)`: What is it? "number".',
  function (must) {
    /* jshint -W053 */
    must.true(() => classify(new Number(0)) === 'number');
    /* jshint +W053 */
  });

  test('`NaN`: What is it? Not "number".',
  function (must) {
    must.true(() => classify(NaN) !== 'number');
  });

  test('`{}`: What is it? "object".',
  function (must) {
    must.true(() => classify({}) === 'object');
  });

  test('`new Object()`: What is it? "object".',
  function (must) {
    /* jshint -W010 */
    must.true(() => classify(new Object()) === 'object');
    /* jshint +W010 */
  });

  test('`null`: What is it? Not "object".',
  function (must) {
    must.true(() => classify(null) !== 'object');
  });

  test('`true`: What is it? Not "object".',
  function (must) {
    must.true(() => classify(true) !== 'object');
  });

  if (typeof Promise !== 'undefined') {
    test('`Promise.resolve()`: What is it? "promise".',
    function (must) {
      must.true(() => classify(Promise.resolve()) === 'promise');
    });

    test('`Promise.reject()`: What is it? "promise".',
    function (must) {
      must.true(() => classify(Promise.reject()) === 'promise');
    });

    test('`new Promise(function () {})`: What is it? "promise".',
    function (must) {
      must.true(() => classify(new Promise(function () {})) === 'promise');
    });

    test('`{then: function () {}}`: What is it? Not "promise".',
    function (must) {
      must.true(() => classify({then: function () {}}) !== 'promise');
    });
  }

  test('`/ /`: What is it? "regexp".',
  function (must) {
    must.true(() => classify(/ /) === 'regexp');
  });

  test('`new RegExp(\'^(.*)$\')`: What is it? "regexp".',
  function (must) {
    must.true(() => classify(new RegExp('^(.*)$')) === 'regexp');
  });

  test('`\'^(.*)$\'`: What is it? Not "regexp".',
  function (must) {
    must.true(() => classify('^(.*)$') !== 'regexp');
  });

  test('`\'\'`: What is it? "string".',
  function (must) {
    must.true(() => classify('') === 'string');
  });

  test('`new String(\'\')`: What is it? "string".',
  function (must) {
    must.true(() => classify(new String('')) === 'string');
  });

  test('`null`: What is it? Not "string".',
  function (must) {
    must.true(() => classify(null) !== 'string');
  });

  if (typeof Symbol !== 'undefined') {
    test('`Symbol()`: What is it? "symbol".',
    function (must) {
      must.true(() => classify(Symbol()) === 'symbol');
    });
  }

  test('`{then: function () {}}`: What is it? "thenable".',
  function (must) {
    must.true(() => classify({then: function () {}}) === 'thenable');
  });

  test('`{then: true}`: What is it? Not "thenable".',
  function (must) {
    must.true(() => classify({then: true}) !== 'thenable');
  });

  test('`(function () {})()`: What is it? "undefined".',
  function (must) {
    must.true(() => classify((function () {})()) === 'undefined');
  });

  test('`void (0)`: What is it? "undefined".',
  function (must) {
    must.true(() => classify(void (0)) === 'undefined');
  });

  test('`null`: What is it? Not "undefined".',
  function (must) {
    must.true(() => classify(null) !== 'undefined');
  });
});
