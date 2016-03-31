/* global setTimeout, clearTimeout */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = debounce;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function debounce(fn) {
  var wait = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var _ref$leading = _ref.leading;
  var leading = _ref$leading === undefined ? false : _ref$leading;

  var nextArgs = undefined;
  var pending = undefined;
  var resolve = undefined;
  var reject = undefined;
  var timer = undefined;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    nextArgs = args;
    if (!pending) {
      if (leading) {
        pending = fn.apply(undefined, _toConsumableArray(nextArgs));
      } else {
        pending = new Promise(function (_resolve, _reject) {
          resolve = _resolve;
          reject = _reject;
        });
      }
    }
    clearTimeout(timer);
    timer = setTimeout(run.bind(null, nextArgs, resolve, reject), getWait(wait));
    return pending;
  };

  function run(_nextArgs, _resolve, _reject) {
    fn.apply(undefined, _toConsumableArray(_nextArgs)).then(_resolve, _reject);
    clear();
  }

  function clear() {
    nextArgs = null;
    resolve = null;
    reject = null;
    pending = null;
    timer = null;
  }

  function getWait(_wait) {
    if (typeof _wait === 'function') {
      return _wait();
    }
    return _wait;
  }
}

module.exports = exports['default'];
//# sourceMappingURL=index.js.map