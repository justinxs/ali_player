const hasOwnProperty = Object.prototype.hasOwnProperty;

const create = Object.create || (prototype => {
    function t() {}
    t.prototype = prototype;
    return new t();
});

const isArray = Array.isArray || (target => {
    return "[object Array]" === Object.prototype.toString.call(target);
});

function isEmpty(target) {
    for (let prop in target) {
        if (null !== target[prop]) return false;
    }
    return true;
}

function each(target, cb, self) {
    if (isArray(target)) {
        for (let i = 0; i < target.length; i++) {
            if (cb.call(self || this, target[i], i) === false) {
                break;
            }
        }
    } else {
        for (let prop in target) {
            if (hasOwnProperty.call(target, prop) && false === cb.call(self || this, prop, target[prop])) break;
        }
    }
    return target;
}

function merge(val, newVal) {
    if (!newVal) return val;
    for (let k in newVal) hasOwnProperty.call(newVal, k) && (val[k] = newVal[k]);
    return val;
}

function deepMerge(val, newVal) {
    let v, nv;
    val = copy(val);
    for (let k in newVal) {
        if (hasOwnProperty.call(newVal, k)) {
            v = val[k];
            nv = newVal[k];
            isPlain(v) && isPlain(nv) ? (val[k] = deepMerge(v, nv)) : (val[k] = newVal[k]);
        }
    }

    return val;
}

function copy(target) {
    return merge({}, target);
}

function isPlain(target) {
    return !!target &&
        "object" == typeof target &&
        "[object Object]" === target.toString() &&
        target.constructor === Object;
}


function unescape(str) {
    const spec = {
        amp: "&",
        lt: "<",
        gt: ">",
        quot: '"',
        "#x27": "'",
        "#x60": "`",
    };
    return str.replace(/&([^;]+);/g, function (match, p1) {
        return spec[p1.toLowerCase()] || match;
    });
}

export default {
    create,
    isArray,
    isEmpty,
    each,
    merge,
    deepMerge,
    copy,
    isPlain,
    unescape
}