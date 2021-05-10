# Lightbox plugin
Modal window plugin (development in progress).

## Structure
```html
<body class="body--lightbox">
    <div class="lightbox lightbox--show">
        <div class="lightbox__wrapper">
            <button class="lightbox__close" aria-label="Close">
            </button>
            <div class="lightbox__content">
            </div>
        <div>
    </div>
</body>
```

## Classes
| Class name | Description |
| ------------- | ------------- |
| `body--lightbox`  | Body class when lightbox is open. |
| `lightbox`  | Lightbox class. |
| `lightbox--show`  | Lightbox class for animation or transition. |
| `lightbox__wrapper`  | Class for the button and content container. |
| `lightbox__close`  | Lightbox close button class. |
| `lightbox__content`  | Content class. |

## Options
Init lightbox instance `new LightboxPligin({options})`.

| Option | Type | Description |
---------- | ---------- | ---------- |
| buttonCloseAriaLabel  | String | Aria-label content of button close.<br> Default: `"Close"`. |
	
## Methods
| Method | Arguments | Description |
| ------------- | ------------- | ------------- |
| `open({content, closeCallback, classes})` | `content` - String/Node<br> `closeCallback` - Function]<br> `classes` - String/Array | Open lightbox.<br> `content` — lightbox content<br> `closeCallback` — callback that will be executed after hiding the lightbox<br> `classes` — additional classes for `div.lightbox` |
| `close(onCloseAction)` | `onCloseAction` - Function | Close lightbox.<br> `onCloseAction` - action that will be executed before hiding the lightbox. |
| `getLightbox()` | - | Return `div.lightbox`. |
| `appendContent(content)` | `content` - String/Node | Add content.<br> `content` — lightbox `content` |
| `replaceContent(content)` | `content` - String/Node | Replaces current content with new.<br> `content` — lightbox content |

## Install
\-

## Usage
```javascript
import LightboxPlugin from "LightboxPlugin";
```

## Animation
При открытии на лайтбокс вешается класс `lightbox--show`, его можно использовать для анимирования через transition или animation. При закрытии лайтбокса этот класс удаляется, после чего удаляется и сам лайтбокс из DOM.

## Example

## License
This project is available under the MIT license.
