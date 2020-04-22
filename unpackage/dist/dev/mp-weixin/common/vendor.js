(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin']['options']) {
      Object.assign(options, vueOptions['mp-weixin']['options']);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 14:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 21:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!**********************************!*\
  !*** D:/uni-app/text/pages.json ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _createSuper(Derived) {return function () {var Super = _getPrototypeOf(Derived),result;if (_isNativeReflectConstruct()) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));return true;} catch (e) {return false;}}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);var _super = _createSuper(Stat);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _super.call(this);
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 52:
/*!*****************************************!*\
  !*** D:/uni-app/text/commen/tim/tim.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timJsSdk = _interopRequireDefault(__webpack_require__(/*! tim-js-sdk */ 53));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// import COS from "cos-js-sdk-v5";


var options = {
  SDKAppID: 1400355024 //1400277699 // 接入时需要将0替换为您的即时通信应用的 SDKAppID
};
// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
var tim = _timJsSdk.default.create(options); // SDK 实例通常用 tim 表示
var TIMData = _timJsSdk.default;
// 注册 COS SDK 插件
// tim.registerPlugin({'cos-js-sdk': COS});



/* eslint-disable require-jsdoc */
function genTestUserSig(userID) {
  var SDKAPPID = 1400356717;
  var EXPIRETIME = 604800;
  var SECRETKEY = '1d272644ec956a6dcb4456dba396c1d15b6dd899886c86680cb537298da1dbb5';

  if (SDKAPPID === '' || SECRETKEY === '') {
    alert(
    '请先配置好您的账号信息： SDKAPPID 及 SECRETKEY ' +
    '\r\n\r\nPlease configure your SDKAPPID/SECRETKEY in js/debug/GenerateTestUserSig.js');

  }
  var generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
  var userSig = generator.genTestUserSig(userID);
  return {
    sdkAppId: SDKAPPID,
    userSig: userSig };

}var _default =

{
  tim: tim,
  TIMData: TIMData,
  genTestUserSig: genTestUserSig };exports.default = _default;

/***/ }),

/***/ 53:
/*!*********************************************************!*\
  !*** D:/uni-app/text/node_modules/tim-js-sdk/tim-js.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {!function (e, t) { true ? module.exports = t() : undefined;}(this, function () {var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};function t(e, t) {return e(t = { exports: {} }, t.exports), t.exports;}var n = function n(e) {return e && e.Math == Math && e;},r = n("object" == typeof globalThis && globalThis) || n("object" == typeof window && window) || n("object" == typeof self && self) || n("object" == typeof e && e) || Function("return this")(),o = function o(e) {try {return !!e();} catch (t) {return !0;}},i = !o(function () {return 7 != Object.defineProperty({}, 1, { get: function get() {return 7;} })[1];}),a = {}.propertyIsEnumerable,s = Object.getOwnPropertyDescriptor,u = { f: s && !a.call({ 1: 2 }, 1) ? function (e) {var t = s(this, e);return !!t && t.enumerable;} : a },c = function c(e, t) {return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };},l = {}.toString,p = function p(e) {return l.call(e).slice(8, -1);},f = "".split,h = o(function () {return !Object("z").propertyIsEnumerable(0);}) ? function (e) {return "String" == p(e) ? f.call(e, "") : Object(e);} : Object,d = function d(e) {if (null == e) throw TypeError("Can't call method on " + e);return e;},g = function g(e) {return h(d(e));},m = function m(e) {return "object" == typeof e ? null !== e : "function" == typeof e;},v = function v(e, t) {if (!m(e)) return e;var n, r;if (t && "function" == typeof (n = e.toString) && !m(r = n.call(e))) return r;if ("function" == typeof (n = e.valueOf) && !m(r = n.call(e))) return r;if (!t && "function" == typeof (n = e.toString) && !m(r = n.call(e))) return r;throw TypeError("Can't convert object to primitive value");},y = {}.hasOwnProperty,_ = function _(e, t) {return y.call(e, t);},I = r.document,C = m(I) && m(I.createElement),M = function M(e) {return C ? I.createElement(e) : {};},S = !i && !o(function () {return 7 != Object.defineProperty(M("div"), "a", { get: function get() {return 7;} }).a;}),E = Object.getOwnPropertyDescriptor,T = { f: i ? E : function (e, t) {if (e = g(e), t = v(t, !0), S) try {return E(e, t);} catch (n) {}if (_(e, t)) return c(!u.f.call(e, t), e[t]);} },D = function D(e) {if (!m(e)) throw TypeError(String(e) + " is not an object");return e;},k = Object.defineProperty,w = { f: i ? k : function (e, t, n) {if (D(e), t = v(t, !0), D(n), S) try {return k(e, t, n);} catch (r) {}if ("get" in n || "set" in n) throw TypeError("Accessors not supported");return "value" in n && (e[t] = n.value), e;} },A = i ? function (e, t, n) {return w.f(e, t, c(1, n));} : function (e, t, n) {return e[t] = n, e;},R = function R(e, t) {try {A(r, e, t);} catch (n) {r[e] = t;}return t;},b = r["__core-js_shared__"] || R("__core-js_shared__", {}),O = Function.toString;"function" != typeof b.inspectSource && (b.inspectSource = function (e) {return O.call(e);});var L,N,P,G = b.inspectSource,x = r.WeakMap,U = "function" == typeof x && /native code/.test(G(x)),q = t(function (e) {(e.exports = function (e, t) {return b[e] || (b[e] = void 0 !== t ? t : {});})("versions", []).push({ version: "3.6.4", mode: "global", copyright: "© 2020 Denis Pushkarev (zloirock.ru)" });}),F = 0,j = Math.random(),B = function B(e) {return "Symbol(" + String(void 0 === e ? "" : e) + ")_" + (++F + j).toString(36);},H = q("keys"),V = function V(e) {return H[e] || (H[e] = B(e));},K = {},$ = r.WeakMap;if (U) {var Y = new $(),z = Y.get,W = Y.has,X = Y.set;L = function L(e, t) {return X.call(Y, e, t), t;}, N = function N(e) {return z.call(Y, e) || {};}, P = function P(e) {return W.call(Y, e);};} else {var J = V("state");K[J] = !0, L = function L(e, t) {return A(e, J, t), t;}, N = function N(e) {return _(e, J) ? e[J] : {};}, P = function P(e) {return _(e, J);};}var Q = { set: L, get: N, has: P, enforce: function enforce(e) {return P(e) ? N(e) : L(e, {});}, getterFor: function getterFor(e) {return function (t) {var n;if (!m(t) || (n = N(t)).type !== e) throw TypeError("Incompatible receiver, " + e + " required");return n;};} },Z = t(function (e) {var t = Q.get,n = Q.enforce,o = String(String).split("String");(e.exports = function (e, t, i, a) {var s = !!a && !!a.unsafe,u = !!a && !!a.enumerable,c = !!a && !!a.noTargetGet;"function" == typeof i && ("string" != typeof t || _(i, "name") || A(i, "name", t), n(i).source = o.join("string" == typeof t ? t : "")), e !== r ? (s ? !c && e[t] && (u = !0) : delete e[t], u ? e[t] = i : A(e, t, i)) : u ? e[t] = i : R(t, i);})(Function.prototype, "toString", function () {return "function" == typeof this && t(this).source || G(this);});}),ee = r,te = function te(e) {return "function" == typeof e ? e : void 0;},ne = function ne(e, t) {return arguments.length < 2 ? te(ee[e]) || te(r[e]) : ee[e] && ee[e][t] || r[e] && r[e][t];},re = Math.ceil,oe = Math.floor,ie = function ie(e) {return isNaN(e = +e) ? 0 : (e > 0 ? oe : re)(e);},ae = Math.min,se = function se(e) {return e > 0 ? ae(ie(e), 9007199254740991) : 0;},ue = Math.max,ce = Math.min,le = function le(e, t) {var n = ie(e);return n < 0 ? ue(n + t, 0) : ce(n, t);},pe = function pe(e) {return function (t, n, r) {var o,i = g(t),a = se(i.length),s = le(r, a);if (e && n != n) {for (; a > s;) {if ((o = i[s++]) != o) return !0;}} else for (; a > s; s++) {if ((e || s in i) && i[s] === n) return e || s || 0;}return !e && -1;};},fe = { includes: pe(!0), indexOf: pe(!1) },he = fe.indexOf,de = function de(e, t) {var n,r = g(e),o = 0,i = [];for (n in r) {!_(K, n) && _(r, n) && i.push(n);}for (; t.length > o;) {_(r, n = t[o++]) && (~he(i, n) || i.push(n));}return i;},ge = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],me = ge.concat("length", "prototype"),ve = { f: Object.getOwnPropertyNames || function (e) {return de(e, me);} },ye = { f: Object.getOwnPropertySymbols },_e = ne("Reflect", "ownKeys") || function (e) {var t = ve.f(D(e)),n = ye.f;return n ? t.concat(n(e)) : t;},Ie = function Ie(e, t) {for (var n = _e(t), r = w.f, o = T.f, i = 0; i < n.length; i++) {var a = n[i];_(e, a) || r(e, a, o(t, a));}},Ce = /#|\.prototype\./,Me = function Me(e, t) {var n = Ee[Se(e)];return n == De || n != Te && ("function" == typeof t ? o(t) : !!t);},Se = Me.normalize = function (e) {return String(e).replace(Ce, ".").toLowerCase();},Ee = Me.data = {},Te = Me.NATIVE = "N",De = Me.POLYFILL = "P",ke = Me,we = T.f,Ae = function Ae(e, t) {var n,o,i,a,s,u = e.target,c = e.global,l = e.stat;if (n = c ? r : l ? r[u] || R(u, {}) : (r[u] || {}).prototype) for (o in t) {if (a = t[o], i = e.noTargetGet ? (s = we(n, o)) && s.value : n[o], !ke(c ? o : u + (l ? "." : "#") + o, e.forced) && void 0 !== i) {if (typeof a == typeof i) continue;Ie(a, i);}(e.sham || i && i.sham) && A(a, "sham", !0), Z(n, o, a, e);}},Re = function Re(e) {if ("function" != typeof e) throw TypeError(String(e) + " is not a function");return e;},be = function be(e, t, n) {if (Re(e), void 0 === t) return e;switch (n) {case 0:return function () {return e.call(t);};case 1:return function (n) {return e.call(t, n);};case 2:return function (n, r) {return e.call(t, n, r);};case 3:return function (n, r, o) {return e.call(t, n, r, o);};}return function () {return e.apply(t, arguments);};},Oe = function Oe(e) {return Object(d(e));},Le = Array.isArray || function (e) {return "Array" == p(e);},Ne = !!Object.getOwnPropertySymbols && !o(function () {return !String(Symbol());}),Pe = Ne && !Symbol.sham && "symbol" == typeof Symbol.iterator,Ge = q("wks"),xe = r.Symbol,Ue = Pe ? xe : xe && xe.withoutSetter || B,qe = function qe(e) {return _(Ge, e) || (Ne && _(xe, e) ? Ge[e] = xe[e] : Ge[e] = Ue("Symbol." + e)), Ge[e];},Fe = qe("species"),je = function je(e, t) {var n;return Le(e) && ("function" != typeof (n = e.constructor) || n !== Array && !Le(n.prototype) ? m(n) && null === (n = n[Fe]) && (n = void 0) : n = void 0), new (void 0 === n ? Array : n)(0 === t ? 0 : t);},Be = [].push,He = function He(e) {var t = 1 == e,n = 2 == e,r = 3 == e,o = 4 == e,i = 6 == e,a = 5 == e || i;return function (s, u, c, l) {for (var p, f, d = Oe(s), g = h(d), m = be(u, c, 3), v = se(g.length), y = 0, _ = l || je, I = t ? _(s, v) : n ? _(s, 0) : void 0; v > y; y++) {if ((a || y in g) && (f = m(p = g[y], y, d), e)) if (t) I[y] = f;else if (f) switch (e) {case 3:return !0;case 5:return p;case 6:return y;case 2:Be.call(I, p);} else if (o) return !1;}return i ? -1 : r || o ? o : I;};},Ve = { forEach: He(0), map: He(1), filter: He(2), some: He(3), every: He(4), find: He(5), findIndex: He(6) },Ke = function Ke(e, t) {var n = [][e];return !!n && o(function () {n.call(null, t || function () {throw 1;}, 1);});},$e = Object.defineProperty,Ye = {},ze = function ze(e) {throw e;},We = function We(e, t) {if (_(Ye, e)) return Ye[e];t || (t = {});var n = [][e],r = !!_(t, "ACCESSORS") && t.ACCESSORS,a = _(t, 0) ? t[0] : ze,s = _(t, 1) ? t[1] : void 0;return Ye[e] = !!n && !o(function () {if (r && !i) return !0;var e = { length: -1 };r ? $e(e, 1, { enumerable: !0, get: ze }) : e[1] = 1, n.call(e, a, s);});},Xe = Ve.forEach,Je = Ke("forEach"),Qe = We("forEach"),Ze = Je && Qe ? [].forEach : function (e) {return Xe(this, e, arguments.length > 1 ? arguments[1] : void 0);};Ae({ target: "Array", proto: !0, forced: [].forEach != Ze }, { forEach: Ze });var et = function et(e, t, n, r) {try {return r ? t(D(n)[0], n[1]) : t(n);} catch (i) {var o = e.return;throw void 0 !== o && D(o.call(e)), i;}},tt = {},nt = qe("iterator"),rt = Array.prototype,ot = function ot(e) {return void 0 !== e && (tt.Array === e || rt[nt] === e);},it = function it(e, t, n) {var r = v(t);r in e ? w.f(e, r, c(0, n)) : e[r] = n;},at = {};at[qe("toStringTag")] = "z";var st = "[object z]" === String(at),ut = qe("toStringTag"),ct = "Arguments" == p(function () {return arguments;}()),lt = st ? p : function (e) {var t, n, r;return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function (e, t) {try {return e[t];} catch (n) {}}(t = Object(e), ut)) ? n : ct ? p(t) : "Object" == (r = p(t)) && "function" == typeof t.callee ? "Arguments" : r;},pt = qe("iterator"),ft = function ft(e) {if (null != e) return e[pt] || e["@@iterator"] || tt[lt(e)];},ht = function ht(e) {var t,n,r,o,i,a,s = Oe(e),u = "function" == typeof this ? this : Array,c = arguments.length,l = c > 1 ? arguments[1] : void 0,p = void 0 !== l,f = ft(s),h = 0;if (p && (l = be(l, c > 2 ? arguments[2] : void 0, 2)), null == f || u == Array && ot(f)) for (n = new u(t = se(s.length)); t > h; h++) {a = p ? l(s[h], h) : s[h], it(n, h, a);} else for (i = (o = f.call(s)).next, n = new u(); !(r = i.call(o)).done; h++) {a = p ? et(o, l, [r.value, h], !0) : r.value, it(n, h, a);}return n.length = h, n;},dt = qe("iterator"),gt = !1;try {var mt = 0,vt = { next: function next() {return { done: !!mt++ };}, return: function _return() {gt = !0;} };vt[dt] = function () {return this;}, Array.from(vt, function () {throw 2;});} catch (Y_) {}var yt = function yt(e, t) {if (!t && !gt) return !1;var n = !1;try {var r = {};r[dt] = function () {return { next: function next() {return { done: n = !0 };} };}, e(r);} catch (Y_) {}return n;},_t = !yt(function (e) {Array.from(e);});Ae({ target: "Array", stat: !0, forced: _t }, { from: ht });var It,Ct = Object.keys || function (e) {return de(e, ge);},Mt = i ? Object.defineProperties : function (e, t) {D(e);for (var n, r = Ct(t), o = r.length, i = 0; o > i;) {w.f(e, n = r[i++], t[n]);}return e;},St = ne("document", "documentElement"),Et = V("IE_PROTO"),Tt = function Tt() {},Dt = function Dt(e) {return "<script>" + e + "<\/script>";},_kt = function kt() {try {It = document.domain && new ActiveXObject("htmlfile");} catch (Y_) {}var e, t;_kt = It ? function (e) {e.write(Dt("")), e.close();var t = e.parentWindow.Object;return e = null, t;}(It) : ((t = M("iframe")).style.display = "none", St.appendChild(t), t.src = String("javascript:"), (e = t.contentWindow.document).open(), e.write(Dt("document.F=Object")), e.close(), e.F);for (var n = ge.length; n--;) {delete _kt.prototype[ge[n]];}return _kt();};K[Et] = !0;var wt = Object.create || function (e, t) {var n;return null !== e ? (Tt.prototype = D(e), n = new Tt(), Tt.prototype = null, n[Et] = e) : n = _kt(), void 0 === t ? n : Mt(n, t);};Ae({ target: "Object", stat: !0, sham: !i }, { create: wt });var At = o(function () {Ct(1);});Ae({ target: "Object", stat: !0, forced: At }, { keys: function keys(e) {return Ct(Oe(e));} });var Rt,bt,Ot,Lt = function Lt(e) {return function (t, n) {var r,o,i = String(d(t)),a = ie(n),s = i.length;return a < 0 || a >= s ? e ? "" : void 0 : (r = i.charCodeAt(a)) < 55296 || r > 56319 || a + 1 === s || (o = i.charCodeAt(a + 1)) < 56320 || o > 57343 ? e ? i.charAt(a) : r : e ? i.slice(a, a + 2) : o - 56320 + (r - 55296 << 10) + 65536;};},Nt = { codeAt: Lt(!1), charAt: Lt(!0) },Pt = !o(function () {function e() {}return e.prototype.constructor = null, Object.getPrototypeOf(new e()) !== e.prototype;}),Gt = V("IE_PROTO"),xt = Object.prototype,Ut = Pt ? Object.getPrototypeOf : function (e) {return e = Oe(e), _(e, Gt) ? e[Gt] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? xt : null;},qt = qe("iterator"),Ft = !1;[].keys && ("next" in (Ot = [].keys()) ? (bt = Ut(Ut(Ot))) !== Object.prototype && (Rt = bt) : Ft = !0), null == Rt && (Rt = {}), _(Rt, qt) || A(Rt, qt, function () {return this;});var jt = { IteratorPrototype: Rt, BUGGY_SAFARI_ITERATORS: Ft },Bt = w.f,Ht = qe("toStringTag"),Vt = function Vt(e, t, n) {e && !_(e = n ? e : e.prototype, Ht) && Bt(e, Ht, { configurable: !0, value: t });},Kt = jt.IteratorPrototype,$t = function $t() {return this;},Yt = function Yt(e, t, n) {var r = t + " Iterator";return e.prototype = wt(Kt, { next: c(1, n) }), Vt(e, r, !1), tt[r] = $t, e;},zt = Object.setPrototypeOf || ("__proto__" in {} ? function () {var e,t = !1,n = {};try {(e = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(n, []), t = n instanceof Array;} catch (Y_) {}return function (n, r) {return D(n), function (e) {if (!m(e) && null !== e) throw TypeError("Can't set " + String(e) + " as a prototype");}(r), t ? e.call(n, r) : n.__proto__ = r, n;};}() : void 0),Wt = jt.IteratorPrototype,Xt = jt.BUGGY_SAFARI_ITERATORS,Jt = qe("iterator"),Qt = function Qt() {return this;},Zt = function Zt(e, t, n, r, o, i, a) {Yt(n, t, r);var s,u,c,l = function l(e) {if (e === o && g) return g;if (!Xt && e in h) return h[e];switch (e) {case "keys":case "values":case "entries":return function () {return new n(this, e);};}return function () {return new n(this);};},p = t + " Iterator",f = !1,h = e.prototype,d = h[Jt] || h["@@iterator"] || o && h[o],g = !Xt && d || l(o),m = "Array" == t && h.entries || d;if (m && (s = Ut(m.call(new e())), Wt !== Object.prototype && s.next && (Ut(s) !== Wt && (zt ? zt(s, Wt) : "function" != typeof s[Jt] && A(s, Jt, Qt)), Vt(s, p, !0))), "values" == o && d && "values" !== d.name && (f = !0, g = function g() {return d.call(this);}), h[Jt] !== g && A(h, Jt, g), tt[t] = g, o) if (u = { values: l("values"), keys: i ? g : l("keys"), entries: l("entries") }, a) for (c in u) {(Xt || f || !(c in h)) && Z(h, c, u[c]);} else Ae({ target: t, proto: !0, forced: Xt || f }, u);return u;},en = Nt.charAt,tn = Q.set,nn = Q.getterFor("String Iterator");Zt(String, "String", function (e) {tn(this, { type: "String Iterator", string: String(e), index: 0 });}, function () {var e,t = nn(this),n = t.string,r = t.index;return r >= n.length ? { value: void 0, done: !0 } : (e = en(n, r), t.index += e.length, { value: e, done: !1 });});var rn = { CSSRuleList: 0, CSSStyleDeclaration: 0, CSSValueList: 0, ClientRectList: 0, DOMRectList: 0, DOMStringList: 0, DOMTokenList: 1, DataTransferItemList: 0, FileList: 0, HTMLAllCollection: 0, HTMLCollection: 0, HTMLFormElement: 0, HTMLSelectElement: 0, MediaList: 0, MimeTypeArray: 0, NamedNodeMap: 0, NodeList: 1, PaintRequestList: 0, Plugin: 0, PluginArray: 0, SVGLengthList: 0, SVGNumberList: 0, SVGPathSegList: 0, SVGPointList: 0, SVGStringList: 0, SVGTransformList: 0, SourceBufferList: 0, StyleSheetList: 0, TextTrackCueList: 0, TextTrackList: 0, TouchList: 0 };for (var on in rn) {var an = r[on],sn = an && an.prototype;if (sn && sn.forEach !== Ze) try {A(sn, "forEach", Ze);} catch (Y_) {sn.forEach = Ze;}}var un,cn,ln = { SDK_READY: "sdkStateReady", SDK_NOT_READY: "sdkStateNotReady", SDK_DESTROY: "sdkDestroy", MESSAGE_RECEIVED: "onMessageReceived", MESSAGE_REVOKED: "onMessageRevoked", CONVERSATION_LIST_UPDATED: "onConversationListUpdated", GROUP_LIST_UPDATED: "onGroupListUpdated", GROUP_SYSTEM_NOTICE_RECEIVED: "receiveGroupSystemNotice", PROFILE_UPDATED: "onProfileUpdated", BLACKLIST_UPDATED: "blacklistUpdated", KICKED_OUT: "kickedOut", ERROR: "error", NET_STATE_CHANGE: "netStateChange" },pn = { MSG_TEXT: "TIMTextElem", MSG_IMAGE: "TIMImageElem", MSG_SOUND: "TIMSoundElem", MSG_AUDIO: "TIMSoundElem", MSG_FILE: "TIMFileElem", MSG_FACE: "TIMFaceElem", MSG_VIDEO: "TIMVideoFileElem", MSG_GEO: "TIMLocationElem", MSG_GRP_TIP: "TIMGroupTipElem", MSG_GRP_SYS_NOTICE: "TIMGroupSystemNoticeElem", MSG_CUSTOM: "TIMCustomElem", MSG_PRIORITY_HIGH: "High", MSG_PRIORITY_NORMAL: "Normal", MSG_PRIORITY_LOW: "Low", MSG_PRIORITY_LOWEST: "Lowest", CONV_C2C: "C2C", CONV_GROUP: "GROUP", CONV_SYSTEM: "@TIM#SYSTEM", GRP_PRIVATE: "Private", GRP_PUBLIC: "Public", GRP_CHATROOM: "ChatRoom", GRP_AVCHATROOM: "AVChatRoom", GRP_MBR_ROLE_OWNER: "Owner", GRP_MBR_ROLE_ADMIN: "Admin", GRP_MBR_ROLE_MEMBER: "Member", GRP_TIP_MBR_JOIN: 1, GRP_TIP_MBR_QUIT: 2, GRP_TIP_MBR_KICKED_OUT: 3, GRP_TIP_MBR_SET_ADMIN: 4, GRP_TIP_MBR_CANCELED_ADMIN: 5, GRP_TIP_GRP_PROFILE_UPDATED: 6, GRP_TIP_MBR_PROFILE_UPDATED: 7, MSG_REMIND_ACPT_AND_NOTE: "AcceptAndNotify", MSG_REMIND_ACPT_NOT_NOTE: "AcceptNotNotify", MSG_REMIND_DISCARD: "Discard", GENDER_UNKNOWN: "Gender_Type_Unknown", GENDER_FEMALE: "Gender_Type_Female", GENDER_MALE: "Gender_Type_Male", KICKED_OUT_MULT_ACCOUNT: "multipleAccount", KICKED_OUT_MULT_DEVICE: "multipleDevice", KICKED_OUT_USERSIG_EXPIRED: "userSigExpired", ALLOW_TYPE_ALLOW_ANY: "AllowType_Type_AllowAny", ALLOW_TYPE_NEED_CONFIRM: "AllowType_Type_NeedConfirm", ALLOW_TYPE_DENY_ANY: "AllowType_Type_DenyAny", FORBID_TYPE_NONE: "AdminForbid_Type_None", FORBID_TYPE_SEND_OUT: "AdminForbid_Type_SendOut", JOIN_OPTIONS_FREE_ACCESS: "FreeAccess", JOIN_OPTIONS_NEED_PERMISSION: "NeedPermission", JOIN_OPTIONS_DISABLE_APPLY: "DisableApply", JOIN_STATUS_SUCCESS: "JoinedSuccess", JOIN_STATUS_ALREADY_IN_GROUP: "AlreadyInGroup", JOIN_STATUS_WAIT_APPROVAL: "WaitAdminApproval", GRP_PROFILE_OWNER_ID: "ownerID", GRP_PROFILE_CREATE_TIME: "createTime", GRP_PROFILE_LAST_INFO_TIME: "lastInfoTime", GRP_PROFILE_MEMBER_NUM: "memberNum", GRP_PROFILE_MAX_MEMBER_NUM: "maxMemberNum", GRP_PROFILE_JOIN_OPTION: "joinOption", GRP_PROFILE_INTRODUCTION: "introduction", GRP_PROFILE_NOTIFICATION: "notification", GRP_PROFILE_MUTE_ALL_MBRS: "muteAllMembers", NET_STATE_CONNECTED: "connected", NET_STATE_CONNECTING: "connecting", NET_STATE_DISCONNECTED: "disconnected" },fn = ne("navigator", "userAgent") || "",hn = r.process,dn = hn && hn.versions,gn = dn && dn.v8;gn ? cn = (un = gn.split("."))[0] + un[1] : fn && (!(un = fn.match(/Edge\/(\d+)/)) || un[1] >= 74) && (un = fn.match(/Chrome\/(\d+)/)) && (cn = un[1]);var mn = cn && +cn,vn = qe("species"),yn = function yn(e) {return mn >= 51 || !o(function () {var t = [];return (t.constructor = {})[vn] = function () {return { foo: 1 };}, 1 !== t[e](Boolean).foo;});},_n = Ve.map,In = yn("map"),Cn = We("map");Ae({ target: "Array", proto: !0, forced: !In || !Cn }, { map: function map(e) {return _n(this, e, arguments.length > 1 ? arguments[1] : void 0);} });var Mn = [].slice,Sn = {},En = function En(e, t, n) {if (!(t in Sn)) {for (var r = [], o = 0; o < t; o++) {r[o] = "a[" + o + "]";}Sn[t] = Function("C,a", "return new C(" + r.join(",") + ")");}return Sn[t](e, n);},Tn = Function.bind || function (e) {var t = Re(this),n = Mn.call(arguments, 1),r = function r() {var o = n.concat(Mn.call(arguments));return this instanceof r ? En(t, o.length, o) : t.apply(e, o);};return m(t.prototype) && (r.prototype = t.prototype), r;};function Dn(e) {return (Dn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {return typeof e;} : function (e) {return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;})(e);}function kn(e, t) {if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");}function wn(e, t) {for (var n = 0; n < t.length; n++) {var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);}}function An(e, t, n) {return t && wn(e.prototype, t), n && wn(e, n), e;}function Rn(e, t, n) {return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;}function bn(e, t) {var n = Object.keys(e);if (Object.getOwnPropertySymbols) {var r = Object.getOwnPropertySymbols(e);t && (r = r.filter(function (t) {return Object.getOwnPropertyDescriptor(e, t).enumerable;})), n.push.apply(n, r);}return n;}function On(e) {for (var t = 1; t < arguments.length; t++) {var n = null != arguments[t] ? arguments[t] : {};t % 2 ? bn(Object(n), !0).forEach(function (t) {Rn(e, t, n[t]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : bn(Object(n)).forEach(function (t) {Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));});}return e;}function Ln(e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), t && Pn(e, t);}function Nn(e) {return (Nn = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {return e.__proto__ || Object.getPrototypeOf(e);})(e);}function Pn(e, t) {return (Pn = Object.setPrototypeOf || function (e, t) {return e.__proto__ = t, e;})(e, t);}function Gn() {if ("undefined" == typeof Reflect || !Reflect.construct) return !1;if (Reflect.construct.sham) return !1;if ("function" == typeof Proxy) return !0;try {return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;} catch (e) {return !1;}}function xn(e, t, n) {return (xn = Gn() ? Reflect.construct : function (e, t, n) {var r = [null];r.push.apply(r, t);var o = new (Function.bind.apply(e, r))();return n && Pn(o, n.prototype), o;}).apply(null, arguments);}function Un(e) {var t = "function" == typeof Map ? new Map() : void 0;return (Un = function Un(e) {if (null === e || (n = e, -1 === Function.toString.call(n).indexOf("[native code]"))) return e;var n;if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");if (void 0 !== t) {if (t.has(e)) return t.get(e);t.set(e, r);}function r() {return xn(e, arguments, Nn(this).constructor);}return r.prototype = Object.create(e.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), Pn(r, e);})(e);}function qn(e) {if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e;}function Fn(e, t) {return !t || "object" != typeof t && "function" != typeof t ? qn(e) : t;}function jn(e) {return function () {var t,n = Nn(e);if (Gn()) {var r = Nn(this).constructor;t = Reflect.construct(n, arguments, r);} else t = n.apply(this, arguments);return Fn(this, t);};}function Bn(e, t) {return function (e) {if (Array.isArray(e)) return e;}(e) || function (e, t) {if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e))) return;var n = [],r = !0,o = !1,i = void 0;try {for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0) {;}} catch (u) {o = !0, i = u;} finally {try {r || null == s.return || s.return();} finally {if (o) throw i;}}return n;}(e, t) || Vn(e, t) || function () {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}();}function Hn(e) {return function (e) {if (Array.isArray(e)) return Kn(e);}(e) || function (e) {if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);}(e) || Vn(e) || function () {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}();}function Vn(e, t) {if (e) {if ("string" == typeof e) return Kn(e, t);var n = Object.prototype.toString.call(e).slice(8, -1);return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(n) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? Kn(e, t) : void 0;}}function Kn(e, t) {(null == t || t > e.length) && (t = e.length);for (var n = 0, r = new Array(t); n < t; n++) {r[n] = e[n];}return r;}function $n(e) {if ("undefined" == typeof Symbol || null == e[Symbol.iterator]) {if (Array.isArray(e) || (e = Vn(e))) {var t = 0,n = function n() {};return { s: n, n: function n() {return t >= e.length ? { done: !0 } : { done: !1, value: e[t++] };}, e: function e(_e2) {throw _e2;}, f: n };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var r,o,i = !0,a = !1;return { s: function s() {r = e[Symbol.iterator]();}, n: function n() {var e = r.next();return i = e.done, e;}, e: function e(_e3) {a = !0, o = _e3;}, f: function f() {try {i || null == r.return || r.return();} finally {if (a) throw o;}} };}Ae({ target: "Function", proto: !0 }, { bind: Tn });var Yn = function () {function e() {kn(this, e), this.cache = [], this.options = null;}return An(e, [{ key: "use", value: function value(e) {if ("function" != typeof e) throw "middleware must be a function";return this.cache.push(e), this;} }, { key: "next", value: function value(e) {if (this.middlewares && this.middlewares.length > 0) return this.middlewares.shift().call(this, this.options, this.next.bind(this));} }, { key: "run", value: function value(e) {return this.middlewares = this.cache.map(function (e) {return e;}), this.options = e, this.next();} }]), e;}(),zn = qe("isConcatSpreadable"),Wn = mn >= 51 || !o(function () {var e = [];return e[zn] = !1, e.concat()[0] !== e;}),Xn = yn("concat"),Jn = function Jn(e) {if (!m(e)) return !1;var t = e[zn];return void 0 !== t ? !!t : Le(e);};Ae({ target: "Array", proto: !0, forced: !Wn || !Xn }, { concat: function concat(e) {var t,n,r,o,i,a = Oe(this),s = je(a, 0),u = 0;for (t = -1, r = arguments.length; t < r; t++) {if (i = -1 === t ? a : arguments[t], Jn(i)) {if (u + (o = se(i.length)) > 9007199254740991) throw TypeError("Maximum allowed index exceeded");for (n = 0; n < o; n++, u++) {n in i && it(s, u, i[n]);}} else {if (u >= 9007199254740991) throw TypeError("Maximum allowed index exceeded");it(s, u++, i);}}return s.length = u, s;} });var Qn = w.f,Zn = Function.prototype,er = Zn.toString,tr = /^\s*function ([^ (]*)/;i && !("name" in Zn) && Qn(Zn, "name", { configurable: !0, get: function get() {try {return er.call(this).match(tr)[1];} catch (Y_) {return "";}} });var nr = t(function (t, n) {var r, o, i, a, s, u, c, l, p, f, h, d, g, m, v, y, _, I;t.exports = (r = "function" == typeof Promise, o = "object" == typeof self ? self : e, i = "undefined" != typeof Symbol, a = "undefined" != typeof Map, s = "undefined" != typeof Set, u = "undefined" != typeof WeakMap, c = "undefined" != typeof WeakSet, l = "undefined" != typeof DataView, p = i && void 0 !== Symbol.iterator, f = i && void 0 !== Symbol.toStringTag, h = s && "function" == typeof Set.prototype.entries, d = a && "function" == typeof Map.prototype.entries, g = h && Object.getPrototypeOf(new Set().entries()), m = d && Object.getPrototypeOf(new Map().entries()), v = p && "function" == typeof Array.prototype[Symbol.iterator], y = v && Object.getPrototypeOf([][Symbol.iterator]()), _ = p && "function" == typeof String.prototype[Symbol.iterator], I = _ && Object.getPrototypeOf(""[Symbol.iterator]()), function (e) {var t = typeof e;if ("object" !== t) return t;if (null === e) return "null";if (e === o) return "global";if (Array.isArray(e) && (!1 === f || !(Symbol.toStringTag in e))) return "Array";if ("object" == typeof window && null !== window) {if ("object" == typeof window.location && e === window.location) return "Location";if ("object" == typeof window.document && e === window.document) return "Document";if ("object" == typeof window.navigator) {if ("object" == typeof window.navigator.mimeTypes && e === window.navigator.mimeTypes) return "MimeTypeArray";if ("object" == typeof window.navigator.plugins && e === window.navigator.plugins) return "PluginArray";}if (("function" == typeof window.HTMLElement || "object" == typeof window.HTMLElement) && e instanceof window.HTMLElement) {if ("BLOCKQUOTE" === e.tagName) return "HTMLQuoteElement";if ("TD" === e.tagName) return "HTMLTableDataCellElement";if ("TH" === e.tagName) return "HTMLTableHeaderCellElement";}}var n = f && e[Symbol.toStringTag];if ("string" == typeof n) return n;var i = Object.getPrototypeOf(e);return i === RegExp.prototype ? "RegExp" : i === Date.prototype ? "Date" : r && i === Promise.prototype ? "Promise" : s && i === Set.prototype ? "Set" : a && i === Map.prototype ? "Map" : c && i === WeakSet.prototype ? "WeakSet" : u && i === WeakMap.prototype ? "WeakMap" : l && i === DataView.prototype ? "DataView" : a && i === m ? "Map Iterator" : s && i === g ? "Set Iterator" : v && i === y ? "Array Iterator" : _ && i === I ? "String Iterator" : null === i ? "Object" : Object.prototype.toString.call(e).slice(8, -1);});});Ae({ target: "Array", stat: !0 }, { isArray: Le });var rr = qe("unscopables"),or = Array.prototype;null == or[rr] && w.f(or, rr, { configurable: !0, value: wt(null) });var ir = function ir(e) {or[rr][e] = !0;},ar = Ve.find,sr = !0,ur = We("find");"find" in [] && Array(1).find(function () {sr = !1;}), Ae({ target: "Array", proto: !0, forced: sr || !ur }, { find: function find(e) {return ar(this, e, arguments.length > 1 ? arguments[1] : void 0);} }), ir("find");var cr = fe.includes,lr = We("indexOf", { ACCESSORS: !0, 1: 0 });Ae({ target: "Array", proto: !0, forced: !lr }, { includes: function includes(e) {return cr(this, e, arguments.length > 1 ? arguments[1] : void 0);} }), ir("includes");var pr = fe.indexOf,fr = [].indexOf,hr = !!fr && 1 / [1].indexOf(1, -0) < 0,dr = Ke("indexOf"),gr = We("indexOf", { ACCESSORS: !0, 1: 0 });Ae({ target: "Array", proto: !0, forced: hr || !dr || !gr }, { indexOf: function indexOf(e) {return hr ? fr.apply(this, arguments) || 0 : pr(this, e, arguments.length > 1 ? arguments[1] : void 0);} });var mr = Q.set,vr = Q.getterFor("Array Iterator"),yr = Zt(Array, "Array", function (e, t) {mr(this, { type: "Array Iterator", target: g(e), index: 0, kind: t });}, function () {var e = vr(this),t = e.target,n = e.kind,r = e.index++;return !t || r >= t.length ? (e.target = void 0, { value: void 0, done: !0 }) : "keys" == n ? { value: r, done: !1 } : "values" == n ? { value: t[r], done: !1 } : { value: [r, t[r]], done: !1 };}, "values");tt.Arguments = tt.Array, ir("keys"), ir("values"), ir("entries");var _r = [].join,Ir = h != Object,Cr = Ke("join", ",");Ae({ target: "Array", proto: !0, forced: Ir || !Cr }, { join: function join(e) {return _r.call(g(this), void 0 === e ? "," : e);} });var Mr = yn("slice"),Sr = We("slice", { ACCESSORS: !0, 0: 0, 1: 2 }),Er = qe("species"),Tr = [].slice,Dr = Math.max;Ae({ target: "Array", proto: !0, forced: !Mr || !Sr }, { slice: function slice(e, t) {var n,r,o,i = g(this),a = se(i.length),s = le(e, a),u = le(void 0 === t ? a : t, a);if (Le(i) && ("function" != typeof (n = i.constructor) || n !== Array && !Le(n.prototype) ? m(n) && null === (n = n[Er]) && (n = void 0) : n = void 0, n === Array || void 0 === n)) return Tr.call(i, s, u);for (r = new (void 0 === n ? Array : n)(Dr(u - s, 0)), o = 0; s < u; s++, o++) {s in i && it(r, o, i[s]);}return r.length = o, r;} }), Ae({ target: "Date", stat: !0 }, { now: function now() {return new Date().getTime();} });var kr = "".repeat || function (e) {var t = String(d(this)),n = "",r = ie(e);if (r < 0 || Infinity == r) throw RangeError("Wrong number of repetitions");for (; r > 0; (r >>>= 1) && (t += t)) {1 & r && (n += t);}return n;},wr = Math.ceil,Ar = function Ar(e) {return function (t, n, r) {var o,i,a = String(d(t)),s = a.length,u = void 0 === r ? " " : String(r),c = se(n);return c <= s || "" == u ? a : (o = c - s, (i = kr.call(u, wr(o / u.length))).length > o && (i = i.slice(0, o)), e ? a + i : i + a);};},Rr = { start: Ar(!1), end: Ar(!0) }.start,br = Math.abs,Or = Date.prototype,Lr = Or.getTime,Nr = Or.toISOString,Pr = o(function () {return "0385-07-25T07:06:39.999Z" != Nr.call(new Date(-50000000000001));}) || !o(function () {Nr.call(new Date(NaN));}) ? function () {if (!isFinite(Lr.call(this))) throw RangeError("Invalid time value");var e = this.getUTCFullYear(),t = this.getUTCMilliseconds(),n = e < 0 ? "-" : e > 9999 ? "+" : "";return n + Rr(br(e), n ? 6 : 4, 0) + "-" + Rr(this.getUTCMonth() + 1, 2, 0) + "-" + Rr(this.getUTCDate(), 2, 0) + "T" + Rr(this.getUTCHours(), 2, 0) + ":" + Rr(this.getUTCMinutes(), 2, 0) + ":" + Rr(this.getUTCSeconds(), 2, 0) + "." + Rr(t, 3, 0) + "Z";} : Nr;Ae({ target: "Date", proto: !0, forced: Date.prototype.toISOString !== Pr }, { toISOString: Pr });var Gr = Date.prototype,xr = Gr.toString,Ur = Gr.getTime;new Date(NaN) + "" != "Invalid Date" && Z(Gr, "toString", function () {var e = Ur.call(this);return e == e ? xr.call(this) : "Invalid Date";});var qr = function qr(e, t, n) {var r, o;return zt && "function" == typeof (r = t.constructor) && r !== n && m(o = r.prototype) && o !== n.prototype && zt(e, o), e;},Fr = "\t\n\x0B\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF",jr = "[" + Fr + "]",Br = RegExp("^" + jr + jr + "*"),Hr = RegExp(jr + jr + "*$"),Vr = function Vr(e) {return function (t) {var n = String(d(t));return 1 & e && (n = n.replace(Br, "")), 2 & e && (n = n.replace(Hr, "")), n;};},Kr = { start: Vr(1), end: Vr(2), trim: Vr(3) },$r = ve.f,Yr = T.f,zr = w.f,Wr = Kr.trim,Xr = r.Number,Jr = Xr.prototype,Qr = "Number" == p(wt(Jr)),Zr = function Zr(e) {var t,n,r,o,i,a,s,u,c = v(e, !1);if ("string" == typeof c && c.length > 2) if (43 === (t = (c = Wr(c)).charCodeAt(0)) || 45 === t) {if (88 === (n = c.charCodeAt(2)) || 120 === n) return NaN;} else if (48 === t) {switch (c.charCodeAt(1)) {case 66:case 98:r = 2, o = 49;break;case 79:case 111:r = 8, o = 55;break;default:return +c;}for (a = (i = c.slice(2)).length, s = 0; s < a; s++) {if ((u = i.charCodeAt(s)) < 48 || u > o) return NaN;}return parseInt(i, r);}return +c;};if (ke("Number", !Xr(" 0o1") || !Xr("0b1") || Xr("+0x1"))) {for (var eo, to = function to(e) {var t = arguments.length < 1 ? 0 : e,n = this;return n instanceof to && (Qr ? o(function () {Jr.valueOf.call(n);}) : "Number" != p(n)) ? qr(new Xr(Zr(t)), n, to) : Zr(t);}, no = i ? $r(Xr) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), ro = 0; no.length > ro; ro++) {_(Xr, eo = no[ro]) && !_(to, eo) && zr(to, eo, Yr(Xr, eo));}to.prototype = Jr, Jr.constructor = to, Z(r, "Number", to);}var oo = ve.f,io = {}.toString,ao = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],so = { f: function f(e) {return ao && "[object Window]" == io.call(e) ? function (e) {try {return oo(e);} catch (Y_) {return ao.slice();}}(e) : oo(g(e));} },uo = so.f,co = o(function () {return !Object.getOwnPropertyNames(1);});Ae({ target: "Object", stat: !0, forced: co }, { getOwnPropertyNames: uo });var lo = o(function () {Ut(1);});Ae({ target: "Object", stat: !0, forced: lo, sham: !Pt }, { getPrototypeOf: function getPrototypeOf(e) {return Ut(Oe(e));} });var po = st ? {}.toString : function () {return "[object " + lt(this) + "]";};st || Z(Object.prototype, "toString", po, { unsafe: !0 });var fo = Kr.trim,ho = r.parseInt,go = /^[+-]?0[Xx]/,mo = 8 !== ho(Fr + "08") || 22 !== ho(Fr + "0x16") ? function (e, t) {var n = fo(String(e));return ho(n, t >>> 0 || (go.test(n) ? 16 : 10));} : ho;Ae({ global: !0, forced: parseInt != mo }, { parseInt: mo });var vo,yo,_o,Io = r.Promise,Co = function Co(e, t, n) {for (var r in t) {Z(e, r, t[r], n);}return e;},Mo = qe("species"),So = function So(e) {var t = ne(e),n = w.f;i && t && !t[Mo] && n(t, Mo, { configurable: !0, get: function get() {return this;} });},Eo = function Eo(e, t, n) {if (!(e instanceof t)) throw TypeError("Incorrect " + (n ? n + " " : "") + "invocation");return e;},To = t(function (e) {var t = function t(e, _t2) {this.stopped = e, this.result = _t2;};(e.exports = function (e, n, r, o, i) {var a,s,u,c,l,p,f,h = be(n, r, o ? 2 : 1);if (i) a = e;else {if ("function" != typeof (s = ft(e))) throw TypeError("Target is not iterable");if (ot(s)) {for (u = 0, c = se(e.length); c > u; u++) {if ((l = o ? h(D(f = e[u])[0], f[1]) : h(e[u])) && l instanceof t) return l;}return new t(!1);}a = s.call(e);}for (p = a.next; !(f = p.call(a)).done;) {if ("object" == typeof (l = et(a, h, f.value, o)) && l && l instanceof t) return l;}return new t(!1);}).stop = function (e) {return new t(!0, e);};}),Do = qe("species"),ko = function ko(e, t) {var n,r = D(e).constructor;return void 0 === r || null == (n = D(r)[Do]) ? t : Re(n);},wo = /(iphone|ipod|ipad).*applewebkit/i.test(fn),Ao = r.location,Ro = r.setImmediate,bo = r.clearImmediate,Oo = r.process,Lo = r.MessageChannel,No = r.Dispatch,Po = 0,Go = {},xo = function xo(e) {if (Go.hasOwnProperty(e)) {var t = Go[e];delete Go[e], t();}},Uo = function Uo(e) {return function () {xo(e);};},qo = function qo(e) {xo(e.data);},Fo = function Fo(e) {r.postMessage(e + "", Ao.protocol + "//" + Ao.host);};Ro && bo || (Ro = function Ro(e) {for (var t = [], n = 1; arguments.length > n;) {t.push(arguments[n++]);}return Go[++Po] = function () {("function" == typeof e ? e : Function(e)).apply(void 0, t);}, vo(Po), Po;}, bo = function bo(e) {delete Go[e];}, "process" == p(Oo) ? vo = function vo(e) {Oo.nextTick(Uo(e));} : No && No.now ? vo = function vo(e) {No.now(Uo(e));} : Lo && !wo ? (_o = (yo = new Lo()).port2, yo.port1.onmessage = qo, vo = be(_o.postMessage, _o, 1)) : !r.addEventListener || "function" != typeof postMessage || r.importScripts || o(Fo) ? vo = "onreadystatechange" in M("script") ? function (e) {St.appendChild(M("script")).onreadystatechange = function () {St.removeChild(this), xo(e);};} : function (e) {setTimeout(Uo(e), 0);} : (vo = Fo, r.addEventListener("message", qo, !1)));var jo,Bo,Ho,Vo,Ko,$o,Yo,zo,Wo = { set: Ro, clear: bo },Xo = T.f,Jo = Wo.set,Qo = r.MutationObserver || r.WebKitMutationObserver,Zo = r.process,ei = r.Promise,ti = "process" == p(Zo),ni = Xo(r, "queueMicrotask"),ri = ni && ni.value;ri || (jo = function jo() {var e, t;for (ti && (e = Zo.domain) && e.exit(); Bo;) {t = Bo.fn, Bo = Bo.next;try {t();} catch (Y_) {throw Bo ? Vo() : Ho = void 0, Y_;}}Ho = void 0, e && e.enter();}, ti ? Vo = function Vo() {Zo.nextTick(jo);} : Qo && !wo ? (Ko = !0, $o = document.createTextNode(""), new Qo(jo).observe($o, { characterData: !0 }), Vo = function Vo() {$o.data = Ko = !Ko;}) : ei && ei.resolve ? (Yo = ei.resolve(void 0), zo = Yo.then, Vo = function Vo() {zo.call(Yo, jo);}) : Vo = function Vo() {Jo.call(r, jo);});var oi,ii,ai,si,ui = ri || function (e) {var t = { fn: e, next: void 0 };Ho && (Ho.next = t), Bo || (Bo = t, Vo()), Ho = t;},ci = function ci(e) {var t, n;this.promise = new e(function (e, r) {if (void 0 !== t || void 0 !== n) throw TypeError("Bad Promise constructor");t = e, n = r;}), this.resolve = Re(t), this.reject = Re(n);},li = { f: function f(e) {return new ci(e);} },pi = function pi(e, t) {if (D(e), m(t) && t.constructor === e) return t;var n = li.f(e);return (0, n.resolve)(t), n.promise;},fi = function fi(e) {try {return { error: !1, value: e() };} catch (Y_) {return { error: !0, value: Y_ };}},hi = Wo.set,di = qe("species"),gi = "Promise",mi = Q.get,vi = Q.set,yi = Q.getterFor(gi),_i2 = Io,Ii = r.TypeError,Ci = r.document,Mi = r.process,Si = ne("fetch"),Ei = li.f,Ti = Ei,Di = "process" == p(Mi),ki = !!(Ci && Ci.createEvent && r.dispatchEvent),wi = ke(gi, function () {if (!(G(_i2) !== String(_i2))) {if (66 === mn) return !0;if (!Di && "function" != typeof PromiseRejectionEvent) return !0;}if (mn >= 51 && /native code/.test(_i2)) return !1;var e = _i2.resolve(1),t = function t(e) {e(function () {}, function () {});};return (e.constructor = {})[di] = t, !(e.then(function () {}) instanceof t);}),Ai = wi || !yt(function (e) {_i2.all(e).catch(function () {});}),Ri = function Ri(e) {var t;return !(!m(e) || "function" != typeof (t = e.then)) && t;},bi = function bi(e, t, n) {if (!t.notified) {t.notified = !0;var r = t.reactions;ui(function () {for (var o = t.value, i = 1 == t.state, a = 0; r.length > a;) {var s,u,c,l = r[a++],p = i ? l.ok : l.fail,f = l.resolve,h = l.reject,d = l.domain;try {p ? (i || (2 === t.rejection && Pi(e, t), t.rejection = 1), !0 === p ? s = o : (d && d.enter(), s = p(o), d && (d.exit(), c = !0)), s === l.promise ? h(Ii("Promise-chain cycle")) : (u = Ri(s)) ? u.call(s, f, h) : f(s)) : h(o);} catch (Y_) {d && !c && d.exit(), h(Y_);}}t.reactions = [], t.notified = !1, n && !t.rejection && Li(e, t);});}},Oi = function Oi(e, t, n) {var o, i;ki ? ((o = Ci.createEvent("Event")).promise = t, o.reason = n, o.initEvent(e, !1, !0), r.dispatchEvent(o)) : o = { promise: t, reason: n }, (i = r["on" + e]) ? i(o) : "unhandledrejection" === e && function (e, t) {var n = r.console;n && n.error && (1 === arguments.length ? n.error(e) : n.error(e, t));}("Unhandled promise rejection", n);},Li = function Li(e, t) {hi.call(r, function () {var n,r = t.value;if (Ni(t) && (n = fi(function () {Di ? Mi.emit("unhandledRejection", r, e) : Oi("unhandledrejection", e, r);}), t.rejection = Di || Ni(t) ? 2 : 1, n.error)) throw n.value;});},Ni = function Ni(e) {return 1 !== e.rejection && !e.parent;},Pi = function Pi(e, t) {hi.call(r, function () {Di ? Mi.emit("rejectionHandled", e) : Oi("rejectionhandled", e, t.value);});},Gi = function Gi(e, t, n, r) {return function (o) {e(t, n, o, r);};},xi = function xi(e, t, n, r) {t.done || (t.done = !0, r && (t = r), t.value = n, t.state = 2, bi(e, t, !0));},Ui = function Ui(e, t, n, r) {if (!t.done) {t.done = !0, r && (t = r);try {if (e === n) throw Ii("Promise can't be resolved itself");var o = Ri(n);o ? ui(function () {var r = { done: !1 };try {o.call(n, Gi(Ui, e, r, t), Gi(xi, e, r, t));} catch (Y_) {xi(e, r, Y_, t);}}) : (t.value = n, t.state = 1, bi(e, t, !1));} catch (Y_) {xi(e, { done: !1 }, Y_, t);}}};wi && (_i2 = function _i(e) {Eo(this, _i2, gi), Re(e), oi.call(this);var t = mi(this);try {e(Gi(Ui, this, t), Gi(xi, this, t));} catch (Y_) {xi(this, t, Y_);}}, (oi = function oi(e) {vi(this, { type: gi, done: !1, notified: !1, parent: !1, reactions: [], rejection: !1, state: 0, value: void 0 });}).prototype = Co(_i2.prototype, { then: function then(e, t) {var n = yi(this),r = Ei(ko(this, _i2));return r.ok = "function" != typeof e || e, r.fail = "function" == typeof t && t, r.domain = Di ? Mi.domain : void 0, n.parent = !0, n.reactions.push(r), 0 != n.state && bi(this, n, !1), r.promise;}, catch: function _catch(e) {return this.then(void 0, e);} }), ii = function ii() {var e = new oi(),t = mi(e);this.promise = e, this.resolve = Gi(Ui, e, t), this.reject = Gi(xi, e, t);}, li.f = Ei = function Ei(e) {return e === _i2 || e === ai ? new ii(e) : Ti(e);}, "function" == typeof Io && (si = Io.prototype.then, Z(Io.prototype, "then", function (e, t) {var n = this;return new _i2(function (e, t) {si.call(n, e, t);}).then(e, t);}, { unsafe: !0 }), "function" == typeof Si && Ae({ global: !0, enumerable: !0, forced: !0 }, { fetch: function fetch(e) {return pi(_i2, Si.apply(r, arguments));} }))), Ae({ global: !0, wrap: !0, forced: wi }, { Promise: _i2 }), Vt(_i2, gi, !1), So(gi), ai = ne(gi), Ae({ target: gi, stat: !0, forced: wi }, { reject: function reject(e) {var t = Ei(this);return t.reject.call(void 0, e), t.promise;} }), Ae({ target: gi, stat: !0, forced: wi }, { resolve: function resolve(e) {return pi(this, e);} }), Ae({ target: gi, stat: !0, forced: Ai }, { all: function all(e) {var t = this,n = Ei(t),r = n.resolve,o = n.reject,i = fi(function () {var n = Re(t.resolve),i = [],a = 0,s = 1;To(e, function (e) {var u = a++,c = !1;i.push(void 0), s++, n.call(t, e).then(function (e) {c || (c = !0, i[u] = e, --s || r(i));}, o);}), --s || r(i);});return i.error && o(i.value), n.promise;}, race: function race(e) {var t = this,n = Ei(t),r = n.reject,o = fi(function () {var o = Re(t.resolve);To(e, function (e) {o.call(t, e).then(n.resolve, r);});});return o.error && r(o.value), n.promise;} });var qi = function qi() {var e = D(this),t = "";return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.dotAll && (t += "s"), e.unicode && (t += "u"), e.sticky && (t += "y"), t;};function Fi(e, t) {return RegExp(e, t);}var ji,Bi,Hi = { UNSUPPORTED_Y: o(function () {var e = Fi("a", "y");return e.lastIndex = 2, null != e.exec("abcd");}), BROKEN_CARET: o(function () {var e = Fi("^r", "gy");return e.lastIndex = 2, null != e.exec("str");}) },Vi = RegExp.prototype.exec,Ki = String.prototype.replace,$i = Vi,Yi = (ji = /a/, Bi = /b*/g, Vi.call(ji, "a"), Vi.call(Bi, "a"), 0 !== ji.lastIndex || 0 !== Bi.lastIndex),zi = Hi.UNSUPPORTED_Y || Hi.BROKEN_CARET,Wi = void 0 !== /()??/.exec("")[1];(Yi || Wi || zi) && ($i = function $i(e) {var t,n,r,o,i = this,a = zi && i.sticky,s = qi.call(i),u = i.source,c = 0,l = e;return a && (-1 === (s = s.replace("y", "")).indexOf("g") && (s += "g"), l = String(e).slice(i.lastIndex), i.lastIndex > 0 && (!i.multiline || i.multiline && "\n" !== e[i.lastIndex - 1]) && (u = "(?: " + u + ")", l = " " + l, c++), n = new RegExp("^(?:" + u + ")", s)), Wi && (n = new RegExp("^" + u + "$(?!\\s)", s)), Yi && (t = i.lastIndex), r = Vi.call(a ? n : i, l), a ? r ? (r.input = r.input.slice(c), r[0] = r[0].slice(c), r.index = i.lastIndex, i.lastIndex += r[0].length) : i.lastIndex = 0 : Yi && r && (i.lastIndex = i.global ? r.index + r[0].length : t), Wi && r && r.length > 1 && Ki.call(r[0], n, function () {for (o = 1; o < arguments.length - 2; o++) {void 0 === arguments[o] && (r[o] = void 0);}}), r;});var Xi = $i;Ae({ target: "RegExp", proto: !0, forced: /./.exec !== Xi }, { exec: Xi });var Ji = RegExp.prototype,Qi = Ji.toString,Zi = o(function () {return "/a/b" != Qi.call({ source: "a", flags: "b" });}),ea = "toString" != Qi.name;(Zi || ea) && Z(RegExp.prototype, "toString", function () {var e = D(this),t = String(e.source),n = e.flags;return "/" + t + "/" + String(void 0 === n && e instanceof RegExp && !("flags" in Ji) ? qi.call(e) : n);}, { unsafe: !0 });var ta = qe("match"),na = function na(e) {var t;return m(e) && (void 0 !== (t = e[ta]) ? !!t : "RegExp" == p(e));},ra = function ra(e) {if (na(e)) throw TypeError("The method doesn't accept regular expressions");return e;},oa = qe("match");Ae({ target: "String", proto: !0, forced: !function (e) {var t = /./;try {"/./"[e](t);} catch (n) {try {return t[oa] = !1, "/./"[e](t);} catch (r) {}}return !1;}("includes") }, { includes: function includes(e) {return !!~String(d(this)).indexOf(ra(e), arguments.length > 1 ? arguments[1] : void 0);} });var ia = qe("species"),aa = !o(function () {var e = /./;return e.exec = function () {var e = [];return e.groups = { a: "7" }, e;}, "7" !== "".replace(e, "$<a>");}),sa = "$0" === "a".replace(/./, "$0"),ua = qe("replace"),ca = !!/./[ua] && "" === /./[ua]("a", "$0"),la = !o(function () {var e = /(?:)/,t = e.exec;e.exec = function () {return t.apply(this, arguments);};var n = "ab".split(e);return 2 !== n.length || "a" !== n[0] || "b" !== n[1];}),pa = function pa(e, t, n, r) {var i = qe(e),a = !o(function () {var t = {};return t[i] = function () {return 7;}, 7 != ""[e](t);}),s = a && !o(function () {var t = !1,n = /a/;return "split" === e && ((n = {}).constructor = {}, n.constructor[ia] = function () {return n;}, n.flags = "", n[i] = /./[i]), n.exec = function () {return t = !0, null;}, n[i](""), !t;});if (!a || !s || "replace" === e && (!aa || !sa || ca) || "split" === e && !la) {var u = /./[i],c = n(i, ""[e], function (e, t, n, r, o) {return t.exec === Xi ? a && !o ? { done: !0, value: u.call(t, n, r) } : { done: !0, value: e.call(n, t, r) } : { done: !1 };}, { REPLACE_KEEPS_$0: sa, REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: ca }),l = c[0],p = c[1];Z(String.prototype, e, l), Z(RegExp.prototype, i, 2 == t ? function (e, t) {return p.call(e, this, t);} : function (e) {return p.call(e, this);});}r && A(RegExp.prototype[i], "sham", !0);},fa = Nt.charAt,ha = function ha(e, t, n) {return t + (n ? fa(e, t).length : 1);},da = function da(e, t) {var n = e.exec;if ("function" == typeof n) {var r = n.call(e, t);if ("object" != typeof r) throw TypeError("RegExp exec method returned something other than an Object or null");return r;}if ("RegExp" !== p(e)) throw TypeError("RegExp#exec called on incompatible receiver");return Xi.call(e, t);};pa("match", 1, function (e, t, n) {return [function (t) {var n = d(this),r = null == t ? void 0 : t[e];return void 0 !== r ? r.call(t, n) : new RegExp(t)[e](String(n));}, function (e) {var r = n(t, e, this);if (r.done) return r.value;var o = D(e),i = String(this);if (!o.global) return da(o, i);var a = o.unicode;o.lastIndex = 0;for (var s, u = [], c = 0; null !== (s = da(o, i));) {var l = String(s[0]);u[c] = l, "" === l && (o.lastIndex = ha(i, se(o.lastIndex), a)), c++;}return 0 === c ? null : u;}];});var ga = Math.max,ma = Math.min,va = Math.floor,ya = /\$([$&'`]|\d\d?|<[^>]*>)/g,_a = /\$([$&'`]|\d\d?)/g;pa("replace", 2, function (e, t, n, r) {var o = r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,i = r.REPLACE_KEEPS_$0,a = o ? "$" : "$0";return [function (n, r) {var o = d(this),i = null == n ? void 0 : n[e];return void 0 !== i ? i.call(n, o, r) : t.call(String(o), n, r);}, function (e, r) {if (!o && i || "string" == typeof r && -1 === r.indexOf(a)) {var u = n(t, e, this, r);if (u.done) return u.value;}var c = D(e),l = String(this),p = "function" == typeof r;p || (r = String(r));var f = c.global;if (f) {var h = c.unicode;c.lastIndex = 0;}for (var d = [];;) {var g = da(c, l);if (null === g) break;if (d.push(g), !f) break;"" === String(g[0]) && (c.lastIndex = ha(l, se(c.lastIndex), h));}for (var m, v = "", y = 0, _ = 0; _ < d.length; _++) {g = d[_];for (var I = String(g[0]), C = ga(ma(ie(g.index), l.length), 0), M = [], S = 1; S < g.length; S++) {M.push(void 0 === (m = g[S]) ? m : String(m));}var E = g.groups;if (p) {var T = [I].concat(M, C, l);void 0 !== E && T.push(E);var k = String(r.apply(void 0, T));} else k = s(I, l, C, M, E, r);C >= y && (v += l.slice(y, C) + k, y = C + I.length);}return v + l.slice(y);}];function s(e, n, r, o, i, a) {var s = r + e.length,u = o.length,c = _a;return void 0 !== i && (i = Oe(i), c = ya), t.call(a, c, function (t, a) {var c;switch (a.charAt(0)) {case "$":return "$";case "&":return e;case "`":return n.slice(0, r);case "'":return n.slice(s);case "<":c = i[a.slice(1, -1)];break;default:var l = +a;if (0 === l) return t;if (l > u) {var p = va(l / 10);return 0 === p ? t : p <= u ? void 0 === o[p - 1] ? a.charAt(1) : o[p - 1] + a.charAt(1) : t;}c = o[l - 1];}return void 0 === c ? "" : c;});}});var Ia = qe("iterator"),Ca = qe("toStringTag"),Ma = yr.values;for (var Sa in rn) {var Ea = r[Sa],Ta = Ea && Ea.prototype;if (Ta) {if (Ta[Ia] !== Ma) try {A(Ta, Ia, Ma);} catch (Y_) {Ta[Ia] = Ma;}if (Ta[Ca] || A(Ta, Ca, Sa), rn[Sa]) for (var Da in yr) {if (Ta[Da] !== yr[Da]) try {A(Ta, Da, yr[Da]);} catch (Y_) {Ta[Da] = yr[Da];}}}}var ka = Kr.trim,wa = r.parseFloat,Aa = 1 / wa(Fr + "-0") != -Infinity ? function (e) {var t = ka(String(e)),n = wa(t);return 0 === n && "-" == t.charAt(0) ? -0 : n;} : wa;Ae({ global: !0, forced: parseFloat != Aa }, { parseFloat: Aa });var Ra = "undefined" != typeof window,ba = "undefined" != typeof wx && "function" == typeof wx.getSystemInfoSync,Oa = Ra && window.navigator && window.navigator.userAgent || "",La = /AppleWebKit\/([\d.]+)/i.exec(Oa),Na = (La && parseFloat(La.pop()), /iPad/i.test(Oa)),Pa = (/iPhone/i.test(Oa), /iPod/i.test(Oa), function () {var e = Oa.match(/OS (\d+)_/i);e && e[1] && e[1];}(), /Android/i.test(Oa)),Ga = function () {var e = Oa.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);if (!e) return null;var t = e[1] && parseFloat(e[1]),n = e[2] && parseFloat(e[2]);return t && n ? parseFloat(e[1] + "." + e[2]) : t || null;}(),xa = (Pa && /webkit/i.test(Oa), /Firefox/i.test(Oa), /Edge/i.test(Oa)),Ua = !xa && /Chrome/i.test(Oa),qa = (function () {var e = Oa.match(/Chrome\/(\d+)/);e && e[1] && parseFloat(e[1]);}(), /MSIE/.test(Oa)),Fa = (/MSIE\s8\.0/.test(Oa), function () {var e = /MSIE\s(\d+)\.\d/.exec(Oa),t = e && parseFloat(e[1]);return !t && /Trident\/7.0/i.test(Oa) && /rv:11.0/.test(Oa) && (t = 11), t;}()),ja = (/Safari/i.test(Oa), /TBS\/\d+/i.test(Oa)),Ba = (function () {var e = Oa.match(/TBS\/(\d+)/i);if (e && e[1]) e[1];}(), !ja && /MQQBrowser\/\d+/i.test(Oa), !ja && / QQBrowser\/\d+/i.test(Oa), /(micromessenger|webbrowser)/i.test(Oa)),Ha = (/Windows/i.test(Oa), /MAC OS X/i.test(Oa), /MicroMessenger/i.test(Oa), yn("splice")),Va = We("splice", { ACCESSORS: !0, 0: 0, 1: 2 }),Ka = Math.max,$a = Math.min;Ae({ target: "Array", proto: !0, forced: !Ha || !Va }, { splice: function splice(e, t) {var n,r,o,i,a,s,u = Oe(this),c = se(u.length),l = le(e, c),p = arguments.length;if (0 === p ? n = r = 0 : 1 === p ? (n = 0, r = c - l) : (n = p - 2, r = $a(Ka(ie(t), 0), c - l)), c + n - r > 9007199254740991) throw TypeError("Maximum allowed length exceeded");for (o = je(u, r), i = 0; i < r; i++) {(a = l + i) in u && it(o, i, u[a]);}if (o.length = r, n < r) {for (i = l; i < c - r; i++) {s = i + n, (a = i + r) in u ? u[s] = u[a] : delete u[s];}for (i = c; i > c - r + n; i--) {delete u[i - 1];}} else if (n > r) for (i = c - r; i > l; i--) {s = i + n - 1, (a = i + r - 1) in u ? u[s] = u[a] : delete u[s];}for (i = 0; i < n; i++) {u[i + l] = arguments[i + 2];}return u.length = c - r + n, o;} });var Ya,za,Wa = !o(function () {return Object.isExtensible(Object.preventExtensions({}));}),Xa = t(function (e) {var t = w.f,n = B("meta"),r = 0,o = Object.isExtensible || function () {return !0;},i = function i(e) {t(e, n, { value: { objectID: "O" + ++r, weakData: {} } });},a = e.exports = { REQUIRED: !1, fastKey: function fastKey(e, t) {if (!m(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;if (!_(e, n)) {if (!o(e)) return "F";if (!t) return "E";i(e);}return e[n].objectID;}, getWeakData: function getWeakData(e, t) {if (!_(e, n)) {if (!o(e)) return !0;if (!t) return !1;i(e);}return e[n].weakData;}, onFreeze: function onFreeze(e) {return Wa && a.REQUIRED && o(e) && !_(e, n) && i(e), e;} };K[n] = !0;}),Ja = (Xa.REQUIRED, Xa.fastKey, Xa.getWeakData, Xa.onFreeze, w.f),Qa = Xa.fastKey,Za = Q.set,es = Q.getterFor,ts = (function (e, t, n) {var i = -1 !== e.indexOf("Map"),a = -1 !== e.indexOf("Weak"),s = i ? "set" : "add",u = r[e],c = u && u.prototype,l = u,p = {},f = function f(e) {var t = c[e];Z(c, e, "add" == e ? function (e) {return t.call(this, 0 === e ? 0 : e), this;} : "delete" == e ? function (e) {return !(a && !m(e)) && t.call(this, 0 === e ? 0 : e);} : "get" == e ? function (e) {return a && !m(e) ? void 0 : t.call(this, 0 === e ? 0 : e);} : "has" == e ? function (e) {return !(a && !m(e)) && t.call(this, 0 === e ? 0 : e);} : function (e, n) {return t.call(this, 0 === e ? 0 : e, n), this;});};if (ke(e, "function" != typeof u || !(a || c.forEach && !o(function () {new u().entries().next();})))) l = n.getConstructor(t, e, i, s), Xa.REQUIRED = !0;else if (ke(e, !0)) {var h = new l(),d = h[s](a ? {} : -0, 1) != h,g = o(function () {h.has(1);}),v = yt(function (e) {new u(e);}),y = !a && o(function () {for (var e = new u(), t = 5; t--;) {e[s](t, t);}return !e.has(-0);});v || ((l = t(function (t, n) {Eo(t, l, e);var r = qr(new u(), t, l);return null != n && To(n, r[s], r, i), r;})).prototype = c, c.constructor = l), (g || y) && (f("delete"), f("has"), i && f("get")), (y || d) && f(s), a && c.clear && delete c.clear;}p[e] = l, Ae({ global: !0, forced: l != u }, p), Vt(l, e), a || n.setStrong(l, e, i);}("Map", function (e) {return function () {return e(this, arguments.length ? arguments[0] : void 0);};}, { getConstructor: function getConstructor(e, t, n, r) {var o = e(function (e, a) {Eo(e, o, t), Za(e, { type: t, index: wt(null), first: void 0, last: void 0, size: 0 }), i || (e.size = 0), null != a && To(a, e[r], e, n);}),a = es(t),s = function s(e, t, n) {var r,o,s = a(e),c = u(e, t);return c ? c.value = n : (s.last = c = { index: o = Qa(t, !0), key: t, value: n, previous: r = s.last, next: void 0, removed: !1 }, s.first || (s.first = c), r && (r.next = c), i ? s.size++ : e.size++, "F" !== o && (s.index[o] = c)), e;},u = function u(e, t) {var n,r = a(e),o = Qa(t);if ("F" !== o) return r.index[o];for (n = r.first; n; n = n.next) {if (n.key == t) return n;}};return Co(o.prototype, { clear: function clear() {for (var e = a(this), t = e.index, n = e.first; n;) {n.removed = !0, n.previous && (n.previous = n.previous.next = void 0), delete t[n.index], n = n.next;}e.first = e.last = void 0, i ? e.size = 0 : this.size = 0;}, delete: function _delete(e) {var t = a(this),n = u(this, e);if (n) {var r = n.next,o = n.previous;delete t.index[n.index], n.removed = !0, o && (o.next = r), r && (r.previous = o), t.first == n && (t.first = r), t.last == n && (t.last = o), i ? t.size-- : this.size--;}return !!n;}, forEach: function forEach(e) {for (var t, n = a(this), r = be(e, arguments.length > 1 ? arguments[1] : void 0, 3); t = t ? t.next : n.first;) {for (r(t.value, t.key, this); t && t.removed;) {t = t.previous;}}}, has: function has(e) {return !!u(this, e);} }), Co(o.prototype, n ? { get: function get(e) {var t = u(this, e);return t && t.value;}, set: function set(e, t) {return s(this, 0 === e ? 0 : e, t);} } : { add: function add(e) {return s(this, e = 0 === e ? 0 : e, e);} }), i && Ja(o.prototype, "size", { get: function get() {return a(this).size;} }), o;}, setStrong: function setStrong(e, t, n) {var r = t + " Iterator",o = es(t),i = es(r);Zt(e, t, function (e, t) {Za(this, { type: r, target: e, state: o(e), kind: t, last: void 0 });}, function () {for (var e = i(this), t = e.kind, n = e.last; n && n.removed;) {n = n.previous;}return e.target && (e.last = n = n ? n.next : e.state.first) ? "keys" == t ? { value: n.key, done: !1 } : "values" == t ? { value: n.value, done: !1 } : { value: [n.key, n.value], done: !1 } : (e.target = void 0, { value: void 0, done: !0 });}, n ? "entries" : "values", !n, !0), So(t);} }), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});Ya = "undefined" != typeof console ? console : void 0 !== ts && ts.console ? ts.console : "undefined" != typeof window && window.console ? window.console : {};for (var ns = function ns() {}, rs = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], os = rs.length; os--;) {za = rs[os], console[za] || (Ya[za] = ns);}Ya.methods = rs;var is = Ya,as = 0,ss = new Map();function us() {var e = new Date();return "TIM " + e.toLocaleTimeString("en-US", { hour12: !1 }) + "." + function (e) {var t;switch (e.toString().length) {case 1:t = "00" + e;break;case 2:t = "0" + e;break;default:t = e;}return t;}(e.getMilliseconds()) + ":";}var cs = { _data: [], _length: 0, _visible: !1, arguments2String: function arguments2String(e) {var t;if (1 === e.length) t = us() + e[0];else {t = us();for (var n = 0, r = e.length; n < r; n++) {vs(e[n]) ? _s(e[n]) ? t += Ts(e[n]) : t += JSON.stringify(e[n]) : t += e[n], t += " ";}}return t;}, debug: function debug() {if (as <= -1) {var e = this.arguments2String(arguments);cs.record(e, "debug"), is.debug(e);}}, log: function log() {if (as <= 0) {var e = this.arguments2String(arguments);cs.record(e, "log"), is.log(e);}}, info: function info() {if (as <= 1) {var e = this.arguments2String(arguments);cs.record(e, "info"), is.info(e);}}, warn: function warn() {if (as <= 2) {var e = this.arguments2String(arguments);cs.record(e, "warn"), is.warn(e);}}, error: function error() {if (as <= 3) {var e = this.arguments2String(arguments);cs.record(e, "error"), is.error(e);}}, time: function time(e) {ss.set(e, Ss.now());}, timeEnd: function timeEnd(e) {if (ss.has(e)) {var t = Ss.now() - ss.get(e);return ss.delete(e), t;}return is.warn("未找到对应label: ".concat(e, ", 请在调用 logger.timeEnd 前，调用 logger.time")), 0;}, setLevel: function setLevel(e) {e < 4 && is.log(us() + "set level from " + as + " to " + e), as = e;}, record: function record(e, t) {1100 === cs._length && (cs._data.splice(0, 100), cs._length = 1e3), cs._length++, cs._data.push("".concat(e, " [").concat(t, "] \n"));}, getLog: function getLog() {return cs._data;} },ls = function ls(e) {return "file" === Is(e);},ps = function ps(e) {return null !== e && ("number" == typeof e && !isNaN(e - 0) || "object" === Dn(e) && e.constructor === Number);},fs = function fs(e) {return "string" == typeof e;},hs = function hs(e) {return null !== e && "object" === Dn(e);},ds = function ds(e) {if ("object" !== Dn(e) || null === e) return !1;var t = Object.getPrototypeOf(e);if (null === t) return !0;for (var n = t; null !== Object.getPrototypeOf(n);) {n = Object.getPrototypeOf(n);}return t === n;},gs = function gs(e) {return "function" == typeof Array.isArray ? Array.isArray(e) : "array" === Is(e);},ms = function ms(e) {return void 0 === e;},vs = function vs(e) {return gs(e) || hs(e);},ys = function ys(e) {return "function" == typeof e;},_s = function _s(e) {return e instanceof Error;},Is = function Is(e) {return Object.prototype.toString.call(e).match(/^\[object (.*)\]$/)[1].toLowerCase();},Cs = function Cs(e) {if ("string" != typeof e) return !1;var t = e[0];return !/[^a-zA-Z0-9]/.test(t);},Ms = 0;Date.now || (Date.now = function () {return new Date().getTime();});var Ss = { now: function now() {0 === Ms && (Ms = Date.now() - 1);var e = Date.now() - Ms;return e > 4294967295 ? (Ms += 4294967295, Date.now() - Ms) : e;}, utc: function utc() {return Math.round(Date.now() / 1e3);} },Es = function e(t, n, r, o) {if (!vs(t) || !vs(n)) return 0;for (var i, a = 0, s = Object.keys(n), u = 0, c = s.length; u < c; u++) {if (i = s[u], !(ms(n[i]) || r && r.includes(i))) if (vs(t[i]) && vs(n[i])) a += e(t[i], n[i], r, o);else {if (o && o.includes(n[i])) continue;t[i] !== n[i] && (t[i] = n[i], a += 1);}}return a;},Ts = function Ts(e) {return JSON.stringify(e, ["message", "code"]);},Ds = function Ds() {var e = new Date(),t = e.toISOString(),n = e.getTimezoneOffset() / 60,r = "";return r = n < 0 ? n > -10 ? "+0" + Math.abs(100 * n) : "+" + Math.abs(100 * n) : n >= 10 ? "-" + 100 * n : "-0" + 100 * n, t.replace("Z", r);},ks = function ks(e) {if (0 === e.length) return 0;for (var t = 0, n = 0, r = "undefined" != typeof document && void 0 !== document.characterSet ? document.characterSet : "UTF-8"; void 0 !== e[t];) {n += e[t++].charCodeAt[t] <= 255 ? 1 : !1 === r ? 3 : 2;}return n;},ws = function ws(e) {var t = e || 99999999;return Math.round(Math.random() * t);},As = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",Rs = As.length,bs = function bs(e, t) {for (var n in e) {if (e[n] === t) return !0;}return !1;},Os = {},Ls = function Ls() {if (ba) return "https:";var e = window.location.protocol;return ["http:", "https:"].indexOf(e) < 0 && (e = "http:"), e;},Ns = function Ns(e) {return -1 === e.indexOf("http://") || -1 === e.indexOf("https://") ? "https://" + e : e.replace(/https|http/, "https");};function Ps(e, t) {gs(e) && gs(t) ? t.forEach(function (t) {var n = t.key,r = t.value,o = e.find(function (e) {return e.key === n;});o ? o.value = r : e.push({ key: n, value: r });}) : cs.warn("updateCustomField target 或 source 不是数组，忽略此次更新。");}var Gs = function Gs(e) {return e === pn.GRP_PUBLIC;},xs = function xs(e) {return e === pn.GRP_AVCHATROOM;},Us = function Us(e) {return fs(e) && e === pn.CONV_SYSTEM;};function qs(e, t) {var n = {};return Object.keys(e).forEach(function (r) {n[r] = t(e[r], r);}), n;}var Fs = Object.prototype.hasOwnProperty;function js(e) {if (null == e) return !0;if ("boolean" == typeof e) return !1;if ("number" == typeof e) return 0 === e;if ("string" == typeof e) return 0 === e.length;if ("function" == typeof e) return 0 === e.length;if (Array.isArray(e)) return 0 === e.length;if (e instanceof Error) return "" === e.message;if (ds(e)) {for (var t in e) {if (Fs.call(e, t)) return !1;}return !0;}return !("map" !== Is(e) && !function (e) {return "set" === Is(e);}(e) && !ls(e)) && 0 === e.size;}function Bs(e, t, n) {if (void 0 === t) return !0;var r = !0;if ("object" === nr(t).toLowerCase()) Object.keys(t).forEach(function (o) {var i = 1 === e.length ? e[0][o] : void 0;r = !!Hs(i, t[o], n, o) && r;});else if ("array" === nr(t).toLowerCase()) for (var o = 0; o < t.length; o++) {r = !!Hs(e[o], t[o], n, t[o].name) && r;}if (r) return r;throw new Error("Params validate failed.");}function Hs(e, t, n, r) {if (void 0 === t) return !0;var o = !0;return t.required && js(e) && (is.error("TIM [".concat(n, '] Missing required params: "').concat(r, '".')), o = !1), js(e) || nr(e).toLowerCase() === t.type.toLowerCase() || (is.error("TIM [".concat(n, '] Invalid params: type check failed for "').concat(r, '".Expected ').concat(t.type, ".")), o = !1), t.validator && !t.validator(e) && (is.error("TIM [".concat(n, "] Invalid params: custom validator check failed for params.")), o = !1), o;}var Vs = u.f,Ks = function Ks(e) {return function (t) {for (var n, r = g(t), o = Ct(r), a = o.length, s = 0, u = []; a > s;) {n = o[s++], i && !Vs.call(r, n) || u.push(e ? [n, r[n]] : r[n]);}return u;};},$s = { entries: Ks(!0), values: Ks(!1) }.values;Ae({ target: "Object", stat: !0 }, { values: function values(e) {return $s(e);} });var Ys = { SUCCESS: "JoinedSuccess", WAIT_APPROVAL: "WaitAdminApproval" },zs = { SUCCESS: 0 },Ws = { IS_LOGIN: 1, IS_NOT_LOGIN: 0 },Xs = { UNSEND: "unSend", SUCCESS: "success", FAIL: "fail" },Js = { NOT_START: "notStart", PENDING: "pengding", RESOLVED: "resolved", REJECTED: "rejected" },Qs = function () {function e(t) {kn(this, e), this.type = pn.MSG_TEXT, this.content = { text: t.text || "" };}return An(e, [{ key: "setText", value: function value(e) {this.content.text = e;} }, { key: "sendable", value: function value() {return 0 !== this.content.text.length;} }]), e;}(),Zs = qe("iterator"),eu = !o(function () {var e = new URL("b?a=1&b=2&c=3", "http://a"),t = e.searchParams,n = "";return e.pathname = "c%20d", t.forEach(function (e, r) {t.delete("b"), n += r + e;}), !t.sort || "http://a/c%20d?a=1&c=3" !== e.href || "3" !== t.get("c") || "a=1" !== String(new URLSearchParams("?a=1")) || !t[Zs] || "a" !== new URL("https://a@b").username || "b" !== new URLSearchParams(new URLSearchParams("a=b")).get("a") || "xn--e1aybc" !== new URL("http://тест").host || "#%D0%B1" !== new URL("http://a#б").hash || "a1c3" !== n || "x" !== new URL("http://x", void 0).host;}),tu = Object.assign,nu = Object.defineProperty,ru = !tu || o(function () {if (i && 1 !== tu({ b: 1 }, tu(nu({}, "a", { enumerable: !0, get: function get() {nu(this, "b", { value: 3, enumerable: !1 });} }), { b: 2 })).b) return !0;var e = {},t = {},n = Symbol();return e[n] = 7, "abcdefghijklmnopqrst".split("").forEach(function (e) {t[e] = e;}), 7 != tu({}, e)[n] || "abcdefghijklmnopqrst" != Ct(tu({}, t)).join("");}) ? function (e, t) {for (var n = Oe(e), r = arguments.length, o = 1, a = ye.f, s = u.f; r > o;) {for (var c, l = h(arguments[o++]), p = a ? Ct(l).concat(a(l)) : Ct(l), f = p.length, d = 0; f > d;) {c = p[d++], i && !s.call(l, c) || (n[c] = l[c]);}}return n;} : tu,ou = /[^\0-\u007E]/,iu = /[.\u3002\uFF0E\uFF61]/g,au = "Overflow: input needs wider integers to process",su = Math.floor,uu = String.fromCharCode,cu = function cu(e) {return e + 22 + 75 * (e < 26);},lu = function lu(e, t, n) {var r = 0;for (e = n ? su(e / 700) : e >> 1, e += su(e / t); e > 455; r += 36) {e = su(e / 35);}return su(r + 36 * e / (e + 38));},pu = function pu(e) {var t,n,r = [],o = (e = function (e) {for (var t = [], n = 0, r = e.length; n < r;) {var o = e.charCodeAt(n++);if (o >= 55296 && o <= 56319 && n < r) {var i = e.charCodeAt(n++);56320 == (64512 & i) ? t.push(((1023 & o) << 10) + (1023 & i) + 65536) : (t.push(o), n--);} else t.push(o);}return t;}(e)).length,i = 128,a = 0,s = 72;for (t = 0; t < e.length; t++) {(n = e[t]) < 128 && r.push(uu(n));}var u = r.length,c = u;for (u && r.push("-"); c < o;) {var l = 2147483647;for (t = 0; t < e.length; t++) {(n = e[t]) >= i && n < l && (l = n);}var p = c + 1;if (l - i > su((2147483647 - a) / p)) throw RangeError(au);for (a += (l - i) * p, i = l, t = 0; t < e.length; t++) {if ((n = e[t]) < i && ++a > 2147483647) throw RangeError(au);if (n == i) {for (var f = a, h = 36;; h += 36) {var d = h <= s ? 1 : h >= s + 26 ? 26 : h - s;if (f < d) break;var g = f - d,m = 36 - d;r.push(uu(cu(d + g % m))), f = su(g / m);}r.push(uu(cu(f))), s = lu(a, p, c == u), a = 0, ++c;}}++a, ++i;}return r.join("");},fu = function fu(e) {var t = ft(e);if ("function" != typeof t) throw TypeError(String(e) + " is not iterable");return D(t.call(e));},hu = ne("fetch"),du = ne("Headers"),gu = qe("iterator"),mu = Q.set,vu = Q.getterFor("URLSearchParams"),yu = Q.getterFor("URLSearchParamsIterator"),_u = /\+/g,Iu = Array(4),Cu = function Cu(e) {return Iu[e - 1] || (Iu[e - 1] = RegExp("((?:%[\\da-f]{2}){" + e + "})", "gi"));},Mu = function Mu(e) {try {return decodeURIComponent(e);} catch (Y_) {return e;}},Su = function Su(e) {var t = e.replace(_u, " "),n = 4;try {return decodeURIComponent(t);} catch (Y_) {for (; n;) {t = t.replace(Cu(n--), Mu);}return t;}},Eu = /[!'()~]|%20/g,Tu = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+" },Du = function Du(e) {return Tu[e];},ku = function ku(e) {return encodeURIComponent(e).replace(Eu, Du);},wu = function wu(e, t) {if (t) for (var n, r, o = t.split("&"), i = 0; i < o.length;) {(n = o[i++]).length && (r = n.split("="), e.push({ key: Su(r.shift()), value: Su(r.join("=")) }));}},Au = function Au(e) {this.entries.length = 0, wu(this.entries, e);},Ru = function Ru(e, t) {if (e < t) throw TypeError("Not enough arguments");},bu = Yt(function (e, t) {mu(this, { type: "URLSearchParamsIterator", iterator: fu(vu(e).entries), kind: t });}, "Iterator", function () {var e = yu(this),t = e.kind,n = e.iterator.next(),r = n.value;return n.done || (n.value = "keys" === t ? r.key : "values" === t ? r.value : [r.key, r.value]), n;}),Ou = function Ou() {Eo(this, Ou, "URLSearchParams");var e,t,n,r,o,i,a,s,u,c = arguments.length > 0 ? arguments[0] : void 0,l = this,p = [];if (mu(l, { type: "URLSearchParams", entries: p, updateURL: function updateURL() {}, updateSearchParams: Au }), void 0 !== c) if (m(c)) {if ("function" == typeof (e = ft(c))) for (n = (t = e.call(c)).next; !(r = n.call(t)).done;) {if ((a = (i = (o = fu(D(r.value))).next).call(o)).done || (s = i.call(o)).done || !i.call(o).done) throw TypeError("Expected sequence with length 2");p.push({ key: a.value + "", value: s.value + "" });} else for (u in c) {_(c, u) && p.push({ key: u, value: c[u] + "" });}} else wu(p, "string" == typeof c ? "?" === c.charAt(0) ? c.slice(1) : c : c + "");},Lu = Ou.prototype;Co(Lu, { append: function append(e, t) {Ru(arguments.length, 2);var n = vu(this);n.entries.push({ key: e + "", value: t + "" }), n.updateURL();}, delete: function _delete(e) {Ru(arguments.length, 1);for (var t = vu(this), n = t.entries, r = e + "", o = 0; o < n.length;) {n[o].key === r ? n.splice(o, 1) : o++;}t.updateURL();}, get: function get(e) {Ru(arguments.length, 1);for (var t = vu(this).entries, n = e + "", r = 0; r < t.length; r++) {if (t[r].key === n) return t[r].value;}return null;}, getAll: function getAll(e) {Ru(arguments.length, 1);for (var t = vu(this).entries, n = e + "", r = [], o = 0; o < t.length; o++) {t[o].key === n && r.push(t[o].value);}return r;}, has: function has(e) {Ru(arguments.length, 1);for (var t = vu(this).entries, n = e + "", r = 0; r < t.length;) {if (t[r++].key === n) return !0;}return !1;}, set: function set(e, t) {Ru(arguments.length, 1);for (var n, r = vu(this), o = r.entries, i = !1, a = e + "", s = t + "", u = 0; u < o.length; u++) {(n = o[u]).key === a && (i ? o.splice(u--, 1) : (i = !0, n.value = s));}i || o.push({ key: a, value: s }), r.updateURL();}, sort: function sort() {var e,t,n,r = vu(this),o = r.entries,i = o.slice();for (o.length = 0, n = 0; n < i.length; n++) {for (e = i[n], t = 0; t < n; t++) {if (o[t].key > e.key) {o.splice(t, 0, e);break;}}t === n && o.push(e);}r.updateURL();}, forEach: function forEach(e) {for (var t, n = vu(this).entries, r = be(e, arguments.length > 1 ? arguments[1] : void 0, 3), o = 0; o < n.length;) {r((t = n[o++]).value, t.key, this);}}, keys: function keys() {return new bu(this, "keys");}, values: function values() {return new bu(this, "values");}, entries: function entries() {return new bu(this, "entries");} }, { enumerable: !0 }), Z(Lu, gu, Lu.entries), Z(Lu, "toString", function () {for (var e, t = vu(this).entries, n = [], r = 0; r < t.length;) {e = t[r++], n.push(ku(e.key) + "=" + ku(e.value));}return n.join("&");}, { enumerable: !0 }), Vt(Ou, "URLSearchParams"), Ae({ global: !0, forced: !eu }, { URLSearchParams: Ou }), eu || "function" != typeof hu || "function" != typeof du || Ae({ global: !0, enumerable: !0, forced: !0 }, { fetch: function fetch(e) {var t,n,r,o = [e];return arguments.length > 1 && (t = arguments[1], m(t) && (n = t.body, "URLSearchParams" === lt(n) && ((r = t.headers ? new du(t.headers) : new du()).has("content-type") || r.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), t = wt(t, { body: c(0, String(n)), headers: c(0, r) }))), o.push(t)), hu.apply(this, o);} });var Nu,Pu = { URLSearchParams: Ou, getState: vu },Gu = Nt.codeAt,xu = r.URL,Uu = Pu.URLSearchParams,qu = Pu.getState,Fu = Q.set,ju = Q.getterFor("URL"),Bu = Math.floor,Hu = Math.pow,Vu = /[A-Za-z]/,Ku = /[\d+\-.A-Za-z]/,$u = /\d/,Yu = /^(0x|0X)/,zu = /^[0-7]+$/,Wu = /^\d+$/,Xu = /^[\dA-Fa-f]+$/,Ju = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/,Qu = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/,Zu = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,ec = /[\u0009\u000A\u000D]/g,tc = function tc(e, t) {var n, r, o;if ("[" == t.charAt(0)) {if ("]" != t.charAt(t.length - 1)) return "Invalid host";if (!(n = rc(t.slice(1, -1)))) return "Invalid host";e.host = n;} else if (pc(e)) {if (t = function (e) {var t,n,r = [],o = e.toLowerCase().replace(iu, ".").split(".");for (t = 0; t < o.length; t++) {n = o[t], r.push(ou.test(n) ? "xn--" + pu(n) : n);}return r.join(".");}(t), Ju.test(t)) return "Invalid host";if (null === (n = nc(t))) return "Invalid host";e.host = n;} else {if (Qu.test(t)) return "Invalid host";for (n = "", r = ht(t), o = 0; o < r.length; o++) {n += cc(r[o], ic);}e.host = n;}},nc = function nc(e) {var t,n,r,o,i,a,s,u = e.split(".");if (u.length && "" == u[u.length - 1] && u.pop(), (t = u.length) > 4) return e;for (n = [], r = 0; r < t; r++) {if ("" == (o = u[r])) return e;if (i = 10, o.length > 1 && "0" == o.charAt(0) && (i = Yu.test(o) ? 16 : 8, o = o.slice(8 == i ? 1 : 2)), "" === o) a = 0;else {if (!(10 == i ? Wu : 8 == i ? zu : Xu).test(o)) return e;a = parseInt(o, i);}n.push(a);}for (r = 0; r < t; r++) {if (a = n[r], r == t - 1) {if (a >= Hu(256, 5 - t)) return null;} else if (a > 255) return null;}for (s = n.pop(), r = 0; r < n.length; r++) {s += n[r] * Hu(256, 3 - r);}return s;},rc = function rc(e) {var t,n,r,o,i,a,s,u = [0, 0, 0, 0, 0, 0, 0, 0],c = 0,l = null,p = 0,f = function f() {return e.charAt(p);};if (":" == f()) {if (":" != e.charAt(1)) return;p += 2, l = ++c;}for (; f();) {if (8 == c) return;if (":" != f()) {for (t = n = 0; n < 4 && Xu.test(f());) {t = 16 * t + parseInt(f(), 16), p++, n++;}if ("." == f()) {if (0 == n) return;if (p -= n, c > 6) return;for (r = 0; f();) {if (o = null, r > 0) {if (!("." == f() && r < 4)) return;p++;}if (!$u.test(f())) return;for (; $u.test(f());) {if (i = parseInt(f(), 10), null === o) o = i;else {if (0 == o) return;o = 10 * o + i;}if (o > 255) return;p++;}u[c] = 256 * u[c] + o, 2 != ++r && 4 != r || c++;}if (4 != r) return;break;}if (":" == f()) {if (p++, !f()) return;} else if (f()) return;u[c++] = t;} else {if (null !== l) return;p++, l = ++c;}}if (null !== l) for (a = c - l, c = 7; 0 != c && a > 0;) {s = u[c], u[c--] = u[l + a - 1], u[l + --a] = s;} else if (8 != c) return;return u;},oc = function oc(e) {var t, n, r, o;if ("number" == typeof e) {for (t = [], n = 0; n < 4; n++) {t.unshift(e % 256), e = Bu(e / 256);}return t.join(".");}if ("object" == typeof e) {for (t = "", r = function (e) {for (var t = null, n = 1, r = null, o = 0, i = 0; i < 8; i++) {0 !== e[i] ? (o > n && (t = r, n = o), r = null, o = 0) : (null === r && (r = i), ++o);}return o > n && (t = r, n = o), t;}(e), n = 0; n < 8; n++) {o && 0 === e[n] || (o && (o = !1), r === n ? (t += n ? ":" : "::", o = !0) : (t += e[n].toString(16), n < 7 && (t += ":")));}return "[" + t + "]";}return e;},ic = {},ac = ru({}, ic, { " ": 1, '"': 1, "<": 1, ">": 1, "`": 1 }),sc = ru({}, ac, { "#": 1, "?": 1, "{": 1, "}": 1 }),uc = ru({}, sc, { "/": 1, ":": 1, ";": 1, "=": 1, "@": 1, "[": 1, "\\": 1, "]": 1, "^": 1, "|": 1 }),cc = function cc(e, t) {var n = Gu(e, 0);return n > 32 && n < 127 && !_(t, e) ? e : encodeURIComponent(e);},lc = { ftp: 21, file: null, http: 80, https: 443, ws: 80, wss: 443 },pc = function pc(e) {return _(lc, e.scheme);},fc = function fc(e) {return "" != e.username || "" != e.password;},hc = function hc(e) {return !e.host || e.cannotBeABaseURL || "file" == e.scheme;},dc = function dc(e, t) {var n;return 2 == e.length && Vu.test(e.charAt(0)) && (":" == (n = e.charAt(1)) || !t && "|" == n);},gc = function gc(e) {var t;return e.length > 1 && dc(e.slice(0, 2)) && (2 == e.length || "/" === (t = e.charAt(2)) || "\\" === t || "?" === t || "#" === t);},mc = function mc(e) {var t = e.path,n = t.length;!n || "file" == e.scheme && 1 == n && dc(t[0], !0) || t.pop();},vc = function vc(e) {return "." === e || "%2e" === e.toLowerCase();},yc = {},_c = {},Ic = {},Cc = {},Mc = {},Sc = {},Ec = {},Tc = {},Dc = {},kc = {},wc = {},Ac = {},Rc = {},bc = {},Oc = {},Lc = {},Nc = {},Pc = {},Gc = {},xc = {},Uc = {},qc = function qc(e, t, n, r) {var o,i,a,s,u,c = n || yc,l = 0,p = "",f = !1,h = !1,d = !1;for (n || (e.scheme = "", e.username = "", e.password = "", e.host = null, e.port = null, e.path = [], e.query = null, e.fragment = null, e.cannotBeABaseURL = !1, t = t.replace(Zu, "")), t = t.replace(ec, ""), o = ht(t); l <= o.length;) {switch (i = o[l], c) {case yc:if (!i || !Vu.test(i)) {if (n) return "Invalid scheme";c = Ic;continue;}p += i.toLowerCase(), c = _c;break;case _c:if (i && (Ku.test(i) || "+" == i || "-" == i || "." == i)) p += i.toLowerCase();else {if (":" != i) {if (n) return "Invalid scheme";p = "", c = Ic, l = 0;continue;}if (n && (pc(e) != _(lc, p) || "file" == p && (fc(e) || null !== e.port) || "file" == e.scheme && !e.host)) return;if (e.scheme = p, n) return void (pc(e) && lc[e.scheme] == e.port && (e.port = null));p = "", "file" == e.scheme ? c = bc : pc(e) && r && r.scheme == e.scheme ? c = Cc : pc(e) ? c = Tc : "/" == o[l + 1] ? (c = Mc, l++) : (e.cannotBeABaseURL = !0, e.path.push(""), c = Gc);}break;case Ic:if (!r || r.cannotBeABaseURL && "#" != i) return "Invalid scheme";if (r.cannotBeABaseURL && "#" == i) {e.scheme = r.scheme, e.path = r.path.slice(), e.query = r.query, e.fragment = "", e.cannotBeABaseURL = !0, c = Uc;break;}c = "file" == r.scheme ? bc : Sc;continue;case Cc:if ("/" != i || "/" != o[l + 1]) {c = Sc;continue;}c = Dc, l++;break;case Mc:if ("/" == i) {c = kc;break;}c = Pc;continue;case Sc:if (e.scheme = r.scheme, i == Nu) e.username = r.username, e.password = r.password, e.host = r.host, e.port = r.port, e.path = r.path.slice(), e.query = r.query;else if ("/" == i || "\\" == i && pc(e)) c = Ec;else if ("?" == i) e.username = r.username, e.password = r.password, e.host = r.host, e.port = r.port, e.path = r.path.slice(), e.query = "", c = xc;else {if ("#" != i) {e.username = r.username, e.password = r.password, e.host = r.host, e.port = r.port, e.path = r.path.slice(), e.path.pop(), c = Pc;continue;}e.username = r.username, e.password = r.password, e.host = r.host, e.port = r.port, e.path = r.path.slice(), e.query = r.query, e.fragment = "", c = Uc;}break;case Ec:if (!pc(e) || "/" != i && "\\" != i) {if ("/" != i) {e.username = r.username, e.password = r.password, e.host = r.host, e.port = r.port, c = Pc;continue;}c = kc;} else c = Dc;break;case Tc:if (c = Dc, "/" != i || "/" != p.charAt(l + 1)) continue;l++;break;case Dc:if ("/" != i && "\\" != i) {c = kc;continue;}break;case kc:if ("@" == i) {f && (p = "%40" + p), f = !0, a = ht(p);for (var g = 0; g < a.length; g++) {var m = a[g];if (":" != m || d) {var v = cc(m, uc);d ? e.password += v : e.username += v;} else d = !0;}p = "";} else if (i == Nu || "/" == i || "?" == i || "#" == i || "\\" == i && pc(e)) {if (f && "" == p) return "Invalid authority";l -= ht(p).length + 1, p = "", c = wc;} else p += i;break;case wc:case Ac:if (n && "file" == e.scheme) {c = Lc;continue;}if (":" != i || h) {if (i == Nu || "/" == i || "?" == i || "#" == i || "\\" == i && pc(e)) {if (pc(e) && "" == p) return "Invalid host";if (n && "" == p && (fc(e) || null !== e.port)) return;if (s = tc(e, p)) return s;if (p = "", c = Nc, n) return;continue;}"[" == i ? h = !0 : "]" == i && (h = !1), p += i;} else {if ("" == p) return "Invalid host";if (s = tc(e, p)) return s;if (p = "", c = Rc, n == Ac) return;}break;case Rc:if (!$u.test(i)) {if (i == Nu || "/" == i || "?" == i || "#" == i || "\\" == i && pc(e) || n) {if ("" != p) {var y = parseInt(p, 10);if (y > 65535) return "Invalid port";e.port = pc(e) && y === lc[e.scheme] ? null : y, p = "";}if (n) return;c = Nc;continue;}return "Invalid port";}p += i;break;case bc:if (e.scheme = "file", "/" == i || "\\" == i) c = Oc;else {if (!r || "file" != r.scheme) {c = Pc;continue;}if (i == Nu) e.host = r.host, e.path = r.path.slice(), e.query = r.query;else if ("?" == i) e.host = r.host, e.path = r.path.slice(), e.query = "", c = xc;else {if ("#" != i) {gc(o.slice(l).join("")) || (e.host = r.host, e.path = r.path.slice(), mc(e)), c = Pc;continue;}e.host = r.host, e.path = r.path.slice(), e.query = r.query, e.fragment = "", c = Uc;}}break;case Oc:if ("/" == i || "\\" == i) {c = Lc;break;}r && "file" == r.scheme && !gc(o.slice(l).join("")) && (dc(r.path[0], !0) ? e.path.push(r.path[0]) : e.host = r.host), c = Pc;continue;case Lc:if (i == Nu || "/" == i || "\\" == i || "?" == i || "#" == i) {if (!n && dc(p)) c = Pc;else if ("" == p) {if (e.host = "", n) return;c = Nc;} else {if (s = tc(e, p)) return s;if ("localhost" == e.host && (e.host = ""), n) return;p = "", c = Nc;}continue;}p += i;break;case Nc:if (pc(e)) {if (c = Pc, "/" != i && "\\" != i) continue;} else if (n || "?" != i) {if (n || "#" != i) {if (i != Nu && (c = Pc, "/" != i)) continue;} else e.fragment = "", c = Uc;} else e.query = "", c = xc;break;case Pc:if (i == Nu || "/" == i || "\\" == i && pc(e) || !n && ("?" == i || "#" == i)) {if (".." === (u = (u = p).toLowerCase()) || "%2e." === u || ".%2e" === u || "%2e%2e" === u ? (mc(e), "/" == i || "\\" == i && pc(e) || e.path.push("")) : vc(p) ? "/" == i || "\\" == i && pc(e) || e.path.push("") : ("file" == e.scheme && !e.path.length && dc(p) && (e.host && (e.host = ""), p = p.charAt(0) + ":"), e.path.push(p)), p = "", "file" == e.scheme && (i == Nu || "?" == i || "#" == i)) for (; e.path.length > 1 && "" === e.path[0];) {e.path.shift();}"?" == i ? (e.query = "", c = xc) : "#" == i && (e.fragment = "", c = Uc);} else p += cc(i, sc);break;case Gc:"?" == i ? (e.query = "", c = xc) : "#" == i ? (e.fragment = "", c = Uc) : i != Nu && (e.path[0] += cc(i, ic));break;case xc:n || "#" != i ? i != Nu && ("'" == i && pc(e) ? e.query += "%27" : e.query += "#" == i ? "%23" : cc(i, ic)) : (e.fragment = "", c = Uc);break;case Uc:i != Nu && (e.fragment += cc(i, ac));}l++;}},Fc = function Fc(e) {var t,n,r = Eo(this, Fc, "URL"),o = arguments.length > 1 ? arguments[1] : void 0,a = String(e),s = Fu(r, { type: "URL" });if (void 0 !== o) if (o instanceof Fc) t = ju(o);else if (n = qc(t = {}, String(o))) throw TypeError(n);if (n = qc(s, a, null, t)) throw TypeError(n);var u = s.searchParams = new Uu(),c = qu(u);c.updateSearchParams(s.query), c.updateURL = function () {s.query = String(u) || null;}, i || (r.href = Bc.call(r), r.origin = Hc.call(r), r.protocol = Vc.call(r), r.username = Kc.call(r), r.password = $c.call(r), r.host = Yc.call(r), r.hostname = zc.call(r), r.port = Wc.call(r), r.pathname = Xc.call(r), r.search = Jc.call(r), r.searchParams = Qc.call(r), r.hash = Zc.call(r));},jc = Fc.prototype,Bc = function Bc() {var e = ju(this),t = e.scheme,n = e.username,r = e.password,o = e.host,i = e.port,a = e.path,s = e.query,u = e.fragment,c = t + ":";return null !== o ? (c += "//", fc(e) && (c += n + (r ? ":" + r : "") + "@"), c += oc(o), null !== i && (c += ":" + i)) : "file" == t && (c += "//"), c += e.cannotBeABaseURL ? a[0] : a.length ? "/" + a.join("/") : "", null !== s && (c += "?" + s), null !== u && (c += "#" + u), c;},Hc = function Hc() {var e = ju(this),t = e.scheme,n = e.port;if ("blob" == t) try {return new URL(t.path[0]).origin;} catch (Y_) {return "null";}return "file" != t && pc(e) ? t + "://" + oc(e.host) + (null !== n ? ":" + n : "") : "null";},Vc = function Vc() {return ju(this).scheme + ":";},Kc = function Kc() {return ju(this).username;},$c = function $c() {return ju(this).password;},Yc = function Yc() {var e = ju(this),t = e.host,n = e.port;return null === t ? "" : null === n ? oc(t) : oc(t) + ":" + n;},zc = function zc() {var e = ju(this).host;return null === e ? "" : oc(e);},Wc = function Wc() {var e = ju(this).port;return null === e ? "" : String(e);},Xc = function Xc() {var e = ju(this),t = e.path;return e.cannotBeABaseURL ? t[0] : t.length ? "/" + t.join("/") : "";},Jc = function Jc() {var e = ju(this).query;return e ? "?" + e : "";},Qc = function Qc() {return ju(this).searchParams;},Zc = function Zc() {var e = ju(this).fragment;return e ? "#" + e : "";},el = function el(e, t) {return { get: e, set: t, configurable: !0, enumerable: !0 };};if (i && Mt(jc, { href: el(Bc, function (e) {var t = ju(this),n = String(e),r = qc(t, n);if (r) throw TypeError(r);qu(t.searchParams).updateSearchParams(t.query);}), origin: el(Hc), protocol: el(Vc, function (e) {var t = ju(this);qc(t, String(e) + ":", yc);}), username: el(Kc, function (e) {var t = ju(this),n = ht(String(e));if (!hc(t)) {t.username = "";for (var r = 0; r < n.length; r++) {t.username += cc(n[r], uc);}}}), password: el($c, function (e) {var t = ju(this),n = ht(String(e));if (!hc(t)) {t.password = "";for (var r = 0; r < n.length; r++) {t.password += cc(n[r], uc);}}}), host: el(Yc, function (e) {var t = ju(this);t.cannotBeABaseURL || qc(t, String(e), wc);}), hostname: el(zc, function (e) {var t = ju(this);t.cannotBeABaseURL || qc(t, String(e), Ac);}), port: el(Wc, function (e) {var t = ju(this);hc(t) || ("" == (e = String(e)) ? t.port = null : qc(t, e, Rc));}), pathname: el(Xc, function (e) {var t = ju(this);t.cannotBeABaseURL || (t.path = [], qc(t, e + "", Nc));}), search: el(Jc, function (e) {var t = ju(this);"" == (e = String(e)) ? t.query = null : ("?" == e.charAt(0) && (e = e.slice(1)), t.query = "", qc(t, e, xc)), qu(t.searchParams).updateSearchParams(t.query);}), searchParams: el(Qc), hash: el(Zc, function (e) {var t = ju(this);"" != (e = String(e)) ? ("#" == e.charAt(0) && (e = e.slice(1)), t.fragment = "", qc(t, e, Uc)) : t.fragment = null;}) }), Z(jc, "toJSON", function () {return Bc.call(this);}, { enumerable: !0 }), Z(jc, "toString", function () {return Bc.call(this);}, { enumerable: !0 }), xu) {var tl = xu.createObjectURL,nl = xu.revokeObjectURL;tl && Z(Fc, "createObjectURL", function (e) {return tl.apply(xu, arguments);}), nl && Z(Fc, "revokeObjectURL", function (e) {return nl.apply(xu, arguments);});}Vt(Fc, "URL"), Ae({ global: !0, forced: !eu, sham: !i }, { URL: Fc });var rl = { JSON: { TYPE: { C2C: { NOTICE: 1, COMMON: 9, EVENT: 10 }, GROUP: { COMMON: 3, TIP: 4, SYSTEM: 5, TIP2: 6 }, FRIEND: { NOTICE: 7 }, PROFILE: { NOTICE: 8 } }, SUBTYPE: { C2C: { COMMON: 0, READED: 92, KICKEDOUT: 96 }, GROUP: { COMMON: 0, LOVEMESSAGE: 1, TIP: 2, REDPACKET: 3 } }, OPTIONS: { GROUP: { JOIN: 1, QUIT: 2, KICK: 3, SET_ADMIN: 4, CANCEL_ADMIN: 5, MODIFY_GROUP_INFO: 6, MODIFY_MEMBER_INFO: 7 } } }, PROTOBUF: {}, IMAGE_TYPES: { ORIGIN: 1, LARGE: 2, SMALL: 3 }, IMAGE_FORMAT: { JPG: 1, JPEG: 1, GIF: 2, PNG: 3, BMP: 4, UNKNOWN: 255 } },ol = 1,il = 2,al = 3,sl = 4,ul = 5,cl = 7,ll = 8,pl = 9,fl = 10,hl = 15,dl = 255,gl = 2,ml = 0,vl = 1,yl = { NICK: "Tag_Profile_IM_Nick", GENDER: "Tag_Profile_IM_Gender", BIRTHDAY: "Tag_Profile_IM_BirthDay", LOCATION: "Tag_Profile_IM_Location", SELFSIGNATURE: "Tag_Profile_IM_SelfSignature", ALLOWTYPE: "Tag_Profile_IM_AllowType", LANGUAGE: "Tag_Profile_IM_Language", AVATAR: "Tag_Profile_IM_Image", MESSAGESETTINGS: "Tag_Profile_IM_MsgSettings", ADMINFORBIDTYPE: "Tag_Profile_IM_AdminForbidType", LEVEL: "Tag_Profile_IM_Level", ROLE: "Tag_Profile_IM_Role" },_l = { UNKNOWN: "Gender_Type_Unknown", FEMALE: "Gender_Type_Female", MALE: "Gender_Type_Male" },Il = { NONE: "AdminForbid_Type_None", SEND_OUT: "AdminForbid_Type_SendOut" },Cl = { NEED_CONFIRM: "AllowType_Type_NeedConfirm", ALLOW_ANY: "AllowType_Type_AllowAny", DENY_ANY: "AllowType_Type_DenyAny" },Ml = function () {function e(t) {kn(this, e), this._imageMemoryURL = "", this._file = t.file, ba ? this.createImageDataASURLInWXMiniApp(t.file) : this.createImageDataASURLInWeb(t.file), this._initImageInfoModel(), this.type = pn.MSG_IMAGE, this._percent = 0, this.content = { imageFormat: rl.IMAGE_FORMAT[t.imageFormat] || rl.IMAGE_FORMAT.UNKNOWN, uuid: t.uuid, imageInfoArray: [] }, this.initImageInfoArray(t.imageInfoArray), this._defaultImage = "http://imgcache.qq.com/open/qcloud/video/act/webim-images/default.jpg", this._autoFixUrl();}return An(e, [{ key: "_initImageInfoModel", value: function value() {var e = this;this._ImageInfoModel = function (t) {this.instanceID = ws(9999999), this.sizeType = t.type || 0, this.size = t.size || 0, this.width = t.width || 0, this.height = t.height || 0, this.imageUrl = t.url || "", this.url = t.url || e._imageMemoryURL || e._defaultImage;}, this._ImageInfoModel.prototype = { setSizeType: function setSizeType(e) {this.sizeType = e;}, setImageUrl: function setImageUrl(e) {e && (this.imageUrl = e);}, getImageUrl: function getImageUrl() {return this.imageUrl;} };} }, { key: "initImageInfoArray", value: function value(e) {for (var t = 2, n = null, r = null; t >= 0;) {r = void 0 === e || void 0 === e[t] ? { type: 0, size: 0, width: 0, height: 0, url: "" } : e[t], (n = new this._ImageInfoModel(r)).setSizeType(t + 1), this.addImageInfo(n), t--;}} }, { key: "updateImageInfoArray", value: function value(e) {for (var t, n = this.content.imageInfoArray.length, r = 0; r < n; r++) {t = this.content.imageInfoArray[r], e.size && (t.size = e.size), e.url && t.setImageUrl(e.url), e.width && (t.width = e.width), e.height && (t.height = e.height);}} }, { key: "_autoFixUrl", value: function value() {for (var e = this.content.imageInfoArray.length, t = "", n = "", r = ["http", "https"], o = null, i = 0; i < e; i++) {this.content.imageInfoArray[i].url && "" !== (o = this.content.imageInfoArray[i]).imageUrl && (n = o.imageUrl.slice(0, o.imageUrl.indexOf("://") + 1), t = o.imageUrl.slice(o.imageUrl.indexOf("://") + 1), r.indexOf(n) < 0 && (n = "https:"), this.content.imageInfoArray[i].setImageUrl([n, t].join("")));}} }, { key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateImageFormat", value: function value(e) {this.content.imageFormat = e;} }, { key: "createImageDataASURLInWeb", value: function value(e) {void 0 !== e && e.files.length > 0 && (this._imageMemoryURL = window.URL.createObjectURL(e.files[0]));} }, { key: "createImageDataASURLInWXMiniApp", value: function value(e) {e && e.url && (this._imageMemoryURL = e.url);} }, { key: "replaceImageInfo", value: function value(e, t) {this.content.imageInfoArray[t] instanceof this._ImageInfoModel || (this.content.imageInfoArray[t] = e);} }, { key: "addImageInfo", value: function value(e) {this.content.imageInfoArray.length >= 3 || this.content.imageInfoArray.push(e);} }, { key: "sendable", value: function value() {return 0 !== this.content.imageInfoArray.length && "" !== this.content.imageInfoArray[0].imageUrl && 0 !== this.content.imageInfoArray[0].size;} }]), e;}(),Sl = function () {function e(t) {kn(this, e), this.type = pn.MSG_FACE, this.content = t || null;}return An(e, [{ key: "sendable", value: function value() {return null !== this.content;} }]), e;}(),El = function () {function e(t) {kn(this, e), this.type = pn.MSG_AUDIO, this._percent = 0, this.content = { downloadFlag: 2, second: t.second, size: t.size, url: t.url, remoteAudioUrl: "", uuid: t.uuid };}return An(e, [{ key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateAudioUrl", value: function value(e) {this.content.remoteAudioUrl = e;} }, { key: "sendable", value: function value() {return "" !== this.content.remoteAudioUrl;} }]), e;}();Ae({ target: "Object", stat: !0, forced: !i, sham: !i }, { defineProperty: w.f });var Tl = { from: !0, groupID: !0, groupName: !0, to: !0 },Dl = function () {function e(t) {kn(this, e), this.type = pn.MSG_GRP_TIP, this.content = {}, this._initContent(t);}return An(e, [{ key: "_initContent", value: function value(e) {var t = this;Object.keys(e).forEach(function (n) {switch (n) {case "remarkInfo":break;case "groupProfile":t.content.groupProfile = {}, t._initGroupProfile(e[n]);break;case "operatorInfo":case "memberInfoList":break;case "msgMemberInfo":t.content.memberList = e[n], Object.defineProperty(t.content, "msgMemberInfo", { get: function get() {return cs.warn("!!! 禁言的群提示消息中的 payload.msgMemberInfo 属性即将废弃，请使用 payload.memberList 属性替代。 \n", "msgMemberInfo 中的 shutupTime 属性对应更改为 memberList 中的 muteTime 属性，表示禁言时长。 \n", "参考：群提示消息 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/Message.html#.GroupTipPayload"), t.content.memberList.map(function (e) {return { userID: e.userID, shutupTime: e.muteTime };});} });break;default:t.content[n] = e[n];}}), this.content.userIDList || (this.content.userIDList = [this.content.operatorID]);} }, { key: "_initGroupProfile", value: function value(e) {for (var t = Object.keys(e), n = 0; n < t.length; n++) {var r = t[n];Tl[r] && (this.content.groupProfile[r] = e[r]);}} }]), e;}(),kl = { from: !0, groupID: !0, name: !0, to: !0 },wl = function () {function e(t) {kn(this, e), this.type = pn.MSG_GRP_SYS_NOTICE, this.content = {}, this._initContent(t);}return An(e, [{ key: "_initContent", value: function value(e) {var t = this;Object.keys(e).forEach(function (n) {switch (n) {case "memberInfoList":break;case "remarkInfo":t.content.handleMessage = e[n];break;case "groupProfile":t.content.groupProfile = {}, t._initGroupProfile(e[n]);break;default:t.content[n] = e[n];}});} }, { key: "_initGroupProfile", value: function value(e) {for (var t = Object.keys(e), n = 0; n < t.length; n++) {var r = t[n];kl[r] && (this.content.groupProfile[r] = e[r]);}} }]), e;}(),Al = Math.min,Rl = [].lastIndexOf,bl = !!Rl && 1 / [1].lastIndexOf(1, -0) < 0,Ol = Ke("lastIndexOf"),Ll = We("indexOf", { ACCESSORS: !0, 1: 0 }),Nl = bl || !Ol || !Ll ? function (e) {if (bl) return Rl.apply(this, arguments) || 0;var t = g(this),n = se(t.length),r = n - 1;for (arguments.length > 1 && (r = Al(r, ie(arguments[1]))), r < 0 && (r = n + r); r >= 0; r--) {if (r in t && t[r] === e) return r || 0;}return -1;} : Rl;Ae({ target: "Array", proto: !0, forced: Nl !== [].lastIndexOf }, { lastIndexOf: Nl });var Pl = { 70001: "UserSig 已过期，请重新生成。建议 UserSig 有效期设置不小于24小时。", 70002: "UserSig 长度为0，请检查传入的 UserSig 是否正确。", 70003: "UserSig 非法，请使用官网提供的 API 重新生成 UserSig(https://cloud.tencent.com/document/product/269/32688)。", 70005: "UserSig 非法，请使用官网提供的 API 重新生成 UserSig(https://cloud.tencent.com/document/product/269/32688)。", 70009: "UserSig 验证失败，可能因为生成 UserSig 时混用了其他 SDKAppID 的私钥或密钥导致，请使用对应 SDKAppID 下的私钥或密钥重新生成 UserSig(https://cloud.tencent.com/document/product/269/32688)。", 70013: "请求中的 UserID 与生成 UserSig 时使用的 UserID 不匹配，您可以在即时通信 IM 控制台的【开发辅助工具(https://console.cloud.tencent.com/im-detail/tool-usersig)】页面校验 UserSig。", 70014: "请求中的 SDKAppID 与生成 UserSig 时使用的 SDKAppID 不匹配，您可以在即时通信 IM 控制台的【开发辅助工具(https://console.cloud.tencent.com/im-detail/tool-usersig)】页面校验 UserSig。", 70016: "密钥不存在，UserSig 验证失败，请在即时通信 IM 控制台获取密钥(https://cloud.tencent.com/document/product/269/32578#.E8.8E.B7.E5.8F.96.E5.AF.86.E9.92.A5)。", 70020: "SDKAppID 未找到，请在即时通信 IM 控制台确认应用信息。", 70050: "UserSig 验证次数过于频繁。请检查 UserSig 是否正确，并于1分钟后重新验证。您可以在即时通信 IM 控制台的【开发辅助工具(https://console.cloud.tencent.com/im-detail/tool-usersig)】页面校验 UserSig。", 70051: "帐号被拉入黑名单。", 70052: "UserSig 已经失效，请重新生成，再次尝试。", 70107: "因安全原因被限制登录，请不要频繁登录。", 70169: "请求的用户帐号不存在。", 70114: "服务端内部超时，请稍后重试。", 70202: "服务端内部超时，请稍后重试。", 70206: "请求中批量数量不合法。", 70402: "参数非法，请检查必填字段是否填充，或者字段的填充是否满足协议要求。", 70403: "请求失败，需要 App 管理员权限。", 70398: "帐号数超限。如需创建多于100个帐号，请将应用升级为专业版，具体操作指引请参见购买指引(https://cloud.tencent.com/document/product/269/32458)。", 70500: "服务端内部错误，请稍后重试。", 71e3: "删除帐号失败。仅支持删除体验版帐号，您当前应用为专业版，暂不支持帐号删除。", 20001: "请求包非法。", 20002: "UserSig 或 A2 失效。", 20003: "消息发送方或接收方 UserID 无效或不存在，请检查 UserID 是否已导入即时通信 IM。", 20004: "网络异常，请重试。", 20005: "服务端内部错误，请重试。", 20006: "触发发送单聊消息之前回调，App 后台返回禁止下发该消息。", 20007: "发送单聊消息，被对方拉黑，禁止发送。消息发送状态默认展示为失败，您可以登录控制台修改该场景下的消息发送状态展示结果，具体操作请参见消息保留设置(https://cloud.tencent.com/document/product/269/38656)。", 20009: "消息发送双方互相不是好友，禁止发送（配置单聊消息校验好友关系才会出现）。", 20010: "发送单聊消息，自己不是对方的好友（单向关系），禁止发送。", 20011: "发送单聊消息，对方不是自己的好友（单向关系），禁止发送。", 20012: "发送方被禁言，该条消息被禁止发送。", 20016: "消息撤回超过了时间限制（默认2分钟）。", 20018: "删除漫游内部错误。", 90001: "JSON 格式解析失败，请检查请求包是否符合 JSON 规范。", 90002: "JSON 格式请求包中 MsgBody 不符合消息格式描述，或者 MsgBody 不是 Array 类型，请参考 TIMMsgElement 对象的定义(https://cloud.tencent.com/document/product/269/2720#.E6.B6.88.E6.81.AF.E5.85.83.E7.B4.A0-timmsgelement)。", 90003: "JSON 格式请求包体中缺少 To_Account 字段或者 To_Account 帐号不存在。", 90005: "JSON 格式请求包体中缺少 MsgRandom 字段或者 MsgRandom 字段不是 Integer 类型。", 90006: "JSON 格式请求包体中缺少 MsgTimeStamp 字段或者 MsgTimeStamp 字段不是 Integer 类型。", 90007: "JSON 格式请求包体中 MsgBody 类型不是 Array 类型，请将其修改为 Array 类型。", 90008: "JSON 格式请求包体中缺少 From_Account 字段或者 From_Account 帐号不存在。", 90009: "请求需要 App 管理员权限。", 90010: "JSON 格式请求包不符合消息格式描述，请参考 TIMMsgElement 对象的定义(https://cloud.tencent.com/document/product/269/2720#.E6.B6.88.E6.81.AF.E5.85.83.E7.B4.A0-timmsgelement)。", 90011: "批量发消息目标帐号超过500，请减少 To_Account 中目标帐号数量。", 90012: "To_Account 没有注册或不存在，请确认 To_Account 是否导入即时通信 IM 或者是否拼写错误。", 90026: "消息离线存储时间错误（最多不能超过7天）。", 90031: "JSON 格式请求包体中 SyncOtherMachine 字段不是 Integer 类型。", 90044: "JSON 格式请求包体中 MsgLifeTime 字段不是 Integer 类型。", 90048: "请求的用户帐号不存在。", 90054: "撤回请求中的 MsgKey 不合法。", 90994: "服务内部错误，请重试。", 90995: "服务内部错误，请重试。", 91e3: "服务内部错误，请重试。", 90992: "服务内部错误，请重试；如果所有请求都返回该错误码，且 App 配置了第三方回调，请检查 App 服务端是否正常向即时通信 IM 后台服务端返回回调结果。", 93e3: "JSON 数据包超长，消息包体请不要超过8k。", 91101: "Web 端长轮询被踢（Web 端同时在线实例个数超出限制）。", 10002: "服务端内部错误，请重试。", 10003: "请求中的接口名称错误，请核对接口名称并重试。", 10004: "参数非法，请根据错误描述检查请求是否正确。", 10005: "请求包体中携带的帐号数量过多。", 10006: "操作频率限制，请尝试降低调用的频率。", 10007: "操作权限不足，例如 Public 群组中普通成员尝试执行踢人操作，但只有 App 管理员才有权限。", 10008: "请求非法，可能是请求中携带的签名信息验证不正确，请再次尝试。", 10009: "该群不允许群主主动退出。", 10010: "群组不存在，或者曾经存在过，但是目前已经被解散。", 10011: "解析 JSON 包体失败，请检查包体的格式是否符合 JSON 格式。", 10012: "发起操作的 UserID 非法，请检查发起操作的用户 UserID 是否填写正确。", 10013: "被邀请加入的用户已经是群成员。", 10014: "群已满员，无法将请求中的用户加入群组，如果是批量加人，可以尝试减少加入用户的数量。", 10015: "找不到指定 ID 的群组。", 10016: "App 后台通过第三方回调拒绝本次操作。", 10017: "因被禁言而不能发送消息，请检查发送者是否被设置禁言。", 10018: "应答包长度超过最大包长（1MB），请求的内容过多，请尝试减少单次请求的数据量。", 10019: "请求的用户帐号不存在。", 10021: "群组 ID 已被使用，请选择其他的群组 ID。", 10023: "发消息的频率超限，请延长两次发消息时间的间隔。", 10024: "此邀请或者申请请求已经被处理。", 10025: "群组 ID 已被使用，并且操作者为群主，可以直接使用。", 10026: "该 SDKAppID 请求的命令字已被禁用。", 10030: "请求撤回的消息不存在。", 10031: "消息撤回超过了时间限制（默认2分钟）。", 10032: "请求撤回的消息不支持撤回操作。", 10033: "群组类型不支持消息撤回操作。", 10034: "该消息类型不支持删除操作。", 10035: "音视频聊天室和在线成员广播大群不支持删除消息。", 10036: "音视频聊天室创建数量超过了限制，请参考价格说明(https://cloud.tencent.com/document/product/269/11673)购买预付费套餐“IM音视频聊天室”。", 10037: "单个用户可创建和加入的群组数量超过了限制，请参考价格说明(https://cloud.tencent.com/document/product/269/11673)购买或升级预付费套餐“单人可创建与加入群组数”。", 10038: "群成员数量超过限制，请参考价格说明(https://cloud.tencent.com/document/product/269/11673)购买或升级预付费套餐“扩展群人数上限”。", 10041: "该应用（SDKAppID）已配置不支持群消息撤回。" },Gl = function (e) {Ln(n, e);var t = jn(n);function n(e) {var r;return kn(this, n), (r = t.call(this)).code = e.code, r.message = Pl[e.code] || e.message, r.data = e.data || {}, r;}return n;}(Un(Error)),xl = 2e3,Ul = 2001,ql = 2002,Fl = 2003,jl = 2022,Bl = 2023,Hl = 2040,Vl = 2100,Kl = 2103,$l = 2105,Yl = 2106,zl = 2108,Wl = 2109,Xl = 2110,Jl = 2251,Ql = 2252,Zl = 2253,ep = 2300,tp = 2301,np = 2350,rp = 2351,op = 2352,ip = 2400,ap = 2401,sp = 2402,up = 2403,cp = 2500,lp = 2501,pp = 2502,fp = 2600,hp = 2601,dp = 2620,gp = 2621,mp = 2622,vp = 2660,yp = 2661,_p = 2662,Ip = 2680,Cp = 2681,Mp = 2682,Sp = 2683,Ep = 2684,Tp = 2685,Dp = 2700,kp = 2721,wp = 2722,Ap = 2740,Rp = 2741,bp = 2742,Op = 2800,Lp = 2801,Np = 2802,Pp = 2803,Gp = 2804,xp = 2805,Up = 2900,qp = 2901,Fp = 2902,jp = 2903,Bp = 2904,Hp = 2999,Vp = 91101,Kp = 20002,$p = 70001,Yp = "无 SDKAppID",zp = "无 accountType",Wp = "无 userID",Xp = "无 userSig",Jp = "无 tinyID",Qp = "无 a2key",Zp = "未检测到 COS 上传插件",ef = "消息发送失败",tf = "MessageController.constructor() 需要参数 options",nf = "需要 Message 的实例",rf = 'Message.conversationType 只能为 "C2C" 或 "GROUP"',of = "无法发送空文件",af = "回调函数运行时遇到错误，请检查接入侧代码",sf = "消息撤回失败",uf = "请先选择一个图片",cf = "只允许上传 jpg png jpeg gif 格式的图片",lf = "图片大小超过20M，无法发送",pf = "语音上传失败",ff = "语音大小大于20M，无法发送",hf = "视频上传失败",df = "视频大小超过100M，无法发送",gf = "只允许上传 mp4 格式的视频",mf = "文件上传失败",vf = "请先选择一个文件",yf = "文件大小超过100M，无法发送 ",_f = "缺少必要的参数文件 URL",If = "没有找到相应的会话，请检查传入参数",Cf = "没有找到相应的用户或群组，请检查传入参数",Mf = "未记录的会话类型",Sf = "非法的群类型，请检查传入参数",Ef = "不能加入 Private 类型的群组",Tf = "AVChatRoom 类型的群组不能转让群主",Df = "不能把群主转让给自己",kf = "不能解散 Private 类型的群组",wf = "加群失败，请检查传入参数或重试",Af = "AVChatRoom 类型的群不支持邀请群成员",Rf = "非 AVChatRoom 类型的群组不允许匿名加群，请先登录后再加群",bf = "不能在 AVChatRoom 类型的群组踢人",Of = "你不是群主，只有群主才有权限操作",Lf = "不能在 Private / AVChatRoom 类型的群中设置群成员身份",Nf = "不合法的群成员身份，请检查传入参数",Pf = "不能设置自己的群成员身份，请检查传入参数",Gf = "不能将自己禁言，请检查传入参数",xf = "传入 deleteFriend 接口的参数无效",Uf = "传入 updateMyProfile 接口的参数无效",qf = "updateMyProfile 无标配资料字段或自定义资料字段",Ff = "传入 addToBlacklist 接口的参数无效",jf = "传入 removeFromBlacklist 接口的参数无效",Bf = "不能拉黑自己",Hf = "网络层初始化错误，缺少 URL 参数",Vf = "打包错误，未定义的 serverName",Kf = "未定义的 packageConfig",$f = "未连接到网络",Yf = "不规范的参数名称",zf = "意料外的通知条件",Wf = "_syncOffset 丢失",Xf = "获取 longpolling id 失败",Jf = "接口需要 SDK 处于 ready 状态后才能调用",Qf = ["jpg", "jpeg", "gif", "png"],Zf = ["mp4"],eh = function () {function e(t) {kn(this, e);var n = this._check(t);if (n instanceof Gl) throw n;this.type = pn.MSG_FILE, this._percent = 0;var r = this._getFileInfo(t);this.content = { downloadFlag: 2, fileUrl: t.url || "", uuid: t.uuid, fileName: r.name || "", fileSize: r.size || 0 };}return An(e, [{ key: "_getFileInfo", value: function value(e) {if (e.fileName && e.fileSize) return { size: e.fileSize, name: e.fileName };if (ba) return {};var t = e.file.files[0];return { size: t.size, name: t.name, type: t.type.slice(t.type.lastIndexOf("/") + 1).toLowerCase() };} }, { key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateFileUrl", value: function value(e) {this.content.fileUrl = e;} }, { key: "_check", value: function value(e) {if (e.size > 104857600) return new Gl({ code: sp, message: "".concat(yf, ": ").concat(104857600, " bytes") });} }, { key: "sendable", value: function value() {return "" !== this.content.fileUrl && "" !== this.content.fileName && 0 !== this.content.fileSize;} }]), e;}(),th = { f: qe },nh = w.f,rh = Ve.forEach,oh = V("hidden"),ih = qe("toPrimitive"),ah = Q.set,sh = Q.getterFor("Symbol"),uh = Object.prototype,_ch = r.Symbol,lh = ne("JSON", "stringify"),ph = T.f,fh = w.f,hh = so.f,dh = u.f,gh = q("symbols"),mh = q("op-symbols"),vh = q("string-to-symbol-registry"),yh = q("symbol-to-string-registry"),_h = q("wks"),Ih = r.QObject,Ch = !Ih || !Ih.prototype || !Ih.prototype.findChild,Mh = i && o(function () {return 7 != wt(fh({}, "a", { get: function get() {return fh(this, "a", { value: 7 }).a;} })).a;}) ? function (e, t, n) {var r = ph(uh, t);r && delete uh[t], fh(e, t, n), r && e !== uh && fh(uh, t, r);} : fh,Sh = function Sh(e, t) {var n = gh[e] = wt(_ch.prototype);return ah(n, { type: "Symbol", tag: e, description: t }), i || (n.description = t), n;},Eh = Pe ? function (e) {return "symbol" == typeof e;} : function (e) {return Object(e) instanceof _ch;},Th = function Th(e, t, n) {e === uh && Th(mh, t, n), D(e);var r = v(t, !0);return D(n), _(gh, r) ? (n.enumerable ? (_(e, oh) && e[oh][r] && (e[oh][r] = !1), n = wt(n, { enumerable: c(0, !1) })) : (_(e, oh) || fh(e, oh, c(1, {})), e[oh][r] = !0), Mh(e, r, n)) : fh(e, r, n);},Dh = function Dh(e, t) {D(e);var n = g(t),r = Ct(n).concat(Rh(n));return rh(r, function (t) {i && !kh.call(n, t) || Th(e, t, n[t]);}), e;},kh = function kh(e) {var t = v(e, !0),n = dh.call(this, t);return !(this === uh && _(gh, t) && !_(mh, t)) && (!(n || !_(this, t) || !_(gh, t) || _(this, oh) && this[oh][t]) || n);},wh = function wh(e, t) {var n = g(e),r = v(t, !0);if (n !== uh || !_(gh, r) || _(mh, r)) {var o = ph(n, r);return !o || !_(gh, r) || _(n, oh) && n[oh][r] || (o.enumerable = !0), o;}},Ah = function Ah(e) {var t = hh(g(e)),n = [];return rh(t, function (e) {_(gh, e) || _(K, e) || n.push(e);}), n;},Rh = function Rh(e) {var t = e === uh,n = hh(t ? mh : g(e)),r = [];return rh(n, function (e) {!_(gh, e) || t && !_(uh, e) || r.push(gh[e]);}), r;};if (Ne || (Z((_ch = function ch() {if (this instanceof _ch) throw TypeError("Symbol is not a constructor");var e = arguments.length && void 0 !== arguments[0] ? String(arguments[0]) : void 0,t = B(e),n = function n(e) {this === uh && n.call(mh, e), _(this, oh) && _(this[oh], t) && (this[oh][t] = !1), Mh(this, t, c(1, e));};return i && Ch && Mh(uh, t, { configurable: !0, set: n }), Sh(t, e);}).prototype, "toString", function () {return sh(this).tag;}), Z(_ch, "withoutSetter", function (e) {return Sh(B(e), e);}), u.f = kh, w.f = Th, T.f = wh, ve.f = so.f = Ah, ye.f = Rh, th.f = function (e) {return Sh(qe(e), e);}, i && (fh(_ch.prototype, "description", { configurable: !0, get: function get() {return sh(this).description;} }), Z(uh, "propertyIsEnumerable", kh, { unsafe: !0 }))), Ae({ global: !0, wrap: !0, forced: !Ne, sham: !Ne }, { Symbol: _ch }), rh(Ct(_h), function (e) {!function (e) {var t = ee.Symbol || (ee.Symbol = {});_(t, e) || nh(t, e, { value: th.f(e) });}(e);}), Ae({ target: "Symbol", stat: !0, forced: !Ne }, { for: function _for(e) {var t = String(e);if (_(vh, t)) return vh[t];var n = _ch(t);return vh[t] = n, yh[n] = t, n;}, keyFor: function keyFor(e) {if (!Eh(e)) throw TypeError(e + " is not a symbol");if (_(yh, e)) return yh[e];}, useSetter: function useSetter() {Ch = !0;}, useSimple: function useSimple() {Ch = !1;} }), Ae({ target: "Object", stat: !0, forced: !Ne, sham: !i }, { create: function create(e, t) {return void 0 === t ? wt(e) : Dh(wt(e), t);}, defineProperty: Th, defineProperties: Dh, getOwnPropertyDescriptor: wh }), Ae({ target: "Object", stat: !0, forced: !Ne }, { getOwnPropertyNames: Ah, getOwnPropertySymbols: Rh }), Ae({ target: "Object", stat: !0, forced: o(function () {ye.f(1);}) }, { getOwnPropertySymbols: function getOwnPropertySymbols(e) {return ye.f(Oe(e));} }), lh) {var bh = !Ne || o(function () {var e = _ch();return "[null]" != lh([e]) || "{}" != lh({ a: e }) || "{}" != lh(Object(e));});Ae({ target: "JSON", stat: !0, forced: bh }, { stringify: function stringify(e, t, n) {for (var r, o = [e], i = 1; arguments.length > i;) {o.push(arguments[i++]);}if (r = t, (m(t) || void 0 !== e) && !Eh(e)) return Le(t) || (t = function t(e, _t3) {if ("function" == typeof r && (_t3 = r.call(this, e, _t3)), !Eh(_t3)) return _t3;}), o[1] = t, lh.apply(null, o);} });}_ch.prototype[ih] || A(_ch.prototype, ih, _ch.prototype.valueOf), Vt(_ch, "Symbol"), K[oh] = !0;var Oh = w.f,Lh = r.Symbol;if (i && "function" == typeof Lh && (!("description" in Lh.prototype) || void 0 !== Lh().description)) {var Nh = {},Ph = function Ph() {var e = arguments.length < 1 || void 0 === arguments[0] ? void 0 : String(arguments[0]),t = this instanceof Ph ? new Lh(e) : void 0 === e ? Lh() : Lh(e);return "" === e && (Nh[t] = !0), t;};Ie(Ph, Lh);var Gh = Ph.prototype = Lh.prototype;Gh.constructor = Ph;var xh = Gh.toString,Uh = "Symbol(test)" == String(Lh("test")),qh = /^Symbol\((.*)\)[^)]+$/;Oh(Gh, "description", { configurable: !0, get: function get() {var e = m(this) ? this.valueOf() : this,t = xh.call(e);if (_(Nh, e)) return "";var n = Uh ? t.slice(7, -1) : t.replace(qh, "$1");return "" === n ? void 0 : n;} }), Ae({ global: !0, forced: !0 }, { Symbol: Ph });}var Fh = function () {function e(t) {kn(this, e), this.type = pn.MSG_CUSTOM, this.content = { data: t.data || "", description: t.description || "", extension: t.extension || "" };}return An(e, [{ key: "setData", value: function value(e) {return this.content.data = e, this;} }, { key: "setDescription", value: function value(e) {return this.content.description = e, this;} }, { key: "setExtension", value: function value(e) {return this.content.extension = e, this;} }, { key: "sendable", value: function value() {return 0 !== this.content.data.length || 0 !== this.content.description.length || 0 !== this.content.extension.length;} }]), e;}(),jh = function () {function e(t) {kn(this, e), this.type = pn.MSG_VIDEO, this._percent = 0, this.content = { remoteVideoUrl: t.remoteVideoUrl, videoFormat: t.videoFormat, videoSecond: parseInt(t.videoSecond, 10), videoSize: t.videoSize, videoUrl: t.videoUrl, videoDownloadFlag: 2, videoUUID: t.videoUUID, thumbUUID: t.thumbUUID, thumbFormat: t.thumbFormat, thumbWidth: t.thumbWidth, thumbHeight: t.thumbHeight, thumbSize: t.thumbSize, thumbDownloadFlag: 2, thumbUrl: t.thumbUrl };}return An(e, [{ key: "updatePercent", value: function value(e) {this._percent = e, this._percent > 1 && (this._percent = 1);} }, { key: "updateVideoUrl", value: function value(e) {e && (this.content.remoteVideoUrl = e);} }, { key: "sendable", value: function value() {return "" !== this.content.remoteVideoUrl;} }]), e;}(),Bh = function e(t) {kn(this, e), this.type = pn.MSG_GEO, this.content = t;},Hh = { 1: pn.MSG_PRIORITY_HIGH, 2: pn.MSG_PRIORITY_NORMAL, 3: pn.MSG_PRIORITY_LOW, 4: pn.MSG_PRIORITY_LOWEST },Vh = function () {function e(t) {kn(this, e), this.ID = "", this.conversationID = t.conversationID || null, this.conversationType = t.conversationType || pn.CONV_C2C, this.conversationSubType = t.conversationSubType, this.time = t.time || Math.ceil(Date.now() / 1e3), this.sequence = t.sequence || 0, this.clientSequence = t.clientSequence || t.sequence || 0, this.random = t.random || ws(), this.priority = this._computePriority(t.priority), this.nick = "", this.avatar = "", this._elements = [], this.isPlaceMessage = t.isPlaceMessage || 0, this.isRevoked = 2 === t.isPlaceMessage || 8 === t.msgFlagBits, this.geo = {}, this.from = t.from || null, this.to = t.to || null, this.flow = "", this.isSystemMessage = t.isSystemMessage || !1, this.protocol = t.protocol || "JSON", this.isResend = !1, this.isRead = !1, this.status = t.status || Xs.SUCCESS, this.reInitialize(t.currentUser), this.extractGroupInfo(t.groupProfile || null);}return An(e, [{ key: "getElements", value: function value() {return this._elements;} }, { key: "extractGroupInfo", value: function value(e) {null !== e && (fs(e.fromAccountNick) && (this.nick = e.fromAccountNick), fs(e.fromAccountHeadurl) && (this.avatar = e.fromAccountHeadurl));} }, { key: "_initProxy", value: function value() {this.payload = this._elements[0].content, this.type = this._elements[0].type;} }, { key: "reInitialize", value: function value(e) {e && (this.status = this.from ? Xs.SUCCESS : Xs.UNSEND, !this.from && (this.from = e)), this._initFlow(e), this._initielizeSequence(e), this._concactConversationID(e), this.generateMessageID(e);} }, { key: "isSendable", value: function value() {return 0 !== this._elements.length && ("function" != typeof this._elements[0].sendable ? (cs.warn("".concat(this._elements[0].type, ' need "boolean : sendable()" method')), !1) : this._elements[0].sendable());} }, { key: "_initTo", value: function value(e) {this.conversationType === pn.CONV_GROUP && (this.to = e.groupID);} }, { key: "_initielizeSequence", value: function value(e) {0 === this.clientSequence && e && (this.clientSequence = function (e) {if (!e) return cs.error("autoincrementIndex(string: key) need key parameter"), !1;if (void 0 === Os[e]) {var t = new Date(),n = "3".concat(t.getHours()).slice(-2),r = "0".concat(t.getMinutes()).slice(-2),o = "0".concat(t.getSeconds()).slice(-2);Os[e] = parseInt([n, r, o, "0001"].join("")), n = null, r = null, o = null, cs.warn("utils.autoincrementIndex() create new sequence : ".concat(e, " = ").concat(Os[e]));}return Os[e]++;}(e)), 0 === this.sequence && this.conversationType === pn.CONV_C2C && (this.sequence = this.clientSequence);} }, { key: "generateMessageID", value: function value(e) {var t = e === this.from ? 1 : 0,n = this.sequence > 0 ? this.sequence : this.clientSequence;this.ID = "".concat(this.conversationID, "-").concat(n, "-").concat(this.random, "-").concat(t);} }, { key: "_initFlow", value: function value(e) {"" !== e && (e === this.from ? (this.flow = "out", this.isRead = !0) : this.flow = "in");} }, { key: "_concactConversationID", value: function value(e) {var t = this.to,n = "",r = this.conversationType;r !== pn.CONV_SYSTEM ? (n = r === pn.CONV_C2C ? e === this.from ? t : this.from : this.to, this.conversationID = "".concat(r).concat(n)) : this.conversationID = pn.CONV_SYSTEM;} }, { key: "isElement", value: function value(e) {return e instanceof Qs || e instanceof Ml || e instanceof Sl || e instanceof El || e instanceof eh || e instanceof jh || e instanceof Dl || e instanceof wl || e instanceof Fh || e instanceof Bh;} }, { key: "setElement", value: function value(e) {var t = this;if (this.isElement(e)) return this._elements = [e], void this._initProxy();var n = function n(e) {switch (e.type) {case pn.MSG_TEXT:t.setTextElement(e.content);break;case pn.MSG_IMAGE:t.setImageElement(e.content);break;case pn.MSG_AUDIO:t.setAudioElement(e.content);break;case pn.MSG_FILE:t.setFileElement(e.content);break;case pn.MSG_VIDEO:t.setVideoElement(e.content);break;case pn.MSG_CUSTOM:t.setCustomElement(e.content);break;case pn.MSG_GEO:t.setGEOElement(e.content);break;case pn.MSG_GRP_TIP:t.setGroupTipElement(e.content);break;case pn.MSG_GRP_SYS_NOTICE:t.setGroupSystemNoticeElement(e.content);break;case pn.MSG_FACE:t.setFaceElement(e.content);break;default:cs.warn(e.type, e.content, "no operation......");}};if (Array.isArray(e)) for (var r = 0; r < e.length; r++) {n(e[r]);} else n(e);this._initProxy();} }, { key: "setTextElement", value: function value(e) {var t = "string" == typeof e ? e : e.text,n = new Qs({ text: t });this._elements.push(n);} }, { key: "setImageElement", value: function value(e) {var t = new Ml(e);this._elements.push(t);} }, { key: "setAudioElement", value: function value(e) {var t = new El(e);this._elements.push(t);} }, { key: "setFileElement", value: function value(e) {var t = new eh(e);this._elements.push(t);} }, { key: "setVideoElement", value: function value(e) {var t = new jh(e);this._elements.push(t);} }, { key: "setGEOElement", value: function value(e) {var t = new Bh(e);this._elements.push(t);} }, { key: "setCustomElement", value: function value(e) {var t = new Fh(e);this._elements.push(t);} }, { key: "setGroupTipElement", value: function value(e) {if (e.operatorInfo) {var t = e.operatorInfo,n = t.nick,r = t.avatar;fs(n) && (this.nick = n), fs(r) && (this.avatar = r);}var o = new Dl(e);this._elements.push(o);} }, { key: "setGroupSystemNoticeElement", value: function value(e) {var t = new wl(e);this._elements.push(t);} }, { key: "setFaceElement", value: function value(e) {var t = new Sl(e);this._elements.push(t);} }, { key: "setIsRead", value: function value(e) {this.isRead = e;} }, { key: "_computePriority", value: function value(e) {if (ms(e)) return pn.MSG_PRIORITY_NORMAL;if (fs(e) && -1 !== Object.values(Hh).indexOf(e)) return e;if (ps(e)) {var t = "" + e;if (-1 !== Object.keys(Hh).indexOf(t)) return Hh[t];}return pn.MSG_PRIORITY_NORMAL;} }, { key: "elements", get: function get() {return cs.warn("！！！Message 实例的 elements 属性即将废弃，请尽快修改。使用 type 和 payload 属性处理单条消息，兼容组合消息使用 _elements 属性！！！"), this._elements;} }]), e;}(),Kh = function Kh(e) {return !!e && (!!(function (e) {return fs(e) && e.slice(0, 3) === pn.CONV_C2C;}(e) || function (e) {return fs(e) && e.slice(0, 5) === pn.CONV_GROUP;}(e) || Us(e)) || (console.warn("非法的会话 ID:".concat(e, "。会话 ID 组成方式：\n  C2C + userID（单聊）\n  GROUP + groupID（群聊）\n  @TIM#SYSTEM（系统通知会话）")), !1));},$h = { login: { userID: { type: "String", required: !0 }, userSig: { type: "String", required: !0 } }, addToBlacklist: { userIDList: { type: "Array", required: !0 } }, mutilParam: [{ name: "paramName", type: "Number", required: !0 }, { name: "paramName", type: "String", required: !0 }], on: [{ name: "eventName", type: "String", validator: function validator(e) {return "string" == typeof e && 0 !== e.length || (console.warn("on 接口的 eventName 参数必须是 String 类型，且不能为空。"), !1);} }, { name: "handler", type: "Function", validator: function validator(e) {return "function" != typeof e ? (console.warn("on 接口的 handler 参数必须是 Function 类型。"), !1) : ("" === e.name && console.warn("on 接口的 handler 参数推荐使用具名函数。具名函数可以使用 off 接口取消订阅，匿名函数无法取消订阅。"), !0);} }], once: [{ name: "eventName", type: "String", validator: function validator(e) {return "string" == typeof e && 0 !== e.length || (console.warn("once 接口的 eventName 参数必须是 String 类型，且不能为空。"), !1);} }, { name: "handler", type: "Function", validator: function validator(e) {return "function" != typeof e ? (console.warn("once 接口的 handler 参数必须是 Function 类型。"), !1) : ("" === e.name && console.warn("once 接口的 handler 参数推荐使用具名函数。"), !0);} }], off: [{ name: "eventName", type: "String", validator: function validator(e) {return "string" == typeof e && 0 !== e.length || (console.warn("off 接口的 eventName 参数必须是 String 类型，且不能为空。"), !1);} }, { name: "handler", type: "Function", validator: function validator(e) {return "function" != typeof e ? (console.warn("off 接口的 handler 参数必须是 Function 类型。"), !1) : ("" === e.name && console.warn("off 接口的 handler 参数为匿名函数，无法取消订阅。"), !0);} }], sendMessage: [{ name: "message", type: "Object", required: !0 }], getMessageList: { conversationID: { type: "String", required: !0, validator: function validator(e) {return Kh(e);} }, nextReqMessageID: { type: "String" }, count: { type: "Number", validator: function validator(e) {return !(!ms(e) && !/^[1-9][0-9]*$/.test(e)) || (console.warn("getMessageList 接口的 count 参数必须为正整数"), !1);} } }, setMessageRead: { conversationID: { type: "String", required: !0, validator: function validator(e) {return Kh(e);} } }, getConversationProfile: [{ name: "conversationID", type: "String", required: !0, validator: function validator(e) {return Kh(e);} }], deleteConversation: [{ name: "conversationID", type: "String", required: !0, validator: function validator(e) {return Kh(e);} }], getGroupList: { groupProfileFilter: { type: "Array" } }, getGroupProfile: { groupID: { type: "String", required: !0 }, groupCustomFieldFilter: { type: "Array" }, memberCustomFieldFilter: { type: "Array" } }, getGroupProfileAdvance: { groupIDList: { type: "Array", required: !0 } }, createGroup: { name: { type: "String", required: !0 } }, joinGroup: { groupID: { type: "String", required: !0 }, type: { type: "String" }, applyMessage: { type: "String" } }, quitGroup: [{ name: "groupID", type: "String", required: !0 }], handleApplication: { message: { type: "Object", required: !0 }, handleAction: { type: "String", required: !0 }, handleMessage: { type: "String" } }, changeGroupOwner: { groupID: { type: "String", required: !0 }, newOwnerID: { type: "String", required: !0 } }, updateGroupProfile: { groupID: { type: "String", required: !0 }, muteAllMembers: { type: "Boolean" } }, dismissGroup: [{ name: "groupID", type: "String", required: !0 }], searchGroupByID: [{ name: "groupID", type: "String", required: !0 }], getGroupMemberList: { groupID: { type: "String", required: !0 }, offset: { type: "Number" }, count: { type: "Number" } }, getGroupMemberProfile: { groupID: { type: "String", required: !0 }, userIDList: { type: "Array", required: !0 }, memberCustomFieldFilter: { type: "Array" } }, addGroupMemeber: { groupID: { type: "String", required: !0 }, userIDList: { type: "Array", required: !0 } }, setGroupMemberRole: { groupID: { type: "String", required: !0 }, userID: { type: "String", required: !0 }, role: { type: "String", required: !0 } }, setGroupMemberMuteTime: { groupID: { type: "String", required: !0 }, userID: { type: "String", required: !0 }, muteTime: { type: "Number", validator: function validator(e) {return e >= 0;} } }, setGroupMemberNameCard: { groupID: { type: "String", required: !0 }, userID: { type: "String" }, nameCard: { type: "String", required: !0, validator: function validator(e) {return !0 !== /^\s+$/.test(e);} } }, setMessageRemindType: { groupID: { type: "String", required: !0 }, messageRemindType: { type: "String", required: !0 } }, setGroupMemberCustomField: { groupID: { type: "String", required: !0 }, userID: { type: "String" }, memberCustomField: { type: "Array", required: !0 } }, deleteGroupMember: { groupID: { type: "String", required: !0 } }, createTextMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0, validator: function validator(e) {return fs(e.text) ? 0 !== e.text.length || (console.warn("createTextMessage 消息内容不能为空。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createTextMessage"), !1) : (console.warn("createTextMessage payload.text 类型必须为字符串。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createTextMessage"), !1);} } }, createCustomMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0 } }, createImageMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0, validator: function validator(e) {if (ms(e.file)) return console.warn("createImageMessage payload.file 不能为 undefined。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createImageMessage"), !1;if (Ra) {if (!(e.file instanceof HTMLInputElement || ls(e.file))) return console.warn("createImageMessage payload.file 的类型必须是 HTMLInputElement 或 File。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createImageMessage"), !1;if (e.file instanceof HTMLInputElement && 0 === e.file.files.length) return console.warn("createImageMessage 您没有选择文件，无法发送。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createImageMessage"), !1;}return !0;}, onProgress: { type: "Function", required: !1, validator: function validator(e) {return ms(e) && console.warn("createImageMessage 没有 onProgress 回调，您将无法获取图片上传进度。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createImageMessage"), !0;} } } }, createAudioMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0 }, onProgress: { type: "Function", required: !1, validator: function validator(e) {return ms(e) && console.warn("createAudioMessage 没有 onProgress 回调，您将无法获取音频上传进度。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createAudioMessage"), !0;} } }, createVideoMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0, validator: function validator(e) {if (ms(e.file)) return console.warn("createVideoMessage payload.file 不能为 undefined。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createVideoMessage"), !1;if (Ra) {if (!(e.file instanceof HTMLInputElement || ls(e.file))) return console.warn("createVideoMessage payload.file 的类型必须是 HTMLInputElement 或 File。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createVideoMessage"), !1;if (e.file instanceof HTMLInputElement && 0 === e.file.files.length) return console.warn("createVideoMessage 您没有选择文件，无法发送。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createVideoMessage"), !1;}return !0;} }, onProgress: { type: "Function", required: !1, validator: function validator(e) {return ms(e) && console.warn("createVideoMessage 没有 onProgress 回调，您将无法获取视频上传进度。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createVideoMessage"), !0;} } }, createFaceMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0, validator: function validator(e) {return !!ds(e) && (ps(e.index) ? !!fs(e.data) || (console.warn("createFaceMessage payload.data 类型必须为 String！"), !1) : (console.warn("createFaceMessage payload.index 类型必须为 Number！"), !1));} } }, createFileMessage: { to: { type: "String", required: !0 }, conversationType: { type: "String", required: !0 }, payload: { type: "Object", required: !0, validator: function validator(e) {if (ms(e.file)) return console.warn("createFileMessage payload.file 不能为 undefined。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createFileMessage"), !1;if (Ra) {if (!(e.file instanceof HTMLInputElement || ls(e.file))) return console.warn("createFileMessage payload.file 的类型必须是 HTMLInputElement 或 File。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createFileMessage"), !1;if (e.file instanceof HTMLInputElement && 0 === e.file.files.length) return console.warn("createFileMessage 您没有选择文件，无法发送。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createFileMessage"), !1;}return !0;} }, onProgress: { type: "Function", required: !1, validator: function validator(e) {return ms(e) && console.warn("createFileMessage 没有 onProgress 回调，您将无法获取文件上传进度。请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#createFileMessage"), !0;} } }, revokeMessage: [{ name: "message", type: "Object", required: !0, validator: function validator(e) {return e instanceof Vh ? e.conversationType === pn.CONV_SYSTEM ? (console.warn("revokeMessage 不能撤回系统会话消息，只能撤回单聊消息或群消息"), !1) : !0 !== e.isRevoked || (console.warn("revokeMessage 消息已经被撤回，请勿重复操作"), !1) : (console.warn("revokeMessage 参数 message 必须为 Message(https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/Message.html) 实例。"), !1);} }], getUserProfile: { userIDList: { type: "Array", validator: function validator(e) {return gs(e) ? (0 === e.length && console.warn("getUserProfile userIDList 不能为空数组，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#getUserProfile"), !0) : (console.warn("getUserProfile userIDList 必须为数组，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#getUserProfile"), !1);} } }, updateMyProfile: { profileCustomField: { type: "Array", validator: function validator(e) {return !!ms(e) || !!gs(e) || (console.warn("updateMyProfile profileCustomField 必须为数组，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#updateMyProfile"), !1);} } } },Yh = { login: "login", logout: "logout", on: "on", once: "once", off: "off", setLogLevel: "setLogLevel", downloadLog: "downloadLog", registerPlugin: "registerPlugin", destroy: "destroy", createTextMessage: "createTextMessage", createImageMessage: "createImageMessage", createAudioMessage: "createAudioMessage", createVideoMessage: "createVideoMessage", createCustomMessage: "createCustomMessage", createFaceMessage: "createFaceMessage", createFileMessage: "createFileMessage", sendMessage: "sendMessage", resendMessage: "resendMessage", getMessageList: "getMessageList", setMessageRead: "setMessageRead", revokeMessage: "revokeMessage", getConversationList: "getConversationList", getConversationProfile: "getConversationProfile", deleteConversation: "deleteConversation", getGroupList: "getGroupList", getGroupProfile: "getGroupProfile", createGroup: "createGroup", joinGroup: "joinGroup", updateGroupProfile: "updateGroupProfile", quitGroup: "quitGroup", dismissGroup: "dismissGroup", changeGroupOwner: "changeGroupOwner", searchGroupByID: "searchGroupByID", setMessageRemindType: "setMessageRemindType", handleGroupApplication: "handleGroupApplication", getGroupMemberProfile: "getGroupMemberProfile", getGroupMemberList: "getGroupMemberList", addGroupMember: "addGroupMember", deleteGroupMember: "deleteGroupMember", setGroupMemberNameCard: "setGroupMemberNameCard", setGroupMemberMuteTime: "setGroupMemberMuteTime", setGroupMemberRole: "setGroupMemberRole", setGroupMemberCustomField: "setGroupMemberCustomField", getMyProfile: "getMyProfile", getUserProfile: "getUserProfile", updateMyProfile: "updateMyProfile", getBlacklist: "getBlacklist", addToBlacklist: "addToBlacklist", removeFromBlacklist: "removeFromBlacklist", getFriendList: "getFriendList" },zh = "1.7.3",Wh = "537048168",Xh = "10",Jh = "protobuf",Qh = "json",Zh = { HOST: { TYPE: 3, ACCESS_LAYER_TYPES: { SANDBOX: 1, TEST: 2, PRODUCTION: 3 }, CURRENT: { COMMON: "https://webim.tim.qq.com", PIC: "https://pic.tim.qq.com", COS: "https://yun.tim.qq.com" }, PRODUCTION: { COMMON: "https://webim.tim.qq.com", PIC: "https://pic.tim.qq.com", COS: "https://yun.tim.qq.com" }, SANDBOX: { COMMON: "https://events.tim.qq.com", PIC: "https://pic.tim.qq.com", COS: "https://yun.tim.qq.com" }, TEST: { COMMON: "https://test.tim.qq.com", PIC: "https://pic.tim.qq.com", COS: "https://test.tim.qq.com" }, setCurrent: function setCurrent() {var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3;switch (e) {case this.ACCESS_LAYER_TYPES.SANDBOX:this.CURRENT = this.SANDBOX, this.TYPE = this.ACCESS_LAYER_TYPES.SANDBOX;break;case this.ACCESS_LAYER_TYPES.TEST:this.CURRENT = this.TEST, this.TYPE = this.ACCESS_LAYER_TYPES.TEST;break;default:this.CURRENT = this.PRODUCTION, this.TYPE = this.ACCESS_LAYER_TYPES.PRODUCTION;}} }, NAME: { OPEN_IM: "openim", GROUP: "group_open_http_svc", FRIEND: "sns", PROFILE: "profile", RECENT_CONTACT: "recentcontact", PIC: "openpic", BIG_GROUP_NO_AUTH: "group_open_http_noauth_svc", BIG_GROUP_LONG_POLLING_NO_AUTH: "group_open_long_polling_http_noauth_svc", IM_OPEN_STAT: "imopenstat", WEB_IM: "webim", IM_COS_SIGN: "im_cos_sign_svr" }, CMD: { ACCESS_LAYER: "accesslayer", LOGIN: "login", LOGOUT_LONG_POLL: "longpollinglogout", LOGOUT_ALL: "logout", PORTRAIT_GET: "portrait_get_all", PORTRAIT_SET: "portrait_set", GET_LONG_POLL_ID: "getlongpollingid", LONG_POLL: "longpolling", AVCHATROOM_LONG_POLL: "get_msg", FRIEND_ADD: "friend_add", FRIEND_GET_ALL: "friend_get_all", FRIEND_DELETE: "friend_delete", RESPONSE_PENDENCY: "friend_response", GET_PENDENCY: "pendency_get", DELETE_PENDENCY: "pendency_delete", GET_GROUP_PENDENCY: "get_pendency", GET_BLACKLIST: "black_list_get", ADD_BLACKLIST: "black_list_add", DELETE_BLACKLIST: "black_list_delete", CREATE_GROUP: "create_group", GET_JOINED_GROUPS: "get_joined_group_list", SEND_MESSAGE: "sendmsg", REVOKE_C2C_MESSAGE: "msgwithdraw", SEND_GROUP_MESSAGE: "send_group_msg", REVOKE_GROUP_MESSAGE: "group_msg_recall", GET_GROUP_INFO: "get_group_info", GET_GROUP_MEMBER_INFO: "get_specified_group_member_info", GET_GROUP_MEMBER_LIST: "get_group_member_info", QUIT_GROUP: "quit_group", CHANGE_GROUP_OWNER: "change_group_owner", DESTROY_GROUP: "destroy_group", ADD_GROUP_MEMBER: "add_group_member", DELETE_GROUP_MEMBER: "delete_group_member", SEARCH_GROUP_BY_ID: "get_group_public_info", APPLY_JOIN_GROUP: "apply_join_group", HANDLE_APPLY_JOIN_GROUP: "handle_apply_join_group", MODIFY_GROUP_INFO: "modify_group_base_info", MODIFY_GROUP_MEMBER_INFO: "modify_group_member_info", DELETE_GROUP_SYSTEM_MESSAGE: "deletemsg", GET_CONVERSATION_LIST: "get", PAGING_GET_CONVERSATION_LIST: "page_get", DELETE_CONVERSATION: "delete", GET_MESSAGES: "getmsg", GET_C2C_ROAM_MESSAGES: "getroammsg", GET_GROUP_ROAM_MESSAGES: "group_msg_get", SET_C2C_MESSAGE_READ: "msgreaded", SET_GROUP_MESSAGE_READ: "msg_read_report", FILE_READ_AND_WRITE_AUTHKEY: "authkey", FILE_UPLOAD: "pic_up", COS_SIGN: "cos", TIM_WEB_REPORT: "tim_web_report", BIG_DATA_HALLWAY_AUTH_KEY: "authkey" }, CHANNEL: { SOCKET: 1, XHR: 2, AUTO: 0 }, NAME_VERSION: { openim: "v4", group_open_http_svc: "v4", sns: "v4", profile: "v4", recentcontact: "v4", openpic: "v4", group_open_http_noauth_svc: "v1", group_open_long_polling_http_noauth_svc: "v1", imopenstat: "v4", im_cos_sign_svr: "v4", webim: "v4" } };Zh.HOST.setCurrent(Zh.HOST.ACCESS_LAYER_TYPES.PRODUCTION);var ed = { request: { toAccount: "To_Account", fromAccount: "From_Account", to: "To_Account", from: "From_Account", groupID: "GroupId", avatar: "FaceUrl" }, response: { GroupId: "groupID", Member_Account: "userID", MsgList: "messageList", SyncFlag: "syncFlag", To_Account: "to", From_Account: "from", MsgSeq: "sequence", MsgRandom: "random", MsgTimeStamp: "time", MsgContent: "content", MsgBody: "elements", GroupWithdrawInfoArray: "revokedInfos", WithdrawC2cMsgNotify: "c2cMessageRevokedNotify", C2cWithdrawInfoArray: "revokedInfos", MsgRand: "random", MsgType: "type", MsgShow: "messageShow", NextMsgSeq: "nextMessageSeq", FaceUrl: "avatar", ProfileDataMod: "profileModify", Profile_Account: "userID", ValueBytes: "value", ValueNum: "value", NoticeSeq: "noticeSequence", NotifySeq: "notifySequence", MsgFrom_AccountExtraInfo: "messageFromAccountExtraInformation", Operator_Account: "operatorID", OpType: "operationType", ReportType: "operationType", UserId: "userID", User_Account: "userID", List_Account: "userIDList", MsgOperatorMemberExtraInfo: "operatorInfo", MsgMemberExtraInfo: "memberInfoList", ImageUrl: "avatar", NickName: "nick", MsgGroupNewInfo: "newGroupProfile", MsgAppDefinedData: "groupCustomField", Owner_Account: "ownerID", GroupName: "name", GroupFaceUrl: "avatar", GroupIntroduction: "introduction", GroupNotification: "notification", GroupApplyJoinOption: "joinOption", MsgKey: "messageKey", GroupInfo: "groupProfile", ShutupTime: "muteTime", Desc: "description", Ext: "extension" }, ignoreKeyWord: ["C2C", "ID", "USP"] },td = "_contextWasUpdated",nd = "_contextWasReset",rd = "_a2KeyAndTinyIDUpdated",od = "_specifiedConfigUpdated",id = "_noticeIsSynchronizing",ad = "_noticeIsSynchronized",sd = "_messageSent",ud = "_syncMessageProcessing",cd = "_syncMessageFinished",ld = "_receiveInstantMessage",pd = "_receiveGroupInstantMessage",fd = "_receveGroupSystemNotice",hd = "_messageRevoked",dd = "_longPollGetIDFailed",gd = "_longPollRequestFailed",md = "_longPollResponseOK",vd = "_longPollFastStart",yd = "_longPollSlowStart",_d = "_longPollKickedOut",Id = "_longPollMitipuleDeviceKickedOut",Cd = "_longPollGetNewC2CNotice",Md = "_longPollGetNewGroupMessages",Sd = "_longPollGetNewGroupTips",Ed = "_longPollGetNewGroupNotice",Td = "_longPollGetNewFriendMessages",Dd = "_longPollProfileModified",kd = "_longPollNoticeReceiveSystemOrders",wd = " _longpollGroupMessageRevoked",Ad = "_longpollC2CMessageRevoked",Rd = "_avlongPollRequestFailed",bd = "_avlongPollResponseOK",Od = "_onGroupListUpdated",Ld = "_loginSuccess",Nd = "_signLogoutExcuting",Pd = "_logoutSuccess",Gd = "_a2keyExpired",xd = "_errorHasBeenDetected",Ud = "_onConversationListUpdated",qd = "_onConversationListProfileUpdated",Fd = "_conversationDeleted",jd = "onProfileUpdated",Bd = "joinAVChatRoomSuccess",Hd = "joinAVChatRoomSuccessNoAuth",Vd = "_sdkStateReady",Kd = Ve.filter,$d = yn("filter"),Yd = We("filter");Ae({ target: "Array", proto: !0, forced: !$d || !Yd }, { filter: function filter(e) {return Kd(this, e, arguments.length > 1 ? arguments[1] : void 0);} }), Ae({ target: "Object", stat: !0, forced: Object.assign !== ru }, { assign: ru });var zd = Kr.trim;function Wd(e, t) {if ("string" != typeof e && !Array.isArray(e)) throw new TypeError("Expected the input to be `string | string[]`");t = Object.assign({ pascalCase: !1 }, t);var n;return 0 === (e = Array.isArray(e) ? e.map(function (e) {return e.trim();}).filter(function (e) {return e.length;}).join("-") : e.trim()).length ? "" : 1 === e.length ? t.pascalCase ? e.toUpperCase() : e.toLowerCase() : (e !== e.toLowerCase() && (e = Xd(e)), e = e.replace(/^[_.\- ]+/, "").toLowerCase().replace(/[_.\- ]+(\w|$)/g, function (e, t) {return t.toUpperCase();}).replace(/\d+(\w|$)/g, function (e) {return e.toUpperCase();}), n = e, t.pascalCase ? n.charAt(0).toUpperCase() + n.slice(1) : n);}Ae({ target: "String", proto: !0, forced: function (e) {return o(function () {return !!Fr[e]() || "​᠎" != "​᠎"[e]() || Fr[e].name !== e;});}("trim") }, { trim: function trim() {return zd(this);} });var Xd = function Xd(e) {for (var t = !1, n = !1, r = !1, o = 0; o < e.length; o++) {var i = e[o];t && /[a-zA-Z]/.test(i) && i.toUpperCase() === i ? (e = e.slice(0, o) + "-" + e.slice(o), t = !1, r = n, n = !0, o++) : n && r && /[a-zA-Z]/.test(i) && i.toLowerCase() === i ? (e = e.slice(0, o - 1) + "-" + e.slice(o - 1), r = n, n = !1, t = !0) : (t = i.toLowerCase() === i && i.toUpperCase() !== i, r = n, n = i.toUpperCase() === i && i.toLowerCase() !== i);}return e;};function Jd(e, t, n) {var r = [],o = 0,i = function e(t, n) {if (++o > 10) return o--, t;if (gs(t)) {var i = t.map(function (t) {return hs(t) ? e(t, n) : t;});return o--, i;}if (hs(t)) {var a = (s = t, u = function u(e, t) {if (!Cs(t)) return !1;if ((a = t) !== Wd(a)) {for (var o = !0, i = 0; i < ed.ignoreKeyWord.length; i++) {if (t.includes(ed.ignoreKeyWord[i])) {o = !1;break;}}o && r.push(t);}var a;return ms(n[t]) ? function (e) {return e[0].toUpperCase() + Wd(e).slice(1);}(t) : n[t];}, c = Object.create(null), Object.keys(s).forEach(function (e) {var t = u(s[e], e);t && (c[t] = s[e]);}), c);return a = qs(a, function (t, r) {return gs(t) || hs(t) ? e(t, n) : t;}), o--, a;}var s, u, c;}(e, t = On({}, ed.request, {}, t));return r.length > 0 && n.innerEmitter.emit(xd, { code: Up, message: Yf }), i;}function Qd(e, t) {if (t = On({}, ed.response, {}, t), gs(e)) return e.map(function (e) {return hs(e) ? Qd(e, t) : e;});if (hs(e)) {var n = (r = e, o = function o(e, n) {return ms(t[n]) ? Wd(n) : t[n];}, i = {}, Object.keys(r).forEach(function (e) {i[o(r[e], e)] = r[e];}), i);return n = qs(n, function (e) {return gs(e) || hs(e) ? Qd(e, t) : e;});}var r, o, i;}var Zd = function () {function e(t) {var n = this;kn(this, e), this.url = "", this.requestData = null, this.method = t.method || "POST", this.callback = function (e) {return Qd(e = t.decode(e), n._getResponseMap(t));}, this._initializeServerMap(), this._initializeURL(t), this._initializeRequestData(t);}return An(e, [{ key: "_initializeServerMap", value: function value() {this._serverMap = Object.create(null);var e = "";for (var t in Zh.NAME) {if (Object.prototype.hasOwnProperty.call(Zh.NAME, t)) switch (e = Zh.NAME[t]) {case Zh.NAME.PIC:this._serverMap[e] = Zh.HOST.CURRENT.PIC;break;case Zh.NAME.IM_COS_SIGN:this._serverMap[e] = Zh.HOST.CURRENT.COS;break;default:this._serverMap[e] = Zh.HOST.CURRENT.COMMON;}}} }, { key: "_getHost", value: function value(e) {if (void 0 !== this._serverMap[e]) return this._serverMap[e];throw new Gl({ code: Pp, message: Vf });} }, { key: "_initializeURL", value: function value(e) {var t = e.serverName,n = e.cmd,r = this._getHost(t),o = "".concat(r, "/").concat(Zh.NAME_VERSION[t], "/").concat(t, "/").concat(n);o += "?".concat(this._getQueryString(e.queryString)), this.url = o;} }, { key: "getUrl", value: function value() {return this.url.replace(/&reqtime=(\d+)/, "&reqtime=".concat(Math.ceil(+new Date() / 1e3)));} }, { key: "_initializeRequestData", value: function value(e) {var t,n = e.requestData;t = this._requestDataCleaner(n), this.requestData = e.encode(t);} }, { key: "_requestDataCleaner", value: function value(e) {var t = Array.isArray(e) ? [] : Object.create(null);for (var n in e) {Object.prototype.hasOwnProperty.call(e, n) && Cs(n) && null !== e[n] && ("object" !== Dn(e[n]) ? t[n] = e[n] : t[n] = this._requestDataCleaner.bind(this)(e[n]));}return t;} }, { key: "_getQueryString", value: function value(e) {var t = [];for (var n in e) {Object.prototype.hasOwnProperty.call(e, n) && ("function" != typeof e[n] ? t.push("".concat(n, "=").concat(e[n])) : t.push("".concat(n, "=").concat(e[n]())));}return t.join("&");} }, { key: "_getResponseMap", value: function value(e) {if (e.keyMaps && e.keyMaps.response && Object.keys(e.keyMaps.response).length > 0) return e.keyMaps.response;} }]), e;}(),eg = [].slice,tg = /MSIE .\./.test(fn),ng = function ng(e) {return function (t, n) {var r = arguments.length > 2,o = r ? eg.call(arguments, 2) : void 0;return e(r ? function () {("function" == typeof t ? t : Function(t)).apply(this, o);} : t, n);};};function rg(e) {this.mixin(e);}Ae({ global: !0, bind: !0, forced: tg }, { setTimeout: ng(r.setTimeout), setInterval: ng(r.setInterval) }), rg.mixin = function (e) {var t = e.prototype || e;t._isReady = !1, t.ready = function (e) {var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];if (e) return this._isReady ? void (t ? e.call(this) : setTimeout(e, 1)) : (this._readyQueue = this._readyQueue || [], void this._readyQueue.push(e));}, t.triggerReady = function () {var e = this;this._isReady = !0, setTimeout(function () {var t = e._readyQueue;e._readyQueue = [], t && t.length > 0 && t.forEach(function (e) {e.call(this);}, e);}, 1);}, t.resetReady = function () {this._isReady = !1, this._readyQueue = [];}, t.isReady = function () {return this._isReady;};};var og = function () {function e(t) {kn(this, e), rg.mixin(this), this.tim = t;}return An(e, [{ key: "isLoggedIn", value: function value() {return this.tim.context.login === Ws.IS_LOGIN || !!this.tim.context.a2Key;} }, { key: "createTransportCapsule", value: function value(e) {var t = this.tim.packageConfig.get(e);return t ? new Zd(t) : null;} }, { key: "request", value: function value(e) {var t = this.createTransportCapsule(e);return t || cs.error("unknown transport capsule, please check!", e), this.tim.connectionController.request(t);} }, { key: "emitInnerEvent", value: function value(e, t) {this.tim.innerEmitter.emit(e, t);} }, { key: "emitOuterEvent", value: function value(e, t) {this.tim.outerEmitter.emit(e, t);} }, { key: "reset", value: function value() {cs.warn(["method: IMController.reset() method must be implemented"].join());} }, { key: "probeNetwork", value: function value() {return this.tim.netMonitor.probe();} }, { key: "getNetworkType", value: function value() {return this.tim.netMonitor.getNetworkType();} }, { key: "getPlatform", value: function value() {var e = "web";return Ba ? e = "wechat" : ba && (e = "wxmp"), e;} }]), e;}(),ig = function () {function e(t, n) {kn(this, e), this.data = t, this._innerEmitter = n, this.defaultData = {}, Object.assign(this.defaultData, t), this.initGetterAndSetter();}return An(e, [{ key: "initGetterAndSetter", value: function value() {var e = this,t = function t(_t4) {Object.defineProperty(e, _t4, { enumerable: !0, configurable: !0, get: function get() {return e.data[_t4];}, set: function set(n) {e.data[_t4] !== n && (e.data[_t4] = n, e.onChange.bind(e)(_t4, n));} });};for (var n in e.data) {Object.prototype.hasOwnProperty.call(e.data, n) && t(n);}} }, { key: "onChange", value: function value(e, t) {this._innerEmitter.emit(td, { key: e, value: t });} }, { key: "reset", value: function value() {for (var e in cs.log("Context.reset"), this.data) {Object.prototype.hasOwnProperty.call(this.data, e) && (this.data[e] = this.defaultData.hasOwnProperty(e) ? this.defaultData[e] : null);}} }]), e;}(),ag = function (e) {Ln(n, e);var t = jn(n);function n(e) {var r;kn(this, n);var o = (r = t.call(this, e)).tim.loginInfo;return r._context = new ig({ login: Ws.IS_NOT_LOGIN, SDKAppID: o.SDKAppID, appIDAt3rd: null, accountType: o.accountType, identifier: o.identifier, tinyID: null, identifierNick: o.identifierNick, userSig: o.userSig, a2Key: null, contentType: "json", apn: 1 }, r.tim.innerEmitter), r._initListener(), r;}return An(n, [{ key: "reset", value: function value() {this._context.reset(), this.emitInnerEvent(nd);} }, { key: "_initListener", value: function value() {this.tim.innerEmitter.on(td, this._onContextMemberChange, this), this.tim.innerEmitter.on(Ld, this._updateA2KeyAndTinyID, this);} }, { key: "_updateA2KeyAndTinyID", value: function value(e) {var t = e.data,n = t.a2Key,r = t.tinyID;this._context.a2Key = n, this._context.tinyID = r, this.emitInnerEvent(rd), this.triggerReady();} }, { key: "getContext", value: function value() {return this._context;} }, { key: "_onContextMemberChange", value: function value(e) {var t = e.data,n = t.key,r = t.value;("tinyID" === n || "a2Key" === n) && (r.length <= 0 ? this._context.login = Ws.IS_NOT_LOGIN : this._context.login = null !== this._context.a2Key ? Ws.IS_LOGIN : Ws.IS_NOT_LOGIN);} }]), n;}(og),sg = function e(t) {kn(this, e), this.code = 0, this.data = t || {};},ug = null,cg = function cg(e) {ug = e;},lg = function lg(e) {return e instanceof sg ? (cs.warn("IMPromise.resolve 此函数会自动用options创建IMResponse实例，调用侧不需创建，建议修改！"), Promise.resolve(e)) : Promise.resolve(new sg(e));},pg = function pg(e) {var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];if (e instanceof Gl) return t && null !== ug && ug.emit(ln.ERROR, e), Promise.reject(e);if (e instanceof Error) {var n = new Gl({ code: jp, message: e.message });return t && null !== ug && ug.emit(ln.ERROR, n), Promise.reject(n);}if (ms(e) || ms(e.code) || ms(e.message)) cs.error("IMPromise.reject 必须指定code(错误码)和message(错误信息)!!!");else {if (ps(e.code) && fs(e.message)) {var r = new Gl(e);return t && null !== ug && ug.emit(ln.ERROR, r), Promise.reject(r);}cs.error("IMPromise.reject code(错误码)必须为数字，message(错误信息)必须为字符串!!!");}},fg = "sdkReady",hg = "login",dg = "longpolling",gg = "longpollingAV",mg = "sendMessage",vg = "initConversationList",yg = "initGroupList",_g = "upload",Ig = function () {function e() {kn(this, e), this.SDKAppID = "", this.version = "", this.tinyID = "", this.userID = "", this.platform = "", this.method = "", this.time = "", this.startts = 0, this.endts = 0, this.timespan = 0, this.codeint = 0, this.message = "", this.text = "", this.msgType = "", this.networkType = "", this.platform = "", this._sentFlag = !1;}return An(e, [{ key: "setCommonInfo", value: function value(e, t, n, r, o) {this.SDKAppID = "".concat(e), this.version = "".concat(t), this.tinyID = n, this.userID = r, this.platform = o, this.time = Ds(), this.startts && this.endts && !this.timespan && (this.timespan = Math.abs(this.endts - this.startts));} }, { key: "setMethod", value: function value(e) {return this.method = e, this;} }, { key: "setStart", value: function value() {this.startts = Date.now();} }, { key: "setEnd", value: function value() {var e = this,t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];this._sentFlag || (this.endts = Date.now(), t ? (this._sentFlag = !0, this._eventStatController.pushIn(this)) : setTimeout(function () {e._sentFlag = !0, e._eventStatController.pushIn(e);}, 0));} }, { key: "setError", value: function value(e, t, n) {return e instanceof Error ? (this._sentFlag || (this.setNetworkType(n), t ? (e.code && this.setCode(e.code), e.message && this.setMessage(e.message)) : (this.setCode(xp), this.setMessage($f))), this) : (cs.warn("SSOLogData.setError value not instanceof Error, please check!"), this);} }, { key: "setCode", value: function value(e) {return ms(e) || this._sentFlag || (ps(e) ? this.codeint = e : cs.warn("SSOLogData.setCode value not a number, please check!")), this;} }, { key: "setMessage", value: function value(e) {return ms(e) || this._sentFlag ? this : fs(e) ? (this.message = e, this) : this;} }, { key: "setText", value: function value(e) {return ps(e) ? this.text = e.toString() : fs(e) && (this.text = e), this;} }, { key: "setMessageType", value: function value(e) {return this.msgType = e, this;} }, { key: "setNetworkType", value: function value(e) {return ms(e) ? cs.warn("SSOLogData.setNetworkType value is undefined, please check!") : this.networkType = e, this;} }], [{ key: "bindController", value: function value(t) {e.prototype._eventStatController = t;} }]), e;}(),Cg = "sdkConstruct",Mg = "sdkReady",Sg = "accessLayer",Eg = "login",Tg = "getCosAuthKey",Dg = "upload",kg = "sendMessage",wg = "getC2CRoamingMessages",Ag = "getGroupRoamingMessages",Rg = "revokeMessage",bg = "setC2CMessageRead",Og = "setGroupMessageRead",Lg = "getConversationList",Ng = "getConversationListInStorage",Pg = "syncConversationList",Gg = "createGroup",xg = "applyJoinGroup",Ug = "quitGroup",qg = "changeGroupOwner",Fg = "dismissGroup",jg = "updateGroupProfile",Bg = "getGroupList",Hg = "getGroupListInStorage",Vg = "getGroupLastSequence",Kg = "setGroupMemberMuteTime",$g = "setGroupMemberNameCard",Yg = "setGroupMemberRole",zg = "setGroupMemberCustomField",Wg = "getLongPollID",Xg = "longPollingError",Jg = "networkJitter",Qg = "fastStart",Zg = "slowStart",em = "getUserProfile",tm = "getBlacklist",nm = "mpHideToShow",rm = function (e) {Ln(n, e);var t = jn(n);function n(e) {var r;return kn(this, n), (r = t.call(this, e))._initializeListener(), r;}return An(n, [{ key: "login", value: function value(e) {if (this.isLoggedIn()) {var t = "您已经登录账号".concat(e.identifier, "！如需切换账号登录，请先调用 logout 接口登出，再调用 login 接口登录。");return cs.warn(t), lg({ actionStatus: "OK", errorCode: 0, errorInfo: t, repeatLogin: !0 });}cs.log("SignController.login userID=", e.identifier), cs.time(hg);var n = this._checkLoginInfo(e);return js(n) ? (this.tim.context.identifier = e.identifier, this.tim.context.userSig = e.userSig, this.tim.context.identifier && this.tim.context.userSig ? this._accessLayer() : void 0) : pg(n);} }, { key: "_isLoginCurrentUser", value: function value(e) {return this.tim.context.identifier === e;} }, { key: "_initializeListener", value: function value() {var e = this.tim.innerEmitter;e.on(_d, this._onKickedOut, this), e.on(Id, this._onMultipleDeviceKickedOut, this), e.on(Gd, this._onUserSigExpired, this);} }, { key: "_accessLayer", value: function value() {var e = this,t = new Ig();return t.setMethod(Sg).setStart(), cs.log("SignController._accessLayer."), this.request({ name: "accessLayer", action: "query" }).then(function (n) {return t.setCode(0).setNetworkType(e.getNetworkType()).setText(n.data.webImAccessLayer).setEnd(), cs.log("SignController._accessLayer ok. webImAccessLayer=".concat(n.data.webImAccessLayer)), 1 === n.data.webImAccessLayer && Zh.HOST.setCurrent(n.data.webImAccessLayer), e._login();}).catch(function (n) {return e.probeNetwork().then(function (r) {var o = Bn(r, 2),i = o[0],a = o[1];t.setError(n, i, a).setEnd(!0), e.tim.eventStatController.reportAtOnce();}), cs.error("SignController._accessLayer failed. error:".concat(n)), pg(n);});} }, { key: "_login", value: function value() {var e = this,t = new Ig();return t.setMethod(Eg).setStart(), this.request({ name: "login", action: "query" }).then(function (n) {var r = null;if (!n.data.tinyID) throw r = new Gl({ code: jl, message: Jp }), t.setError(r, !0, e.getNetworkType()).setEnd(), r;if (!n.data.a2Key) throw r = new Gl({ code: Bl, message: Qp }), t.setError(r, !0, e.getNetworkType()).setEnd(), r;return t.setCode(0).setNetworkType(e.getNetworkType()).setText("".concat(e.tim.loginInfo.identifier)).setEnd(), cs.log("SignController.login ok. userID=".concat(e.tim.loginInfo.identifier, " loginCost=").concat(cs.timeEnd(hg), "ms")), e.emitInnerEvent(Ld, { a2Key: n.data.a2Key, tinyID: n.data.tinyID }), lg(n.data);}).catch(function (n) {return e.probeNetwork().then(function (e) {var r = Bn(e, 2),o = r[0],i = r[1];t.setError(n, o, i).setEnd(!0);}), cs.error("SignController.login failed. error:".concat(n)), pg(n);});} }, { key: "logout", value: function value() {return cs.info("SignController.logout"), this.emitInnerEvent(Nd), this._logout(vl).then(this._emitLogoutSuccess.bind(this)).catch(this._emitLogoutSuccess.bind(this));} }, { key: "_logout", value: function value(e) {var t = this.tim.notificationController,n = e === ml ? "logout" : "longPollLogout",r = e === ml ? { name: n, action: "query" } : { name: n, action: "query", param: { longPollID: t.getLongPollID() } };return this.request(r).catch(function (e) {return cs.error("SignController._logout error:", e), pg(e);});} }, { key: "_checkLoginInfo", value: function value(e) {var t = 0,n = "";return null === e.SDKAppID ? (t = xl, n = Yp) : null === e.accountType ? (t = Ul, n = zp) : null === e.identifier ? (t = ql, n = Wp) : null === e.userSig && (t = Fl, n = Xp), js(t) || js(n) ? {} : { code: t, message: n };} }, { key: "_emitLogoutSuccess", value: function value() {return this.emitInnerEvent(Pd), lg({});} }, { key: "_onKickedOut", value: function value() {var e = this;cs.warn("SignController._onKickedOut kicked out. userID=".concat(this.tim.loginInfo.identifier)), this.tim.logout().then(function () {e.emitOuterEvent(ln.KICKED_OUT, { type: pn.KICKED_OUT_MULT_ACCOUNT });});} }, { key: "_onMultipleDeviceKickedOut", value: function value() {var e = this;cs.warn("SignController._onMultipleDeviceKickedOut kicked out. userID=".concat(this.tim.loginInfo.identifier)), this.tim.logout().then(function () {e.emitOuterEvent(ln.KICKED_OUT, { type: pn.KICKED_OUT_MULT_DEVICE });});} }, { key: "_onUserSigExpired", value: function value() {cs.warn("SignController._onUserSigExpired: userSig 签名过期被踢下线"), this.emitOuterEvent(ln.KICKED_OUT, { type: pn.KICKED_OUT_USERSIG_EXPIRED }), this.tim.resetSDK();} }, { key: "reset", value: function value() {cs.info("SignController.reset");} }]), n;}(og),om = function om(e, t) {return function () {for (var n = new Array(arguments.length), r = 0; r < n.length; r++) {n[r] = arguments[r];}return e.apply(t, n);};},im = Object.prototype.toString;function am(e) {return "[object Array]" === im.call(e);}function sm(e) {return void 0 === e;}function um(e) {return null !== e && "object" == typeof e;}function cm(e) {return "[object Function]" === im.call(e);}function lm(e, t) {if (null != e) if ("object" != typeof e && (e = [e]), am(e)) for (var n = 0, r = e.length; n < r; n++) {t.call(null, e[n], n, e);} else for (var o in e) {Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e);}}var pm = { isArray: am, isArrayBuffer: function isArrayBuffer(e) {return "[object ArrayBuffer]" === im.call(e);}, isBuffer: function isBuffer(e) {return null !== e && !sm(e) && null !== e.constructor && !sm(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);}, isFormData: function isFormData(e) {return "undefined" != typeof FormData && e instanceof FormData;}, isArrayBufferView: function isArrayBufferView(e) {return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer;}, isString: function isString(e) {return "string" == typeof e;}, isNumber: function isNumber(e) {return "number" == typeof e;}, isObject: um, isUndefined: sm, isDate: function isDate(e) {return "[object Date]" === im.call(e);}, isFile: function isFile(e) {return "[object File]" === im.call(e);}, isBlob: function isBlob(e) {return "[object Blob]" === im.call(e);}, isFunction: cm, isStream: function isStream(e) {return um(e) && cm(e.pipe);}, isURLSearchParams: function isURLSearchParams(e) {return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams;}, isStandardBrowserEnv: function isStandardBrowserEnv() {return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document;}, forEach: lm, merge: function e() {var t = {};function n(n, r) {"object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = n;}for (var r = 0, o = arguments.length; r < o; r++) {lm(arguments[r], n);}return t;}, deepMerge: function e() {var t = {};function n(n, r) {"object" == typeof t[r] && "object" == typeof n ? t[r] = e(t[r], n) : t[r] = "object" == typeof n ? e({}, n) : n;}for (var r = 0, o = arguments.length; r < o; r++) {lm(arguments[r], n);}return t;}, extend: function extend(e, t, n) {return lm(t, function (t, r) {e[r] = n && "function" == typeof t ? om(t, n) : t;}), e;}, trim: function trim(e) {return e.replace(/^\s*/, "").replace(/\s*$/, "");} };function fm(e) {return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");}var hm = function hm(e, t, n) {if (!t) return e;var r;if (n) r = n(t);else if (pm.isURLSearchParams(t)) r = t.toString();else {var o = [];pm.forEach(t, function (e, t) {null != e && (pm.isArray(e) ? t += "[]" : e = [e], pm.forEach(e, function (e) {pm.isDate(e) ? e = e.toISOString() : pm.isObject(e) && (e = JSON.stringify(e)), o.push(fm(t) + "=" + fm(e));}));}), r = o.join("&");}if (r) {var i = e.indexOf("#");-1 !== i && (e = e.slice(0, i)), e += (-1 === e.indexOf("?") ? "?" : "&") + r;}return e;};function dm() {this.handlers = [];}dm.prototype.use = function (e, t) {return this.handlers.push({ fulfilled: e, rejected: t }), this.handlers.length - 1;}, dm.prototype.eject = function (e) {this.handlers[e] && (this.handlers[e] = null);}, dm.prototype.forEach = function (e) {pm.forEach(this.handlers, function (t) {null !== t && e(t);});};var gm = dm,mm = function mm(e, t, n) {return pm.forEach(n, function (n) {e = n(e, t);}), e;},vm = function vm(e) {return !(!e || !e.__CANCEL__);};function ym() {throw new Error("setTimeout has not been defined");}function _m() {throw new Error("clearTimeout has not been defined");}var Im = ym,Cm = _m;function Mm(e) {if (Im === setTimeout) return setTimeout(e, 0);if ((Im === ym || !Im) && setTimeout) return Im = setTimeout, setTimeout(e, 0);try {return Im(e, 0);} catch (t) {try {return Im.call(null, e, 0);} catch (t) {return Im.call(this, e, 0);}}}"function" == typeof ts.setTimeout && (Im = setTimeout), "function" == typeof ts.clearTimeout && (Cm = clearTimeout);var Sm,Em = [],Tm = !1,Dm = -1;function km() {Tm && Sm && (Tm = !1, Sm.length ? Em = Sm.concat(Em) : Dm = -1, Em.length && wm());}function wm() {if (!Tm) {var e = Mm(km);Tm = !0;for (var t = Em.length; t;) {for (Sm = Em, Em = []; ++Dm < t;) {Sm && Sm[Dm].run();}Dm = -1, t = Em.length;}Sm = null, Tm = !1, function (e) {if (Cm === clearTimeout) return clearTimeout(e);if ((Cm === _m || !Cm) && clearTimeout) return Cm = clearTimeout, clearTimeout(e);try {Cm(e);} catch (t) {try {return Cm.call(null, e);} catch (t) {return Cm.call(this, e);}}}(e);}}function Am(e, t) {this.fun = e, this.array = t;}Am.prototype.run = function () {this.fun.apply(null, this.array);};function Rm() {}var bm = Rm,Om = Rm,Lm = Rm,Nm = Rm,Pm = Rm,Gm = Rm,xm = Rm;var Um = ts.performance || {},qm = Um.now || Um.mozNow || Um.msNow || Um.oNow || Um.webkitNow || function () {return new Date().getTime();};var Fm = new Date();var jm = { nextTick: function nextTick(e) {var t = new Array(arguments.length - 1);if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) {t[n - 1] = arguments[n];}Em.push(new Am(e, t)), 1 !== Em.length || Tm || Mm(wm);}, title: "browser", browser: !0, env: {}, argv: [], version: "", versions: {}, on: bm, addListener: Om, once: Lm, off: Nm, removeListener: Pm, removeAllListeners: Gm, emit: xm, binding: function binding(e) {throw new Error("process.binding is not supported");}, cwd: function cwd() {return "/";}, chdir: function chdir(e) {throw new Error("process.chdir is not supported");}, umask: function umask() {return 0;}, hrtime: function hrtime(e) {var t = .001 * qm.call(Um),n = Math.floor(t),r = Math.floor(t % 1 * 1e9);return e && (n -= e[0], (r -= e[1]) < 0 && (n--, r += 1e9)), [n, r];}, platform: "browser", release: {}, config: {}, uptime: function uptime() {return (new Date() - Fm) / 1e3;} },Bm = function Bm(e, t) {pm.forEach(e, function (n, r) {r !== t && r.toUpperCase() === t.toUpperCase() && (e[t] = n, delete e[r]);});},Hm = function Hm(e, t, n, r, o) {return function (e, t, n, r, o) {return e.config = t, n && (e.code = n), e.request = r, e.response = o, e.isAxiosError = !0, e.toJSON = function () {return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: this.config, code: this.code };}, e;}(new Error(e), t, n, r, o);},Vm = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"],Km = pm.isStandardBrowserEnv() ? function () {var e,t = /(msie|trident)/i.test(navigator.userAgent),n = document.createElement("a");function r(e) {var r = e;return t && (n.setAttribute("href", r), r = n.href), n.setAttribute("href", r), { href: n.href, protocol: n.protocol ? n.protocol.replace(/:$/, "") : "", host: n.host, search: n.search ? n.search.replace(/^\?/, "") : "", hash: n.hash ? n.hash.replace(/^#/, "") : "", hostname: n.hostname, port: n.port, pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname };}return e = r(window.location.href), function (t) {var n = pm.isString(t) ? r(t) : t;return n.protocol === e.protocol && n.host === e.host;};}() : function () {return !0;},$m = pm.isStandardBrowserEnv() ? { write: function write(e, t, n, r, o, i) {var a = [];a.push(e + "=" + encodeURIComponent(t)), pm.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()), pm.isString(r) && a.push("path=" + r), pm.isString(o) && a.push("domain=" + o), !0 === i && a.push("secure"), document.cookie = a.join("; ");}, read: function read(e) {var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));return t ? decodeURIComponent(t[3]) : null;}, remove: function remove(e) {this.write(e, "", Date.now() - 864e5);} } : { write: function write() {}, read: function read() {return null;}, remove: function remove() {} },Ym = function Ym(e) {return new Promise(function (t, n) {var r = e.data,o = e.headers;pm.isFormData(r) && delete o["Content-Type"];var i = new XMLHttpRequest();if (e.auth) {var a = e.auth.username || "",s = e.auth.password || "";o.Authorization = "Basic " + btoa(a + ":" + s);}var u,c,l = (u = e.baseURL, c = e.url, u && !/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(c) ? function (e, t) {return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;}(u, c) : c);if (i.open(e.method.toUpperCase(), hm(l, e.params, e.paramsSerializer), !0), i.timeout = e.timeout, i.onreadystatechange = function () {if (i && 4 === i.readyState && (0 !== i.status || i.responseURL && 0 === i.responseURL.indexOf("file:"))) {var r = "getAllResponseHeaders" in i ? function (e) {var t,n,r,o = {};return e ? (pm.forEach(e.split("\n"), function (e) {if (r = e.indexOf(":"), t = pm.trim(e.substr(0, r)).toLowerCase(), n = pm.trim(e.substr(r + 1)), t) {if (o[t] && Vm.indexOf(t) >= 0) return;o[t] = "set-cookie" === t ? (o[t] ? o[t] : []).concat([n]) : o[t] ? o[t] + ", " + n : n;}}), o) : o;}(i.getAllResponseHeaders()) : null,o = { data: e.responseType && "text" !== e.responseType ? i.response : i.responseText, status: i.status, statusText: i.statusText, headers: r, config: e, request: i };!function (e, t, n) {var r = n.config.validateStatus;!r || r(n.status) ? e(n) : t(Hm("Request failed with status code " + n.status, n.config, null, n.request, n));}(t, n, o), i = null;}}, i.onabort = function () {i && (n(Hm("Request aborted", e, "ECONNABORTED", i)), i = null);}, i.onerror = function () {n(Hm("Network Error", e, null, i)), i = null;}, i.ontimeout = function () {var t = "timeout of " + e.timeout + "ms exceeded";e.timeoutErrorMessage && (t = e.timeoutErrorMessage), n(Hm(t, e, "ECONNABORTED", i)), i = null;}, pm.isStandardBrowserEnv()) {var p = $m,f = (e.withCredentials || Km(l)) && e.xsrfCookieName ? p.read(e.xsrfCookieName) : void 0;f && (o[e.xsrfHeaderName] = f);}if ("setRequestHeader" in i && pm.forEach(o, function (e, t) {void 0 === r && "content-type" === t.toLowerCase() ? delete o[t] : i.setRequestHeader(t, e);}), pm.isUndefined(e.withCredentials) || (i.withCredentials = !!e.withCredentials), e.responseType) try {i.responseType = e.responseType;} catch (h) {if ("json" !== e.responseType) throw h;}"function" == typeof e.onDownloadProgress && i.addEventListener("progress", e.onDownloadProgress), "function" == typeof e.onUploadProgress && i.upload && i.upload.addEventListener("progress", e.onUploadProgress), e.cancelToken && e.cancelToken.promise.then(function (e) {i && (i.abort(), n(e), i = null);}), void 0 === r && (r = null), i.send(r);});},zm = { "Content-Type": "application/x-www-form-urlencoded" };function Wm(e, t) {!pm.isUndefined(e) && pm.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);}var Xm,Jm = { adapter: (("undefined" != typeof XMLHttpRequest || void 0 !== jm && "[object process]" === Object.prototype.toString.call(jm)) && (Xm = Ym), Xm), transformRequest: [function (e, t) {return Bm(t, "Accept"), Bm(t, "Content-Type"), pm.isFormData(e) || pm.isArrayBuffer(e) || pm.isBuffer(e) || pm.isStream(e) || pm.isFile(e) || pm.isBlob(e) ? e : pm.isArrayBufferView(e) ? e.buffer : pm.isURLSearchParams(e) ? (Wm(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : pm.isObject(e) ? (Wm(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e;}], transformResponse: [function (e) {if ("string" == typeof e) try {e = JSON.parse(e);} catch (t) {}return e;}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, validateStatus: function validateStatus(e) {return e >= 200 && e < 300;} };Jm.headers = { common: { Accept: "application/json, text/plain, */*" } }, pm.forEach(["delete", "get", "head"], function (e) {Jm.headers[e] = {};}), pm.forEach(["post", "put", "patch"], function (e) {Jm.headers[e] = pm.merge(zm);});var Qm = Jm;function Zm(e) {e.cancelToken && e.cancelToken.throwIfRequested();}var ev = function ev(e) {return Zm(e), e.headers = e.headers || {}, e.data = mm(e.data, e.headers, e.transformRequest), e.headers = pm.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers), pm.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (t) {delete e.headers[t];}), (e.adapter || Qm.adapter)(e).then(function (t) {return Zm(e), t.data = mm(t.data, t.headers, e.transformResponse), t;}, function (t) {return vm(t) || (Zm(e), t && t.response && (t.response.data = mm(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t);});},tv = function tv(e, t) {t = t || {};var n = {},r = ["url", "method", "params", "data"],o = ["headers", "auth", "proxy"],i = ["baseURL", "url", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "maxContentLength", "validateStatus", "maxRedirects", "httpAgent", "httpsAgent", "cancelToken", "socketPath"];pm.forEach(r, function (e) {void 0 !== t[e] && (n[e] = t[e]);}), pm.forEach(o, function (r) {pm.isObject(t[r]) ? n[r] = pm.deepMerge(e[r], t[r]) : void 0 !== t[r] ? n[r] = t[r] : pm.isObject(e[r]) ? n[r] = pm.deepMerge(e[r]) : void 0 !== e[r] && (n[r] = e[r]);}), pm.forEach(i, function (r) {void 0 !== t[r] ? n[r] = t[r] : void 0 !== e[r] && (n[r] = e[r]);});var a = r.concat(o).concat(i),s = Object.keys(t).filter(function (e) {return -1 === a.indexOf(e);});return pm.forEach(s, function (r) {void 0 !== t[r] ? n[r] = t[r] : void 0 !== e[r] && (n[r] = e[r]);}), n;};function nv(e) {this.defaults = e, this.interceptors = { request: new gm(), response: new gm() };}nv.prototype.request = function (e) {"string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {}, (e = tv(this.defaults, e)).method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get";var t = [ev, void 0],n = Promise.resolve(e);for (this.interceptors.request.forEach(function (e) {t.unshift(e.fulfilled, e.rejected);}), this.interceptors.response.forEach(function (e) {t.push(e.fulfilled, e.rejected);}); t.length;) {n = n.then(t.shift(), t.shift());}return n;}, nv.prototype.getUri = function (e) {return e = tv(this.defaults, e), hm(e.url, e.params, e.paramsSerializer).replace(/^\?/, "");}, pm.forEach(["delete", "get", "head", "options"], function (e) {nv.prototype[e] = function (t, n) {return this.request(pm.merge(n || {}, { method: e, url: t }));};}), pm.forEach(["post", "put", "patch"], function (e) {nv.prototype[e] = function (t, n, r) {return this.request(pm.merge(r || {}, { method: e, url: t, data: n }));};});var rv = nv;function ov(e) {this.message = e;}ov.prototype.toString = function () {return "Cancel" + (this.message ? ": " + this.message : "");}, ov.prototype.__CANCEL__ = !0;var iv = ov;function av(e) {if ("function" != typeof e) throw new TypeError("executor must be a function.");var t;this.promise = new Promise(function (e) {t = e;});var n = this;e(function (e) {n.reason || (n.reason = new iv(e), t(n.reason));});}av.prototype.throwIfRequested = function () {if (this.reason) throw this.reason;}, av.source = function () {var e;return { token: new av(function (t) {e = t;}), cancel: e };};var sv = av;function uv(e) {var t = new rv(e),n = om(rv.prototype.request, t);return pm.extend(n, rv.prototype, t), pm.extend(n, t), n;}var cv = uv(Qm);cv.Axios = rv, cv.create = function (e) {return uv(tv(cv.defaults, e));}, cv.Cancel = iv, cv.CancelToken = sv, cv.isCancel = vm, cv.all = function (e) {return Promise.all(e);}, cv.spread = function (e) {return function (t) {return e.apply(null, t);};};var lv = cv,pv = cv;lv.default = pv;var fv = lv,hv = fv.create({ timeout: 3e4, headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" } });hv.interceptors.response.use(function (e) {var t = e.data,n = t.error_code,r = t.ErrorCode;return ps(n) && (r = n), r !== zs.SUCCESS && (e.data.ErrorCode = Number(r)), e;}, function (e) {return "Network Error" === e.message && (!0 === hv.defaults.withCredentials && cs.warn("Network Error, try to close `IMAxios.defaults.withCredentials` to false. (IMAxios.js)"), hv.defaults.withCredentials = !1), Promise.reject(e);});var dv = function () {function e() {kn(this, e);}return An(e, [{ key: "request", value: function value(e) {console.warn("请注意： ConnectionBase.request() 方法必须被派生类重写:"), console.log("参数如下：\n    * @param {String} options.url string 是 开发者服务器接口地址\n    * @param {*} options.data - string/object/ArrayBuffer 否 请求的参数\n    * @param {Object} options.header - Object 否 设置请求的 header，\n    * @param {String} options.method - string GET 否 HTTP 请求方法\n    * @param {String} options.dataType - string json 否 返回的数据格式\n    * @param {String} options.responseType - string text 否 响应的数据类型\n    * @param {Boolean} isRetry - string text false 是否为重试的请求\n   ");} }, { key: "_checkOptions", value: function value(e) {if (!1 == !!e.url) throw new Gl({ code: Np, message: Hf });} }, { key: "_initOptions", value: function value(e) {e.method = ["POST", "GET", "PUT", "DELETE", "OPTION"].indexOf(e.method) >= 0 ? e.method : "POST", e.dataType = e.dataType || "json", e.responseType = e.responseType || "json";} }]), e;}(),gv = function (e) {Ln(n, e);var t = jn(n);function n() {var e;return kn(this, n), (e = t.call(this)).retry = 2, e;}return An(n, [{ key: "request", value: function value(e) {return this._checkOptions(e), this._initOptions(e), this._requestWithRetry({ url: e.url, data: e.data, method: e.method });} }, { key: "_requestWithRetry", value: function value(e) {var t = this,n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;return hv(e).catch(function (r) {return t.retry && n < t.retry ? t._requestWithRetry(e, ++n) : pg(new Gl({ code: r.code || "", message: r.message || "" }));});} }]), n;}(dv),mv = [],vv = [],yv = "undefined" != typeof Uint8Array ? Uint8Array : Array,_v = !1;function Iv() {_v = !0;for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", t = 0, n = e.length; t < n; ++t) {mv[t] = e[t], vv[e.charCodeAt(t)] = t;}vv["-".charCodeAt(0)] = 62, vv["_".charCodeAt(0)] = 63;}function Cv(e, t, n) {for (var r, o, i = [], a = t; a < n; a += 3) {r = (e[a] << 16) + (e[a + 1] << 8) + e[a + 2], i.push(mv[(o = r) >> 18 & 63] + mv[o >> 12 & 63] + mv[o >> 6 & 63] + mv[63 & o]);}return i.join("");}function Mv(e) {var t;_v || Iv();for (var n = e.length, r = n % 3, o = "", i = [], a = 0, s = n - r; a < s; a += 16383) {i.push(Cv(e, a, a + 16383 > s ? s : a + 16383));}return 1 === r ? (t = e[n - 1], o += mv[t >> 2], o += mv[t << 4 & 63], o += "==") : 2 === r && (t = (e[n - 2] << 8) + e[n - 1], o += mv[t >> 10], o += mv[t >> 4 & 63], o += mv[t << 2 & 63], o += "="), i.push(o), i.join("");}function Sv(e, t, n, r, o) {var i,a,s = 8 * o - r - 1,u = (1 << s) - 1,c = u >> 1,l = -7,p = n ? o - 1 : 0,f = n ? -1 : 1,h = e[t + p];for (p += f, i = h & (1 << -l) - 1, h >>= -l, l += s; l > 0; i = 256 * i + e[t + p], p += f, l -= 8) {;}for (a = i & (1 << -l) - 1, i >>= -l, l += r; l > 0; a = 256 * a + e[t + p], p += f, l -= 8) {;}if (0 === i) i = 1 - c;else {if (i === u) return a ? NaN : Infinity * (h ? -1 : 1);a += Math.pow(2, r), i -= c;}return (h ? -1 : 1) * a * Math.pow(2, i - r);}function Ev(e, t, n, r, o, i) {var a,s,u,c = 8 * i - o - 1,l = (1 << c) - 1,p = l >> 1,f = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,h = r ? 0 : i - 1,d = r ? 1 : -1,g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;for (t = Math.abs(t), isNaN(t) || Infinity === t ? (s = isNaN(t) ? 1 : 0, a = l) : (a = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -a)) < 1 && (a--, u *= 2), (t += a + p >= 1 ? f / u : f * Math.pow(2, 1 - p)) * u >= 2 && (a++, u /= 2), a + p >= l ? (s = 0, a = l) : a + p >= 1 ? (s = (t * u - 1) * Math.pow(2, o), a += p) : (s = t * Math.pow(2, p - 1) * Math.pow(2, o), a = 0)); o >= 8; e[n + h] = 255 & s, h += d, s /= 256, o -= 8) {;}for (a = a << o | s, c += o; c > 0; e[n + h] = 255 & a, h += d, a /= 256, c -= 8) {;}e[n + h - d] |= 128 * g;}var Tv = {}.toString,Dv = Array.isArray || function (e) {return "[object Array]" == Tv.call(e);};function kv() {return Av.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;}function wv(e, t) {if (kv() < t) throw new RangeError("Invalid typed array length");return Av.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = Av.prototype : (null === e && (e = new Av(t)), e.length = t), e;}function Av(e, t, n) {if (!(Av.TYPED_ARRAY_SUPPORT || this instanceof Av)) return new Av(e, t, n);if ("number" == typeof e) {if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");return Ov(this, e);}return Rv(this, e, t, n);}function Rv(e, t, n, r) {if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function (e, t, n, r) {if (t.byteLength, n < 0 || t.byteLength < n) throw new RangeError("'offset' is out of bounds");if (t.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");t = void 0 === n && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, n) : new Uint8Array(t, n, r);Av.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = Av.prototype : e = Lv(e, t);return e;}(e, t, n, r) : "string" == typeof t ? function (e, t, n) {"string" == typeof n && "" !== n || (n = "utf8");if (!Av.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');var r = 0 | Gv(t, n),o = (e = wv(e, r)).write(t, n);o !== r && (e = e.slice(0, o));return e;}(e, t, n) : function (e, t) {if (Pv(t)) {var n = 0 | Nv(t.length);return 0 === (e = wv(e, n)).length || t.copy(e, 0, 0, n), e;}if (t) {if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || (r = t.length) != r ? wv(e, 0) : Lv(e, t);if ("Buffer" === t.type && Dv(t.data)) return Lv(e, t.data);}var r;throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");}(e, t);}function bv(e) {if ("number" != typeof e) throw new TypeError('"size" argument must be a number');if (e < 0) throw new RangeError('"size" argument must not be negative');}function Ov(e, t) {if (bv(t), e = wv(e, t < 0 ? 0 : 0 | Nv(t)), !Av.TYPED_ARRAY_SUPPORT) for (var n = 0; n < t; ++n) {e[n] = 0;}return e;}function Lv(e, t) {var n = t.length < 0 ? 0 : 0 | Nv(t.length);e = wv(e, n);for (var r = 0; r < n; r += 1) {e[r] = 255 & t[r];}return e;}function Nv(e) {if (e >= kv()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kv().toString(16) + " bytes");return 0 | e;}function Pv(e) {return !(null == e || !e._isBuffer);}function Gv(e, t) {if (Pv(e)) return e.length;if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;"string" != typeof e && (e = "" + e);var n = e.length;if (0 === n) return 0;for (var r = !1;;) {switch (t) {case "ascii":case "latin1":case "binary":return n;case "utf8":case "utf-8":case void 0:return uy(e).length;case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return 2 * n;case "hex":return n >>> 1;case "base64":return cy(e).length;default:if (r) return uy(e).length;t = ("" + t).toLowerCase(), r = !0;}}}function xv(e, t, n) {var r = !1;if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";if ((n >>>= 0) <= (t >>>= 0)) return "";for (e || (e = "utf8");;) {switch (e) {case "hex":return Jv(this, t, n);case "utf8":case "utf-8":return zv(this, t, n);case "ascii":return Wv(this, t, n);case "latin1":case "binary":return Xv(this, t, n);case "base64":return Yv(this, t, n);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return Qv(this, t, n);default:if (r) throw new TypeError("Unknown encoding: " + e);e = (e + "").toLowerCase(), r = !0;}}}function Uv(e, t, n) {var r = e[t];e[t] = e[n], e[n] = r;}function qv(e, t, n, r, o) {if (0 === e.length) return -1;if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = o ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {if (o) return -1;n = e.length - 1;} else if (n < 0) {if (!o) return -1;n = 0;}if ("string" == typeof t && (t = Av.from(t, r)), Pv(t)) return 0 === t.length ? -1 : Fv(e, t, n, r, o);if ("number" == typeof t) return t &= 255, Av.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : Fv(e, [t], n, r, o);throw new TypeError("val must be string, number or Buffer");}function Fv(e, t, n, r, o) {var i,a = 1,s = e.length,u = t.length;if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {if (e.length < 2 || t.length < 2) return -1;a = 2, s /= 2, u /= 2, n /= 2;}function c(e, t) {return 1 === a ? e[t] : e.readUInt16BE(t * a);}if (o) {var l = -1;for (i = n; i < s; i++) {if (c(e, i) === c(t, -1 === l ? 0 : i - l)) {if (-1 === l && (l = i), i - l + 1 === u) return l * a;} else -1 !== l && (i -= i - l), l = -1;}} else for (n + u > s && (n = s - u), i = n; i >= 0; i--) {for (var p = !0, f = 0; f < u; f++) {if (c(e, i + f) !== c(t, f)) {p = !1;break;}}if (p) return i;}return -1;}function jv(e, t, n, r) {n = Number(n) || 0;var o = e.length - n;r ? (r = Number(r)) > o && (r = o) : r = o;var i = t.length;if (i % 2 != 0) throw new TypeError("Invalid hex string");r > i / 2 && (r = i / 2);for (var a = 0; a < r; ++a) {var s = parseInt(t.substr(2 * a, 2), 16);if (isNaN(s)) return a;e[n + a] = s;}return a;}function Bv(e, t, n, r) {return ly(uy(t, e.length - n), e, n, r);}function Hv(e, t, n, r) {return ly(function (e) {for (var t = [], n = 0; n < e.length; ++n) {t.push(255 & e.charCodeAt(n));}return t;}(t), e, n, r);}function Vv(e, t, n, r) {return Hv(e, t, n, r);}function Kv(e, t, n, r) {return ly(cy(t), e, n, r);}function $v(e, t, n, r) {return ly(function (e, t) {for (var n, r, o, i = [], a = 0; a < e.length && !((t -= 2) < 0); ++a) {n = e.charCodeAt(a), r = n >> 8, o = n % 256, i.push(o), i.push(r);}return i;}(t, e.length - n), e, n, r);}function Yv(e, t, n) {return 0 === t && n === e.length ? Mv(e) : Mv(e.slice(t, n));}function zv(e, t, n) {n = Math.min(e.length, n);for (var r = [], o = t; o < n;) {var i,a,s,u,c = e[o],l = null,p = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;if (o + p <= n) switch (p) {case 1:c < 128 && (l = c);break;case 2:128 == (192 & (i = e[o + 1])) && (u = (31 & c) << 6 | 63 & i) > 127 && (l = u);break;case 3:i = e[o + 1], a = e[o + 2], 128 == (192 & i) && 128 == (192 & a) && (u = (15 & c) << 12 | (63 & i) << 6 | 63 & a) > 2047 && (u < 55296 || u > 57343) && (l = u);break;case 4:i = e[o + 1], a = e[o + 2], s = e[o + 3], 128 == (192 & i) && 128 == (192 & a) && 128 == (192 & s) && (u = (15 & c) << 18 | (63 & i) << 12 | (63 & a) << 6 | 63 & s) > 65535 && u < 1114112 && (l = u);}null === l ? (l = 65533, p = 1) : l > 65535 && (l -= 65536, r.push(l >>> 10 & 1023 | 55296), l = 56320 | 1023 & l), r.push(l), o += p;}return function (e) {var t = e.length;if (t <= 4096) return String.fromCharCode.apply(String, e);var n = "",r = 0;for (; r < t;) {n += String.fromCharCode.apply(String, e.slice(r, r += 4096));}return n;}(r);}Av.TYPED_ARRAY_SUPPORT = void 0 === ts.TYPED_ARRAY_SUPPORT || ts.TYPED_ARRAY_SUPPORT, Av.poolSize = 8192, Av._augment = function (e) {return e.__proto__ = Av.prototype, e;}, Av.from = function (e, t, n) {return Rv(null, e, t, n);}, Av.TYPED_ARRAY_SUPPORT && (Av.prototype.__proto__ = Uint8Array.prototype, Av.__proto__ = Uint8Array), Av.alloc = function (e, t, n) {return function (e, t, n, r) {return bv(t), t <= 0 ? wv(e, t) : void 0 !== n ? "string" == typeof r ? wv(e, t).fill(n, r) : wv(e, t).fill(n) : wv(e, t);}(null, e, t, n);}, Av.allocUnsafe = function (e) {return Ov(null, e);}, Av.allocUnsafeSlow = function (e) {return Ov(null, e);}, Av.isBuffer = function (e) {return null != e && (!!e._isBuffer || py(e) || function (e) {return "function" == typeof e.readFloatLE && "function" == typeof e.slice && py(e.slice(0, 0));}(e));}, Av.compare = function (e, t) {if (!Pv(e) || !Pv(t)) throw new TypeError("Arguments must be Buffers");if (e === t) return 0;for (var n = e.length, r = t.length, o = 0, i = Math.min(n, r); o < i; ++o) {if (e[o] !== t[o]) {n = e[o], r = t[o];break;}}return n < r ? -1 : r < n ? 1 : 0;}, Av.isEncoding = function (e) {switch (String(e).toLowerCase()) {case "hex":case "utf8":case "utf-8":case "ascii":case "latin1":case "binary":case "base64":case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return !0;default:return !1;}}, Av.concat = function (e, t) {if (!Dv(e)) throw new TypeError('"list" argument must be an Array of Buffers');if (0 === e.length) return Av.alloc(0);var n;if (void 0 === t) for (t = 0, n = 0; n < e.length; ++n) {t += e[n].length;}var r = Av.allocUnsafe(t),o = 0;for (n = 0; n < e.length; ++n) {var i = e[n];if (!Pv(i)) throw new TypeError('"list" argument must be an Array of Buffers');i.copy(r, o), o += i.length;}return r;}, Av.byteLength = Gv, Av.prototype._isBuffer = !0, Av.prototype.swap16 = function () {var e = this.length;if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");for (var t = 0; t < e; t += 2) {Uv(this, t, t + 1);}return this;}, Av.prototype.swap32 = function () {var e = this.length;if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");for (var t = 0; t < e; t += 4) {Uv(this, t, t + 3), Uv(this, t + 1, t + 2);}return this;}, Av.prototype.swap64 = function () {var e = this.length;if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");for (var t = 0; t < e; t += 8) {Uv(this, t, t + 7), Uv(this, t + 1, t + 6), Uv(this, t + 2, t + 5), Uv(this, t + 3, t + 4);}return this;}, Av.prototype.toString = function () {var e = 0 | this.length;return 0 === e ? "" : 0 === arguments.length ? zv(this, 0, e) : xv.apply(this, arguments);}, Av.prototype.equals = function (e) {if (!Pv(e)) throw new TypeError("Argument must be a Buffer");return this === e || 0 === Av.compare(this, e);}, Av.prototype.inspect = function () {var e = "";return this.length > 0 && (e = this.toString("hex", 0, 50).match(/.{2}/g).join(" "), this.length > 50 && (e += " ... ")), "<Buffer " + e + ">";}, Av.prototype.compare = function (e, t, n, r, o) {if (!Pv(e)) throw new TypeError("Argument must be a Buffer");if (void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === r && (r = 0), void 0 === o && (o = this.length), t < 0 || n > e.length || r < 0 || o > this.length) throw new RangeError("out of range index");if (r >= o && t >= n) return 0;if (r >= o) return -1;if (t >= n) return 1;if (this === e) return 0;for (var i = (o >>>= 0) - (r >>>= 0), a = (n >>>= 0) - (t >>>= 0), s = Math.min(i, a), u = this.slice(r, o), c = e.slice(t, n), l = 0; l < s; ++l) {if (u[l] !== c[l]) {i = u[l], a = c[l];break;}}return i < a ? -1 : a < i ? 1 : 0;}, Av.prototype.includes = function (e, t, n) {return -1 !== this.indexOf(e, t, n);}, Av.prototype.indexOf = function (e, t, n) {return qv(this, e, t, n, !0);}, Av.prototype.lastIndexOf = function (e, t, n) {return qv(this, e, t, n, !1);}, Av.prototype.write = function (e, t, n, r) {if (void 0 === t) r = "utf8", n = this.length, t = 0;else if (void 0 === n && "string" == typeof t) r = t, n = this.length, t = 0;else {if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0);}var o = this.length - t;if ((void 0 === n || n > o) && (n = o), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");r || (r = "utf8");for (var i = !1;;) {switch (r) {case "hex":return jv(this, e, t, n);case "utf8":case "utf-8":return Bv(this, e, t, n);case "ascii":return Hv(this, e, t, n);case "latin1":case "binary":return Vv(this, e, t, n);case "base64":return Kv(this, e, t, n);case "ucs2":case "ucs-2":case "utf16le":case "utf-16le":return $v(this, e, t, n);default:if (i) throw new TypeError("Unknown encoding: " + r);r = ("" + r).toLowerCase(), i = !0;}}}, Av.prototype.toJSON = function () {return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };};function Wv(e, t, n) {var r = "";n = Math.min(e.length, n);for (var o = t; o < n; ++o) {r += String.fromCharCode(127 & e[o]);}return r;}function Xv(e, t, n) {var r = "";n = Math.min(e.length, n);for (var o = t; o < n; ++o) {r += String.fromCharCode(e[o]);}return r;}function Jv(e, t, n) {var r = e.length;(!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);for (var o = "", i = t; i < n; ++i) {o += sy(e[i]);}return o;}function Qv(e, t, n) {for (var r = e.slice(t, n), o = "", i = 0; i < r.length; i += 2) {o += String.fromCharCode(r[i] + 256 * r[i + 1]);}return o;}function Zv(e, t, n) {if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");if (e + t > n) throw new RangeError("Trying to access beyond buffer length");}function ey(e, t, n, r, o, i) {if (!Pv(e)) throw new TypeError('"buffer" argument must be a Buffer instance');if (t > o || t < i) throw new RangeError('"value" argument is out of bounds');if (n + r > e.length) throw new RangeError("Index out of range");}function ty(e, t, n, r) {t < 0 && (t = 65535 + t + 1);for (var o = 0, i = Math.min(e.length - n, 2); o < i; ++o) {e[n + o] = (t & 255 << 8 * (r ? o : 1 - o)) >>> 8 * (r ? o : 1 - o);}}function ny(e, t, n, r) {t < 0 && (t = 4294967295 + t + 1);for (var o = 0, i = Math.min(e.length - n, 4); o < i; ++o) {e[n + o] = t >>> 8 * (r ? o : 3 - o) & 255;}}function ry(e, t, n, r, o, i) {if (n + r > e.length) throw new RangeError("Index out of range");if (n < 0) throw new RangeError("Index out of range");}function oy(e, t, n, r, o) {return o || ry(e, 0, n, 4), Ev(e, t, n, r, 23, 4), n + 4;}function iy(e, t, n, r, o) {return o || ry(e, 0, n, 8), Ev(e, t, n, r, 52, 8), n + 8;}Av.prototype.slice = function (e, t) {var n,r = this.length;if ((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e), Av.TYPED_ARRAY_SUPPORT) (n = this.subarray(e, t)).__proto__ = Av.prototype;else {var o = t - e;n = new Av(o, void 0);for (var i = 0; i < o; ++i) {n[i] = this[i + e];}}return n;}, Av.prototype.readUIntLE = function (e, t, n) {e |= 0, t |= 0, n || Zv(e, t, this.length);for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256);) {r += this[e + i] * o;}return r;}, Av.prototype.readUIntBE = function (e, t, n) {e |= 0, t |= 0, n || Zv(e, t, this.length);for (var r = this[e + --t], o = 1; t > 0 && (o *= 256);) {r += this[e + --t] * o;}return r;}, Av.prototype.readUInt8 = function (e, t) {return t || Zv(e, 1, this.length), this[e];}, Av.prototype.readUInt16LE = function (e, t) {return t || Zv(e, 2, this.length), this[e] | this[e + 1] << 8;}, Av.prototype.readUInt16BE = function (e, t) {return t || Zv(e, 2, this.length), this[e] << 8 | this[e + 1];}, Av.prototype.readUInt32LE = function (e, t) {return t || Zv(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];}, Av.prototype.readUInt32BE = function (e, t) {return t || Zv(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);}, Av.prototype.readIntLE = function (e, t, n) {e |= 0, t |= 0, n || Zv(e, t, this.length);for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256);) {r += this[e + i] * o;}return r >= (o *= 128) && (r -= Math.pow(2, 8 * t)), r;}, Av.prototype.readIntBE = function (e, t, n) {e |= 0, t |= 0, n || Zv(e, t, this.length);for (var r = t, o = 1, i = this[e + --r]; r > 0 && (o *= 256);) {i += this[e + --r] * o;}return i >= (o *= 128) && (i -= Math.pow(2, 8 * t)), i;}, Av.prototype.readInt8 = function (e, t) {return t || Zv(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];}, Av.prototype.readInt16LE = function (e, t) {t || Zv(e, 2, this.length);var n = this[e] | this[e + 1] << 8;return 32768 & n ? 4294901760 | n : n;}, Av.prototype.readInt16BE = function (e, t) {t || Zv(e, 2, this.length);var n = this[e + 1] | this[e] << 8;return 32768 & n ? 4294901760 | n : n;}, Av.prototype.readInt32LE = function (e, t) {return t || Zv(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;}, Av.prototype.readInt32BE = function (e, t) {return t || Zv(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];}, Av.prototype.readFloatLE = function (e, t) {return t || Zv(e, 4, this.length), Sv(this, e, !0, 23, 4);}, Av.prototype.readFloatBE = function (e, t) {return t || Zv(e, 4, this.length), Sv(this, e, !1, 23, 4);}, Av.prototype.readDoubleLE = function (e, t) {return t || Zv(e, 8, this.length), Sv(this, e, !0, 52, 8);}, Av.prototype.readDoubleBE = function (e, t) {return t || Zv(e, 8, this.length), Sv(this, e, !1, 52, 8);}, Av.prototype.writeUIntLE = function (e, t, n, r) {(e = +e, t |= 0, n |= 0, r) || ey(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);var o = 1,i = 0;for (this[t] = 255 & e; ++i < n && (o *= 256);) {this[t + i] = e / o & 255;}return t + n;}, Av.prototype.writeUIntBE = function (e, t, n, r) {(e = +e, t |= 0, n |= 0, r) || ey(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);var o = n - 1,i = 1;for (this[t + o] = 255 & e; --o >= 0 && (i *= 256);) {this[t + o] = e / i & 255;}return t + n;}, Av.prototype.writeUInt8 = function (e, t, n) {return e = +e, t |= 0, n || ey(this, e, t, 1, 255, 0), Av.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1;}, Av.prototype.writeUInt16LE = function (e, t, n) {return e = +e, t |= 0, n || ey(this, e, t, 2, 65535, 0), Av.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : ty(this, e, t, !0), t + 2;}, Av.prototype.writeUInt16BE = function (e, t, n) {return e = +e, t |= 0, n || ey(this, e, t, 2, 65535, 0), Av.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : ty(this, e, t, !1), t + 2;}, Av.prototype.writeUInt32LE = function (e, t, n) {return e = +e, t |= 0, n || ey(this, e, t, 4, 4294967295, 0), Av.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : ny(this, e, t, !0), t + 4;}, Av.prototype.writeUInt32BE = function (e, t, n) {return e = +e, t |= 0, n || ey(this, e, t, 4, 4294967295, 0), Av.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : ny(this, e, t, !1), t + 4;}, Av.prototype.writeIntLE = function (e, t, n, r) {if (e = +e, t |= 0, !r) {var o = Math.pow(2, 8 * n - 1);ey(this, e, t, n, o - 1, -o);}var i = 0,a = 1,s = 0;for (this[t] = 255 & e; ++i < n && (a *= 256);) {e < 0 && 0 === s && 0 !== this[t + i - 1] && (s = 1), this[t + i] = (e / a >> 0) - s & 255;}return t + n;}, Av.prototype.writeIntBE = function (e, t, n, r) {if (e = +e, t |= 0, !r) {var o = Math.pow(2, 8 * n - 1);ey(this, e, t, n, o - 1, -o);}var i = n - 1,a = 1,s = 0;for (this[t + i] = 255 & e; --i >= 0 && (a *= 256);) {e < 0 && 0 === s && 0 !== this[t + i + 1] && (s = 1), this[t + i] = (e / a >> 0) - s & 255;}return t + n;}, Av.prototype.writeInt8 = function (e, t, n) {return e = +e, t |= 0, n || ey(this, e, t, 1, 127, -128), Av.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1;}, Av.prototype.writeInt16LE = function (e, t, n) {return e = +e, t |= 0, n || ey(this, e, t, 2, 32767, -32768), Av.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : ty(this, e, t, !0), t + 2;}, Av.prototype.writeInt16BE = function (e, t, n) {return e = +e, t |= 0, n || ey(this, e, t, 2, 32767, -32768), Av.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : ty(this, e, t, !1), t + 2;}, Av.prototype.writeInt32LE = function (e, t, n) {return e = +e, t |= 0, n || ey(this, e, t, 4, 2147483647, -2147483648), Av.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : ny(this, e, t, !0), t + 4;}, Av.prototype.writeInt32BE = function (e, t, n) {return e = +e, t |= 0, n || ey(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), Av.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : ny(this, e, t, !1), t + 4;}, Av.prototype.writeFloatLE = function (e, t, n) {return oy(this, e, t, !0, n);}, Av.prototype.writeFloatBE = function (e, t, n) {return oy(this, e, t, !1, n);}, Av.prototype.writeDoubleLE = function (e, t, n) {return iy(this, e, t, !0, n);}, Av.prototype.writeDoubleBE = function (e, t, n) {return iy(this, e, t, !1, n);}, Av.prototype.copy = function (e, t, n, r) {if (n || (n = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 && r < n && (r = n), r === n) return 0;if (0 === e.length || 0 === this.length) return 0;if (t < 0) throw new RangeError("targetStart out of bounds");if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");if (r < 0) throw new RangeError("sourceEnd out of bounds");r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);var o,i = r - n;if (this === e && n < t && t < r) for (o = i - 1; o >= 0; --o) {e[o + t] = this[o + n];} else if (i < 1e3 || !Av.TYPED_ARRAY_SUPPORT) for (o = 0; o < i; ++o) {e[o + t] = this[o + n];} else Uint8Array.prototype.set.call(e, this.subarray(n, n + i), t);return i;}, Av.prototype.fill = function (e, t, n, r) {if ("string" == typeof e) {if ("string" == typeof t ? (r = t, t = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === e.length) {var o = e.charCodeAt(0);o < 256 && (e = o);}if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");if ("string" == typeof r && !Av.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);} else "number" == typeof e && (e &= 255);if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");if (n <= t) return this;var i;if (t >>>= 0, n = void 0 === n ? this.length : n >>> 0, e || (e = 0), "number" == typeof e) for (i = t; i < n; ++i) {this[i] = e;} else {var a = Pv(e) ? e : uy(new Av(e, r).toString()),s = a.length;for (i = 0; i < n - t; ++i) {this[i + t] = a[i % s];}}return this;};var ay = /[^+\/0-9A-Za-z-_]/g;function sy(e) {return e < 16 ? "0" + e.toString(16) : e.toString(16);}function uy(e, t) {var n;t = t || Infinity;for (var r = e.length, o = null, i = [], a = 0; a < r; ++a) {if ((n = e.charCodeAt(a)) > 55295 && n < 57344) {if (!o) {if (n > 56319) {(t -= 3) > -1 && i.push(239, 191, 189);continue;}if (a + 1 === r) {(t -= 3) > -1 && i.push(239, 191, 189);continue;}o = n;continue;}if (n < 56320) {(t -= 3) > -1 && i.push(239, 191, 189), o = n;continue;}n = 65536 + (o - 55296 << 10 | n - 56320);} else o && (t -= 3) > -1 && i.push(239, 191, 189);if (o = null, n < 128) {if ((t -= 1) < 0) break;i.push(n);} else if (n < 2048) {if ((t -= 2) < 0) break;i.push(n >> 6 | 192, 63 & n | 128);} else if (n < 65536) {if ((t -= 3) < 0) break;i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);} else {if (!(n < 1114112)) throw new Error("Invalid code point");if ((t -= 4) < 0) break;i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128);}}return i;}function cy(e) {return function (e) {var t, n, r, o, i, a;_v || Iv();var s = e.length;if (s % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");i = "=" === e[s - 2] ? 2 : "=" === e[s - 1] ? 1 : 0, a = new yv(3 * s / 4 - i), r = i > 0 ? s - 4 : s;var u = 0;for (t = 0, n = 0; t < r; t += 4, n += 3) {o = vv[e.charCodeAt(t)] << 18 | vv[e.charCodeAt(t + 1)] << 12 | vv[e.charCodeAt(t + 2)] << 6 | vv[e.charCodeAt(t + 3)], a[u++] = o >> 16 & 255, a[u++] = o >> 8 & 255, a[u++] = 255 & o;}return 2 === i ? (o = vv[e.charCodeAt(t)] << 2 | vv[e.charCodeAt(t + 1)] >> 4, a[u++] = 255 & o) : 1 === i && (o = vv[e.charCodeAt(t)] << 10 | vv[e.charCodeAt(t + 1)] << 4 | vv[e.charCodeAt(t + 2)] >> 2, a[u++] = o >> 8 & 255, a[u++] = 255 & o), a;}(function (e) {if ((e = function (e) {return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");}(e).replace(ay, "")).length < 2) return "";for (; e.length % 4 != 0;) {e += "=";}return e;}(e));}function ly(e, t, n, r) {for (var o = 0; o < r && !(o + n >= t.length || o >= e.length); ++o) {t[o + n] = e[o];}return o;}function py(e) {return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);}var fy = function (e) {Ln(n, e);var t = jn(n);function n() {var e;return kn(this, n), (e = t.call(this)).retry = 2, e._request = e.promisify(wx.request), e;}return An(n, [{ key: "request", value: function value(e) {return this._checkOptions(e), this._initOptions(e), e = On({}, e, { responseType: "text" }), this._requestWithRetry(e);} }, { key: "_requestWithRetry", value: function value(e) {var t = this,n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;return this._request(e).then(this._handleResolve).catch(function (r) {if (fs(r.errMsg)) {if (r.errMsg.includes("abort")) return lg({});if (r.errMsg.includes("timeout")) return t.retry > 0 && n < t.retry ? t._requestWithRetry(e, ++n) : pg(new Gl({ code: Lp, message: r.errMsg }));if (r.errMsg.includes("fail")) return t.retry > 0 && n < t.retry ? t._requestWithRetry(e, ++n) : pg(new Gl({ code: Op, message: r.errMsg }));}return pg(new Gl(On({ code: jp, message: r.message }, r)));});} }, { key: "_handleResolve", value: function value(e) {var t = e.data,n = t.error_code,r = t.ErrorCode;return "number" == typeof n && (r = n), r !== zs.SUCCESS && (e.data.ErrorCode = Number("".concat(r))), e;} }, { key: "promisify", value: function value(e) {return function (t) {return new Promise(function (n, r) {var o = e(Object.assign({}, t, { success: n, fail: r }));t.updateAbort && t.updateAbort(function () {o && ys(o.abort) && o.abort();});});};} }]), n;}(dv),hy = function () {function e() {kn(this, e), this.request = 0, this.success = 0, this.fail = 0, this.reportRate = 10, this.requestTimeCost = [];}return An(e, [{ key: "report", value: function value() {if (1 !== this.request) {if (this.request % this.reportRate != 0) return null;var e = this.avgRequestTime(),t = "runLoop reports: success=".concat(this.success, ",fail=").concat(this.fail, ",total=").concat(this.request, ",avg=").concat(e, ",cur=").concat(this.requestTimeCost[this.requestTimeCost.length - 1], ",max=").concat(Math.max.apply(null, this.requestTimeCost), ",min=").concat(Math.min.apply(null, this.requestTimeCost));cs.log(t);}} }, { key: "setRequestTime", value: function value(e, t) {var n = Math.abs(t - e);100 === this.requestTimeCost.length && this.requestTimeCost.shift(), this.requestTimeCost.push(n);} }, { key: "avgRequestTime", value: function value() {for (var e, t = this.requestTimeCost.length, n = 0, r = 0; r < t; r++) {n += this.requestTimeCost[r];}return e = n / t, Math.round(100 * e) / 100;} }]), e;}(),dy = fv.create({ timeout: 6e3, headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" } });dy.interceptors.response.use(function (e) {var t = e.data,n = t.error_code,r = t.ErrorCode;return ps(n) && (r = n), r !== zs.SUCCESS && (e.data.ErrorCode = Number(r)), e;}, function (e) {return "Network Error" === e.message && (!0 === dy.defaults.withCredentials && cs.warn("Network Error, try to close `IMAxiosAVChatroom.defaults.withCredentials` to false. (IMAxiosAVChatroom.js)"), dy.defaults.withCredentials = !1), Promise.reject(e);});var gy = fv.CancelToken,my = function () {function e(t) {kn(this, e), this._initializeOptions(t), this._initializeMembers(), this.status = new hy();}return An(e, [{ key: "destructor", value: function value() {clearTimeout(this._seedID);var e = this._index();for (var t in this) {Object.prototype.hasOwnProperty.call(this, t) && (this[t] = null);}return e;} }, { key: "setIndex", value: function value(e) {this._index = e;} }, { key: "getIndex", value: function value() {return this._index;} }, { key: "isRunning", value: function value() {return !this._stoped;} }, { key: "_initializeOptions", value: function value(e) {this.options = e;} }, { key: "_initializeMembers", value: function value() {this._index = -1, this._seedID = 0, this._requestStatus = !1, this._stoped = !1, this._intervalTime = 0, this._intervalIncreaseStep = 1e3, this._intervalDecreaseStep = 1e3, this._intervalTimeMax = 5e3, this._protectTimeout = 3e3, this._getNoticeSeq = this.options.getNoticeSeq, this._retryCount = 0, this._responseTime = Date.now(), this._responseTimeThreshold = 2e3, this.options.isAVChatRoomLoop ? this.requestor = dy : this.requestor = hv, cs.log("XHRRunLoop._initializeMembers isAVChatRoomLoop=".concat(!!this.options.isAVChatRoomLoop)), this.abort = null;} }, { key: "start", value: function value() {0 === this._seedID ? (this._stoped = !1, this._send()) : cs.log('XHRRunLoop.start(), XHRRunLoop is running now, if you want to restart runLoop , please run "stop()" first.');} }, { key: "_reset", value: function value() {cs.log("XHRRunLoop._reset(), reset long poll _intervalTime", this._intervalTime), this.stop(), this.start();} }, { key: "_intervalTimeIncrease", value: function value() {this._intervalTime !== this._responseTimeThreshold && (this._intervalTime < this._responseTimeThreshold && (this._intervalTime += this._intervalIncreaseStep), this._intervalTime > this._responseTimeThreshold && (this._intervalTime = this._responseTimeThreshold));} }, { key: "_intervalTimeDecrease", value: function value() {0 !== this._intervalTime && (this._intervalTime > 0 && (this._intervalTime -= this._intervalDecreaseStep), this._intervalTime < 0 && (this._intervalTime = 0));} }, { key: "_intervalTimeAdjustment", value: function value() {var e = Date.now();100 * Math.floor((e - this._responseTime) / 100) <= this._responseTimeThreshold ? this._intervalTimeIncrease() : this._intervalTimeDecrease(), this._responseTime = e;} }, { key: "_intervalTimeAdjustmentBaseOnResponseData", value: function value(e) {e.ErrorCode === zs.SUCCESS ? this._intervalTimeDecrease() : this._intervalTimeIncrease();} }, { key: "_send", value: function value() {var e = this;if (!0 !== this._requestStatus) {this._requestStatus = !0, this.status.request++, "function" == typeof this.options.before && this.options.before(this.options.pack.requestData);var t = Date.now(),n = 0;this.requestor.request({ url: this.options.pack.getUrl(), data: this.options.pack.requestData, method: this.options.pack.method, cancelToken: new gy(function (t) {e.abort = t;}) }).then(function (r) {if (e._intervalTimeAdjustmentBaseOnResponseData.bind(e)(r.data), e._retryCount > 0 && (e._retryCount = 0), e.status.success++, n = Date.now(), e.status.setRequestTime(t, n), r.data.timecost = n - t, "function" == typeof e.options.success) try {e.options.success({ pack: e.options.pack, error: !1, data: e.options.pack.callback(r.data) });} catch (o) {cs.warn("XHRRunLoop._send(), error:", o);}e._requestStatus = !1, !1 === e._stoped && (e._seedID = setTimeout(e._send.bind(e), e._intervalTime)), e.status.report();}).catch(function (r) {if (e.status.fail++, e._retryCount++, e._intervalTimeAdjustment.bind(e)(), !1 === e._stoped && (e._seedID = setTimeout(e._send.bind(e), e._intervalTime)), e._requestStatus = !1, "function" == typeof e.options.fail && void 0 !== r.request) try {e.options.fail({ pack: e.options.pack, error: r, data: !1 });} catch (o) {cs.warn("XHRRunLoop._send(), fail callback error:"), cs.error(o);}n = Date.now(), e.status.setRequestTime(t, n), e.status.report();});}} }, { key: "stop", value: function value() {this._clearAllTimeOut(), this._stoped = !0;} }, { key: "_clearAllTimeOut", value: function value() {clearTimeout(this._seedID), this._seedID = 0;} }]), e;}(),vy = function () {function e(t) {kn(this, e), this._initializeOptions(t), this._initializeMembers(), this.status = new hy();}return An(e, [{ key: "destructor", value: function value() {clearTimeout(this._seedID);var e = this._index();for (var t in this) {Object.prototype.hasOwnProperty.call(this, t) && (this[t] = null);}return e;} }, { key: "setIndex", value: function value(e) {this._index = e;} }, { key: "isRunning", value: function value() {return !this._stoped;} }, { key: "getIndex", value: function value() {return this._index;} }, { key: "_initializeOptions", value: function value(e) {this.options = e;} }, { key: "_initializeMembers", value: function value() {this._index = -1, this._seedID = 0, this._requestStatus = !1, this._stoped = !1, this._intervalTime = 0, this._intervalIncreaseStep = 1e3, this._intervalDecreaseStep = 1e3, this._intervalTimeMax = 5e3, this._protectTimeout = 3e3, this._getNoticeSeq = this.options.getNoticeSeq, this._retryCount = 0, this._responseTime = Date.now(), this._responseTimeThreshold = 2e3, this.requestor = new fy(), this.abort = null;} }, { key: "start", value: function value() {0 === this._seedID ? (this._stoped = !1, this._send()) : cs.log('WXRunLoop.start(): WXRunLoop is running now, if you want to restart runLoop , please run "stop()" first.');} }, { key: "_reset", value: function value() {cs.log("WXRunLoop.reset(), long poll _intervalMaxRate", this._intervalMaxRate), this.stop(), this.start();} }, { key: "_intervalTimeIncrease", value: function value() {this._intervalTime !== this._responseTimeThreshold && (this._intervalTime < this._responseTimeThreshold && (this._intervalTime += this._intervalIncreaseStep), this._intervalTime > this._responseTimeThreshold && (this._intervalTime = this._responseTimeThreshold));} }, { key: "_intervalTimeDecrease", value: function value() {0 !== this._intervalTime && (this._intervalTime > 0 && (this._intervalTime -= this._intervalDecreaseStep), this._intervalTime < 0 && (this._intervalTime = 0));} }, { key: "_intervalTimeAdjustment", value: function value() {var e = Date.now();100 * Math.floor((e - this._responseTime) / 100) <= this._responseTimeThreshold ? this._intervalTimeIncrease() : this._intervalTimeDecrease(), this._responseTime = e;} }, { key: "_intervalTimeAdjustmentBaseOnResponseData", value: function value(e) {e.ErrorCode === zs.SUCCESS ? this._intervalTimeDecrease() : this._intervalTimeIncrease();} }, { key: "_send", value: function value() {var e = this;if (!0 !== this._requestStatus) {var t = this;this._requestStatus = !0, this.status.request++, "function" == typeof this.options.before && this.options.before(t.options.pack.requestData);var n = Date.now(),r = 0;this.requestor.request({ url: t.options.pack.getUrl(), data: t.options.pack.requestData, method: t.options.pack.method, updateAbort: function updateAbort(t) {e.abort = t;} }).then(function (o) {if (t._intervalTimeAdjustmentBaseOnResponseData.bind(e)(o.data), t._retryCount > 0 && (t._retryCount = 0), e.status.success++, r = Date.now(), e.status.setRequestTime(n, r), o.data.timecost = r - n, "function" == typeof t.options.success) try {e.options.success({ pack: e.options.pack, error: !1, data: e.options.pack.callback(o.data) });} catch (i) {cs.warn("WXRunLoop._send(), error:", i);}t._requestStatus = !1, !1 === t._stoped && (t._seedID = setTimeout(t._send.bind(t), t._intervalTime)), e.status.report();}).catch(function (o) {if (e.status.fail++, t._retryCount++, t._intervalTimeAdjustment.bind(e)(), !1 === t._stoped && (t._seedID = setTimeout(t._send.bind(t), t._intervalTime)), t._requestStatus = !1, "function" == typeof t.options.fail) try {e.options.fail({ pack: e.options.pack, error: o, data: !1 });} catch (i) {cs.warn("WXRunLoop._send(), fail callback error:"), cs.error(i);}r = Date.now(), e.status.setRequestTime(n, r), e.status.report();});}} }, { key: "stop", value: function value() {this._clearAllTimeOut(), this._stoped = !0;} }, { key: "_clearAllTimeOut", value: function value() {clearTimeout(this._seedID), this._seedID = 0;} }]), e;}(),yy = function () {function e(t) {kn(this, e), this.tim = t, this.httpConnection = ba ? new fy() : new gv(), this.keepAliveConnections = [];}return An(e, [{ key: "initializeListener", value: function value() {this.tim.innerEmitter.on(Nd, this._stopAllRunLoop, this);} }, { key: "request", value: function value(e) {var t = { url: e.url, data: e.requestData, method: e.method, callback: e.callback };return this.httpConnection.request(t).then(function (t) {return t.data = e.callback(t.data), t.data.errorCode !== zs.SUCCESS ? pg(new Gl({ code: t.data.errorCode, message: t.data.errorInfo })) : t;});} }, { key: "createRunLoop", value: function value(e) {var t = this.createKeepAliveConnection(e);return t.setIndex(this.keepAliveConnections.push(t) - 1), t;} }, { key: "stopRunLoop", value: function value(e) {e.stop();} }, { key: "_stopAllRunLoop", value: function value() {for (var e = this.keepAliveConnections.length, t = 0; t < e; t++) {this.keepAliveConnections[t].stop();}} }, { key: "destroyRunLoop", value: function value(e) {e.stop();var t = e.destructor();this.keepAliveConnections.slice(t, 1);} }, { key: "startRunLoopExclusive", value: function value(e) {for (var t = e.getIndex(), n = 0; n < this.keepAliveConnections.length; n++) {n !== t && this.keepAliveConnections[n].stop();}e.start();} }, { key: "createKeepAliveConnection", value: function value(e) {return ba ? new vy(e) : (this.tim.options.runLoopNetType === gl || this.tim.options.runLoopNetType, new my(e));} }, { key: "clearAll", value: function value() {this.conn.cancelAll();} }, { key: "reset", value: function value() {this.keepAliveConnections = [];} }]), e;}(),_y = function () {function e(t) {kn(this, e), this.tim = t, this.tim.innerEmitter.on(xd, this._onErrorDetected, this);}return An(e, [{ key: "_onErrorDetected", value: function value(e) {var t = e.data;t.code ? cs.warn("Oops! code:".concat(t.code, " message:").concat(t.message)) : cs.warn("Oops! message:".concat(t.message, " stack:").concat(t.stack)), this.tim.outerEmitter.emit(ln.ERROR, t);} }]), e;}(),Iy = function () {function e(t) {var n = this;kn(this, e), js(t) || (this.userID = t.userID || "", this.nick = t.nick || "", this.gender = t.gender || "", this.birthday = t.birthday || 0, this.location = t.location || "", this.selfSignature = t.selfSignature || "", this.allowType = t.allowType || pn.ALLOW_TYPE_ALLOW_ANY, this.language = t.language || 0, this.avatar = t.avatar || "", this.messageSettings = t.messageSettings || 0, this.adminForbidType = t.adminForbidType || pn.FORBID_TYPE_NONE, this.level = t.level || 0, this.role = t.role || 0, this.lastUpdatedTime = 0, this.profileCustomField = [], js(t.profileCustomField) || t.profileCustomField.forEach(function (e) {n.profileCustomField.push({ key: e.key, value: e.value });}));}return An(e, [{ key: "validate", value: function value(e) {var t = !0,n = "";if (js(e)) return { valid: !1, tips: "empty options" };if (e.profileCustomField) for (var r = e.profileCustomField.length, o = null, i = 0; i < r; i++) {if (o = e.profileCustomField[i], !fs(o.key) || -1 === o.key.indexOf("Tag_Profile_Custom")) return { valid: !1, tips: "自定义资料字段的前缀必须是 Tag_Profile_Custom" };if (!fs(o.value)) return { valid: !1, tips: "自定义资料字段的 value 必须是字符串" };}for (var a in e) {if (Object.prototype.hasOwnProperty.call(e, a)) {if ("profileCustomField" === a) continue;if (js(e[a]) && !fs(e[a]) && !ps(e[a])) {n = "key:" + a + ", invalid value:" + e[a], t = !1;continue;}switch (a) {case "nick":fs(e[a]) || (n = "nick should be a string", t = !1), ks(e[a]) > 500 && (n = "nick name limited: must less than or equal to ".concat(500, " bytes, current size: ").concat(ks(e[a]), " bytes"), t = !1);break;case "gender":bs(_l, e.gender) || (n = "key:gender, invalid value:" + e.gender, t = !1);break;case "birthday":ps(e.birthday) || (n = "birthday should be a number", t = !1);break;case "location":fs(e.location) || (n = "location should be a string", t = !1);break;case "selfSignature":fs(e.selfSignature) || (n = "selfSignature should be a string", t = !1);break;case "allowType":bs(Cl, e.allowType) || (n = "key:allowType, invalid value:" + e.allowType, t = !1);break;case "language":ps(e.language) || (n = "language should be a number", t = !1);break;case "avatar":fs(e.avatar) || (n = "avatar should be a string", t = !1);break;case "messageSettings":0 !== e.messageSettings && 1 !== e.messageSettings && (n = "messageSettings should be 0 or 1", t = !1);break;case "adminForbidType":bs(Il, e.adminForbidType) || (n = "key:adminForbidType, invalid value:" + e.adminForbidType, t = !1);break;case "level":ps(e.level) || (n = "level should be a number", t = !1);break;case "role":ps(e.role) || (n = "role should be a number", t = !1);break;default:n = "unknown key:" + a + "  " + e[a], t = !1;}}}return { valid: t, tips: n };} }]), e;}(),Cy = function () {function e(t) {kn(this, e), this.userController = t, this.TAG = "profile", this.Actions = { Q: "query", U: "update" }, this.accountProfileMap = new Map(), this.expirationTime = 864e5;}return An(e, [{ key: "setExpirationTime", value: function value(e) {this.expirationTime = e;} }, { key: "getUserProfile", value: function value(e) {var t = this,n = e.userIDList;e.fromAccount = this.userController.getMyAccount(), n.length > 100 && (cs.warn("ProfileHandler.getUserProfile 获取用户资料人数不能超过100人"), n.length = 100);for (var r, o = [], i = [], a = 0, s = n.length; a < s; a++) {r = n[a], this.userController.isMyFriend(r) && this._containsAccount(r) ? i.push(this._getProfileFromMap(r)) : o.push(r);}if (0 === o.length) return lg(i);e.toAccount = o;var u = e.bFromGetMyProfile || !1,c = [];e.toAccount.forEach(function (e) {c.push({ toAccount: e, standardSequence: 0, customSequence: 0 });}), e.userItem = c;var l = new Ig();l.setMethod(em).setStart();var p = this.userController.generateConfig(this.TAG, this.Actions.Q, e);return this.userController.request(p).then(function (e) {l.setCode(0).setNetworkType(t.userController.getNetworkType()).setText(e.data.userProfileItem.length).setEnd(), cs.info("ProfileHandler.getUserProfile ok");var n = t._handleResponse(e).concat(i);return u ? (t.userController.onGotMyProfile(), new sg(n[0])) : new sg(n);}).catch(function (e) {return t.userController.probeNetwork().then(function (t) {var n = Bn(t, 2),r = n[0],o = n[1];l.setError(e, r, o).setEnd();}), cs.error("ProfileHandler.getUserProfile error:", e), pg(e);});} }, { key: "getMyProfile", value: function value() {var e = this.userController.getMyAccount();if (cs.log("ProfileHandler.getMyProfile myAccount=" + e), this._fillMap(), this._containsAccount(e)) {var t = this._getProfileFromMap(e);return cs.debug("ProfileHandler.getMyProfile from cache, myProfile:" + JSON.stringify(t)), this.userController.onGotMyProfile(), lg(t);}return this.getUserProfile({ fromAccount: e, userIDList: [e], bFromGetMyProfile: !0 });} }, { key: "_handleResponse", value: function value(e) {for (var t, n, r = Ss.now(), o = e.data.userProfileItem, i = [], a = 0, s = o.length; a < s; a++) {"@TLS#NOT_FOUND" !== o[a].to && "" !== o[a].to && (t = o[a].to, n = this._updateMap(t, this._getLatestProfileFromResponse(t, o[a].profileItem)), i.push(n));}return cs.log("ProfileHandler._handleResponse cost " + (Ss.now() - r) + " ms"), i;} }, { key: "_getLatestProfileFromResponse", value: function value(e, t) {var n = {};if (n.userID = e, n.profileCustomField = [], !js(t)) for (var r = 0, o = t.length; r < o; r++) {if (t[r].tag.indexOf("Tag_Profile_Custom") > -1) n.profileCustomField.push({ key: t[r].tag, value: t[r].value });else switch (t[r].tag) {case yl.NICK:n.nick = t[r].value;break;case yl.GENDER:n.gender = t[r].value;break;case yl.BIRTHDAY:n.birthday = t[r].value;break;case yl.LOCATION:n.location = t[r].value;break;case yl.SELFSIGNATURE:n.selfSignature = t[r].value;break;case yl.ALLOWTYPE:n.allowType = t[r].value;break;case yl.LANGUAGE:n.language = t[r].value;break;case yl.AVATAR:n.avatar = t[r].value;break;case yl.MESSAGESETTINGS:n.messageSettings = t[r].value;break;case yl.ADMINFORBIDTYPE:n.adminForbidType = t[r].value;break;case yl.LEVEL:n.level = t[r].value;break;case yl.ROLE:n.role = t[r].value;break;default:cs.warn("ProfileHandler._handleResponse unkown tag->", t[r].tag, t[r].value);}}return n;} }, { key: "updateMyProfile", value: function value(e) {var t = this,n = new Iy().validate(e);if (!n.valid) return cs.error("ProfileHandler.updateMyProfile info:".concat(n.tips, "，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#updateMyProfile")), pg({ code: kp, message: Uf });var r = [];for (var o in e) {Object.prototype.hasOwnProperty.call(e, o) && ("profileCustomField" === o ? e.profileCustomField.forEach(function (e) {r.push({ tag: e.key, value: e.value });}) : r.push({ tag: yl[o.toUpperCase()], value: e[o] }));}if (0 === r.length) return cs.error("ProfileHandler.updateMyProfile info:".concat(qf, "，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#updateMyProfile")), pg({ code: wp, message: qf });var i = this.userController.generateConfig(this.TAG, this.Actions.U, { fromAccount: this.userController.getMyAccount(), profileItem: r });return this.userController.request(i).then(function (n) {cs.info("ProfileHandler.updateMyProfile ok");var r = t._updateMap(t.userController.getMyAccount(), e);return t.userController.emitOuterEvent(ln.PROFILE_UPDATED, [r]), lg(r);}).catch(function (e) {return cs.error("ProfileHandler.updateMyProfile error:", e), pg(e);});} }, { key: "onProfileModified", value: function value(e) {var t = e.data;if (!js(t)) {var n,r,o = t.length;cs.info("ProfileHandler.onProfileModified length=" + o);for (var i = [], a = 0; a < o; a++) {n = t[a].userID, r = this._updateMap(n, this._getLatestProfileFromResponse(n, t[a].profileList)), i.push(r);}this.userController.emitInnerEvent(jd, i), this.userController.emitOuterEvent(ln.PROFILE_UPDATED, i);}} }, { key: "_fillMap", value: function value() {if (0 === this.accountProfileMap.size) {for (var e = this._getCachedProfiles(), t = Date.now(), n = 0, r = e.length; n < r; n++) {t - e[n].lastUpdatedTime < this.expirationTime && this.accountProfileMap.set(e[n].userID, e[n]);}cs.log("ProfileHandler._fillMap from cache, map.size=" + this.accountProfileMap.size);}} }, { key: "_updateMap", value: function value(e, t) {var n,r = Date.now();return this._containsAccount(e) ? (n = this._getProfileFromMap(e), t.profileCustomField && Ps(n.profileCustomField, t.profileCustomField), Es(n, t, ["profileCustomField"]), n.lastUpdatedTime = r) : (n = new Iy(t), (this.userController.isMyFriend(e) || e === this.userController.getMyAccount()) && (n.lastUpdatedTime = r, this.accountProfileMap.set(e, n))), this._flushMap(e === this.userController.getMyAccount()), n;} }, { key: "_flushMap", value: function value(e) {var t = Hn(this.accountProfileMap.values()),n = this.userController.tim.storage;cs.debug("ProfileHandler._flushMap length=".concat(t.length, " flushAtOnce=").concat(e)), n.setItem(this.TAG, t, e);} }, { key: "_containsAccount", value: function value(e) {return this.accountProfileMap.has(e);} }, { key: "_getProfileFromMap", value: function value(e) {return this.accountProfileMap.get(e);} }, { key: "_getCachedProfiles", value: function value() {var e = this.userController.tim.storage.getItem(this.TAG);return js(e) ? [] : e;} }, { key: "onConversationsProfileUpdated", value: function value(e) {for (var t, n, r, o = [], i = 0, a = e.length; i < a; i++) {n = (t = e[i]).userID, this.userController.isMyFriend(n) && (this._containsAccount(n) ? (r = this._getProfileFromMap(n), Es(r, t) > 0 && o.push(n)) : o.push(t.userID));}0 !== o.length && (cs.info("ProfileHandler.onConversationsProfileUpdated toAccount:", o), this.getUserProfile({ userIDList: o }));} }, { key: "reset", value: function value() {this._flushMap(!0), this.accountProfileMap.clear();} }]), e;}();Ae({ target: "String", proto: !0 }, { repeat: kr });var My = function () {function e(t) {kn(this, e), this.options = t ? t.options : { enablePointer: !0 }, this.pointsList = {}, this.reportText = {}, this.maxNameLen = 0, this.gapChar = "-", this.log = console.log, this.currentTask = "";}return An(e, [{ key: "newTask", value: function value(e) {!1 !== this.options.enablePointer && (e || (e = ["task", this._timeFormat()].join("-")), this.pointsList[e] = [], this.currentTask = e, console.log("Pointer new Task : ".concat(this.currentTask)));} }, { key: "deleteTask", value: function value(e) {!1 !== this.options.enablePointer && (e || (e = this.currentTask), this.pointsList[e].length = 0, delete this.pointsList[e]);} }, { key: "dot", value: function value() {var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",t = arguments.length > 1 ? arguments[1] : void 0;if (!1 !== this.options.enablePointer) {t = t || this.currentTask;var n = +new Date();this.maxNameLen = this.maxNameLen < e.length ? e.length : this.maxNameLen, this.flen = this.maxNameLen + 10, this.pointsList[t].push({ pointerName: e, time: n });}} }, { key: "_analisys", value: function value(e) {if (!1 !== this.options.enablePointer) {e = e || this.currentTask;for (var t = this.pointsList[e], n = t.length, r = [], o = [], i = 0; i < n; i++) {0 !== i && (o = this._analisysTowPoints(t[i - 1], t[i]), r.push(o.join("")));}return o = this._analisysTowPoints(t[0], t[n - 1], !0), r.push(o.join("")), r.join("");}} }, { key: "_analisysTowPoints", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];if (!1 !== this.options.enablePointer) {var r = this.flen,o = t.time - e.time,i = o.toString(),a = e.pointerName + this.gapChar.repeat(r - e.pointerName.length),s = t.pointerName + this.gapChar.repeat(r - t.pointerName.length),u = this.gapChar.repeat(4 - i.length) + i,c = n ? ["%c", a, s, u, "ms\n%c"] : [a, s, u, "ms\n"];return c;}} }, { key: "report", value: function value(e) {if (!1 !== this.options.enablePointer) {e = e || this.currentTask;var t = this._analisys(e);this.pointsList = [];var n = this._timeFormat(),r = "Pointer[".concat(e, "(").concat(n, ")]"),o = 4 * this.maxNameLen,i = (o - r.length) / 2;console.log(["-".repeat(i), r, "-".repeat(i)].join("")), console.log("%c" + t, "color:#66a", "color:red", "color:#66a"), console.log("-".repeat(o));}} }, { key: "_timeFormat", value: function value() {var e = new Date(),t = this.zeroFix(e.getMonth() + 1, 2),n = this.zeroFix(e.getDate(), 2);return "".concat(t, "-").concat(n, " ").concat(e.getHours(), ":").concat(e.getSeconds(), ":").concat(e.getMinutes(), "~").concat(e.getMilliseconds());} }, { key: "zeroFix", value: function value(e, t) {return ("000000000" + e).slice(-t);} }, { key: "reportAll", value: function value() {if (!1 !== this.options.enablePointer) for (var e in this.pointsList) {Object.prototype.hasOwnProperty.call(this.pointsList, e) && this.eport(e);}} }]), e;}(),Sy = function e(t, n) {kn(this, e), this.userID = t;var r = {};if (r.userID = t, !js(n)) for (var o = 0, i = n.length; o < i; o++) {switch (n[o].tag) {case yl.NICK:r.nick = n[o].value;break;case yl.GENDER:r.gender = n[o].value;break;case yl.BIRTHDAY:r.birthday = n[o].value;break;case yl.LOCATION:r.location = n[o].value;break;case yl.SELFSIGNATURE:r.selfSignature = n[o].value;break;case yl.ALLOWTYPE:r.allowType = n[o].value;break;case yl.LANGUAGE:r.language = n[o].value;break;case yl.AVATAR:r.avatar = n[o].value;break;case yl.MESSAGESETTINGS:r.messageSettings = n[o].value;break;case yl.ADMINFORBIDTYPE:r.adminForbidType = n[o].value;break;case yl.LEVEL:r.level = n[o].value;break;case yl.ROLE:r.role = n[o].value;break;default:cs.debug("snsProfileItem unkown tag->", n[o].tag);}}this.profile = new Iy(r);},Ey = function () {function e(t) {kn(this, e), this.userController = t, this.TAG = "friend", this.Actions = { G: "get", D: "delete" }, this.friends = new Map(), this.pointer = new My();}return An(e, [{ key: "isMyFriend", value: function value(e) {var t = this.friends.has(e);return t || cs.debug("FriendHandler.isMyFriend " + e + " is not my friend"), t;} }, { key: "_transformFriendList", value: function value(e) {if (!js(e) && !js(e.infoItem)) {cs.info("FriendHandler._transformFriendList friendNum=" + e.friendNum);for (var t, n, r = e.infoItem, o = 0, i = r.length; o < i; o++) {n = r[o].infoAccount, t = new Sy(n, r[o].snsProfileItem), this.friends.set(n, t);}}} }, { key: "_friends2map", value: function value(e) {var t = new Map();for (var n in e) {Object.prototype.hasOwnProperty.call(e, n) && t.set(n, e[n]);}return t;} }, { key: "getFriendList", value: function value() {var e = this,t = {};t.fromAccount = this.userController.getMyAccount(), cs.info("FriendHandler.getFriendList myAccount=" + t.fromAccount);var n = this.userController.generateConfig(this.TAG, this.Actions.G, t);return this.userController.request(n).then(function (t) {cs.info("FriendHandler.getFriendList ok"), e._transformFriendList(t.data);var n = Hn(e.friends.values());return lg(n);}).catch(function (e) {return cs.error("FriendHandler.getFriendList error:", JSON.stringify(e)), pg(e);});} }, { key: "deleteFriend", value: function value(e) {if (!Array.isArray(e.toAccount)) return cs.error("FriendHandler.deleteFriend options.toAccount 必需是数组"), pg({ code: Dp, message: xf });e.toAccount.length > 1e3 && (cs.warn("FriendHandler.deleteFriend 删除好友人数不能超过1000人"), e.toAccount.length = 1e3);var t = this.userController.generateConfig(this.TAG, this.Actions.D, e);return this.userController.request(t).then(function (e) {return cs.info("FriendHandler.deleteFriend ok"), lg();}).catch(function (e) {return cs.error("FriendHandler.deleteFriend error:", e), pg(e);});} }]), e;}(),Ty = function e(t) {kn(this, e), js || (this.userID = t.userID || "", this.timeStamp = t.timeStamp || 0);},Dy = function () {function e(t) {kn(this, e), this.userController = t, this.TAG = "blacklist", this.Actions = { G: "get", C: "create", D: "delete" }, this.blacklistMap = new Map(), this.startIndex = 0, this.maxLimited = 100, this.curruentSequence = 0;}return An(e, [{ key: "getBlacklist", value: function value() {var e = this,t = {};t.fromAccount = this.userController.getMyAccount(), t.maxLimited = this.maxLimited, t.startIndex = 0, t.lastSequence = this.curruentSequence;var n = new Ig();n.setMethod(tm).setStart();var r = this.userController.generateConfig(this.TAG, this.Actions.G, t);return this.userController.request(r).then(function (t) {var r = js(t.data.blackListItem) ? 0 : t.data.blackListItem.length;return n.setCode(0).setNetworkType(e.userController.getNetworkType()).setText(r).setEnd(), cs.info("BlacklistHandler.getBlacklist ok"), e.curruentSequence = t.data.curruentSequence, e._handleResponse(t.data.blackListItem, !0), e._onBlacklistUpdated();}).catch(function (t) {return e.userController.probeNetwork().then(function (e) {var r = Bn(e, 2),o = r[0],i = r[1];n.setError(t, o, i).setEnd();}), cs.error("BlacklistHandler.getBlacklist error:", t), pg(t);});} }, { key: "addBlacklist", value: function value(e) {var t = this;if (!gs(e.userIDList)) return cs.error("BlacklistHandler.addBlacklist options.userIDList 必需是数组"), pg({ code: Ap, message: Ff });var n = this.userController.tim.loginInfo.identifier;if (1 === e.userIDList.length && e.userIDList[0] === n) return cs.error("BlacklistHandler.addBlacklist 不能把自己拉黑"), pg({ code: bp, message: Bf });e.userIDList.includes(n) && (e.userIDList = e.userIDList.filter(function (e) {return e !== n;}), cs.warn("BlacklistHandler.addBlacklist 不能把自己拉黑，已过滤")), e.fromAccount = this.userController.getMyAccount(), e.toAccount = e.userIDList;var r = this.userController.generateConfig(this.TAG, this.Actions.C, e);return this.userController.request(r).then(function (e) {return cs.info("BlacklistHandler.addBlacklist ok"), t._handleResponse(e.data.resultItem, !0), t._onBlacklistUpdated();}).catch(function (e) {return cs.error("BlacklistHandler.addBlacklist error:", e), pg(e);});} }, { key: "_handleResponse", value: function value(e, t) {if (!js(e)) for (var n, r, o, i = 0, a = e.length; i < a; i++) {r = e[i].to, o = e[i].resultCode, (ms(o) || 0 === o) && (t ? ((n = this.blacklistMap.has(r) ? this.blacklistMap.get(r) : new Ty()).userID = r, !js(e[i].addBlackTimeStamp) && (n.timeStamp = e[i].addBlackTimeStamp), this.blacklistMap.set(r, n)) : this.blacklistMap.has(r) && (n = this.blacklistMap.get(r), this.blacklistMap.delete(r)));}cs.log("BlacklistHandler._handleResponse total=" + this.blacklistMap.size + " bAdd=" + t);} }, { key: "deleteBlacklist", value: function value(e) {var t = this;if (!gs(e.userIDList)) return cs.error("BlacklistHandler.deleteBlacklist options.userIDList 必需是数组"), pg({ code: Rp, message: jf });e.fromAccount = this.userController.getMyAccount(), e.toAccount = e.userIDList;var n = this.userController.generateConfig(this.TAG, this.Actions.D, e);return this.userController.request(n).then(function (e) {return cs.info("BlacklistHandler.deleteBlacklist ok"), t._handleResponse(e.data.resultItem, !1), t._onBlacklistUpdated();}).catch(function (e) {return cs.error("BlacklistHandler.deleteBlacklist error:", e), pg(e);});} }, { key: "_onBlacklistUpdated", value: function value() {var e = Hn(this.blacklistMap.keys());return this.userController.emitOuterEvent(ln.BLACKLIST_UPDATED, e), lg(e);} }, { key: "handleBlackListDelAccount", value: function value(e) {for (var t, n = [], r = 0, o = e.length; r < o; r++) {t = e[r], this.blacklistMap.has(t) && (this.blacklistMap.delete(t), n.push(t));}n.length > 0 && (cs.log("BlacklistHandler.handleBlackListDelAccount delCount=" + n.length + " : " + n.join(",")), this.userController.emitOuterEvent(ln.BLACKLIST_UPDATED, Hn(this.blacklistMap.keys())));} }, { key: "handleBlackListAddAccount", value: function value(e) {for (var t, n = [], r = 0, o = e.length; r < o; r++) {t = e[r], this.blacklistMap.has(t) || (this.blacklistMap.set(t, new Ty({ userID: t })), n.push(t));}n.length > 0 && (cs.log("BlacklistHandler.handleBlackListAddAccount addCount=" + n.length + " : " + n.join(",")), this.userController.emitOuterEvent(ln.BLACKLIST_UPDATED, Hn(this.blacklistMap.keys())));} }, { key: "reset", value: function value() {this.blacklistMap.clear(), this.startIndex = 0, this.maxLimited = 100, this.curruentSequence = 0;} }]), e;}(),ky = function () {function e(t) {kn(this, e), this.userController = t, this.TAG = "applyC2C", this.Actions = { C: "create", G: "get", D: "delete", U: "update" };}return An(e, [{ key: "applyAddFriend", value: function value(e) {var t = this,n = this.userController.generateConfig(this.TAG, this.Actions.C, e),r = this.userController.request(n);return r.then(function (e) {t.userController.isActionSuccessful("applyAddFriend", t.Actions.C, e);}).catch(function (e) {}), r;} }, { key: "getPendency", value: function value(e) {var t = this,n = this.userController.generateConfig(this.TAG, this.Actions.G, e),r = this.userController.request(n);return r.then(function (e) {t.userController.isActionSuccessful("getPendency", t.Actions.G, e);}).catch(function (e) {}), r;} }, { key: "deletePendency", value: function value(e) {var t = this,n = this.userController.generateConfig(this.TAG, this.Actions.D, e),r = this.userController.request(n);return r.then(function (e) {t.userController.isActionSuccessful("deletePendency", t.Actions.D, e);}).catch(function (e) {}), r;} }, { key: "replyPendency", value: function value() {var e = this,t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},n = this.userController.generateConfig(this.TAG, this.Actions.U, t),r = this.userController.request(n);return r.then(function (t) {e.userController.isActionSuccessful("replyPendency", e.Actions.U, t);}).catch(function (e) {}), r;} }]), e;}(),wy = function (e) {Ln(n, e);var t = jn(n);function n(e) {var r;return kn(this, n), (r = t.call(this, e)).profileHandler = new Cy(qn(r)), r.friendHandler = new Ey(qn(r)), r.blacklistHandler = new Dy(qn(r)), r.applyC2CHandler = new ky(qn(r)), r._initializeListener(), r;}return An(n, [{ key: "_initializeListener", value: function value(e) {var t = this.tim.innerEmitter;t.on(rd, this.onContextUpdated, this), t.on(Dd, this.onProfileModified, this), t.on(Td, this.onNewFriendMessages, this), t.on(qd, this.onConversationsProfileUpdated, this);} }, { key: "onContextUpdated", value: function value(e) {var t = this.tim.context;!1 != !!t.a2Key && !1 != !!t.tinyID && (this.profileHandler.getMyProfile(), this.friendHandler.getFriendList(), this.blacklistHandler.getBlacklist());} }, { key: "onGotMyProfile", value: function value() {this.triggerReady();} }, { key: "onProfileModified", value: function value(e) {this.profileHandler.onProfileModified(e);} }, { key: "onNewFriendMessages", value: function value(e) {cs.debug("onNewFriendMessages", JSON.stringify(e.data)), js(e.data.blackListDelAccount) || this.blacklistHandler.handleBlackListDelAccount(e.data.blackListDelAccount), js(e.data.blackListAddAccount) || this.blacklistHandler.handleBlackListAddAccount(e.data.blackListAddAccount);} }, { key: "onConversationsProfileUpdated", value: function value(e) {this.profileHandler.onConversationsProfileUpdated(e.data);} }, { key: "getMyAccount", value: function value() {return this.tim.context.identifier;} }, { key: "isMyFriend", value: function value(e) {return this.friendHandler.isMyFriend(e);} }, { key: "generateConfig", value: function value(e, t, n) {return { name: e, action: t, param: n };} }, { key: "getMyProfile", value: function value() {return this.profileHandler.getMyProfile();} }, { key: "getUserProfile", value: function value(e) {return this.profileHandler.getUserProfile(e);} }, { key: "updateMyProfile", value: function value(e) {return this.profileHandler.updateMyProfile(e);} }, { key: "getFriendList", value: function value() {return this.friendHandler.getFriendList();} }, { key: "deleteFriend", value: function value(e) {return this.friendHandler.deleteFriend(e);} }, { key: "getBlacklist", value: function value() {return this.blacklistHandler.getBlacklist();} }, { key: "addBlacklist", value: function value(e) {return this.blacklistHandler.addBlacklist(e);} }, { key: "deleteBlacklist", value: function value(e) {return this.blacklistHandler.deleteBlacklist(e);} }, { key: "applyAddFriend", value: function value(e) {return this.applyC2CHandler.applyAddFriend(e);} }, { key: "getPendency", value: function value(e) {return this.applyC2CHandler.getPendency(e);} }, { key: "deletePendency", value: function value(e) {return this.applyC2CHandler.deletePendency(e);} }, { key: "replyPendency", value: function value(e) {return this.applyC2CHandler.replyPendency(e);} }, { key: "reset", value: function value() {cs.info("UserController.reset"), this.resetReady(), this.profileHandler.reset(), this.blacklistHandler.reset(), this.checkTimes = 0;} }]), n;}(og),Ay = [],Ry = Ay.sort,by = o(function () {Ay.sort(void 0);}),Oy = o(function () {Ay.sort(null);}),Ly = Ke("sort");Ae({ target: "Array", proto: !0, forced: by || !Oy || !Ly }, { sort: function sort(e) {return void 0 === e ? Ry.call(Oe(this)) : Ry.call(Oe(this), Re(e));} });var Ny = ["groupID", "name", "avatar", "type", "introduction", "notification", "ownerID", "selfInfo", "createTime", "infoSequence", "lastInfoTime", "lastMessage", "nextMessageSeq", "memberNum", "maxMemberNum", "memberList", "joinOption", "groupCustomField", "muteAllMembers"],Py = function () {function e(t) {kn(this, e), this.groupID = "", this.name = "", this.avatar = "", this.type = "", this.introduction = "", this.notification = "", this.ownerID = "", this.createTime = "", this.infoSequence = "", this.lastInfoTime = "", this.selfInfo = { messageRemindType: "", joinTime: "", nameCard: "", role: "" }, this.lastMessage = { lastTime: "", lastSequence: "", fromAccount: "", messageForShow: "" }, this.nextMessageSeq = "", this.memberNum = "", this.maxMemberNum = "", this.joinOption = "", this.groupCustomField = [], this.muteAllMembers = void 0, this._initGroup(t);}return An(e, [{ key: "_initGroup", value: function value(e) {for (var t in e) {Ny.indexOf(t) < 0 || ("selfInfo" !== t ? this[t] = e[t] : this.updateSelfInfo(e[t]));}} }, { key: "updateGroup", value: function value(e) {e.lastMsgTime && (this.lastMessage.lastTime = e.lastMsgTime), ms(e.muteAllMembers) || ("On" === e.muteAllMembers ? e.muteAllMembers = !0 : e.muteAllMembers = !1), e.groupCustomField && Ps(this.groupCustomField, e.groupCustomField), Es(this, e, ["members", "errorCode", "lastMsgTime", "groupCustomField"]);} }, { key: "updateSelfInfo", value: function value(e) {var t = e.nameCard,n = e.joinTime,r = e.role,o = e.messageRemindType;Es(this.selfInfo, { nameCard: t, joinTime: n, role: r, messageRemindType: o }, [], ["", null, void 0, 0, NaN]);} }, { key: "setSelfNameCard", value: function value(e) {this.selfInfo.nameCard = e;} }]), e;}(),Gy = function Gy(e, t) {if (ms(t)) return "";switch (e) {case pn.MSG_TEXT:return t.text;case pn.MSG_IMAGE:return "[图片]";case pn.MSG_GEO:return "[位置]";case pn.MSG_AUDIO:return "[语音]";case pn.MSG_VIDEO:return "[视频]";case pn.MSG_FILE:return "[文件]";case pn.MSG_CUSTOM:return "[自定义消息]";case pn.MSG_GRP_TIP:return "[群提示消息]";case pn.MSG_GRP_SYS_NOTICE:return "[群系统通知]";case pn.MSG_FACE:return "[动画表情]";default:return "";}},xy = function () {function e(t) {var n;kn(this, e), this.conversationID = t.conversationID || "", this.unreadCount = t.unreadCount || 0, this.type = t.type || "", this.lastMessage = (n = t.lastMessage, ms(n) ? { lastTime: 0, lastSequence: 0, fromAccount: 0, messageForShow: "", payload: null, type: "", isRevoked: !1 } : n instanceof Vh ? { lastTime: n.time || 0, lastSequence: n.sequence || 0, fromAccount: n.from || "", messageForShow: Gy(n.type, n.payload), payload: n.payload || null, type: n.type || null, isRevoked: !1 } : On({}, n, { isRevoked: !1, messageForShow: Gy(n.type, n.payload) })), this._isInfoCompleted = !1, this._initProfile(t);}return An(e, [{ key: "_initProfile", value: function value(e) {var t = this;Object.keys(e).forEach(function (n) {switch (n) {case "userProfile":t.userProfile = e.userProfile;break;case "groupProfile":t.groupProfile = e.groupProfile;}}), ms(this.userProfile) && this.type === pn.CONV_C2C ? this.userProfile = new Iy({ userID: e.conversationID.replace("C2C", "") }) : ms(this.groupProfile) && this.type === pn.CONV_GROUP && (this.groupProfile = new Py({ groupID: e.conversationID.replace("GROUP", "") }));} }, { key: "updateUnreadCount", value: function value(e, t) {ms(e) || (this.subType === pn.GRP_CHATROOM || xs(this.subType) ? this.unreadCount = 0 : t && this.type === pn.CONV_GROUP ? this.unreadCount = e : this.unreadCount = this.unreadCount + e);} }, { key: "reduceUnreadCount", value: function value() {this.unreadCount >= 1 && (this.unreadCount -= 1);} }, { key: "isLastMessageRevoked", value: function value(e) {var t = e.sequence,n = e.time;return this.type === pn.CONV_C2C && t === this.lastMessage.lastSequence && n === this.lastMessage.lastTime || this.type === pn.CONV_GROUP && t === this.lastMessage.lastSequence;} }, { key: "setLastMessageRevoked", value: function value(e) {this.lastMessage.isRevoked = e;} }, { key: "toAccount", get: function get() {return this.conversationID.replace("C2C", "").replace("GROUP", "");} }, { key: "subType", get: function get() {return this.groupProfile ? this.groupProfile.type : "";} }]), e;}(),Uy = function (e) {Ln(n, e);var t = jn(n);function n(e) {var r;return kn(this, n), (r = t.call(this, e)).pagingStatus = Js.NOT_START, r.pagingTimeStamp = 0, r.conversationMap = new Map(), r.tempGroupList = [], r._initListeners(), r;}return An(n, [{ key: "hasLocalConversationMap", value: function value() {return this.conversationMap.size > 0;} }, { key: "createLocalConversation", value: function value(e) {return this.conversationMap.has(e) ? this.conversationMap.get(e) : new xy({ conversationID: e, type: e.slice(0, 3) === pn.CONV_C2C ? pn.CONV_C2C : pn.CONV_GROUP });} }, { key: "hasLocalConversation", value: function value(e) {return this.conversationMap.has(e);} }, { key: "getConversationList", value: function value() {var e = this;cs.log("ConversationController.getConversationList."), this.pagingStatus === Js.REJECTED && (cs.log("ConversationController.getConversationList. continue to sync conversationList"), this._syncConversationList());var t = new Ig();return t.setMethod(Lg).setStart(), this.request({ name: "conversation", action: "query" }).then(function (n) {var r = n.data.conversations,o = void 0 === r ? [] : r,i = e._getConversationOptions(o);return e._updateLocalConversationList(i, !0), e._setStorageConversationList(), t.setCode(0).setText(o.length).setNetworkType(e.getNetworkType()).setEnd(), cs.log("ConversationController.getConversationList ok."), lg({ conversationList: e.getLocalConversationList() });}).catch(function (n) {return e.probeNetwork().then(function (e) {var r = Bn(e, 2),o = r[0],i = r[1];t.setError(n, o, i).setEnd();}), cs.error("ConversationController.getConversationList error:", n), pg(n);});} }, { key: "_syncConversationList", value: function value() {var e = this,t = new Ig();return t.setMethod(Pg).setStart(), this.pagingStatus === Js.NOT_START && this.conversationMap.clear(), this._autoPagingSyncConversationList().then(function (n) {return e.pagingStatus = Js.RESOLVED, e._setStorageConversationList(), t.setCode(0).setText("".concat(e.conversationMap.size)).setNetworkType(e.getNetworkType()).setEnd(), n;}).catch(function (n) {return e.pagingStatus = Js.REJECTED, t.setText(e.pagingTimeStamp), e.probeNetwork().then(function (e) {var r = Bn(e, 2),o = r[0],i = r[1];t.setError(n, o, i).setEnd();}), pg(n);});} }, { key: "_autoPagingSyncConversationList", value: function value() {var e = this;return this.pagingStatus = Js.PENDING, this.request({ name: "conversation", action: "pagingQuery", param: { fromAccount: this.tim.context.identifier, timeStamp: this.pagingTimeStamp, orderType: 1 } }).then(function (t) {var n = t.data,r = n.completeFlag,o = n.conversations,i = void 0 === o ? [] : o,a = n.timeStamp;if (cs.log("ConversationController._autoPagingSyncConversationList completeFlag=".concat(r, " nums=").concat(i.length)), i.length > 0) {var s = e._getConversationOptions(i);e._updateLocalConversationList(s, !0);}return e._isReady ? e._emitConversationUpdate() : e.triggerReady(), e.pagingTimeStamp = a, 1 !== r ? e._autoPagingSyncConversationList() : lg();});} }, { key: "getConversationProfile", value: function value(e) {var t = this.conversationMap.has(e) ? this.conversationMap.get(e) : this.createLocalConversation(e);return t._isInfoCompleted || t.type === pn.CONV_SYSTEM ? lg({ conversation: t }) : (cs.log("ConversationController.getConversationProfile. conversationID:", e), this._updateUserOrGroupProfileCompletely(t).then(function (t) {return cs.log("ConversationController.getConversationProfile ok. conversationID:", e), t;}).catch(function (e) {return cs.error("ConversationController.getConversationProfile error:", e), pg(e);}));} }, { key: "deleteConversation", value: function value(e) {var t = this,n = {};if (!this.conversationMap.has(e)) {var r = new Gl({ code: cp, message: If });return pg(r);}switch (this.conversationMap.get(e).type) {case pn.CONV_C2C:n.type = 1, n.toAccount = e.slice(3);break;case pn.CONV_GROUP:n.type = 2, n.toGroupID = e.slice(5);break;case pn.CONV_SYSTEM:return this.tim.groupController.deleteGroupSystemNotice({ messageList: this.tim.messageController.getLocalMessageList(e) }), this.deleteLocalConversation(e), lg({ conversationID: e });default:var o = new Gl({ code: pp, message: Mf });return pg(o);}return cs.log("ConversationController.deleteConversation. conversationID:", e), this.tim.setMessageRead({ conversationID: e }).then(function () {return t.request({ name: "conversation", action: "delete", param: n });}).then(function () {return cs.log("ConversationController.deleteConversation ok. conversationID:", e), t.deleteLocalConversation(e), lg({ conversationID: e });}).catch(function (e) {return cs.error("ConversationController.deleteConversation error:", e), pg(e);});} }, { key: "getLocalConversationList", value: function value() {return Hn(this.conversationMap.values());} }, { key: "getLocalConversation", value: function value(e) {return this.conversationMap.get(e);} }, { key: "_initLocalConversationList", value: function value() {var e = new Ig();e.setMethod(Ng).setStart(), cs.time(vg), cs.log("ConversationController._initLocalConversationList init");var t = this._getStorageConversationList();if (t) {for (var n = t.length, r = 0; r < n; r++) {this.conversationMap.set(t[r].conversationID, new xy(t[r]));}this._emitConversationUpdate(!0, !1), e.setCode(0).setNetworkType(this.getNetworkType()).setText(n).setEnd();} else e.setCode(0).setNetworkType(this.getNetworkType()).setText(0).setEnd();this._syncConversationList();} }, { key: "_getStorageConversationList", value: function value() {return this.tim.storage.getItem("conversationMap");} }, { key: "_setStorageConversationList", value: function value() {var e = this.getLocalConversationList().slice(0, 20).map(function (e) {return { conversationID: e.conversationID, type: e.type, subType: e.subType, lastMessage: e.lastMessage, groupProfile: e.groupProfile, userProfile: e.userProfile };});this.tim.storage.setItem("conversationMap", e);} }, { key: "_initListeners", value: function value() {var e = this;this.tim.innerEmitter.once(rd, this._initLocalConversationList, this), this.tim.innerEmitter.on(sd, this._onSendOrReceiveMessage, this), this.tim.innerEmitter.on(ud, this._handleSyncMessages, this), this.tim.innerEmitter.on(cd, this._handleSyncMessages, this), this.tim.innerEmitter.on(ld, this._onSendOrReceiveMessage, this), this.tim.innerEmitter.on(pd, this._onSendOrReceiveMessage, this), this.tim.innerEmitter.on(fd, this._onSendOrReceiveMessage, this), this.tim.innerEmitter.on(Od, this._onGroupListUpdated, this), this.tim.innerEmitter.on(jd, this._updateConversationUserProfile, this), this.tim.innerEmitter.on(hd, this._onMessageRevoked, this), this.ready(function () {e.tempGroupList.length > 0 && (e._updateConversationGroupProfile(e.tempGroupList), e.tempGroupList.length = 0);});} }, { key: "_onGroupListUpdated", value: function value(e) {this._updateConversationGroupProfile(e.data);} }, { key: "_updateConversationGroupProfile", value: function value(e) {var t = this;gs(e) && 0 === e.length || (this.hasLocalConversationMap() ? (e.forEach(function (e) {var n = "GROUP".concat(e.groupID);if (t.conversationMap.has(n)) {var r = t.conversationMap.get(n);r.groupProfile = e, r.lastMessage.lastSequence < e.nextMessageSeq && (r.lastMessage.lastSequence = e.nextMessageSeq - 1), r.subType || (r.subType = e.type);}}), this._emitConversationUpdate(!0, !1)) : this.tempGroupList = e);} }, { key: "_updateConversationUserProfile", value: function value(e) {var t = this;e.data.forEach(function (e) {var n = "C2C".concat(e.userID);t.conversationMap.has(n) && (t.conversationMap.get(n).userProfile = e);}), this._emitConversationUpdate(!0, !1);} }, { key: "_onMessageRevoked", value: function value(e) {var t = this,n = e.data;if (0 !== n.length) {var r = null,o = !1;n.forEach(function (e) {(r = t.conversationMap.get(e.conversationID)) && r.isLastMessageRevoked(e) && (o = !0, r.setLastMessageRevoked(!0));}), o && this._emitConversationUpdate(!0, !1);}} }, { key: "_handleSyncMessages", value: function value(e) {this._onSendOrReceiveMessage(e, !0);} }, { key: "_onSendOrReceiveMessage", value: function value(e) {var t = this,n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],r = e.data.eventDataList;this._isReady ? 0 !== r.length && (this._updateLocalConversationList(r, !1, n), this._setStorageConversationList(), this._emitConversationUpdate()) : this.ready(function () {t._onSendOrReceiveMessage(e, n);});} }, { key: "_updateLocalConversationList", value: function value(e, t, n) {var r;r = this._updateTempConversations(e, t, n), this.conversationMap = new Map(this._sortConversations([].concat(Hn(r.conversations), Hn(this.conversationMap)))), t || this._updateUserOrGroupProfile(r.newerConversations);} }, { key: "_updateTempConversations", value: function value(e, t, n) {for (var r = [], o = [], i = 0, a = e.length; i < a; i++) {var s = new xy(e[i]),u = this.conversationMap.get(s.conversationID);if (this.conversationMap.has(s.conversationID)) {var c = ["unreadCount", "allowType", "adminForbidType", "payload"];n && c.push("lastMessage"), Es(u, s, c, [null, void 0, "", 0, NaN]), u.updateUnreadCount(s.unreadCount, t), n || (u.lastMessage.payload = e[i].lastMessage.payload), this.conversationMap.delete(u.conversationID), r.push([u.conversationID, u]);} else {if (s.type === pn.CONV_GROUP) {var l = s.groupProfile.groupID,p = this.tim.groupController.getLocalGroupProfile(l);p && (s.groupProfile = p, s.updateUnreadCount(0));}o.push(s), r.push([s.conversationID, s]);}}return { conversations: r, newerConversations: o };} }, { key: "_sortConversations", value: function value(e) {return e.sort(function (e, t) {return t[1].lastMessage.lastTime - e[1].lastMessage.lastTime;});} }, { key: "_updateUserOrGroupProfile", value: function value(e) {var t = this;if (0 !== e.length) {var n = [],r = [];e.forEach(function (e) {if (e.type === pn.CONV_C2C) n.push(e.toAccount);else if (e.type === pn.CONV_GROUP) {var o = e.toAccount;t.tim.groupController.hasLocalGroup(o) ? e.groupProfile = t.tim.groupController.getLocalGroupProfile(o) : r.push(o);}}), n.length > 0 && this.tim.getUserProfile({ userIDList: n }).then(function (e) {var n = e.data;gs(n) ? n.forEach(function (e) {t.conversationMap.get("C2C".concat(e.userID)).userProfile = e;}) : t.conversationMap.get("C2C".concat(n.userID)).userProfile = n;}), r.length > 0 && this.tim.groupController.getGroupProfileAdvance({ groupIDList: r, responseFilter: { groupBaseInfoFilter: ["Type", "Name", "FaceUrl"] } }).then(function (e) {e.data.successGroupList.forEach(function (e) {var n = "GROUP".concat(e.groupID);if (t.conversationMap.has(n)) {var r = t.conversationMap.get(n);Es(r.groupProfile, e, [], [null, void 0, "", 0, NaN]), !r.subType && e.type && (r.subType = e.type);}});});}} }, { key: "_updateUserOrGroupProfileCompletely", value: function value(e) {var t = this;return e.type === pn.CONV_C2C ? this.tim.getUserProfile({ userIDList: [e.toAccount] }).then(function (n) {var r = n.data;return 0 === r.length ? pg(new Gl({ code: lp, message: Cf })) : (e.userProfile = r[0], e._isInfoCompleted = !0, t._unshiftConversation(e), lg({ conversation: e }));}) : this.tim.getGroupProfile({ groupID: e.toAccount }).then(function (n) {return e.groupProfile = n.data.group, e._isInfoCompleted = !0, t._unshiftConversation(e), lg({ conversation: e });});} }, { key: "_unshiftConversation", value: function value(e) {e instanceof xy && !this.conversationMap.has(e.conversationID) && (this.conversationMap = new Map([[e.conversationID, e]].concat(Hn(this.conversationMap))), this._setStorageConversationList(), this._emitConversationUpdate(!0, !1));} }, { key: "deleteLocalConversation", value: function value(e) {return this.conversationMap.delete(e), this._setStorageConversationList(), this.emitInnerEvent(Fd, e), this._emitConversationUpdate(!0, !1), this.conversationMap.has(e);} }, { key: "_getConversationOptions", value: function value(e) {var t = [],n = e.filter(function (e) {var t = e.lastMsg;return ds(t);}).map(function (e) {if (1 === e.type) {var n = { userID: e.userID, nick: e.c2CNick, avatar: e.c2CImage };return t.push(n), { conversationID: "C2C".concat(e.userID), type: "C2C", lastMessage: { lastTime: e.time, lastSequence: e.sequence, fromAccount: e.lastC2CMsgFromAccount, messageForShow: e.messageShow, type: e.lastMsg.elements[0] ? e.lastMsg.elements[0].type : null, payload: e.lastMsg.elements[0] ? e.lastMsg.elements[0].content : null }, userProfile: new Iy(n) };}return { conversationID: "GROUP".concat(e.groupID), type: "GROUP", lastMessage: { lastTime: e.time, lastSequence: e.messageReadSeq + e.unreadCount, fromAccount: e.msgGroupFromAccount, messageForShow: e.messageShow, type: e.lastMsg.elements[0] ? e.lastMsg.elements[0].type : null, payload: e.lastMsg.elements[0] ? e.lastMsg.elements[0].content : null }, groupProfile: new Py({ groupID: e.groupID, name: e.groupNick, avatar: e.groupImage }), unreadCount: e.unreadCount };});return t.length > 0 && this.emitInnerEvent(qd, t), n;} }, { key: "_emitConversationUpdate", value: function value() {var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],n = Hn(this.conversationMap.values());t && this.emitInnerEvent(Ud, n), e && this.emitOuterEvent(ln.CONVERSATION_LIST_UPDATED, n);} }, { key: "_conversationMapTreeShaking", value: function value(e) {var t = this,n = new Map(Hn(this.conversationMap));e.forEach(function (e) {return n.delete(e.conversationID);}), n.has(pn.CONV_SYSTEM) && n.delete(pn.CONV_SYSTEM);var r = this.tim.groupController.getJoinedAVChatRoom();r && n.delete("".concat(pn.CONV_GROUP).concat(r.groupID)), Hn(n.keys()).forEach(function (e) {return t.conversationMap.delete(e);});} }, { key: "reset", value: function value() {this.pagingStatus = Js.NOT_START, this.pagingTimeStamp = 0, this.conversationMap.clear(), this.resetReady(), this.tim.innerEmitter.once(rd, this._initLocalConversationList, this);} }]), n;}(og),qy = 1..toFixed,Fy = Math.floor,jy = function jy(e, t, n) {return 0 === t ? n : t % 2 == 1 ? jy(e, t - 1, n * e) : jy(e * e, t / 2, n);},By = qy && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== 0xde0b6b3a7640080.toFixed(0)) || !o(function () {qy.call({});});Ae({ target: "Number", proto: !0, forced: By }, { toFixed: function toFixed(e) {var t,n,r,o,i = function (e) {if ("number" != typeof e && "Number" != p(e)) throw TypeError("Incorrect invocation");return +e;}(this),a = ie(e),s = [0, 0, 0, 0, 0, 0],u = "",c = "0",l = function l(e, t) {for (var n = -1, r = t; ++n < 6;) {r += e * s[n], s[n] = r % 1e7, r = Fy(r / 1e7);}},f = function f(e) {for (var t = 6, n = 0; --t >= 0;) {n += s[t], s[t] = Fy(n / e), n = n % e * 1e7;}},h = function h() {for (var e = 6, t = ""; --e >= 0;) {if ("" !== t || 0 === e || 0 !== s[e]) {var n = String(s[e]);t = "" === t ? n : t + kr.call("0", 7 - n.length) + n;}}return t;};if (a < 0 || a > 20) throw RangeError("Incorrect fraction digits");if (i != i) return "NaN";if (i <= -1e21 || i >= 1e21) return String(i);if (i < 0 && (u = "-", i = -i), i > 1e-21) if (n = (t = function (e) {for (var t = 0, n = e; n >= 4096;) {t += 12, n /= 4096;}for (; n >= 2;) {t += 1, n /= 2;}return t;}(i * jy(2, 69, 1)) - 69) < 0 ? i * jy(2, -t, 1) : i / jy(2, t, 1), n *= 4503599627370496, (t = 52 - t) > 0) {for (l(0, n), r = a; r >= 7;) {l(1e7, 0), r -= 7;}for (l(jy(10, r, 1), 0), r = t - 1; r >= 23;) {f(1 << 23), r -= 23;}f(1 << r), l(1, 1), f(2), c = h();} else l(0, n), l(1 << -t, 0), c = h() + kr.call("0", a);return c = a > 0 ? u + ((o = c.length) <= a ? "0." + kr.call("0", a - o) + c : c.slice(0, o - a) + "." + c.slice(o - a)) : u + c;} });var Hy = [].push,Vy = Math.min,Ky = !o(function () {return !RegExp(4294967295, "y");});pa("split", 2, function (e, t, n) {var r;return r = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length ? function (e, n) {var r = String(d(this)),o = void 0 === n ? 4294967295 : n >>> 0;if (0 === o) return [];if (void 0 === e) return [r];if (!na(e)) return t.call(r, e, o);for (var i, a, s, u = [], c = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""), l = 0, p = new RegExp(e.source, c + "g"); (i = Xi.call(p, r)) && !((a = p.lastIndex) > l && (u.push(r.slice(l, i.index)), i.length > 1 && i.index < r.length && Hy.apply(u, i.slice(1)), s = i[0].length, l = a, u.length >= o));) {p.lastIndex === i.index && p.lastIndex++;}return l === r.length ? !s && p.test("") || u.push("") : u.push(r.slice(l)), u.length > o ? u.slice(0, o) : u;} : "0".split(void 0, 0).length ? function (e, n) {return void 0 === e && 0 === n ? [] : t.call(this, e, n);} : t, [function (t, n) {var o = d(this),i = null == t ? void 0 : t[e];return void 0 !== i ? i.call(t, o, n) : r.call(String(o), t, n);}, function (e, o) {var i = n(r, e, this, o, r !== t);if (i.done) return i.value;var a = D(e),s = String(this),u = ko(a, RegExp),c = a.unicode,l = (a.ignoreCase ? "i" : "") + (a.multiline ? "m" : "") + (a.unicode ? "u" : "") + (Ky ? "y" : "g"),p = new u(Ky ? a : "^(?:" + a.source + ")", l),f = void 0 === o ? 4294967295 : o >>> 0;if (0 === f) return [];if (0 === s.length) return null === da(p, s) ? [s] : [];for (var h = 0, d = 0, g = []; d < s.length;) {p.lastIndex = Ky ? d : 0;var m,v = da(p, Ky ? s : s.slice(d));if (null === v || (m = Vy(se(p.lastIndex + (Ky ? 0 : d)), s.length)) === h) d = ha(s, d, c);else {if (g.push(s.slice(h, d)), g.length === f) return g;for (var y = 1; y <= v.length - 1; y++) {if (g.push(v[y]), g.length === f) return g;}d = h = m;}}return g.push(s.slice(h)), g;}];}, !Ky);var $y = function () {function e(t) {if (kn(this, e), void 0 === t) throw new Gl({ code: Kl, message: tf });if (void 0 === t.tim) throw new Gl({ code: Kl, message: "".concat(tf, ".tim") });this.list = new Map(), this.tim = t.tim, this._initializeOptions(t);}return An(e, [{ key: "getLocalOldestMessageByConversationID", value: function value(e) {if (!e) return null;if (!this.list.has(e)) return null;var t = this.list.get(e).values();return t ? t.next().value : null;} }, { key: "_initializeOptions", value: function value(e) {this.options = {};var t = { memory: { maxDatasPerKey: 100, maxBytesPerData: 256, maxKeys: 0 }, cache: { maxDatasPerKey: 10, maxBytesPerData: 256, maxKeys: 0 } };for (var n in t) {if (Object.prototype.hasOwnProperty.call(t, n)) {if (void 0 === e[n]) {this.options[n] = t[n];continue;}var r = t[n];for (var o in r) {if (Object.prototype.hasOwnProperty.call(r, o)) {if (void 0 === e[n][o]) {this.options[n][o] = r[o];continue;}this.options[n][o] = e[n][o];}}}}} }, { key: "pushIn", value: function value(e) {var t = e.conversationID,n = e.ID,r = !0;return this.list.has(t) || this.list.set(t, new Map()), this.list.has(t) && this.list.get(t).has(n) ? r = !1 : this.list.get(t).set(n, e), r;} }, { key: "unshift", value: function value(e) {gs(e) ? e.length > 0 && this._unshiftMultipleMessages(e) : this._unshiftSingleMessage(e);} }, { key: "_unshiftSingleMessage", value: function value(e) {var t = e.conversationID,n = e.ID;if (!this.list.has(t)) return this.list.set(t, new Map()), void this.list.get(t).set(n, e);var r = Array.from(this.list.get(t));r.unshift([n, e]), this.list.set(t, new Map(r));} }, { key: "_unshiftMultipleMessages", value: function value(e) {for (var t = e.length, n = [], r = e[0].conversationID, o = this.list.has(r) ? Array.from(this.list.get(r)) : [], i = 0; i < t; i++) {n.push([e[i].ID, e[i]]);}this.list.set(r, new Map(n.concat(o)));} }, { key: "remove", value: function value(e) {var t = e.conversationID,n = e.ID;this.list.has(t) && this.list.get(t).delete(n);} }, { key: "revoke", value: function value(e, t, n) {if (cs.debug("revoke message", e, t, n), this.list.has(e)) {var r,o = $n(this.list.get(e));try {for (o.s(); !(r = o.n()).done;) {var i = Bn(r.value, 2)[1];if (i.sequence === t && !i.isRevoked && (ms(n) || i.random === n)) return i.isRevoked = !0, i;}} catch (a) {o.e(a);} finally {o.f();}}return null;} }, { key: "removeByConversationID", value: function value(e) {this.list.has(e) && this.list.delete(e);} }, { key: "hasLocalMessageList", value: function value(e) {return this.list.has(e);} }, { key: "getLocalMessageList", value: function value(e) {return this.hasLocalMessageList(e) ? Hn(this.list.get(e).values()) : [];} }, { key: "hasLocalMessage", value: function value(e, t) {return !!this.hasLocalMessageList(e) && this.list.get(e).has(t);} }, { key: "getLocalMessage", value: function value(e, t) {return this.hasLocalMessage(e, t) ? this.list.get(e).get(t) : null;} }, { key: "reset", value: function value() {this.list.clear();} }]), e;}(),Yy = function () {function e(t) {kn(this, e), this.tim = t;}return An(e, [{ key: "setMessageRead", value: function value(e) {var t = e.conversationID,n = e.messageID,r = this.tim.conversationController.getLocalConversation(t);if (cs.log("ReadReportHandler.setMessageRead conversationID=".concat(t, " unreadCount=").concat(r ? r.unreadCount : 0)), !r || 0 === r.unreadCount) return lg();var o = n ? this.tim.messageController.getLocalMessage(t, n) : null;switch (r.type) {case pn.CONV_C2C:return this._setC2CMessageRead({ conversationID: t, lastMessageTime: o ? o.time : r.lastMessage.lastTime });case pn.CONV_GROUP:return this._setGroupMessageRead({ conversationID: t, lastMessageSeq: o ? o.sequence : r.lastMessage.lastSequence });case pn.CONV_SYSTEM:return r.unreadCount = 0, lg();default:return lg();}} }, { key: "_setC2CMessageRead", value: function value(e) {var t = this,n = e.conversationID,r = e.lastMessageTime;cs.log("ReadReportHandler._setC2CMessageRead conversationID=".concat(n, " lastMessageTime=").concat(r)), ps(r) || cs.warn("ReadReportHandler._setC2CMessageRead 请勿修改 Conversation.lastMessage.lastTime，否则可能会导致已读上报结果不准确");var o = new Ig();return o.setMethod(bg).setText("".concat(n, "-").concat(r)).setStart(), this.tim.messageController.request({ name: "conversation", action: "setC2CMessageRead", param: { C2CMsgReaded: { cookie: "", C2CMsgReadedItem: [{ toAccount: n.replace("C2C", ""), lastMessageTime: r }] } } }).then(function () {return o.setCode(0).setNetworkType(t.tim.netMonitor.getNetworkType()).setEnd(), cs.log("ReadReportHandler._setC2CMessageRead ok."), t._updateIsReadAfterReadReport({ conversationID: n, lastMessageTime: r }), t._updateUnreadCount(n), new sg();}).catch(function (e) {return t.tim.netMonitor.probe().then(function (t) {var n = Bn(t, 2),r = n[0],i = n[1];o.setError(e, r, i).setEnd();}), cs.log("ReadReportHandler._setC2CMessageRead failed. ".concat(Ts(e))), pg(e);});} }, { key: "_setGroupMessageRead", value: function value(e) {var t = this,n = e.conversationID,r = e.lastMessageSeq;cs.log("ReadReportHandler._setGroupMessageRead conversationID=".concat(n, " lastMessageSeq=").concat(r)), ps(r) || cs.warn("ReadReportHandler._setGroupMessageRead 请勿修改 Conversation.lastMessage.lastSequence，否则可能会导致已读上报结果不准确");var o = new Ig();return o.setMethod(Og).setText("".concat(n, "-").concat(r)).setStart(), this.tim.messageController.request({ name: "conversation", action: "setGroupMessageRead", param: { groupID: n.replace("GROUP", ""), messageReadSeq: r } }).then(function () {return o.setCode(0).setNetworkType(t.tim.netMonitor.getNetworkType()).setEnd(), cs.log("ReadReportHandler._setGroupMessageRead ok."), t._updateIsReadAfterReadReport({ conversationID: n, lastMessageSeq: r }), t._updateUnreadCount(n), new sg();}).catch(function (e) {return t.tim.netMonitor.probe().then(function (t) {var n = Bn(t, 2),r = n[0],i = n[1];o.setError(e, r, i).setEnd();}), cs.log("ReadReportHandler._setGroupMessageRead failed. ".concat(Ts(e))), pg(e);});} }, { key: "_updateUnreadCount", value: function value(e) {var t = this.tim,n = t.conversationController,r = t.messageController,o = n.getLocalConversation(e),i = r.getLocalMessageList(e);o && (o.unreadCount = i.filter(function (e) {return !e.isRead;}).length, cs.log("ReadReportHandler._updateUnreadCount conversationID=".concat(o.conversationID, " unreadCount=").concat(o.unreadCount)));} }, { key: "_updateIsReadAfterReadReport", value: function value(e) {var t = e.conversationID,n = e.lastMessageSeq,r = e.lastMessageTime,o = this.tim.messageController.getLocalMessageList(t);if (0 !== o.length) for (var i, a = o.length - 1; a >= 0; a--) {if (i = o[a], !(r && i.time > r || n && i.sequence > n)) {if ("in" === i.flow && i.isRead) break;i.setIsRead(!0);}}} }, { key: "updateIsRead", value: function value(e) {var t = this.tim,n = t.conversationController,r = t.messageController,o = n.getLocalConversation(e),i = r.getLocalMessageList(e);if (o && 0 !== i.length && !Us(o.type)) {for (var a = [], s = 0; s < i.length; s++) {"in" !== i[s].flow ? "out" !== i[s].flow || i[s].isRead || i[s].setIsRead(!0) : a.push(i[s]);}var u = 0;if (o.type === pn.CONV_C2C) {var c = a.slice(-o.unreadCount).filter(function (e) {return e.isRevoked;}).length;u = a.length - o.unreadCount - c;} else u = a.length - o.unreadCount;for (var l = 0; l < u && !a[l].isRead; l++) {a[l].setIsRead(!0);}}} }]), e;}(),zy = Ve.findIndex,Wy = !0,Xy = We("findIndex");"findIndex" in [] && Array(1).findIndex(function () {Wy = !1;}), Ae({ target: "Array", proto: !0, forced: Wy || !Xy }, { findIndex: function findIndex(e) {return zy(this, e, arguments.length > 1 ? arguments[1] : void 0);} }), ir("findIndex");var Jy = function () {function e(t) {var n = t.tim,r = t.messageController;kn(this, e), this.tim = n, this.messageController = r, this.completedMap = new Map(), this._initListener();}return An(e, [{ key: "getMessageList", value: function value(e) {var t = this,n = e.conversationID,r = e.nextReqMessageID,o = e.count;if (this.tim.groupController.checkJoinedAVChatRoomByID(n.replace("GROUP", ""))) return cs.log("GetMessageHandler.getMessageList not available in avchatroom. conversationID=".concat(n)), lg({ messageList: [], nextReqMessageID: "", isCompleted: !0 });(ms(o) || o > 15) && (o = 15);var i = this._computeLeftCount({ conversationID: n, nextReqMessageID: r });return cs.log("GetMessageHandler.getMessageList. conversationID=".concat(n, " leftCount=").concat(i, " count=").concat(o, " nextReqMessageID=").concat(r)), this._needGetHistory({ conversationID: n, leftCount: i, count: o }) ? this.messageController.getHistoryMessages({ conversationID: n, count: 20 }).then(function () {return i = t._computeLeftCount({ conversationID: n, nextReqMessageID: r }), new sg(t._computeResult({ conversationID: n, nextReqMessageID: r, count: o, leftCount: i }));}) : (cs.log("GetMessageHandler.getMessageList. get messagelist from memory"), lg(this._computeResult({ conversationID: n, nextReqMessageID: r, count: o, leftCount: i })));} }, { key: "setCompleted", value: function value(e) {cs.log("GetMessageHandler.setCompleted. conversationID=".concat(e)), this.completedMap.set(e, !0);} }, { key: "deleteCompletedItem", value: function value(e) {cs.log("GetMessageHandler.deleteCompletedItem. conversationID=".concat(e)), this.completedMap.delete(e);} }, { key: "_initListener", value: function value() {var e = this;this.tim.innerEmitter.on(Vd, function () {e.setCompleted(pn.CONV_SYSTEM);}), this.tim.innerEmitter.on(Bd, function (t) {var n = t.data;e.setCompleted("".concat(pn.CONV_GROUP).concat(n));});} }, { key: "_getMessageListSize", value: function value(e) {return this.messageController.getLocalMessageList(e).length;} }, { key: "_needGetHistory", value: function value(e) {var t = e.conversationID,n = e.leftCount,r = e.count,o = this.tim.conversationController.getLocalConversation(t),i = !!o && o.type === pn.CONV_SYSTEM,a = !!o && o.subType === pn.GRP_AVCHATROOM;return !i && !a && n < r && !this.completedMap.has(t);} }, { key: "_computeResult", value: function value(e) {var t = e.conversationID,n = e.nextReqMessageID,r = e.count,o = e.leftCount,i = this._computeMessageList({ conversationID: t, nextReqMessageID: n, count: r }),a = this._computeIsCompleted({ conversationID: t, leftCount: o, count: r }),s = this._computeNextReqMessageID({ messageList: i, isCompleted: a, conversationID: t });return cs.log("GetMessageHandler._computeResult. conversationID=".concat(t, " leftCount=").concat(o, " count=").concat(r, " nextReqMessageID=").concat(s, " nums=").concat(i.length, " isCompleted=").concat(a)), { messageList: i, nextReqMessageID: s, isCompleted: a };} }, { key: "_computeNextReqMessageID", value: function value(e) {var t = e.messageList,n = e.isCompleted,r = e.conversationID;if (!n) return 0 === t.length ? "" : t[0].ID;var o = this.messageController.getLocalMessageList(r);return 0 === o.length ? "" : o[0].ID;} }, { key: "_computeMessageList", value: function value(e) {var t = e.conversationID,n = e.nextReqMessageID,r = e.count,o = this.messageController.getLocalMessageList(t),i = this._computeIndexEnd({ nextReqMessageID: n, messageList: o }),a = this._computeIndexStart({ indexEnd: i, count: r });return o.slice(a, i);} }, { key: "_computeIndexEnd", value: function value(e) {var t = e.messageList,n = void 0 === t ? [] : t,r = e.nextReqMessageID;return r ? n.findIndex(function (e) {return e.ID === r;}) : n.length;} }, { key: "_computeIndexStart", value: function value(e) {var t = e.indexEnd,n = e.count;return t > n ? t - n : 0;} }, { key: "_computeLeftCount", value: function value(e) {var t = e.conversationID,n = e.nextReqMessageID;return n ? this.messageController.getLocalMessageList(t).findIndex(function (e) {return e.ID === n;}) : this._getMessageListSize(t);} }, { key: "_computeIsCompleted", value: function value(e) {var t = e.conversationID;return !!(e.leftCount <= e.count && this.completedMap.has(t));} }, { key: "reset", value: function value() {cs.log("GetMessageHandler.reset"), this.completedMap.clear();} }]), e;}(),Qy = function e(t) {kn(this, e), this.value = t, this.next = null;},Zy = function () {function e(t) {kn(this, e), this.MAX_LENGTH = t, this.pTail = null, this.pNodeToDel = null, this.map = new Map(), cs.log("SinglyLinkedList init MAX_LENGTH=".concat(this.MAX_LENGTH));}return An(e, [{ key: "pushIn", value: function value(e) {var t = new Qy(e);if (this.map.size < this.MAX_LENGTH) null === this.pTail ? (this.pTail = t, this.pNodeToDel = t) : (this.pTail.next = t, this.pTail = t), this.map.set(e, 1);else {var n = this.pNodeToDel;this.pNodeToDel = this.pNodeToDel.next, this.map.delete(n.value), n.next = null, n = null, this.pTail.next = t, this.pTail = t, this.map.set(e, 1);}} }, { key: "has", value: function value(e) {return this.map.has(e);} }, { key: "reset", value: function value() {for (var e; null !== this.pNodeToDel;) {e = this.pNodeToDel, this.pNodeToDel = this.pNodeToDel.next, e.next = null, e = null;}this.pTail = null, this.map.clear();} }]), e;}(),e_ = function () {function e(t) {kn(this, e), this.tim = t;}return An(e, [{ key: "upload", value: function value(e) {switch (e.type) {case pn.MSG_IMAGE:return this._uploadImage(e);case pn.MSG_FILE:return this._uploadFile(e);case pn.MSG_AUDIO:return this._uploadAudio(e);case pn.MSG_VIDEO:return this._uploadVideo(e);default:return Promise.resolve();}} }, { key: "_uploadImage", value: function value(e) {var t = this.tim,n = t.uploadController,r = t.messageController,o = e.getElements()[0],i = r.getMessageOptionByID(e.messageID);return n.uploadImage({ file: i.payload.file, to: i.to, onProgress: function onProgress(e) {if (o.updatePercent(e), ys(i.onProgress)) try {i.onProgress(e);} catch (t) {return pg(new Gl({ code: Wl, message: "".concat(af) }));}} }).then(function (e) {var t,n = e.location,r = e.fileType,i = e.fileSize,a = Ns(n);return o.updateImageFormat(r), o.updateImageInfoArray({ size: i, url: a }), t = o._imageMemoryURL, ba ? new Promise(function (e, n) {wx.getImageInfo({ src: t, success: function success(t) {e({ width: t.width, height: t.height });}, fail: function fail() {e({ width: 0, height: 0 });} });}) : qa && 9 === Fa ? Promise.resolve({ width: 0, height: 0 }) : new Promise(function (e, n) {var r = new Image();r.onload = function () {e({ width: this.width, height: this.height }), r = null;}, r.onerror = function () {e({ width: 0, height: 0 }), r = null;}, r.src = t;});}).then(function (t) {var n = t.width,r = t.height;return o.updateImageInfoArray({ width: n, height: r }), e;});} }, { key: "_uploadFile", value: function value(e) {var t = this.tim,n = t.uploadController,r = t.messageController,o = e.getElements()[0],i = r.getMessageOptionByID(e.messageID);return n.uploadFile({ file: i.payload.file, to: i.to, onProgress: function onProgress(e) {if (o.updatePercent(e), ys(i.onProgress)) try {i.onProgress(e);} catch (t) {return pg(new Gl({ code: Wl, message: "".concat(af) }));}} }).then(function (t) {var n = t.location,r = Ns(n);return o.updateFileUrl(r), e;});} }, { key: "_uploadAudio", value: function value(e) {var t = this.tim,n = t.uploadController,r = t.messageController,o = e.getElements()[0],i = r.getMessageOptionByID(e.messageID);return n.uploadAudio({ file: i.payload.file, to: i.to, onProgress: function onProgress(e) {if (o.updatePercent(e), ys(i.onProgress)) try {i.onProgress(e);} catch (t) {return pg(new Gl({ code: Wl, message: "".concat(af) }));}} }).then(function (t) {var n = t.location,r = Ns(n);return o.updateAudioUrl(r), e;});} }, { key: "_uploadVideo", value: function value(e) {var t = this.tim,n = t.uploadController,r = t.messageController,o = e.getElements()[0],i = r.getMessageOptionByID(e.messageID);return n.uploadVideo({ file: i.payload.file, to: i.to, onProgress: function onProgress(e) {if (o.updatePercent(e), ys(i.onProgress)) try {i.onProgress(e);} catch (t) {return pg(new Gl({ code: Wl, message: "".concat(af) }));}} }).then(function (t) {var n = Ns(t.location);return o.updateVideoUrl(n), e;});} }]), e;}(),t_ = function (e) {Ln(n, e);var t = jn(n);function n(e) {var r;return kn(this, n), (r = t.call(this, e))._initializeMembers(), r._initializeListener(), r._initialzeHandlers(), r.messageOptionMap = new Map(), r;}return An(n, [{ key: "_initializeMembers", value: function value() {this.messagesList = new $y({ tim: this.tim }), this.currentMessageKey = {}, this.singlyLinkedList = new Zy(100);} }, { key: "_initialzeHandlers", value: function value() {this.readReportHandler = new Yy(this.tim, this), this.getMessageHandler = new Jy({ messageController: this, tim: this.tim }), this.uploadFileHandler = new e_(this.tim);} }, { key: "reset", value: function value() {this.messagesList.reset(), this.currentMessageKey = {}, this.getMessageHandler.reset(), this.singlyLinkedList.reset(), this.messageOptionMap.clear();} }, { key: "_initializeListener", value: function value() {var e = this.tim.innerEmitter;e.on(Cd, this._onReceiveC2CMessage, this), e.on(id, this._onSyncMessagesProcessing, this), e.on(ad, this._onSyncMessagesFinished, this), e.on(Md, this._onReceiveGroupMessage, this), e.on(Sd, this._onReceiveGroupTips, this), e.on(Ed, this._onReceiveSystemNotice, this), e.on(wd, this._onReceiveGroupMessageRevokedNotice, this), e.on(Ad, this._onReceiveC2CMessageRevokedNotice, this), e.on(Fd, this._clearConversationMessages, this);} }, { key: "sendMessageInstance", value: function value(e) {var t,n = this,r = this.tim.sumStatController,o = null;switch (e.conversationType) {case pn.CONV_C2C:o = this._handleOnSendC2CMessageSuccess.bind(this);break;case pn.CONV_GROUP:o = this._handleOnSendGroupMessageSuccess.bind(this);break;default:return pg(new Gl({ code: Yl, message: rf }));}return this.singlyLinkedList.pushIn(e.random), this.uploadFileHandler.upload(e).then(function () {var o = null;return e.isSendable() ? (r.addTotalCount(mg), t = Date.now(), e.conversationType === pn.CONV_C2C ? o = n._createC2CMessagePack(e) : e.conversationType === pn.CONV_GROUP && (o = n._createGroupMessagePack(e)), n.request(o)) : pg({ code: up, message: _f });}).then(function (i) {return r.addSuccessCount(mg), r.addCost(mg, Math.abs(Date.now() - t)), e.conversationType === pn.CONV_GROUP && (e.sequence = i.data.sequence, e.time = i.data.time, e.generateMessageID(n.tim.context.identifier)), n.messagesList.pushIn(e), o(e, i.data), n.messageOptionMap.delete(e.messageID), n.emitInnerEvent(sd, { eventDataList: [{ conversationID: e.conversationID, unreadCount: 0, type: e.conversationType, subType: e.conversationSubType, lastMessage: e }] }), new sg({ message: e });}).catch(function (t) {e.status = Xs.FAIL;var r = new Ig();return r.setMethod(kg).setMessageType(e.type).setText("".concat(n._generateTjgID(e), "-").concat(e.type, "-").concat(e.from, "-").concat(e.to)).setStart(), n.probeNetwork().then(function (e) {var n = Bn(e, 2),o = n[0],i = n[1];r.setError(t, o, i).setEnd();}), cs.error("MessageController.sendMessageInstance error:", t), pg(new Gl({ code: t && t.code ? t.code : Vl, message: t && t.message ? t.message : ef, data: { message: e } }));});} }, { key: "resendMessage", value: function value(e) {return e.isResend = !0, e.status = Xs.UNSEND, this.sendMessageInstance(e);} }, { key: "_isFileLikeMessage", value: function value(e) {return [pn.MSG_IMAGE, pn.MSG_FILE, pn.MSG_AUDIO, pn.MSG_VIDEO].indexOf(e.type) >= 0;} }, { key: "_resendBinaryTypeMessage", value: function value() {} }, { key: "_createC2CMessagePack", value: function value(e) {return { name: "c2cMessage", action: "create", tjgID: this._generateTjgID(e), param: { toAccount: e.to, msgBody: e.getElements(), msgSeq: e.sequence, msgRandom: e.random } };} }, { key: "_handleOnSendC2CMessageSuccess", value: function value(e, t) {e.status = Xs.SUCCESS, e.time = t.time;} }, { key: "_createGroupMessagePack", value: function value(e) {return { name: "groupMessage", action: "create", tjgID: this._generateTjgID(e), param: { groupID: e.to, msgBody: e.getElements(), random: e.random, priority: e.priority, clientSequence: e.clientSequence } };} }, { key: "_handleOnSendGroupMessageSuccess", value: function value(e, t) {e.sequence = t.sequence, e.time = t.time, e.status = Xs.SUCCESS;} }, { key: "_onReceiveC2CMessage", value: function value(e) {cs.debug("MessageController._onReceiveC2CMessage nums=".concat(e.data.length));var t = this._newC2CMessageStoredAndSummary({ notifiesList: e.data, type: pn.CONV_C2C, C2CRemainingUnreadList: e.C2CRemainingUnreadList }),n = t.eventDataList,r = t.result;n.length > 0 && this.emitInnerEvent(ld, { eventDataList: n, result: r }), r.length > 0 && this.emitOuterEvent(ln.MESSAGE_RECEIVED, r);} }, { key: "_onReceiveGroupMessage", value: function value(e) {cs.debug("MessageController._onReceiveGroupMessage nums=".concat(e.data.length));var t = this.newGroupMessageStoredAndSummary(e.data),n = t.eventDataList,r = t.result;n.length > 0 && this.emitInnerEvent(pd, { eventDataList: n, result: r, isGroupTip: !1 }), r.length > 0 && this.emitOuterEvent(ln.MESSAGE_RECEIVED, r);} }, { key: "_onReceiveGroupTips", value: function value(e) {var t = e.data;cs.debug("MessageController._onReceiveGroupTips nums=".concat(t.length));var n = this.newGroupTipsStoredAndSummary(t),r = n.eventDataList,o = n.result;r.length > 0 && this.emitInnerEvent(pd, { eventDataList: r, result: o, isGroupTip: !0 }), o.length > 0 && this.emitOuterEvent(ln.MESSAGE_RECEIVED, o);} }, { key: "_onReceiveSystemNotice", value: function value(e) {var t = e.data,n = t.groupSystemNotices,r = t.type;cs.debug("MessageController._onReceiveSystemNotice nums=".concat(n.length));var o = this.newSystemNoticeStoredAndSummary({ notifiesList: n, type: r }),i = o.eventDataList,a = o.result;i.length > 0 && this.emitInnerEvent(fd, { eventDataList: i, result: a, type: r }), a.length > 0 && "poll" === r && this.emitOuterEvent(ln.MESSAGE_RECEIVED, a);} }, { key: "_onReceiveGroupMessageRevokedNotice", value: function value(e) {var t = this;cs.debug("MessageController._onReceiveGroupMessageRevokedNotice nums=".concat(e.data.length));var n = [],r = null;e.data.forEach(function (e) {e.elements.revokedInfos.forEach(function (e) {(r = t.messagesList.revoke("GROUP".concat(e.groupID), e.sequence)) && n.push(r);});}), 0 !== n.length && (this.emitInnerEvent(hd, n), this.emitOuterEvent(ln.MESSAGE_REVOKED, n));} }, { key: "_onReceiveC2CMessageRevokedNotice", value: function value(e) {var t = this;cs.debug("MessageController._onReceiveC2CMessageRevokedNotice nums=".concat(e.data.length));var n = [],r = null;e.data.forEach(function (e) {e.c2cMessageRevokedNotify.revokedInfos.forEach(function (e) {var o = t.tim.context.identifier === e.from ? "C2C".concat(e.to) : "C2C".concat(e.from);(r = t.messagesList.revoke(o, e.sequence, e.random)) && n.push(r);});}), 0 !== n.length && (this.emitInnerEvent(hd, n), this.emitOuterEvent(ln.MESSAGE_REVOKED, n));} }, { key: "_clearConversationMessages", value: function value(e) {var t = e.data;this.messagesList.removeByConversationID(t), this.getMessageHandler.deleteCompletedItem(t);} }, { key: "_pushIntoNoticeResult", value: function value(e, t) {var n = this.messagesList.pushIn(t),r = this.singlyLinkedList.has(t.random);return !(!n || !1 !== r) && (e.push(t), !0);} }, { key: "_newC2CMessageStoredAndSummary", value: function value(e) {for (var t = e.notifiesList, n = e.type, r = e.C2CRemainingUnreadList, o = e.isFromSync, i = null, a = [], s = [], u = {}, c = this.tim.bigDataHallwayController, l = 0, p = t.length; l < p; l++) {var f = t[l];if (f.currentUser = this.tim.context.identifier, f.conversationType = n, f.isSystemMessage = !!f.isSystemMessage, i = new Vh(f), f.elements = c.parseElements(f.elements, f.from), i.setElement(f.elements), !o) if (!this._pushIntoNoticeResult(s, i)) continue;void 0 === u[i.conversationID] ? u[i.conversationID] = a.push({ conversationID: i.conversationID, unreadCount: "out" === i.flow ? 0 : 1, type: i.conversationType, subType: i.conversationSubType, lastMessage: i }) - 1 : (a[u[i.conversationID]].type = i.conversationType, a[u[i.conversationID]].subType = i.conversationSubType, a[u[i.conversationID]].lastMessage = i, "in" === i.flow && a[u[i.conversationID]].unreadCount++);}if (gs(r)) for (var h = function h(e, t) {var n = a.find(function (t) {return t.conversationID === "C2C".concat(r[e].from);});n ? n.unreadCount += r[e].count : a.push({ conversationID: "C2C".concat(r[e].from), unreadCount: r[e].count, type: pn.CONV_C2C });}, d = 0, g = r.length; d < g; d++) {h(d);}return { eventDataList: a, result: s };} }, { key: "newGroupMessageStoredAndSummary", value: function value(e) {for (var t = null, n = [], r = {}, o = [], i = pn.CONV_GROUP, a = this.tim.bigDataHallwayController, s = 0, u = e.length; s < u; s++) {var c = e[s];if (c.currentUser = this.tim.context.identifier, c.conversationType = i, c.isSystemMessage = !!c.isSystemMessage, t = new Vh(c), c.elements = a.parseElements(c.elements, c.from), t.setElement(c.elements), !this._isMessageFromAVChatroom(t)) this._pushIntoNoticeResult(o, t) && (void 0 === r[t.conversationID] ? r[t.conversationID] = n.push({ conversationID: t.conversationID, unreadCount: "out" === t.flow ? 0 : 1, type: t.conversationType, subType: t.conversationSubType, lastMessage: t }) - 1 : (n[r[t.conversationID]].type = t.conversationType, n[r[t.conversationID]].subType = t.conversationSubType, n[r[t.conversationID]].lastMessage = t, "in" === t.flow && n[r[t.conversationID]].unreadCount++));}return { eventDataList: n, result: o };} }, { key: "_isMessageFromAVChatroom", value: function value(e) {var t = e.conversationID.slice(5);return this.tim.groupController.checkJoinedAVChatRoomByID(t);} }, { key: "newGroupTipsStoredAndSummary", value: function value(e) {for (var t = null, n = [], r = [], o = {}, i = 0, a = e.length; i < a; i++) {var s = e[i];if (s.currentUser = this.tim.context.identifier, s.conversationType = pn.CONV_GROUP, (t = new Vh(s)).setElement({ type: pn.MSG_GRP_TIP, content: On({}, s.elements, { groupProfile: s.groupProfile }) }), t.isSystemMessage = !1, !this._isMessageFromAVChatroom(t)) this._pushIntoNoticeResult(r, t) && (void 0 === o[t.conversationID] ? o[t.conversationID] = n.push({ conversationID: t.conversationID, unreadCount: "out" === t.flow ? 0 : 1, type: t.conversationType, subType: t.conversationSubType, lastMessage: t }) - 1 : (n[o[t.conversationID]].type = t.conversationType, n[o[t.conversationID]].subType = t.conversationSubType, n[o[t.conversationID]].lastMessage = t, "in" === t.flow && n[o[t.conversationID]].unreadCount++));}return { eventDataList: n, result: r };} }, { key: "newSystemNoticeStoredAndSummary", value: function value(e) {var t = e.notifiesList,n = e.type,r = null,o = t.length,i = 0,a = [],s = { conversationID: pn.CONV_SYSTEM, unreadCount: 0, type: pn.CONV_SYSTEM, subType: null, lastMessage: null };for (i = 0; i < o; i++) {var u = t[i];if (u.elements.operationType !== hl) u.currentUser = this.tim.context.identifier, u.conversationType = pn.CONV_SYSTEM, u.conversationID = pn.CONV_SYSTEM, (r = new Vh(u)).setElement({ type: pn.MSG_GRP_SYS_NOTICE, content: On({}, u.elements, { groupProfile: u.groupProfile }) }), r.isSystemMessage = !0, (1 === r.sequence && 1 === r.random || 2 === r.sequence && 2 === r.random) && (r.sequence = ws(), r.random = ws(), r.generateMessageID(u.currentUser), cs.log("MessageController.newSystemNoticeStoredAndSummary sequence and random maybe duplicated, regenerate. ID=".concat(r.ID))), this._pushIntoNoticeResult(a, r) && ("poll" === n ? s.unreadCount++ : "sync" === n && r.setIsRead(!0), s.subType = r.conversationSubType);}return s.lastMessage = a[a.length - 1], { eventDataList: a.length > 0 ? [s] : [], result: a };} }, { key: "_onSyncMessagesProcessing", value: function value(e) {var t = this._newC2CMessageStoredAndSummary({ notifiesList: e.data, type: pn.CONV_C2C, isFromSync: !0, C2CRemainingUnreadList: e.C2CRemainingUnreadList }),n = t.eventDataList,r = t.result;this.emitInnerEvent(ud, { eventDataList: n, result: r });} }, { key: "_onSyncMessagesFinished", value: function value(e) {this.triggerReady();var t = this._newC2CMessageStoredAndSummary({ notifiesList: e.data.messageList, type: pn.CONV_C2C, isFromSync: !0, C2CRemainingUnreadList: e.data.C2CRemainingUnreadList }),n = t.eventDataList,r = t.result;this.emitInnerEvent(cd, { eventDataList: n, result: r });} }, { key: "getHistoryMessages", value: function value(e) {if (e.conversationID === pn.CONV_SYSTEM) return lg();!e.count && (e.count = 15), e.count > 20 && (e.count = 20);var t = this.messagesList.getLocalOldestMessageByConversationID(e.conversationID);t || ((t = {}).time = 0, t.sequence = 0, 0 === e.conversationID.indexOf(pn.CONV_C2C) ? (t.to = e.conversationID.replace(pn.CONV_C2C, ""), t.conversationType = pn.CONV_C2C) : 0 === e.conversationID.indexOf(pn.CONV_GROUP) && (t.to = e.conversationID.replace(pn.CONV_GROUP, ""), t.conversationType = pn.CONV_GROUP));var n = "";switch (t.conversationType) {case pn.CONV_C2C:return n = e.conversationID.replace(pn.CONV_C2C, ""), this.getC2CRoamMessages({ conversationID: e.conversationID, peerAccount: n, count: e.count, lastMessageTime: void 0 === this.currentMessageKey[e.conversationID] ? 0 : t.time });case pn.CONV_GROUP:return this.getGroupRoamMessages({ conversationID: e.conversationID, groupID: t.to, count: e.count, sequence: t.sequence - 1 });default:return lg();}} }, { key: "getC2CRoamMessages", value: function value(e) {var t = this,n = void 0 !== this.currentMessageKey[e.conversationID] ? this.currentMessageKey[e.conversationID] : "";cs.log("MessageController.getC2CRoamMessages toAccount=".concat(e.peerAccount, " count=").concat(e.count || 15, " lastMessageTime=").concat(e.lastMessageTime || 0, " messageKey=").concat(n));var r = new Ig();return r.setMethod(wg).setStart(), this.request({ name: "c2cMessage", action: "query", param: { peerAccount: e.peerAccount, count: e.count || 15, lastMessageTime: e.lastMessageTime || 0, messageKey: n } }).then(function (o) {var i = o.data,a = i.complete,s = i.messageList;ms(s) ? cs.log("MessageController.getC2CRoamMessages ok. complete=".concat(a, " but messageList is undefined!")) : cs.log("MessageController.getC2CRoamMessages ok. complete=".concat(a, " nums=").concat(s.length)), r.setCode(0).setNetworkType(t.getNetworkType()).setText("".concat(e.peerAccount, "-").concat(e.count || 15, "-").concat(e.lastMessageTime || 0, "-").concat(n, "-").concat(a, "-").concat(s ? s.length : "undefined")).setEnd(), 1 === a && t.getMessageHandler.setCompleted(e.conversationID);var u = t._roamMessageStore(s, pn.CONV_C2C, e.conversationID);return t.readReportHandler.updateIsRead(e.conversationID), t.currentMessageKey[e.conversationID] = o.data.messageKey, u;}).catch(function (o) {return t.probeNetwork().then(function (t) {var i = Bn(t, 2),a = i[0],s = i[1];r.setError(o, a, s).setText("".concat(e.peerAccount, "-").concat(e.count || 15, "-").concat(e.lastMessageTime || 0, "-").concat(n)).setEnd();}), cs.warn("MessageController.getC2CRoamMessages failed. ".concat(o)), pg(o);});} }, { key: "_computeLastSequence", value: function value(e) {return e.sequence >= 0 ? Promise.resolve(e.sequence) : this.tim.groupController.getGroupLastSequence(e.groupID);} }, { key: "getGroupRoamMessages", value: function value(e) {var t = this,n = new Ig(),r = 0;return this._computeLastSequence(e).then(function (o) {return r = o, cs.log("MessageController.getGroupRoamMessages groupID=".concat(e.groupID, " lastSequence=").concat(r)), n.setMethod(Ag).setStart(), t.request({ name: "groupMessage", action: "query", param: { groupID: e.groupID, count: 21, sequence: r } });}).then(function (o) {var i = o.data,a = i.messageList,s = i.complete;ms(a) ? cs.log("MessageController.getGroupRoamMessages ok. complete=".concat(s, " but messageList is undefined!")) : cs.log("MessageController.getGroupRoamMessages ok. complete=".concat(s, " nums=").concat(a.length)), n.setCode(0).setNetworkType(t.getNetworkType()).setText("".concat(e.groupID, "-").concat(r, "-").concat(s, "-").concat(a ? a.length : "undefined")).setEnd();var u = "GROUP".concat(e.groupID);if (2 === s || js(a)) return t.getMessageHandler.setCompleted(u), [];var c = t._roamMessageStore(a, pn.CONV_GROUP, u);return t.readReportHandler.updateIsRead(u), c;}).catch(function (o) {return t.probeNetwork().then(function (t) {var i = Bn(t, 2),a = i[0],s = i[1];n.setError(o, a, s).setText("".concat(e.groupID, "-").concat(r)).setEnd();}), cs.warn("MessageController.getGroupRoamMessages failed. ".concat(o)), pg(o);});} }, { key: "_roamMessageStore", value: function value() {var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],t = arguments.length > 1 ? arguments[1] : void 0,n = arguments.length > 2 ? arguments[2] : void 0,r = null,o = [],i = 0,a = e.length,s = null,u = t === pn.CONV_GROUP,c = this.tim.bigDataHallwayController,l = function l() {i = u ? e.length - 1 : 0, a = u ? 0 : e.length;},p = function p() {u ? --i : ++i;},f = function f() {return u ? i >= a : i < a;};for (l(); f(); p()) {u && 1 === e[i].sequence && this.getMessageHandler.setCompleted(n), 1 !== e[i].isPlaceMessage && ((r = new Vh(e[i])).to = e[i].to, r.isSystemMessage = !!e[i].isSystemMessage, r.conversationType = t, e[i].event === rl.JSON.TYPE.GROUP.TIP ? s = { type: pn.MSG_GRP_TIP, content: On({}, e[i].elements, { groupProfile: e[i].groupProfile }) } : (e[i].elements = c.parseElements(e[i].elements, e[i].from), s = e[i].elements), r.setElement(s), r.reInitialize(this.tim.context.identifier), o.push(r));}return this.messagesList.unshift(o), l = p = f = null, o;} }, { key: "getLocalMessageList", value: function value(e) {return this.messagesList.getLocalMessageList(e);} }, { key: "getLocalMessage", value: function value(e, t) {return this.messagesList.getLocalMessage(e, t);} }, { key: "hasLocalMessage", value: function value(e, t) {return this.messagesList.hasLocalMessage(e, t);} }, { key: "deleteLocalMessage", value: function value(e) {e instanceof Vh && this.messagesList.remove(e);} }, { key: "revokeMessage", value: function value(e) {var t,n = this;e.conversationType === pn.CONV_C2C ? t = { name: "c2cMessageWillBeRevoked", action: "create", param: { msgInfo: { fromAccount: e.from, toAccount: e.to, msgSeq: e.sequence, msgRandom: e.random, msgTimeStamp: e.time } } } : e.conversationType === pn.CONV_GROUP && (t = { name: "groupMessageWillBeRevoked", action: "create", param: { to: e.to, msgSeqList: [{ msgSeq: e.sequence }] } });var r = new Ig();return r.setMethod(Rg).setMessageType(e.type).setText("".concat(this._generateTjgID(e), "-").concat(e.type, "-").concat(e.from, "-").concat(e.to)).setStart(), this.request(t).then(function (t) {var o = t.data.recallRetList;if (!js(o) && 0 !== o[0].retCode) {var i = new Gl({ code: o[0].retCode, message: Pl[o[0].retCode] || sf, data: { message: e } });return r.setCode(i.code).setMessage(i.message).setEnd(), pg(i);}return cs.info("MessageController.revokeMessage ok. ID=".concat(e.ID)), e.isRevoked = !0, r.setCode(0).setEnd(), n.emitInnerEvent(hd, [e]), new sg({ message: e });}).catch(function (t) {n.probeNetwork().then(function (e) {var n = Bn(e, 2),o = n[0],i = n[1];r.setError(t, o, i).setEnd();});var o = new Gl({ code: t && t.code ? t.code : Xl, message: t && t.message ? t.message : sf, data: { message: e } });return cs.warn("MessageController.revokeMessage failed. ID=".concat(e.ID, " code=").concat(o.code, " message=").concat(o.message)), pg(o);});} }, { key: "setMessageRead", value: function value(e) {var t = this;return new Promise(function (n, r) {t.ready(function () {t.readReportHandler.setMessageRead(e).then(n).catch(r);});});} }, { key: "getMessageList", value: function value(e) {return this.getMessageHandler.getMessageList(e);} }, { key: "createTextMessage", value: function value(e) {e.currentUser = this.tim.context.identifier;var t = new Vh(e),n = "string" == typeof e.payload ? e.payload : e.payload.text,r = new Qs({ text: n });return t.setElement(r), t;} }, { key: "createCustomMessage", value: function value(e) {e.currentUser = this.tim.context.identifier;var t = new Vh(e),n = new Fh({ data: e.payload.data, description: e.payload.description, extension: e.payload.extension });return t.setElement(n), t;} }, { key: "createImageMessage", value: function value(e) {e.currentUser = this.tim.context.identifier;var t = new Vh(e);if (ba) {var n = e.payload.file;if (ls(n)) return void cs.warn("微信小程序环境下调用 createImageMessage 接口时，payload.file 不支持传入 File 对象");var r = n.tempFilePaths[0],o = { url: r, name: r.slice(r.lastIndexOf("/") + 1), size: n.tempFiles[0].size, type: r.slice(r.lastIndexOf(".") + 1).toLowerCase() };e.payload.file = o;} else if (Ra && ls(e.payload.file)) {var i = e.payload.file;e.payload.file = { files: [i] };}var a = new Ml({ imageFormat: "UNKNOWN", uuid: this._generateUUID(), file: e.payload.file });return t.setElement(a), this.messageOptionMap.set(t.messageID, e), t;} }, { key: "createFileMessage", value: function value(e) {if (!ba) {if (Ra && ls(e.payload.file)) {var t = e.payload.file;e.payload.file = { files: [t] };}e.currentUser = this.tim.context.identifier;var n = new Vh(e),r = new eh({ uuid: this._generateUUID(), file: e.payload.file });return n.setElement(r), this.messageOptionMap.set(n.messageID, e), n;}cs.warn("微信小程序目前不支持选择文件， createFileMessage 接口不可用！");} }, { key: "createAudioMessage", value: function value(e) {if (ba) {var t = e.payload.file;if (ba) {var n = { url: t.tempFilePath, name: t.tempFilePath.slice(t.tempFilePath.lastIndexOf("/") + 1), size: t.fileSize, second: parseInt(t.duration) / 1e3, type: t.tempFilePath.slice(t.tempFilePath.lastIndexOf(".") + 1).toLowerCase() };e.payload.file = n;}e.currentUser = this.tim.context.identifier;var r = new Vh(e),o = new El({ second: Math.floor(t.duration / 1e3), size: t.fileSize, url: t.tempFilePath, uuid: this._generateUUID() });return r.setElement(o), this.messageOptionMap.set(r.messageID, e), r;}cs.warn("createAudioMessage 目前只支持微信小程序发语音消息");} }, { key: "createVideoMessage", value: function value(e) {e.currentUser = this.tim.context.identifier, e.payload.file.thumbUrl = "https://webim-1252463788.cos.ap-shanghai.myqcloud.com/assets/images/transparent.png", e.payload.file.thumbSize = 1668;var t = {};if (ba) {if (ls(e.payload.file)) return void cs.warn("微信小程序环境下调用 createVideoMessage 接口时，payload.file 不支持传入 File 对象");var n = e.payload.file;t.url = n.tempFilePath, t.name = n.tempFilePath.slice(n.tempFilePath.lastIndexOf("/") + 1), t.size = n.size, t.second = n.duration, t.type = n.tempFilePath.slice(n.tempFilePath.lastIndexOf(".") + 1).toLowerCase();} else if (Ra) {if (ls(e.payload.file)) {var r = e.payload.file;e.payload.file.files = [r];}var o = e.payload.file;t.url = window.URL.createObjectURL(o.files[0]), t.name = o.files[0].name, t.size = o.files[0].size, t.second = o.files[0].duration || 0, t.type = o.files[0].type.split("/")[1];}e.payload.file.videoFile = t;var i = new Vh(e),a = new jh({ videoFormat: t.type, videoSecond: Number(t.second.toFixed(0)), videoSize: t.size, remoteVideoUrl: "", videoUrl: t.url, videoUUID: this._generateUUID(), thumbUUID: this._generateUUID(), thumbWidth: e.payload.file.width || 200, thumbHeight: e.payload.file.height || 200, thumbUrl: e.payload.file.thumbUrl, thumbSize: e.payload.file.thumbSize, thumbFormat: e.payload.file.thumbUrl.slice(e.payload.file.thumbUrl.lastIndexOf(".") + 1).toLowerCase() });return i.setElement(a), this.messageOptionMap.set(i.messageID, e), i;} }, { key: "createFaceMessage", value: function value(e) {e.currentUser = this.tim.context.identifier;var t = new Vh(e),n = new Sl(e.payload);return t.setElement(n), t;} }, { key: "_generateUUID", value: function value() {var e = this.tim.context;return "".concat(e.SDKAppID, "-").concat(e.identifier, "-").concat(function () {for (var e = "", t = 32; t > 0; --t) {e += As[Math.floor(Math.random() * Rs)];}return e;}());} }, { key: "_generateTjgID", value: function value(e) {return this.tim.context.tinyID + "-" + e.random;} }, { key: "getMessageOptionByID", value: function value(e) {return this.messageOptionMap.get(e);} }]), n;}(og),n_ = function () {function e(t) {kn(this, e), this.userID = "", this.avatar = "", this.nick = "", this.role = "", this.joinTime = "", this.lastSendMsgTime = "", this.nameCard = "", this.muteUntil = 0, this.memberCustomField = [], this._initMember(t);}return An(e, [{ key: "_initMember", value: function value(e) {this.updateMember(e);} }, { key: "updateMember", value: function value(e) {var t = [null, void 0, "", 0, NaN];e.memberCustomField && Ps(this.memberCustomField, e.memberCustomField), Es(this, e, ["memberCustomField"], t);} }, { key: "updateRole", value: function value(e) {["Owner", "Admin", "Member"].indexOf(e) < 0 || (this.role = e);} }, { key: "updateMuteUntil", value: function value(e) {ms(e) || (this.muteUntil = Math.floor((Date.now() + 1e3 * e) / 1e3));} }, { key: "updateNameCard", value: function value(e) {ms(e) || (this.nameCard = e);} }, { key: "updateMemberCustomField", value: function value(e) {e && Ps(this.memberCustomField, e);} }]), e;}(),r_ = function () {function e(t) {kn(this, e), this.tim = t.tim, this.groupController = t.groupController, this._initListeners();}return An(e, [{ key: "_initListeners", value: function value() {this.tim.innerEmitter.on(pd, this._onReceivedGroupTips, this);} }, { key: "_onReceivedGroupTips", value: function value(e) {var t = this,n = e.data,r = n.result;n.isGroupTip && r.forEach(function (e) {switch (e.payload.operationType) {case 1:t._onNewMemberComeIn(e);break;case 2:t._onMemberQuit(e);break;case 3:t._onMemberKickedOut(e);break;case 4:t._onMemberSetAdmin(e);break;case 5:t._onMemberCancelledAdmin(e);break;case 6:t._onGroupProfileModified(e);break;case 7:t._onMemberInfoModified(e);break;default:cs.warn("GroupTipsHandler._onReceivedGroupTips Unhandled groupTips. operationType=", e.payload.operationType);}});} }, { key: "_onNewMemberComeIn", value: function value(e) {var t = e.payload,n = t.memberNum,r = t.groupProfile.groupID,o = this.groupController.getLocalGroupProfile(r);o && ps(n) && (o.memberNum = n);} }, { key: "_onMemberQuit", value: function value(e) {var t = e.payload,n = t.memberNum,r = t.groupProfile.groupID,o = this.groupController.getLocalGroupProfile(r);o && ps(n) && (o.memberNum = n), this.groupController.deleteLocalGroupMembers(r, e.payload.userIDList);} }, { key: "_onMemberKickedOut", value: function value(e) {var t = e.payload,n = t.memberNum,r = t.groupProfile.groupID,o = this.groupController.getLocalGroupProfile(r);o && ps(n) && (o.memberNum = n), this.groupController.deleteLocalGroupMembers(r, e.payload.userIDList);} }, { key: "_onMemberSetAdmin", value: function value(e) {var t = this,n = e.payload.groupProfile.groupID;e.payload.userIDList.forEach(function (e) {var r = t.groupController.getLocalGroupMemberInfo(n, e);r && r.updateRole(pn.GRP_MBR_ROLE_ADMIN);});} }, { key: "_onMemberCancelledAdmin", value: function value(e) {var t = this,n = e.payload.groupProfile.groupID;e.payload.userIDList.forEach(function (e) {var r = t.groupController.getLocalGroupMemberInfo(n, e);r && r.updateRole(pn.GRP_MBR_ROLE_MEMBER);});} }, { key: "_onGroupProfileModified", value: function value(e) {var t = this,n = e.payload.newGroupProfile,r = e.payload.groupProfile.groupID,o = this.groupController.getLocalGroupProfile(r);Object.keys(n).forEach(function (e) {switch (e) {case "ownerID":t._ownerChaged(o, n);break;default:o[e] = n[e];}}), this.groupController.emitGroupListUpdate(!0, !0);} }, { key: "_ownerChaged", value: function value(e, t) {var n = e.groupID,r = this.groupController.getLocalGroupProfile(n),o = this.tim.context.identifier;if (o === t.ownerID) {r.updateGroup({ selfInfo: { role: pn.GRP_MBR_ROLE_OWNER } });var i = this.groupController.getLocalGroupMemberInfo(n, o),a = this.groupController.getLocalGroupProfile(n).ownerID,s = this.groupController.getLocalGroupMemberInfo(n, a);i && i.updateRole(pn.GRP_MBR_ROLE_OWNER), s && s.updateRole(pn.GRP_MBR_ROLE_MEMBER);}} }, { key: "_onMemberInfoModified", value: function value(e) {var t = this,n = e.payload.groupProfile.groupID;e.payload.memberList.forEach(function (e) {var r = t.groupController.getLocalGroupMemberInfo(n, e.userID);r && e.muteTime && r.updateMuteUntil(e.muteTime);});} }]), e;}(),o_ = function () {function e(t) {kn(this, e), this.groupController = t.groupController, this.tim = t.tim, this.pendencyMap = new Map(), this._initLiceners();}return An(e, [{ key: "_initLiceners", value: function value() {this.tim.innerEmitter.on(fd, this._onReceivedGroupSystemNotice, this), this.tim.innerEmitter.on(ad, this._clearGroupSystemNotice, this);} }, { key: "_clearGroupSystemNotice", value: function value() {var e = this;this.getPendencyList().then(function (t) {t.forEach(function (t) {e.pendencyMap.set("".concat(t.from, "_").concat(t.groupID, "_").concat(t.to), t);});var n = e.tim.messageController.getLocalMessageList(pn.CONV_SYSTEM),r = [];n.forEach(function (t) {var n = t.payload,o = n.operatorID,i = n.operationType,a = n.groupProfile;if (i === ol) {var s = "".concat(o, "_").concat(a.groupID, "_").concat(a.to),u = e.pendencyMap.get(s);u && ps(u.handled) && 0 !== u.handled && r.push(t);}}), e.groupController.deleteGroupSystemNotice({ messageList: r });});} }, { key: "getPendencyList", value: function value(e) {var t = this;return this.groupController.request({ name: "group", action: "getGroupPendency", param: { startTime: e && e.startTime ? e.startTime : 0, limit: e && e.limit ? e.limit : 10, handleAccount: this.tim.context.identifier } }).then(function (e) {var n = e.data,r = n.pendencyList;return 0 !== n.nextStartTime ? t.getPendencyList({ startTime: n.nextStartTime }).then(function (e) {return [].concat(Hn(r), Hn(e));}) : r;});} }, { key: "_onReceivedGroupSystemNotice", value: function value(e) {var t = this,n = e.data,r = n.result;"sync" !== n.type && r.forEach(function (e) {switch (e.payload.operationType) {case 1:t._onApplyGroupRequest(e);break;case 2:t._onApplyGroupRequestAgreed(e);break;case 3:t._onApplyGroupRequestRefused(e);break;case 4:t._onMemberKicked(e);break;case 5:t._onGroupDismissed(e);break;case 6:break;case 7:t._onInviteGroup(e);break;case 8:t._onQuitGroup(e);break;case 9:t._onSetManager(e);break;case 10:t._onDeleteManager(e);break;case 11:case 12:case 15:break;case 255:t.groupController.emitOuterEvent(ln.GROUP_SYSTEM_NOTICE_RECEIVED, { message: e, type: dl });}});} }, { key: "_onApplyGroupRequest", value: function value(e) {this.groupController.emitOuterEvent(ln.GROUP_SYSTEM_NOTICE_RECEIVED, { message: e, type: ol });} }, { key: "_onApplyGroupRequestAgreed", value: function value(e) {var t = this,n = e.payload.groupProfile.groupID;this.groupController.hasLocalGroup(n) || this.groupController.getGroupProfile({ groupID: n }).then(function (e) {var n = e.data.group;n && (t.groupController.updateGroupMap([n]), t.groupController.emitGroupListUpdate());}), this.groupController.emitOuterEvent(ln.GROUP_SYSTEM_NOTICE_RECEIVED, { message: e, type: il });} }, { key: "_onApplyGroupRequestRefused", value: function value(e) {this.groupController.emitOuterEvent(ln.GROUP_SYSTEM_NOTICE_RECEIVED, { message: e, type: al });} }, { key: "_onMemberKicked", value: function value(e) {var t = e.payload.groupProfile.groupID;this.groupController.hasLocalGroup(t) && this.groupController.deleteLocalGroupAndConversation(t), this.groupController.emitOuterEvent(ln.GROUP_SYSTEM_NOTICE_RECEIVED, { message: e, type: sl });} }, { key: "_onGroupDismissed", value: function value(e) {var t = e.payload.groupProfile.groupID,n = this.groupController.hasLocalGroup(t),r = this.groupController.AVChatRoomHandler;n && this.groupController.deleteLocalGroupAndConversation(t), r.checkJoinedAVChatRoomByID(t) && r.reset(), this.groupController.emitOuterEvent(ln.GROUP_SYSTEM_NOTICE_RECEIVED, { message: e, type: ul });} }, { key: "_onInviteGroup", value: function value(e) {var t = this,n = e.payload.groupProfile.groupID;this.groupController.hasLocalGroup(n) || this.groupController.getGroupProfile({ groupID: n }).then(function (e) {var n = e.data.group;n && (t.groupController.updateGroupMap([n]), t.groupController.emitGroupListUpdate());}), this.groupController.emitOuterEvent(ln.GROUP_SYSTEM_NOTICE_RECEIVED, { message: e, type: cl });} }, { key: "_onQuitGroup", value: function value(e) {var t = e.payload.groupProfile.groupID;this.groupController.hasLocalGroup(t) && this.groupController.deleteLocalGroupAndConversation(t), this.groupController.emitOuterEvent(ln.GROUP_SYSTEM_NOTICE_RECEIVED, { message: e, type: ll });} }, { key: "_onSetManager", value: function value(e) {var t = e.payload.groupProfile,n = t.to,r = t.groupID,o = this.groupController.getLocalGroupMemberInfo(r, n);o && o.updateRole(pn.GRP_MBR_ROLE_ADMIN), this.groupController.emitOuterEvent(ln.GROUP_SYSTEM_NOTICE_RECEIVED, { message: e, type: pl });} }, { key: "_onDeleteManager", value: function value(e) {var t = e.payload.groupProfile,n = t.to,r = t.groupID,o = this.groupController.getLocalGroupMemberInfo(r, n);o && o.updateRole(pn.GRP_MBR_ROLE_MEMBER), this.groupController.emitOuterEvent(ln.GROUP_SYSTEM_NOTICE_RECEIVED, { message: e, type: fl });} }, { key: "reset", value: function value() {this.pendencyMap.clear();} }]), e;}(),i_ = { 3: !0, 4: !0, 5: !0, 6: !0 },a_ = function () {function e(t) {var n = t.tim,r = t.groupController;kn(this, e), this.tim = n, this.groupController = r, this.AVChatRoomLoop = null, this.key = "", this.startSeq = 0, this.group = {};}return An(e, [{ key: "hasJoinedAVChatRoom", value: function value() {return !(!this.group || ms(this.group.groupID));} }, { key: "checkJoinedAVChatRoomByID", value: function value(e) {return !(!this.group && ms(this.group.groupID)) && e === this.group.groupID;} }, { key: "getJoinedAVChatRoom", value: function value() {return this.hasJoinedAVChatRoom() ? this.group : null;} }, { key: "_updateProperties", value: function value(e) {var t = this;Object.keys(e).forEach(function (n) {t[n] = e[n];});} }, { key: "start", value: function value() {var e = { key: this.key, startSeq: this.startSeq };if (null === this.AVChatRoomLoop) {var t = this.groupController.createTransportCapsule({ name: "AVChatRoom", action: "startLongPoll", param: e });this.AVChatRoomLoop = this.tim.connectionController.createRunLoop({ pack: t, before: this._updateRequestData.bind(this), success: this._handleSuccess.bind(this), fail: this._handleFailure.bind(this), isAVChatRoomLoop: !0 }), this.AVChatRoomLoop.start(), cs.log("AVChatRoomHandler.start message channel started");} else this.AVChatRoomLoop.isRunning() || this.AVChatRoomLoop.start();} }, { key: "stop", value: function value() {null !== this.AVChatRoomLoop && this.AVChatRoomLoop.isRunning() && (this.AVChatRoomLoop.abort(), this.AVChatRoomLoop.stop(), cs.log("AVChatRoomHandler.stop message channel stopped"));} }, { key: "startRunLoop", value: function value(e) {var t = this;return this._precheck().then(function () {var n = e.longPollingKey,r = e.group;return t._updateProperties({ key: n, startSeq: 0, group: r || {} }), t.groupController.updateGroupMap([r]), t.groupController.emitGroupListUpdate(!0, !1), t.start(), t.groupController.isLoggedIn() ? lg({ status: Ys.SUCCESS, group: r }) : lg({ status: Ys.SUCCESS });});} }, { key: "joinWithoutAuth", value: function value(e) {var t = this;return this.groupController.request({ name: "group", action: "applyJoinAVChatRoom", param: e }).then(function (n) {var r = n.data.longPollingKey;if (ms(r)) return pg(new Gl({ code: _p, message: Rf }));cs.log("AVChatRoomHandler.joinWithoutAuth ok. groupID:", e.groupID), t.groupController.emitInnerEvent(Hd), t.groupController.emitInnerEvent(Bd, e.groupID);var o = new Py({ groupID: e.groupID });return t.startRunLoop({ group: o, longPollingKey: r }), new sg({ status: Ys.SUCCESS });}).catch(function (t) {return cs.error("AVChatRoomHandler.joinWithoutAuth error:".concat(t.message, ". groupID:").concat(e.groupID)), pg(t);});} }, { key: "_precheck", value: function value() {if (!this.hasJoinedAVChatRoom()) return Promise.resolve();if (this.groupController.isLoggedIn()) {if (!(this.group.selfInfo.role === pn.GRP_MBR_ROLE_OWNER || this.group.ownerID === this.tim.loginInfo.identifier)) return this.groupController.quitGroup(this.group.groupID);this.groupController.deleteLocalGroupAndConversation(this.group.groupID);} else this.groupController.deleteLocalGroupAndConversation(this.group.groupID);return this.reset(), Promise.resolve();} }, { key: "_updateRequestData", value: function value(e) {e.StartSeq = this.startSeq, e.Key = this.key, this.tim.sumStatController.addTotalCount(gg);} }, { key: "_handleSuccess", value: function value(e) {this.tim.sumStatController.addSuccessCount(gg), this.tim.sumStatController.addCost(gg, e.data.timecost), this.startSeq = e.data.nextSeq, this.key = e.data.key, Array.isArray(e.data.rspMsgList) && e.data.rspMsgList.forEach(function (e) {e.to = e.groupID;}), e.data.rspMsgList && e.data.rspMsgList.length > 0 && this._dispatchNotice(e.data.rspMsgList), this.groupController.emitInnerEvent(bd);} }, { key: "_handleFailure", value: function value(e) {if (e.error) if ("ECONNABORTED" === e.error.code || e.error.code === Lp) {if (e.error.config) {var t = e.error.config.url,n = e.error.config.data;cs.log("AVChatRoomHandler._handleFailure request timed out. url=".concat(t, " data=").concat(n));} else cs.log("AVChatRoomHandler._handleFailure request timed out");} else cs.log("AVChatRoomHandler._handleFailure request failed due to network error");this.groupController.emitInnerEvent(Rd);} }, { key: "_dispatchNotice", value: function value(e) {if (gs(e) && 0 !== e.length) {for (var t = null, n = [], r = [], o = 0; o < e.length; o++) {i_[e[o].event] ? (t = this.packMessage(e[o], e[o].event), this.tim.messageController.hasLocalMessage(t.conversationID, t.ID) || (t.conversationType === pn.CONV_SYSTEM && r.push(t), n.push(t))) : cs.warn("AVChatRoomHandler._dispatchMessage 未处理的 event 类型：", e[o].event);}if (r.length > 0 && this.groupController.emitInnerEvent(fd, { result: r, eventDataList: [], type: "poll" }), 0 !== n.length) {var i = this.packConversationOption(n);i.length > 0 && this.groupController.emitInnerEvent(pd, { eventDataList: i, type: "poll" }), cs.debug("AVChatRoomHandler._dispatchNotice nums=".concat(n.length)), this.groupController.emitOuterEvent(ln.MESSAGE_RECEIVED, n);}}} }, { key: "packMessage", value: function value(e, t) {e.currentUser = this.tim.context.identifier, e.conversationType = 5 === t ? pn.CONV_SYSTEM : pn.CONV_GROUP, e.isSystemMessage = !!e.isSystemMessage;var n = new Vh(e),r = this.packElements(e, t);return n.setElement(r), n;} }, { key: "packElements", value: function value(e, t) {return 4 === t || 6 === t ? { type: pn.MSG_GRP_TIP, content: On({}, e.elements, { groupProfile: e.groupProfile }) } : 5 === t ? { type: pn.MSG_GRP_SYS_NOTICE, content: On({}, e.elements, { groupProfile: e.groupProfile }) } : this.tim.bigDataHallwayController.parseElements(e.elements, e.from);} }, { key: "packConversationOption", value: function value(e) {for (var t = new Map(), n = 0; n < e.length; n++) {var r = e[n],o = r.conversationID;if (t.has(o)) {var i = t.get(o);i.lastMessage = r, "in" === r.flow && i.unreadCount++;} else t.set(o, { conversationID: r.conversationID, unreadCount: "out" === r.flow ? 0 : 1, type: r.conversationType, subType: r.conversationSubType, lastMessage: r });}return Hn(t.values());} }, { key: "reset", value: function value() {null !== this.AVChatRoomLoop && (cs.log("AVChatRoomHandler.reset"), this.stop(), this.AVChatRoomLoop = null, this.key = "", this.startSeq = 0, this.group = {});} }]), e;}(),s_ = function (e) {Ln(n, e);var t = jn(n);function n(e) {var r;return kn(this, n), (r = t.call(this, e)).groupMap = new Map(), r.groupMemberListMap = new Map(), r.groupNoticeHandler = new o_({ tim: e, groupController: qn(r) }), r.groupTipsHandler = new r_({ tim: e, groupController: qn(r) }), r.AVChatRoomHandler = new a_({ tim: e, groupController: qn(r) }), r._initListeners(), r;}return An(n, [{ key: "createGroup", value: function value(e) {var t = this;if (!["Public", "Private", "ChatRoom", "AVChatRoom"].includes(e.type)) {var n = new Gl({ code: fp, message: Sf });return pg(n);}xs(e.type) && !ms(e.memberList) && e.memberList.length > 0 && (cs.warn("GroupController.createGroup 创建AVChatRoom时不能添加群成员，自动忽略该字段"), e.memberList = void 0), Gs(e.type) || ms(e.joinOption) || (cs.warn("GroupController.createGroup 创建Private/ChatRoom/AVChatRoom群时不能设置字段：joinOption，自动忽略该字段"), e.joinOption = void 0);var r = new Ig();return r.setMethod(Gg).setStart(), cs.log("GroupController.createGroup."), this.request({ name: "group", action: "create", param: e }).then(function (n) {if (r.setCode(0).setNetworkType(t.getNetworkType()).setText("groupType=".concat(e.type, " groupID=").concat(n.data.groupID)).setEnd(), cs.log("GroupController.createGroup ok. groupID:", n.data.groupID), e.type === pn.GRP_AVCHATROOM) return t.getGroupProfile({ groupID: n.data.groupID });t.updateGroupMap([On({}, e, { groupID: n.data.groupID })]);var o = t.tim.createCustomMessage({ to: n.data.groupID, conversationType: pn.CONV_GROUP, payload: { data: "group_create", extension: "".concat(t.tim.context.identifier, "创建群组") } });return t.tim.sendMessage(o), t.emitGroupListUpdate(), t.getGroupProfile({ groupID: n.data.groupID });}).then(function (e) {var t = e.data.group;return t.selfInfo.messageRemindType = pn.MSG_REMIND_ACPT_AND_NOTE, t.selfInfo.role = pn.GRP_MBR_ROLE_OWNER, e;}).catch(function (n) {return r.setText("groupType=".concat(e.type)), t.probeNetwork().then(function (e) {var t = Bn(e, 2),o = t[0],i = t[1];r.setError(n, o, i).setEnd();}), cs.error("GroupController.createGroup error:", n), pg(n);});} }, { key: "joinGroup", value: function value(e) {if (this.hasLocalGroup(e.groupID)) {var t = { status: pn.JOIN_STATUS_ALREADY_IN_GROUP };return lg(t);}if (e.type === pn.GRP_PRIVATE) {var n = new Gl({ code: hp, message: Ef });return pg(n);}return cs.log("GroupController.joinGroup. groupID:", e.groupID), this.isLoggedIn() ? this.applyJoinGroup(e) : this.AVChatRoomHandler.joinWithoutAuth(e);} }, { key: "quitGroup", value: function value(e) {var t = this;cs.log("GroupController.quitGroup. groupID:", e);var n = this.AVChatRoomHandler.checkJoinedAVChatRoomByID(e);if (n && !this.isLoggedIn()) return cs.log("GroupController.quitGroup anonymously ok. groupID:", e), this.deleteLocalGroupAndConversation(e), this.AVChatRoomHandler.reset(), lg({ groupID: e });var r = new Ig();return r.setMethod(Ug).setStart(), this.request({ name: "group", action: "quitGroup", param: { groupID: e } }).then(function () {return r.setCode(0).setNetworkType(t.getNetworkType()).setText("groupID=".concat(e)).setEnd(), cs.log("GroupController.quitGroup ok. groupID:", e), n && t.AVChatRoomHandler.reset(), t.deleteLocalGroupAndConversation(e), new sg({ groupID: e });}).catch(function (n) {return r.setText("groupID=".concat(e)), t.probeNetwork().then(function (e) {var t = Bn(e, 2),o = t[0],i = t[1];r.setError(n, o, i).setEnd();}), cs.error("GroupController.quitGroup error.  error:".concat(n, ". groupID:").concat(e)), pg(n);});} }, { key: "changeGroupOwner", value: function value(e) {var t = this;if (this.hasLocalGroup(e.groupID) && this.getLocalGroupProfile(e.groupID).type === pn.GRP_AVCHATROOM) return pg(new Gl({ code: dp, message: Tf }));if (e.newOwnerID === this.tim.loginInfo.identifier) return pg(new Gl({ code: gp, message: Df }));var n = new Ig();return n.setMethod(qg).setStart(), cs.log("GroupController.changeGroupOwner. groupID:", e.groupID), this.request({ name: "group", action: "changeGroupOwner", param: e }).then(function () {n.setCode(0).setNetworkType(t.getNetworkType()).setText("groupID=".concat(e.groupID)).setEnd(), cs.log("GroupController.changeGroupOwner ok. groupID:", e.groupID);var r = e.groupID,o = e.newOwnerID;t.groupMap.get(r).ownerID = o;var i = t.groupMemberListMap.get(r);if (i instanceof Map) {var a = i.get(t.tim.loginInfo.identifier);ms(a) || (a.updateRole("Member"), t.groupMap.get(r).selfInfo.role = "Member");var s = i.get(o);ms(s) || s.updateRole("Owner");}return t.emitGroupListUpdate(!0, !1), new sg({ group: t.groupMap.get(r) });}).catch(function (r) {return n.setText("groupID=".concat(e.groupID)), t.probeNetwork().then(function (e) {var t = Bn(e, 2),o = t[0],i = t[1];n.setError(r, o, i).setEnd();}), cs.error("GroupController.changeGroupOwner error:".concat(r, ". groupID:").concat(e.groupID)), pg(r);});} }, { key: "dismissGroup", value: function value(e) {var t = this;if (this.hasLocalGroup(e) && this.getLocalGroupProfile(e).type === pn.GRP_PRIVATE) return pg(new Gl({ code: mp, message: kf }));var n = new Ig();return n.setMethod(Fg).setStart(), cs.log("GroupController.dismissGroup. groupID:".concat(e)), this.request({ name: "group", action: "destroyGroup", param: { groupID: e } }).then(function () {return n.setCode(0).setNetworkType(t.getNetworkType()).setText("groupID=".concat(e)).setEnd(), cs.log("GroupController.dismissGroup ok. groupID:".concat(e)), t.deleteLocalGroupAndConversation(e), t.checkJoinedAVChatRoomByID(e) && t.AVChatRoomHandler.reset(), new sg({ groupID: e });}).catch(function (r) {return n.setText("groupID=".concat(e)), t.probeNetwork().then(function (e) {var t = Bn(e, 2),o = t[0],i = t[1];n.setError(r, o, i).setEnd();}), cs.error("GroupController.dismissGroup error:".concat(r, ". groupID:").concat(e)), pg(r);});} }, { key: "updateGroupProfile", value: function value(e) {var t = this;!this.hasLocalGroup(e.groupID) || Gs(this.getLocalGroupProfile(e.groupID).type) || ms(e.joinOption) || (cs.warn("GroupController.updateGroupProfile Private/ChatRoom/AVChatRoom群不能设置字段：joinOption，自动忽略该字段"), e.joinOption = void 0), ms(e.muteAllMembers) || (e.muteAllMembers ? e.muteAllMembers = "On" : e.muteAllMembers = "Off");var n = new Ig();return n.setMethod(jg).setStart(), n.setText("groupID=".concat(e.groupID)), cs.log("GroupController.updateGroupProfile. groupID:", e.groupID), this.request({ name: "group", action: "updateGroupProfile", param: e }).then(function () {(n.setCode(0).setNetworkType(t.getNetworkType()).setEnd(), cs.log("GroupController.updateGroupProfile ok. groupID:", e.groupID), t.hasLocalGroup(e.groupID)) && (t.groupMap.get(e.groupID).updateGroup(e), t._setStorageGroupList());return new sg({ group: t.groupMap.get(e.groupID) });}).catch(function (r) {return t.probeNetwork().then(function (e) {var t = Bn(e, 2),o = t[0],i = t[1];n.setError(r, o, i).setEnd();}), cs.log("GroupController.updateGroupProfile failed. error:".concat(Ts(r), " groupID:").concat(e.groupID)), pg(r);});} }, { key: "setGroupMemberRole", value: function value(e) {var t = this,n = e.groupID,r = e.userID,o = e.role,i = this.groupMap.get(n);if (i.selfInfo.role !== pn.GRP_MBR_ROLE_OWNER) return pg(new Gl({ code: Cp, message: Of }));if ([pn.GRP_PRIVATE, pn.GRP_AVCHATROOM].includes(i.type)) return pg(new Gl({ code: Mp, message: Lf }));if ([pn.GRP_MBR_ROLE_ADMIN, pn.GRP_MBR_ROLE_MEMBER].indexOf(o) < 0) return pg(new Gl({ code: Sp, message: Nf }));if (r === this.tim.loginInfo.identifier) return pg(new Gl({ code: Ep, message: Pf }));var a = new Ig();return a.setMethod(Yg).setStart(), a.setText("groupID=".concat(n, " userID=").concat(r, " role=").concat(o)), cs.log("GroupController.setGroupMemberRole. groupID:".concat(n, ". userID: ").concat(r)), this._modifyGroupMemberInfo({ groupID: n, userID: r, role: o }).then(function (e) {return a.setCode(0).setNetworkType(t.getNetworkType()).setEnd(), cs.log("GroupController.setGroupMemberRole ok. groupID:".concat(n, ". userID: ").concat(r)), new sg({ group: i, member: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Bn(t, 2),r = n[0],o = n[1];a.setError(e, r, o).setEnd();}), cs.error("GroupController.setGroupMemberRole error:".concat(e, ". groupID:").concat(n, ". userID:").concat(r)), pg(e);});} }, { key: "setGroupMemberMuteTime", value: function value(e) {var t = this,n = e.groupID,r = e.userID,o = e.muteTime;if (r === this.tim.loginInfo.identifier) return pg(new Gl({ code: Tp, message: Gf }));cs.log("GroupController.setGroupMemberMuteTime. groupID:".concat(n, ". userID: ").concat(r));var i = new Ig();return i.setMethod(Kg).setStart(), i.setText("groupID=".concat(n, " userID=").concat(r, " muteTime=").concat(o)), this._modifyGroupMemberInfo({ groupID: n, userID: r, muteTime: o }).then(function (e) {return i.setCode(0).setNetworkType(t.getNetworkType()).setEnd(), cs.log("GroupController.setGroupMemberMuteTime ok. groupID:".concat(n, ". userID: ").concat(r)), new sg({ group: t.getLocalGroupProfile(n), member: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Bn(t, 2),r = n[0],o = n[1];i.setError(e, r, o).setEnd();}), cs.error("GroupController.setGroupMemberMuteTime error:".concat(e, ". groupID:").concat(n, ". userID:").concat(r)), pg(e);});} }, { key: "setMessageRemindType", value: function value(e) {var t = this;cs.log("GroupController.setMessageRemindType. groupID:".concat(e.groupID, ". userID: ").concat(e.userID || this.tim.loginInfo.identifier));var n = e.groupID,r = e.messageRemindType;return this._modifyGroupMemberInfo({ groupID: n, messageRemindType: r, userID: this.tim.loginInfo.identifier }).then(function () {cs.log("GroupController.setMessageRemindType ok. groupID:".concat(e.groupID, ". userID: ").concat(e.userID || t.tim.loginInfo.identifier));var n = t.getLocalGroupProfile(e.groupID);return n && (n.selfInfo.messageRemindType = r), new sg({ group: n });}).catch(function (n) {return cs.error("GroupController.setMessageRemindType error:".concat(n, ". groupID:").concat(e.groupID, ". userID:").concat(e.userID || t.tim.loginInfo.identifier)), pg(n);});} }, { key: "setGroupMemberNameCard", value: function value(e) {var t = this,n = e.groupID,r = e.userID,o = void 0 === r ? this.tim.loginInfo.identifier : r,i = e.nameCard;cs.log("GroupController.setGroupMemberNameCard. groupID:".concat(n, ". userID: ").concat(o));var a = new Ig();return a.setMethod($g).setStart(), a.setText("groupID=".concat(n, " userID=").concat(o, " nameCard=").concat(i)), this._modifyGroupMemberInfo({ groupID: n, userID: o, nameCard: i }).then(function (e) {cs.log("GroupController.setGroupMemberNameCard ok. groupID:".concat(n, ". userID: ").concat(o)), a.setCode(0).setNetworkType(t.getNetworkType()).setEnd();var r = t.getLocalGroupProfile(n);return o === t.tim.loginInfo.identifier && r && r.setSelfNameCard(i), new sg({ group: r, member: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Bn(t, 2),r = n[0],o = n[1];a.setError(e, r, o).setEnd();}), cs.error("GroupController.setGroupMemberNameCard error:".concat(e, ". groupID:").concat(n, ". userID:").concat(o)), pg(e);});} }, { key: "setGroupMemberCustomField", value: function value(e) {var t = this,n = e.groupID,r = e.userID,o = void 0 === r ? this.tim.loginInfo.identifier : r,i = e.memberCustomField;cs.log("GroupController.setGroupMemberCustomField. groupID:".concat(n, ". userID: ").concat(o));var a = new Ig();return a.setMethod(zg).setStart(), a.setText("groupID=".concat(n, " userID=").concat(o, " memberCustomField=").concat(i)), this._modifyGroupMemberInfo({ groupID: n, userID: o, memberCustomField: i }).then(function (e) {return a.setCode(0).setNetworkType(t.getNetworkType()).setEnd(), cs.log("GroupController.setGroupMemberCustomField ok. groupID:".concat(n, ". userID: ").concat(o)), new sg({ group: t.groupMap.get(n), member: e });}).catch(function (e) {return t.probeNetwork().then(function (t) {var n = Bn(t, 2),r = n[0],o = n[1];a.setError(e, r, o).setEnd();}), cs.error("GroupController.setGroupMemberCustomField error:".concat(e, ". groupID:").concat(n, ". userID:").concat(o)), pg(e);});} }, { key: "getGroupList", value: function value(e) {var t = this,n = new Ig();n.setMethod(Bg).setStart(), cs.log("GroupController.getGroupList");var r = { introduction: "Introduction", notification: "Notification", createTime: "CreateTime", ownerID: "Owner_Account", lastInfoTime: "LastInfoTime", memberNum: "MemberNum", maxMemberNum: "MaxMemberNum", joinOption: "ApplyJoinOption", muteAllMembers: "ShutUpAllMember" },o = ["Type", "Name", "FaceUrl", "NextMsgSeq", "LastMsgTime"];return e && e.groupProfileFilter && e.groupProfileFilter.forEach(function (e) {r[e] && o.push(r[e]);}), this.request({ name: "group", action: "list", param: { responseFilter: { groupBaseInfoFilter: o, selfInfoFilter: ["Role", "JoinTime", "MsgFlag"] } } }).then(function (e) {var r = e.data.groups;return n.setCode(0).setNetworkType(t.getNetworkType()).setText(r.length).setEnd(), cs.log("GroupController.getGroupList ok. nums=".concat(r.length)), t._groupListTreeShaking(r), t.updateGroupMap(r), t.tempConversationList && (cs.log("GroupController.getGroupList update last message with tempConversationList, nums=".concat(t.tempConversationList.length)), t._handleUpdateGroupLastMessage({ data: t.tempConversationList }), t.tempConversationList = null), t.emitGroupListUpdate(), new sg({ groupList: t.getLocalGroups() });}).catch(function (e) {return t.probeNetwork().then(function (t) {var r = Bn(t, 2),o = r[0],i = r[1];n.setError(e, o, i).setEnd();}), cs.error("GroupController.getGroupList error: ", e), pg(e);});} }, { key: "getGroupMemberList", value: function value(e) {var t = this,n = e.groupID,r = e.offset,o = void 0 === r ? 0 : r,i = e.count,a = void 0 === i ? 15 : i;cs.log("GroupController.getGroupMemberList groupID: ".concat(n, " offset: ").concat(o, " count: ").concat(a));var s = [];return this.request({ name: "group", action: "getGroupMemberList", param: { groupID: n, offset: o, limit: a > 100 ? 100 : a, memberInfoFilter: ["Role", "NameCard", "ShutUpUntil"] } }).then(function (e) {var r = e.data,o = r.members,i = r.memberNum;return gs(o) && 0 !== o.length ? (t.hasLocalGroup(n) && (t.getLocalGroupProfile(n).memberNum = i), s = t._updateLocalGroupMemberMap(n, o), t.tim.getUserProfile({ userIDList: o.map(function (e) {return e.userID;}), tagList: [yl.NICK, yl.AVATAR] })) : Promise.resolve([]);}).then(function (e) {var r = e.data;if (!gs(r) || 0 === r.length) return lg({ memberList: [] });var o = r.map(function (e) {return { userID: e.userID, nick: e.nick, avatar: e.avatar };});return t._updateLocalGroupMemberMap(n, o), cs.log("GroupController.getGroupMemberList ok."), new sg({ memberList: s });}).catch(function (e) {return cs.error("GroupController.getGroupMemberList error: ", e), pg(e);});} }, { key: "getLocalGroups", value: function value() {return Hn(this.groupMap.values());} }, { key: "getLocalGroupProfile", value: function value(e) {return this.groupMap.get(e);} }, { key: "hasLocalGroup", value: function value(e) {return this.groupMap.has(e);} }, { key: "getLocalGroupMemberInfo", value: function value(e, t) {return this.groupMemberListMap.has(e) ? this.groupMemberListMap.get(e).get(t) : null;} }, { key: "setLocalGroupMember", value: function value(e, t) {if (this.groupMemberListMap.has(e)) this.groupMemberListMap.get(e).set(t.userID, t);else {var n = new Map().set(t.userID, t);this.groupMemberListMap.set(e, n);}} }, { key: "hasLocalGroupMember", value: function value(e, t) {return this.groupMemberListMap.has(e) && this.groupMemberListMap.get(e).has(t);} }, { key: "hasLocalGroupMemberMap", value: function value(e) {return this.groupMemberListMap.has(e);} }, { key: "getGroupProfile", value: function value(e) {var t = this;cs.log("GroupController.getGroupProfile. groupID:", e.groupID);var n = e.groupID,r = e.groupCustomFieldFilter,o = { groupIDList: [n], responseFilter: { groupBaseInfoFilter: ["Type", "Name", "Introduction", "Notification", "FaceUrl", "Owner_Account", "CreateTime", "InfoSeq", "LastInfoTime", "LastMsgTime", "MemberNum", "MaxMemberNum", "ApplyJoinOption", "NextMsgSeq", "ShutUpAllMember"], groupCustomFieldFilter: r } };return this.getGroupProfileAdvance(o).then(function (r) {var o,i = r.data,a = i.successGroupList,s = i.failureGroupList;return cs.log("GroupController.getGroupProfile ok. groupID:", e.groupID), s.length > 0 ? pg(s[0]) : (xs(a[0].type) && !t.hasLocalGroup(n) ? o = new Py(a[0]) : (t.updateGroupMap(a), o = t.getLocalGroupProfile(n)), o && o.selfInfo && !o.selfInfo.nameCard ? t.updateSelfInfo(o).then(function (e) {return new sg({ group: e });}) : new sg({ group: o }));}).catch(function (t) {return cs.error("GroupController.getGroupProfile error:".concat(t, ". groupID:").concat(e.groupID)), pg(t);});} }, { key: "getGroupMemberProfile", value: function value(e) {var t = this;cs.log("GroupController.getGroupMemberProfile groupID:".concat(e.groupID, " userIDList:").concat(e.userIDList.join(","))), e.userIDList.length > 50 && (e.userIDList = e.userIDList.slice(0, 50));var n = e.groupID,r = e.userIDList;return this._getGroupMemberProfileAdvance(On({}, e, { userIDList: r })).then(function (e) {var r = e.data.members;return gs(r) && 0 !== r.length ? (t._updateLocalGroupMemberMap(n, r), t.tim.getUserProfile({ userIDList: r.map(function (e) {return e.userID;}), tagList: [yl.NICK, yl.AVATAR] })) : lg([]);}).then(function (e) {var o = e.data.map(function (e) {return { userID: e.userID, nick: e.nick, avatar: e.avatar };});t._updateLocalGroupMemberMap(n, o);var i = r.filter(function (e) {return t.hasLocalGroupMember(n, e);}).map(function (e) {return t.getLocalGroupMemberInfo(n, e);});return new sg({ memberList: i });});} }, { key: "_getGroupMemberProfileAdvance", value: function value(e) {return this.request({ name: "group", action: "getGroupMemberProfile", param: On({}, e, { memberInfoFilter: e.memberInfoFilter ? e.memberInfoFilter : ["Role", "JoinTime", "NameCard", "ShutUpUntil"] }) });} }, { key: "updateSelfInfo", value: function value(e) {var t = e.groupID;cs.log("GroupController.updateSelfInfo groupID:", t);var n = { groupID: t, userIDList: [this.tim.loginInfo.identifier] };return this.getGroupMemberProfile(n).then(function (n) {var r = n.data.memberList;return cs.log("GroupController.updateSelfInfo ok. groupID:", t), e && 0 !== r.length && e.updateSelfInfo(r[0]), e;});} }, { key: "addGroupMember", value: function value(e) {var t = this.getLocalGroupProfile(e.groupID);if (xs(t.type)) {var n = new Gl({ code: yp, message: Af });return pg(n);}return e.userIDList = e.userIDList.map(function (e) {return { userID: e };}), cs.log("GroupController.addGroupMember. groupID:", e.groupID), this.request({ name: "group", action: "addGroupMember", param: e }).then(function (n) {var r = n.data.members;cs.log("GroupController.addGroupMember ok. groupID:", e.groupID);var o = r.filter(function (e) {return 1 === e.result;}).map(function (e) {return e.userID;}),i = r.filter(function (e) {return 0 === e.result;}).map(function (e) {return e.userID;}),a = r.filter(function (e) {return 2 === e.result;}).map(function (e) {return e.userID;});return 0 === o.length ? new sg({ successUserIDList: o, failureUserIDList: i, existedUserIDList: a }) : (t.memberNum += o.length, new sg({ successUserIDList: o, failureUserIDList: i, existedUserIDList: a, group: t }));}).catch(function (t) {return cs.error("GroupController.addGroupMember error:".concat(t, ", groupID:").concat(e.groupID)), pg(t);});} }, { key: "deleteGroupMember", value: function value(e) {var t = this;cs.log("GroupController.deleteGroupMember groupID:".concat(e.groupID, " userIDList:").concat(e.userIDList));var n = this.getLocalGroupProfile(e.groupID);return n.type === pn.GRP_AVCHATROOM ? pg(new Gl({ code: Ip, message: bf })) : this.request({ name: "group", action: "deleteGroupMember", param: e }).then(function () {return cs.log("GroupController.deleteGroupMember ok"), n.memberNum--, t.deleteLocalGroupMembers(e.groupID, e.userIDList), new sg({ group: n, userIDList: e.userIDList });}).catch(function (t) {return cs.error("GroupController.deleteGroupMember error:".concat(t.code, ", groupID:").concat(e.groupID)), pg(t);});} }, { key: "searchGroupByID", value: function value(e) {var t = { groupIDList: [e] };return cs.log("GroupController.searchGroupByID. groupID:".concat(e)), this.request({ name: "group", action: "searchGroupByID", param: t }).then(function (t) {var n = t.data.groupProfile;if (n[0].errorCode !== zs.SUCCESS) throw new Gl({ code: n[0].errorCode, message: n[0].errorInfo });return cs.log("GroupController.searchGroupByID ok. groupID:".concat(e)), new sg({ group: new Py(n[0]) });}).catch(function (t) {return cs.warn("GroupController.searchGroupByID error:".concat(Ts(t), ", groupID:").concat(e)), pg(t);});} }, { key: "applyJoinGroup", value: function value(e) {var t = this,n = new Ig();return n.setMethod(xg).setStart(), this.request({ name: "group", action: "applyJoinGroup", param: e }).then(function (r) {var o = r.data,i = o.joinedStatus,a = o.longPollingKey;switch (n.setCode(0).setNetworkType(t.getNetworkType()).setText("groupID=".concat(e.groupID, " joinedStatus=").concat(i)).setEnd(), cs.log("GroupController.joinGroup ok. groupID:", e.groupID), i) {case Ys.WAIT_APPROVAL:return new sg({ status: Ys.WAIT_APPROVAL });case Ys.SUCCESS:return t.getGroupProfile({ groupID: e.groupID }).then(function (n) {var r = n.data.group,o = { status: Ys.SUCCESS, group: r };return ms(a) ? new sg(o) : (t.emitInnerEvent(Bd, e.groupID), t.AVChatRoomHandler.startRunLoop({ longPollingKey: a, group: r }));});default:var s = new Gl({ code: vp, message: wf });return cs.error("GroupController.joinGroup error:".concat(s, ". groupID:").concat(e.groupID)), pg(s);}}).catch(function (r) {return n.setText("groupID=".concat(e.groupID)), t.probeNetwork().then(function (e) {var t = Bn(e, 2),o = t[0],i = t[1];n.setError(r, o, i).setEnd();}), cs.error("GroupController.joinGroup error:".concat(r, ". groupID:").concat(e.groupID)), pg(r);});} }, { key: "applyJoinAVChatRoom", value: function value(e) {return this.AVChatRoomHandler.applyJoinAVChatRoom(e);} }, { key: "handleGroupApplication", value: function value(e) {var t = this,n = e.message.payload,r = n.groupProfile.groupID,o = n.authentication,i = n.messageKey,a = n.operatorID;return cs.log("GroupController.handleApplication. groupID:", r), this.request({ name: "group", action: "handleApplyJoinGroup", param: On({}, e, { applicant: a, groupID: r, authentication: o, messageKey: i }) }).then(function () {return cs.log("GroupController.handleApplication ok. groupID:", r), t.deleteGroupSystemNotice({ messageList: [e.message] }), new sg({ group: t.getLocalGroupProfile(r) });}).catch(function (e) {return cs.error("GroupController.handleApplication error.  error:".concat(e, ". groupID:").concat(r)), pg(e);});} }, { key: "deleteGroupSystemNotice", value: function value(e) {var t = this;return gs(e.messageList) && 0 !== e.messageList.length ? (cs.log("GroupController.deleteGroupSystemNotice " + e.messageList.map(function (e) {return e.ID;})), this.request({ name: "group", action: "deleteGroupSystemNotice", param: { messageListToDelete: e.messageList.map(function (e) {return { from: pn.CONV_SYSTEM, messageSeq: e.clientSequence, messageRandom: e.random };}) } }).then(function () {return cs.log("GroupController.deleteGroupSystemNotice ok"), e.messageList.forEach(function (e) {t.tim.messageController.deleteLocalMessage(e);}), new sg();}).catch(function (e) {return cs.error("GroupController.deleteGroupSystemNotice error:", e), pg(e);})) : lg();} }, { key: "getGroupProfileAdvance", value: function value(e) {return gs(e.groupIDList) && e.groupIDList.length > 50 && (cs.warn("GroupController.getGroupProfileAdvance 获取群资料的数量不能超过50个"), e.groupIDList.length = 50), cs.log("GroupController.getGroupProfileAdvance. groupIDList:", e.groupIDList), this.request({ name: "group", action: "query", param: e }).then(function (e) {cs.log("GroupController.getGroupProfileAdvance ok.");var t = e.data.groups,n = t.filter(function (e) {return ms(e.errorCode) || e.errorCode === zs.SUCCESS;}),r = t.filter(function (e) {return e.errorCode && e.errorCode !== zs.SUCCESS;}).map(function (e) {return new Gl({ code: Number("500".concat(e.errorCode)), message: e.errorInfo, data: { groupID: e.groupID } });});return new sg({ successGroupList: n, failureGroupList: r });}).catch(function (t) {return cs.error("GroupController.getGroupProfileAdvance error:".concat(t, ". groupID:").concat(e.groupID)), pg(t);});} }, { key: "_deleteLocalGroup", value: function value(e) {return this.groupMap.delete(e), this.groupMemberListMap.delete(e), this._setStorageGroupList(), this.groupMap.has(e) && this.groupMemberListMap.has(e);} }, { key: "_initGroupList", value: function value() {var e = this,t = new Ig();t.setMethod(Hg).setStart(), cs.time(yg), cs.log("GroupController._initGroupList");var n = this._getStorageGroupList();gs(n) && n.length > 0 ? (n.forEach(function (t) {e.groupMap.set(t.groupID, new Py(t));}), this.emitGroupListUpdate(!0, !1), t.setCode(0).setNetworkType(this.getNetworkType()).setText(this.groupMap.size).setEnd()) : t.setCode(0).setNetworkType(this.getNetworkType()).setText(0).setEnd(), this.triggerReady(), cs.log("GroupController._initGroupList ok. initCost=".concat(cs.timeEnd(yg), "ms")), this.getGroupList();} }, { key: "_initListeners", value: function value() {var e = this.tim.innerEmitter;e.once(rd, this._initGroupList, this), e.on(Ud, this._handleUpdateGroupLastMessage, this), e.on(pd, this._handleReceivedGroupMessage, this), e.on(jd, this._handleProfileUpdated, this);} }, { key: "emitGroupListUpdate", value: function value() {var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],n = this.getLocalGroups();t && this.emitInnerEvent(Od, n), e && this.emitOuterEvent(ln.GROUP_LIST_UPDATED, n);} }, { key: "_handleReceivedGroupMessage", value: function value(e) {var t = this,n = e.data.eventDataList;Array.isArray(n) && n.forEach(function (e) {var n = e.conversationID.replace(pn.CONV_GROUP, "");t.groupMap.has(n) && (t.groupMap.get(n).nextMessageSeq = e.lastMessage.sequence + 1);});} }, { key: "_onReceivedGroupSystemNotice", value: function value(e) {var t = e.data;this.groupNoticeHandler._onReceivedGroupNotice(t);} }, { key: "_handleUpdateGroupLastMessage", value: function value(e) {var t = e.data;if (cs.log("GroupController._handleUpdateGroupLastMessage convNums=".concat(t.length, " groupNums=").concat(this.groupMap.size)), 0 !== this.groupMap.size) {for (var n, r, o, i = !1, a = 0, s = t.length; a < s; a++) {(n = t[a]).conversationID && n.type !== pn.CONV_GROUP && (r = n.conversationID.split(/^GROUP/)[1], (o = this.getLocalGroupProfile(r)) && (o.lastMessage = n.lastMessage, i = !0));}i && (this.groupMap = this._sortLocalGroupList(this.groupMap), this.emitGroupListUpdate(!0, !1));} else this.tempConversationList = t;} }, { key: "_sortLocalGroupList", value: function value(e) {var t = Hn(e).filter(function (e) {var t = Bn(e, 2);t[0];return !js(t[1].lastMessage);});return t.sort(function (e, t) {return t[1].lastMessage.lastTime - e[1].lastMessage.lastTime;}), new Map([].concat(Hn(t), Hn(e)));} }, { key: "_getStorageGroupList", value: function value() {return this.tim.storage.getItem("groupMap");} }, { key: "_setStorageGroupList", value: function value() {var e = this.getLocalGroups().filter(function (e) {var t = e.type;return !xs(t);}).slice(0, 20).map(function (e) {return { groupID: e.groupID, name: e.name, avatar: e.avatar, type: e.type };});this.tim.storage.setItem("groupMap", e);} }, { key: "updateGroupMap", value: function value(e) {var t = this;e.forEach(function (e) {t.groupMap.has(e.groupID) ? t.groupMap.get(e.groupID).updateGroup(e) : t.groupMap.set(e.groupID, new Py(e));}), this._setStorageGroupList();} }, { key: "_updateLocalGroupMemberMap", value: function value(e, t) {var n = this;return gs(t) && 0 !== t.length ? t.map(function (t) {return n.hasLocalGroupMember(e, t.userID) ? n.getLocalGroupMemberInfo(e, t.userID).updateMember(t) : n.setLocalGroupMember(e, new n_(t)), n.getLocalGroupMemberInfo(e, t.userID);}) : [];} }, { key: "deleteLocalGroupMembers", value: function value(e, t) {var n = this.groupMemberListMap.get(e);n && t.forEach(function (e) {n.delete(e);});} }, { key: "_modifyGroupMemberInfo", value: function value(e) {var t = this,n = e.groupID,r = e.userID;return this.request({ name: "group", action: "modifyGroupMemberInfo", param: e }).then(function () {if (t.hasLocalGroupMember(n, r)) {var o = t.getLocalGroupMemberInfo(n, r);return ms(e.muteTime) || o.updateMuteUntil(e.muteTime), ms(e.role) || o.updateRole(e.role), ms(e.nameCard) || o.updateNameCard(e.nameCard), ms(e.memberCustomField) || o.updateMemberCustomField(e.memberCustomField), o;}return t.getGroupMemberProfile({ groupID: n, userIDList: [r] }).then(function (e) {return Bn(e.data.memberList, 1)[0];});});} }, { key: "_groupListTreeShaking", value: function value(e) {for (var t = new Map(Hn(this.groupMap)), n = 0, r = e.length; n < r; n++) {t.delete(e[n].groupID);}this.AVChatRoomHandler.hasJoinedAVChatRoom() && t.delete(this.AVChatRoomHandler.group.groupID);for (var o = Hn(t.keys()), i = 0, a = o.length; i < a; i++) {this.groupMap.delete(o[i]);}} }, { key: "_handleProfileUpdated", value: function value(e) {for (var t = this, n = e.data, r = function r(e) {var r = n[e];t.groupMemberListMap.forEach(function (e) {e.has(r.userID) && e.get(r.userID).updateMember({ nick: r.nick, avatar: r.avatar });});}, o = 0; o < n.length; o++) {r(o);}} }, { key: "getJoinedAVChatRoom", value: function value() {return this.AVChatRoomHandler.getJoinedAVChatRoom();} }, { key: "deleteLocalGroupAndConversation", value: function value(e) {this._deleteLocalGroup(e), this.tim.conversationController.deleteLocalConversation("GROUP".concat(e)), this.emitGroupListUpdate(!0, !1);} }, { key: "checkJoinedAVChatRoomByID", value: function value(e) {return this.AVChatRoomHandler.checkJoinedAVChatRoomByID(e);} }, { key: "getGroupLastSequence", value: function value(e) {var t = this,n = new Ig();n.setMethod(Vg).setStart();var r = 0;if (this.hasLocalGroup(e)) {var o = this.getLocalGroupProfile(e);if (o.lastMessage.lastSequence > 0) return r = o.lastMessage.lastSequence, cs.log("GroupController.getGroupLastSequence got lastSequence=".concat(r, " from local group profile[lastMessage.lastSequence]. groupID=").concat(e)), n.setCode(0).setNetworkType(this.getNetworkType()).setText("got lastSequence=".concat(r, " from local group profile[lastMessage.lastSequence]. groupID=").concat(e)).setEnd(), Promise.resolve(r);if (o.nextMessageSeq > 1) return r = o.nextMessageSeq - 1, cs.log("GroupController.getGroupLastSequence got lastSequence=".concat(r, " from local group profile[nextMessageSeq]. groupID=").concat(e)), n.setCode(0).setNetworkType(this.getNetworkType()).setText("got lastSequence=".concat(r, " from local group profile[nextMessageSeq]. groupID=").concat(e)).setEnd(), Promise.resolve(r);}var i = "GROUP".concat(e),a = this.tim.conversationController.getLocalConversation(i);if (a && a.lastMessage.lastSequence) return r = a.lastMessage.lastSequence, cs.log("GroupController.getGroupLastSequence got lastSequence=".concat(r, " from local conversation profile[lastMessage.lastSequence]. groupID=").concat(e)), n.setCode(0).setNetworkType(this.getNetworkType()).setText("got lastSequence=".concat(r, " from local conversation profile[lastMessage.lastSequence]. groupID=").concat(e)).setEnd(), Promise.resolve(r);var s = { groupIDList: [e], responseFilter: { groupBaseInfoFilter: ["NextMsgSeq"] } };return this.getGroupProfileAdvance(s).then(function (o) {var i = o.data.successGroupList;return js(i) ? cs.log("GroupController.getGroupLastSequence successGroupList is empty. groupID=".concat(e)) : (r = i[0].nextMessageSeq - 1, cs.log("GroupController.getGroupLastSequence got lastSequence=".concat(r, " from getGroupProfileAdvance. groupID=").concat(e))), n.setCode(0).setNetworkType(t.getNetworkType()).setText("got lastSequence=".concat(r, " from getGroupProfileAdvance. groupID=").concat(e)).setEnd(), r;}).catch(function (r) {return t.probeNetwork().then(function (t) {var o = Bn(t, 2),i = o[0],a = o[1];n.setError(r, i, a).setText("get lastSequence failed from getGroupProfileAdvance. groupID=".concat(e)).setEnd();}), cs.warn("GroupController.getGroupLastSequence failed. ".concat(r)), pg(r);});} }, { key: "reset", value: function value() {this.groupMap.clear(), this.groupMemberListMap.clear(), this.resetReady(), this.groupNoticeHandler.reset(), this.AVChatRoomHandler.reset(), this.tim.innerEmitter.once(rd, this._initGroupList, this);} }]), n;}(og),u_ = function (e) {Ln(n, e);var t = jn(n);function n(e) {var r;kn(this, n), (r = t.call(this, e)).REALTIME_MESSAGE_TIMEOUT = 11e4, r.LONGPOLLING_ID_TIMEOUT = 3e5, r._currentState = pn.NET_STATE_CONNECTED, r._status = { OPENIM: { lastResponseReceivedTime: 0, jitterCount: 0, failedCount: 0 }, AVCHATROOM: { lastResponseReceivedTime: 0, jitterCount: 0, failedCount: 0 } };var o = r.tim.innerEmitter;return o.on(dd, r._onGetLongPollIDFailed, qn(r)), o.on(md, r._onOpenIMResponseOK, qn(r)), o.on(gd, r._onOpenIMRequestFailed, qn(r)), o.on(bd, r._onAVChatroomResponseOK, qn(r)), o.on(Rd, r._onAVChatroomRequestFailed, qn(r)), r;}return An(n, [{ key: "_onGetLongPollIDFailed", value: function value() {this._currentState !== pn.NET_STATE_DISCONNECTED && this._emitNetStateChangeEvent(pn.NET_STATE_DISCONNECTED);} }, { key: "_onOpenIMResponseOK", value: function value() {this._onResponseOK("OPENIM");} }, { key: "_onOpenIMRequestFailed", value: function value() {this._onRequestFailed("OPENIM");} }, { key: "_onAVChatroomResponseOK", value: function value() {this.isLoggedIn() || this._onResponseOK("AVCHATROOM");} }, { key: "_onAVChatroomRequestFailed", value: function value() {this.isLoggedIn() || this._onRequestFailed("AVCHATROOM");} }, { key: "_onResponseOK", value: function value(e) {var t = this._status[e],n = Date.now();if (0 !== t.lastResponseReceivedTime) {var r = n - t.lastResponseReceivedTime;if (cs.debug("StatusController._onResponseOK key=".concat(e, " currentState=").concat(this._currentState, " interval=").concat(r, " failedCount=").concat(t.failedCount, " jitterCount=").concat(t.jitterCount)), t.failedCount > 0 && (t.failedCount = 0, t.jitterCount += 1, this._currentState !== pn.NET_STATE_CONNECTED && this._emitNetStateChangeEvent(pn.NET_STATE_CONNECTED)), r <= this.REALTIME_MESSAGE_TIMEOUT) {if (t.jitterCount >= 3) {var o = new Ig();o.setMethod(Jg).setStart(), o.setCode(0).setText("".concat(e, "-").concat(r, "-").concat(t.jitterCount)).setNetworkType(this.getNetworkType()).setEnd(), t.jitterCount = 0;}} else if (r >= this.REALTIME_MESSAGE_TIMEOUT && r < this.LONGPOLLING_ID_TIMEOUT) {var i = new Ig();i.setMethod(Qg).setStart(), i.setCode(0).setText("".concat(e, "-").concat(r)).setNetworkType(this.getNetworkType()).setEnd(), cs.warn("StatusController._onResponseOK, fast start. key=".concat(e, " interval=").concat(r, " ms")), this.emitInnerEvent(vd);} else if (r >= this.LONGPOLLING_ID_TIMEOUT) {var a = new Ig();a.setMethod(Zg).setStart(), a.setCode(0).setText("".concat(e, "-").concat(r)).setNetworkType(this.getNetworkType()).setEnd(), cs.warn("StatusController._onResponseOK, slow start. key=".concat(e, " interval=").concat(r, " ms")), this.emitInnerEvent(yd);}t.lastResponseReceivedTime = n;} else t.lastResponseReceivedTime = n;} }, { key: "_onRequestFailed", value: function value(e) {var t = this,n = this._status[e];Date.now() - n.lastResponseReceivedTime >= this.LONGPOLLING_ID_TIMEOUT ? this._currentState !== pn.NET_STATE_DISCONNECTED && (cs.warn("StatusController._onRequestFailed, disconnected, longpolling unavailable more than 5min. key=".concat(e, " networkType=").concat(this.getNetworkType())), this._emitNetStateChangeEvent(pn.NET_STATE_DISCONNECTED)) : (n.failedCount += 1, n.failedCount > 5 ? this.probeNetwork().then(function (r) {var o = Bn(r, 2),i = o[0],a = o[1];i ? (t._currentState !== pn.NET_STATE_CONNECTING && t._emitNetStateChangeEvent(pn.NET_STATE_CONNECTING), cs.warn("StatusController._onRequestFailed, connecting, network jitter. key=".concat(e, " networkType=").concat(a))) : (t._currentState !== pn.NET_STATE_DISCONNECTED && t._emitNetStateChangeEvent(pn.NET_STATE_DISCONNECTED), cs.warn("StatusController._onRequestFailed, disconnected, longpolling unavailable. key=".concat(e, " networkType=").concat(a))), n.failedCount = 0, n.jitterCount = 0;}) : this._currentState === pn.NET_STATE_CONNECTED && this._emitNetStateChangeEvent(pn.NET_STATE_CONNECTING));} }, { key: "_emitNetStateChangeEvent", value: function value(e) {cs.log("StatusController._emitNetStateChangeEvent net state changed from ".concat(this._currentState, " to ").concat(e)), this._currentState = e, this.emitOuterEvent(ln.NET_STATE_CHANGE, { state: e });} }, { key: "reset", value: function value() {cs.log("StatusController.reset"), this._currentState = pn.NET_STATE_CONNECTED, this._status = { OPENIM: { lastResponseReceivedTime: 0, jitterCount: 0, failedCount: 0 }, AVCHATROOM: { lastResponseReceivedTime: 0, jitterCount: 0, failedCount: 0 } };} }]), n;}(og);function c_() {return null;}var l_ = function () {function e(t) {kn(this, e), this.tim = t, this.isWX = ba, this.storageQueue = new Map(), this.checkTimes = 0, this.checkTimer = setInterval(this._onCheckTimer.bind(this), 1e3), this._errorTolerantHandle();}return An(e, [{ key: "_errorTolerantHandle", value: function value() {!this.isWX && ms(window.localStorage) && (this.getItem = c_, this.setItem = c_, this.removeItem = c_, this.clear = c_);} }, { key: "_onCheckTimer", value: function value() {if (this.checkTimes++, this.checkTimes % 20 == 0) {if (0 === this.storageQueue.size) return;this._doFlush();}} }, { key: "_doFlush", value: function value() {try {var e,t = $n(this.storageQueue);try {for (t.s(); !(e = t.n()).done;) {var n = Bn(e.value, 2),r = n[0],o = n[1];this.isWX ? wx.setStorageSync(this._getKey(r), o) : localStorage.setItem(this._getKey(r), JSON.stringify(o));}} catch (i) {t.e(i);} finally {t.f();}this.storageQueue.clear();} catch (Y_) {cs.warn("Storage._doFlush error", Y_);}} }, { key: "_getPrefix", value: function value() {var e = this.tim.loginInfo,t = e.SDKAppID,n = e.identifier;return "TIM_".concat(t, "_").concat(n, "_");} }, { key: "getItem", value: function value(e) {var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];try {var n = t ? this._getKey(e) : e;return this.isWX ? wx.getStorageSync(n) : JSON.parse(localStorage.getItem(n));} catch (Y_) {cs.warn("Storage.getItem error:", Y_);}} }, { key: "setItem", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];if (n) {var o = r ? this._getKey(e) : e;this.isWX ? wx.setStorageSync(o, t) : localStorage.setItem(o, JSON.stringify(t));} else this.storageQueue.set(e, t);} }, { key: "clear", value: function value() {try {this.isWX ? wx.clearStorageSync() : localStorage.clear();} catch (Y_) {cs.warn("Storage.clear error:", Y_);}} }, { key: "removeItem", value: function value(e) {var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];try {var n = t ? this._getKey(e) : e;this.isWX ? wx.removeStorageSync(n) : localStorage.removeItem(n);} catch (Y_) {cs.warn("Storage.removeItem error:", Y_);}} }, { key: "getSize", value: function value(e) {var t = this,n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "b";try {var r = { size: 0, limitSize: 5242880, unit: n };if (Object.defineProperty(r, "leftSize", { enumerable: !0, get: function get() {return r.limitSize - r.size;} }), this.isWX && (r.limitSize = 1024 * wx.getStorageInfoSync().limitSize), e) r.size = JSON.stringify(this.getItem(e)).length + this._getKey(e).length;else if (this.isWX) {var o = wx.getStorageInfoSync(),i = o.keys;i.forEach(function (e) {r.size += JSON.stringify(wx.getStorageSync(e)).length + t._getKey(e).length;});} else for (var a in localStorage) {localStorage.hasOwnProperty(a) && (r.size += localStorage.getItem(a).length + a.length);}return this._convertUnit(r);} catch (Y_) {cs.warn("Storage.getSize error:", Y_);}} }, { key: "_convertUnit", value: function value(e) {var t = {},n = e.unit;for (var r in t.unit = n, e) {"number" == typeof e[r] && ("kb" === n.toLowerCase() ? t[r] = Math.round(e[r] / 1024) : "mb" === n.toLowerCase() ? t[r] = Math.round(e[r] / 1024 / 1024) : t[r] = e[r]);}return t;} }, { key: "_getKey", value: function value(e) {return "".concat(this._getPrefix()).concat(e);} }, { key: "reset", value: function value() {this._doFlush(), this.checkTimes = 0;} }]), e;}(),p_ = t(function (e) {var t = Object.prototype.hasOwnProperty,n = "~";function r() {}function o(e, t, n) {this.fn = e, this.context = t, this.once = n || !1;}function i(e, t, r, i, a) {if ("function" != typeof r) throw new TypeError("The listener must be a function");var s = new o(r, i || e, a),u = n ? n + t : t;return e._events[u] ? e._events[u].fn ? e._events[u] = [e._events[u], s] : e._events[u].push(s) : (e._events[u] = s, e._eventsCount++), e;}function a(e, t) {0 == --e._eventsCount ? e._events = new r() : delete e._events[t];}function s() {this._events = new r(), this._eventsCount = 0;}Object.create && (r.prototype = Object.create(null), new r().__proto__ || (n = !1)), s.prototype.eventNames = function () {var e,r,o = [];if (0 === this._eventsCount) return o;for (r in e = this._events) {t.call(e, r) && o.push(n ? r.slice(1) : r);}return Object.getOwnPropertySymbols ? o.concat(Object.getOwnPropertySymbols(e)) : o;}, s.prototype.listeners = function (e) {var t = n ? n + e : e,r = this._events[t];if (!r) return [];if (r.fn) return [r.fn];for (var o = 0, i = r.length, a = new Array(i); o < i; o++) {a[o] = r[o].fn;}return a;}, s.prototype.listenerCount = function (e) {var t = n ? n + e : e,r = this._events[t];return r ? r.fn ? 1 : r.length : 0;}, s.prototype.emit = function (e, t, r, o, i, a) {var s = n ? n + e : e;if (!this._events[s]) return !1;var u,c,l = this._events[s],p = arguments.length;if (l.fn) {switch (l.once && this.removeListener(e, l.fn, void 0, !0), p) {case 1:return l.fn.call(l.context), !0;case 2:return l.fn.call(l.context, t), !0;case 3:return l.fn.call(l.context, t, r), !0;case 4:return l.fn.call(l.context, t, r, o), !0;case 5:return l.fn.call(l.context, t, r, o, i), !0;case 6:return l.fn.call(l.context, t, r, o, i, a), !0;}for (c = 1, u = new Array(p - 1); c < p; c++) {u[c - 1] = arguments[c];}l.fn.apply(l.context, u);} else {var f,h = l.length;for (c = 0; c < h; c++) {switch (l[c].once && this.removeListener(e, l[c].fn, void 0, !0), p) {case 1:l[c].fn.call(l[c].context);break;case 2:l[c].fn.call(l[c].context, t);break;case 3:l[c].fn.call(l[c].context, t, r);break;case 4:l[c].fn.call(l[c].context, t, r, o);break;default:if (!u) for (f = 1, u = new Array(p - 1); f < p; f++) {u[f - 1] = arguments[f];}l[c].fn.apply(l[c].context, u);}}}return !0;}, s.prototype.on = function (e, t, n) {return i(this, e, t, n, !1);}, s.prototype.once = function (e, t, n) {return i(this, e, t, n, !0);}, s.prototype.removeListener = function (e, t, r, o) {var i = n ? n + e : e;if (!this._events[i]) return this;if (!t) return a(this, i), this;var s = this._events[i];if (s.fn) s.fn !== t || o && !s.once || r && s.context !== r || a(this, i);else {for (var u = 0, c = [], l = s.length; u < l; u++) {(s[u].fn !== t || o && !s[u].once || r && s[u].context !== r) && c.push(s[u]);}c.length ? this._events[i] = 1 === c.length ? c[0] : c : a(this, i);}return this;}, s.prototype.removeAllListeners = function (e) {var t;return e ? (t = n ? n + e : e, this._events[t] && a(this, t)) : (this._events = new r(), this._eventsCount = 0), this;}, s.prototype.off = s.prototype.removeListener, s.prototype.addListener = s.prototype.on, s.prefixed = n, s.EventEmitter = s, e.exports = s;}),f_ = function f_(e) {var t, n, r, o, i;return js(e.context) ? (t = "", n = 0, r = 0, o = 0, i = 1) : (t = e.context.a2Key, n = e.context.tinyID, r = e.context.SDKAppID, o = e.context.contentType, i = e.context.apn), { platform: Xh, websdkappid: Wh, v: zh, a2: t, tinyid: n, sdkappid: r, contentType: o, apn: i, reqtime: function reqtime() {return +new Date();} };},h_ = function () {function e(t) {kn(this, e), this.tim = t, this.tim.innerEmitter.on(td, this._update, this), this.tim.innerEmitter.on(nd, this._update, this), this.tim.innerEmitter.on(od, this._updateSpecifiedConfig, this), this._initConfig();}return An(e, [{ key: "_update", value: function value(e) {this._initConfig();} }, { key: "_updateSpecifiedConfig", value: function value(e) {var t = this;e.data.forEach(function (e) {t._set(e);});} }, { key: "get", value: function value(e) {var t = e.name,n = e.action,r = e.param,o = e.tjgID;if (ms(this.config[t]) || ms(this.config[t][n])) throw new Gl({ code: Gp, message: "".concat(Kf, ": PackageConfig.").concat(t) });var i = function e(t) {if (0 === Object.getOwnPropertyNames(t).length) return Object.create(null);var n = Array.isArray(t) ? [] : Object.create(null),r = "";for (var o in t) {null !== t[o] ? void 0 !== t[o] ? (r = Dn(t[o]), ["string", "number", "function", "boolean"].indexOf(r) >= 0 ? n[o] = t[o] : n[o] = e(t[o])) : n[o] = void 0 : n[o] = null;}return n;}(this.config[t][n]);return i.requestData = this._initRequestData(r, i), i.encode = this._initEncoder(i), i.decode = this._initDecoder(i), o && (i.queryString.tjg_id = o), i;} }, { key: "_set", value: function value(e) {var t = e.key,n = e.value;if (!1 != !!t) {var r = t.split(".");if (!(r.length <= 0)) {!function e(t, n, r, o) {var i = n[r];"object" === Dn(t[i]) ? e(t[i], n, r + 1, o) : t[i] = o;}(this.config, r, 0, n);}}} }, { key: "_initConfig", value: function value() {var e;this.config = {}, this.config.accessLayer = (e = this.tim, { create: null, query: { serverName: Zh.NAME.WEB_IM, cmd: Zh.CMD.ACCESS_LAYER, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: { platform: Xh, identifier: e.context.identifier, usersig: e.context.userSig, contentType: e.context.contentType, apn: null !== e.context ? e.context.apn : 1, websdkappid: Wh, v: zh }, requestData: {} }, update: null, delete: null }), this.config.login = function (e) {return { create: null, query: { serverName: Zh.NAME.OPEN_IM, cmd: Zh.CMD.LOGIN, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: { websdkappid: Wh, v: zh, platform: Xh, identifier: e.loginInfo.identifier, usersig: e.loginInfo.userSig, sdkappid: e.loginInfo.SDKAppID, accounttype: e.loginInfo.accountType, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: +new Date() / 1e3 }, requestData: { state: "Online" }, keyMaps: { request: { tinyID: "tinyId" }, response: { TinyId: "tinyID" } } }, update: null, delete: null };}(this.tim), this.config.logout = function (e) {return { create: null, query: { serverName: Zh.NAME.OPEN_IM, cmd: Zh.CMD.LOGOUT_ALL, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: { websdkappid: Wh, v: zh, platform: Xh, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : "", sdkappid: null !== e.loginInfo ? e.loginInfo.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : "", reqtime: +new Date() / 1e3 }, requestData: {} }, update: null, delete: null };}(this.tim), this.config.longPollLogout = function (e) {return { create: null, query: { serverName: Zh.NAME.OPEN_IM, cmd: Zh.CMD.LOGOUT_LONG_POLL, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: { websdkappid: Wh, v: zh, platform: Xh, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return Date.now();} }, requestData: { longPollID: "" }, keyMaps: { request: { longPollID: "LongPollingId" } } }, update: null, delete: null };}(this.tim), this.config.profile = function (e) {var t = f_(e),n = Zh.NAME.PROFILE,r = Zh.CHANNEL.XHR,o = Qh;return { query: { serverName: n, cmd: Zh.CMD.PORTRAIT_GET, channel: r, protocol: o, method: "POST", queryString: t, requestData: { fromAccount: "", userItem: [] }, keyMaps: { request: { toAccount: "To_Account", standardSequence: "StandardSequence", customSequence: "CustomSequence" } } }, update: { serverName: n, cmd: Zh.CMD.PORTRAIT_SET, channel: r, protocol: o, method: "POST", queryString: t, requestData: { fromAccount: "", profileItem: [{ tag: yl.NICK, value: "" }, { tag: yl.GENDER, value: "" }, { tag: yl.ALLOWTYPE, value: "" }, { tag: yl.AVATAR, value: "" }] } } };}(this.tim), this.config.group = function (e) {var t = { websdkappid: Wh, v: zh, platform: Xh, a2: null !== e.context && e.context.a2Key ? e.context.a2Key : void 0, tinyid: null !== e.context && e.context.tinyID ? e.context.tinyID : void 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, accounttype: null !== e.context ? e.context.accountType : 0 },n = { request: { ownerID: "Owner_Account", userID: "Member_Account", newOwnerID: "NewOwner_Account", maxMemberNum: "MaxMemberCount", groupCustomField: "AppDefinedData", memberCustomField: "AppMemberDefinedData", groupCustomFieldFilter: "AppDefinedDataFilter_Group", memberCustomFieldFilter: "AppDefinedDataFilter_GroupMember", messageRemindType: "MsgFlag", userIDList: "MemberList", groupIDList: "GroupIdList", applyMessage: "ApplyMsg", muteTime: "ShutUpTime", muteAllMembers: "ShutUpAllMember", joinOption: "ApplyJoinOption" }, response: { GroupIdList: "groups", MsgFlag: "messageRemindType", AppDefinedData: "groupCustomField", AppMemberDefinedData: "memberCustomField", AppDefinedDataFilter_Group: "groupCustomFieldFilter", AppDefinedDataFilter_GroupMember: "memberCustomFieldFilter", InfoSeq: "infoSequence", MemberList: "members", GroupInfo: "groups", ShutUpUntil: "muteUntil", ShutUpAllMember: "muteAllMembers", ApplyJoinOption: "joinOption" } };return { create: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.CREATE_GROUP, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: t, requestData: { type: pn.GRP_PRIVATE, name: void 0, groupID: void 0, ownerID: e.loginInfo.identifier, introduction: void 0, notification: void 0, avatar: void 0, maxMemberNum: void 0, joinOption: void 0, memberList: void 0, groupCustomField: void 0 }, keyMaps: n }, list: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.GET_JOINED_GROUPS, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: t, requestData: { userID: e.loginInfo.identifier, limit: void 0, offset: void 0, groupType: void 0, responseFilter: void 0 }, keyMaps: n }, query: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.GET_GROUP_INFO, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: t, requestData: { groupIDList: void 0, responseFilter: void 0 }, keyMaps: n }, getGroupMemberProfile: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.GET_GROUP_MEMBER_INFO, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: t, requestData: { groupID: void 0, userIDList: void 0, memberInfoFilter: void 0, memberCustomFieldFilter: void 0 }, keyMaps: { request: On({}, n.request, { userIDList: "Member_List_Account" }), response: n.response } }, getGroupMemberList: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.GET_GROUP_MEMBER_LIST, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: t, requestData: { groupID: void 0, limit: 0, offset: 0, memberRoleFilter: void 0, memberInfoFilter: void 0 }, keyMaps: n }, quitGroup: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.QUIT_GROUP, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: t, requestData: { groupID: void 0 } }, changeGroupOwner: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.CHANGE_GROUP_OWNER, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: t, requestData: { groupID: void 0, newOwnerID: void 0 }, keyMaps: n }, destroyGroup: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.DESTROY_GROUP, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: t, requestData: { groupID: void 0 } }, updateGroupProfile: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.MODIFY_GROUP_INFO, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: t, requestData: { groupID: void 0, name: void 0, introduction: void 0, notification: void 0, avatar: void 0, maxMemberNum: void 0, joinOption: void 0, groupCustomField: void 0, muteAllMembers: void 0 }, keyMaps: { request: On({}, n.request, { groupCustomField: "AppDefinedData" }), response: n.response } }, modifyGroupMemberInfo: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.MODIFY_GROUP_MEMBER_INFO, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: t, requestData: { groupID: void 0, userID: void 0, messageRemindType: void 0, nameCard: void 0, role: void 0, memberCustomField: void 0, muteTime: void 0 }, keyMaps: n }, addGroupMember: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.ADD_GROUP_MEMBER, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: t, requestData: { groupID: void 0, silence: void 0, userIDList: void 0 }, keyMaps: n }, deleteGroupMember: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.DELETE_GROUP_MEMBER, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: t, requestData: { groupID: void 0, userIDList: void 0, reason: void 0 }, keyMaps: { request: { userIDList: "MemberToDel_Account" } } }, searchGroupByID: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.SEARCH_GROUP_BY_ID, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: t, requestData: { groupIDList: void 0, responseFilter: { groupBasePublicInfoFilter: ["Type", "Name", "Introduction", "Notification", "FaceUrl", "CreateTime", "Owner_Account", "LastInfoTime", "LastMsgTime", "NextMsgSeq", "MemberNum", "MaxMemberNum", "ApplyJoinOption"] } }, keyMaps: { request: { groupIDList: "GroupIdList" } } }, applyJoinGroup: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.APPLY_JOIN_GROUP, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: t, requestData: { groupID: void 0, applyMessage: void 0, userDefinedField: void 0 }, keyMaps: n }, applyJoinAVChatRoom: { serverName: Zh.NAME.BIG_GROUP_NO_AUTH, cmd: Zh.CMD.APPLY_JOIN_GROUP, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: { websdkappid: Wh, v: zh, platform: Xh, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, accounttype: null !== e.context ? e.context.accountType : 0 }, requestData: { groupID: void 0, applyMessage: void 0, userDefinedField: void 0 }, keyMaps: n }, handleApplyJoinGroup: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.HANDLE_APPLY_JOIN_GROUP, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: t, requestData: { groupID: void 0, applicant: void 0, handleAction: void 0, handleMessage: void 0, authentication: void 0, messageKey: void 0, userDefinedField: void 0 }, keyMaps: { request: { applicant: "Applicant_Account", handleAction: "HandleMsg", handleMessage: "ApprovalMsg", messageKey: "MsgKey" }, response: { MsgKey: "messageKey" } } }, deleteGroupSystemNotice: { serverName: Zh.NAME.OPEN_IM, cmd: Zh.CMD.DELETE_GROUP_SYSTEM_MESSAGE, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: t, requestData: { messageListToDelete: void 0 }, keyMaps: { request: { messageListToDelete: "DelMsgList", messageSeq: "MsgSeq", messageRandom: "MsgRandom" } } }, getGroupPendency: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.GET_GROUP_PENDENCY, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: t, requestData: { startTime: void 0, limit: void 0, handleAccount: void 0 }, keyMaps: { request: { handleAccount: "Handle_Account" } } } };}(this.tim), this.config.longPollID = function (e) {return { create: {}, query: { serverName: Zh.NAME.OPEN_IM, cmd: Zh.CMD.GET_LONG_POLL_ID, channel: Zh.CHANNEL.XHR, protocol: Qh, queryString: { websdkappid: Wh, v: zh, platform: Xh, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: +new Date() / 1e3 }, requestData: {}, keyMaps: { response: { LongPollingId: "longPollingID" } } }, update: {}, delete: {} };}(this.tim), this.config.longPoll = function (e) {var t = { websdkappid: Wh, v: zh, platform: Xh, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, accounttype: null !== e.context ? e.loginInfo.accountType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: Math.ceil(+new Date() / 1e3) };return { create: {}, query: { serverName: Zh.NAME.OPEN_IM, cmd: Zh.CMD.LONG_POLL, channel: Zh.CHANNEL.AUTO, protocol: Qh, queryString: t, requestData: { timeout: null, cookie: { notifySeq: 0, noticeSeq: 0, longPollingID: 0 } }, keyMaps: { response: { C2cMsgArray: "C2CMessageArray", GroupMsgArray: "groupMessageArray", GroupTips: "groupTips", C2cNotifyMsgArray: "C2CNotifyMessageArray", ClientSeq: "clientSequence", MsgPriority: "priority", NoticeSeq: "noticeSequence", MsgContent: "content", MsgType: "type", MsgBody: "elements", ToGroupId: "to", Desc: "description", Ext: "extension" } } }, update: {}, delete: {} };}(this.tim), this.config.applyC2C = function (e) {var t = f_(e),n = Zh.NAME.FRIEND,r = Zh.CHANNEL.XHR,o = Qh;return { create: { serverName: n, cmd: Zh.CMD.FRIEND_ADD, channel: r, protocol: o, queryString: t, requestData: { fromAccount: "", addFriendItem: [] } }, get: { serverName: n, cmd: Zh.CMD.GET_PENDENCY, channel: r, protocol: o, queryString: t, requestData: { fromAccount: "", pendencyType: "Pendency_Type_ComeIn" } }, update: { serverName: n, cmd: Zh.CMD.RESPONSE_PENDENCY, channel: r, protocol: o, queryString: t, requestData: { fromAccount: "", responseFriendItem: [] } }, delete: { serverName: n, cmd: Zh.CMD.DELETE_PENDENCY, channel: r, protocol: o, queryString: t, requestData: { fromAccount: "", toAccount: [], pendencyType: "Pendency_Type_ComeIn" } } };}(this.tim), this.config.friend = function (e) {var t = f_(e),n = Zh.NAME.FRIEND,r = Zh.CHANNEL.XHR,o = Qh;return { get: { serverName: n, cmd: Zh.CMD.FRIEND_GET_ALL, channel: r, protocol: o, method: "POST", queryString: t, requestData: { fromAccount: "", timeStamp: 0, startIndex: 0, getCount: 100, lastStandardSequence: 0, tagList: ["Tag_Profile_IM_Nick", "Tag_SNS_IM_Remark"] }, keyMaps: { request: {}, response: {} } }, delete: { serverName: n, cmd: Zh.CMD.FRIEND_DELETE, channel: r, protocol: o, method: "POST", queryString: t, requestData: { fromAccount: "", toAccount: [], deleteType: "Delete_Type_Single" } } };}(this.tim), this.config.blacklist = function (e) {var t = f_(e);return { create: { serverName: Zh.NAME.FRIEND, cmd: Zh.CMD.ADD_BLACKLIST, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: t, requestData: { fromAccount: "", toAccount: [] } }, get: { serverName: Zh.NAME.FRIEND, cmd: Zh.CMD.GET_BLACKLIST, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: t, requestData: { fromAccount: "", startIndex: 0, maxLimited: 30, lastSequence: 0 } }, delete: { serverName: Zh.NAME.FRIEND, cmd: Zh.CMD.DELETE_BLACKLIST, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: t, requestData: { fromAccount: "", toAccount: [] } }, update: {} };}(this.tim), this.config.c2cMessage = function (e) {var t = { platform: Xh, websdkappid: Wh, v: zh, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} },n = { request: { fromAccount: "From_Account", toAccount: "To_Account", msgTimeStamp: "MsgTimeStamp", msgSeq: "MsgSeq", msgRandom: "MsgRandom", msgBody: "MsgBody", count: "MaxCnt", lastMessageTime: "LastMsgTime", messageKey: "MsgKey", peerAccount: "Peer_Account", data: "Data", description: "Desc", extension: "Ext", type: "MsgType", content: "MsgContent", sizeType: "Type", uuid: "UUID", imageUrl: "URL", fileUrl: "Url", remoteAudioUrl: "Url", remoteVideoUrl: "VideoUrl", thumbUUID: "ThumbUUID", videoUUID: "VideoUUID", videoUrl: "", downloadFlag: "Download_Flag" }, response: { MsgContent: "content", MsgTime: "time", Data: "data", Desc: "description", Ext: "extension", MsgKey: "messageKey", MsgType: "type", MsgBody: "elements", Download_Flag: "downloadFlag", ThumbUUID: "thumbUUID", VideoUUID: "videoUUID" } };return { create: { serverName: Zh.NAME.OPEN_IM, cmd: Zh.CMD.SEND_MESSAGE, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: t, requestData: { fromAccount: e.loginInfo.identifier, toAccount: "", msgTimeStamp: Math.ceil(+new Date() / 1e3), msgSeq: 0, msgRandom: 0, msgBody: [] }, keyMaps: n }, query: { serverName: Zh.NAME.OPEN_IM, cmd: Zh.CMD.GET_C2C_ROAM_MESSAGES, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: t, requestData: { peerAccount: "", count: 15, lastMessageTime: 0, messageKey: "", withRecalledMsg: 1 }, keyMaps: n }, update: null, delete: null };}(this.tim), this.config.c2cMessageWillBeRevoked = function (e) {var t = { platform: Xh, websdkappid: Wh, v: zh, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} };return { create: { serverName: Zh.NAME.OPEN_IM, cmd: Zh.CMD.REVOKE_C2C_MESSAGE, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: t, requestData: { msgInfo: { fromAccount: "", toAccount: "", msgTimeStamp: Math.ceil(+new Date() / 1e3), msgSeq: 0, msgRandom: 0 } }, keyMaps: { request: { msgInfo: "MsgInfo", fromAccount: "From_Account", toAccount: "To_Account", msgTimeStamp: "MsgTimeStamp", msgSeq: "MsgSeq", msgRandom: "MsgRandom", msgBody: "MsgBody" } } } };}(this.tim), this.config.groupMessage = function (e) {var t = { platform: Xh, websdkappid: Wh, v: zh, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} },n = { request: { to: "GroupId", extension: "Ext", data: "Data", description: "Desc", random: "Random", sequence: "ReqMsgSeq", count: "ReqMsgNumber", type: "MsgType", priority: "MsgPriority", content: "MsgContent", elements: "MsgBody", sizeType: "Type", uuid: "UUID", imageUrl: "URL", fileUrl: "Url", remoteAudioUrl: "Url", remoteVideoUrl: "VideoUrl", thumbUUID: "ThumbUUID", videoUUID: "VideoUUID", videoUrl: "", downloadFlag: "Download_Flag", clientSequence: "ClientSeq" }, response: { Random: "random", MsgTime: "time", MsgSeq: "sequence", ReqMsgSeq: "sequence", RspMsgList: "messageList", IsPlaceMsg: "isPlaceMessage", IsSystemMsg: "isSystemMessage", ToGroupId: "to", EnumFrom_AccountType: "fromAccountType", EnumTo_AccountType: "toAccountType", GroupCode: "groupCode", MsgPriority: "priority", MsgBody: "elements", MsgType: "type", MsgContent: "content", IsFinished: "complete", Download_Flag: "downloadFlag", ClientSeq: "clientSequence", ThumbUUID: "thumbUUID", VideoUUID: "videoUUID" } };return { create: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.SEND_GROUP_MESSAGE, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: t, requestData: { groupID: "", fromAccount: e.loginInfo.identifier, random: 0, clientSequence: 0, priority: "", msgBody: [] }, keyMaps: n }, query: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.GET_GROUP_ROAM_MESSAGES, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: t, requestData: { withRecalledMsg: 1, groupID: "", count: 15, sequence: "" }, keyMaps: n }, update: null, delete: null };}(this.tim), this.config.groupMessageWillBeRevoked = function (e) {var t = { platform: Xh, websdkappid: Wh, v: zh, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} };return { create: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.REVOKE_GROUP_MESSAGE, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: t, requestData: { to: "", msgSeqList: [] }, keyMaps: { request: { to: "GroupId", msgSeqList: "MsgSeqList", msgSeq: "MsgSeq" } } } };}(this.tim), this.config.conversation = function (e) {var t = { platform: Xh, websdkappid: Wh, v: zh, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1 };return { query: { serverName: Zh.NAME.RECENT_CONTACT, cmd: Zh.CMD.GET_CONVERSATION_LIST, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: t, requestData: { fromAccount: e.loginInfo.identifier, count: 0 }, keyMaps: { request: {}, response: { SessionItem: "conversations", ToAccount: "groupID", To_Account: "userID", UnreadMsgCount: "unreadCount", MsgGroupReadedSeq: "messageReadSeq" } } }, pagingQuery: { serverName: Zh.NAME.RECENT_CONTACT, cmd: Zh.CMD.PAGING_GET_CONVERSATION_LIST, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: t, requestData: { fromAccount: void 0, timeStamp: void 0, orderType: void 0 }, keyMaps: { request: {}, response: { SessionItem: "conversations", ToAccount: "groupID", To_Account: "userID", UnreadMsgCount: "unreadCount", MsgGroupReadedSeq: "messageReadSeq" } } }, delete: { serverName: Zh.NAME.RECENT_CONTACT, cmd: Zh.CMD.DELETE_CONVERSATION, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: t, requestData: { fromAccount: e.loginInfo.identifier, toAccount: void 0, type: 1, toGroupID: void 0 }, keyMaps: { request: { toGroupID: "ToGroupid" } } }, setC2CMessageRead: { serverName: Zh.NAME.OPEN_IM, cmd: Zh.CMD.SET_C2C_MESSAGE_READ, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: t, requestData: { C2CMsgReaded: void 0 }, keyMaps: { request: { lastMessageTime: "LastedMsgTime" } } }, setGroupMessageRead: { serverName: Zh.NAME.GROUP, cmd: Zh.CMD.SET_GROUP_MESSAGE_READ, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: t, requestData: { groupID: void 0, messageReadSeq: void 0 }, keyMaps: { request: { messageReadSeq: "MsgReadedSeq" } } } };}(this.tim), this.config.syncMessage = function (e) {var t = { platform: Xh, websdkappid: Wh, v: zh, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return [Math.ceil(+new Date()), Math.random()].join("");} };return { create: null, query: { serverName: Zh.NAME.OPEN_IM, cmd: Zh.CMD.GET_MESSAGES, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: t, requestData: { cookie: "", syncFlag: 0, needAbstract: 1 }, keyMaps: { request: { fromAccount: "From_Account", toAccount: "To_Account", from: "From_Account", to: "To_Account", time: "MsgTimeStamp", sequence: "MsgSeq", random: "MsgRandom", elements: "MsgBody" }, response: { MsgList: "messageList", SyncFlag: "syncFlag", To_Account: "to", From_Account: "from", ClientSeq: "clientSequence", MsgSeq: "sequence", NoticeSeq: "noticeSequence", NotifySeq: "notifySequence", MsgRandom: "random", MsgTimeStamp: "time", MsgContent: "content", ToGroupId: "groupID", MsgKey: "messageKey", GroupTips: "groupTips", MsgBody: "elements", MsgType: "type", C2CRemainingUnreadCount: "C2CRemainingUnreadList" } } }, update: null, delete: null };}(this.tim), this.config.AVChatRoom = function (e) {return { startLongPoll: { serverName: Zh.NAME.BIG_GROUP_LONG_POLLING_NO_AUTH, cmd: Zh.CMD.AVCHATROOM_LONG_POLL, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: { websdkappid: Wh, v: zh, platform: Xh, sdkappid: e.loginInfo.SDKAppID, accounttype: "792", apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} }, requestData: { USP: 1, startSeq: 1, holdTime: 90, key: void 0 }, keyMaps: { request: { USP: "USP" }, response: { ToGroupId: "groupID", MsgPriority: "priority" } } } };}(this.tim), this.config.cosUpload = function (e) {var t = { platform: Xh, websdkappid: Wh, v: zh, a2: null !== e.context ? e.context.a2Key : "", tinyid: null !== e.context ? e.context.tinyID : 0, sdkappid: null !== e.context ? e.context.SDKAppID : 0, contentType: null !== e.context ? e.context.contentType : 0, apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return Date.now();} };return { create: { serverName: Zh.NAME.OPEN_IM, cmd: Zh.CMD.FILE_UPLOAD, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: t, requestData: { appVersion: "2.1", fromAccount: "", toAccount: "", sequence: 0, time: function time() {return Math.ceil(Date.now() / 1e3);}, random: function random() {return ws();}, fileStrMd5: "", fileSize: "", serverVer: 1, authKey: "", busiId: 1, pkgFlag: 1, sliceOffset: 0, sliceSize: 0, sliceData: "", contentType: "application/x-www-form-urlencoded" }, keyMaps: { request: {}, response: {} } }, update: null, delete: null };}(this.tim), this.config.cosSig = function (e) {var t = { sdkappid: function sdkappid() {return e.loginInfo.SDKAppID;}, identifier: function identifier() {return e.loginInfo.identifier;}, userSig: function userSig() {return e.context.userSig;} };return { create: null, query: { serverName: Zh.NAME.IM_COS_SIGN, cmd: Zh.CMD.COS_SIGN, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: t, requestData: { cmd: "open_im_cos_svc", subCmd: "get_cos_token", duration: 300, version: 2 }, keyMaps: { request: { userSig: "usersig", subCmd: "sub_cmd", cmd: "cmd", duration: "duration", version: "version" }, response: { expired_time: "expiredTime", bucket_name: "bucketName", session_token: "sessionToken", tmp_secret_id: "secretId", tmp_secret_key: "secretKey" } } }, update: null, delete: null };}(this.tim), this.config.bigDataHallwayAuthKey = function (e) {return { create: null, query: { serverName: Zh.NAME.OPEN_IM, cmd: Zh.CMD.BIG_DATA_HALLWAY_AUTH_KEY, channel: Zh.CHANNEL.XHR, protocol: Qh, method: "POST", queryString: { websdkappid: Wh, v: zh, platform: Xh, sdkappid: e.loginInfo.SDKAppID, accounttype: "792", apn: null !== e.context ? e.context.apn : 1, reqtime: function reqtime() {return +new Date();} }, requestData: {} } };}(this.tim), this.config.ssoEventStat = function (e) {var t = { sdkappid: e.loginInfo.SDKAppID, reqtime: Math.ceil(+new Date() / 1e3) };return { create: { serverName: Zh.NAME.IM_OPEN_STAT, cmd: Zh.CMD.TIM_WEB_REPORT, channel: Zh.CHANNEL.AUTO, protocol: Qh, queryString: t, requestData: { table: "", report: [] }, keyMaps: { request: { table: "table", report: "report", SDKAppID: "sdkappid", version: "version", tinyID: "tinyid", userID: "userid", platform: "platform", method: "method", time: "time", start: "start", end: "end", cost: "cost", status: "status", codeint: "codeint", message: "message", pointer: "pointer", text: "text", msgType: "msgtype", networkType: "networktype", startts: "startts", endts: "endts", timespan: "timespan" } } }, query: {}, update: {}, delete: {} };}(this.tim), this.config.ssoSumStat = function (e) {var t = null;null !== e.context && (t = { sdkappid: e.context.SDKAppID, reqtime: Math.ceil(+new Date() / 1e3) });return { create: { serverName: Zh.NAME.IM_OPEN_STAT, cmd: Zh.CMD.TIM_WEB_REPORT, channel: Zh.CHANNEL.AUTO, protocol: Qh, queryString: t, requestData: { table: "", report: [] }, keyMaps: { request: { table: "table", report: "report", SDKAppID: "sdkappid", version: "version", tinyID: "tinyid", userID: "userid", item: "item", lpID: "lpid", platform: "platform", networkType: "networktype", total: "total", successRate: "successrate", avg: "avg", timespan: "timespan", time: "time" } } }, query: {}, update: {}, delete: {} };}(this.tim);} }, { key: "_initRequestData", value: function value(e, t) {if (void 0 === e) return Jd(t.requestData, this._getRequestMap(t), this.tim);var n = t.requestData,r = Object.create(null);for (var o in n) {if (Object.prototype.hasOwnProperty.call(n, o)) {if (r[o] = "function" == typeof n[o] ? n[o]() : n[o], void 0 === e[o]) continue;r[o] = e[o];}}return r = Jd(r, this._getRequestMap(t), this.tim);} }, { key: "_getRequestMap", value: function value(e) {if (e.keyMaps && e.keyMaps.request && Object.keys(e.keyMaps.request).length > 0) return e.keyMaps.request;} }, { key: "_initEncoder", value: function value(e) {switch (e.protocol) {case Qh:return function (e) {if ("string" === Dn(e)) try {return JSON.parse(e);} catch (Y_) {return e;}return e;};case Jh:return function (e) {return e;};default:return function (e) {return cs.warn("PackageConfig._initEncoder(), unknow response type, data: ", JSON.stringify(e)), e;};}} }, { key: "_initDecoder", value: function value(e) {switch (e.protocol) {case Qh:return function (e) {if ("string" === Dn(e)) try {return JSON.parse(e);} catch (Y_) {return e;}return e;};case Jh:return function (e) {return e;};default:return function (e) {return cs.warn("PackageConfig._initDecoder(), unknow response type, data: ", e), e;};}} }]), e;}(),d_ = Math.floor;Ae({ target: "Number", stat: !0 }, { isInteger: function isInteger(e) {return !m(e) && isFinite(e) && d_(e) === e;} });var g_ = function g_() {for (var e = [], t = m_(arguments), n = 0; n < arguments.length; n++) {Number.isInteger(arguments[n]) ? e.push(arguments[n]) : e.push(!0 == !!arguments[n] ? "1" : "0");}return e.join(t);},m_ = function m_(e) {var t = e.length,n = e[t - 1];if ("string" != typeof n) return "";if (n.length > 1) return "";var r = e[t - 1];return delete e[t - 1], e.length -= t === e.length ? 1 : 0, r;},v_ = { C2CMessageArray: 1, groupMessageArray: 1, groupTips: 1, C2CNotifyMessageArray: 1, profileModify: 1, friendListMod: 1 },y_ = function (e) {Ln(n, e);var t = jn(n);function n(e) {var r;return kn(this, n), (r = t.call(this, e))._initialization(), r;}return An(n, [{ key: "_initialization", value: function value() {this._syncOffset = "", this._syncNoticeList = [], this._syncEventArray = [], this._syncMessagesIsRunning = !1, this._syncMessagesFinished = !1, this._isLongPoll = !1, this._longPollID = 0, this._noticeSequence = 0, this._initializeListener(), this._runLoop = null, this._initShuntChannels();} }, { key: "_initShuntChannels", value: function value() {this._shuntChannels = Object.create(null), this._shuntChannels.C2CMessageArray = this._C2CMessageArrayChannel.bind(this), this._shuntChannels.groupMessageArray = this._groupMessageArrayChannel.bind(this), this._shuntChannels.groupTips = this._groupTipsChannel.bind(this), this._shuntChannels.C2CNotifyMessageArray = this._C2CNotifyMessageArrayChannel.bind(this), this._shuntChannels.profileModify = this._profileModifyChannel.bind(this), this._shuntChannels.friendListMod = this._friendListModChannel.bind(this);} }, { key: "_C2CMessageArrayChannel", value: function value(e, t, n) {this.emitInnerEvent(Cd, t);} }, { key: "_groupMessageArrayChannel", value: function value(e, t, n) {this.emitInnerEvent(Md, t);} }, { key: "_groupTipsChannel", value: function value(e, t, n) {var r = this;switch (e) {case 4:case 6:this.emitInnerEvent(Sd, t);break;case 5:t.forEach(function (e) {gs(e.elements.revokedInfos) ? r.emitInnerEvent(wd, t) : r.emitInnerEvent(Ed, { groupSystemNotices: t, type: n });});break;default:cs.log("NotificationController._groupTipsChannel unknown event=".concat(e, " type=").concat(n), t);}} }, { key: "_C2CNotifyMessageArrayChannel", value: function value(e, t, n) {this._isKickedoutNotice(t) ? this.emitInnerEvent(Id) : this._isSysCmdMsgNotify(t) ? this.emitInnerEvent(kd) : this._isC2CMessageRevokedNotify(t) && this.emitInnerEvent(Ad, t);} }, { key: "_profileModifyChannel", value: function value(e, t, n) {this.emitInnerEvent(Dd, t);} }, { key: "_friendListModChannel", value: function value(e, t, n) {this.emitInnerEvent(Td, t);} }, { key: "_dispatchNotice", value: function value(e) {var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "poll";if (gs(e)) for (var n = null, r = null, o = "", i = "", a = "", s = 0, u = 0, c = e.length; u < c; u++) {s = (n = e[u]).event, o = Object.keys(n).find(function (e) {return void 0 !== v_[e];}), ys(this._shuntChannels[o]) ? (r = n[o], "poll" === t && this._updatenoticeSequence(r), this._shuntChannels[o](s, r, t)) : ("poll" === t && this._updatenoticeSequence(), i = "".concat(qp), a = "".concat(zf, ": ").concat(s, ", ").concat(o), this.emitInnerEvent(xd, new Gl({ code: i, message: a, data: { payloadName: o, event: s } })), i = "", a = "");}} }, { key: "getLongPollID", value: function value() {return this._longPollID;} }, { key: "_IAmReady", value: function value() {this.triggerReady();} }, { key: "reset", value: function value() {this._noticeSequence = 0, this._resetSync(), this.closeNoticeChannel();} }, { key: "_resetSync", value: function value() {this._syncOffset = "", this._syncNoticeList = [], this._syncEventArray = [], this._syncMessagesIsRunning = !1, this._syncMessagesFinished = !1;} }, { key: "_setNoticeSeqInRequestData", value: function value(e) {e.Cookie.NoticeSeq = this._noticeSequence, this.tim.sumStatController.addTotalCount(dg);} }, { key: "_updatenoticeSequence", value: function value(e) {if (e) {var t = e[e.length - 1].noticeSequence;t && "number" == typeof t ? t <= this._noticeSequence || (this._noticeSequence = t) : this._noticeSequence++;} else this._noticeSequence++;} }, { key: "_initializeListener", value: function value() {var e = this.tim.innerEmitter;e.on(rd, this._startSyncMessages, this), e.on(Pd, this.closeNoticeChannel, this), e.on(vd, this._onFastStart, this);} }, { key: "openNoticeChannel", value: function value() {cs.log("NotificationController.openNoticeChannel"), this._getLongPollID();} }, { key: "closeNoticeChannel", value: function value() {cs.log("NotificationController.closeNoticeChannel"), (this._runLoop instanceof my || this._runLoop instanceof vy) && (this._runLoop.abort(), this._runLoop.stop()), this._longPollID = 0, this._isLongPoll = !1;} }, { key: "_getLongPollID", value: function value() {var e = this;if (0 === this._longPollID) {var t = new Ig();t.setMethod(Wg).setStart(), this.request({ name: "longPollID", action: "query" }).then(function (n) {var r = n.data.longPollingID;e._onGetLongPollIDSuccess(r), t.setCode(0).setText("longPollingID=".concat(r)).setNetworkType(e.getNetworkType()).setEnd();}).catch(function (n) {var r = new Gl({ code: n.code || Bp, message: n.message || Xf });e.emitInnerEvent(dd), e.emitInnerEvent(xd, r), e.probeNetwork().then(function (e) {var n = Bn(e, 2),o = n[0],i = n[1];t.setError(r, o, i).setEnd();});});} else this._onGetLongPollIDSuccess(this._longPollID);} }, { key: "_onGetLongPollIDSuccess", value: function value(e) {this.emitInnerEvent(od, [{ key: "long_poll_logout.query.requestData.longPollingID", value: e }, { key: "longPoll.query.requestData.cookie.longPollingID", value: e }]), this._longPollID = e, this._startLongPoll(), this._IAmReady(), this.tim.sumStatController.recordLongPollingID(this._longPollID);} }, { key: "_startLongPoll", value: function value() {if (!0 !== this._isLongPoll) {cs.log("NotificationController._startLongPoll...");var e = this.tim.connectionController,t = this.createTransportCapsule({ name: "longPoll", action: "query" });this._isLongPoll = !0, this._runLoop = e.createRunLoop({ pack: t, before: this._setNoticeSeqInRequestData.bind(this), success: this._onNoticeReceived.bind(this), fail: this._onNoticeFail.bind(this) }), this._runLoop.start();} else cs.log("NotificationController._startLongPoll is running...");} }, { key: "_onFastStart", value: function value() {this.closeNoticeChannel(), this.syncMessage();} }, { key: "_onNoticeReceived", value: function value(e) {var t = e.data;if (t.errorCode !== zs.SUCCESS) {var n = new Ig();n.setMethod(Xg).setStart(), n.setMessage(t.errorInfo).setCode(t.errorCode).setNetworkType(this.getNetworkType()).setEnd(), this._onResponseError(t);} else this.emitInnerEvent(md);this.tim.sumStatController.addSuccessCount(dg), this.tim.sumStatController.addCost(dg, t.timecost), e.data.eventArray && this._dispatchNotice(e.data.eventArray);} }, { key: "_onResponseError", value: function value(e) {switch (e.errorCode) {case Vp:cs.warn("NotificationController._onResponseError, longPollingID=".concat(this._longPollID, " was kicked out")), this.emitInnerEvent(_d), this.closeNoticeChannel();break;case Kp:case $p:this.emitInnerEvent(Gd);break;default:this.emitInnerEvent(xd, new Gl({ code: e.errorCode, message: e.errorInfo }));}} }, { key: "_onNoticeFail", value: function value(e) {if (e.error) if ("ECONNABORTED" === e.error.code || e.error.code === Lp) {if (e.error.config) {var t = e.error.config.url,n = e.error.config.data;cs.log("NotificationController._onNoticeFail request timed out. url=".concat(t, " data=").concat(n));} else cs.log("NotificationController._onNoticeFail request timed out.");} else cs.log("NotificationController._onNoticeFail request failed due to network error");this.emitInnerEvent(gd);} }, { key: "_isKickedoutNotice", value: function value(e) {return !!e[0].hasOwnProperty("kickoutMsgNotify");} }, { key: "_isSysCmdMsgNotify", value: function value(e) {if (!e[0]) return !1;var t = e[0];return !!Object.prototype.hasOwnProperty.call(t, "sysCmdMsgNotify");} }, { key: "_isC2CMessageRevokedNotify", value: function value(e) {var t = e[0];return !!Object.prototype.hasOwnProperty.call(t, "c2cMessageRevokedNotify");} }, { key: "_startSyncMessages", value: function value(e) {!0 !== this._syncMessagesFinished && this.syncMessage();} }, { key: "syncMessage", value: function value() {var e = this,t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;this._syncMessagesIsRunning = !0, this.request({ name: "syncMessage", action: "query", param: { cookie: t, syncFlag: n } }).then(function (t) {var n = t.data;switch (g_(n.cookie, n.syncFlag)) {case "00":case "01":e.emitInnerEvent(xd, { code: Fp, message: Wf });break;case "10":case "11":n.eventArray && e._dispatchNotice(n.eventArray, "sync"), e._syncNoticeList = e._syncNoticeList.concat(n.messageList), e.emitInnerEvent(id, { data: n.messageList, C2CRemainingUnreadList: n.C2CRemainingUnreadList }), e._syncOffset = n.cookie, e.syncMessage(n.cookie, n.syncFlag);break;case "12":n.eventArray && e._dispatchNotice(n.eventArray, "sync"), e.openNoticeChannel(), e._syncNoticeList = e._syncNoticeList.concat(n.messageList), e.emitInnerEvent(ad, { messageList: n.messageList, C2CRemainingUnreadList: n.C2CRemainingUnreadList }), e._syncOffset = n.cookie, e._syncNoticeList = [], e._syncMessagesIsRunning = !1, e._syncMessagesFinished = !0;}}).catch(function (t) {e._syncMessagesIsRunning = !1, cs.error("NotificationController.syncMessage failed. error:".concat(t));});} }]), n;}(og),__ = function (e) {Ln(n, e);var t = jn(n);function n(e) {var r;return kn(this, n), (r = t.call(this, e)).COSSDK = null, r._cosUploadMethod = null, r.expiredTimeLimit = 300, r.appid = 0, r.bucketName = "", r.ciUrl = "", r.directory = "", r.downloadUrl = "", r.uploadUrl = "", r.expiredTimeOut = r.expiredTimeLimit, r.region = "ap-shanghai", r.cos = null, r.cosOptions = { secretId: "", secretKey: "", sessionToken: "", expiredTime: 0 }, r._timer = 0, r.tim.innerEmitter.on(rd, r._init, qn(r)), r.triggerReady(), r;}return An(n, [{ key: "_expiredTimer", value: function value() {var e = this;this._timer = setInterval(function () {Math.ceil(Date.now() / 1e3) >= e.cosOptions.expiredTime - 60 && (e._getAuthorizationKey(), clearInterval(e._timer));}, 3e4);} }, { key: "_init", value: function value() {var e = ba ? "cos-wx-sdk" : "cos-js-sdk";this.COSSDK = this.tim.getPlugin(e), this.COSSDK ? this._getAuthorizationKey() : cs.warn("UploadController._init 没有检测到上传插件，将无法发送图片、音频、视频、文件等类型的消息。详细请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#registerPlugin");} }, { key: "_getAuthorizationKey", value: function value() {var e = this,t = Math.ceil(Date.now() / 1e3),n = new Ig();n.setMethod(Tg).setStart(), this.request({ name: "cosSig", action: "query", param: { duration: this.expiredTimeLimit } }).then(function (r) {cs.log("UploadController._getAuthorizationKey ok. data:", r.data);var o = r.data,i = o.expiredTime - t;n.setCode(0).setText("timeout=".concat(i, "s")).setNetworkType(e.getNetworkType()).setEnd(), e.appid = o.appid, e.bucketName = o.bucketName, e.ciUrl = o.ciUrl, e.directory = o.directory, e.downloadUrl = o.downloadUrl, e.uploadUrl = o.uploadUrl, e.expiredTimeOut = i, e.cosOptions = { secretId: o.secretId, secretKey: o.secretKey, sessionToken: o.sessionToken, expiredTime: o.expiredTime }, e._initUploaderMethod(), e._expiredTimer();}).catch(function (t) {e.probeNetwork().then(function (n) {var r = Bn(n, 2),o = r[0],i = r[1];e.setError(t, o, i).setEnd();}), cs.warn("UploadController._getAuthorizationKey failed. error:", t);});} }, { key: "_initUploaderMethod", value: function value() {var e = this;this.appid && (this.cos = ba ? new this.COSSDK({ ForcePathStyle: !0, getAuthorization: this._getAuthorization.bind(this) }) : new this.COSSDK({ getAuthorization: this._getAuthorization.bind(this) }), this._cosUploadMethod = ba ? function (t, n) {e.cos.postObject(t, n);} : function (t, n) {e.cos.uploadFiles(t, n);});} }, { key: "_getAuthorization", value: function value(e, t) {t({ TmpSecretId: this.cosOptions.secretId, TmpSecretKey: this.cosOptions.secretKey, XCosSecurityToken: this.cosOptions.sessionToken, ExpiredTime: this.cosOptions.expiredTime });} }, { key: "uploadImage", value: function value(e) {if (!e.file) return pg(new Gl({ code: Jl, message: uf }));var t = this._checkImageType(e.file);if (!0 !== t) return t;var n = this._checkImageMime(e.file);if (!0 !== n) return n;var r = this._checkImageSize(e.file);return !0 !== r ? r : this.upload(e);} }, { key: "_checkImageType", value: function value(e) {var t = "";return t = ba ? e.url.slice(e.url.lastIndexOf(".") + 1) : e.files[0].name.slice(e.files[0].name.lastIndexOf(".") + 1), Qf.indexOf(t.toLowerCase()) >= 0 || pg(new Gl({ coe: Ql, message: cf }));} }, { key: "_checkImageMime", value: function value(e) {return !0;} }, { key: "_checkImageSize", value: function value(e) {var t = 0;return 0 === (t = ba ? e.size : e.files[0].size) ? pg(new Gl({ code: zl, message: "".concat(of) })) : t < 20971520 || pg(new Gl({ coe: Zl, message: "".concat(lf) }));} }, { key: "uploadFile", value: function value(e) {var t = null;return e.file ? e.file.files[0].size > 104857600 ? (t = new Gl({ code: sp, message: yf }), pg(t)) : 0 === e.file.files[0].size ? (t = new Gl({ code: zl, message: "".concat(of) }), pg(t)) : this.upload(e) : (t = new Gl({ code: ap, message: vf }), pg(t));} }, { key: "uploadVideo", value: function value(e) {return e.file.videoFile.size > 104857600 ? pg(new Gl({ code: rp, message: "".concat(df) })) : 0 === e.file.videoFile.size ? pg(new Gl({ code: zl, message: "".concat(of) })) : -1 === Zf.indexOf(e.file.videoFile.type) ? pg(new Gl({ code: op, message: "".concat(gf) })) : ba ? this.handleVideoUpload({ file: e.file.videoFile }) : Ra ? this.handleVideoUpload(e) : void 0;} }, { key: "handleVideoUpload", value: function value(e) {var t = this;return new Promise(function (n, r) {t.upload(e).then(function (e) {n(e);}).catch(function () {t.upload(e).then(function (e) {n(e);}).catch(function () {r(new Gl({ code: np, message: hf }));});});});} }, { key: "uploadAudio", value: function value(e) {return e.file ? e.file.size > 20971520 ? pg(new Gl({ code: tp, message: "".concat(ff) })) : 0 === e.file.size ? pg(new Gl({ code: zl, message: "".concat(of) })) : this.upload(e) : pg(new Gl({ code: ep, message: pf }));} }, { key: "upload", value: function value(e) {var t = this;if (!ys(this._cosUploadMethod)) return cs.warn("UploadController.upload 没有检测到上传插件，将无法发送图片、音频、视频、文件等类型的消息。详细请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html#registerPlugin"), pg(new Gl({ code: Hl, message: Zp }));var n = new Ig();n.setMethod(Dg).setStart(), cs.time(_g);var r = ba ? e.file : e.file.files[0];return new Promise(function (o, i) {var a = ba ? t._createCosOptionsWXMiniApp(e) : t._createCosOptionsWeb(e),s = t;t._cosUploadMethod(a, function (e, a) {var u = Object.create(null);if (a) {if (e || gs(a.files) && a.files[0].error) {var c = new Gl({ code: ip, message: mf });return n.setError(c, !0, t.getNetworkType()).setEnd(), cs.log("UploadController.upload failed, error:", a.files[0].error), 403 === a.files[0].error.statusCode && (cs.warn("UploadController.upload failed. cos AccessKeyId was invalid, regain auth key!"), t._getAuthorizationKey()), void i(c);}u.fileName = r.name, u.fileSize = r.size, u.fileType = r.type.slice(r.type.indexOf("/") + 1).toLowerCase(), u.location = ba ? a.Location : a.files[0].data.Location;var l = cs.timeEnd(_g),p = s._formatFileSize(r.size),f = s._formatSpeed(1e3 * r.size / l),h = "size=".concat(p, ",time=").concat(l, "ms,speed=").concat(f);return cs.log("UploadController.upload success name=".concat(r.name, ",").concat(h)), o(u), void n.setCode(0).setNetworkType(t.getNetworkType()).setText(h).setEnd();}var d = new Gl({ code: ip, message: mf });n.setError(d, !0, s.getNetworkType()).setEnd(), cs.warn("UploadController.upload failed, error:", e), 403 === e.statusCode && (cs.warn("UploadController.upload failed. cos AccessKeyId was invalid, regain auth key!"), t._getAuthorizationKey()), i(d);});});} }, { key: "_formatFileSize", value: function value(e) {return e < 1024 ? e + "B" : e < 1048576 ? Math.floor(e / 1024) + "KB" : Math.floor(e / 1048576) + "MB";} }, { key: "_formatSpeed", value: function value(e) {return e <= 1048576 ? (e / 1024).toFixed(1) + "KB/s" : (e / 1048576).toFixed(1) + "MB/s";} }, { key: "_createCosOptionsWeb", value: function value(e) {var t = this.tim.context.identifier,n = this._genFileName(t, e.to, e.file.files[0].name);return { files: [{ Bucket: "".concat(this.bucketName, "-").concat(this.appid), Region: this.region, Key: "".concat(this.directory, "/").concat(n), Body: e.file.files[0] }], SliceSize: 1048576, onProgress: function onProgress(t) {if ("function" == typeof e.onProgress) try {e.onProgress(t.percent);} catch (n) {cs.warn("onProgress callback error:"), cs.error(n);}}, onFileFinish: function onFileFinish(e, t, n) {} };} }, { key: "_createCosOptionsWXMiniApp", value: function value(e) {var t = this.tim.context.identifier,n = this._genFileName(t, e.to, e.file.name),r = e.file.url;return { Bucket: "".concat(this.bucketName, "-").concat(this.appid), Region: this.region, Key: "".concat(this.directory, "/").concat(n), FilePath: r, onProgress: function onProgress(t) {if (cs.log(JSON.stringify(t)), "function" == typeof e.onProgress) try {e.onProgress(t.percent);} catch (n) {cs.warn("onProgress callback error:"), cs.error(n);}} };} }, { key: "_genFileName", value: function value(e, t, n) {return "".concat(e, "-").concat(t, "-").concat(ws(99999), "-").concat(n);} }, { key: "reset", value: function value() {this._timer && (clearInterval(this._timer), this._timer = 0);} }]), n;}(og),I_ = function (e) {Ln(n, e);var t = jn(n);function n(e) {var r;return kn(this, n), (r = t.call(this, e)).FILETYPE = { SOUND: 2106, FILE: 2107, VIDEO: 2113 }, r._bdh_download_server = "grouptalk.c2c.qq.com", r._BDHBizID = 10001, r._authKey = "", r._expireTime = 0, r.tim.innerEmitter.on(rd, r._getAuthKey, qn(r)), r;}return An(n, [{ key: "_getAuthKey", value: function value() {var e = this;this.request({ name: "bigDataHallwayAuthKey", action: "query" }).then(function (t) {t.data.authKey && (e._authKey = t.data.authKey, e._expireTime = parseInt(t.data.expireTime));});} }, { key: "_isFromOlderVersion", value: function value(e) {return 2 !== e.content.downloadFlag;} }, { key: "parseElements", value: function value(e, t) {if (!gs(e) || !t) return [];for (var n = [], r = null, o = 0; o < e.length; o++) {r = e[o], this._needParse(r) ? n.push(this._parseElement(r, t)) : n.push(e[o]);}return n;} }, { key: "_needParse", value: function value(e) {return !(!this._isFromOlderVersion(e) || e.type !== pn.MSG_AUDIO && e.type !== pn.MSG_FILE && e.type !== pn.MSG_VIDEO);} }, { key: "_parseElement", value: function value(e, t) {switch (e.type) {case pn.MSG_AUDIO:return this._parseAudioElement(e, t);case pn.MSG_FILE:return this._parseFileElement(e, t);case pn.MSG_VIDEO:return this._parseVideoElement(e, t);}} }, { key: "_parseAudioElement", value: function value(e, t) {return e.content.url = this._genAudioUrl(e.content.uuid, t), e;} }, { key: "_parseFileElement", value: function value(e, t) {return e.content.url = this._genFileUrl(e.content.uuid, t, e.content.fileName), e;} }, { key: "_parseVideoElement", value: function value(e, t) {return e.content.url = this._genVideoUrl(e.content.uuid, t), e;} }, { key: "_genAudioUrl", value: function value(e, t) {return "" === this._authKey ? (cs.warn("BigDataHallwayController._genAudioUrl no authKey!"), "") : "https://".concat(this._bdh_download_server, "/asn.com/stddownload_common_file?authkey=").concat(this._authKey, "&bid=").concat(this._BDHBizID, "&subbid=").concat(this.tim.context.SDKAppID, "&fileid=").concat(e, "&filetype=").concat(this.FILETYPE.SOUND, "&openid=").concat(t, "&ver=0");} }, { key: "_genFileUrl", value: function value(e, t, n) {return "" === this._authKey ? (cs.warn("BigDataHallwayController._genFileUrl no authKey!"), "") : (n || (n = "".concat(Math.floor(1e5 * Math.random()), "-").concat(Date.now())), "https://".concat(this._bdh_download_server, "/asn.com/stddownload_common_file?authkey=").concat(this._authKey, "&bid=").concat(this._BDHBizID, "&subbid=").concat(this.tim.context.SDKAppID, "&fileid=").concat(e, "&filetype=").concat(this.FILETYPE.FILE, "&openid=").concat(t, "&ver=0&filename=").concat(encodeURIComponent(n)));} }, { key: "_genVideoUrl", value: function value(e, t) {return "" === this._authKey ? (cs.warn("BigDataHallwayController._genVideoUrl no authKey!"), "") : "https://".concat(this._bdh_download_server, "/asn.com/stddownload_common_file?authkey=").concat(this._authKey, "&bid=").concat(this._BDHBizID, "&subbid=").concat(this.tim.context.SDKAppID, "&fileid=").concat(e, "&filetype=").concat(this.FILETYPE.VIDEO, "&openid=").concat(t, "&ver=0");} }, { key: "reset", value: function value() {this._authKey = "", this.expireTime = 0;} }]), n;}(og),C_ = { app_id: "", event_id: "", api_base: "https://pingtas.qq.com/pingd", prefix: "_mta_", version: "1.3.9", stat_share_app: !1, stat_pull_down_fresh: !1, stat_reach_bottom: !1, stat_param: !0 };function M_() {try {var e = "s" + S_();return wx.setStorageSync(C_.prefix + "ssid", e), e;} catch (t) {}}function S_(e) {for (var t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], n = 10; 1 < n; n--) {var r = Math.floor(10 * Math.random()),o = t[r];t[r] = t[n - 1], t[n - 1] = o;}for (n = r = 0; 5 > n; n++) {r = 10 * r + t[n];}return (e || "") + (r + "") + +new Date();}function E_() {try {var e = getCurrentPages(),t = "/";return 0 < e.length && (t = e.pop().__route__), t;} catch (n) {console.log("get current page path error:" + n);}}function T_() {var e,t = { dm: "wechat.apps.xx", url: encodeURIComponent(E_() + w_(A_.Data.pageQuery)), pvi: "", si: "", ty: 0 };return t.pvi = ((e = function () {try {return wx.getStorageSync(C_.prefix + "auid");} catch (t) {}}()) || (e = function () {try {var t = S_();return wx.setStorageSync(C_.prefix + "auid", t), t;} catch (e) {}}(), t.ty = 1), e), t.si = function () {var e = function () {try {return wx.getStorageSync(C_.prefix + "ssid");} catch (e) {}}();return e || (e = M_()), e;}(), t;}function D_() {var e = function () {var e = wx.getSystemInfoSync();return { adt: encodeURIComponent(e.model), scl: e.pixelRatio, scr: e.windowWidth + "x" + e.windowHeight, lg: e.language, fl: e.version, jv: encodeURIComponent(e.system), tz: encodeURIComponent(e.platform) };}();return function (e) {wx.getNetworkType({ success: function success(t) {e(t.networkType);} });}(function (e) {try {wx.setStorageSync(C_.prefix + "ntdata", e);} catch (t) {}}), e.ct = wx.getStorageSync(C_.prefix + "ntdata") || "4g", e;}function k_() {var e,t = A_.Data.userInfo,n = [];for (e in t) {t.hasOwnProperty(e) && n.push(e + "=" + t[e]);}return t = n.join(";"), { r2: C_.app_id, r4: "wx", ext: "v=" + C_.version + (null !== t && "" !== t ? ";ui=" + encodeURIComponent(t) : "") };}function w_(e) {if (!C_.stat_param || !e) return "";e = function (e) {if (1 > C_.ignore_params.length) return e;var t,n = {};for (t in e) {0 <= C_.ignore_params.indexOf(t) || (n[t] = e[t]);}return n;}(e);var t,n = [];for (t in e) {n.push(t + "=" + e[t]);}return 0 < n.length ? "?" + n.join("&") : "";}var A_ = { App: { init: function init(e) {"appID" in e && (C_.app_id = e.appID), "eventID" in e && (C_.event_id = e.eventID), "statShareApp" in e && (C_.stat_share_app = e.statShareApp), "statPullDownFresh" in e && (C_.stat_pull_down_fresh = e.statPullDownFresh), "statReachBottom" in e && (C_.stat_reach_bottom = e.statReachBottom), "ignoreParams" in e && (C_.ignore_params = e.ignoreParams), "statParam" in e && (C_.stat_param = e.statParam), M_();try {"lauchOpts" in e && (A_.Data.lanchInfo = e.lauchOpts, A_.Data.lanchInfo.landing = 1);} catch (t) {}"autoReport" in e && e.autoReport && function () {var e = Page;Page = function Page(t) {var n = t.onLoad;t.onLoad = function (e) {n && n.call(this, e), A_.Data.lastPageQuery = A_.Data.pageQuery, A_.Data.pageQuery = e, A_.Data.lastPageUrl = A_.Data.pageUrl, A_.Data.pageUrl = E_(), A_.Data.show = !1, A_.Page.init();}, e(t);};}();} }, Page: { init: function init() {var e,t = getCurrentPages()[getCurrentPages().length - 1];t.onShow && (e = t.onShow, t.onShow = function () {if (!0 === A_.Data.show) {var t = A_.Data.lastPageQuery;A_.Data.lastPageQuery = A_.Data.pageQuery, A_.Data.pageQuery = t, A_.Data.lastPageUrl = A_.Data.pageUrl, A_.Data.pageUrl = E_();}A_.Data.show = !0, A_.Page.stat(), e.apply(this, arguments);}), C_.stat_pull_down_fresh && t.onPullDownRefresh && function () {var e = t.onPullDownRefresh;t.onPullDownRefresh = function () {A_.Event.stat(C_.prefix + "pulldownfresh", { url: t.__route__ }), e.apply(this, arguments);};}(), C_.stat_reach_bottom && t.onReachBottom && function () {var e = t.onReachBottom;t.onReachBottom = function () {A_.Event.stat(C_.prefix + "reachbottom", { url: t.__route__ }), e.apply(this, arguments);};}(), C_.stat_share_app && t.onShareAppMessage && function () {var e = t.onShareAppMessage;t.onShareAppMessage = function () {return A_.Event.stat(C_.prefix + "shareapp", { url: t.__route__ }), e.apply(this, arguments);};}();}, multiStat: function multiStat(e, t) {if (1 == t) A_.Page.stat(e);else {var n = getCurrentPages()[getCurrentPages().length - 1];n.onShow && function () {var t = n.onShow;n.onShow = function () {A_.Page.stat(e), t.call(this, arguments);};}();}}, stat: function stat(e) {if ("" != C_.app_id) {var t = [],n = k_();if (e && (n.r2 = e), e = [T_(), n, D_()], A_.Data.lanchInfo) {e.push({ ht: A_.Data.lanchInfo.scene }), A_.Data.pageQuery && A_.Data.pageQuery._mta_ref_id && e.push({ rarg: A_.Data.pageQuery._mta_ref_id });try {1 == A_.Data.lanchInfo.landing && (n.ext += ";lp=1", A_.Data.lanchInfo.landing = 0);} catch (i) {}}e.push({ rdm: "/", rurl: 0 >= A_.Data.lastPageUrl.length ? A_.Data.pageUrl + w_(A_.Data.lastPageQuery) : encodeURIComponent(A_.Data.lastPageUrl + w_(A_.Data.lastPageQuery)) }), e.push({ rand: +new Date() }), n = 0;for (var r = e.length; n < r; n++) {for (var o in e[n]) {e[n].hasOwnProperty(o) && t.push(o + "=" + (void 0 === e[n][o] ? "" : e[n][o]));}}wx.request({ url: C_.api_base + "?" + t.join("&").toLowerCase() });}} }, Event: { stat: function stat(e, t) {if ("" != C_.event_id) {var n = [],r = T_(),o = k_();r.dm = "wxapps.click", r.url = e, o.r2 = C_.event_id;var i,a = void 0 === t ? {} : t,s = [];for (i in a) {a.hasOwnProperty(i) && s.push(encodeURIComponent(i) + "=" + encodeURIComponent(a[i]));}for (a = s.join(";"), o.r5 = a, a = 0, o = (r = [r, o, D_(), { rand: +new Date() }]).length; a < o; a++) {for (var u in r[a]) {r[a].hasOwnProperty(u) && n.push(u + "=" + (void 0 === r[a][u] ? "" : r[a][u]));}}wx.request({ url: C_.api_base + "?" + n.join("&").toLowerCase() });}} }, Data: { userInfo: null, lanchInfo: null, pageQuery: null, lastPageQuery: null, pageUrl: "", lastPageUrl: "", show: !1 } },R_ = A_,b_ = function () {function e() {kn(this, e), this.cache = [], this.MtaWX = null, this._init();}return An(e, [{ key: "report", value: function value(e, t) {var n = this;try {Ra ? window.MtaH5 ? (window.MtaH5.clickStat(e, t), this.cache.forEach(function (e) {var t = e.name,r = e.param;window.MtaH5.clickStat(t, r), n.cache.shift();})) : this.cache.push({ name: e, param: t }) : ba && (this.MtaWX ? (this.MtaWX.Event.stat(e, t), this.cache.forEach(function (e) {var t = e.name,r = e.param;n.MtaWX.stat(t, r), n.cache.shift();})) : this.cache.push({ name: e, param: t }));} catch (Y_) {}} }, { key: "stat", value: function value() {try {Ra && window.MtaH5 ? window.MtaH5.pgv() : ba && this.MtaWX && this.MtaWX.Page.stat();} catch (Y_) {}} }, { key: "_init", value: function value() {try {if (Ra) {window._mtac = { autoReport: 0 };var e = document.createElement("script"),t = Ls();e.src = "".concat(t, "//pingjs.qq.com/h5/stats.js?v2.0.4"), e.setAttribute("name", "MTAH5"), e.setAttribute("sid", "500690998"), e.setAttribute("cid", "500691017");var n = document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e, n);} else ba && (this.MtaWX = R_, this.MtaWX.App.init({ appID: "500690995", eventID: "500691014", autoReport: !1, statParam: !0 }));} catch (Y_) {}} }]), e;}(),O_ = function (e) {Ln(n, e);var t = jn(n);function n(e) {var r;kn(this, n), (r = t.call(this, e)).MTA = new b_();var o = r.tim.innerEmitter;return o.on(Vd, r._stat, qn(r)), o.on(Hd, r._stat, qn(r)), r;}return An(n, [{ key: "_stat", value: function value() {this.MTA.report("sdkappid", { value: this.tim.context.SDKAppID }), this.MTA.report("version", { value: $_.VERSION }), this.MTA.stat();} }]), n;}(og),L_ = function () {function e(t) {kn(this, e), this._table = "timwebii", this._report = [];}return An(e, [{ key: "pushIn", value: function value(e) {cs.debug("SSOLogBody.pushIn", this._report.length, e), this._report.push(e);} }, { key: "backfill", value: function value(e) {var t;gs(e) && 0 !== e.length && (cs.debug("SSOLogBody.backfill", this._report.length, e.length), (t = this._report).unshift.apply(t, Hn(e)));} }, { key: "getLogsNumInMemory", value: function value() {return this._report.length;} }, { key: "isEmpty", value: function value() {return 0 === this._report.length;} }, { key: "_reset", value: function value() {this._report.length = 0, this._report = [];} }, { key: "getTable", value: function value() {return this._table;} }, { key: "getLogsInMemory", value: function value() {var e = this._report.slice();return this._reset(), e;} }]), e;}(),N_ = function (e) {Ln(n, e);var t = jn(n);function n(e) {var r;return kn(this, n), (r = t.call(this, e)).TAG = "im-ssolog-event", r._reportBody = new L_(), r._version = "2.6.2", r.MIN_THRESHOLD = 20, r.MAX_THRESHOLD = 100, r.WAITING_TIME = 6e4, r.INTERVAL = 2e4, r._timerID = 0, r._resetLastReportTime(), r._startReportTimer(), r._retryCount = 0, r.MAX_RETRY_COUNT = 3, r.tim.innerEmitter.on(Ld, r._onLoginSuccess, qn(r)), r;}return An(n, [{ key: "reportAtOnce", value: function value() {cs.debug("EventStatController.reportAtOnce"), this._report();} }, { key: "_onLoginSuccess", value: function value() {var e = this,t = this.tim.storage,n = t.getItem(this.TAG, !1);js(n) || (cs.log("EventStatController._onLoginSuccess get ssolog in storage, nums=" + n.length), n.forEach(function (t) {e._reportBody.pushIn(t);}), t.removeItem(this.TAG, !1));} }, { key: "pushIn", value: function value(e) {e instanceof Ig && (e.setCommonInfo(this.tim.context.SDKAppID, this._version, this.tim.context.tinyID, this.tim.loginInfo.identifier, this.getPlatform()), this._reportBody.pushIn(e), this._reportBody.getLogsNumInMemory() >= this.MIN_THRESHOLD && this._report());} }, { key: "_resetLastReportTime", value: function value() {this._lastReportTime = Date.now();} }, { key: "_startReportTimer", value: function value() {var e = this;this._timerID = setInterval(function () {Date.now() < e._lastReportTime + e.WAITING_TIME || e._reportBody.isEmpty() || e._report();}, this.INTERVAL);} }, { key: "_stopReportTimer", value: function value() {this._timerID > 0 && (clearInterval(this._timerID), this._timerID = 0);} }, { key: "_report", value: function value() {var e = this;if (!this._reportBody.isEmpty()) {var t = this._reportBody.getLogsInMemory();this.request({ name: "ssoEventStat", action: "create", param: { table: this._reportBody.getTable(), report: t } }).then(function () {e._resetLastReportTime(), e._retryCount > 0 && (cs.debug("EventStatController.report retry success"), e._retryCount = 0);}).catch(function (n) {if (cs.warn("EventStatController.report, online:".concat(e.getNetworkType(), " error:").concat(n)), e._reportBody.backfill(t), e._reportBody.getLogsNumInMemory() > e.MAX_THRESHOLD || e._retryCount === e.MAX_RETRY_COUNT || 0 === e._timerID) return e._retryCount = 0, void e._flushAtOnce();e._retryCount += 1;});}} }, { key: "_flushAtOnce", value: function value() {var e = this.tim.storage,t = e.getItem(this.TAG, !1),n = this._reportBody.getLogsInMemory();if (js(t)) cs.log("EventStatController._flushAtOnce nums=" + n.length), e.setItem(this.TAG, n, !0, !1);else {var r = n.concat(t);r.length > this.MAX_THRESHOLD && (r = r.slice(0, this.MAX_THRESHOLD)), cs.log("EventStatController._flushAtOnce nums=" + r.length), e.setItem(this.TAG, r, !0, !1);}} }, { key: "reset", value: function value() {cs.log("EventStatController.reset"), this._stopReportTimer(), this._report();} }]), n;}(og),P_ = "none",G_ = "online",x_ = function () {function e() {kn(this, e), this._networkType = "", this.maxWaitTime = 3e3;}return An(e, [{ key: "start", value: function value() {var e = this;ba ? (wx.getNetworkType({ success: function success(t) {e._networkType = t.networkType, t.networkType === P_ ? cs.warn("NetMonitor no network, please check!") : cs.info("NetMonitor networkType:".concat(t.networkType));} }), wx.onNetworkStatusChange(this._onWxNetworkStatusChange.bind(this))) : this._networkType = G_;} }, { key: "_onWxNetworkStatusChange", value: function value(e) {this._networkType = e.networkType, e.isConnected ? cs.info("NetMonitor networkType:".concat(e.networkType)) : cs.warn("NetMonitor no network, please check!");} }, { key: "probe", value: function value() {var e = this;return new Promise(function (t, n) {if (ba) wx.getNetworkType({ success: function success(n) {e._networkType = n.networkType, n.networkType === P_ ? (cs.warn("NetMonitor no network, please check!"), t([!1, n.networkType])) : (cs.info("NetMonitor networkType:".concat(n.networkType)), t([!0, n.networkType]));} });else if (window && window.fetch) fetch("".concat(Ls(), "//webim-1252463788.file.myqcloud.com/assets/test/speed.xml?random=").concat(Math.random())).then(function (e) {e.ok ? t([!0, G_]) : t([!1, P_]);}).catch(function (e) {t([!1, P_]);});else {var r = new XMLHttpRequest(),o = setTimeout(function () {cs.warn("NetMonitor fetch timeout. Probably no network, please check!"), r.abort(), e._networkType = P_, t([!1, P_]);}, e.maxWaitTime);r.onreadystatechange = function () {4 === r.readyState && (clearTimeout(o), 200 === r.status || 304 === r.status ? (this._networkType = G_, t([!0, G_])) : (cs.warn("NetMonitor fetch status:".concat(r.status, ". Probably no network, please check!")), this._networkType = P_, t([!1, P_])));}, r.open("GET", "".concat(Ls(), "//webim-1252463788.file.myqcloud.com/assets/test/speed.xml?random=").concat(Math.random())), r.send();}});} }, { key: "getNetworkType", value: function value() {return this._networkType;} }, { key: "reset", value: function value() {this._networkType = "";} }]), e;}(),U_ = function () {function e(t) {var n = this;kn(this, e), gs(t) ? (this._map = new Map(), t.forEach(function (e) {n._map.set(e, []);})) : cs.warn("AverageCalculator.constructor need keys");}return An(e, [{ key: "push", value: function value(e, t) {return !(ms(e) || !this._map.has(e) || !ps(t)) && (this._map.get(e).push(t), !0);} }, { key: "getSize", value: function value(e) {return ms(e) || !this._map.has(e) ? -1 : this._map.get(e).length;} }, { key: "getAvg", value: function value(e) {if (ms(e) || !this._map.has(e)) return -1;var t = this._map.get(e),n = t.length;if (0 === n) return 0;var r = 0;return t.forEach(function (e) {r += e;}), t.length = 0, this._map.set(e, []), parseInt(r / n);} }, { key: "getMax", value: function value(e) {return ms(e) || !this._map.has(e) ? -1 : Math.max.apply(null, this._map.get(e));} }, { key: "getMin", value: function value(e) {return ms(e) || !this._map.has(e) ? -1 : Math.min.apply(null, this._map.get(e));} }, { key: "reset", value: function value() {this._map.forEach(function (e) {e.length = 0;});} }]), e;}(),q_ = function () {function e(t) {var n = this;kn(this, e), gs(t) ? (this._map = new Map(), t.forEach(function (e) {n._map.set(e, { totalCount: 0, successCount: 0 });})) : cs.warn("SuccessRateCalculator.constructor need keys");}return An(e, [{ key: "addTotalCount", value: function value(e) {return !(ms(e) || !this._map.has(e)) && (this._map.get(e).totalCount += 1, !0);} }, { key: "addSuccessCount", value: function value(e) {return !(ms(e) || !this._map.has(e)) && (this._map.get(e).successCount += 1, !0);} }, { key: "getSuccessRate", value: function value(e) {if (ms(e) || !this._map.has(e)) return -1;var t = this._map.get(e);if (0 === t.totalCount) return 1;var n = parseFloat((t.successCount / t.totalCount).toFixed(2));return t.totalCount = t.successCount = 0, n;} }, { key: "getTotalCount", value: function value(e) {return ms(e) || !this._map.has(e) ? -1 : this._map.get(e).totalCount;} }, { key: "reset", value: function value() {this._map.forEach(function (e) {e.totalCount = 0, e.successCount = 0;});} }]), e;}(),F_ = function (e) {Ln(n, e);var t = jn(n);function n(e) {var r;return kn(this, n), (r = t.call(this, e)).TABLE = "timwebsum", r.TAG = "im-ssolog-sumstat", r._items = [dg, gg, mg], r._thresholdMap = new Map(), r._thresholdMap.set(dg, 100), r._thresholdMap.set(gg, 150), r._thresholdMap.set(mg, 15), r._lpID = "", r._platform = r.getPlatform(), r._lastReportTime = 0, r._statInfoArr = [], r._retryCount = 0, r._avgCalc = new U_(r._items), r._successRateCalc = new q_(r._items), r.tim.innerEmitter.on(Ld, r._onLoginSuccess, qn(r)), r;}return An(n, [{ key: "_onLoginSuccess", value: function value() {var e = this,t = this.tim.storage,n = t.getItem(this.TAG, !1);js(n) || (cs.log("SumStatController._onLoginSuccess get sumstatlog in storage, nums=" + n.length), n.forEach(function (t) {e._statInfoArr.pushIn(t);}), t.removeItem(this.TAG, !1));} }, { key: "recordLongPollingID", value: function value(e) {this._lpID = e;} }, { key: "addTotalCount", value: function value(e) {this._successRateCalc.addTotalCount(e) ? 1 === this._successRateCalc.getTotalCount(e) && (this._lastReportTime = Date.now()) : cs.warn("SumStatController.addTotalCount invalid key:", e);} }, { key: "addSuccessCount", value: function value(e) {this._successRateCalc.addSuccessCount(e) || cs.warn("SumStatController.addSuccessCount invalid key:", e);} }, { key: "addCost", value: function value(e, t) {this._avgCalc.push(e, t) ? (cs.debug("SumStatController.addCost", e, t, this._avgCalc.getSize(e)), this._avgCalc.getSize(e) >= this._thresholdMap.get(e) && this._report(e)) : cs.warn("SumStatController.addCost invalid key or cost:", e, t);} }, { key: "_getItemNum", value: function value(e) {switch (e) {case dg:return 1;case gg:return 2;case mg:return 3;default:return 100;}} }, { key: "_getStatInfo", value: function value(e) {var t = null;return this._avgCalc.getSize(e) > 0 && (t = { SDKAppID: "".concat(this.tim.context.SDKAppID), version: "".concat("2.6.2"), tinyID: this.tim.context.tinyID, userID: this.tim.loginInfo.identifier, item: this._getItemNum(e), lpID: e === dg ? this._lpID : "", platform: this._platform, networkType: this.getNetworkType(), total: this._successRateCalc.getTotalCount(e), successRate: this._successRateCalc.getSuccessRate(e), avg: this._avgCalc.getAvg(e), timespan: Date.now() - this._lastReportTime, time: Ds() }), t;} }, { key: "_report", value: function value(e) {var t = this,n = [],r = null;ms(e) ? this._items.forEach(function (e) {null !== (r = t._getStatInfo(e)) && n.push(r);}) : null !== (r = this._getStatInfo(e)) && n.push(r), cs.debug("SumStatController._report", n), this._statInfoArr.length > 0 && (n = n.concat(this.statInfoArr), this._statInfoArr = []), this._doReport(n);} }, { key: "_doReport", value: function value(e) {var t = this;js(e) ? cs.warn("SumStatController._doReport statInfoArr is empty, do nothing") : this.request({ name: "ssoSumStat", action: "create", param: { table: this.TABLE, report: e } }).then(function () {t._lastReportTime = Date.now(), t._retryCount > 0 && (cs.debug("SumStatController._doReport retry success"), t._retryCount = 0);}).catch(function (n) {cs.warn("SumStatController._doReport, online:".concat(t.getNetworkType(), " error:"), n, e), t._retryCount <= 1 ? setTimeout(function () {cs.info("SumStatController._doReport retry", e), t._retryCount += 1, t._doReport(e);}, 5e3) : (t._retryCount = 0, t._statInfoArr = t._statInfoArr.concat(e), t._flusgAtOnce());});} }, { key: "_flushAtOnce", value: function value() {var e = this.tim.storage,t = e.getItem(this.TAG, !1),n = this._statInfoArr;if (js(t)) cs.log("SumStatController._flushAtOnce nums=" + n.length), e.setItem(this.TAG, n, !0, !1);else {var r = n.concat(t);r.length > 10 && (r = r.slice(0, 10)), cs.log("SumStatController._flushAtOnce nums=" + r.length), e.setItem(this.TAG, r, !0, !1);}this._statInfoArr = [];} }, { key: "reset", value: function value() {cs.info("SumStatController.reset"), this._report(), this._avgCalc.reset(), this._successRateCalc.reset();} }]), n;}(og),j_ = function () {function e() {kn(this, e), this._funcMap = new Map();}return An(e, [{ key: "defense", value: function value(e, t) {var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;if ("string" != typeof e) return null;if (0 === e.length) return null;if ("function" != typeof t) return null;if (this._funcMap.has(e) && this._funcMap.get(e).has(t)) return this._funcMap.get(e).get(t);this._funcMap.has(e) || this._funcMap.set(e, new Map());var r = null;return this._funcMap.get(e).has(t) ? r = this._funcMap.get(e).get(t) : (r = this._pack(t, n), this._funcMap.get(e).set(t, r)), r;} }, { key: "defenseOnce", value: function value(e) {var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;return "function" != typeof e ? null : this._pack(e, t);} }, { key: "find", value: function value(e, t) {return "string" != typeof e || 0 === e.length || "function" != typeof t ? null : this._funcMap.has(e) ? this._funcMap.get(e).has(t) ? this._funcMap.get(e).get(t) : (cs.log("SafetyCallback.find: 找不到 func —— ".concat(e, "/").concat("" !== t.name ? t.name : "[anonymous]")), null) : (cs.log("SafetyCallback.find: 找不到 eventName-".concat(e, " 对应的 func")), null);} }, { key: "delete", value: function value(e, t) {return "function" == typeof t && !!this._funcMap.has(e) && !!this._funcMap.get(e).has(t) && (this._funcMap.get(e).delete(t), 0 === this._funcMap.get(e).size && this._funcMap.delete(e), !0);} }, { key: "_pack", value: function value(e, t) {return function () {try {e.apply(t, Array.from(arguments));} catch (n) {console.error(n);}};} }]), e;}(),B_ = function () {function e(t) {kn(this, e);var n = new Ig();n.setMethod(Cg).setStart(), rg.mixin(this), this._initOptions(t), this._initMemberVariables(), this._initControllers(), this._initListener(), Ig.bindController(this.eventStatController), n.setCode(0).setText("mp=".concat(ba, "-ua=").concat(Oa)).setEnd(), cs.info("SDK inWxMiniApp:".concat(ba, ", SDKAppID:").concat(t.SDKAppID, ", UserAgent:").concat(Oa)), this._safetyCallbackFactory = new j_();}return An(e, [{ key: "login", value: function value(e) {return cs.time(fg), this._ssoLog = new Ig(), this._ssoLog.setMethod(Mg).setStart(), this.netMonitor.start(), this.loginInfo.identifier = e.identifier || e.userID, this.loginInfo.userSig = e.userSig, this.signController.login(this.loginInfo);} }, { key: "logout", value: function value() {var e = this.signController.logout();return this.resetSDK(), e;} }, { key: "on", value: function value(e, t, n) {e === ln.GROUP_SYSTEM_NOTICE_RECEIVED && cs.warn("！！！TIM.EVENT.GROUP_SYSTEM_NOTICE_RECEIVED v2.6.0起弃用，为了更好的体验，请在 TIM.EVENT.MESSAGE_RECEIVED 事件回调内接收处理群系统通知，详细请参考：https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/Message.html#.GroupSystemNoticePayload"), cs.debug("on", "eventName:".concat(e)), this.outerEmitter.on(e, this._safetyCallbackFactory.defense(e, t, n), n);} }, { key: "once", value: function value(e, t, n) {cs.debug("once", "eventName:".concat(e)), this.outerEmitter.once(e, this._safetyCallbackFactory.defenseOnce(t, n), n || this);} }, { key: "off", value: function value(e, t, n, r) {cs.debug("off", "eventName:".concat(e));var o = this._safetyCallbackFactory.find(e, t);null !== o && (this.outerEmitter.off(e, o, n, r), this._safetyCallbackFactory.delete(e, t));} }, { key: "registerPlugin", value: function value(e) {var t = this;this.plugins || (this.plugins = {}), Object.keys(e).forEach(function (n) {t.plugins[n] = e[n];});} }, { key: "getPlugin", value: function value(e) {return this.plugins[e] || void 0;} }, { key: "setLogLevel", value: function value(e) {if (e <= 0) {console.log(["", " ________  ______  __       __  __       __  ________  _______", "|        \\|      \\|  \\     /  \\|  \\  _  |  \\|        \\|       \\", " \\$$$$$$$$ \\$$$$$$| $$\\   /  $$| $$ / \\ | $$| $$$$$$$$| $$$$$$$\\", "   | $$     | $$  | $$$\\ /  $$$| $$/  $\\| $$| $$__    | $$__/ $$", "   | $$     | $$  | $$$$\\  $$$$| $$  $$$\\ $$| $$  \\   | $$    $$", "   | $$     | $$  | $$\\$$ $$ $$| $$ $$\\$$\\$$| $$$$$   | $$$$$$$\\", "   | $$    _| $$_ | $$ \\$$$| $$| $$$$  \\$$$$| $$_____ | $$__/ $$", "   | $$   |   $$ \\| $$  \\$ | $$| $$$    \\$$$| $$     \\| $$    $$", "    \\$$    \\$$$$$$ \\$$      \\$$ \\$$      \\$$ \\$$$$$$$$ \\$$$$$$$", "", ""].join("\n")), console.log("%cIM 智能客服，随时随地解决您的问题 →_→ https://cloud.tencent.com/act/event/smarty-service?from=im-doc", "color:#ff0000");console.log(["", "参考以下文档，会更快解决问题哦！(#^.^#)\n", "SDK 更新日志: https://cloud.tencent.com/document/product/269/38492\n", "SDK 接口文档: https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html\n", "常见问题: https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/tutorial-01-faq.html\n", "反馈问题？戳我提 issue: https://github.com/tencentyun/TIMSDK/issues\n", "如果您需要在生产环境关闭上面的日志，请 tim.setLogLevel(1)\n"].join("\n"));}cs.setLevel(e);} }, { key: "downloadLog", value: function value() {var e = document.createElement("a"),t = new Date(),n = new Blob(this.getLog());e.download = "TIM-" + t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + "-" + this.loginInfo.SDKAppID + "-" + this.context.identifier + ".txt", e.href = URL.createObjectURL(n), e.click(), URL.revokeObjectURL(n);} }, { key: "destroy", value: function value() {this.logout(), this.outerEmitter.emit(ln.SDK_DESTROY, { SDKAppID: this.loginInfo.SDKAppID });} }, { key: "createTextMessage", value: function value(e) {return this.messageController.createTextMessage(e);} }, { key: "createImageMessage", value: function value(e) {return this.messageController.createImageMessage(e);} }, { key: "createAudioMessage", value: function value(e) {return this.messageController.createAudioMessage(e);} }, { key: "createVideoMessage", value: function value(e) {return this.messageController.createVideoMessage(e);} }, { key: "createCustomMessage", value: function value(e) {return this.messageController.createCustomMessage(e);} }, { key: "createFaceMessage", value: function value(e) {return this.messageController.createFaceMessage(e);} }, { key: "createFileMessage", value: function value(e) {return this.messageController.createFileMessage(e);} }, { key: "sendMessage", value: function value(e) {return e instanceof Vh ? this.messageController.sendMessageInstance(e) : pg(new Gl({ code: $l, message: nf }));} }, { key: "revokeMessage", value: function value(e) {return this.messageController.revokeMessage(e);} }, { key: "resendMessage", value: function value(e) {return this.messageController.resendMessage(e);} }, { key: "getMessageList", value: function value(e) {return this.messageController.getMessageList(e);} }, { key: "setMessageRead", value: function value(e) {return this.messageController.setMessageRead(e);} }, { key: "getConversationList", value: function value() {return this.conversationController.getConversationList();} }, { key: "getConversationProfile", value: function value(e) {return this.conversationController.getConversationProfile(e);} }, { key: "deleteConversation", value: function value(e) {return this.conversationController.deleteConversation(e);} }, { key: "getMyProfile", value: function value() {return this.userController.getMyProfile();} }, { key: "getUserProfile", value: function value(e) {return this.userController.getUserProfile(e);} }, { key: "updateMyProfile", value: function value(e) {return this.userController.updateMyProfile(e);} }, { key: "getFriendList", value: function value() {return this.userController.getFriendList();} }, { key: "deleteFriend", value: function value(e) {return this.userController.deleteFriend(e);} }, { key: "getBlacklist", value: function value() {return this.userController.getBlacklist();} }, { key: "addToBlacklist", value: function value(e) {return this.userController.addBlacklist(e);} }, { key: "removeFromBlacklist", value: function value(e) {return this.userController.deleteBlacklist(e);} }, { key: "getGroupList", value: function value(e) {return this.groupController.getGroupList(e);} }, { key: "getGroupProfile", value: function value(e) {return this.groupController.getGroupProfile(e);} }, { key: "createGroup", value: function value(e) {return this.groupController.createGroup(e);} }, { key: "dismissGroup", value: function value(e) {return this.groupController.dismissGroup(e);} }, { key: "updateGroupProfile", value: function value(e) {return this.groupController.updateGroupProfile(e);} }, { key: "joinGroup", value: function value(e) {return this.groupController.joinGroup(e);} }, { key: "quitGroup", value: function value(e) {return this.groupController.quitGroup(e);} }, { key: "searchGroupByID", value: function value(e) {return this.groupController.searchGroupByID(e);} }, { key: "changeGroupOwner", value: function value(e) {return this.groupController.changeGroupOwner(e);} }, { key: "handleGroupApplication", value: function value(e) {return this.groupController.handleGroupApplication(e);} }, { key: "setMessageRemindType", value: function value(e) {return this.groupController.setMessageRemindType(e);} }, { key: "getGroupMemberList", value: function value(e) {return this.groupController.getGroupMemberList(e);} }, { key: "getGroupMemberProfile", value: function value(e) {return this.groupController.getGroupMemberProfile(e);} }, { key: "addGroupMember", value: function value(e) {return this.groupController.addGroupMember(e);} }, { key: "deleteGroupMember", value: function value(e) {return this.groupController.deleteGroupMember(e);} }, { key: "setGroupMemberMuteTime", value: function value(e) {return this.groupController.setGroupMemberMuteTime(e);} }, { key: "setGroupMemberRole", value: function value(e) {return this.groupController.setGroupMemberRole(e);} }, { key: "setGroupMemberNameCard", value: function value(e) {return this.groupController.setGroupMemberNameCard(e);} }, { key: "setGroupMemberCustomField", value: function value(e) {return this.groupController.setGroupMemberCustomField(e);} }, { key: "_initOptions", value: function value(e) {this.plugins = {};var t = e.SDKAppID || 0,n = ws();this.context = { SDKAppID: t, accountType: n }, this.loginInfo = { SDKAppID: t, accountType: n, identifier: null, userSig: null }, this.options = { runLoopNetType: e.runLoopNetType || gl, enablePointer: e.enablePointer || !1 };} }, { key: "_initMemberVariables", value: function value() {this.innerEmitter = new p_(), this.outerEmitter = new p_(), cg(this.outerEmitter), this.packageConfig = new h_(this), this.storage = new l_(this), this.netMonitor = new x_(), this.outerEmitter._emit = this.outerEmitter.emit, this.outerEmitter.emit = function (e, t) {var n = arguments[0],r = [n, { name: arguments[0], data: arguments[1] }];cs.debug("emit outer event:".concat(n), r[1]), this.outerEmitter._emit.apply(this.outerEmitter, r);}.bind(this), this.innerEmitter._emit = this.innerEmitter.emit, this.innerEmitter.emit = function (e, t) {var n;ds(arguments[1]) && arguments[1].data ? (cs.warn("inner eventData has data property, please check!"), n = [e, { name: arguments[0], data: arguments[1].data }]) : n = [e, { name: arguments[0], data: arguments[1] }], cs.debug("emit inner event:".concat(e), n[1]), this.innerEmitter._emit.apply(this.innerEmitter, n);}.bind(this);} }, { key: "_initControllers", value: function value() {this.exceptionController = new _y(this), this.connectionController = new yy(this), this.contextController = new ag(this), this.context = this.contextController.getContext(), this.signController = new rm(this), this.messageController = new t_(this), this.conversationController = new Uy(this), this.userController = new wy(this), this.groupController = new s_(this), this.notificationController = new y_(this), this.bigDataHallwayController = new I_(this), this.statusController = new u_(this), this.uploadController = new __(this), this.eventStatController = new N_(this), this.sumStatController = new F_(this), this.mtaReportController = new O_(this), this._initReadyListener();} }, { key: "_initListener", value: function value() {var e = this;if (this.innerEmitter.on(yd, this._onSlowStart, this), ba && "function" == typeof wx.onAppShow && "function" == typeof wx.onAppHide) {var t = null;wx.onAppHide(function () {(t = new Ig()).setMethod(nm).setStart();}), wx.onAppShow(function () {null !== t && t.setCode(0).setNetworkType(e.netMonitor.getNetworkType()).setEnd();});}} }, { key: "_initReadyListener", value: function value() {for (var e = this, t = this.readyList, n = 0, r = t.length; n < r; n++) {this[t[n]].ready(function () {return e._readyHandle();});}} }, { key: "_onSlowStart", value: function value() {cs.log("slow start longpolling..."), this.resetSDK(), this.login(this.loginInfo);} }, { key: "resetSDK", value: function value() {var e = this;this.initList.forEach(function (t) {e[t].reset && e[t].reset();}), this.netMonitor.reset(), this.storage.reset(), this.resetReady(), this._initReadyListener(), this.outerEmitter.emit(ln.SDK_NOT_READY);} }, { key: "_readyHandle", value: function value() {for (var e = this.readyList, t = !0, n = 0, r = e.length; n < r; n++) {if (!this[e[n]].isReady()) {t = !1;break;}}if (t) {var o = cs.timeEnd(fg);cs.warn("SDK is ready. cost=".concat(o, "ms")), this.triggerReady(), this.innerEmitter.emit(Vd), this.outerEmitter.emit(ln.SDK_READY), this._ssoLog.setCode(0).setNetworkType(this.netMonitor.getNetworkType()).setText(o).setEnd();}} }]), e;}();B_.prototype.readyList = ["conversationController"], B_.prototype.initList = ["exceptionController", "connectionController", "signController", "contextController", "messageController", "conversationController", "userController", "groupController", "notificationController", "eventStatController", "sumStatController"];var H_ = { login: "login", on: "on", off: "off", ready: "ready", setLogLevel: "setLogLevel", joinGroup: "joinGroup", quitGroup: "quitGroup", registerPlugin: "registerPlugin" };function V_(e, t) {return !(!e.isReady() && void 0 === H_[t]) || (e.innerEmitter.emit(xd, new Gl({ code: Hp, message: "".concat(t, " ").concat(Jf, "，请参考 https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/module-EVENT.html#.SDK_READY") })), !1);}var K_ = {},$_ = {};return $_.create = function (e) {if (e.SDKAppID && K_[e.SDKAppID]) return K_[e.SDKAppID];cs.log("TIM.create");var t = new B_(e);t.on(ln.SDK_DESTROY, function (e) {K_[e.data.SDKAppID] = null, delete K_[e.data.SDKAppID];});var n = function (e) {var t = Object.create(null);return Object.keys(Yh).forEach(function (n) {if (e[n]) {var r = Yh[n],o = new Yn();t[r] = function () {var t = Array.from(arguments);return o.use(function (t, r) {if (V_(e, n)) return r();}).use(function (e, t) {if (!0 === Bs(e, $h[n], r)) return t();}).use(function (t, r) {return e[n].apply(e, t);}), o.run(t);};}}), t;}(t);return K_[e.SDKAppID] = n, cs.log("TIM.create ok"), n;}, $_.TYPES = pn, $_.EVENT = ln, $_.VERSION = "2.6.2", cs.log("TIM.VERSION: ".concat($_.VERSION)), $_;});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 54:
/*!****************************************!*\
  !*** D:/uni-app/text/commen/commen.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var commen = {};


commen.emojiList = [
[{
  "url": "100.gif",
  alt: "[微笑]" },
{
  "url": "101.gif",
  alt: "[伤心]" },
{
  "url": "102.gif",
  alt: "[美女]" },
{
  "url": "103.gif",
  alt: "[发呆]" },
{
  "url": "104.gif",
  alt: "[墨镜]" },
{
  "url": "105.gif",
  alt: "[哭]" },
{
  "url": "106.gif",
  alt: "[羞]" },
{
  "url": "107.gif",
  alt: "[哑]" },
{
  "url": "108.gif",
  alt: "[睡]" },
{
  "url": "109.gif",
  alt: "[哭]" },
{
  "url": "110.gif",
  alt: "[囧]" },
{
  "url": "111.gif",
  alt: "[怒]" },
{
  "url": "112.gif",
  alt: "[调皮]" },
{
  "url": "113.gif",
  alt: "[笑]" },
{
  "url": "114.gif",
  alt: "[惊讶]" },
{
  "url": "115.gif",
  alt: "[难过]" },
{
  "url": "116.gif",
  alt: "[酷]" },
{
  "url": "117.gif",
  alt: "[汗]" },
{
  "url": "118.gif",
  alt: "[抓狂]" },
{
  "url": "119.gif",
  alt: "[吐]" },
{
  "url": "120.gif",
  alt: "[笑]" },
{
  "url": "121.gif",
  alt: "[快乐]" },
{
  "url": "122.gif",
  alt: "[奇]" },
{
  "url": "123.gif",
  alt: "[傲]" }],

[{
  "url": "124.gif",
  alt: "[饿]" },
{
  "url": "125.gif",
  alt: "[累]" },
{
  "url": "126.gif",
  alt: "[吓]" },
{
  "url": "127.gif",
  alt: "[汗]" },
{
  "url": "128.gif",
  alt: "[高兴]" },
{
  "url": "129.gif",
  alt: "[闲]" },
{
  "url": "130.gif",
  alt: "[努力]" },
{
  "url": "131.gif",
  alt: "[骂]" },
{
  "url": "132.gif",
  alt: "[疑问]" },
{
  "url": "133.gif",
  alt: "[秘密]" },
{
  "url": "134.gif",
  alt: "[乱]" },
{
  "url": "135.gif",
  alt: "[疯]" },
{
  "url": "136.gif",
  alt: "[哀]" },
{
  "url": "137.gif",
  alt: "[鬼]" },
{
  "url": "138.gif",
  alt: "[打击]" },
{
  "url": "139.gif",
  alt: "[bye]" },
{
  "url": "140.gif",
  alt: "[汗]" },
{
  "url": "141.gif",
  alt: "[抠]" },
{
  "url": "142.gif",
  alt: "[鼓掌]" },
{
  "url": "143.gif",
  alt: "[糟糕]" },
{
  "url": "144.gif",
  alt: "[恶搞]" },
{
  "url": "145.gif",
  alt: "[什么]" },
{
  "url": "146.gif",
  alt: "[什么]" },
{
  "url": "147.gif",
  alt: "[累]" }],

[{
  "url": "148.gif",
  alt: "[看]" },
{
  "url": "149.gif",
  alt: "[难过]" },
{
  "url": "150.gif",
  alt: "[难过]" },
{
  "url": "151.gif",
  alt: "[坏]" },
{
  "url": "152.gif",
  alt: "[亲]" },
{
  "url": "153.gif",
  alt: "[吓]" },
{
  "url": "154.gif",
  alt: "[可怜]" },
{
  "url": "155.gif",
  alt: "[刀]" },
{
  "url": "156.gif",
  alt: "[水果]" },
{
  "url": "157.gif",
  alt: "[酒]" },
{
  "url": "158.gif",
  alt: "[篮球]" },
{
  "url": "159.gif",
  alt: "[乒乓]" },
{
  "url": "160.gif",
  alt: "[咖啡]" },
{
  "url": "161.gif",
  alt: "[美食]" },
{
  "url": "162.gif",
  alt: "[动物]" },
{
  "url": "163.gif",
  alt: "[鲜花]" },
{
  "url": "164.gif",
  alt: "[枯]" },
{
  "url": "165.gif",
  alt: "[唇]" },
{
  "url": "166.gif",
  alt: "[爱]" },
{
  "url": "167.gif",
  alt: "[分手]" },
{
  "url": "168.gif",
  alt: "[生日]" },
{
  "url": "169.gif",
  alt: "[电]" },
{
  "url": "170.gif",
  alt: "[炸弹]" },
{
  "url": "171.gif",
  alt: "[刀子]" }],

[{
  "url": "172.gif",
  alt: "[足球]" },
{
  "url": "173.gif",
  alt: "[瓢虫]" },
{
  "url": "174.gif",
  alt: "[翔]" },
{
  "url": "175.gif",
  alt: "[月亮]" },
{
  "url": "176.gif",
  alt: "[太阳]" },
{
  "url": "177.gif",
  alt: "[礼物]" },
{
  "url": "178.gif",
  alt: "[抱抱]" },
{
  "url": "179.gif",
  alt: "[拇指]" },
{
  "url": "180.gif",
  alt: "[贬低]" },
{
  "url": "181.gif",
  alt: "[握手]" },
{
  "url": "182.gif",
  alt: "[剪刀手]" },
{
  "url": "183.gif",
  alt: "[抱拳]" },
{
  "url": "184.gif",
  alt: "[勾引]" },
{
  "url": "185.gif",
  alt: "[拳头]" },
{
  "url": "186.gif",
  alt: "[小拇指]" },
{
  "url": "187.gif",
  alt: "[拇指八]" },
{
  "url": "188.gif",
  alt: "[食指]" },
{
  "url": "189.gif",
  alt: "[ok]" },
{
  "url": "190.gif",
  alt: "[情侣]" },
{
  "url": "191.gif",
  alt: "[爱心]" },
{
  "url": "192.gif",
  alt: "[蹦哒]" },
{
  "url": "193.gif",
  alt: "[颤抖]" },
{
  "url": "194.gif",
  alt: "[怄气]" },
{
  "url": "195.gif",
  alt: "[跳舞]" }],

[{
  "url": "196.gif",
  alt: "[发呆]" },
{
  "url": "197.gif",
  alt: "[背着]" },
{
  "url": "198.gif",
  alt: "[伸手]" },
{
  "url": "199.gif",
  alt: "[耍帅]" },
{
  "url": "200.png",
  alt: "[微笑]" },
{
  "url": "201.png",
  alt: "[生病]" },
{
  "url": "202.png",
  alt: "[哭泣]" },
{
  "url": "203.png",
  alt: "[吐舌]" },
{
  "url": "204.png",
  alt: "[迷糊]" },
{
  "url": "205.png",
  alt: "[瞪眼]" },
{
  "url": "206.png",
  alt: "[恐怖]" },
{
  "url": "207.png",
  alt: "[忧愁]" },
{
  "url": "208.png",
  alt: "[眨眉]" },
{
  "url": "209.png",
  alt: "[闭眼]" },
{
  "url": "210.png",
  alt: "[鄙视]" },
{
  "url": "211.png",
  alt: "[阴暗]" },
{
  "url": "212.png",
  alt: "[小鬼]" },
{
  "url": "213.png",
  alt: "[礼物]" },
{
  "url": "214.png",
  alt: "[拜佛]" },
{
  "url": "215.png",
  alt: "[力量]" },
{
  "url": "216.png",
  alt: "[金钱]" },
{
  "url": "217.png",
  alt: "[蛋糕]" },
{
  "url": "218.png",
  alt: "[彩带]" },
{
  "url": "219.png",
  alt: "[礼物]" }]];



/**@dateTimeFliter 转换格林日期时间格式为常用日期格式
                    * @time[必填] 						Date  		格林日期格式
                    * @part[可选,默认:0]				Number      选择返回日期时间部分  列:0:返回所有 1:只返回日期  2:只返回时间
                    * @dateComplete[可选,默认:true] 	Boolean 	日期位数不足是否添0补齐:true:补齐,false:不补齐
                    * @timeComplete[可选,默认:true] 	Boolean 	时间位数不足是否添0补齐:true:补齐,false:不补齐
                    * @dateConnector[可选,默认:-] 		String 		年月日连接符  例: - : /
                    * @timeConnector[可选,默认::] 		String 		时间连接符   例: - : /
                    * @hour12[可选,默认:false]          Boolean     是否返回12小时制时间   例: true:返回12小时制时间   false:返回24小时制时间
                    * @return   '2019-11-25 15:05:54'  String    返回示例
                    * **/
commen.dateTimeFliter = function (time)
{var part = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var dateComplete = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;var timeComplete = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;var dateConnector = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '-';var timeConnector = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : ':';var hour12 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day = time.getDate();
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
  var dateStr = '';
  var timeStr = '';
  //转换日期
  if (dateComplete) {//添0补齐
    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
  }
  dateStr = year + dateConnector + month + dateConnector + day;
  //转换时间
  //修改小时制
  if (hour12) {
    if (hour > 12) {
      hour = hour - 12;
      if (timeComplete) {
        if (hour < 10) {
          hour = '下午 ' + '0' + hour;
        } else {
          hour = '下午 ' + hour;
        }
      }
    } else {
      if (timeComplete) {
        if (hour < 10) {
          hour = '上午 ' + '0' + hour;
        } else {
          hour = '上午 ' + hour;
        }
      }
    }
  }
  //判断分钟与秒
  if (timeComplete) {//添0补齐
    if (minute < 10) {
      minute = '0' + minute;
    }
    if (second < 10) {
      second = '0' + second;
    }
  }
  timeStr = hour + timeConnector + minute + timeConnector + second;
  //合成输出值
  if (part == 0) {
    return dateStr + ' ' + timeStr;
  } else if (part == 1) {
    return dateStr;
  } else if (part == 2) {
    return timeStr;
  }
  return '传参有误';
};var _default =



commen;exports.default = _default;

/***/ }),

/***/ 55:
/*!**************************************!*\
  !*** D:/uni-app/text/store/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 21));
var _tim = _interopRequireDefault(__webpack_require__(/*! ../commen/tim/tim */ 52));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  state: {
    isLogin: false,
    isSDKReady: false, // TIM SDK 是否 ready

    conversationActive: {}, //聊天进行中的会话
    toUserId: '', //聊天对象id
    conversationList: [], //会话列表
    currentMessageList: [] //消息列表
  },


  mutations: {
    //更新登录状态
    toggleIsLogin: function toggleIsLogin(state, isLogin) {
      state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin;
    },
    //更新TIMSDK状态
    toggleIsSDKReady: function toggleIsSDKReady(state, isSDKReady) {
      state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady;
    },
    //退出登录重置状态
    reset: function reset(state) {
      state.isLogin = false;
      state.isSDKReady = false;
    },
    //选择好友聊天--创建会话/拼接会话id
    createConversationActive: function createConversationActive(state, toUserId) {
      state.conversationActive.conversationID = 'C2C' + toUserId;
      state.toUserId = toUserId;
      state.currentMessageList = [];
    },
    //选择已有会话聊天--更新选中会话详情
    updateConversationActive: function updateConversationActive(state, conversationItem) {
      state.conversationActive = Object.assign({}, conversationItem.conversation);
      state.toUserId = conversationItem.user.userId;
      state.currentMessageList = [];
    },
    //更新会话列表
    updateConversationList: function updateConversationList(state, newConversationList) {
      state.conversationList = newConversationList;
    },
    /**
        * 将消息插入当前会话列表
        * 调用时机：收/发消息事件触发时
        * @param {Object} state
        * @param {Message[]|Message} data
        * @returns
        */
    pushCurrentMessageList: function pushCurrentMessageList(state, data) {
      // 还没当前会话，则跳过
      if (Array.isArray(data)) {
        // 筛选出当前会话的消息
        var result = data.filter(function (item) {return item.conversationID === state.conversationActive.conversationID;});
        state.currentMessageList = [].concat(_toConsumableArray(state.currentMessageList), _toConsumableArray(result));
      } else if (data.conversationID === state.conversationActive.conversationID) {
        state.currentMessageList = [].concat(_toConsumableArray(state.currentMessageList), [data]);
      }
      console.log('1111');
      console.log(state.currentMessageList);
    },
    /**
        * 滑到顶部请求更多的历史消息
        * */
    unshiftCurrentMessageList: function unshiftCurrentMessageList(state, data) {
      console.log(data);
      if (data) {
        state.currentMessageList = [].concat(_toConsumableArray(data), _toConsumableArray(state.currentMessageList));
      }
    } },


  actions: {} });var _default =



store;exports.default = _default;

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-261120200409001","_inBundle":false,"_integrity":"sha512-iM1vsCzUEg80lCM7rSAkh+28ahjS9zQgiGsEoHxawCD9s7rTFnSRIaOuc7WHeQt6EclGUUIrMccYHXsLsNAXZg==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-261120200409001.tgz","_shasum":"e9daeef120f133bf3d4ca0505f5b2abed0e874a7","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"ff0877f516c1cc986cf2d7eae2bf5030c58050f9","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-261120200409001"};

/***/ }),

/***/ 7:
/*!***************************************************!*\
  !*** D:/uni-app/text/pages.json?{"type":"style"} ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/mine/children/login": {}, "pages/mine/children/register": {}, "pages/mine/children/forget": {} }, "globalStyle": { "navigationStyle": "custom" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!**************************************************!*\
  !*** D:/uni-app/text/pages.json?{"type":"stat"} ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__3D6C5F6" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map