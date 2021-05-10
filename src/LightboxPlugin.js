export default class LightboxPlugin {
  constructor({ buttonCloseAriaLabel = 'Close' } = {}) {
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
      _show: 'lightbox--show',
    };

    this._Handler = {
      _close: null,
    };

    this._closeCallback = null;

    this._scrollPosition = {
      _x: null,
      _y: null,
    };

    this._ESC_CODE = 27;
  }

  open({ content, closeCallback, classes }) {
    if (this._lightbox) {
      this.close();
    }

    this._inputContent = content.outerHTML || content;

    if (closeCallback) {
      this._closeCallback = closeCallback;
    }

    if (classes) {
      if (Array.isArray(classes)) {
        this._LightboxClass._input.push(...classes);
      } else {
        this._LightboxClass._input.push(classes);
      }
    }

    this._rememberScrollPosition();
    this._showLightbox();
    this._blockScroll();

    this._lightbox.classList.add(this._LightboxClass._show);
  }

  close(onCloseAction) {
    if (onCloseAction) {
      onCloseAction();
    }

    const lightboxCss = getComputedStyle(this._lightbox);
    const isAnimated = lightboxCss.animationName !== 'none';
    const isTransitioned = lightboxCss.transitionProperty !== 'all';

    this._lightbox.classList.remove(this._LightboxClass._show);

    if (isAnimated || isTransitioned) {
      this._lightbox.addEventListener(isAnimated ? 'animationend' : 'transitionend', () => this._closeLightbox(), { once: true });
    } else {
      this._closeLightbox();
    }
  }

  getLightbox() {
    return this._lightbox;
  }

  appendContent(content) {
    if (content && this._content) {
      this._inputContent += content;
      this._content.insertAdjacentHTML('beforeend', content);
    }
  }

  replaceContent(content) {
    if (content) {
      this._inputContent = content;
      this._content.innerHTML = this._inputContent;
    }
  }

  _closeLightbox() {
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

  _rememberScrollPosition() {
    [this._scrollPosition._x, this._scrollPosition._y] = [window.pageXOffset, window.pageYOffset];
  }

  _showLightbox() {
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

  _createLightbox() {
    this._lightbox = document.createElement('div');
    this._lightbox.classList.add(this._LightboxClass._lightbox, ...this._LightboxClass._input);
  }

  _createWrapper() {
    this._wrapper = document.createElement('div');
    this._wrapper.classList.add(this._LightboxClass._wrapper);
  }

  _createCloseButton() {
    this._closeButton = document.createElement('button');
    this._closeButton.type = 'button';
    this._closeButton.classList.add(this._LightboxClass._buttonClose);
    this._closeButton.ariaLabel = this._closeButtonAriaLabel;
  }

  _createContent() {
    this._content = document.createElement('div');
    this._content.classList.add(this._LightboxClass._content);
    this._content.innerHTML = this._inputContent;
  }

  _setLightboxCloseHandler() {
    this._Handler._close = ({ target, keyCode }) => {
      if (keyCode === this._ESC_CODE
        || target.classList.contains(this._LightboxClass._lightbox)
        || target.classList.contains(this._LightboxClass._buttonClose)) {
        this.close();
      }
    };

    document.addEventListener('keyup', this._Handler._close);
    document.addEventListener('click', this._Handler._close);
  }

  _blockScroll() {
    LightboxPlugin.setBlockStyles();

    document.body.classList.add(this._LightboxClass._body);
  }

  static setBlockStyles() {
    document.documentElement.style.paddingRight = `${parseFloat(getComputedStyle(document.documentElement).paddingRight) + LightboxPlugin.getScrollWidth()}px`;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  static getScrollWidth() {
    return window.innerWidth - document.body.clientWidth;
  }

  _removeLightbox() {
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

  _removeLightboxCloseHandler() {
    if (this._Handler._close) {
      document.removeEventListener('keyup', this._Handler._close);
      document.removeEventListener('click', this._Handler._close);
      this._Handler._close = null;
    }
  }

  _unblockScroll() {
    LightboxPlugin.removeBlockStyles();

    document.body.classList.remove(this._LightboxClass._body);
  }

  static removeBlockStyles() {
    document.documentElement.style.paddingRight = '';
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  _setScrollPosition() {
    if (this._scrollPosition._x && this._scrollPosition._y) {
      window.scrollTo(this._scrollPosition._x, this._scrollPosition._y);
      [this._scrollPosition._x, this._scrollPosition._y] = [null, null];
    }
  }
}
