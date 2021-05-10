(self["webpackChunk"] = self["webpackChunk"] || []).push([["examples"],{

/***/ "./LightboxPlugin.js":
/*!***************************!*\
  !*** ./LightboxPlugin.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LightboxPlugin)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LightboxPlugin = /*#__PURE__*/function () {
  function LightboxPlugin() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$buttonCloseAriaL = _ref.buttonCloseAriaLabel,
        buttonCloseAriaLabel = _ref$buttonCloseAriaL === void 0 ? 'Close' : _ref$buttonCloseAriaL;

    _classCallCheck(this, LightboxPlugin);

    this._lightbox = null;
    this._closeButton = null;
    this._wrapper = null;
    this._content = null;
    this._inputContent = null;
    this._closeButtonAriaLabel = buttonCloseAriaLabel;
    this._LightboxClass = {
      _input: [],
      _body: 'body--lightbox',
      _lightbox: 'lightbox',
      _wrapper: 'lightbox__wrapper',
      _buttonClose: 'lightbox__close',
      _content: 'lightbox__content',
      _show: 'lightbox--show'
    };
    this._Handler = {
      _close: null
    };
    this._closeCallback = null;
    this._scrollPosition = {
      _x: null,
      _y: null
    };
    this._ESC_CODE = 27;
  }

  _createClass(LightboxPlugin, [{
    key: "open",
    value: function open(_ref2) {
      var content = _ref2.content,
          closeCallback = _ref2.closeCallback,
          classes = _ref2.classes;

      if (this._lightbox) {
        this.close();
      }

      this._inputContent = content.outerHTML || content;

      if (closeCallback) {
        this._closeCallback = closeCallback;
      }

      if (classes) {
        if (Array.isArray(classes)) {
          var _this$_LightboxClass$;

          (_this$_LightboxClass$ = this._LightboxClass._input).push.apply(_this$_LightboxClass$, _toConsumableArray(classes));
        } else {
          this._LightboxClass._input.push(classes);
        }
      }

      this._rememberScrollPosition();

      this._showLightbox();

      this._blockScroll();

      this._lightbox.classList.add(this._LightboxClass._show);
    }
  }, {
    key: "close",
    value: function close(onCloseAction) {
      var _this = this;

      if (onCloseAction) {
        onCloseAction();
      }

      var lightboxCss = getComputedStyle(this._lightbox);
      var isAnimated = lightboxCss.animationName !== 'none';
      var isTransitioned = lightboxCss.transitionProperty !== 'all';

      this._lightbox.classList.remove(this._LightboxClass._show);

      if (isAnimated || isTransitioned) {
        this._lightbox.addEventListener(isAnimated ? 'animationend' : 'transitionend', function () {
          return _this._closeLightbox();
        }, {
          once: true
        });
      } else {
        this._closeLightbox();
      }
    }
  }, {
    key: "getLightbox",
    value: function getLightbox() {
      return this._lightbox;
    }
  }, {
    key: "appendContent",
    value: function appendContent(content) {
      if (content && this._content) {
        this._inputContent += content;

        this._content.insertAdjacentHTML('beforeend', content);
      }
    }
  }, {
    key: "replaceContent",
    value: function replaceContent(content) {
      if (content) {
        this._inputContent = content;
        this._content.innerHTML = this._inputContent;
      }
    }
  }, {
    key: "_closeLightbox",
    value: function _closeLightbox() {
      this._unblockScroll();

      this._removeLightbox();

      if (window.location.hash) {
        window.location.hash = '';
      }

      this._setScrollPosition();

      if (this._closeCallback) {
        this._closeCallback();
      }
    }
  }, {
    key: "_rememberScrollPosition",
    value: function _rememberScrollPosition() {
      var _ref3 = [window.pageXOffset, window.pageYOffset];
      this._scrollPosition._x = _ref3[0];
      this._scrollPosition._y = _ref3[1];
    }
  }, {
    key: "_showLightbox",
    value: function _showLightbox() {
      this._createLightbox();

      this._createWrapper();

      this._createCloseButton();

      this._createContent();

      this._wrapper.appendChild(this._closeButton);

      this._wrapper.appendChild(this._content);

      this._lightbox.appendChild(this._wrapper);

      document.body.appendChild(this._lightbox);

      this._setLightboxCloseHandler();
    }
  }, {
    key: "_createLightbox",
    value: function _createLightbox() {
      var _this$_lightbox$class;

      this._lightbox = document.createElement('div');

      (_this$_lightbox$class = this._lightbox.classList).add.apply(_this$_lightbox$class, [this._LightboxClass._lightbox].concat(_toConsumableArray(this._LightboxClass._input)));
    }
  }, {
    key: "_createWrapper",
    value: function _createWrapper() {
      this._wrapper = document.createElement('div');

      this._wrapper.classList.add(this._LightboxClass._wrapper);
    }
  }, {
    key: "_createCloseButton",
    value: function _createCloseButton() {
      this._closeButton = document.createElement('button');
      this._closeButton.type = 'button';

      this._closeButton.classList.add(this._LightboxClass._buttonClose);

      this._closeButton.ariaLabel = this._closeButtonAriaLabel;
    }
  }, {
    key: "_createContent",
    value: function _createContent() {
      this._content = document.createElement('div');

      this._content.classList.add(this._LightboxClass._content);

      this._content.innerHTML = this._inputContent;
    }
  }, {
    key: "_setLightboxCloseHandler",
    value: function _setLightboxCloseHandler() {
      var _this2 = this;

      this._Handler._close = function (_ref4) {
        var target = _ref4.target,
            keyCode = _ref4.keyCode;

        if (keyCode === _this2._ESC_CODE || target.classList.contains(_this2._LightboxClass._lightbox) || target.classList.contains(_this2._LightboxClass._buttonClose)) {
          _this2.close();
        }
      };

      document.addEventListener('keyup', this._Handler._close);
      document.addEventListener('click', this._Handler._close);
    }
  }, {
    key: "_blockScroll",
    value: function _blockScroll() {
      LightboxPlugin.setBlockStyles();
      document.body.classList.add(this._LightboxClass._body);
    }
  }, {
    key: "_removeLightbox",
    value: function _removeLightbox() {
      this._removeLightboxCloseHandler();

      if (this._lightbox) {
        this._lightbox.remove();

        this._lightbox = null;
        this._inputContent = null;
        this._closeButton = null;
        this._wrapper = null;
        this._content = null;
      }
    }
  }, {
    key: "_removeLightboxCloseHandler",
    value: function _removeLightboxCloseHandler() {
      if (this._Handler._close) {
        document.removeEventListener('keyup', this._Handler._close);
        document.removeEventListener('click', this._Handler._close);
        this._Handler._close = null;
      }
    }
  }, {
    key: "_unblockScroll",
    value: function _unblockScroll() {
      LightboxPlugin.removeBlockStyles();
      document.body.classList.remove(this._LightboxClass._body);
    }
  }, {
    key: "_setScrollPosition",
    value: function _setScrollPosition() {
      if (this._scrollPosition._x && this._scrollPosition._y) {
        window.scrollTo(this._scrollPosition._x, this._scrollPosition._y);
        var _ref5 = [null, null];
        this._scrollPosition._x = _ref5[0];
        this._scrollPosition._y = _ref5[1];
      }
    }
  }], [{
    key: "setBlockStyles",
    value: function setBlockStyles() {
      document.documentElement.style.paddingRight = "".concat(parseFloat(getComputedStyle(document.documentElement).paddingRight) + LightboxPlugin.getScrollWidth(), "px");
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }
  }, {
    key: "getScrollWidth",
    value: function getScrollWidth() {
      return window.innerWidth - document.body.clientWidth;
    }
  }, {
    key: "removeBlockStyles",
    value: function removeBlockStyles() {
      document.documentElement.style.paddingRight = '';
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }]);

  return LightboxPlugin;
}();



/***/ }),

/***/ "./examples/js/index.js":
/*!******************************!*\
  !*** ./examples/js/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _examples_scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/examples/scss/index.scss */ "./examples/scss/index.scss");
/* harmony import */ var _examples_js_utils_lightbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/examples/js/utils/lightbox */ "./examples/js/utils/lightbox.js");
/* harmony import */ var _examples_js_utils_generateLightboxMarkup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/examples/js/utils/generateLightboxMarkup */ "./examples/js/utils/generateLightboxMarkup.js");



var lightboxButton = document.querySelector('button');

var OnLightboxButtonClick = function OnLightboxButtonClick() {
  var lightboxContent = (0,_examples_js_utils_generateLightboxMarkup__WEBPACK_IMPORTED_MODULE_2__.default)();
  _examples_js_utils_lightbox__WEBPACK_IMPORTED_MODULE_1__.default.open({
    content: lightboxContent
  });
};

lightboxButton.addEventListener('click', OnLightboxButtonClick);

/***/ }),

/***/ "./examples/js/utils/generateLightboxMarkup.js":
/*!*****************************************************!*\
  !*** ./examples/js/utils/generateLightboxMarkup.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _examples_images_smile_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/examples/images/smile.png */ "./examples/images/smile.png");


var generateLightboxMarkup = function generateLightboxMarkup() {
  var title = document.createElement('h2');
  var image = document.createElement('img');
  title.textContent = 'Hi! I\'m lightbox title!';
  image.src = _examples_images_smile_png__WEBPACK_IMPORTED_MODULE_0__;
  image.alt = 'Smile';
  return title.outerHTML + image.outerHTML;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generateLightboxMarkup);

/***/ }),

/***/ "./examples/js/utils/lightbox.js":
/*!***************************************!*\
  !*** ./examples/js/utils/lightbox.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _LightboxPlugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/LightboxPlugin */ "./LightboxPlugin.js");

var Lightbox = new _LightboxPlugin__WEBPACK_IMPORTED_MODULE_0__.default();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Lightbox);

/***/ }),

/***/ "./examples/scss/index.scss":
/*!**********************************!*\
  !*** ./examples/scss/index.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./examples/images/smile.png":
/*!***********************************!*\
  !*** ./examples/images/smile.png ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/8138bfbc708b7c0e4c44.png";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_babel_polyfill_lib_index_js"], () => (__webpack_exec__("../node_modules/@babel/polyfill/lib/index.js"), __webpack_exec__("./examples/js/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=examples.js.map