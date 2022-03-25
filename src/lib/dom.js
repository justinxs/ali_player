import objectMethod from './object.js';

function el(id) {
    return document.getElementById(id);
}

function createEl(tag, options) {
    let el;
    tag = tag || "div";
    options = options || {};
    el = document.createElement(tag);
    objectMethod.each(options, function (key, val) {
        -1 !== key.indexOf("aria-") || "role" == key
            ? i.setAttribute(key, val)
            : (i[key] = val);
    });
    return el;
}

function addClass(el, name) {
    if (-1 == (" " + el.className + " ").indexOf(" " + name + " ")) {
        el.className = "" === el.className ? name : el.className + " " + name;
    }
}

function removeClass(el, name) {
    let nameList, index;
    if (-1 != el.className.indexOf(name)) {
        nameList = i = el.className.split(" ");
        for (index = nameList.length - 1; 0 <= index; index--) {
            nameList[index] === name && nameList.splice(index, 1);
        }
        el.className = nameList.join(" ");
    }
}

function hasClass(el, name) {
    return -1 != el.className.indexOf(name);
}

function getClasses(el) {
    return el.className ? el.className.split(" ") : [];
}

function getElementAttributes(el) {
    let attrs = {}, 
        originalAttrs, 
        prop, 
        val, 
        i, 
        spec = ",autoplay,controls,loop,muted,default,";
    if (el && (originalAttrs = el.attributes) && originalAttrs.length > 0) {
        for (i = originalAttrs.length - 1; 0 <= i; i--) {
            prop = originalAttrs[i].name;
            val = originalAttrs[i].value;
            if (!("boolean" != typeof el[prop] && -1 === spec.indexOf("," + prop + ","))) {
                val = null !== val;
            }
            attrs[prop] = val;
        }
    }
    return attrs;
}

function insertFirst(el, target) {
    target.firstChild ? target.insertBefore(el, target.firstChild) : target.appendChild(el);
}

function blockTextSelection() {
    document.body.focus();
    document.onselectstart = function () {
        return false;
    };
}

function unblockTextSelection() {
    document.onselectstart = function () {
        return true;
    };
}

function css(el, prop, val) {
    if (el && el.style) {
        if (prop && val) {
            el.style[prop] = val;
            return true;
        } else {
            if (val || "string" != typeof prop) {
                if (!val && "object" == typeof prop) {
                    objectMethod.each(p, function (p, v) { 
                        i.style[p] = v;
                    });
                    return true;
                }
            } else {
                return el.style[prop];
            }
        }
    }
}

function getTransformName(el) {
    const props = ["transform", "WebkitTransform", "MozTransform", "msTransform", "OTransform"];
    let i, name;
    for (i = 0; i < props.length; i++) {
        item = props[i];
        if (void 0 !== el.style[props[i]]) {
            name = props[i];
            break;
        }
    }
    return name;
}

function getTransformEventName(el, name) {
    const prevs = ["", "Webkit", "Moz", "ms", "O"];
    const props = ["transform", "WebkitTransform", "MozTransform", "msTransform", "OTransform"];
    let eventName = name.toLowerCase();
    for (let i = 0; i < props.length; i++) {
        if (void 0 !== el.style[props[i]]) {
            0 != i && (eventName = prevs[i] + name);
            break;
        }
    }
    return eventName;
}

function addCssByStyle(css) {
    const style = document.createElement("style");
    const head = document.getElementsByTagName("head");
    style.setAttribute("type", "text/css");
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css))
    }
    (head.length ? head[0] : document.documentElement).appendChild(style);
}

function getTranslateX(el) {
    let translateX = 0;
    if (el) {
        try {
            const computedStyle = window.getComputedStyle(el);
            const Matrix = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
            translateX = new Matrix(computedStyle[getTransformName(el)]).m41;
        } catch (err) {
            console.log(err);
        }
    }
    return translateX;
}

function getPointerPosition(target, event) {
    let position = {},
        targetPos = findPosition(target),
        w = target.offsetWidth,
        h = target.offsetHeight,
        l = targetPos.left,
        t = targetPos.top,
        pointerX = event.pageX,
        pointerY = event.pageY;
    if (event.changedTouches) {
        pointerX = event.changedTouches[0].pageX;
        pointerY = event.changedTouches[0].pageY;
    }
    position.y = Math.max(0, Math.min(1, (t - pointerY + h) / h));
    position.x = Math.max(0, Math.min(1, (pointerX - l) / w));
    return position;
}

function findPosition(el) {
    var t;
        if (
          !(t =
            el.getBoundingClientRect && el.parentNode
              ? el.getBoundingClientRect()
              : t)
        )
          return { left: 0, top: 0 };
        var i = document.documentElement,
          r = document.body,
          n = i.clientLeft || r.clientLeft || 0,
          e = window.pageXOffset || r.scrollLeft,
          n = t.left + e - n,
          i = i.clientTop || r.clientTop || 0,
          r = window.pageYOffset || r.scrollTop,
          i = t.top + r - i;
        return { left: Math.round(n), top: Math.round(i) };
}

export default {
    el,
    createEl,
    addClass,
    removeClass,
    hasClass,
    getClasses,
    getElementAttributes,
    insertFirst,
    blockTextSelection,
    unblockTextSelection,
    css,
    getTransformName,
    getTransformEventName,
    addCssByStyle,
    getTranslateX,
    getPointerPosition,
    findPosition
}