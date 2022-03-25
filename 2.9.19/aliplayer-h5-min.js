/*! Aliplayer - v2.9.19 - 2022-01-14 15.57.28 */
!(function r(n, o, a) {
  function s(t, e) {
    if (!o[t]) {
      if (!n[t]) {
        var i = "function" == typeof require && require;
        if (!e && i) return i(t, !0);
        if (l) return l(t, !0);
        throw (
          (((i = new Error("Cannot find module '" + t + "'")).code =
            "MODULE_NOT_FOUND"),
          i)
        );
      }
      (i = o[t] = { exports: {} }),
        n[t][0].call(
          i.exports,
          function (e) {
            return s(n[t][1][e] || e);
          },
          i,
          i.exports,
          r,
          n,
          o,
          a
        );
    }
    return o[t].exports;
  }
  for (
    var l = "function" == typeof require && require, e = 0;
    e < a.length;
    e++
  )
    s(a[e]);
  return s;
})(
  {
    1: [
      function (_, i, r) {
        !function (f) {
          !function () {
            var e, t;
            (e = this),
              (t = function () {
                return (function (u) {
                  var r;
                  if (
                    ("undefined" != typeof window &&
                      window.crypto &&
                      (r = window.crypto),
                    "undefined" != typeof self &&
                      self.crypto &&
                      (r = self.crypto),
                    !(r =
                      !(r =
                        !(r =
                          "undefined" != typeof globalThis && globalThis.crypto
                            ? globalThis.crypto
                            : r) &&
                        "undefined" != typeof window &&
                        window.msCrypto
                          ? window.msCrypto
                          : r) &&
                      void 0 !== f &&
                      f.crypto
                        ? f.crypto
                        : r) && "function" == typeof _)
                  )
                    try {
                      r = _("crypto");
                    } catch (e) {}
                  var i =
                    Object.create ||
                    function (e) {
                      return (
                        (t.prototype = e),
                        (e = new t()),
                        (t.prototype = null),
                        e
                      );
                    };
                  function t() {}
                  var e = {},
                    n = (e.lib = {}),
                    o = (n.Base = {
                      extend: function (e) {
                        var t = i(this);
                        return (
                          e && t.mixIn(e),
                          (t.hasOwnProperty("init") && this.init !== t.init) ||
                            (t.init = function () {
                              t.$super.init.apply(this, arguments);
                            }),
                          ((t.init.prototype = t).$super = this),
                          t
                        );
                      },
                      create: function () {
                        var e = this.extend();
                        return e.init.apply(e, arguments), e;
                      },
                      init: function () {},
                      mixIn: function (e) {
                        for (var t in e)
                          e.hasOwnProperty(t) && (this[t] = e[t]);
                        e.hasOwnProperty("toString") &&
                          (this.toString = e.toString);
                      },
                      clone: function () {
                        return this.init.prototype.extend(this);
                      },
                    }),
                    c = (n.WordArray = o.extend({
                      init: function (e, t) {
                        (e = this.words = e || []),
                          (this.sigBytes = null != t ? t : 4 * e.length);
                      },
                      toString: function (e) {
                        return (e || s).stringify(this);
                      },
                      concat: function (e) {
                        var t = this.words,
                          i = e.words,
                          r = this.sigBytes,
                          n = e.sigBytes;
                        if ((this.clamp(), r % 4))
                          for (var o = 0; o < n; o++) {
                            var a = (i[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
                            t[(r + o) >>> 2] |= a << (24 - ((r + o) % 4) * 8);
                          }
                        else
                          for (var s = 0; s < n; s += 4)
                            t[(r + s) >>> 2] = i[s >>> 2];
                        return (this.sigBytes += n), this;
                      },
                      clamp: function () {
                        var e = this.words,
                          t = this.sigBytes;
                        (e[t >>> 2] &= 4294967295 << (32 - (t % 4) * 8)),
                          (e.length = u.ceil(t / 4));
                      },
                      clone: function () {
                        var e = o.clone.call(this);
                        return (e.words = this.words.slice(0)), e;
                      },
                      random: function (e) {
                        for (var t = [], i = 0; i < e; i += 4)
                          t.push(
                            (function () {
                              if (r) {
                                if ("function" == typeof r.getRandomValues)
                                  try {
                                    return r.getRandomValues(
                                      new Uint32Array(1)
                                    )[0];
                                  } catch (e) {}
                                if ("function" == typeof r.randomBytes)
                                  try {
                                    return r.randomBytes(4).readInt32LE();
                                  } catch (e) {}
                              }
                              throw new Error(
                                "Native crypto module could not be used to get secure random number."
                              );
                            })()
                          );
                        return new c.init(t, e);
                      },
                    })),
                    a = (e.enc = {}),
                    s = (a.Hex = {
                      stringify: function (e) {
                        for (
                          var t = e.words, i = e.sigBytes, r = [], n = 0;
                          n < i;
                          n++
                        ) {
                          var o = (t[n >>> 2] >>> (24 - (n % 4) * 8)) & 255;
                          r.push((o >>> 4).toString(16)),
                            r.push((15 & o).toString(16));
                        }
                        return r.join("");
                      },
                      parse: function (e) {
                        for (var t = e.length, i = [], r = 0; r < t; r += 2)
                          i[r >>> 3] |=
                            parseInt(e.substr(r, 2), 16) << (24 - (r % 8) * 4);
                        return new c.init(i, t / 2);
                      },
                    }),
                    l = (a.Latin1 = {
                      stringify: function (e) {
                        for (
                          var t = e.words, i = e.sigBytes, r = [], n = 0;
                          n < i;
                          n++
                        ) {
                          var o = (t[n >>> 2] >>> (24 - (n % 4) * 8)) & 255;
                          r.push(String.fromCharCode(o));
                        }
                        return r.join("");
                      },
                      parse: function (e) {
                        for (var t = e.length, i = [], r = 0; r < t; r++)
                          i[r >>> 2] |=
                            (255 & e.charCodeAt(r)) << (24 - (r % 4) * 8);
                        return new c.init(i, t);
                      },
                    }),
                    d = (a.Utf8 = {
                      stringify: function (e) {
                        try {
                          return decodeURIComponent(escape(l.stringify(e)));
                        } catch (e) {
                          throw new Error("Malformed UTF-8 data");
                        }
                      },
                      parse: function (e) {
                        return l.parse(unescape(encodeURIComponent(e)));
                      },
                    }),
                    p = (n.BufferedBlockAlgorithm = o.extend({
                      reset: function () {
                        (this._data = new c.init()), (this._nDataBytes = 0);
                      },
                      _append: function (e) {
                        "string" == typeof e && (e = d.parse(e)),
                          this._data.concat(e),
                          (this._nDataBytes += e.sigBytes);
                      },
                      _process: function (e) {
                        var t,
                          i = this._data,
                          r = i.words,
                          n = i.sigBytes,
                          o = this.blockSize,
                          a = n / (4 * o),
                          s =
                            (a = e
                              ? u.ceil(a)
                              : u.max((0 | a) - this._minBufferSize, 0)) * o,
                          n = u.min(4 * s, n);
                        if (s) {
                          for (var l = 0; l < s; l += o)
                            this._doProcessBlock(r, l);
                          (t = r.splice(0, s)), (i.sigBytes -= n);
                        }
                        return new c.init(t, n);
                      },
                      clone: function () {
                        var e = o.clone.call(this);
                        return (e._data = this._data.clone()), e;
                      },
                      _minBufferSize: 0,
                    })),
                    h =
                      ((n.Hasher = p.extend({
                        cfg: o.extend(),
                        init: function (e) {
                          (this.cfg = this.cfg.extend(e)), this.reset();
                        },
                        reset: function () {
                          p.reset.call(this), this._doReset();
                        },
                        update: function (e) {
                          return this._append(e), this._process(), this;
                        },
                        finalize: function (e) {
                          return e && this._append(e), this._doFinalize();
                        },
                        blockSize: 16,
                        _createHelper: function (i) {
                          return function (e, t) {
                            return new i.init(t).finalize(e);
                          };
                        },
                        _createHmacHelper: function (i) {
                          return function (e, t) {
                            return new h.HMAC.init(i, t).finalize(e);
                          };
                        },
                      })),
                      (e.algo = {}));
                  return e;
                })(Math);
              }),
              "object" == typeof r
                ? (i.exports = r = t())
                : "function" == typeof define && define.amd
                ? define([], t)
                : (e.CryptoJS = t());
          }.call(this);
        }.call(
          this,
          "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : "undefined" != typeof window
            ? window
            : {}
        );
      },
      { crypto: 8 },
    ],
    2: [
      function (e, t, i) {
        var r, n;
        (r = this),
          (n = function (e) {
            var l;
            return (
              (l = e.lib.WordArray),
              (e.enc.Base64 = {
                stringify: function (e) {
                  var t = e.words,
                    i = e.sigBytes,
                    r = this._map;
                  e.clamp();
                  for (var n = [], o = 0; o < i; o += 3)
                    for (
                      var a =
                          (((t[o >>> 2] >>> (24 - (o % 4) * 8)) & 255) << 16) |
                          (((t[(o + 1) >>> 2] >>> (24 - ((o + 1) % 4) * 8)) &
                            255) <<
                            8) |
                          ((t[(o + 2) >>> 2] >>> (24 - ((o + 2) % 4) * 8)) &
                            255),
                        s = 0;
                      s < 4 && o + 0.75 * s < i;
                      s++
                    )
                      n.push(r.charAt((a >>> (6 * (3 - s))) & 63));
                  var l = r.charAt(64);
                  if (l) for (; n.length % 4; ) n.push(l);
                  return n.join("");
                },
                parse: function (e) {
                  var t = e.length,
                    i = this._map;
                  if (!(r = this._reverseMap))
                    for (
                      var r = (this._reverseMap = []), n = 0;
                      n < i.length;
                      n++
                    )
                      r[i.charCodeAt(n)] = n;
                  var o = i.charAt(64);
                  return (
                    !o || (-1 !== (o = e.indexOf(o)) && (t = o)),
                    (function (e, t, i) {
                      for (var r = [], n = 0, o = 0; o < t; o++) {
                        var a, s;
                        o % 4 &&
                          ((a = i[e.charCodeAt(o - 1)] << ((o % 4) * 2)),
                          (s = i[e.charCodeAt(o)] >>> (6 - (o % 4) * 2)),
                          (s = a | s),
                          (r[n >>> 2] |= s << (24 - (n % 4) * 8)),
                          n++);
                      }
                      return l.create(r, n);
                    })(e, t, r)
                  );
                },
                _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
              }),
              e.enc.Base64
            );
          }),
          "object" == typeof i
            ? (t.exports = i = n(e("./core")))
            : "function" == typeof define && define.amd
            ? define(["./core"], n)
            : n(r.CryptoJS);
      },
      { "./core": 1 },
    ],
    3: [
      function (e, t, i) {
        var r, n;
        (r = this),
          (n = function (e) {
            return e.enc.Utf8;
          }),
          "object" == typeof i
            ? (t.exports = i = n(e("./core")))
            : "function" == typeof define && define.amd
            ? define(["./core"], n)
            : n(r.CryptoJS);
      },
      { "./core": 1 },
    ],
    4: [
      function (e, t, i) {
        var r, n;
        (r = this),
          (n = function (e) {
            return e.HmacSHA1;
          }),
          "object" == typeof i
            ? (t.exports = i = n(e("./core"), e("./sha1"), e("./hmac")))
            : "function" == typeof define && define.amd
            ? define(["./core", "./sha1", "./hmac"], n)
            : n(r.CryptoJS);
      },
      { "./core": 1, "./hmac": 5, "./sha1": 6 },
    ],
    5: [
      function (e, t, i) {
        var r, n;
        (r = this),
          (n = function (e) {
            var t, s;
            (t = e.lib.Base),
              (s = e.enc.Utf8),
              (e.algo.HMAC = t.extend({
                init: function (e, t) {
                  (e = this._hasher = new e.init()),
                    "string" == typeof t && (t = s.parse(t));
                  var i = e.blockSize,
                    r = 4 * i;
                  (t = t.sigBytes > r ? e.finalize(t) : t).clamp();
                  for (
                    var e = (this._oKey = t.clone()),
                      t = (this._iKey = t.clone()),
                      n = e.words,
                      o = t.words,
                      a = 0;
                    a < i;
                    a++
                  )
                    (n[a] ^= 1549556828), (o[a] ^= 909522486);
                  (e.sigBytes = t.sigBytes = r), this.reset();
                },
                reset: function () {
                  var e = this._hasher;
                  e.reset(), e.update(this._iKey);
                },
                update: function (e) {
                  return this._hasher.update(e), this;
                },
                finalize: function (e) {
                  var t = this._hasher,
                    e = t.finalize(e);
                  return t.reset(), t.finalize(this._oKey.clone().concat(e));
                },
              }));
          }),
          "object" == typeof i
            ? (t.exports = i = n(e("./core")))
            : "function" == typeof define && define.amd
            ? define(["./core"], n)
            : n(r.CryptoJS);
      },
      { "./core": 1 },
    ],
    6: [
      function (e, t, i) {
        var r, n;
        (r = this),
          (n = function (e) {
            var t, i, r, n, c;
            return (
              (i = (t = e).lib),
              (r = i.WordArray),
              (n = i.Hasher),
              (i = t.algo),
              (c = []),
              (i = i.SHA1 =
                n.extend({
                  _doReset: function () {
                    this._hash = new r.init([
                      1732584193, 4023233417, 2562383102, 271733878, 3285377520,
                    ]);
                  },
                  _doProcessBlock: function (e, t) {
                    for (
                      var i = this._hash.words,
                        r = i[0],
                        n = i[1],
                        o = i[2],
                        a = i[3],
                        s = i[4],
                        l = 0;
                      l < 80;
                      l++
                    ) {
                      l < 16
                        ? (c[l] = 0 | e[t + l])
                        : ((u = c[l - 3] ^ c[l - 8] ^ c[l - 14] ^ c[l - 16]),
                          (c[l] = (u << 1) | (u >>> 31)));
                      var u = ((r << 5) | (r >>> 27)) + s + c[l];
                      (u +=
                        l < 20
                          ? 1518500249 + ((n & o) | (~n & a))
                          : l < 40
                          ? 1859775393 + (n ^ o ^ a)
                          : l < 60
                          ? ((n & o) | (n & a) | (o & a)) - 1894007588
                          : (n ^ o ^ a) - 899497514),
                        (s = a),
                        (a = o),
                        (o = (n << 30) | (n >>> 2)),
                        (n = r),
                        (r = u);
                    }
                    (i[0] = (i[0] + r) | 0),
                      (i[1] = (i[1] + n) | 0),
                      (i[2] = (i[2] + o) | 0),
                      (i[3] = (i[3] + a) | 0),
                      (i[4] = (i[4] + s) | 0);
                  },
                  _doFinalize: function () {
                    var e = this._data,
                      t = e.words,
                      i = 8 * this._nDataBytes,
                      r = 8 * e.sigBytes;
                    return (
                      (t[r >>> 5] |= 128 << (24 - (r % 32))),
                      (t[14 + (((64 + r) >>> 9) << 4)] = Math.floor(
                        i / 4294967296
                      )),
                      (t[15 + (((64 + r) >>> 9) << 4)] = i),
                      (e.sigBytes = 4 * t.length),
                      this._process(),
                      this._hash
                    );
                  },
                  clone: function () {
                    var e = n.clone.call(this);
                    return (e._hash = this._hash.clone()), e;
                  },
                })),
              (t.SHA1 = n._createHelper(i)),
              (t.HmacSHA1 = n._createHmacHelper(i)),
              e.SHA1
            );
          }),
          "object" == typeof i
            ? (t.exports = i = n(e("./core")))
            : "function" == typeof define && define.amd
            ? define(["./core"], n)
            : n(r.CryptoJS);
      },
      { "./core": 1 },
    ],
    7: [
      function (q, i, r) {
        !function (V, j) {
          !function () {
            var e, t;
            (e = this),
              (t = function () {
                "use strict";
                function l(e) {
                  return "function" == typeof e;
                }
                var i =
                    Array.isArray ||
                    function (e) {
                      return (
                        "[object Array]" === Object.prototype.toString.call(e)
                      );
                    },
                  r = 0,
                  t = void 0,
                  n = void 0,
                  a = function (e, t) {
                    (d[r] = e),
                      (d[r + 1] = t),
                      2 === (r += 2) && (n ? n(p) : v());
                  };
                var e = "undefined" != typeof window ? window : void 0,
                  o = e || {},
                  s = o.MutationObserver || o.WebKitMutationObserver,
                  u =
                    "undefined" == typeof self &&
                    void 0 !== V &&
                    "[object process]" === {}.toString.call(V),
                  o =
                    "undefined" != typeof Uint8ClampedArray &&
                    "undefined" != typeof importScripts &&
                    "undefined" != typeof MessageChannel;
                function c() {
                  var e = setTimeout;
                  return function () {
                    return e(p, 1);
                  };
                }
                var d = new Array(1e3);
                function p() {
                  for (var e = 0; e < r; e += 2)
                    (0, d[e])(d[e + 1]), (d[e] = void 0), (d[e + 1] = void 0);
                  r = 0;
                }
                function h() {
                  try {
                    var e = Function("return this")().require("vertx");
                    return void 0 !== (t = e.runOnLoop || e.runOnContext)
                      ? function () {
                          t(p);
                        }
                      : c();
                  } catch (e) {
                    return c();
                  }
                }
                var f,
                  _,
                  y,
                  g,
                  v = void 0;
                function m(e, t) {
                  var i = this,
                    r = new this.constructor(T);
                  void 0 === r[b] && O(r);
                  var n,
                    o = i._state;
                  return (
                    o
                      ? ((n = arguments[o - 1]),
                        a(function () {
                          return M(o, r, n, i._result);
                        }))
                      : D(i, r, e, t),
                    r
                  );
                }
                function S(e) {
                  if (e && "object" == typeof e && e.constructor === this)
                    return e;
                  var t = new this(T);
                  return C(t, e), t;
                }
                var v = u
                    ? function () {
                        return V.nextTick(p);
                      }
                    : s
                    ? ((_ = 0),
                      (y = new s(p)),
                      (g = document.createTextNode("")),
                      y.observe(g, { characterData: !0 }),
                      function () {
                        g.data = _ = ++_ % 2;
                      })
                    : o
                    ? (((f = new MessageChannel()).port1.onmessage = p),
                      function () {
                        return f.port2.postMessage(0);
                      })
                    : (void 0 === e && "function" == typeof q ? h : c)(),
                  b = Math.random().toString(36).substring(2);
                function T() {}
                var x = void 0,
                  E = 1,
                  w = 2;
                function P(e, r, n) {
                  a(function (t) {
                    var i = !1,
                      e = (function (e, t, i, r) {
                        try {
                          e.call(t, i, r);
                        } catch (e) {
                          return e;
                        }
                      })(
                        n,
                        r,
                        function (e) {
                          i || ((i = !0), (r !== e ? C : I)(t, e));
                        },
                        function (e) {
                          i || ((i = !0), R(t, e));
                        },
                        t._label
                      );
                    !i && e && ((i = !0), R(t, e));
                  }, e);
                }
                function k(e, t, i) {
                  var r, n;
                  t.constructor === e.constructor &&
                  i === m &&
                  t.constructor.resolve === S
                    ? ((r = e),
                      (n = t)._state === E
                        ? I(r, n._result)
                        : n._state === w
                        ? R(r, n._result)
                        : D(
                            n,
                            void 0,
                            function (e) {
                              return C(r, e);
                            },
                            function (e) {
                              return R(r, e);
                            }
                          ))
                    : void 0 !== i && l(i)
                    ? P(e, t, i)
                    : I(e, t);
                }
                function C(t, e) {
                  if (t === e)
                    R(
                      t,
                      new TypeError("You cannot resolve a promise with itself")
                    );
                  else if (
                    ((i = typeof e),
                    null === e || ("object" != i && "function" != i))
                  )
                    I(t, e);
                  else {
                    i = void 0;
                    try {
                      i = e.then;
                    } catch (e) {
                      return void R(t, e);
                    }
                    k(t, e, i);
                  }
                  var i;
                }
                function L(e) {
                  e._onerror && e._onerror(e._result), A(e);
                }
                function I(e, t) {
                  e._state === x &&
                    ((e._result = t),
                    (e._state = E),
                    0 !== e._subscribers.length && a(A, e));
                }
                function R(e, t) {
                  e._state === x && ((e._state = w), (e._result = t), a(L, e));
                }
                function D(e, t, i, r) {
                  var n = e._subscribers,
                    o = n.length;
                  (e._onerror = null),
                    (n[o] = t),
                    (n[o + E] = i),
                    (n[o + w] = r),
                    0 === o && e._state && a(A, e);
                }
                function A(e) {
                  var t = e._subscribers,
                    i = e._state;
                  if (0 !== t.length) {
                    for (
                      var r, n = void 0, o = e._result, a = 0;
                      a < t.length;
                      a += 3
                    )
                      (r = t[a]), (n = t[a + i]), r ? M(i, r, n, o) : n(o);
                    e._subscribers.length = 0;
                  }
                }
                function M(e, t, i, r) {
                  var n = l(i),
                    o = void 0,
                    a = void 0,
                    s = !0;
                  if (n) {
                    try {
                      o = i(r);
                    } catch (e) {
                      (s = !1), (a = e);
                    }
                    if (t === o)
                      return void R(
                        t,
                        new TypeError(
                          "A promises callback cannot return that same promise."
                        )
                      );
                  } else o = r;
                  t._state !== x ||
                    (n && s
                      ? C(t, o)
                      : !1 === s
                      ? R(t, a)
                      : e === E
                      ? I(t, o)
                      : e === w && R(t, o));
                }
                var H = 0;
                function O(e) {
                  (e[b] = H++),
                    (e._state = void 0),
                    (e._result = void 0),
                    (e._subscribers = []);
                }
                var U =
                  ((N.prototype._enumerate = function (e) {
                    for (var t = 0; this._state === x && t < e.length; t++)
                      this._eachEntry(e[t], t);
                  }),
                  (N.prototype._eachEntry = function (t, e) {
                    var i = this._instanceConstructor,
                      r = i.resolve;
                    if (r === S) {
                      var n,
                        o = void 0,
                        a = void 0,
                        s = !1;
                      try {
                        o = t.then;
                      } catch (e) {
                        (s = !0), (a = e);
                      }
                      o === m && t._state !== x
                        ? this._settledAt(t._state, e, t._result)
                        : "function" != typeof o
                        ? (this._remaining--, (this._result[e] = t))
                        : i === F
                        ? ((n = new i(T)),
                          s ? R(n, a) : k(n, t, o),
                          this._willSettleAt(n, e))
                        : this._willSettleAt(
                            new i(function (e) {
                              return e(t);
                            }),
                            e
                          );
                    } else this._willSettleAt(r(t), e);
                  }),
                  (N.prototype._settledAt = function (e, t, i) {
                    var r = this.promise;
                    r._state === x &&
                      (this._remaining--,
                      e === w ? R(r, i) : (this._result[t] = i)),
                      0 === this._remaining && I(r, this._result);
                  }),
                  (N.prototype._willSettleAt = function (e, t) {
                    var i = this;
                    D(
                      e,
                      void 0,
                      function (e) {
                        return i._settledAt(E, t, e);
                      },
                      function (e) {
                        return i._settledAt(w, t, e);
                      }
                    );
                  }),
                  N);
                function N(e, t) {
                  (this._instanceConstructor = e),
                    (this.promise = new e(T)),
                    this.promise[b] || O(this.promise),
                    i(t)
                      ? ((this.length = t.length),
                        (this._remaining = t.length),
                        (this._result = new Array(this.length)),
                        0 === this.length
                          ? I(this.promise, this._result)
                          : ((this.length = this.length || 0),
                            this._enumerate(t),
                            0 === this._remaining &&
                              I(this.promise, this._result)))
                      : R(
                          this.promise,
                          new Error("Array Methods must be provided an Array")
                        );
                }
                var F =
                  ((B.prototype.catch = function (e) {
                    return this.then(null, e);
                  }),
                  (B.prototype.finally = function (t) {
                    var i = this.constructor;
                    return l(t)
                      ? this.then(
                          function (e) {
                            return i.resolve(t()).then(function () {
                              return e;
                            });
                          },
                          function (e) {
                            return i.resolve(t()).then(function () {
                              throw e;
                            });
                          }
                        )
                      : this.then(t, t);
                  }),
                  B);
                function B(e) {
                  (this[b] = H++),
                    (this._result = this._state = void 0),
                    (this._subscribers = []),
                    T !== e &&
                      ("function" != typeof e &&
                        (function () {
                          throw new TypeError(
                            "You must pass a resolver function as the first argument to the promise constructor"
                          );
                        })(),
                      this instanceof B
                        ? (function (t, e) {
                            try {
                              e(
                                function (e) {
                                  C(t, e);
                                },
                                function (e) {
                                  R(t, e);
                                }
                              );
                            } catch (e) {
                              R(t, e);
                            }
                          })(this, e)
                        : (function () {
                            throw new TypeError(
                              "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
                            );
                          })());
                }
                return (
                  (F.prototype.then = m),
                  (F.all = function (e) {
                    return new U(this, e).promise;
                  }),
                  (F.race = function (n) {
                    var o = this;
                    return i(n)
                      ? new o(function (e, t) {
                          for (var i = n.length, r = 0; r < i; r++)
                            o.resolve(n[r]).then(e, t);
                        })
                      : new o(function (e, t) {
                          return t(
                            new TypeError("You must pass an array to race.")
                          );
                        });
                  }),
                  (F.resolve = S),
                  (F.reject = function (e) {
                    var t = new this(T);
                    return R(t, e), t;
                  }),
                  (F._setScheduler = function (e) {
                    n = e;
                  }),
                  (F._setAsap = function (e) {
                    a = e;
                  }),
                  (F._asap = a),
                  (F.polyfill = function () {
                    var e = void 0;
                    if (void 0 !== j) e = j;
                    else if ("undefined" != typeof self) e = self;
                    else
                      try {
                        e = Function("return this")();
                      } catch (e) {
                        throw new Error(
                          "polyfill failed because global object is unavailable in this environment"
                        );
                      }
                    var t = e.Promise;
                    if (t) {
                      var i = null;
                      try {
                        i = Object.prototype.toString.call(t.resolve());
                      } catch (e) {}
                      if ("[object Promise]" === i && !t.cast) return;
                    }
                    e.Promise = F;
                  }),
                  (F.Promise = F)
                );
              }),
              "object" == typeof r && void 0 !== i
                ? (i.exports = t())
                : "function" == typeof define && define.amd
                ? define(t)
                : (e.ES6Promise = t());
          }.call(this);
        }.call(
          this,
          q("_process"),
          "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : "undefined" != typeof window
            ? window
            : {}
        );
      },
      { _process: 9 },
    ],
    8: [function (e, t, i) {}, {}],
    9: [
      function (e, t, i) {
        var r,
          n,
          t = (t.exports = {});
        function o() {
          throw new Error("setTimeout has not been defined");
        }
        function a() {
          throw new Error("clearTimeout has not been defined");
        }
        function s(t) {
          if (r === setTimeout) return setTimeout(t, 0);
          if ((r === o || !r) && setTimeout)
            return (r = setTimeout), setTimeout(t, 0);
          try {
            return r(t, 0);
          } catch (e) {
            try {
              return r.call(null, t, 0);
            } catch (e) {
              return r.call(this, t, 0);
            }
          }
        }
        !(function () {
          try {
            r = "function" == typeof setTimeout ? setTimeout : o;
          } catch (e) {
            r = o;
          }
          try {
            n = "function" == typeof clearTimeout ? clearTimeout : a;
          } catch (e) {
            n = a;
          }
        })();
        var l,
          u = [],
          c = !1,
          d = -1;
        function p() {
          c &&
            l &&
            ((c = !1),
            l.length ? (u = l.concat(u)) : (d = -1),
            u.length && h());
        }
        function h() {
          if (!c) {
            var e = s(p);
            c = !0;
            for (var t = u.length; t; ) {
              for (l = u, u = []; ++d < t; ) l && l[d].run();
              (d = -1), (t = u.length);
            }
            (l = null),
              (c = !1),
              (function (t) {
                if (n === clearTimeout) return clearTimeout(t);
                if ((n === a || !n) && clearTimeout)
                  return (n = clearTimeout), clearTimeout(t);
                try {
                  n(t);
                } catch (e) {
                  try {
                    return n.call(null, t);
                  } catch (e) {
                    return n.call(this, t);
                  }
                }
              })(e);
          }
        }
        function f(e, t) {
          (this.fun = e), (this.array = t);
        }
        function _() {}
        (t.nextTick = function (e) {
          var t = new Array(arguments.length - 1);
          if (1 < arguments.length)
            for (var i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
          u.push(new f(e, t)), 1 !== u.length || c || s(h);
        }),
          (f.prototype.run = function () {
            this.fun.apply(null, this.array);
          }),
          (t.title = "browser"),
          (t.browser = !0),
          (t.env = {}),
          (t.argv = []),
          (t.version = ""),
          (t.versions = {}),
          (t.on = _),
          (t.addListener = _),
          (t.once = _),
          (t.off = _),
          (t.removeListener = _),
          (t.removeAllListeners = _),
          (t.emit = _),
          (t.prependListener = _),
          (t.prependOnceListener = _),
          (t.listeners = function (e) {
            return [];
          }),
          (t.binding = function (e) {
            throw new Error("process.binding is not supported");
          }),
          (t.cwd = function () {
            return "/";
          }),
          (t.chdir = function (e) {
            throw new Error("process.chdir is not supported");
          }),
          (t.umask = function () {
            return 0;
          });
      },
      {},
    ],
    10: [
      function (e, t, i) {
        var r = e("../ui/component"),
          n = (e("../lib/util"), e("../lib/dom")),
          o = e("../lib/event"),
          a = (e("../lib/ua"), e("../lang/index")),
          s = e("../player/base/event/eventtype"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t),
                (this.className = t.className || "prism-auto-stream-selector"),
                this.addClass(this.className);
            },
            createEl: function () {
              var e = r.prototype.createEl.call(this, "div");
              return (
                (e.innerHTML =
                  "<div><p class='tip-text'></p></div><div class='operators'><a class='prism-button prism-button-ok' type='button'>" +
                  a.get("OK_Text") +
                  "</a><a class='prism-button prism-button-cancel'  target='_blank'>" +
                  a.get("Cancel_Text") +
                  "</a></div>"),
                e
              );
            },
            bindEvent: function () {
              var r = this;
              r._player.on(s.Private.AutoStreamShow, function (e) {
                var t,
                  i = document.querySelector("#" + r.getId() + " .tip-text");
                !r._player._getLowerQualityLevel ||
                  ((t = r._player._getLowerQualityLevel()) &&
                    ((r._switchUrl = t),
                    (i.innerText = a
                      .get("Auto_Stream_Tip_Text")
                      .replace("$$", t.item.desc)),
                    n.css(r.el(), "display", "block")));
              }),
                r._player.on(s.Private.AutoStreamHide, function (e) {
                  document.querySelector("#" + r.getId() + " .tip-text");
                  n.css(r.el(), "display", "none");
                });
              var e = document.querySelector(
                "#" + r.getId() + " .prism-button-ok"
              );
              o.on(e, "click", function () {
                r._player._changeStream &&
                  r._switchUrl &&
                  r._player._changeStream(
                    r._switchUrl.index,
                    a.get("Quality_Change_Text")
                  ),
                  n.css(r.el(), "display", "none");
              });
              e = document.querySelector(
                "#" + r.getId() + " .prism-button-cancel"
              );
              o.on(e, "click", function () {
                n.css(r.el(), "display", "none");
              });
            },
          });
        t.exports = e;
      },
      {
        "../lang/index": 20,
        "../lib/dom": 28,
        "../lib/event": 29,
        "../lib/ua": 42,
        "../lib/util": 44,
        "../player/base/event/eventtype": 54,
        "../ui/component": 109,
      },
    ],
    11: [
      function (e, t, i) {
        var r = e("../ui/component"),
          a = e("../lib/dom"),
          n = e("../lib/event"),
          o = e("../lib/ua"),
          s = e("../lib/function"),
          l = (e("../lang/index"), e("../lib/util")),
          u = e("../config"),
          c = e("../lib/playerutil"),
          d = e("../player/base/event/eventtype"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t),
                (this.className = t.className || "prism-liveshift-progress"),
                this.addClass(this.className),
                (this._liveshiftService = e._liveshiftService);
            },
            createEl: function () {
              var e = r.prototype.createEl.call(this);
              return (
                (e.innerHTML =
                  '<div class="prism-enable-liveshift"><div class="prism-progress-loaded"></div><div class="prism-progress-played"></div><div class="prism-progress-cursor"><img></img></div><p class="prism-progress-time"></p><div class="prism-liveshift-seperator">00:00:00</div></div><div class="prism-disable-liveshift"></div>'),
                e
              );
            },
            bindEvent: function () {
              var t = this;
              (this.loadedNode = document.querySelector(
                "#" + this.id() + " .prism-progress-loaded"
              )),
                (this.playedNode = document.querySelector(
                  "#" + this.id() + " .prism-progress-played"
                )),
                (this.cursorNode = document.querySelector(
                  "#" + this.id() + " .prism-progress-cursor"
                )),
                (this.timeNode = document.querySelector(
                  "#" + this.id() + " .prism-progress-time"
                )),
                (this.controlNode = document.querySelector(
                  "#" + this._player._options.id + " .prism-controlbar"
                )),
                (this.seperatorNode = document.querySelector(
                  "#" + this.id() + " .prism-liveshift-seperator"
                )),
                (this.progressNode = document.querySelector(
                  "#" + this.id() + " .prism-enable-liveshift"
                ));
              var e = document.querySelector(
                  "#" + this.id() + " .prism-progress-cursor img"
                ),
                i =
                  "//" +
                  u.domain +
                  "/de/prismplayer/" +
                  u.h5Version +
                  "/skins/default/img/dragcursor.png";
              u.domain
                ? -1 < u.domain.indexOf("localhost") &&
                  (i =
                    "//" + u.domain + "/build/skins/default/img/dragcursor.png")
                : (i =
                    this._player &&
                    this._player._options &&
                    this._player._options.sdkDomain
                      ? this._player._options.sdkDomain +
                        "/de/prismplayer/" +
                        u.h5Version +
                        "/skins/default/img/dragcursor.png"
                      : "de/prismplayer/" +
                        u.h5Version +
                        "/skins/default/img/dragcursor.png"),
                (e.src = i),
                n.on(this.cursorNode, "mousedown", function (e) {
                  t._onMouseDown(e);
                }),
                n.on(this.cursorNode, "touchstart", function (e) {
                  t._onMouseDown(e);
                }),
                n.on(this.progressNode, "mousemove", function (e) {
                  t._progressMove(e);
                }),
                n.on(this.progressNode, "touchmove", function (e) {
                  t._progressMove(e);
                });
              function r(e) {
                t._progressDown = e;
              }
              n.on(this.progressNode, "mousedown", function (e) {
                r(!0);
              }),
                n.on(this.progressNode, "touchstart", function (e) {
                  r(!0);
                }),
                n.on(this.progressNode, "mouseup", function (e) {
                  r(!1);
                }),
                n.on(this.progressNode, "touchend", function (e) {
                  r(!1);
                }),
                n.on(this._el, "click", function (e) {
                  t._onMouseClick(e);
                }),
                this._player.on(d.Private.HideProgress, function (e) {
                  t._hideProgress(e);
                }),
                this._player.on(d.Private.CancelHideProgress, function (e) {
                  t._cancelHideProgress(e);
                }),
                this._player.on(d.Private.ShowBar, function () {
                  t._updateLayout();
                }),
                n.on(this.progressNode, d.Private.MouseOver, function (e) {
                  t._onMouseOver(e);
                }),
                n.on(this.progressNode, d.Private.MouseOut, function (e) {
                  t._onMouseOut(e);
                }),
                (this.bindTimeupdate = s.bind(this, this._onTimeupdate)),
                this._player.on(d.Player.TimeUpdate, this.bindTimeupdate),
                c.isLiveShift(this._player._options) &&
                  this._player.on(d.Player.Play, function () {
                    t._liveshiftService.start(6e4, function (e) {
                      e = {
                        mediaId: t._player._options.vid || "",
                        error_code: e.Code,
                        error_msg: e.Message,
                      };
                      t._player.logError(e),
                        t._player.trigger(d.Player.Error, e);
                    });
                  }),
                this._player.on(d.Private.LiveShiftQueryCompleted, function () {
                  t._updateSeperator(), t._updateLayout();
                }),
                this._player.on(d.Private.LiveShiftSwitchToLive, function () {
                  t._updateCursorPosition();
                }),
                this._player.on(d.Player.Pause, function () {
                  t._liveshiftService.stop();
                }),
                o.IS_IPAD
                  ? (this.interval = setInterval(function () {
                      t._onProgress();
                    }, 500))
                  : this._player.on(d.Video.Progress, function () {
                      t._onProgress();
                    });
            },
            _updateSeperator: function () {
              this._liveshiftService.currentTimeDisplay &&
                (this.seperatorNode.innerText =
                  this._liveshiftService.currentTimeDisplay);
            },
            _updateLayout: function () {
              var e = this.seperatorNode.offsetWidth,
                t = this.el().offsetWidth,
                i = t - e;
              0 != e &&
                0 != i &&
                (a.css(this.progressNode, "width", (100 * (i - 10)) / t + "%"),
                a.css(this.seperatorNode, "right", -1 * (e + 10) + "px"));
            },
            _progressMove: function (e) {
              var t = this._getSeconds(e),
                i = this._liveshiftService.availableLiveShiftTime;
              this.timeNode.innerText = "-" + l.formatTime(i - t);
              (t = i ? t / i : 0),
                (i = 1 - this.timeNode.clientWidth / this.el().clientWidth);
              i < t && (t = i),
                this.timeNode &&
                  (a.css(this.timeNode, "display", "block"),
                  a.css(this.timeNode, "left", 100 * t + "%"));
              var r = this;
              !o.IS_PC &&
                r._progressDown &&
                (r.progressSeekTimer && clearTimeout(r.progressSeekTimer),
                (r.progressSeekTimer = setTimeout(function () {
                  r._progressDown || r._onMouseClick(e);
                }, 200)));
            },
            _hideProgress: function (e) {
              n.off(this.cursorNode, "mousedown"),
                n.off(this.cursorNode, "touchstart");
            },
            _cancelHideProgress: function (e) {
              var t = this;
              n.on(this.cursorNode, "mousedown", function (e) {
                t._onMouseDown(e);
              }),
                n.on(this.cursorNode, "touchstart", function (e) {
                  t._onMouseDown(e);
                });
            },
            _canSeekable: function (e) {
              var t = !0;
              return (t =
                "function" == typeof this._player.canSeekable
                  ? this._player.canSeekable(e)
                  : t);
            },
            _onMouseOver: function (e) {
              this._updateCursorPosition(this._getCurrentTime()),
                a.css(this.timeNode, "display", "block");
            },
            _onMouseOut: function (e) {
              a.css(this.timeNode, "display", "none");
            },
            _getSeconds: function (e) {
              for (
                var t = this.el().offsetLeft, i = this.el();
                (i = i.offsetParent);

              ) {
                var r = a.getTranslateX(i);
                t += i.offsetLeft + r;
              }
              var n = (
                  e.touches && e.touches.length
                    ? e.touches[0]
                    : e.changedTouches && e.changedTouches.length
                    ? e.changedTouches[0]
                    : e
                ).pageX,
                o = this.progressNode.offsetWidth,
                e = this._liveshiftService.availableLiveShiftTime;
              return (
                (sec = e ? ((n - t) / o) * e : 0),
                sec < 0 && (sec = 0),
                sec > e && (sec = e),
                sec
              );
            },
            _onMouseClick: function (e) {
              var t = this,
                i = this._getSeconds(e),
                r = this._liveshiftService.availableLiveShiftTime,
                n = r - i,
                e = this._player._options;
              n <= e.liveShiftMinOffset && (i = r - (n = e.liveShiftMinOffset)),
                this._player.trigger(d.Private.SeekStart, {
                  fromTime: this._getCurrentTime(),
                });
              (e = this._liveshiftService.getSourceUrl(n)),
                (n = c.isHls(t._player._options.source));
              t._player._loadByUrlInner(e, i, !0),
                t._player.trigger(d.Private.Play_Btn_Hide),
                (t._liveshiftService.seekTime = i),
                t._player.trigger(d.Private.EndStart, { toTime: i }),
                t._updateProgressBar(this.playedNode, i),
                t._updateCursorPosition(i),
                setTimeout(function () {
                  t._progressDown || t._onMouseOut();
                }, 500),
                n &&
                  setTimeout(function () {
                    t._player.play();
                  });
            },
            _onMouseDown: function (e) {
              var t = this;
              e.preventDefault(),
                this._player.trigger(d.Private.SeekStart, {
                  fromTime: this._getCurrentTime(),
                }),
                n.on(this.controlNode, "mousemove", function (e) {
                  t._onMouseMove(e);
                }),
                n.on(this.controlNode, "touchmove", function (e) {
                  t._onMouseMove(e);
                }),
                n.on(this.controlNode, "mouseup", function (e) {
                  t._onMouseUp(e);
                }),
                n.on(this.controlNode, "touchend", function (e) {
                  t._onMouseUp(e);
                });
            },
            _onMouseUp: function (e) {
              e.preventDefault(),
                n.off(this.controlNode, "mousemove"),
                n.off(this.controlNode, "touchmove"),
                n.off(this._player.tag, "mouseup"),
                n.off(this._player.tag, "touchend"),
                n.off(this.controlNode, "mouseup"),
                n.off(this.controlNode, "touchend"),
                this._onMouseClick(e);
            },
            _onMouseMove: function (e) {
              e.preventDefault();
            },
            _onTimeupdate: function (e) {
              this._player._seeking ||
                (this._updateProgressBar(
                  this.playedNode,
                  this._getCurrentTime()
                ),
                this._updateCursorPosition(this._getCurrentTime()),
                this._player.trigger(d.Private.UpdateProgressBar, {
                  time: this._getCurrentTime(),
                }));
            },
            _getCurrentTime: function () {
              var e = this._liveshiftService.seekTime;
              return -1 == e && (e = 0), this._player.getCurrentTime() + e;
            },
            _onProgress: function (e) {
              this._player.getDuration() &&
                1 <= this._player.getBuffered().length &&
                this._updateProgressBar(
                  this.loadedNode,
                  this._player
                    .getBuffered()
                    .end(this._player.getBuffered().length - 1)
                );
            },
            _updateProgressBar: function (e, t) {
              var i, r;
              1 != this._player._switchSourcing &&
                ((r = 0),
                -1 == this._liveshiftService.seekTime
                  ? (r = 1)
                  : 1 <
                      (r = (i = this._liveshiftService.availableLiveShiftTime)
                        ? t / i
                        : 0) && (this._liveshiftService.seekTime = -(r = 1)),
                this.liveShiftStartDisplay,
                e && a.css(e, "width", 100 * r + "%"));
            },
            _updateCursorPosition: function (e) {
              var t, i, r, n;
              this._player.el() &&
                1 != this._player._switchSourcing &&
                ((i = 0),
                (n = 1),
                (r = this._player.el().clientWidth),
                -1 == this._liveshiftService.seekTime
                  ? (i = 1)
                  : 1 <
                      (i = (t = this._liveshiftService.availableLiveShiftTime)
                        ? e / t
                        : 0) && (this._liveshiftService.seekTime = -1),
                0 != r && ((n = 1 - (r = 10 / r)), (i -= r)),
                (i = i < 0 ? 0 : i),
                this.cursorNode &&
                  (n < i
                    ? (a.css(this.cursorNode, "right", "0px"),
                      a.css(this.cursorNode, "left", "auto"))
                    : (a.css(this.cursorNode, "right", "auto"),
                      a.css(this.cursorNode, "left", 100 * i + "%"))));
            },
          });
        t.exports = e;
      },
      {
        "../config": 13,
        "../lang/index": 20,
        "../lib/dom": 28,
        "../lib/event": 29,
        "../lib/function": 31,
        "../lib/playerutil": 40,
        "../lib/ua": 42,
        "../lib/util": 44,
        "../player/base/event/eventtype": 54,
        "../ui/component": 109,
      },
    ],
    12: [
      function (e, t, i) {
        var r = e("../ui/component"),
          n = e("../lib/util"),
          o = e("../player/base/event/eventtype"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t),
                (this.className = t.className || "prism-live-time-display"),
                this.addClass(this.className),
                (this._liveshiftService = e._liveshiftService);
            },
            createEl: function () {
              var e = r.prototype.createEl.call(this, "div");
              return (
                (e.innerHTML =
                  '<span class="current-time">00:00</span> <span class="time-bound">/</span> <span class="end-time">00:00</span><span class="live-text">Live: </span><span class="live-time"></span>'),
                e
              );
            },
            bindEvent: function () {
              var r = this;
              this._player.on(o.Video.TimeUpdate, function () {
                var e,
                  t = r._liveshiftService,
                  i = document.querySelector("#" + r.id() + " .current-time");
                t.liveShiftStartDisplay &&
                t.availableLiveShiftTime > t.seekTime &&
                -1 != t.seekTime
                  ? ((e = r._liveshiftService.getBaseTime()),
                    (e = n.formatTime(e + r._player.getCurrentTime())),
                    (i.innerText = e))
                  : t.currentTimeDisplay &&
                    (i.innerText = t.currentTimeDisplay);
              }),
                this._player.on(o.Private.LiveShiftQueryCompleted, function () {
                  r.updateTime();
                });
            },
            updateTime: function () {
              (document.querySelector(
                "#" + this.id() + " .end-time"
              ).innerText = this._liveshiftService.liveTimeRange.endDisplay),
                (document.querySelector(
                  "#" + this.id() + " .live-time"
                ).innerText = this._liveshiftService.currentTimeDisplay);
            },
          });
        t.exports = e;
      },
      {
        "../lib/util": 44,
        "../player/base/event/eventtype": 54,
        "../ui/component": 109,
      },
    ],
    13: [
      function (e, t, i) {
        t.exports = {
          domain: "g.alicdn.com",
          flashVersion: "2.8.2",
          h5Version: "2.9.19",
          rtsVersion: "2.0.2",
          cityBrain: !0,
          logDuration: 10,
          logCount: 100,
          logReportTo:
            "https://videocloud.cn-hangzhou.log.aliyuncs.com/logstores/newplayer/track",
        };
      },
      {},
    ],
    14: [
      function (e, t, i) {
        e("./lang/index").load();
        var r = e("./player/adaptivePlayer"),
          n = e("./lib/componentutil"),
          o = e("./config"),
          e = function (e, t) {
            return (e.useH5Prism = !0), r.create(e, t);
          };
        (e.getVersion = function () {
          return o.h5Version;
        }),
          n.register(e);
        var a = (window.Aliplayer = e);
        (e.players = {}),
          "function" == typeof define && define.amd
            ? define([], function () {
                return a;
              })
            : "object" == typeof i && "object" == typeof t && (t.exports = a),
          "undefined" != typeof Uint8Array &&
            (Uint8Array.prototype.slice ||
              Object.defineProperty(Uint8Array.prototype, "slice", {
                value: Array.prototype.slice,
              }));
      },
      {
        "./config": 13,
        "./lang/index": 20,
        "./lib/componentutil": 23,
        "./player/adaptivePlayer": 51,
      },
    ],
    15: [
      function (e, t, i) {
        var r = e("../lib/oo"),
          n = e("../lang/index"),
          r = r.extend({
            init: function (e, t) {
              (this._player = e), (this._options = e.options());
            },
          });
        (r.prototype.handle = function (e) {
          var t, i;
          this._options.autoPlayDelay &&
            ((t =
              (t = this._options.autoPlayDelayDisplayText) ||
              n
                .get("AutoPlayDelayDisplayText")
                .replace("$$", this._options.autoPlayDelay)),
            this._player.trigger("info_show", t),
            this._player.trigger("h5_loading_hide"),
            this._player.trigger("play_btn_hide"),
            ((i = this)._timeHandler = setTimeout(function () {
              i._player.trigger("info_hide"),
                (i._options.autoPlayDelay = 0),
                e && e();
            }, 1e3 * this._options.autoPlayDelay)),
            this._player.on("play", function () {
              o(i);
            }),
            this._player.on("pause", function () {
              o(i);
            }));
        }),
          (r.prototype.dispose = function () {
            o(this), (this._player = null);
          });
        var o = function (e) {
          e._timeHandler &&
            (clearTimeout(e._timeHandler), (e._timeHandler = null));
        };
        t.exports = r;
      },
      { "../lang/index": 20, "../lib/oo": 38 },
    ],
    16: [
      function (e, t, i) {
        var r = e("../lib/event"),
          n = e("../lib/data"),
          o = e("../player/base/event/eventtype"),
          a = n.guid(),
          n = {};
        function s(e) {
          var t = this._options.keyFastForwardStep,
            i = this._options.isLive;
          switch (e && e.keyCode) {
            case 39:
              if (i) return;
              e.preventDefault();
              var r = this.getDuration(),
                n = this.getCurrentTime() + t;
              this.seek((n = r < n ? r : n)), l.call(this, n), u.call(this, n);
              break;
            case 37:
              if (i) return;
              e.preventDefault();
              n = this.getCurrentTime() - t;
              this.seek((n = n < 0 ? 0 : n)), l.call(this, n), u.call(this, n);
              break;
            case 38:
              e.preventDefault(),
                this.getVolume() < 1 &&
                  0 <= this.getVolume() &&
                  this.setVolume((this.getVolume() + 0.1).toFixed(1));
              break;
            case 40:
              e.preventDefault(),
                0 < this.getVolume() &&
                  this.getVolume() <= 1 &&
                  this.setVolume((this.getVolume() - 0.1).toFixed(1));
              break;
            case 32:
              if (i) return;
              e.preventDefault(),
                this.tag.paused ? this.play(!0) : this.pause(!0);
          }
        }
        function l(e) {
          this.trigger(o.Private.UpdateProgress, { targetTime: e });
        }
        function u(e) {
          this.trigger(o.Private.UpdateCursorPosition, { targetTime: e });
        }
        (n.init = function () {
          var e;
          this._options.keyShortCuts &&
            (((e = s.bind(this)).guid = a),
            r.on(window.document, "keydown", e));
        }),
          (n.dispose = function () {
            var e;
            this._options.keyShortCuts &&
              (((e = s.bind(this)).guid = a),
              r.off(window.document, "keydown", e));
          }),
          (t.exports = n);
      },
      {
        "../lib/data": 26,
        "../lib/event": 29,
        "../player/base/event/eventtype": 54,
      },
    ],
    17: [
      function (e, t, i) {
        t.exports = t.exports = {
          OD: "OD",
          FD: "360p",
          LD: "540p",
          SD: "720p",
          HD: "1080p",
          "2K": "2K",
          "4K": "4K",
          FHD: "FHD",
          XLD: "XLD",
          SQ: "SQ",
          HQ: "HQ",
          Speed: "Speed",
          Speed_05X_Text: "0.5X",
          Speed_1X_Text: "Normal",
          Speed_125X_Text: "1.25X",
          Speed_15X_Text: "1.5X",
          Speed_2X_Text: "2X",
          Refresh_Text: "Refresh",
          Cancel: "Cancel",
          Mute: "Mute",
          Snapshot: "Snapshot",
          Detection_Text: "Diagnosis",
          Play_DateTime: "Time",
          Quality_Change_Fail_Switch_Text: "Cannot play, switch to ",
          Quality_Change_Text: "Switch to ",
          Quality_The_Url: "The url",
          AutoPlayDelayDisplayText: "Play in $$ seconds",
          Error_Load_Abort_Text: "Data abort erro",
          Error_Network_Text: "Loading failed due to network error",
          Error_Decode_Text: "Decode error",
          Error_Server_Network_NotSupport_Text:
            "Network error or \xa0the format of video is unsupported",
          Error_Offline_Text:
            "The network is unreachable, please click Refresh",
          Error_Play_Text: "Error occured while playing",
          Error_Retry_Text: " Please close or refresh",
          Error_AuthKey_Text:
            "Authentication expired or the domain is not in white list",
          Error_H5_Not_Support_Text:
            "The format of video is not supported by\xa0h5 player\uff0cplease use flash player",
          Error_Not_Support_M3U8_Text:
            "The format of m3u8 is not supported by this explorer",
          Error_Not_Support_MP4_Text:
            "The format of mp4\xa0is not supported by this explorer",
          Error_Not_Support_encrypt_Text:
            "Play the encrypted video,please set encryptType to 1",
          Error_Vod_URL_Is_Empty_Text: "The url is empty",
          Error_Vod_Fetch_Urls_Text:
            "Error occured when fetch urls\uff0cplease close or refresh",
          Fetch_Playauth_Error:
            "Error occured when fetch playauth close or refresh",
          Error_Playauth_Decode_Text: "PlayAuth parse failed",
          Error_Vid_Not_Same_Text: "Cannot renew url due to vid changed",
          Error_Playauth_Expired_Text:
            "Playauth expired, please close or refresh",
          Error_MTS_Fetch_Urls_Text:
            "Error occurred while requesting mst server",
          Error_Load_M3U8_Failed_Text:
            "The m3u8 file loaded failed,please make sure domain configuration https certificate or enable cors",
          Error_Load_M3U8_Timeout_Text:
            "Timeout error occored\xa0when the\xa0m3u8 file loaded",
          Error_Liveshift_M3U8_Not_Found_Text:
            "No more liveshift video avaliable",
          Error_M3U8_Decode_Text: "The m3u8 file decoded failed",
          Error_TX_Decode_Text: "Video decoded failed",
          Error_Waiting_Timeout_Text:
            "Buffering timeout,\xa0please close or refresh",
          Error_Invalidate_Source:
            "Video shoud be mp4\u3001mp3\u3001m3u8\u3001mpd or flv",
          Error_Empty_Source: "Video URL shouldn't be empty",
          Error_Vid_Empty_Source: "vid's video URL hasn't been fetched",
          Error_Fetch_NotStream: "The vid has no stream to play",
          Error_Not_Found: "Url is not found",
          Error_Drm_License_Request_Failed: "DRM license request failed",
          Live_End: "Live has finished",
          Play_Before_Fullscreen: "Please play before fullscreen",
          Can_Not_Seekable: "Can not seek to this position",
          Cancel_Text: "Cancel",
          OK_Text: "OK",
          Auto_Stream_Tip_Text: "Internet is slow, does switch to $$",
          Request_Block_Text:
            "This request is blocked, the video Url should be over https",
          Open_Html_By_File: "Html page should be on the server",
          Maybe_Cors_Error:
            "please make sure domain configuration https certificate or enable cors",
          Speed_Switch_To: "Speed switch to ",
          Curent_Volume: "Current volume:",
          Volume_Mute: "set to mute",
          Volume_UnMute: "set to unmute",
          ShiftLiveTime_Error:
            "Live start time should not be greater than over time",
          Error_Not_Support_Format_On_Mobile:
            "flv\u3001rmtp can't be supported on mobile\uff0cplease use m3u8",
          SessionId_Ticket_Invalid:
            "please assign value for sessionId and ticket properties",
          Http_Error:
            " An HTTP network request failed with an error, but not from the server.",
          Http_Timeout: "A network request timed out",
          DRM_License_Expired: "DRM license is expired, please refresh",
          Not_Support_DRM: "Browser doesn't support DRM",
          CC_Switch_To: "Subtitle switch to ",
          AudioTrack_Switch_To: "Audio tracks switch to ",
          Subtitle: "Subtitle/CC",
          AudioTrack: "Audio Track",
          Quality: "Quality",
          Auto: "Auto",
          Quality_Switch_To: "Quality switch to ",
          Fullscreen: "Full Screen",
          Setting: "Settings",
          Volume: "Volume",
          Play: "Play",
          Pause: "Pause",
          CloseSubtitle: "Close CC",
          OpenSubtitle: "Open CC",
          ExistFullScreen: "Exit Full Screen",
          Muted: "Muted",
          Retry: "Retry",
          SwitchToLive: "Return to live",
          iOSNotSupportVodEncription:
            "iOS desn't suport Vod's encription video",
          UseChromeForVodEncription:
            "This browser desn't suport Vod's encription video, please use latest Chrome",
          Rts_Err_Http_Signal_Error: "(RTS)http signal error",
          Rts_Err_Play_Failed: "(RTS)play faild error",
          Rts_Err_Browser_Not_Support: "(RTS)browser not support",
          Rts_Err_Not_Support_Webrtc: "(RTS)not support webrtc",
          Rts_Err_Browser_Version_Too_Low: "(RTS)browser version too low",
          Rts_Err_Not_Support_H264: "(RTS)not support h264",
          Rts_Err_Create_Offer_Error: "(RTS)create offer error",
          Rts_Err_Play_Url_Error: "(RTS)play url error",
          Rts_Err_Subscribe_Nonthing: "(RTS)subscribe nonthing",
          Rts_Err_Http_Request_Failed: "(RTS)HTTP request failed",
          Rts_Err_Http_Answer_Failed: "(RTS)answer failed",
          Rts_Err_PeerConnection_Unknown: "(RTS)Unknown PeerConnection",
        };
      },
      {},
    ],
    18: [
      function (e, t, i) {
        t.exports = t.exports = {
          OD: "OD",
          LD: "360p",
          FD: "540p",
          SD: "720p",
          HD: "1080p",
          "2K": "2K",
          "4K": "4K",
          FHD: "FHD",
          XLD: "XLD",
          SQ: "SQ",
          HQ: "HQ",
          Forbidden_Text:
            "Internal information is strictly forbidden to outsider",
          Refresh: "Refresh",
          Diagnosis: "Diagnosis",
          Live_Finished: "Live has finished, thanks for watching",
          Play: "Play",
          Pause: "Pause",
          Snapshot: "Snapshot",
          Replay: "Replay",
          Live: "Live",
          Encrypt: "Encrypt",
          Sound: "Sound",
          Fullscreen: "Full Screen",
          Exist_Fullscreen: "Exit Full-screen",
          Resolution: "Resolution",
          Next: "Next Video",
          Brightness: "Brightness",
          Default: "Default",
          Contrast: "Contrast",
          Titles_Credits: "Titles\xa0and\xa0Credits",
          Skip_Titles: "Skip Titles",
          Skip_Credits: "Skip Credits",
          Not_Support_Out_Site:
            "The video is not supported for outside website, please watch it by TaoTV",
          Watch_Now: "Watch now",
          Network_Error: "Network is unreachable, please try to refresh",
          Video_Error: "Playing a video error,\xa0please try to refresh",
          Decode_Error: "Data decoding\xa0error",
          Live_Not_Start: "Live has not started, to be expected",
          Live_Loading: "Live information is loading,\xa0please try to refresh",
          Fetch_Playauth_Error:
            "Error occured when fetch playauth close or refresh",
          Live_End: "Live has finished",
          Live_Abrot: "Signal aborted,\xa0please try to refresh",
          Corss_Domain_Error:
            "Please ensure your domain has obtained IPC license and combined CNAME, \r\n or to set\xa0\xa0cross-domain accessing available",
          Url_Timeout_Error:
            "The video url is timeout,\xa0please try to refresh",
          Connetction_Error:
            "Sorry\uff0cthe video cannot play because of connection error, please try to watch other videos",
          Fetch_MTS_Error: "Fetching video list failed, please ensure",
          Token_Expired_Error:
            "Requesting open api failed, please ensure token expired or not",
          Video_Lists_Empty_Error:
            "The video list is empty, please check the format of video",
          Encrypted_Failed_Error:
            "Fetching encrypted file failed, please check the permission of player",
          Fetch_Failed_Permission_Error:
            "Fetching video list failed, please check the permission of player",
          Invalidate_Param_Error: "No video url, please check the parameters",
          AutoPlayDelayDisplayText: "Play in $$ seconds",
          Fetch_MTS_NOT_NotStream_Error: "The vid has no stream to play",
          Cancel_Text: "Cancel",
          OK_Text: "OK",
          Auto_Stream_Tip_Text: "Internet is slow, does switch to $$",
          Open_Html_By_File: "Html page should be on the server",
          Cant_Use_Flash_On_Mobile:
            "Mobile doesn't support flash player\uff0cplease use h5 player",
          Flash_Not_Ready:
            "Flash Player plugin hasn't been installed <a href='https://www.flash.cn/' target='_blank'>install plugin</a>, or check if disable Flash plugin",
        };
      },
      {},
    ],
    19: [
      function (e, t, i) {
        t.exports = t.exports = {
          OD: "\u539f\u753b",
          FD: "\u6d41\u7545",
          LD: "\u6807\u6e05",
          SD: "\u9ad8\u6e05",
          HD: "\u8d85\u6e05",
          "2K": "2K",
          "4K": "4K",
          FHD: "\u5168\u9ad8\u6e05",
          XLD: "\u6781\u901f",
          SQ: "\u666e\u901a\u97f3\u8d28",
          HQ: "\u9ad8\u97f3\u8d28",
          Forbidden_Text:
            "\u5185\u90e8\u4fe1\u606f\uff0c\u4e25\u7981\u5916\u4f20",
          Refresh: "\u5237\u65b0",
          Diagnosis: "\u8bca\u65ad",
          Live_Finished:
            "\u76f4\u64ad\u5df2\u7ed3\u675f,\u8c22\u8c22\u89c2\u770b",
          Play: "\u64ad\u653e",
          Pause: "\u6682\u505c",
          Snapshot: "\u622a\u56fe",
          Replay: "\u91cd\u64ad",
          Live: "\u76f4\u64ad",
          Encrypt: "\u52a0\u5bc6",
          Sound: "\u58f0\u97f3",
          Fullscreen: "\u5168\u5c4f",
          Exist_Fullscreen: "\u9000\u51fa\u5168\u5c4f",
          Resolution: "\u6e05\u6670\u5ea6",
          Next: "\u4e0b\u4e00\u96c6",
          Brightness: "\u4eae\u5ea6",
          Default: "\u9ed8\u8ba4",
          Contrast: "\u5bf9\u6bd4\u5ea6",
          Titles_Credits: "\u7247\u5934\u7247\u5c3e",
          Skip_Titles: "\u8df3\u8fc7\u7247\u5934",
          Skip_Credits: "\u8df3\u8fc7\u7247\u5c3e",
          Not_Support_Out_Site:
            "\u8be5\u89c6\u9891\u6682\u4e0d\u652f\u6301\u7ad9\u5916\u64ad\u653e\uff0c\u8bf7\u5230\u6dd8TV\u89c2\u770b",
          Watch_Now: "\u7acb\u5373\u89c2\u770b",
          Network_Error:
            "\u7f51\u7edc\u65e0\u6cd5\u8fde\u63a5\uff0c\u8bf7\u5c1d\u8bd5\u68c0\u67e5\u7f51\u7edc\u540e\u5237\u65b0\u8bd5\u8bd5",
          Video_Error:
            "\u89c6\u9891\u64ad\u653e\u5f02\u5e38\uff0c\u8bf7\u5237\u65b0\u8bd5\u8bd5",
          Decode_Error: "\u64ad\u653e\u6570\u636e\u89e3\u7801\u9519\u8bef",
          Live_Not_Start:
            "\u4eb2\uff0c\u76f4\u64ad\u8fd8\u672a\u5f00\u59cb\u54e6\uff0c\u656c\u8bf7\u671f\u5f85",
          Live_Loading:
            "\u76f4\u64ad\u4fe1\u606f\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u5237\u65b0\u8bd5\u8bd5",
          Live_End: "\u4eb2\uff0c\u76f4\u64ad\u5df2\u7ed3\u675f",
          Live_Abrot:
            "\u5f53\u524d\u76f4\u64ad\u4fe1\u53f7\u4e2d\u65ad\uff0c\u8bf7\u5237\u65b0\u540e\u91cd\u8bd5",
          Corss_Domain_Error:
            "\u8bf7\u786e\u8ba4\u60a8\u7684\u57df\u540d\u5df2\u5b8c\u6210\u5907\u6848\u548cCNAME\u7ed1\u5b9a\uff0c\r\n\u5e76\u5904\u4e8e\u542f\u7528\u72b6\u6001\uff0c\u6216\u8d44\u6e90\u5141\u8bb8\u8de8\u8d8a\u8bbf\u95ee",
          Url_Timeout_Error:
            "\u60a8\u6240\u89c2\u770b\u7684\u89c6\u9891\u5730\u5740\u8fde\u63a5\u8d85\u65f6\uff0c\u8bf7\u5237\u65b0\u540e\u91cd\u8bd5",
          Connetction_Error:
            "\u62b1\u6b49,\u8be5\u89c6\u9891\u7531\u4e8e\u8fde\u63a5\u9519\u8bef\u6682\u65f6\u4e0d\u80fd\u64ad\u653e,\u8bf7\u89c2\u770b\u5176\u5b83\u89c6\u9891",
          Fetch_MTS_Error:
            "\u83b7\u53d6\u89c6\u9891\u5217\u8868\u5931\u8d25\uff0c\u8bf7\u786e\u8ba4",
          Token_Expired_Error:
            "\u8bf7\u6c42\u63a5\u53e3\u5931\u8d25\uff0c\u8bf7\u786e\u8ba4Token\u662f\u5426\u8fc7\u671f",
          Video_Lists_Empty_Error:
            "\u83b7\u53d6\u89c6\u9891\u5217\u8868\u4e3a\u7a7a\uff0c\u8bf7\u786e\u8ba4\u64ad\u653e\u6570\u636e\u4e0e\u683c\u5f0f",
          Encrypted_Failed_Error:
            "\u83b7\u53d6\u89c6\u9891\u52a0\u5bc6\u79d8\u94a5\u9519\u8bef\uff0c\u8bf7\u786e\u8ba4\u64ad\u653e\u6743\u9650",
          Fetch_Failed_Permission_Error:
            "\u83b7\u53d6\u89c6\u9891\u5217\u8868\u5931\u8d25\uff0c\u8bf7\u786e\u8ba4\u64ad\u653e\u6743\u9650",
          Invalidate_Param_Error:
            "\u65e0\u8f93\u5165\u89c6\u9891\uff0c\u8bf7\u786e\u8ba4\u8f93\u5165\u53c2\u6570",
          AutoPlayDelayDisplayText:
            "$$\u79d2\u4ee5\u540e\u5f00\u59cb\u64ad\u653e",
          Fetch_MTS_NOT_NotStream_Error:
            "\u6b64vid\u6ca1\u6709\u53ef\u64ad\u653e\u89c6\u9891",
          Cancel_Text: "\u53d6\u6d88",
          OK_Text: "\u786e\u8ba4",
          Auto_Stream_Tip_Text:
            "\u7f51\u7edc\u4e0d\u7ed9\u529b\uff0c\u662f\u5426\u5207\u6362\u5230$$",
          Fetch_Playauth_Error:
            "\u83b7\u53d6\u64ad\u653e\u51ed\u8bc1\u51fa\u9519\u5566\uff0c\u8bf7\u5c1d\u8bd5\u9000\u51fa\u91cd\u8bd5\u6216\u5237\u65b0",
          Open_Html_By_File:
            "\u4e0d\u80fd\u76f4\u63a5\u5728\u6d4f\u89c8\u5668\u6253\u5f00html\u6587\u4ef6\uff0c\u8bf7\u90e8\u7f72\u5230\u670d\u52a1\u7aef",
          Cant_Use_Flash_On_Mobile:
            "\u79fb\u52a8\u7aef\u4e0d\u652f\u6301Flash\u64ad\u653e\u5668\uff0c\u8bf7\u4f7f\u7528h5\u64ad\u653e\u5668",
          Flash_Not_Ready:
            "Flash Player\u63d2\u4ef6\u672a\u5b89\u88c5<a href='https://www.flash.cn/' target='_blank'>\u5b89\u88c5\u63d2\u4ef6</a>\uff0c\u5982\u679c\u5df2\u7ecf\u5b89\u88c5\u8bf7\u68c0\u67e5\u662f\u5426\u88ab\u7981\u7528",
        };
      },
      {},
    ],
    20: [
      function (o, e, t) {
        function n() {
          var e;
          return (
            (void 0 !== window[l] && window[l]) ||
              ((e =
                (e = (
                  navigator.language || navigator.browserLanguage
                ).toLowerCase()) && -1 < e.indexOf("zh")
                  ? "zh-cn"
                  : "en-us"),
              (window[l] = e)),
            window[l]
          );
        }
        function a(e, t) {
          var i = d(e),
            r = "",
            n = c(),
            r =
              "flash" == e
                ? "en-us" == n
                  ? o("./flash/en-us")
                  : "zh-cn" == n
                  ? o("./flash/zh-cn")
                  : t[n]
                : "en-us" == n
                ? o("./en-us")
                : "zh-cn" == n
                ? o("./zh-cn")
                : t[n];
          s.set(i, JSON.stringify(r)), u(e, r);
        }
        var i = o("../config"),
          s = o("../lib/storage"),
          r = (o("../lib/io"), "aliplayer_lang_data"),
          l = "aliplayer_lang",
          u = function (e, t) {
            e = d(e);
            window[e] = t;
          },
          c = function () {
            return n();
          },
          d = function (e) {
            var t = c();
            return (
              r +
              "_" +
              (e = e || "h5") +
              "_" +
              i.h5Version.replace(/\./g, "_") +
              "_" +
              t
            );
          };
        (e.exports.setCurrentLanguage = function (e, t, i) {
          var r = window[l];
          if (
            !(
              "en-us" == (e = void 0 === e || !e ? n() : e) ||
              "zh-cn" == e ||
              (i && i[e])
            )
          )
            throw new Error(
              "There is not language resource for " +
                e +
                ", please specify the language resource by languageTexts property"
            );
          (window[l] = e),
            a(t, i),
            e != r && o("../lib/constants").updateByLanguage();
        }),
          (e.exports.getCurrentLanguage = n),
          (e.exports.getLanguageData = function (e, t) {
            e = d(e);
            return window[e];
          }),
          (e.exports.load = a),
          (e.exports.get = function (e, t) {
            (t = d((t = t || "h5"))), (t = window[t]);
            if (t) return t[e];
          });
      },
      {
        "../config": 13,
        "../lib/constants": 24,
        "../lib/io": 35,
        "../lib/storage": 41,
        "./en-us": 17,
        "./flash/en-us": 18,
        "./flash/zh-cn": 19,
        "./zh-cn": 21,
      },
    ],
    21: [
      function (e, t, i) {
        t.exports = t.exports = {
          OD: "\u539f\u753b",
          FD: "\u6d41\u7545",
          LD: "\u6807\u6e05",
          SD: "\u9ad8\u6e05",
          HD: "\u8d85\u6e05",
          "2K": "2K",
          "4K": "4K",
          FHD: "\u5168\u9ad8\u6e05",
          XLD: "\u6781\u901f",
          SQ: "\u666e\u901a\u97f3\u8d28",
          HQ: "\u9ad8\u97f3\u8d28",
          Speed: "\u500d\u901f",
          Speed_05X_Text: "0.5X",
          Speed_1X_Text: "\u6b63\u5e38",
          Speed_125X_Text: "1.25X",
          Speed_15X_Text: "1.5X",
          Speed_2X_Text: "2X",
          Quality_Change_Fail_Switch_Text:
            "\u4e0d\u80fd\u64ad\u653e\uff0c\u5207\u6362\u4e3a",
          Quality_Change_Text: "\u6b63\u5728\u4e3a\u60a8\u5207\u6362\u5230 ",
          Quality_The_Url: "\u6b64\u5730\u5740",
          Refresh_Text: "\u5237\u65b0",
          Detection_Text: "\u8bca\u65ad",
          Cancel: "\u53d6\u6d88",
          Mute: "\u9759\u97f3",
          Snapshot: "\u622a\u56fe",
          Play_DateTime: "\u64ad\u653e\u65f6\u95f4",
          AutoPlayDelayDisplayText:
            "$$\u79d2\u4ee5\u540e\u5f00\u59cb\u64ad\u653e",
          Error_Load_Abort_Text:
            "\u83b7\u53d6\u6570\u636e\u8fc7\u7a0b\u88ab\u4e2d\u6b62",
          Error_Network_Text:
            "\u7f51\u7edc\u9519\u8bef\u52a0\u8f7d\u6570\u636e\u5931\u8d25",
          Error_Decode_Text: "\u89e3\u7801\u9519\u8bef",
          Error_Server_Network_NotSupport_Text:
            "\u670d\u52a1\u5668\u3001\u7f51\u7edc\u9519\u8bef\u6216\u683c\u5f0f\u4e0d\u652f\u6301",
          Error_Offline_Text:
            "\u7f51\u7edc\u4e0d\u53ef\u7528\uff0c\u8bf7\u786e\u5b9a",
          Error_Play_Text: "\u64ad\u653e\u51fa\u9519\u5566",
          Error_Retry_Text:
            "\u8bf7\u5c1d\u8bd5\u9000\u51fa\u91cd\u8bd5\u6216\u5237\u65b0",
          Error_AuthKey_Text:
            "\u53ef\u80fd\u9274\u6743\u8fc7\u671f\u3001\u57df\u540d\u4e0d\u5728\u767d\u540d\u5355\u6216\u8bf7\u6c42\u88ab\u62e6\u622a",
          Error_H5_Not_Support_Text:
            "h5\u4e0d\u652f\u6301\u6b64\u683c\u5f0f\uff0c\u8bf7\u4f7f\u7528flash\u64ad\u653e\u5668",
          Error_Not_Support_M3U8_Text:
            "\u6d4f\u89c8\u5668\u4e0d\u652f\u6301m3u8\u89c6\u9891\u64ad\u653e",
          Error_Not_Support_MP4_Text:
            "\u6d4f\u89c8\u5668\u4e0d\u652f\u6301mp4\u89c6\u9891\u64ad\u653e",
          Error_Not_Support_encrypt_Text:
            "\u64ad\u653e\u52a0\u5bc6\u89c6\u9891\uff0c\u8bf7\u8bbe\u7f6e\u5c5e\u6027encryptType to 1",
          Error_Vod_URL_Is_Empty_Text:
            "\u83b7\u53d6\u64ad\u653e\u5730\u5740\u4e3a\u7a7a",
          Error_Vod_Fetch_Urls_Text:
            "\u83b7\u53d6\u5730\u5740\u51fa\u9519\u5566\uff0c\u8bf7\u5c1d\u8bd5\u9000\u51fa\u91cd\u8bd5\u6216\u5237\u65b0",
          Fetch_Playauth_Error:
            "\u83b7\u53d6\u64ad\u653e\u51ed\u8bc1\u51fa\u9519\u5566\uff0c\u8bf7\u5c1d\u8bd5\u9000\u51fa\u91cd\u8bd5\u6216\u5237\u65b0",
          Error_Playauth_Decode_Text: "playauth\u89e3\u6790\u9519\u8bef",
          Error_Vid_Not_Same_Text:
            "\u4e0d\u80fd\u66f4\u65b0\u5730\u5740\uff0cvid\u548c\u64ad\u653e\u4e2d\u7684\u4e0d\u4e00\u81f4",
          Error_Playauth_Expired_Text:
            "\u51ed\u8bc1\u5df2\u8fc7\u671f\uff0c\u8bf7\u5c1d\u8bd5\u9000\u51fa\u91cd\u8bd5\u6216\u5237\u65b0",
          Error_MTS_Fetch_Urls_Text: "MTS\u83b7\u53d6\u53d6\u6570\u5931\u8d25",
          Error_Load_M3U8_Failed_Text:
            "\u83b7\u53d6m3u8\u6587\u4ef6\u5931\u8d25,\u8bf7\u786e\u8ba4\u57df\u540d\u662f\u5426\u914d\u7f6e\u4e86https\u8bc1\u4e66\u6216\u8005\u662f\u5426\u5f00\u542f\u4e86\u5141\u8bb8\u8de8\u57df\u8bbf\u95ee",
          Error_Load_M3U8_Timeout_Text:
            "\u83b7\u53d6m3u8\u6587\u4ef6\u8d85\u65f6",
          Error_Liveshift_M3U8_Not_Found_Text:
            "\u6ca1\u6709\u66f4\u591a\u65f6\u79fb\u89c6\u9891\u4e86",
          Error_M3U8_Decode_Text:
            "\u83b7\u53d6m3u8\u6587\u4ef6\u89e3\u6790\u5931\u8d25",
          Error_TX_Decode_Text: "\u89e3\u6790\u6570\u636e\u51fa\u9519",
          Error_Waiting_Timeout_Text:
            "\u7f13\u51b2\u6570\u636e\u8d85\u65f6\uff0c\u8bf7\u5c1d\u8bd5\u9000\u51fa\u91cd\u8bd5\u6216\u5237\u65b0",
          Error_Invalidate_Source:
            "\u64ad\u653e\u5730\u5740\u683c\u5f0f\u9700\u8981\u4e3amp4\u3001mp3\u3001m3u8\u3001mpd\u6216flv",
          Error_Empty_Source:
            "\u64ad\u653e\u5730\u5740\u4e0d\u80fd\u4e3a\u7a7a",
          Error_Vid_Empty_Source:
            "vid\u5bf9\u5e94\u7684\u89c6\u9891\u5730\u5740\u8fd8\u672a\u83b7\u53d6\u5230",
          Error_Fetch_NotStream:
            "\u6b64vid\u6ca1\u6709\u53ef\u64ad\u653e\u89c6\u9891",
          Error_Not_Found: "\u64ad\u653e\u5730\u5740\u4e0d\u5b58\u5728",
          Error_Drm_License_Request_Failed:
            "DRM License\u8bf7\u6c42\u5931\u8d25",
          Live_End: "\u4eb2\uff0c\u76f4\u64ad\u5df2\u7ed3\u675f",
          Play_Before_Fullscreen: "\u64ad\u653e\u540e\u518d\u5168\u5c4f",
          Can_Not_Seekable: "\u4e0d\u80fdseek\u5230\u8fd9\u91cc",
          Cancel_Text: "\u53d6\u6d88",
          OK_Text: "\u786e\u8ba4",
          Auto_Stream_Tip_Text:
            "\u7f51\u7edc\u4e0d\u7ed9\u529b\uff0c\u662f\u5426\u5207\u6362\u5230$$",
          Request_Block_Text:
            "\u6d4f\u89c8\u5668\u5b89\u5168\u7b56\u7565\u89c6\u9891\u5730\u5740\u4e0d\u80fd\u4e3ahttp\u534f\u8bae\uff0c\u4e0e\u7f51\u7ad9https\u534f\u8bae\u4e0d\u4e00\u81f4",
          Open_Html_By_File:
            "\u4e0d\u80fd\u76f4\u63a5\u5728\u6d4f\u89c8\u5668\u6253\u5f00html\u6587\u4ef6\uff0c\u8bf7\u90e8\u7f72\u5230\u670d\u52a1\u7aef",
          Maybe_Cors_Error:
            "\u8bf7\u786e\u8ba4\u57df\u540d\u662f\u5426\u914d\u7f6e\u4e86https\u8bc1\u4e66\u6216\u8005\u662f\u5426\u5f00\u542f\u4e86\u5141\u8bb8\u8de8\u57df\u8bbf\u95ee",
          Speed_Switch_To: "\u500d\u901f\u5207\u6362\u5230 ",
          Curent_Volume: "\u5f53\u524d\u97f3\u91cf\uff1a",
          Volume_Mute: "\u8bbe\u7f6e\u4e3a\u9759\u97f3",
          Volume_UnMute: "\u8bbe\u7f6e\u4e3a\u975e\u9759\u97f3",
          ShiftLiveTime_Error:
            "\u76f4\u64ad\u5f00\u59cb\u65f6\u95f4\u4e0d\u80fd\u5927\u4e8e\u76f4\u64ad\u7ed3\u675f\u65f6\u95f4",
          Error_Not_Support_Format_On_Mobile:
            "\u79fb\u52a8\u7aef\u4e0d\u652f\u6301flv\u3001rmtp\u89c6\u9891\uff0c\u8bf7\u4f7f\u7528m3u8",
          SessionId_Ticket_Invalid:
            "DRM\u89c6\u9891\u64ad\u653e\uff0csessionId\u548cticket\u5c5e\u6027\u4e0d\u80fd\u4e3a\u7a7a",
          Http_Error: "Http\u7f51\u7edc\u8bf7\u6c42\u5931\u8d25",
          Http_Timeout: "http\u8bf7\u6c42\u8d85\u65f6",
          DRM_License_Expired:
            "DRM license\u8d85\u65f6\uff0c\u8bf7\u5237\u65b0",
          Not_Support_DRM:
            "\u6d4f\u89c8\u5668\u4e0d\u652f\u6301DRM\u89c6\u9891\u7684\u64ad\u653e\u6216\u672a\u53d7\u5230\u7528\u6237\u8bb8\u53ef",
          CC_Switch_To: "\u5b57\u5e55\u5207\u6362\u5230 ",
          AudioTrack_Switch_To: "\u97f3\u8f68\u5207\u6362\u5230 ",
          Subtitle: "\u5b57\u5e55",
          AudioTrack: "\u97f3\u8f68",
          Quality: "\u6e05\u6670\u5ea6",
          Auto: "\u81ea\u52a8",
          Quality_Switch_To: "\u6e05\u6670\u5ea6\u5207\u6362\u5230 ",
          Fullscreen: "\u5168\u5c4f",
          Setting: "\u8bbe\u7f6e",
          Volume: "\u97f3\u91cf",
          Play: "\u64ad\u653e",
          Pause: "\u6682\u505c",
          CloseSubtitle: "\u5173\u95ed\u5b57\u5e55",
          OpenSubtitle: "\u6253\u5f00\u5b57\u5e55",
          ExistFullScreen: "\u9000\u51fa\u5168\u5c4f",
          Muted: "\u9759\u97f3",
          Retry: "\u91cd\u8bd5",
          SwitchToLive: "\u8fd4\u56de\u76f4\u64ad",
          iOSNotSupportVodEncription:
            "iOS\u4e0d\u652f\u6301\u70b9\u64ad\u52a0\u5bc6\u64ad\u653e",
          UseChromeForVodEncription:
            "\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u70b9\u64ad\u52a0\u5bc6\u64ad\u653e\uff0c\u8bf7\u4f7f\u7528\u6700\u65b0Chrome\u6d4f\u89c8\u5668",
          Rts_Err_Http_Signal_Error:
            "(RTS)\u4fe1\u4ee4\u8bf7\u6c42\u5931\u8d25",
          Rts_Err_Play_Failed: "(RTS)\u64ad\u653e\u5931\u8d25",
          Rts_Err_Browser_Not_Support:
            "(RTS)\u4e0d\u652f\u6301\u6b64\u6d4f\u89c8\u5668",
          Rts_Err_Not_Support_Webrtc: "(RTS)\u4e0d\u652f\u6301webrtc",
          Rts_Err_Browser_Version_Too_Low:
            "(RTS)\u6d4f\u89c8\u5668\u7248\u672c\u8fc7\u4f4e",
          Rts_Err_Not_Support_H264: "(RTS)\u4e0d\u652f\u6301H264",
          Rts_Err_Create_Offer_Error: "(RTS)create offer\u5931\u8d25",
          Rts_Err_Play_Url_Error:
            "(RTS)\u64ad\u653eurl\u534f\u8bae\u9519\u8bef",
          Rts_Err_Subscribe_Nonthing:
            "(RTS)\u53c2\u6570\u8bbe\u7f6e\u9519\u8bef",
          Rts_Err_Http_Request_Failed: "(RTS)HTTP\u8bf7\u6c42\u5931\u8d25",
          Rts_Err_Http_Answer_Failed: "(RTS)answer\u5931\u8d25",
          Rts_Err_PeerConnection_Unknown: "(RTS)PeerConnection\u5f02\u5e38",
        };
      },
      {},
    ],
    22: [
      function (e, t, i) {
        var o =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        if (window.Uint8Array)
          for (var c = new Uint8Array(256), r = 0; r < o.length; r++)
            c[o.charCodeAt(r)] = r;
        var l = function (e) {
          for (var t = "", i = 0; i < e.length; i += 16e3) {
            var r = e.subarray(i, i + 16e3);
            t += String.fromCharCode.apply(null, r);
          }
          return t;
        };
        (unpackPlayReady = function (e) {
          e = (function (e, t, i) {
            if (!e) return "";
            i ||
              e.byteLength % 2 == 0 ||
              console.log("Data has an incorrect length, must be even.");
            for (
              var r =
                  e instanceof ArrayBuffer
                    ? e
                    : ((r = new Uint8Array(e.byteLength)).set(
                        new Uint8Array(e)
                      ),
                      r.buffer),
                n = Math.floor(e.byteLength / 2),
                o = new Uint16Array(n),
                a = new DataView(r),
                s = 0;
              s < n;
              s++
            )
              o[s] = a.getUint16(2 * s, t);
            return l(o);
          })(e, !0, !0);
          if (-1 != e.indexOf("PlayReadyKeyMessage")) {
            for (
              var e = new DOMParser().parseFromString(e, "application/xml"),
                t = e.getElementsByTagName("HttpHeader"),
                i = {},
                r = 0;
              r < t.length;
              ++r
            ) {
              var n = t[r].querySelector("name"),
                o = t[r].querySelector("value");
              i[n.textContent] = o.textContent;
            }
            return {
              header: i,
              changange: e.querySelector("Challenge").textContent,
            };
          }
          console.log("PlayReady request is already unwrapped.");
        }),
          (t.exports = {
            decode: function (e) {
              var t,
                i,
                r,
                n,
                o = 0.75 * e.length,
                a = e.length,
                s = 0;
              "=" === e[e.length - 1] && (o--, "=" === e[e.length - 2] && o--);
              for (
                var o = new ArrayBuffer(o), l = new Uint8Array(o), u = 0;
                u < a;
                u += 4
              )
                (t = c[e.charCodeAt(u)]),
                  (i = c[e.charCodeAt(u + 1)]),
                  (r = c[e.charCodeAt(u + 2)]),
                  (n = c[e.charCodeAt(u + 3)]),
                  (l[s++] = (t << 2) | (i >> 4)),
                  (l[s++] = ((15 & i) << 4) | (r >> 2)),
                  (l[s++] = ((3 & r) << 6) | (63 & n));
              return o;
            },
            encode: function (e) {
              for (
                var t = new Uint8Array(e), i = t.length, r = "", n = 0;
                n < i;
                n += 3
              )
                (r += o[t[n] >> 2]),
                  (r += o[((3 & t[n]) << 4) | (t[n + 1] >> 4)]),
                  (r += o[((15 & t[n + 1]) << 2) | (t[n + 2] >> 6)]),
                  (r += o[63 & t[n + 2]]);
              return (
                i % 3 == 2
                  ? (r = r.substring(0, r.length - 1) + "=")
                  : i % 3 == 1 && (r = r.substring(0, r.length - 2) + "=="),
                r
              );
            },
            unpackPlayReady: unpackPlayReady,
          });
      },
      {},
    ],
    23: [
      function (e, t, i) {
        var r = e("./oo"),
          n = e("../player/base/event/eventtype");
        (t.exports.stopPropagation = function (e) {
          window.event ? (window.event.cancelBubble = !0) : e.stopPropagation();
        }),
          (t.exports.register = function (e) {
            (e.util = { stopPropagation: t.exports.stopPropagation }),
              (e.Component = r.extend),
              (e.EventType = n.Player);
          });
      },
      { "../player/base/event/eventtype": 54, "./oo": 38 },
    ],
    24: [
      function (e, t, i) {
        var r = e("../lang/index");
        (t.exports.LOAD_START = "loadstart"),
          (t.exports.LOADED_METADATA = "loadedmetadata"),
          (t.exports.LOADED_DATA = "loadeddata"),
          (t.exports.PROGRESS = "progress"),
          (t.exports.CAN_PLAY = "canplay"),
          (t.exports.CAN_PLYA_THROUGH = "canplaythrough"),
          (t.exports.PLAY = "play"),
          (t.exports.PAUSE = "pause"),
          (t.exports.ENDED = "ended"),
          (t.exports.PLAYING = "playing"),
          (t.exports.WAITING = "waiting"),
          (t.exports.ERROR = "error"),
          (t.exports.SUSPEND = "suspend"),
          (t.exports.STALLED = "stalled"),
          (t.exports.AuthKeyExpiredEvent = "authkeyexpired"),
          (t.exports.DRMKeySystem = {
            4: "com.microsoft.playready",
            5: "com.widevine.alpha",
          }),
          (t.exports.EncryptionType = {
            Private: 1,
            Standard: 2,
            ChinaDRM: 3,
            PlayReady: 4,
            Widevine: 5,
          }),
          (t.exports.VodEncryptionType = {
            AliyunVoDEncryption: 1,
            HLSEncryption: 2,
            Widevine: 5,
            "Widevine-FairPlay": 5,
          }),
          (t.exports.DRMType = {
            Widevine: "Widevine",
            PlayReady: "PlayReady",
          }),
          (t.exports.ErrorCode = {
            InvalidParameter: 4001,
            AuthKeyExpired: 4002,
            InvalidSourceURL: 4003,
            NotFoundSourceURL: 4004,
            StartLoadData: 4005,
            LoadedMetadata: 4006,
            PlayingError: 4007,
            LoadingTimeout: 4008,
            RequestDataError: 4009,
            EncrptyVideoNotSupport: 4010,
            FormatNotSupport: 4011,
            PlayauthDecode: 4012,
            PlayDataDecode: 4013,
            NetworkUnavaiable: 4014,
            UserAbort: 4015,
            NetworkError: 4016,
            URLsIsEmpty: 4017,
            DrmLicenseRequestFailed: 4018,
            CrossDomain: 4027,
            OtherError: 4400,
            ServerAPIError: 4500,
            FlashNotInstalled: 4600,
            RtsSignalError: 4100,
            RtsPlayFailedError: 4200,
            RtsNotSupportWebRtc: 4110,
            RtsBrowserNotSupport: 4111,
            RtsBrowserVersionTooLow: 4112,
            RtsNotSupportH264: 4113,
            RtsCreateOfferError: 4114,
            RtsAutoPLayFaild: 4115,
            RtsPlayUrlError: 4116,
            RtsSubscribeNonthing: 4117,
            RtsHtmlElementError: 4118,
            RtsHtmlElementNotMatch: 4119,
            RtsBrowserNotSupportRtc: 4120,
            RtsHttpRequestFaild: 4121,
            RtsHttpAnswerFaild: 4122,
            RtsPeerConnectionUnknown: 4123,
          }),
          (t.exports.AuthKeyExpired = 7200),
          (t.exports.AuthKeyRefreshExpired = 7e3),
          (t.exports.AuthInfoExpired = 100),
          (t.exports.VideoErrorCode = { 1: 4015, 2: 4016, 3: 4013, 4: 4400 }),
          (t.exports.IconType = {
            FontClass: "fontclass",
            Symbol: "symbol",
            Sprite: "Sprite",
          }),
          (t.exports.SelectedStreamLevel = "selectedStreamLevel"),
          (t.exports.SelectedCC = "selectedCC"),
          (t.exports.WidthMapToLevel = {
            0: "OD",
            640: "FD",
            960: "LD",
            1280: "SD",
            1920: "HD",
            2580: "2K",
            3840: "4K",
          });
        e = function () {
          (t.exports.VideoErrorCodeText = {
            1: r.get("Error_Load_Abort_Text"),
            2: r.get("Error_Network_Text"),
            3: r.get("Error_Decode_Text"),
            4: r.get("Error_Server_Network_NotSupport_Text"),
          }),
            (t.exports.VideoLevels = {
              0: r.get("OD"),
              640: r.get("FD"),
              960: r.get("LD"),
              1280: r.get("SD"),
              1920: r.get("HD"),
              2580: r.get("2K"),
              3840: r.get("4K"),
            }),
            (t.exports.QualityLevels = {
              OD: r.get("OD"),
              LD: r.get("LD"),
              FD: r.get("FD"),
              SD: r.get("SD"),
              HD: r.get("HD"),
              "2K": r.get("2K"),
              "4K": r.get("4K"),
              XLD: r.get("XLD"),
              FHD: r.get("FHD"),
              SQ: r.get("SQ"),
              HQ: r.get("HQ"),
            }),
            (t.exports.SpeedLevels = [
              { key: 0.5, text: r.get("Speed_05X_Text") },
              { key: 1, text: r.get("Speed_1X_Text") },
              { key: 1.25, text: r.get("Speed_125X_Text") },
              { key: 1.5, text: r.get("Speed_15X_Text") },
              { key: 2, text: r.get("Speed_2X_Text") },
            ]);
        };
        e(), (t.exports.updateByLanguage = e);
      },
      { "../lang/index": 20 },
    ],
    25: [
      function (e, t, i) {
        (t.exports.get = function (e) {
          for (
            var t = e + "", i = document.cookie.split(";"), r = 0;
            r < i.length;
            r++
          ) {
            var n = i[r].trim();
            if (0 == n.indexOf(t))
              return unescape(n.substring(t.length + 1, n.length));
          }
          return "";
        }),
          (t.exports.set = function (e, t, i) {
            var r = new Date();
            r.setTime(r.getTime() + 24 * i * 60 * 60 * 1e3);
            r = "expires=" + r.toGMTString();
            document.cookie = e + "=" + escape(t) + "; " + r;
          });
      },
      {},
    ],
    26: [
      function (e, i, t) {
        var r = e("./object");
        (i.exports.cache = {}),
          (i.exports.guid = function (e, t) {
            var i,
              r,
              n =
                "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
                  ""
                ),
              o = [];
            if (((t = t || n.length), e))
              for (i = 0; i < e; i++) o[i] = n[0 | (Math.random() * t)];
            else
              for (
                o[8] = o[13] = o[18] = o[23] = "-", o[14] = "4", i = 0;
                i < 36;
                i++
              )
                o[i] ||
                  ((r = 0 | (16 * Math.random())),
                  (o[i] = n[19 == i ? (3 & r) | 8 : r]));
            return o.join("");
          }),
          (i.exports.expando = "vdata" + new Date().getTime()),
          (i.exports.getData = function (e) {
            var t = e[i.exports.expando];
            return (
              t ||
                ((t = e[i.exports.expando] = i.exports.guid()),
                (i.exports.cache[t] = {})),
              i.exports.cache[t]
            );
          }),
          (i.exports.hasData = function (e) {
            var t = "";
            return !(
              !(t = e ? e[i.exports.expando] : t) ||
              r.isEmpty(i.exports.cache[t])
            );
          }),
          (i.exports.removeData = function (t) {
            var e = "";
            if ((e = t ? t[i.exports.expando] : e)) {
              delete i.exports.cache[e];
              try {
                delete t[i.exports.expando];
              } catch (e) {
                t.removeAttribute
                  ? t.removeAttribute(i.exports.expando)
                  : (t[i.exports.expando] = null);
              }
            }
          });
      },
      { "./object": 37 },
    ],
    27: [
      function (e, t, i) {
        var r,
          p =
            "undefined" == typeof Promise ? e("es6-promise").Promise : Promise;
        (r = "undefined" != typeof self ? self : this),
          (e = function () {
            return (
              (i = [
                function (e, t, i) {
                  "use strict";
                  !function (e) {
                    (t.b = function (e) {
                      for (
                        var t = (e = void 0 === e ? {} : e).includes,
                          e = e.excludes,
                          e = void 0 === e ? [] : e,
                          i = !1,
                          r = !1,
                          n = 0,
                          o = void 0 === t ? [] : t;
                        n < o.length;
                        n++
                      )
                        if (!0 === o[n]) {
                          i = !0;
                          break;
                        }
                      for (var a = 0, s = e; a < s.length; a++)
                        if (!0 === s[a]) {
                          r = !0;
                          break;
                        }
                      return i && !r;
                    }),
                      (t.c = function (e, t, i) {
                        e = n.a[e];
                        return void 0 !== e && Object(r.compare)(e, t, i);
                      }),
                      (t.a = function () {
                        return "undefined" != typeof self
                          ? self
                          : "undefined" != typeof window
                          ? window
                          : void 0 !== e
                          ? e
                          : this;
                      });
                    var r = i(11),
                      n = (i.n(r), i(4));
                  }.call(t, i(10));
                },
                function (e, t, i) {
                  "use strict";
                  i.d(t, "c", function () {
                    return n;
                  }),
                    i.d(t, "d", function () {
                      return o;
                    }),
                    i.d(t, "b", function () {
                      return a;
                    }),
                    i.d(t, "f", function () {
                      return s;
                    }),
                    i.d(t, "a", function () {
                      return l;
                    }),
                    i.d(t, "e", function () {
                      return u;
                    });
                  var r = i(3),
                    t = i(0),
                    i = Object(t.a)(),
                    n =
                      "InstallTrigger" in
                        ((null == i ? void 0 : i.window) || {}) ||
                      /firefox/i.test(r.b),
                    o = /trident/i.test(r.b) || /msie/i.test(r.b),
                    a = /edge/i.test(r.b),
                    s = /webkit/i.test(r.b) && !a,
                    l =
                      void 0 !==
                        (null === (t = null == i ? void 0 : i.window) ||
                        void 0 === t
                          ? void 0
                          : t.chrome) || /chrome/i.test(r.b),
                    u =
                      "[object SafariRemoteNotification]" ===
                        (
                          (null ===
                            (i =
                              null === (i = null == i ? void 0 : i.window) ||
                              void 0 === i
                                ? void 0
                                : i.safari) || void 0 === i
                            ? void 0
                            : i.pushNotification) || !1
                        ).toString() ||
                      (/safari/i.test(r.b) && !l);
                },
                function (e, t, i) {
                  "use strict";
                  i.d(t, "b", function () {
                    return o;
                  }),
                    i.d(t, "c", function () {
                      return a;
                    }),
                    i.d(t, "a", function () {
                      return s;
                    });
                  var r = i(1);
                  function n(i) {
                    if (console) {
                      if (!r.d && !r.b) return console[i];
                      if ("log" === i || "clear" === i)
                        return function () {
                          for (var e = [], t = 0; t < arguments.length; t++)
                            e[t] = arguments[t];
                          console[i].apply(console, e);
                        };
                    }
                    return function () {
                      for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    };
                  }
                  var o = n("log"),
                    a = n("table"),
                    s = n("clear");
                },
                function (e, t, i) {
                  "use strict";
                  (t.a = function () {
                    for (var e, t = [], i = 0; i < arguments.length; i++)
                      t[i] = arguments[i];
                    return null != r && r.document
                      ? (e = r.document).createElement.apply(e, t)
                      : {};
                  }),
                    i.d(t, "b", function () {
                      return n;
                    });
                  var i = i(0),
                    r = Object(i.a)(),
                    n =
                      (null === (i = null == r ? void 0 : r.navigator) ||
                      void 0 === i
                        ? void 0
                        : i.userAgent) || "xxxxx";
                },
                function (e, t, i) {
                  "use strict";
                  i.d(t, "a", function () {
                    return r;
                  });
                  for (
                    var r = {},
                      n = 0,
                      o = (i(3).b || "").match(/\w+\/(\d|\.)+(\s|$)/gi) || [];
                    n < o.length;
                    n++
                  ) {
                    var a = o[n].split("/"),
                      s = a[0],
                      a = a[1];
                    r[s] = a;
                  }
                },
                function (e, t, i) {
                  "use strict";
                  i.d(t, "b", function () {
                    return r;
                  }),
                    i.d(t, "d", function () {
                      return n;
                    }),
                    i.d(t, "c", function () {
                      return o;
                    }),
                    i.d(t, "a", function () {
                      return a;
                    }),
                    i.d(t, "e", function () {
                      return s;
                    });
                  var i = i(3),
                    r = /ipad/i.test(i.b),
                    n = /macintosh/i.test(i.b),
                    o = /iphone/i.test(i.b),
                    a = /android/i.test(i.b),
                    s = /windows/i.test(i.b);
                },
                function (e, t, i) {
                  "use strict";
                  Object.defineProperty(t, "__esModule", { value: !0 }),
                    (t.addListener = function (e) {
                      d.addListener(e);
                    }),
                    (t.removeListener = function (e) {
                      d.removeListener(e);
                    }),
                    (t.isLaunch = function () {
                      return d.isLaunch();
                    }),
                    (t.launch = function () {
                      d.launch();
                    }),
                    (t.stop = function () {
                      d.stop();
                    }),
                    (t.setDetectDelay = function (e) {
                      d.setDetectDelay(e);
                    });
                  var r = i(7),
                    n = i(8);
                  i.d(t, "DevtoolsDetector", function () {
                    return r.a;
                  }),
                    i.d(t, "checkers", function () {
                      return n;
                    });
                  var o = i(0);
                  i.d(t, "match", function () {
                    return o.b;
                  }),
                    i.d(t, "specificVersionMatch", function () {
                      return o.c;
                    });
                  var a = i(1);
                  i.d(t, "isFirefox", function () {
                    return a.c;
                  }),
                    i.d(t, "isIE", function () {
                      return a.d;
                    }),
                    i.d(t, "isEdge", function () {
                      return a.b;
                    }),
                    i.d(t, "isWebkit", function () {
                      return a.f;
                    }),
                    i.d(t, "isChrome", function () {
                      return a.a;
                    }),
                    i.d(t, "isSafari", function () {
                      return a.e;
                    });
                  var s = i(2);
                  i.d(t, "log", function () {
                    return s.b;
                  }),
                    i.d(t, "table", function () {
                      return s.c;
                    }),
                    i.d(t, "clear", function () {
                      return s.a;
                    });
                  var l = i(17);
                  i.d(t, "isMobile", function () {
                    return l.a;
                  });
                  var u = i(4);
                  i.d(t, "versionMap", function () {
                    return u.a;
                  });
                  var c = i(5);
                  i.d(t, "isIpad", function () {
                    return c.b;
                  }),
                    i.d(t, "isMac", function () {
                      return c.d;
                    }),
                    i.d(t, "isIphone", function () {
                      return c.c;
                    }),
                    i.d(t, "isAndroid", function () {
                      return c.a;
                    }),
                    i.d(t, "isWindows", function () {
                      return c.e;
                    });
                  var d = new r.a({
                    checkers: [
                      n.elementIdChecker,
                      n.regToStringChecker,
                      n.functionToStringChecker,
                      n.depRegToStringChecker,
                      n.dateToStringChecker,
                      n.debuggerChecker,
                    ],
                  });
                  t.default = d;
                },
                function (e, t, i) {
                  "use strict";
                  i.d(t, "a", function () {
                    return n;
                  });
                  var r =
                      (this && this.__awaiter) ||
                      function (e, a, s, l) {
                        return new (s = s || p)(function (i, t) {
                          function r(e) {
                            try {
                              o(l.next(e));
                            } catch (e) {
                              t(e);
                            }
                          }
                          function n(e) {
                            try {
                              o(l.throw(e));
                            } catch (e) {
                              t(e);
                            }
                          }
                          function o(e) {
                            var t;
                            e.done
                              ? i(e.value)
                              : ((t = e.value) instanceof s
                                  ? t
                                  : new s(function (e) {
                                      e(t);
                                    })
                                ).then(r, n);
                          }
                          o((l = l.apply(e, a || [])).next());
                        });
                      },
                    s =
                      (this && this.__generator) ||
                      function (i, r) {
                        var n,
                          o,
                          a,
                          s = {
                            label: 0,
                            sent: function () {
                              if (1 & a[0]) throw a[1];
                              return a[1];
                            },
                            trys: [],
                            ops: [],
                          },
                          e = { next: t(0), throw: t(1), return: t(2) };
                        return (
                          "function" == typeof Symbol &&
                            (e[Symbol.iterator] = function () {
                              return this;
                            }),
                          e
                        );
                        function t(t) {
                          return function (e) {
                            return (function (t) {
                              if (n)
                                throw new TypeError(
                                  "Generator is already executing."
                                );
                              for (; s; )
                                try {
                                  if (
                                    ((n = 1),
                                    o &&
                                      (a =
                                        2 & t[0]
                                          ? o.return
                                          : t[0]
                                          ? o.throw ||
                                            ((a = o.return) && a.call(o), 0)
                                          : o.next) &&
                                      !(a = a.call(o, t[1])).done)
                                  )
                                    return a;
                                  switch (
                                    ((o = 0),
                                    (t = a ? [2 & t[0], a.value] : t)[0])
                                  ) {
                                    case 0:
                                    case 1:
                                      a = t;
                                      break;
                                    case 4:
                                      return (
                                        s.label++, { value: t[1], done: !1 }
                                      );
                                    case 5:
                                      s.label++, (o = t[1]), (t = [0]);
                                      continue;
                                    case 7:
                                      (t = s.ops.pop()), s.trys.pop();
                                      continue;
                                    default:
                                      if (
                                        !(a =
                                          0 < (a = s.trys).length &&
                                          a[a.length - 1]) &&
                                        (6 === t[0] || 2 === t[0])
                                      ) {
                                        s = 0;
                                        continue;
                                      }
                                      if (
                                        3 === t[0] &&
                                        (!a || (t[1] > a[0] && t[1] < a[3]))
                                      ) {
                                        s.label = t[1];
                                        break;
                                      }
                                      if (6 === t[0] && s.label < a[1]) {
                                        (s.label = a[1]), (a = t);
                                        break;
                                      }
                                      if (a && s.label < a[2]) {
                                        (s.label = a[2]), s.ops.push(t);
                                        break;
                                      }
                                      a[2] && s.ops.pop(), s.trys.pop();
                                      continue;
                                  }
                                  t = r.call(i, s);
                                } catch (e) {
                                  (t = [6, e]), (o = 0);
                                } finally {
                                  n = a = 0;
                                }
                              if (5 & t[0]) throw t[1];
                              return { value: t[0] ? t[1] : void 0, done: !0 };
                            })([t, e]);
                          };
                        }
                      },
                    n =
                      ((o.prototype.launch = function () {
                        this._detectLoopDelay <= 0 && this.setDetectDelay(500),
                          this._detectLoopStopped &&
                            ((this._detectLoopStopped = !1),
                            this._detectLoop());
                      }),
                      (o.prototype.stop = function () {
                        this._detectLoopStopped ||
                          ((this._detectLoopStopped = !0),
                          clearTimeout(this._timer));
                      }),
                      (o.prototype.isLaunch = function () {
                        return !this._detectLoopStopped;
                      }),
                      (o.prototype.setDetectDelay = function (e) {
                        this._detectLoopDelay = e;
                      }),
                      (o.prototype.addListener = function (e) {
                        this._listeners.push(e);
                      }),
                      (o.prototype.removeListener = function (t) {
                        this._listeners = this._listeners.filter(function (e) {
                          return e !== t;
                        });
                      }),
                      (o.prototype._broadcast = function (e) {
                        for (
                          var t = 0, i = this._listeners;
                          t < i.length;
                          t++
                        ) {
                          var r = i[t];
                          try {
                            r(e.isOpen, e);
                          } catch (e) {}
                        }
                      }),
                      (o.prototype._detectLoop = function () {
                        return r(this, void 0, void 0, function () {
                          var t,
                            i,
                            r,
                            n,
                            o,
                            a = this;
                          return s(this, function (e) {
                            switch (e.label) {
                              case 0:
                                (t = !1),
                                  (i = ""),
                                  (r = 0),
                                  (n = this._checkers),
                                  (e.label = 1);
                              case 1:
                                return r < n.length
                                  ? [4, (o = n[r]).isEnable()]
                                  : [3, 6];
                              case 2:
                                return e.sent()
                                  ? ((i = o.name), [4, o.isOpen()])
                                  : [3, 4];
                              case 3:
                                (t = e.sent()), (e.label = 4);
                              case 4:
                                if (t) return [3, 6];
                                e.label = 5;
                              case 5:
                                return r++, [3, 1];
                              case 6:
                                return (
                                  t != this._isOpen &&
                                    ((this._isOpen = t),
                                    this._broadcast({
                                      isOpen: t,
                                      checkerName: i,
                                    })),
                                  0 < this._detectLoopDelay
                                    ? (this._timer = setTimeout(function () {
                                        return a._detectLoop();
                                      }, this._detectLoopDelay))
                                    : this.stop(),
                                  [2]
                                );
                            }
                          });
                        });
                      }),
                      o);
                  function o(e) {
                    e = e.checkers;
                    (this._listeners = []),
                      (this._isOpen = !1),
                      (this._detectLoopStopped = !0),
                      (this._detectLoopDelay = 500),
                      (this._checkers = e.slice());
                  }
                },
                function (e, t, i) {
                  "use strict";
                  Object.defineProperty(t, "__esModule", { value: !0 });
                  var r = i(9);
                  i.d(t, "depRegToStringChecker", function () {
                    return r.a;
                  });
                  var n = i(12);
                  i.d(t, "elementIdChecker", function () {
                    return n.a;
                  });
                  var o = i(13);
                  i.d(t, "functionToStringChecker", function () {
                    return o.a;
                  });
                  var a = i(14);
                  i.d(t, "regToStringChecker", function () {
                    return a.a;
                  });
                  var s = i(15);
                  i.d(t, "debuggerChecker", function () {
                    return s.a;
                  });
                  var l = i(16);
                  i.d(t, "dateToStringChecker", function () {
                    return l.a;
                  });
                },
                function (e, t, i) {
                  "use strict";
                  i.d(t, "a", function () {
                    return c;
                  });
                  var r = i(1),
                    n = i(2),
                    o = i(0),
                    a =
                      (this && this.__awaiter) ||
                      function (e, a, s, l) {
                        return new (s = s || p)(function (i, t) {
                          function r(e) {
                            try {
                              o(l.next(e));
                            } catch (e) {
                              t(e);
                            }
                          }
                          function n(e) {
                            try {
                              o(l.throw(e));
                            } catch (e) {
                              t(e);
                            }
                          }
                          function o(e) {
                            var t;
                            e.done
                              ? i(e.value)
                              : ((t = e.value) instanceof s
                                  ? t
                                  : new s(function (e) {
                                      e(t);
                                    })
                                ).then(r, n);
                          }
                          o((l = l.apply(e, a || [])).next());
                        });
                      },
                    s =
                      (this && this.__generator) ||
                      function (i, r) {
                        var n,
                          o,
                          a,
                          s = {
                            label: 0,
                            sent: function () {
                              if (1 & a[0]) throw a[1];
                              return a[1];
                            },
                            trys: [],
                            ops: [],
                          },
                          e = { next: t(0), throw: t(1), return: t(2) };
                        return (
                          "function" == typeof Symbol &&
                            (e[Symbol.iterator] = function () {
                              return this;
                            }),
                          e
                        );
                        function t(t) {
                          return function (e) {
                            return (function (t) {
                              if (n)
                                throw new TypeError(
                                  "Generator is already executing."
                                );
                              for (; s; )
                                try {
                                  if (
                                    ((n = 1),
                                    o &&
                                      (a =
                                        2 & t[0]
                                          ? o.return
                                          : t[0]
                                          ? o.throw ||
                                            ((a = o.return) && a.call(o), 0)
                                          : o.next) &&
                                      !(a = a.call(o, t[1])).done)
                                  )
                                    return a;
                                  switch (
                                    ((o = 0),
                                    (t = a ? [2 & t[0], a.value] : t)[0])
                                  ) {
                                    case 0:
                                    case 1:
                                      a = t;
                                      break;
                                    case 4:
                                      return (
                                        s.label++, { value: t[1], done: !1 }
                                      );
                                    case 5:
                                      s.label++, (o = t[1]), (t = [0]);
                                      continue;
                                    case 7:
                                      (t = s.ops.pop()), s.trys.pop();
                                      continue;
                                    default:
                                      if (
                                        !(a =
                                          0 < (a = s.trys).length &&
                                          a[a.length - 1]) &&
                                        (6 === t[0] || 2 === t[0])
                                      ) {
                                        s = 0;
                                        continue;
                                      }
                                      if (
                                        3 === t[0] &&
                                        (!a || (t[1] > a[0] && t[1] < a[3]))
                                      ) {
                                        s.label = t[1];
                                        break;
                                      }
                                      if (6 === t[0] && s.label < a[1]) {
                                        (s.label = a[1]), (a = t);
                                        break;
                                      }
                                      if (a && s.label < a[2]) {
                                        (s.label = a[2]), s.ops.push(t);
                                        break;
                                      }
                                      a[2] && s.ops.pop(), s.trys.pop();
                                      continue;
                                  }
                                  t = r.call(i, s);
                                } catch (e) {
                                  (t = [6, e]), (o = 0);
                                } finally {
                                  n = a = 0;
                                }
                              if (5 & t[0]) throw t[1];
                              return { value: t[0] ? t[1] : void 0, done: !0 };
                            })([t, e]);
                          };
                        }
                      },
                    l = / /,
                    u = !1;
                  l.toString = function () {
                    return (u = !0), c.name;
                  };
                  var c = {
                    name: "dep-reg-to-string",
                    isOpen: function () {
                      return a(this, void 0, void 0, function () {
                        return s(this, function (e) {
                          return (
                            (u = !1),
                            Object(n.c)({ dep: l }),
                            Object(n.a)(),
                            [2, u]
                          );
                        });
                      });
                    },
                    isEnable: function () {
                      return a(this, void 0, void 0, function () {
                        return s(this, function (e) {
                          return [
                            2,
                            Object(o.b)({
                              includes: [!0],
                              excludes: [r.c, r.d],
                            }),
                          ];
                        });
                      });
                    },
                  };
                },
                function (e, t) {
                  var i = (function () {
                    return this;
                  })();
                  try {
                    i = i || Function("return this")() || (0, eval)("this");
                  } catch (e) {
                    "object" == typeof window && (i = window);
                  }
                  e.exports = i;
                },
                function (e, t, i) {
                  var r;
                  void 0 ===
                    (r =
                      "function" ==
                      typeof (r = function () {
                        var t =
                          /^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
                        function d(e) {
                          var t = e.replace(/^v/, "").replace(/\+.*$/, ""),
                            i = (function (e, t) {
                              return -1 === e.indexOf(t)
                                ? e.length
                                : e.indexOf(t);
                            })(t, "-"),
                            r = t.substring(0, i).split(".");
                          return r.push(t.substring(i + 1)), r;
                        }
                        function p(e) {
                          return isNaN(Number(e)) ? e : Number(e);
                        }
                        function h(e) {
                          if ("string" != typeof e)
                            throw new TypeError(
                              "Invalid argument expected string"
                            );
                          if (!t.test(e))
                            throw new Error(
                              "Invalid argument not valid semver ('" +
                                e +
                                "' received)"
                            );
                        }
                        function n(e, t) {
                          [e, t].forEach(h);
                          for (
                            var i = d(e), r = d(t), n = 0;
                            n < Math.max(i.length - 1, r.length - 1);
                            n++
                          ) {
                            var o = parseInt(i[n] || 0, 10),
                              a = parseInt(r[n] || 0, 10);
                            if (o > a) return 1;
                            if (a > o) return -1;
                          }
                          var s = i[i.length - 1],
                            l = r[r.length - 1];
                          if (s && l) {
                            var u = s.split(".").map(p),
                              c = l.split(".").map(p);
                            for (n = 0; n < Math.max(u.length, c.length); n++) {
                              if (
                                void 0 === u[n] ||
                                ("string" == typeof c[n] &&
                                  "number" == typeof u[n])
                              )
                                return -1;
                              if (
                                void 0 === c[n] ||
                                ("string" == typeof u[n] &&
                                  "number" == typeof c[n])
                              )
                                return 1;
                              if (u[n] > c[n]) return 1;
                              if (c[n] > u[n]) return -1;
                            }
                          } else if (s || l) return s ? -1 : 1;
                          return 0;
                        }
                        var o = [">", ">=", "=", "<", "<="],
                          a = {
                            ">": [1],
                            ">=": [0, 1],
                            "=": [0],
                            "<=": [-1, 0],
                            "<": [-1],
                          };
                        return (
                          (n.validate = function (e) {
                            return "string" == typeof e && t.test(e);
                          }),
                          (n.compare = function (e, t, i) {
                            !(function (e) {
                              if ("string" != typeof e)
                                throw new TypeError(
                                  "Invalid operator type, expected string but got " +
                                    typeof e
                                );
                              if (-1 === o.indexOf(e))
                                throw new TypeError(
                                  "Invalid operator, expected one of " +
                                    o.join("|")
                                );
                            })(i);
                            var r = n(e, t);
                            return a[i].indexOf(r) > -1;
                          }),
                          n
                        );
                      })
                        ? r.apply(t, [])
                        : r) || (e.exports = r);
                },
                function (e, t, i) {
                  "use strict";
                  i.d(t, "a", function () {
                    return c;
                  });
                  var r = i(1),
                    n = i(2),
                    o = i(0),
                    i = i(3),
                    a =
                      (this && this.__awaiter) ||
                      function (e, a, s, l) {
                        return new (s = s || p)(function (i, t) {
                          function r(e) {
                            try {
                              o(l.next(e));
                            } catch (e) {
                              t(e);
                            }
                          }
                          function n(e) {
                            try {
                              o(l.throw(e));
                            } catch (e) {
                              t(e);
                            }
                          }
                          function o(e) {
                            var t;
                            e.done
                              ? i(e.value)
                              : ((t = e.value) instanceof s
                                  ? t
                                  : new s(function (e) {
                                      e(t);
                                    })
                                ).then(r, n);
                          }
                          o((l = l.apply(e, a || [])).next());
                        });
                      },
                    s =
                      (this && this.__generator) ||
                      function (i, r) {
                        var n,
                          o,
                          a,
                          s = {
                            label: 0,
                            sent: function () {
                              if (1 & a[0]) throw a[1];
                              return a[1];
                            },
                            trys: [],
                            ops: [],
                          },
                          e = { next: t(0), throw: t(1), return: t(2) };
                        return (
                          "function" == typeof Symbol &&
                            (e[Symbol.iterator] = function () {
                              return this;
                            }),
                          e
                        );
                        function t(t) {
                          return function (e) {
                            return (function (t) {
                              if (n)
                                throw new TypeError(
                                  "Generator is already executing."
                                );
                              for (; s; )
                                try {
                                  if (
                                    ((n = 1),
                                    o &&
                                      (a =
                                        2 & t[0]
                                          ? o.return
                                          : t[0]
                                          ? o.throw ||
                                            ((a = o.return) && a.call(o), 0)
                                          : o.next) &&
                                      !(a = a.call(o, t[1])).done)
                                  )
                                    return a;
                                  switch (
                                    ((o = 0),
                                    (t = a ? [2 & t[0], a.value] : t)[0])
                                  ) {
                                    case 0:
                                    case 1:
                                      a = t;
                                      break;
                                    case 4:
                                      return (
                                        s.label++, { value: t[1], done: !1 }
                                      );
                                    case 5:
                                      s.label++, (o = t[1]), (t = [0]);
                                      continue;
                                    case 7:
                                      (t = s.ops.pop()), s.trys.pop();
                                      continue;
                                    default:
                                      if (
                                        !(a =
                                          0 < (a = s.trys).length &&
                                          a[a.length - 1]) &&
                                        (6 === t[0] || 2 === t[0])
                                      ) {
                                        s = 0;
                                        continue;
                                      }
                                      if (
                                        3 === t[0] &&
                                        (!a || (t[1] > a[0] && t[1] < a[3]))
                                      ) {
                                        s.label = t[1];
                                        break;
                                      }
                                      if (6 === t[0] && s.label < a[1]) {
                                        (s.label = a[1]), (a = t);
                                        break;
                                      }
                                      if (a && s.label < a[2]) {
                                        (s.label = a[2]), s.ops.push(t);
                                        break;
                                      }
                                      a[2] && s.ops.pop(), s.trys.pop();
                                      continue;
                                  }
                                  t = r.call(i, s);
                                } catch (e) {
                                  (t = [6, e]), (o = 0);
                                } finally {
                                  n = a = 0;
                                }
                              if (5 & t[0]) throw t[1];
                              return { value: t[0] ? t[1] : void 0, done: !0 };
                            })([t, e]);
                          };
                        }
                      },
                    l = Object(i.a)("div"),
                    u = !1;
                  Object.defineProperty(l, "id", {
                    get: function () {
                      return (u = !0), c.name;
                    },
                    configurable: !0,
                  });
                  var c = {
                    name: "element-id",
                    isOpen: function () {
                      return a(this, void 0, void 0, function () {
                        return s(this, function (e) {
                          return (
                            (u = !1), Object(n.b)(l), Object(n.a)(), [2, u]
                          );
                        });
                      });
                    },
                    isEnable: function () {
                      return a(this, void 0, void 0, function () {
                        return s(this, function (e) {
                          return [
                            2,
                            Object(o.b)({
                              includes: [!0],
                              excludes: [r.d, r.b, r.c],
                            }),
                          ];
                        });
                      });
                    },
                  };
                },
                function (e, t, i) {
                  "use strict";
                  i.d(t, "a", function () {
                    return d;
                  });
                  var r = i(1),
                    n = i(2),
                    o = i(5),
                    a = i(0),
                    s =
                      (this && this.__awaiter) ||
                      function (e, a, s, l) {
                        return new (s = s || p)(function (i, t) {
                          function r(e) {
                            try {
                              o(l.next(e));
                            } catch (e) {
                              t(e);
                            }
                          }
                          function n(e) {
                            try {
                              o(l.throw(e));
                            } catch (e) {
                              t(e);
                            }
                          }
                          function o(e) {
                            var t;
                            e.done
                              ? i(e.value)
                              : ((t = e.value) instanceof s
                                  ? t
                                  : new s(function (e) {
                                      e(t);
                                    })
                                ).then(r, n);
                          }
                          o((l = l.apply(e, a || [])).next());
                        });
                      },
                    l =
                      (this && this.__generator) ||
                      function (i, r) {
                        var n,
                          o,
                          a,
                          s = {
                            label: 0,
                            sent: function () {
                              if (1 & a[0]) throw a[1];
                              return a[1];
                            },
                            trys: [],
                            ops: [],
                          },
                          e = { next: t(0), throw: t(1), return: t(2) };
                        return (
                          "function" == typeof Symbol &&
                            (e[Symbol.iterator] = function () {
                              return this;
                            }),
                          e
                        );
                        function t(t) {
                          return function (e) {
                            return (function (t) {
                              if (n)
                                throw new TypeError(
                                  "Generator is already executing."
                                );
                              for (; s; )
                                try {
                                  if (
                                    ((n = 1),
                                    o &&
                                      (a =
                                        2 & t[0]
                                          ? o.return
                                          : t[0]
                                          ? o.throw ||
                                            ((a = o.return) && a.call(o), 0)
                                          : o.next) &&
                                      !(a = a.call(o, t[1])).done)
                                  )
                                    return a;
                                  switch (
                                    ((o = 0),
                                    (t = a ? [2 & t[0], a.value] : t)[0])
                                  ) {
                                    case 0:
                                    case 1:
                                      a = t;
                                      break;
                                    case 4:
                                      return (
                                        s.label++, { value: t[1], done: !1 }
                                      );
                                    case 5:
                                      s.label++, (o = t[1]), (t = [0]);
                                      continue;
                                    case 7:
                                      (t = s.ops.pop()), s.trys.pop();
                                      continue;
                                    default:
                                      if (
                                        !(a =
                                          0 < (a = s.trys).length &&
                                          a[a.length - 1]) &&
                                        (6 === t[0] || 2 === t[0])
                                      ) {
                                        s = 0;
                                        continue;
                                      }
                                      if (
                                        3 === t[0] &&
                                        (!a || (t[1] > a[0] && t[1] < a[3]))
                                      ) {
                                        s.label = t[1];
                                        break;
                                      }
                                      if (6 === t[0] && s.label < a[1]) {
                                        (s.label = a[1]), (a = t);
                                        break;
                                      }
                                      if (a && s.label < a[2]) {
                                        (s.label = a[2]), s.ops.push(t);
                                        break;
                                      }
                                      a[2] && s.ops.pop(), s.trys.pop();
                                      continue;
                                  }
                                  t = r.call(i, s);
                                } catch (e) {
                                  (t = [6, e]), (o = 0);
                                } finally {
                                  n = a = 0;
                                }
                              if (5 & t[0]) throw t[1];
                              return { value: t[0] ? t[1] : void 0, done: !0 };
                            })([t, e]);
                          };
                        }
                      };
                  function u() {}
                  var c = 0;
                  u.toString = function () {
                    return c++, "";
                  };
                  var d = {
                    name: "function-to-string",
                    isOpen: function () {
                      return s(this, void 0, void 0, function () {
                        return l(this, function (e) {
                          return (
                            (c = 0), Object(n.b)(u), Object(n.a)(), [2, 2 === c]
                          );
                        });
                      });
                    },
                    isEnable: function () {
                      return s(this, void 0, void 0, function () {
                        return l(this, function (e) {
                          return [
                            2,
                            Object(a.b)({
                              includes: [!0],
                              excludes: [r.c, (o.b || o.c) && r.a],
                            }),
                          ];
                        });
                      });
                    },
                  };
                },
                function (e, t, i) {
                  "use strict";
                  i.d(t, "a", function () {
                    return c;
                  });
                  var r = i(2),
                    n = i(1),
                    o = i(0),
                    a =
                      (this && this.__awaiter) ||
                      function (e, a, s, l) {
                        return new (s = s || p)(function (i, t) {
                          function r(e) {
                            try {
                              o(l.next(e));
                            } catch (e) {
                              t(e);
                            }
                          }
                          function n(e) {
                            try {
                              o(l.throw(e));
                            } catch (e) {
                              t(e);
                            }
                          }
                          function o(e) {
                            var t;
                            e.done
                              ? i(e.value)
                              : ((t = e.value) instanceof s
                                  ? t
                                  : new s(function (e) {
                                      e(t);
                                    })
                                ).then(r, n);
                          }
                          o((l = l.apply(e, a || [])).next());
                        });
                      },
                    s =
                      (this && this.__generator) ||
                      function (i, r) {
                        var n,
                          o,
                          a,
                          s = {
                            label: 0,
                            sent: function () {
                              if (1 & a[0]) throw a[1];
                              return a[1];
                            },
                            trys: [],
                            ops: [],
                          },
                          e = { next: t(0), throw: t(1), return: t(2) };
                        return (
                          "function" == typeof Symbol &&
                            (e[Symbol.iterator] = function () {
                              return this;
                            }),
                          e
                        );
                        function t(t) {
                          return function (e) {
                            return (function (t) {
                              if (n)
                                throw new TypeError(
                                  "Generator is already executing."
                                );
                              for (; s; )
                                try {
                                  if (
                                    ((n = 1),
                                    o &&
                                      (a =
                                        2 & t[0]
                                          ? o.return
                                          : t[0]
                                          ? o.throw ||
                                            ((a = o.return) && a.call(o), 0)
                                          : o.next) &&
                                      !(a = a.call(o, t[1])).done)
                                  )
                                    return a;
                                  switch (
                                    ((o = 0),
                                    (t = a ? [2 & t[0], a.value] : t)[0])
                                  ) {
                                    case 0:
                                    case 1:
                                      a = t;
                                      break;
                                    case 4:
                                      return (
                                        s.label++, { value: t[1], done: !1 }
                                      );
                                    case 5:
                                      s.label++, (o = t[1]), (t = [0]);
                                      continue;
                                    case 7:
                                      (t = s.ops.pop()), s.trys.pop();
                                      continue;
                                    default:
                                      if (
                                        !(a =
                                          0 < (a = s.trys).length &&
                                          a[a.length - 1]) &&
                                        (6 === t[0] || 2 === t[0])
                                      ) {
                                        s = 0;
                                        continue;
                                      }
                                      if (
                                        3 === t[0] &&
                                        (!a || (t[1] > a[0] && t[1] < a[3]))
                                      ) {
                                        s.label = t[1];
                                        break;
                                      }
                                      if (6 === t[0] && s.label < a[1]) {
                                        (s.label = a[1]), (a = t);
                                        break;
                                      }
                                      if (a && s.label < a[2]) {
                                        (s.label = a[2]), s.ops.push(t);
                                        break;
                                      }
                                      a[2] && s.ops.pop(), s.trys.pop();
                                      continue;
                                  }
                                  t = r.call(i, s);
                                } catch (e) {
                                  (t = [6, e]), (o = 0);
                                } finally {
                                  n = a = 0;
                                }
                              if (5 & t[0]) throw t[1];
                              return { value: t[0] ? t[1] : void 0, done: !0 };
                            })([t, e]);
                          };
                        }
                      },
                    l = / /,
                    u = !1;
                  l.toString = function () {
                    return (u = !0), c.name;
                  };
                  var c = {
                    name: "reg-to-string",
                    isOpen: function () {
                      return a(this, void 0, void 0, function () {
                        return s(this, function (e) {
                          return (
                            (u = !1), Object(r.b)(l), Object(r.a)(), [2, u]
                          );
                        });
                      });
                    },
                    isEnable: function () {
                      return a(this, void 0, void 0, function () {
                        return s(this, function (e) {
                          return [
                            2,
                            Object(o.b)({ includes: [!0], excludes: [n.f] }),
                          ];
                        });
                      });
                    },
                  };
                },
                function (e, t, i) {
                  "use strict";
                  i.d(t, "a", function () {
                    return a;
                  });
                  var r =
                      (this && this.__awaiter) ||
                      function (e, a, s, l) {
                        return new (s = s || p)(function (i, t) {
                          function r(e) {
                            try {
                              o(l.next(e));
                            } catch (e) {
                              t(e);
                            }
                          }
                          function n(e) {
                            try {
                              o(l.throw(e));
                            } catch (e) {
                              t(e);
                            }
                          }
                          function o(e) {
                            var t;
                            e.done
                              ? i(e.value)
                              : ((t = e.value) instanceof s
                                  ? t
                                  : new s(function (e) {
                                      e(t);
                                    })
                                ).then(r, n);
                          }
                          o((l = l.apply(e, a || [])).next());
                        });
                      },
                    n =
                      (this && this.__generator) ||
                      function (i, r) {
                        var n,
                          o,
                          a,
                          s = {
                            label: 0,
                            sent: function () {
                              if (1 & a[0]) throw a[1];
                              return a[1];
                            },
                            trys: [],
                            ops: [],
                          },
                          e = { next: t(0), throw: t(1), return: t(2) };
                        return (
                          "function" == typeof Symbol &&
                            (e[Symbol.iterator] = function () {
                              return this;
                            }),
                          e
                        );
                        function t(t) {
                          return function (e) {
                            return (function (t) {
                              if (n)
                                throw new TypeError(
                                  "Generator is already executing."
                                );
                              for (; s; )
                                try {
                                  if (
                                    ((n = 1),
                                    o &&
                                      (a =
                                        2 & t[0]
                                          ? o.return
                                          : t[0]
                                          ? o.throw ||
                                            ((a = o.return) && a.call(o), 0)
                                          : o.next) &&
                                      !(a = a.call(o, t[1])).done)
                                  )
                                    return a;
                                  switch (
                                    ((o = 0),
                                    (t = a ? [2 & t[0], a.value] : t)[0])
                                  ) {
                                    case 0:
                                    case 1:
                                      a = t;
                                      break;
                                    case 4:
                                      return (
                                        s.label++, { value: t[1], done: !1 }
                                      );
                                    case 5:
                                      s.label++, (o = t[1]), (t = [0]);
                                      continue;
                                    case 7:
                                      (t = s.ops.pop()), s.trys.pop();
                                      continue;
                                    default:
                                      if (
                                        !(a =
                                          0 < (a = s.trys).length &&
                                          a[a.length - 1]) &&
                                        (6 === t[0] || 2 === t[0])
                                      ) {
                                        s = 0;
                                        continue;
                                      }
                                      if (
                                        3 === t[0] &&
                                        (!a || (t[1] > a[0] && t[1] < a[3]))
                                      ) {
                                        s.label = t[1];
                                        break;
                                      }
                                      if (6 === t[0] && s.label < a[1]) {
                                        (s.label = a[1]), (a = t);
                                        break;
                                      }
                                      if (a && s.label < a[2]) {
                                        (s.label = a[2]), s.ops.push(t);
                                        break;
                                      }
                                      a[2] && s.ops.pop(), s.trys.pop();
                                      continue;
                                  }
                                  t = r.call(i, s);
                                } catch (e) {
                                  (t = [6, e]), (o = 0);
                                } finally {
                                  n = a = 0;
                                }
                              if (5 & t[0]) throw t[1];
                              return { value: t[0] ? t[1] : void 0, done: !0 };
                            })([t, e]);
                          };
                        }
                      };
                  function o() {
                    return (performance || Date).now();
                  }
                  var a = {
                    name: "debugger-checker",
                    isOpen: function () {
                      return r(this, void 0, void 0, function () {
                        var t;
                        return n(this, function (e) {
                          return (
                            (t = o()),
                            function () {}.constructor("debugger")(),
                            [2, 100 < o() - t]
                          );
                        });
                      });
                    },
                    isEnable: function () {
                      return r(this, void 0, void 0, function () {
                        return n(this, function (e) {
                          return [2, !0];
                        });
                      });
                    },
                  };
                },
                function (e, t, i) {
                  "use strict";
                  i.d(t, "a", function () {
                    return c;
                  });
                  var r = i(1),
                    n = i(2),
                    o = i(0),
                    a =
                      (this && this.__awaiter) ||
                      function (e, a, s, l) {
                        return new (s = s || p)(function (i, t) {
                          function r(e) {
                            try {
                              o(l.next(e));
                            } catch (e) {
                              t(e);
                            }
                          }
                          function n(e) {
                            try {
                              o(l.throw(e));
                            } catch (e) {
                              t(e);
                            }
                          }
                          function o(e) {
                            var t;
                            e.done
                              ? i(e.value)
                              : ((t = e.value) instanceof s
                                  ? t
                                  : new s(function (e) {
                                      e(t);
                                    })
                                ).then(r, n);
                          }
                          o((l = l.apply(e, a || [])).next());
                        });
                      },
                    s =
                      (this && this.__generator) ||
                      function (i, r) {
                        var n,
                          o,
                          a,
                          s = {
                            label: 0,
                            sent: function () {
                              if (1 & a[0]) throw a[1];
                              return a[1];
                            },
                            trys: [],
                            ops: [],
                          },
                          e = { next: t(0), throw: t(1), return: t(2) };
                        return (
                          "function" == typeof Symbol &&
                            (e[Symbol.iterator] = function () {
                              return this;
                            }),
                          e
                        );
                        function t(t) {
                          return function (e) {
                            return (function (t) {
                              if (n)
                                throw new TypeError(
                                  "Generator is already executing."
                                );
                              for (; s; )
                                try {
                                  if (
                                    ((n = 1),
                                    o &&
                                      (a =
                                        2 & t[0]
                                          ? o.return
                                          : t[0]
                                          ? o.throw ||
                                            ((a = o.return) && a.call(o), 0)
                                          : o.next) &&
                                      !(a = a.call(o, t[1])).done)
                                  )
                                    return a;
                                  switch (
                                    ((o = 0),
                                    (t = a ? [2 & t[0], a.value] : t)[0])
                                  ) {
                                    case 0:
                                    case 1:
                                      a = t;
                                      break;
                                    case 4:
                                      return (
                                        s.label++, { value: t[1], done: !1 }
                                      );
                                    case 5:
                                      s.label++, (o = t[1]), (t = [0]);
                                      continue;
                                    case 7:
                                      (t = s.ops.pop()), s.trys.pop();
                                      continue;
                                    default:
                                      if (
                                        !(a =
                                          0 < (a = s.trys).length &&
                                          a[a.length - 1]) &&
                                        (6 === t[0] || 2 === t[0])
                                      ) {
                                        s = 0;
                                        continue;
                                      }
                                      if (
                                        3 === t[0] &&
                                        (!a || (t[1] > a[0] && t[1] < a[3]))
                                      ) {
                                        s.label = t[1];
                                        break;
                                      }
                                      if (6 === t[0] && s.label < a[1]) {
                                        (s.label = a[1]), (a = t);
                                        break;
                                      }
                                      if (a && s.label < a[2]) {
                                        (s.label = a[2]), s.ops.push(t);
                                        break;
                                      }
                                      a[2] && s.ops.pop(), s.trys.pop();
                                      continue;
                                  }
                                  t = r.call(i, s);
                                } catch (e) {
                                  (t = [6, e]), (o = 0);
                                } finally {
                                  n = a = 0;
                                }
                              if (5 & t[0]) throw t[1];
                              return { value: t[0] ? t[1] : void 0, done: !0 };
                            })([t, e]);
                          };
                        }
                      },
                    l = new Date(),
                    u = 0;
                  l.toString = function () {
                    return u++, "";
                  };
                  var c = {
                    name: "date-to-string",
                    isOpen: function () {
                      return a(this, void 0, void 0, function () {
                        return s(this, function (e) {
                          return (
                            (u = 0), Object(n.b)(l), Object(n.a)(), [2, 2 === u]
                          );
                        });
                      });
                    },
                    isEnable: function () {
                      return a(this, void 0, void 0, function () {
                        return s(this, function (e) {
                          return [
                            2,
                            Object(o.b)({ includes: [r.a], excludes: [] }),
                          ];
                        });
                      });
                    },
                  };
                },
                function (e, t, i) {
                  "use strict";
                  i.d(t, "a", function () {
                    return r;
                  });
                  var i = i(3),
                    r = /mobile/i.test(i.b);
                },
              ]),
              (n = {}),
              (r.m = i),
              (r.c = n),
              (r.d = function (e, t, i) {
                r.o(e, t) ||
                  Object.defineProperty(e, t, {
                    configurable: !1,
                    enumerable: !0,
                    get: i,
                  });
              }),
              (r.n = function (e) {
                var t =
                  e && e.__esModule
                    ? function () {
                        return e.default;
                      }
                    : function () {
                        return e;
                      };
                return r.d(t, "a", t), t;
              }),
              (r.o = function (e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
              }),
              (r.p = ""),
              r((r.s = 6))
            );
            function r(e) {
              if (n[e]) return n[e].exports;
              var t = (n[e] = { i: e, l: !1, exports: {} });
              return (
                i[e].call(t.exports, t, t.exports, r), (t.l = !0), t.exports
              );
            }
            var i, n;
          }),
          "object" == typeof i && "object" == typeof t
            ? (t.exports = e())
            : "function" == typeof define && define.amd
            ? define([], e)
            : "object" == typeof i
            ? (i.devtoolsDetector = e())
            : (r.devtoolsDetector = e());
      },
      { "es6-promise": 7 },
    ],
    28: [
      function (e, l, t) {
        var r = e("./object");
        (l.exports.el = function (e) {
          return document.getElementById(e);
        }),
          (l.exports.createEl = function (e, t) {
            var i;
            return (
              (e = e || "div"),
              (t = t || {}),
              (i = document.createElement(e)),
              r.each(t, function (e, t) {
                -1 !== e.indexOf("aria-") || "role" == e
                  ? i.setAttribute(e, t)
                  : (i[e] = t);
              }),
              i
            );
          }),
          (l.exports.addClass = function (e, t) {
            -1 == (" " + e.className + " ").indexOf(" " + t + " ") &&
              (e.className = "" === e.className ? t : e.className + " " + t);
          }),
          (l.exports.removeClass = function (e, t) {
            var i, r;
            if (-1 != e.className.indexOf(t)) {
              for (r = (i = e.className.split(" ")).length - 1; 0 <= r; r--)
                i[r] === t && i.splice(r, 1);
              e.className = i.join(" ");
            }
          }),
          (l.exports.hasClass = function (e, t) {
            return -1 != e.className.indexOf(t);
          }),
          (l.exports.getClasses = function (e) {
            return e.className ? e.className.split(" ") : [];
          }),
          (l.exports.getElementAttributes = function (e) {
            var t,
              i,
              r = {},
              n = ",autoplay,controls,loop,muted,default,";
            if (e && e.attributes && 0 < e.attributes.length)
              for (var o, a = (o = e.attributes).length - 1; 0 <= a; a--)
                (t = o[a].name),
                  (i = o[a].value),
                  ("boolean" != typeof e[t] &&
                    -1 === n.indexOf("," + t + ",")) ||
                    (i = null !== i),
                  (r[t] = i);
            return r;
          }),
          (l.exports.insertFirst = function (e, t) {
            t.firstChild ? t.insertBefore(e, t.firstChild) : t.appendChild(e);
          }),
          (l.exports.blockTextSelection = function () {
            document.body.focus(),
              (document.onselectstart = function () {
                return !1;
              });
          }),
          (l.exports.unblockTextSelection = function () {
            document.onselectstart = function () {
              return !0;
            };
          }),
          (l.exports.css = function (i, e, t) {
            return (
              !(!i || !i.style) &&
              (e && t
                ? ((i.style[e] = t), !0)
                : t || "string" != typeof e
                ? !t &&
                  "object" == typeof e &&
                  (r.each(e, function (e, t) {
                    i.style[e] = t;
                  }),
                  !0)
                : i.style[e])
            );
          }),
          (l.exports.getTransformName = function (e) {
            for (
              var t = [
                  "transform",
                  "WebkitTransform",
                  "MozTransform",
                  "msTransform",
                  "OTransform",
                ],
                i = t[0],
                r = 0,
                n = t.length;
              r < n;
              r++
            )
              if (void 0 !== e.style[t[r]]) {
                i = t[r];
                break;
              }
            return i;
          }),
          (l.exports.getTransformEventName = function (e, t) {
            for (
              var i = ["", "Webkit", "Moz", "ms", "O"],
                r = t.toLowerCase(),
                n = [
                  "transform",
                  "WebkitTransform",
                  "MozTransform",
                  "msTransform",
                  "OTransform",
                ],
                o = 0,
                a = n.length;
              o < a;
              o++
            )
              if (void 0 !== e.style[n[o]]) {
                0 != o && (r = i[o] + t);
                break;
              }
            return r;
          }),
          (l.exports.addCssByStyle = function (e) {
            var t = document,
              i = t.createElement("style");
            i.setAttribute("type", "text/css"),
              i.styleSheet
                ? (i.styleSheet.cssText = e)
                : ((r = t.createTextNode(e)), i.appendChild(r));
            var r = t.getElementsByTagName("head");
            (r.length ? r[0] : t.documentElement).appendChild(i);
          }),
          (l.exports.getTranslateX = function (e) {
            var t = 0;
            if (e)
              try {
                var i = window.getComputedStyle(e),
                  r = l.exports.getTransformName(e),
                  t = new (window.DOMMatrix ||
                    window.WebKitCSSMatrix ||
                    window.CSSMatrix ||
                    window.MSCSSMatrix)(i[r]).m41;
              } catch (e) {
                console.log(e);
              }
            return t;
          }),
          (l.exports.getPointerPosition = function (e, t) {
            var i = {},
              r = l.exports.findPosition(e),
              n = e.offsetWidth,
              o = e.offsetHeight,
              a = r.top,
              s = r.left,
              e = t.pageY,
              r = t.pageX;
            return (
              t.changedTouches &&
                ((r = t.changedTouches[0].pageX),
                (e = t.changedTouches[0].pageY)),
              (i.y = Math.max(0, Math.min(1, (a - e + o) / o))),
              (i.x = Math.max(0, Math.min(1, (r - s) / n))),
              i
            );
          }),
          (l.exports.findPosition = function (e) {
            var t;
            if (
              !(t =
                e.getBoundingClientRect && e.parentNode
                  ? e.getBoundingClientRect()
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
          });
      },
      { "./object": 37 },
    ],
    29: [
      function (e, l, t) {
        var u = e("./object"),
          c = e("./data"),
          i = e("./ua"),
          r = e("./fastclick");
        function d(t, i, e, r) {
          u.each(e, function (e) {
            t(i, e, r);
          });
        }
        (l.exports.on = function (o, e, t) {
          if (o) {
            if (u.isArray(e)) return d(l.exports.on, o, e, t);
            i.IS_MOBILE && "click" == e && r.attach(o);
            var a = c.getData(o);
            a.handlers || (a.handlers = {}),
              a.handlers[e] || (a.handlers[e] = []),
              t.guid || (t.guid = c.guid()),
              a.handlers[e].push(t),
              a.dispatcher ||
                ((a.disabled = !1),
                (a.dispatcher = function (e) {
                  if (!a.disabled) {
                    e = l.exports.fixEvent(e);
                    var t = a.handlers[e.type];
                    if (t)
                      for (
                        var i = t.slice(0), r = 0, n = i.length;
                        r < n && !e.isImmediatePropagationStopped();
                        r++
                      )
                        i[r].call(o, e);
                  }
                })),
              1 == a.handlers[e].length &&
                (o.addEventListener
                  ? o.addEventListener(e, a.dispatcher, !1)
                  : o.attachEvent && o.attachEvent("on" + e, a.dispatcher));
          }
        }),
          (l.exports.off = function (t, e, i) {
            if (t && c.hasData(t)) {
              var r = c.getData(t);
              if (r.handlers) {
                if (u.isArray(e)) return d(l.exports.off, t, e, i);
                function n(e) {
                  (r.handlers[e] = []), l.exports.cleanUpEvents(t, e);
                }
                if (e) {
                  var o = r.handlers[e];
                  if (o)
                    if (i) {
                      if (i.guid)
                        for (var a = 0; a < o.length; a++)
                          o[a].guid === i.guid && o.splice(a--, 1);
                      l.exports.cleanUpEvents(t, e);
                    } else n(e);
                } else for (var s in r.handlers) n(s);
              }
            }
          }),
          (l.exports.cleanUpEvents = function (e, t) {
            var i = c.getData(e);
            0 === i.handlers[t].length &&
              (delete i.handlers[t],
              e.removeEventListener
                ? e.removeEventListener(t, i.dispatcher, !1)
                : e.detachEvent && e.detachEvent("on" + t, i.dispatcher)),
              u.isEmpty(i.handlers) &&
                (delete i.handlers, delete i.dispatcher, delete i.disabled),
              u.isEmpty(i) && c.removeData(e);
          }),
          (l.exports.fixEvent = function (e) {
            function t() {
              return !0;
            }
            function i() {
              return !1;
            }
            if (!e || !e.isPropagationStopped) {
              var r,
                n,
                o,
                a = e || window.event;
              for (r in ((e = {}), a))
                "layerX" !== r &&
                  "layerY" !== r &&
                  "keyboardEvent.keyLocation" !== r &&
                  (("returnValue" == r && a.preventDefault) || (e[r] = a[r]));
              e.target || (e.target = e.srcElement || document),
                (e.relatedTarget =
                  e.fromElement === e.target ? e.toElement : e.fromElement),
                (e.preventDefault = function () {
                  a.preventDefault && a.preventDefault(),
                    (e.returnValue = !1),
                    (e.isDefaultPrevented = t),
                    (e.defaultPrevented = !0);
                }),
                (e.isDefaultPrevented = i),
                (e.defaultPrevented = !1),
                (e.stopPropagation = function () {
                  a.stopPropagation && a.stopPropagation(),
                    (e.cancelBubble = !0),
                    (e.isPropagationStopped = t);
                }),
                (e.isPropagationStopped = i),
                (e.stopImmediatePropagation = function () {
                  a.stopImmediatePropagation && a.stopImmediatePropagation(),
                    (e.isImmediatePropagationStopped = t),
                    e.stopPropagation();
                }),
                (e.isImmediatePropagationStopped = i),
                null != e.clientX &&
                  ((n = document.documentElement),
                  (o = document.body),
                  (e.pageX =
                    e.clientX +
                    ((n && n.scrollLeft) || (o && o.scrollLeft) || 0) -
                    ((n && n.clientLeft) || (o && o.clientLeft) || 0)),
                  (e.pageY =
                    e.clientY +
                    ((n && n.scrollTop) || (o && o.scrollTop) || 0) -
                    ((n && n.clientTop) || (o && o.clientTop) || 0))),
                (e.which = e.charCode || e.keyCode),
                null != e.button &&
                  (e.button =
                    1 & e.button ? 0 : 4 & e.button ? 1 : 2 & e.button ? 2 : 0);
            }
            return e;
          }),
          (l.exports.trigger = function (e, t) {
            if (e) {
              var i,
                r = c.hasData(e) ? c.getData(e) : {},
                n = e.parentNode || e.ownerDocument;
              return (
                "string" == typeof t &&
                  ((i = null),
                  (!e.paramData && 0 != e.paramData) ||
                    ((i = e.paramData),
                    (e.paramData = null),
                    e.removeAttribute(i)),
                  (t = { type: t, target: e, paramData: i })),
                (t = l.exports.fixEvent(t)),
                r.dispatcher && r.dispatcher.call(e, t),
                n && !t.isPropagationStopped() && !1 !== t.bubbles
                  ? l.exports.trigger(n, t)
                  : n ||
                    t.defaultPrevented ||
                    ((n = c.getData(t.target)),
                    t.target[t.type] &&
                      ((n.disabled = !0),
                      "function" == typeof t.target[t.type] &&
                        t.target[t.type](),
                      (n.disabled = !1))),
                !t.defaultPrevented
              );
            }
          }),
          (l.exports.one = function (e, t, i) {
            if (e) {
              if (u.isArray(t)) return d(l.exports.one, e, t, i);
              function r() {
                l.exports.off(e, t, r), i.apply(this, arguments);
              }
              (r.guid = i.guid = i.guid || c.guid()), l.exports.on(e, t, r);
            }
          });
      },
      { "./data": 26, "./fastclick": 30, "./object": 37, "./ua": 42 },
    ],
    30: [
      function (e, t, i) {
        function a(n, e) {
          var t;
          if (
            ((e = e || {}),
            (this.trackingClick = !1),
            (this.trackingClickStart = 0),
            (this.targetElement = null),
            (this.touchStartX = 0),
            (this.touchStartY = 0),
            (this.lastTouchIdentifier = 0),
            (this.touchBoundary = e.touchBoundary || 10),
            (this.layer = n),
            (this.tapDelay = e.tapDelay || 200),
            (this.tapTimeout = e.tapTimeout || 700),
            !a.notNeeded(n))
          ) {
            for (
              var i = [
                  "onMouse",
                  "onClick",
                  "onTouchStart",
                  "onTouchMove",
                  "onTouchEnd",
                  "onTouchCancel",
                ],
                r = 0,
                o = i.length;
              r < o;
              r++
            )
              this[i[r]] = (function (e, t) {
                return function () {
                  return e.apply(t, arguments);
                };
              })(this[i[r]], this);
            s &&
              (n.addEventListener("mouseover", this.onMouse, !0),
              n.addEventListener("mousedown", this.onMouse, !0),
              n.addEventListener("mouseup", this.onMouse, !0)),
              n.addEventListener("click", this.onClick, !0),
              n.addEventListener("touchstart", this.onTouchStart, !1),
              n.addEventListener("touchmove", this.onTouchMove, !1),
              n.addEventListener("touchend", this.onTouchEnd, !1),
              n.addEventListener("touchcancel", this.onTouchCancel, !1),
              Event.prototype.stopImmediatePropagation ||
                ((n.removeEventListener = function (e, t, i) {
                  var r = Node.prototype.removeEventListener;
                  "click" === e
                    ? r.call(n, e, t.hijacked || t, i)
                    : r.call(n, e, t, i);
                }),
                (n.addEventListener = function (e, t, i) {
                  var r = Node.prototype.addEventListener;
                  "click" === e
                    ? r.call(
                        n,
                        e,
                        t.hijacked ||
                          (t.hijacked = function (e) {
                            e.propagationStopped || t(e);
                          }),
                        i
                      )
                    : r.call(n, e, t, i);
                })),
              "function" == typeof n.onclick &&
                ((t = n.onclick),
                n.addEventListener(
                  "click",
                  function (e) {
                    t(e);
                  },
                  !1
                ),
                (n.onclick = null));
          }
        }
        var r = 0 <= navigator.userAgent.indexOf("Windows Phone"),
          s = 0 < navigator.userAgent.indexOf("Android") && !r,
          l = /iP(ad|hone|od)/.test(navigator.userAgent) && !r,
          u = l && /OS 4_\d(_\d)?/.test(navigator.userAgent),
          c = l && /OS [6-7]_\d/.test(navigator.userAgent),
          n = 0 < navigator.userAgent.indexOf("BB10");
        (a.prototype.needsClick = function (e) {
          switch (e.nodeName.toLowerCase()) {
            case "button":
            case "select":
            case "textarea":
              if (e.disabled) return !0;
              break;
            case "input":
              if ((l && "file" === e.type) || e.disabled) return !0;
              break;
            case "label":
            case "iframe":
            case "video":
              return !0;
          }
          return /\bneedsclick\b/.test(e.className);
        }),
          (a.prototype.needsFocus = function (e) {
            switch (e.nodeName.toLowerCase()) {
              case "textarea":
                return !0;
              case "select":
                return !s;
              case "input":
                switch (e.type) {
                  case "button":
                  case "checkbox":
                  case "file":
                  case "image":
                  case "radio":
                  case "submit":
                    return !1;
                }
                return !e.disabled && !e.readOnly;
              default:
                return /\bneedsfocus\b/.test(e.className);
            }
          }),
          (a.prototype.sendClick = function (e, t) {
            var i;
            document.activeElement &&
              document.activeElement !== e &&
              document.activeElement.blur(),
              (i = t.changedTouches[0]),
              (t = document.createEvent("MouseEvents")).initMouseEvent(
                this.determineEventType(e),
                !0,
                !0,
                window,
                1,
                i.screenX,
                i.screenY,
                i.clientX,
                i.clientY,
                !1,
                !1,
                !1,
                !1,
                0,
                null
              ),
              (t.forwardedTouchEvent = !0),
              e.dispatchEvent(t);
          }),
          (a.prototype.determineEventType = function (e) {
            return s && "select" === e.tagName.toLowerCase()
              ? "mousedown"
              : "click";
          }),
          (a.prototype.focus = function (e) {
            var t;
            l &&
            e.setSelectionRange &&
            0 !== e.type.indexOf("date") &&
            "time" !== e.type &&
            "month" !== e.type &&
            "email" !== e.type
              ? ((t = e.value.length), e.setSelectionRange(t, t))
              : e.focus();
          }),
          (a.prototype.updateScrollParent = function (e) {
            var t,
              i = e.fastClickScrollParent;
            if (!i || !i.contains(e)) {
              t = e;
              do {
                if (t.scrollHeight > t.offsetHeight) {
                  (i = t), (e.fastClickScrollParent = t);
                  break;
                }
              } while ((t = t.parentElement));
            }
            i && (i.fastClickLastScrollTop = i.scrollTop);
          }),
          (a.prototype.getTargetElementFromEventTarget = function (e) {
            return e.nodeType === Node.TEXT_NODE ? e.parentNode : e;
          }),
          (a.prototype.onTouchStart = function (e) {
            var t, i, r;
            if (1 < e.targetTouches.length) return !0;
            if (
              ((t = this.getTargetElementFromEventTarget(e.target)),
              (i = e.targetTouches[0]),
              l)
            ) {
              if ((r = window.getSelection()).rangeCount && !r.isCollapsed)
                return !0;
              if (!u) {
                if (i.identifier && i.identifier === this.lastTouchIdentifier)
                  return e.preventDefault(), !1;
                (this.lastTouchIdentifier = i.identifier),
                  this.updateScrollParent(t);
              }
            }
            return (
              (this.trackingClick = !0),
              (this.trackingClickStart = e.timeStamp),
              (this.targetElement = t),
              (this.touchStartX = i.pageX),
              (this.touchStartY = i.pageY),
              e.timeStamp - this.lastClickTime < this.tapDelay &&
                e.preventDefault(),
              !0
            );
          }),
          (a.prototype.touchHasMoved = function (e) {
            var t = e.changedTouches[0],
              e = this.touchBoundary;
            return (
              Math.abs(t.pageX - this.touchStartX) > e ||
              Math.abs(t.pageY - this.touchStartY) > e
            );
          }),
          (a.prototype.onTouchMove = function (e) {
            return (
              this.trackingClick &&
                ((this.targetElement ===
                  this.getTargetElementFromEventTarget(e.target) &&
                  !this.touchHasMoved(e)) ||
                  ((this.trackingClick = !1), (this.targetElement = null))),
              !0
            );
          }),
          (a.prototype.findControl = function (e) {
            return void 0 !== e.control
              ? e.control
              : e.htmlFor
              ? document.getElementById(e.htmlFor)
              : e.querySelector(
                  "button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea"
                );
          }),
          (a.prototype.onTouchEnd = function (e) {
            var t,
              i,
              r,
              n,
              o = this.targetElement;
            if (!this.trackingClick) return !0;
            if (e.timeStamp - this.lastClickTime < this.tapDelay)
              return (this.cancelNextClick = !0);
            if (e.timeStamp - this.trackingClickStart > this.tapTimeout)
              return !0;
            if (
              ((this.cancelNextClick = !1),
              (this.lastClickTime = e.timeStamp),
              (t = this.trackingClickStart),
              (this.trackingClick = !1),
              (this.trackingClickStart = 0),
              c &&
                ((n = e.changedTouches[0]),
                ((o =
                  document.elementFromPoint(
                    n.pageX - window.pageXOffset,
                    n.pageY - window.pageYOffset
                  ) || o).fastClickScrollParent =
                  this.targetElement.fastClickScrollParent)),
              "label" === (i = o.tagName.toLowerCase()))
            ) {
              if ((n = this.findControl(o))) {
                if ((this.focus(o), s)) return !1;
                o = n;
              }
            } else if (this.needsFocus(o))
              return (
                100 < e.timeStamp - t ||
                (l && window.top !== window && "input" === i)
                  ? (this.targetElement = null)
                  : (this.focus(o),
                    this.sendClick(o, e),
                    (l && "select" === i) ||
                      ((this.targetElement = null), e.preventDefault())),
                !1
              );
            return (
              !(
                !l ||
                u ||
                !(r = o.fastClickScrollParent) ||
                r.fastClickLastScrollTop === r.scrollTop
              ) ||
              (this.needsClick(o) || (e.preventDefault(), this.sendClick(o, e)),
              !1)
            );
          }),
          (a.prototype.onTouchCancel = function () {
            (this.trackingClick = !1), (this.targetElement = null);
          }),
          (a.prototype.onMouse = function (e) {
            return (
              !this.targetElement ||
              !!e.forwardedTouchEvent ||
              !e.cancelable ||
              !(!this.needsClick(this.targetElement) || this.cancelNextClick) ||
              (e.stopImmediatePropagation
                ? e.stopImmediatePropagation()
                : (e.propagationStopped = !0),
              e.stopPropagation(),
              e.preventDefault(),
              !1)
            );
          }),
          (a.prototype.onClick = function (e) {
            return this.trackingClick
              ? ((this.targetElement = null), !(this.trackingClick = !1))
              : ("submit" === e.target.type && 0 === e.detail) ||
                  ((e = this.onMouse(e)) || (this.targetElement = null), e);
          }),
          (a.prototype.destroy = function () {
            var e = this.layer;
            s &&
              (e.removeEventListener("mouseover", this.onMouse, !0),
              e.removeEventListener("mousedown", this.onMouse, !0),
              e.removeEventListener("mouseup", this.onMouse, !0)),
              e.removeEventListener("click", this.onClick, !0),
              e.removeEventListener("touchstart", this.onTouchStart, !1),
              e.removeEventListener("touchmove", this.onTouchMove, !1),
              e.removeEventListener("touchend", this.onTouchEnd, !1),
              e.removeEventListener("touchcancel", this.onTouchCancel, !1);
          }),
          (a.notNeeded = function (e) {
            var t, i, r;
            if (void 0 === window.ontouchstart) return !0;
            if (
              (i = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1])
            ) {
              if (!s) return !0;
              if ((t = document.querySelector("meta[name=viewport]"))) {
                if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
                if (
                  31 < i &&
                  document.documentElement.scrollWidth <= window.outerWidth
                )
                  return !0;
              }
            }
            if (
              n &&
              10 <=
                (r = navigator.userAgent.match(
                  /Version\/([0-9]*)\.([0-9]*)/
                ))[1] &&
              3 <= r[2] &&
              (t = document.querySelector("meta[name=viewport]"))
            ) {
              if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
              if (document.documentElement.scrollWidth <= window.outerWidth)
                return !0;
            }
            return (
              "none" === e.style.msTouchAction ||
              "manipulation" === e.style.touchAction ||
              !!(
                27 <=
                  +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [
                    ,
                    0,
                  ])[1] &&
                (t = document.querySelector("meta[name=viewport]")) &&
                (-1 !== t.content.indexOf("user-scalable=no") ||
                  document.documentElement.scrollWidth <= window.outerWidth)
              ) ||
              "none" === e.style.touchAction ||
              "manipulation" === e.style.touchAction
            );
          }),
          (a.attach = function (e, t) {
            return new a(e, t);
          }),
          (t.exports = a);
      },
      {},
    ],
    31: [
      function (e, t, i) {
        var n = e("./data");
        t.exports.bind = function (e, t, i) {
          t.guid || (t.guid = n.guid());
          function r() {
            return t.apply(e, arguments);
          }
          return (r.guid = i ? i + "_" + t.guid : t.guid), r;
        };
      },
      { "./data": 26 },
    ],
    32: [
      function (e, t, i) {
        var r =
            /^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/\;?#]*)?(.*?)??(;.*?)?(\?.*?)?(#.*?)?$/,
          o = /^([^\/;?#]*)(.*)$/,
          n = /(?:\/|^)\.(?=\/)/g,
          a = /(?:\/|^)\.\.\/(?!\.\.\/).*?(?=\/)/g,
          s = {
            buildAbsoluteURL: function (e, t, i) {
              if (((i = i || {}), (e = e.trim()), !(t = t.trim()))) {
                if (!i.alwaysNormalize) return e;
                var r = s.parseURL(e);
                if (!r) throw new Error("Error trying to parse base URL.");
                return (
                  (r.path = s.normalizePath(r.path)), s.buildURLFromParts(r)
                );
              }
              r = s.parseURL(t);
              if (!r) throw new Error("Error trying to parse relative URL.");
              if (r.scheme)
                return i.alwaysNormalize
                  ? ((r.path = s.normalizePath(r.path)), s.buildURLFromParts(r))
                  : t;
              t = s.parseURL(e);
              if (!t) throw new Error("Error trying to parse base URL.");
              !t.netLoc &&
                t.path &&
                "/" !== t.path[0] &&
                ((n = o.exec(t.path)), (t.netLoc = n[1]), (t.path = n[2])),
                t.netLoc && !t.path && (t.path = "/");
              var n,
                e = {
                  scheme: t.scheme,
                  netLoc: r.netLoc,
                  path: null,
                  params: r.params,
                  query: r.query,
                  fragment: r.fragment,
                };
              return (
                r.netLoc ||
                  ((e.netLoc = t.netLoc),
                  "/" !== r.path[0] &&
                    (r.path
                      ? ((n =
                          (n = t.path).substring(0, n.lastIndexOf("/") + 1) +
                          r.path),
                        (e.path = s.normalizePath(n)))
                      : ((e.path = t.path),
                        r.params ||
                          ((e.params = t.params),
                          r.query || (e.query = t.query))))),
                null === e.path &&
                  (e.path = i.alwaysNormalize
                    ? s.normalizePath(r.path)
                    : r.path),
                s.buildURLFromParts(e)
              );
            },
            parseURL: function (e) {
              e = r.exec(e);
              return e
                ? {
                    scheme: e[1] || "",
                    netLoc: e[2] || "",
                    path: e[3] || "",
                    params: e[4] || "",
                    query: e[5] || "",
                    fragment: e[6] || "",
                  }
                : null;
            },
            normalizePath: function (e) {
              for (
                e = e.split("").reverse().join("").replace(n, "");
                e.length !== (e = e.replace(a, "")).length;

              );
              return e.split("").reverse().join("");
            },
            buildURLFromParts: function (e) {
              return (
                e.scheme + e.netLoc + e.path + e.params + e.query + e.fragment
              );
            },
          };
        t.exports = s;
      },
      {},
    ],
    33: [
      function (e, t, i) {
        function r(e) {
          for (var t in (e = "string" == typeof e ? this.parseAttrList(e) : e))
            e.hasOwnProperty(t) && (this[t] = e[t]);
        }
        var n = /^(\d+)x(\d+)$/,
          o = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g;
        (r.prototype = {
          decimalInteger: function (e) {
            e = parseInt(this[e], 10);
            return e > Number.MAX_SAFE_INTEGER ? 1 / 0 : e;
          },
          hexadecimalInteger: function (e) {
            if (this[e]) {
              for (
                var t =
                    (1 & (t = (this[e] || "0x").slice(2)).length ? "0" : "") +
                    t,
                  i = new Uint8Array(t.length / 2),
                  r = 0;
                r < t.length / 2;
                r++
              )
                i[r] = parseInt(t.slice(2 * r, 2 * r + 2), 16);
              return i;
            }
            return null;
          },
          hexadecimalIntegerAsNumber: function (e) {
            e = parseInt(this[e], 16);
            return e > Number.MAX_SAFE_INTEGER ? 1 / 0 : e;
          },
          decimalFloatingPoint: function (e) {
            return parseFloat(this[e]);
          },
          enumeratedString: function (e) {
            return this[e];
          },
          decimalResolution: function (e) {
            e = n.exec(this[e]);
            if (null !== e)
              return { width: parseInt(e[1], 10), height: parseInt(e[2], 10) };
          },
          parseAttrList: function (e) {
            var t,
              i = {};
            for (o.lastIndex = 0; null !== (t = o.exec(e)); ) {
              var r = t[2];
              0 === r.indexOf('"') &&
                r.lastIndexOf('"') === r.length - 1 &&
                (r = r.slice(1, -1)),
                (i[t[1]] = r);
            }
            return i;
          },
        }),
          (t.exports = r);
      },
      {},
    ],
    34: [
      function (e, t, i) {
        function T() {
          (this.method = null),
            (this.key = null),
            (this.iv = null),
            (this._uri = null);
        }
        function x() {
          (this._url = null),
            (this._byteRange = null),
            (this._decryptdata = null),
            (this.tagList = []);
        }
        var E = e("./attrlist"),
          l = e("../io"),
          r = e("./URLToolkit"),
          u = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g,
          c = /#EXT-X-MEDIA:(.*)/g,
          w = new RegExp(
            [
              /#EXTINF:(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source,
              /|(?!#)(\S+)/.source,
              /|#EXT-X-BYTERANGE:*(.+)/.source,
              /|#EXT-X-PROGRAM-DATE-TIME:(.+)/.source,
              /|#.*/.source,
            ].join(""),
            "g"
          ),
          P =
            /(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(PART-INF):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE): *(\d+))|(?:#EXT-X-(TARGETDURATION): *(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DISCONTINUITY-SEQ)UENCE:(\d+))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(VERSION):(\d+))|(?:#EXT-X-(MAP):(.+))|(?:(#)(.*):(.*))|(?:(#)(.*))(?:.*)\r?\n?/;
        (x.prototype.getUrl = function () {
          return (
            !this._url &&
              this.relurl &&
              (this._url = r.buildAbsoluteURL(this.baseurl, this.relurl, {
                alwaysNormalize: !0,
              })),
            this._url
          );
        }),
          (x.prototype.Seturl = function (e) {
            this._url = e;
          }),
          (x.prototype.getProgramDateTime = function () {
            return (
              !this._programDateTime &&
                this.rawProgramDateTime &&
                (this._programDateTime = new Date(
                  Date.parse(this.rawProgramDateTime)
                )),
              this._programDateTime
            );
          }),
          (x.prototype.GetbyteRange = function () {
            var e, t, i;
            return (
              this._byteRange ||
                ((e = this._byteRange = []),
                this.rawByteRange &&
                  (1 === (t = this.rawByteRange.split("@", 2)).length
                    ? ((i = this.lastByteRangeEndOffset), (e[0] = i || 0))
                    : (e[0] = parseInt(t[1])),
                  (e[1] = parseInt(t[0]) + e[0]))),
              this._byteRange
            );
          }),
          (x.prototype.getByteRangeStartOffset = function () {
            return this.byteRange[0];
          }),
          (x.prototype.getByteRangeEndOffset = function () {
            return this.byteRange[1];
          });
        x.prototype.getDecryptdata = function () {
          return (
            this._decryptdata ||
              (this._decryptdata = this.fragmentDecryptdataFromLevelkey(
                this.levelkey,
                this.sn
              )),
            this._decryptdata
          );
        };
        function n() {
          this.loaders = {};
        }
        (n.prototype =
          (((e = {
            parseMasterPlaylist: function (e, t) {
              var i = [];
              for (u.lastIndex = 0; null != (o = u.exec(e)); ) {
                var r = {},
                  n = (r.attrs = new E(o[1]));
                r.url = this.resolve(o[2], t);
                var o = n.decimalResolution("RESOLUTION");
                if (
                  (o && ((r.width = o.width), (r.height = o.height)),
                  (r.bitrate =
                    n.decimalInteger("AVERAGE-BANDWIDTH") ||
                    n.decimalInteger("BANDWIDTH")),
                  (r.name = n.NAME),
                  (a = n.CODECS))
                )
                  for (var a = a.split(/[ ,]+/), s = 0; s < a.length; s++) {
                    var l = a[s];
                    -1 !== l.indexOf("avc1")
                      ? (r.videoCodec = this.avc1toavcoti(l))
                      : -1 !== l.indexOf("hvc1")
                      ? (r.videoCodec = l)
                      : (r.audioCodec = l);
                  }
                i.push(r);
              }
              return i;
            },
            parseMasterPlaylistMedia: function (e, t, i, r) {
              var n = [],
                o = 0;
              for (c.lastIndex = 0; null != (s = c.exec(e)); ) {
                var a = {},
                  s = new E(s[1]);
                s.TYPE === i &&
                  ((a.groupId = s["GROUP-ID"]),
                  (a.name = s.NAME),
                  (a.type = i),
                  (a.default = "YES" === s.DEFAULT),
                  (a.autoselect = "YES" === s.AUTOSELECT),
                  (a.forced = "YES" === s.FORCED),
                  s.URI && (a.url = this.resolve(s.URI, t)),
                  (a.lang = s.LANGUAGE),
                  a.name || (a.name = a.lang),
                  r && (a.audioCodec = r),
                  (a.id = o++),
                  n.push(a));
              }
              return n;
            },
            avc1toavcoti: function (e) {
              var t,
                i = e.split(".");
              return (
                2 < i.length
                  ? ((t = i.shift() + "."),
                    (t += parseInt(i.shift()).toString(16)),
                    (t += ("000" + parseInt(i.shift()).toString(16)).substr(
                      -4
                    )))
                  : (t = e),
                t
              );
            },
            load: function (o, a, t) {
              var s = this;
              l.get(
                o,
                function (e) {
                  var t,
                    i,
                    r,
                    n = s.parseMasterPlaylist(e, o);
                  n.length &&
                    ((t = s.parseMasterPlaylistMedia(
                      e,
                      o,
                      "AUDIO",
                      n[0].audioCodec
                    )),
                    (i = s.parseMasterPlaylistMedia(e, o, "SUBTITLES")),
                    t.length &&
                      ((r = !1),
                      t.forEach(function (e) {
                        e.url || (r = !0);
                      }),
                      !1 === r &&
                        n[0].audioCodec &&
                        !n[0].attrs.AUDIO &&
                        (console.log(
                          "audio codec signaled in quality level, but no embedded audio track signaled, create one"
                        ),
                        t.unshift({ type: "main", name: "main" })))),
                    a({
                      levels: n,
                      audioTracks: t,
                      subtitles: i,
                      url: o,
                      string: e,
                    });
                },
                function (e) {
                  console.log(e), t && t(e);
                }
              );
            },
            loadMediaPlaylist: function (e, t, i) {
              var r = this,
                n = (e = e || {}).string,
                o = e.url;
              n
                ? ((n = r.parseLevelPlaylist(n, o)), t(n))
                : l.get(
                    o,
                    function (e) {
                      e = r.parseLevelPlaylist(e, o);
                      t(e);
                    },
                    function (e) {
                      i && i(e);
                    }
                  );
            },
            resolve: function (e, t) {
              return r.buildAbsoluteURL(t, e, { alwaysNormalize: !0 });
            },
          }).parseMasterPlaylist = function (e, t) {
            var i = [];
            for (u.lastIndex = 0; null != (o = u.exec(e)); ) {
              var r = {},
                n = (r.attrs = new E(o[1]));
              r.url = this.resolve(o[2], t);
              var o = n.decimalResolution("RESOLUTION");
              if (
                (o && ((r.width = o.width), (r.height = o.height)),
                (r.bitrate =
                  n.decimalInteger("AVERAGE-BANDWIDTH") ||
                  n.decimalInteger("BANDWIDTH")),
                (r.name = n.NAME),
                (a = n.CODECS))
              )
                for (var a = a.split(/[ ,]+/), s = 0; s < a.length; s++) {
                  var l = a[s];
                  -1 !== l.indexOf("avc1")
                    ? (r.videoCodec = this.avc1toavcoti(l))
                    : -1 !== l.indexOf("hvc1")
                    ? (r.videoCodec = l)
                    : (r.audioCodec = l);
                }
              i.push(r);
            }
            return i;
          }),
          (e.parseMasterPlaylistMedia = function (e, t, i, r) {
            var n = [],
              o = 0;
            for (c.lastIndex = 0; null != (s = c.exec(e)); ) {
              var a = {},
                s = new E(s[1]);
              s.TYPE === i &&
                ((a.groupId = s["GROUP-ID"]),
                (a.name = s.NAME),
                (a.type = i),
                (a.default = "YES" === s.DEFAULT),
                (a.autoselect = "YES" === s.AUTOSELECT),
                (a.forced = "YES" === s.FORCED),
                s.URI && (a.url = this.resolve(s.URI, t)),
                (a.lang = s.LANGUAGE),
                a.name || (a.name = a.lang),
                r && (a.audioCodec = r),
                (a.id = o++),
                n.push(a));
            }
            return n;
          }),
          (e.avc1toavcoti = function (e) {
            var t,
              i = e.split(".");
            return (
              2 < i.length
                ? ((t = i.shift() + "."),
                  (t += parseInt(i.shift()).toString(16)),
                  (t += ("000" + parseInt(i.shift()).toString(16)).substr(-4)))
                : (t = e),
              t
            );
          }),
          (e.parseLevelPlaylist = function (e, t, i, r) {
            var n,
              o,
              a = 0,
              s = 0,
              l = {
                type: null,
                version: null,
                url: t,
                fragments: [],
                live: !0,
                startSN: 0,
              },
              u = new T(),
              c = 0,
              d = null,
              p = new x();
            for (w.lastIndex = 0; null !== (n = w.exec(e)); ) {
              var h,
                f = n[1];
              if (f) {
                p.duration = parseFloat(f);
                var _ = (" " + n[2]).slice(1);
                (p.title = _ || null),
                  p.tagList.push(_ ? ["INF", f, _] : ["INF", f]);
              } else if (n[3])
                isNaN(p.duration) ||
                  ((h = a++),
                  (p.type = r),
                  (p.start = s),
                  (p.levelkey = u),
                  (p.sn = h),
                  (p.level = i),
                  (p.cc = c),
                  (p.baseurl = t),
                  (p.relurl = (" " + n[3]).slice(1)),
                  l.fragments.push(p),
                  (s += (d = p).duration),
                  (p = new x()));
              else if (n[4])
                (p.rawByteRange = (" " + n[4]).slice(1)),
                  !d ||
                    ((h = d.byteRangeEndOffset) &&
                      (p.lastByteRangeEndOffset = h));
              else if (n[5])
                (p.rawProgramDateTime = (" " + n[5]).slice(1)),
                  p.tagList.push(["PROGRAM-DATE-TIME", p.rawProgramDateTime]),
                  void 0 === l.programDateTime &&
                    (l.programDateTime = new Date(
                      new Date(Date.parse(n[5])) - 1e3 * s
                    ));
              else {
                for (
                  n = n[0].match(P), o = 1;
                  o < n.length && void 0 === n[o];
                  o++
                );
                var y = (" " + n[o + 1]).slice(1),
                  g = (" " + n[o + 2]).slice(1);
                switch (n[o]) {
                  case "#":
                    p.tagList.push(g ? [y, g] : [y]);
                    break;
                  case "PLAYLIST-TYPE":
                    l.type = y.toUpperCase();
                    break;
                  case "MEDIA-SEQUENCE":
                    a = l.startSN = parseInt(y);
                    break;
                  case "TARGETDURATION":
                    l.targetduration = parseFloat(y);
                    break;
                  case "VERSION":
                    l.version = parseInt(y);
                    break;
                  case "EXTM3U":
                    break;
                  case "ENDLIST":
                    l.live = !1;
                    break;
                  case "DIS":
                    c++, p.tagList.push(["DIS"]);
                    break;
                  case "DISCONTINUITY-SEQ":
                    c = parseInt(y);
                    break;
                  case "KEY":
                    var v = new E(y),
                      m = v.enumeratedString("METHOD"),
                      S = v.URI,
                      v = v.hexadecimalInteger("IV");
                    m &&
                      ((u = new T()),
                      S &&
                        0 <= ["AES-128", "SAMPLE-AES"].indexOf(m) &&
                        ((u.method = m),
                        (u.baseuri = t),
                        (u.reluri = S),
                        (u.key = null),
                        (u.iv = v)));
                    break;
                  case "START":
                    v = new E(y).decimalFloatingPoint("TIME-OFFSET");
                    isNaN(v) || (l.startTimeOffset = v);
                    break;
                  case "MAP":
                    var b = new E(y);
                    (p.relurl = b.URI),
                      (p.rawByteRange = b.BYTERANGE),
                      (p.baseurl = t),
                      (p.level = i),
                      (p.type = r),
                      (p.sn = "initSegment"),
                      (l.initSegment = p),
                      (p = new x());
                    break;
                  case "PART-INF":
                    b = new E(y);
                    l.partTarget = b.decimalFloatingPoint("PART-TARGET");
                    break;
                  default:
                    console.log("line parsed but not handled: " + n);
                }
              }
            }
            return (
              (p = d) && !p.relurl && (l.fragments.pop(), (s -= p.duration)),
              (l.totalduration = s),
              (l.averagetargetduration = s / l.fragments.length),
              (l.endSN = a - 1),
              l
            );
          }),
          e)),
          (t.exports = n);
      },
      { "../io": 35, "./URLToolkit": 32, "./attrlist": 33 },
    ],
    35: [
      function (e, s, t) {
        var h = e("./url");
        (s.exports.get = function (e, t, i, r, n) {
          s.exports.ajax("GET", e, {}, t, i, r, n);
        }),
          (s.exports.post = function (e, t, i, r, n, o) {
            var a = {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
              Accept: "application/json",
            };
            s.exports.ajax("POST", e, t, i, r, n, o, a);
          }),
          (s.exports.postWithHeader = function (e, t, i, r, n) {
            s.exports.ajax("POST", e, t, r, n, !0, !1, i);
          }),
          (s.exports.ajax = function (e, t, i, r, n, o, a, s) {
            var l, u, c, d;
            (n = n || function () {}),
              "undefined" == typeof XMLHttpRequest &&
                (window.XMLHttpRequest = function () {
                  try {
                    return new window.ActiveXObject("Msxml2.XMLHTTP.6.0");
                  } catch (e) {}
                  try {
                    return new window.ActiveXObject("Msxml2.XMLHTTP.3.0");
                  } catch (e) {}
                  try {
                    return new window.ActiveXObject("Msxml2.XMLHTTP");
                  } catch (e) {}
                  throw new Error(
                    "This browser does not support XMLHttpRequest."
                  );
                }),
              (u = new XMLHttpRequest()),
              (c = h.parseUrl(t)),
              (d = window.location),
              !(c.protocol + c.host !== d.protocol + d.host) ||
              !window.XDomainRequest ||
              "withCredentials" in u
                ? ((l = "file:" == c.protocol || "file:" == d.protocol),
                  (u.onreadystatechange = function () {
                    4 === u.readyState &&
                      (200 === u.status || (l && 0 === u.status) ? r : n)(
                        u.responseText
                      );
                  }))
                : (((u = new window.XDomainRequest()).onload = function () {
                    r(u.responseText);
                  }),
                  (u.onerror = n),
                  (u.onprogress = function () {}),
                  (u.ontimeout = n));
            try {
              if (
                (void 0 === o && (o = !0),
                u.open(e, t, o),
                a && (u.withCredentials = !0),
                s)
              )
                for (var p in s)
                  s.hasOwnProperty(p) && u.setRequestHeader(p, s[p]);
            } catch (e) {
              return void n(e);
            }
            try {
              u.send(i);
            } catch (e) {
              n(e);
            }
          }),
          (s.exports.jsonp = function (e, t, i) {
            var r = "jsonp_callback_" + Math.round(1e5 * Math.random()),
              n = document.createElement("script");
            e &&
              ((n.src =
                e +
                (0 <= e.indexOf("?") ? "&" : "?") +
                "callback=" +
                r +
                "&cb=" +
                r),
              (n.onerror = function () {
                delete window[r], document.body.removeChild(n), i();
              }),
              (n.onload = function () {
                setTimeout(function () {
                  window[r] && (delete window[r], document.body.removeChild(n));
                }, 0);
              }),
              (window[r] = function (e) {
                delete window[r], document.body.removeChild(n), t(e);
              }),
              document.body.appendChild(n));
          }),
          (s.exports.loadJS = function (e, t) {
            var i = document.getElementsByTagName("HEAD").item(0),
              r = document.createElement("script");
            e &&
              e.toLowerCase().indexOf("https://") < 0 &&
              e.toLowerCase().indexOf("http://") < 0 &&
              (e = document.URL.replace(/(\/[^\/]*?)$/i, "") + e),
              (r.type = "text/javascript"),
              (r.src = e),
              (r.onload = function () {
                t && t();
              }),
              i.appendChild(r);
          });
      },
      { "./url": 43 },
    ],
    36: [
      function (e, t, i) {
        var a = e("./dom");
        t.exports.render = function (e, t) {
          var i = t.align || (t.className ? "" : "tl"),
            r = t.x || 0,
            n = t.y || 0,
            o = r.indexOf && 0 < r.indexOf("%") ? "" : "px",
            t = n.indexOf && 0 < n.indexOf("%") ? "" : "px";
          "tl" === i
            ? a.css(e, {
                float: "left",
                "margin-left": r + o,
                "margin-top": n + t,
              })
            : "tr" === i
            ? a.css(e, {
                float: "right",
                "margin-right": r + o,
                "margin-top": n + t,
              })
            : "tlabs" === i
            ? a.css(e, { position: "absolute", left: r + o, top: n + t })
            : "trabs" === i
            ? a.css(e, { position: "absolute", right: r + o, top: n + t })
            : "blabs" === i
            ? a.css(e, { position: "absolute", left: r + o, bottom: n + t })
            : "brabs" === i
            ? a.css(e, { position: "absolute", right: r + o, bottom: n + t })
            : "cc" === i && a.addClass(e, "loading-center");
        };
      },
      { "./dom": 28 },
    ],
    37: [
      function (e, a, t) {
        var s = Object.prototype.hasOwnProperty;
        (a.exports.create =
          Object.create ||
          function (e) {
            function t() {}
            return (t.prototype = e), new t();
          }),
          (a.exports.isArray = function (e) {
            return "[object Array]" === Object.prototype.toString.call(arg);
          }),
          (a.exports.isEmpty = function (e) {
            for (var t in e) if (null !== e[t]) return !1;
            return !0;
          }),
          (a.exports.each = function (e, t, i) {
            if (a.exports.isArray(e))
              for (
                var r = 0, n = e.length;
                r < n && !1 !== t.call(i || this, e[r], r);
                ++r
              );
            else
              for (var o in e)
                if (s.call(e, o) && !1 === t.call(i || this, o, e[o])) break;
            return e;
          }),
          (a.exports.merge = function (e, t) {
            if (!t) return e;
            for (var i in t) s.call(t, i) && (e[i] = t[i]);
            return e;
          }),
          (a.exports.deepMerge = function (e, t) {
            var i, r, n;
            for (i in ((e = a.exports.copy(e)), t))
              s.call(t, i) &&
                ((r = e[i]),
                (n = t[i]),
                a.exports.isPlain(r) && a.exports.isPlain(n)
                  ? (e[i] = a.exports.deepMerge(r, n))
                  : (e[i] = t[i]));
            return e;
          }),
          (a.exports.copy = function (e) {
            return a.exports.merge({}, e);
          }),
          (a.exports.isPlain = function (e) {
            return (
              !!e &&
              "object" == typeof e &&
              "[object Object]" === e.toString() &&
              e.constructor === Object
            );
          }),
          (a.exports.isArray =
            Array.isArray ||
            function (e) {
              return "[object Array]" === Object.prototype.toString.call(e);
            }),
          (a.exports.unescape = function (e) {
            return e.replace(/&([^;]+);/g, function (e, t) {
              return (
                {
                  amp: "&",
                  lt: "<",
                  gt: ">",
                  quot: '"',
                  "#x27": "'",
                  "#x60": "`",
                }[t.toLowerCase()] || e
              );
            });
          });
      },
      {},
    ],
    38: [
      function (e, t, i) {
        var n = e("./object"),
          o = function () {};
        ((o = function () {}).extend = function (e) {
          var t,
            i,
            r =
              (e = e || {}).init ||
              e.init ||
              this.prototype.init ||
              this.prototype.init ||
              function () {};
          for (i in (((((t = function () {
            r.apply(this, arguments);
          }).prototype = n.create(this.prototype)).constructor = t).extend =
            o.extend),
          (t.create = o.create),
          e))
            e.hasOwnProperty(i) && (t.prototype[i] = e[i]);
          return t;
        }),
          (o.create = function () {
            var e = n.create(this.prototype);
            return this.apply(e, arguments), e;
          }),
          (t.exports = o);
      },
      { "./object": 37 },
    ],
    39: [
      function (e, f, t) {
        var _ = e("./object"),
          i = e("../config"),
          r = e("./dom"),
          n = e("./cookie"),
          o = e("./constants"),
          a = e("../lang/index"),
          s = e("./ua"),
          y = e("../player/base/plugin/defaultemptycomponent"),
          g = {
            preload: !0,
            autoplay: !0,
            useNativeControls: !1,
            width: "100%",
            height: "300px",
            cover: "",
            from: "",
            trackLog: !0,
            logBatched: !0,
            isLive: !1,
            playsinline: !0,
            showBarTime: 5e3,
            rePlay: !1,
            liveRetry: 5,
            liveRetryInterval: 1,
            liveRetryStep: 0,
            keyShortCuts: !1,
            keyFastForwardStep: 10,
            isVBR: !1,
            vodRetry: 3,
            format: "",
            definition: "",
            defaultDefinition: "",
            loadDataTimeout: 20,
            waitingTimeout: 60,
            waitingBufferedTime: 3,
            delayLoadingShow: 1,
            controlBarForOver: !1,
            controlBarVisibility: "hover",
            enableSystemMenu: !1,
            qualitySort: "asc",
            x5_video_position: "normal",
            x5_type: "",
            x5_fullscreen: !1,
            x5_orientation: "landscape|portrait",
            x5LandscapeAsFullScreen: !0,
            autoPlayDelay: 0,
            autoPlayDelayDisplayText: "",
            useHlsPluginForSafari: !1,
            enableMSEForAndroid: !0,
            encryptType: 0,
            language: "zh-cn",
            languageTexts: {},
            mediaType: "video",
            outputType: "",
            playConfig: {},
            reAuthInfo: {},
            components: [],
            liveTimeShiftUrl: "",
            liveShiftSource: "",
            liveShiftTime: "",
            liveShiftMinOffset: 30,
            videoHeight: "100%",
            videoWidth: "100%",
            enableWorker: !0,
            authTimeout: "",
            enableMockFullscreen: !1,
            region: "cn-shanghai",
            debug: !1,
            progressMarkers: [],
            snapshotWatermark: {
              left: "500",
              top: "100",
              text: "",
              font: "16px \u5b8b\u4f53",
              fillColor: "#FFFFFF",
              strokeColor: "#FFFFFF",
            },
            liveStartTime: "",
            liveOverTime: "",
            enableStashBufferForFlv: !0,
            stashInitialSizeForFlv: 32,
            flvOption: { accurateSeek: !0 },
            hlsOption: { stopLoadAsPaused: !1 },
            hlsLoadingTimeOut: 2e4,
            useHlsPlugOnMobile: !0,
            lowLatencyMode: !1,
            useHls2: void 0,
            skipRtsSupportCheck: !1,
            nudgeMaxRetry: 5,
            tracks: [],
            recreatePlayer: function () {},
            diagnosisButtonVisible: !0,
            _native: !0,
            hlsUriToken: "",
            thumbnailUrl: "",
            refreshAccessInfo: function () {},
            skinRes:
              "//" +
              i.domain +
              "/de/prismplayer-flash/" +
              i.flashVersion +
              "/atlas/defaultSkin",
          };
        (f.exports.defaultH5Layout = [
          { name: "bigPlayButton", align: "blabs", x: 30, y: 80 },
          { name: "H5Loading", align: "cc" },
          { name: "errorDisplay", align: "tlabs", x: 0, y: 0 },
          { name: "infoDisplay" },
          { name: "tooltip", align: "blabs", x: 0, y: 50 },
          { name: "thumbnail" },
          {
            name: "controlBar",
            align: "blabs",
            x: 0,
            y: 0,
            children: [
              { name: "progress", align: "blabs", x: 0, y: 44 },
              { name: "playButton", align: "tl", x: 15, y: 12 },
              { name: "timeDisplay", align: "tl", x: 10, y: 5 },
              { name: "fullScreenButton", align: "tr", x: 10, y: 12 },
              { name: "subtitle", align: "tr", x: 15, y: 12 },
              { name: "setting", align: "tr", x: 15, y: 12 },
              { name: "volume", align: "tr", x: 5, y: 10 },
            ],
          },
        ]),
          (f.exports.defaultAudioLayout = [
            {
              name: "controlBar",
              align: "blabs",
              x: 0,
              y: 0,
              children: [
                { name: "progress", align: "blabs", x: 0, y: 44 },
                { name: "playButton", align: "tl", x: 15, y: 12 },
                { name: "timeDisplay", align: "tl", x: 10, y: 5 },
                { name: "volume", align: "tr", x: 5, y: 10 },
              ],
            },
          ]),
          (f.exports.defaultFlashLayout = [
            { name: "bigPlayButton", align: "blabs", x: 30, y: 80 },
            {
              name: "controlBar",
              align: "blabs",
              x: 0,
              y: 0,
              children: [
                { name: "progress", align: "tlabs", x: 0, y: 0 },
                { name: "playButton", align: "tl", x: 15, y: 26 },
                { name: "nextButton", align: "tl", x: 10, y: 26 },
                { name: "timeDisplay", align: "tl", x: 10, y: 24 },
                { name: "fullScreenButton", align: "tr", x: 10, y: 25 },
                { name: "streamButton", align: "tr", x: 10, y: 23 },
                { name: "volume", align: "tr", x: 10, y: 25 },
              ],
            },
            {
              name: "fullControlBar",
              align: "tlabs",
              x: 0,
              y: 0,
              children: [
                { name: "fullTitle", align: "tl", x: 25, y: 6 },
                { name: "fullNormalScreenButton", align: "tr", x: 24, y: 13 },
                { name: "fullTimeDisplay", align: "tr", x: 10, y: 12 },
                { name: "fullZoom", align: "cc" },
              ],
            },
          ]),
          (f.exports.canPlayType = function (e) {
            var t = document.createElement("video");
            return t.canPlayType ? t.canPlayType(e) : "";
          }),
          (f.exports.canPlayHls = function () {
            return "" != f.exports.canPlayType("application/x-mpegURL");
          }),
          (f.exports.isUsedHlsPluginOnMobile = function (e) {
            return !!(
              s.IS_MOBILE &&
              (s.IS_CHROME || s.IS_FIREFOX || s.IS_X5) &&
              f.exports.isSupportHls()
            );
          }),
          (f.exports.isSafariUsedHlsPlugin = function (e) {
            return !!(s.os.pc && s.browser.safari && e);
          }),
          (f.exports.hasUIComponent = function (e, t) {
            if (void 0 === e || !e || 0 == e.length) return !1;
            for (var i = 0, r = e.length; i < r; i++) {
              var n = e[i].name;
              if (n == t) return !0;
              if ("controlBar" == n)
                return f.exports.hasUIComponent(e[i].children, t);
            }
            return !1;
          }),
          (f.exports.validateSource = function (e) {
            return !0;
          }),
          (f.exports.supportH5Video = function () {
            return void 0 !== document.createElement("video").canPlayType;
          }),
          (f.exports.createWrapper = function (e) {
            var t = e.id,
              t =
                "string" == typeof t
                  ? (0 === t.indexOf("#") && (t = t.slice(1)), r.el(t))
                  : t;
            if (!t || !t.nodeName)
              throw new TypeError(
                "\u6ca1\u6709\u4e3a\u64ad\u653e\u5668\u6307\u5b9a\u5bb9\u5668"
              );
            return f.exports.adjustContainerLayout(t, e), t;
          }),
          (f.exports.adjustContainerLayout = function (e, t) {
            t.width && !e.style.width && (e.style.width = t.width),
              t.height && !e.style.height && (e.style.height = t.height);
          }),
          (f.exports.isSupportHls = function () {
            var e = (window.MediaSource =
                window.MediaSource || window.WebKitMediaSource),
              t = (window.SourceBuffer =
                window.SourceBuffer || window.WebKitSourceBuffer),
              e =
                e &&
                "function" == typeof e.isTypeSupported &&
                e.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),
              t =
                !t ||
                (t.prototype &&
                  "function" == typeof t.prototype.appendBuffer &&
                  "function" == typeof t.prototype.remove);
            return e && t;
          }),
          (f.exports.isSupportFlv = function () {
            return f.exports.isSupportHls();
          }),
          (f.exports.isSupportMSE = function () {
            return (
              !!window.Promise &&
              !!window.Uint8Array &&
              !!Array.prototype.forEach &&
              f.exports.isSupportedMediaSource()
            );
          }),
          (f.exports.isSupportedMediaSource = function () {
            return !!window.MediaSource && !!MediaSource.isTypeSupported;
          }),
          (f.exports.isSupportedDrm = function () {
            return (
              !!(
                window.MediaKeys &&
                window.navigator &&
                window.navigator.requestMediaKeySystemAccess &&
                window.MediaKeySystemAccess &&
                window.MediaKeySystemAccess.prototype.getConfiguration
              ) && f.exports.isSupportMSE()
            );
          }),
          (f.exports.isAudio = function (e) {
            return e && 0 < e.toLowerCase().indexOf(".mp3");
          }),
          (f.exports.isLiveShift = function (e) {
            return e.isLive && e.liveStartTime && e.liveOverTime;
          }),
          (f.exports.isHls = function (e) {
            return e && 0 < e.toLowerCase().indexOf(".m3u8");
          }),
          (f.exports.isDash = function (e) {
            return e && 0 < e.toLowerCase().indexOf(".mpd");
          }),
          (f.exports.isFlv = function (e) {
            return e && 0 < e.toLowerCase().indexOf(".flv");
          }),
          (f.exports.isRTMP = function (e) {
            return e && -1 < e.toLowerCase().indexOf("rtmp:");
          }),
          (f.exports.isRts = function (e) {
            return e && -1 < e.toLowerCase().indexOf("artc:");
          }),
          (f.exports.checkSecuritSupport = function () {
            return f.exports.isSupportHls()
              ? ""
              : s.IS_IOS
              ? a.get("iOSNotSupportVodEncription")
              : a.get("UseChromeForVodEncription");
          }),
          (f.exports.findSelectedStreamLevel = function (e, t) {
            var i = t;
            if (!i && !(i = n.get(o.SelectedStreamLevel)))
              return n.set(o.SelectedStreamLevel, e[0].definition, 365), 0;
            for (var r = 0; r < e.length; r++)
              if (e[r].definition == i) return r;
            return 0;
          }),
          (f.exports.handleOption = function (e, t) {
            f.exports.isRts(e.source) && (e.isLive = !0);
            var i,
              r = _.merge(_.copy(g), e),
              n = [
                { name: "fullScreenButton", align: "tr", x: 20, y: 12 },
                { name: "subtitle", align: "tr", x: 15, y: 12 },
                { name: "setting", align: "tr", x: 15, y: 12 },
                { name: "volume", align: "tr", x: 5, y: 10 },
              ],
              o = !1;
            if (
              (e.useFlashPrism || f.exports.isRTMP(e.source)
                ? ((o = !0),
                  (n = [
                    { name: "liveIco", align: "tlabs", x: 15, y: 25 },
                    { name: "fullScreenButton", align: "tr", x: 10, y: 25 },
                    { name: "volume", align: "tr", x: 10, y: 25 },
                  ]))
                : (i = f.exports.isLiveShift(r))
                ? (n.push({
                    name: "liveShiftProgress",
                    align: "tlabs",
                    x: 0,
                    y: 0,
                  }),
                  n.push({ name: "playButton", align: "tl", x: 15, y: 12 }),
                  n.push({ name: "liveDisplay", align: "tl", x: 15, y: 6 }))
                : n.push({ name: "liveDisplay", align: "tlabs", x: 15, y: 6 }),
              e.isLive)
            )
              if (void 0 === e.skinLayout && f.exports.isRts(e.source))
                r.skinLayout = [
                  { name: "errorDisplay", align: "tlabs", x: 0, y: 0 },
                  { name: "infoDisplay" },
                  { name: "bigPlayButton", align: "blabs", x: 30, y: 80 },
                  { name: "tooltip", align: "blabs", x: 0, y: 56 },
                  { name: "H5Loading", align: "cc" },
                  {
                    name: "controlBar",
                    align: "blabs",
                    x: 0,
                    y: 0,
                    children: [
                      { name: "fullScreenButton", align: "tr", x: 20, y: 12 },
                      { name: "volume", align: "tr", x: 5, y: 10 },
                      { name: "liveDisplay", align: "tlabs", x: 15, y: 6 },
                    ],
                  },
                ];
              else if (void 0 === e.skinLayout)
                r.skinLayout = [
                  { name: "errorDisplay", align: "tlabs", x: 0, y: 0 },
                  { name: "infoDisplay" },
                  { name: "bigPlayButton", align: "blabs", x: 30, y: 80 },
                  { name: "tooltip", align: "blabs", x: 0, y: 56 },
                  { name: "H5Loading", align: "cc" },
                  {
                    name: "controlBar",
                    align: "blabs",
                    x: 0,
                    y: 0,
                    children: n,
                  },
                ];
              else if (0 != e.skinLayout) {
                for (
                  var a = e.skinLayout.length, s = [], l = -1, u = 0;
                  u < a;
                  u++
                )
                  if ("controlBar" == r.skinLayout[u].name) {
                    for (
                      var l = u, c = r.skinLayout[u].children.length, d = 0;
                      d < c;
                      d++
                    ) {
                      var p,
                        h = r.skinLayout[u].children[d].name;
                      ("liveDisplay" != h &&
                        "liveIco" != h &&
                        "fullScreenButton" != h &&
                        "volume" != h &&
                        "snapshot" != h &&
                        "setting" != h &&
                        "subtitle" != h &&
                        (!i ||
                          ("progress" != h &&
                            "playButton" != h &&
                            "timeDisplay" != h))) ||
                        ((p = r.skinLayout[u].children[d]),
                        "progress" == h
                          ? (p.name = "liveShiftProgress")
                          : "timeDisplay" == h
                          ? (p.name = "liveShiftTimeDisplay")
                          : o && "liveDisplay" == h && (p.name = "liveIco"),
                        s.push(p));
                    }
                    break;
                  }
                -1 != l && (r.skinLayout[l].children = s);
              }
            return (
              (void 0 === e.components ||
                !e.components ||
                (_.isArray(e.components) && 0 == e.components.length)) &&
                "false" != e.components &&
                (r.components = [y]),
              r
            );
          }),
          (f.exports.getLiveHostByRegion = function (e) {
            var t = "live.aliyuncs.com";
            if (!e) return t;
            return -1 < ["ap-southeast-1", "eu-central-1"].indexOf(e)
              ? "live." + e + ".aliyuncs.com"
              : t;
          });
      },
      {
        "../config": 13,
        "../lang/index": 20,
        "../player/base/plugin/defaultemptycomponent": 75,
        "./constants": 24,
        "./cookie": 25,
        "./dom": 28,
        "./object": 37,
        "./ua": 42,
      },
    ],
    40: [
      function (e, f, t) {
        var _ = e("./object"),
          i = e("../config"),
          r = e("./dom"),
          n = e("./cookie"),
          o = e("./constants"),
          a = e("../lang/index"),
          s = e("./ua"),
          y = e("../player/base/plugin/defaultemptycomponent"),
          g = {
            preload: !0,
            autoplay: !0,
            useNativeControls: !1,
            width: "100%",
            height: "300px",
            cover: "",
            from: "",
            trackLog: !0,
            logBatched: !0,
            isLive: !1,
            playsinline: !0,
            showBarTime: 5e3,
            rePlay: !1,
            liveRetry: 5,
            liveRetryInterval: 1,
            liveRetryStep: 0,
            keyShortCuts: !1,
            keyFastForwardStep: 10,
            isVBR: !1,
            vodRetry: 3,
            format: "",
            definition: "",
            defaultDefinition: "",
            loadDataTimeout: 20,
            waitingTimeout: 60,
            waitingBufferedTime: 3,
            delayLoadingShow: 1,
            controlBarForOver: !1,
            controlBarVisibility: "hover",
            enableSystemMenu: !1,
            qualitySort: "asc",
            x5_video_position: "normal",
            x5_type: "",
            x5_fullscreen: !1,
            x5_orientation: "landscape|portrait",
            x5LandscapeAsFullScreen: !0,
            autoPlayDelay: 0,
            autoPlayDelayDisplayText: "",
            useHlsPluginForSafari: !1,
            enableMSEForAndroid: !0,
            encryptType: 0,
            language: "zh-cn",
            languageTexts: {},
            mediaType: "video",
            outputType: "",
            playConfig: {},
            reAuthInfo: {},
            components: [],
            liveTimeShiftUrl: "",
            liveShiftSource: "",
            liveShiftTime: "",
            liveShiftMinOffset: 30,
            videoHeight: "100%",
            videoWidth: "100%",
            enableWorker: !0,
            authTimeout: "",
            enableMockFullscreen: !1,
            region: "cn-shanghai",
            debug: !1,
            progressMarkers: [],
            snapshotWatermark: {
              left: "500",
              top: "100",
              text: "",
              font: "16px \u5b8b\u4f53",
              fillColor: "#FFFFFF",
              strokeColor: "#FFFFFF",
            },
            liveStartTime: "",
            liveOverTime: "",
            enableStashBufferForFlv: !0,
            stashInitialSizeForFlv: 32,
            flvOption: { accurateSeek: !0 },
            hlsOption: { stopLoadAsPaused: !1 },
            hlsLoadingTimeOut: 2e4,
            useHlsPlugOnMobile: !0,
            lowLatencyMode: !1,
            useHls2: void 0,
            skipRtsSupportCheck: !1,
            nudgeMaxRetry: 5,
            tracks: [],
            recreatePlayer: function () {},
            diagnosisButtonVisible: !0,
            _native: !0,
            hlsUriToken: "",
            thumbnailUrl: "",
            refreshAccessInfo: function () {},
            skinRes:
              "//" +
              i.domain +
              "/de/prismplayer-flash/" +
              i.flashVersion +
              "/atlas/defaultSkin",
          };
        (f.exports.defaultH5Layout = [
          { name: "bigPlayButton", align: "blabs", x: 30, y: 80 },
          { name: "H5Loading", align: "cc" },
          { name: "errorDisplay", align: "tlabs", x: 0, y: 0 },
          { name: "infoDisplay" },
          { name: "tooltip", align: "blabs", x: 0, y: 50 },
          { name: "thumbnail" },
          {
            name: "controlBar",
            align: "blabs",
            x: 0,
            y: 0,
            children: [
              { name: "progress", align: "blabs", x: 0, y: 44 },
              { name: "playButton", align: "tl", x: 15, y: 12 },
              { name: "timeDisplay", align: "tl", x: 10, y: 5 },
              { name: "fullScreenButton", align: "tr", x: 10, y: 12 },
              { name: "subtitle", align: "tr", x: 15, y: 12 },
              { name: "setting", align: "tr", x: 15, y: 12 },
              { name: "volume", align: "tr", x: 5, y: 10 },
            ],
          },
        ]),
          (f.exports.defaultAudioLayout = [
            {
              name: "controlBar",
              align: "blabs",
              x: 0,
              y: 0,
              children: [
                { name: "progress", align: "blabs", x: 0, y: 44 },
                { name: "playButton", align: "tl", x: 15, y: 12 },
                { name: "timeDisplay", align: "tl", x: 10, y: 5 },
                { name: "volume", align: "tr", x: 5, y: 10 },
              ],
            },
          ]),
          (f.exports.defaultFlashLayout = [
            { name: "bigPlayButton", align: "blabs", x: 30, y: 80 },
            {
              name: "controlBar",
              align: "blabs",
              x: 0,
              y: 0,
              children: [
                { name: "progress", align: "tlabs", x: 0, y: 0 },
                { name: "playButton", align: "tl", x: 15, y: 26 },
                { name: "nextButton", align: "tl", x: 10, y: 26 },
                { name: "timeDisplay", align: "tl", x: 10, y: 24 },
                { name: "fullScreenButton", align: "tr", x: 10, y: 25 },
                { name: "streamButton", align: "tr", x: 10, y: 23 },
                { name: "volume", align: "tr", x: 10, y: 25 },
              ],
            },
            {
              name: "fullControlBar",
              align: "tlabs",
              x: 0,
              y: 0,
              children: [
                { name: "fullTitle", align: "tl", x: 25, y: 6 },
                { name: "fullNormalScreenButton", align: "tr", x: 24, y: 13 },
                { name: "fullTimeDisplay", align: "tr", x: 10, y: 12 },
                { name: "fullZoom", align: "cc" },
              ],
            },
          ]),
          (f.exports.canPlayType = function (e) {
            var t = document.createElement("video");
            return t.canPlayType ? t.canPlayType(e) : "";
          }),
          (f.exports.canPlayHls = function () {
            return "" != f.exports.canPlayType("application/x-mpegURL");
          }),
          (f.exports.isUsedHlsPluginOnMobile = function (e) {
            return !!(
              s.IS_MOBILE &&
              (s.IS_CHROME || s.IS_FIREFOX || s.IS_X5) &&
              f.exports.isSupportHls()
            );
          }),
          (f.exports.isSafariUsedHlsPlugin = function (e) {
            return !!(s.os.pc && s.browser.safari && e);
          }),
          (f.exports.hasUIComponent = function (e, t) {
            if (void 0 === e || !e || 0 == e.length) return !1;
            for (var i = 0, r = e.length; i < r; i++) {
              var n = e[i].name;
              if (n == t) return !0;
              if ("controlBar" == n)
                return f.exports.hasUIComponent(e[i].children, t);
            }
            return !1;
          }),
          (f.exports.validateSource = function (e) {
            return !0;
          }),
          (f.exports.supportH5Video = function () {
            return void 0 !== document.createElement("video").canPlayType;
          }),
          (f.exports.createWrapper = function (e) {
            var t = e.id,
              t =
                "string" == typeof t
                  ? (0 === t.indexOf("#") && (t = t.slice(1)), r.el(t))
                  : t;
            if (!t || !t.nodeName)
              throw new TypeError(
                "\u6ca1\u6709\u4e3a\u64ad\u653e\u5668\u6307\u5b9a\u5bb9\u5668"
              );
            return f.exports.adjustContainerLayout(t, e), t;
          }),
          (f.exports.adjustContainerLayout = function (e, t) {
            t.width && !e.style.width && (e.style.width = t.width),
              t.height && !e.style.height && (e.style.height = t.height);
          }),
          (f.exports.isSupportHls = function () {
            var e = (window.MediaSource =
                window.MediaSource || window.WebKitMediaSource),
              t = (window.SourceBuffer =
                window.SourceBuffer || window.WebKitSourceBuffer),
              e =
                e &&
                "function" == typeof e.isTypeSupported &&
                e.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),
              t =
                !t ||
                (t.prototype &&
                  "function" == typeof t.prototype.appendBuffer &&
                  "function" == typeof t.prototype.remove);
            return e && t;
          }),
          (f.exports.isSupportFlv = function () {
            return f.exports.isSupportHls();
          }),
          (f.exports.isSupportMSE = function () {
            return (
              !!window.Promise &&
              !!window.Uint8Array &&
              !!Array.prototype.forEach &&
              f.exports.isSupportedMediaSource()
            );
          }),
          (f.exports.isSupportedMediaSource = function () {
            return !!window.MediaSource && !!MediaSource.isTypeSupported;
          }),
          (f.exports.isSupportedDrm = function () {
            return (
              !!(
                window.MediaKeys &&
                window.navigator &&
                window.navigator.requestMediaKeySystemAccess &&
                window.MediaKeySystemAccess &&
                window.MediaKeySystemAccess.prototype.getConfiguration
              ) && f.exports.isSupportMSE()
            );
          }),
          (f.exports.isAudio = function (e) {
            return e && 0 < e.toLowerCase().indexOf(".mp3");
          }),
          (f.exports.isLiveShift = function (e) {
            return e.isLive && e.liveStartTime && e.liveOverTime;
          }),
          (f.exports.isHls = function (e) {
            return e && 0 < e.toLowerCase().indexOf(".m3u8");
          }),
          (f.exports.isDash = function (e) {
            return e && 0 < e.toLowerCase().indexOf(".mpd");
          }),
          (f.exports.isFlv = function (e) {
            return e && 0 < e.toLowerCase().indexOf(".flv");
          }),
          (f.exports.isRTMP = function (e) {
            return e && -1 < e.toLowerCase().indexOf("rtmp:");
          }),
          (f.exports.isRts = function (e) {
            return e && -1 < e.toLowerCase().indexOf("artc:");
          }),
          (f.exports.checkSecuritSupport = function () {
            return f.exports.isSupportHls()
              ? ""
              : s.IS_IOS
              ? a.get("iOSNotSupportVodEncription")
              : a.get("UseChromeForVodEncription");
          }),
          (f.exports.findSelectedStreamLevel = function (e, t) {
            var i = t;
            if (!i && !(i = n.get(o.SelectedStreamLevel)))
              return n.set(o.SelectedStreamLevel, e[0].definition, 365), 0;
            for (var r = 0; r < e.length; r++)
              if (e[r].definition == i) return r;
            return 0;
          }),
          (f.exports.handleOption = function (e, t) {
            f.exports.isRts(e.source) && (e.isLive = !0);
            var i,
              r = _.merge(_.copy(g), e),
              n = [
                { name: "fullScreenButton", align: "tr", x: 20, y: 12 },
                { name: "subtitle", align: "tr", x: 15, y: 12 },
                { name: "setting", align: "tr", x: 15, y: 12 },
                { name: "volume", align: "tr", x: 5, y: 10 },
              ],
              o = !1;
            if (
              (e.useFlashPrism || f.exports.isRTMP(e.source)
                ? ((o = !0),
                  (n = [
                    { name: "liveIco", align: "tlabs", x: 15, y: 25 },
                    { name: "fullScreenButton", align: "tr", x: 10, y: 25 },
                    { name: "volume", align: "tr", x: 10, y: 25 },
                  ]))
                : (i = f.exports.isLiveShift(r))
                ? (n.push({
                    name: "liveShiftProgress",
                    align: "tlabs",
                    x: 0,
                    y: 0,
                  }),
                  n.push({ name: "playButton", align: "tl", x: 15, y: 12 }),
                  n.push({ name: "liveDisplay", align: "tl", x: 15, y: 6 }))
                : n.push({ name: "liveDisplay", align: "tlabs", x: 15, y: 6 }),
              e.isLive)
            )
              if (void 0 === e.skinLayout && f.exports.isRts(e.source))
                r.skinLayout = [
                  { name: "errorDisplay", align: "tlabs", x: 0, y: 0 },
                  { name: "infoDisplay" },
                  { name: "bigPlayButton", align: "blabs", x: 30, y: 80 },
                  { name: "tooltip", align: "blabs", x: 0, y: 56 },
                  { name: "H5Loading", align: "cc" },
                  {
                    name: "controlBar",
                    align: "blabs",
                    x: 0,
                    y: 0,
                    children: [
                      { name: "fullScreenButton", align: "tr", x: 20, y: 12 },
                      { name: "volume", align: "tr", x: 5, y: 10 },
                      { name: "liveDisplay", align: "tlabs", x: 15, y: 6 },
                    ],
                  },
                ];
              else if (void 0 === e.skinLayout)
                r.skinLayout = [
                  { name: "errorDisplay", align: "tlabs", x: 0, y: 0 },
                  { name: "infoDisplay" },
                  { name: "bigPlayButton", align: "blabs", x: 30, y: 80 },
                  { name: "tooltip", align: "blabs", x: 0, y: 56 },
                  { name: "H5Loading", align: "cc" },
                  {
                    name: "controlBar",
                    align: "blabs",
                    x: 0,
                    y: 0,
                    children: n,
                  },
                ];
              else if (0 != e.skinLayout) {
                for (
                  var a = e.skinLayout.length, s = [], l = -1, u = 0;
                  u < a;
                  u++
                )
                  if ("controlBar" == r.skinLayout[u].name) {
                    for (
                      var l = u, c = r.skinLayout[u].children.length, d = 0;
                      d < c;
                      d++
                    ) {
                      var p,
                        h = r.skinLayout[u].children[d].name;
                      ("liveDisplay" != h &&
                        "liveIco" != h &&
                        "fullScreenButton" != h &&
                        "volume" != h &&
                        "snapshot" != h &&
                        "setting" != h &&
                        "subtitle" != h &&
                        (!i ||
                          ("progress" != h &&
                            "playButton" != h &&
                            "timeDisplay" != h))) ||
                        ((p = r.skinLayout[u].children[d]),
                        "progress" == h
                          ? (p.name = "liveShiftProgress")
                          : "timeDisplay" == h
                          ? (p.name = "liveShiftTimeDisplay")
                          : o && "liveDisplay" == h && (p.name = "liveIco"),
                        s.push(p));
                    }
                    break;
                  }
                -1 != l && (r.skinLayout[l].children = s);
              }
            return (
              (void 0 === e.components ||
                !e.components ||
                (_.isArray(e.components) && 0 == e.components.length)) &&
                "false" != e.components &&
                (r.components = [y]),
              r
            );
          }),
          (f.exports.getLiveHostByRegion = function (e) {
            var t = "live.aliyuncs.com";
            if (!e) return t;
            return -1 < ["ap-southeast-1", "eu-central-1"].indexOf(e)
              ? "live." + e + ".aliyuncs.com"
              : t;
          });
      },
      {
        "../config": 13,
        "../lang/index": 20,
        "../player/base/plugin/defaultemptycomponent": 75,
        "./constants": 24,
        "./cookie": 25,
        "./dom": 28,
        "./object": 37,
        "./ua": 42,
      },
    ],
    41: [
      function (e, t, i) {
        (t.exports.set = function (t, i) {
          try {
            window.localStorage && localStorage.setItem(t, i);
          } catch (e) {
            window[t + "_localStorage"] = i;
          }
        }),
          (t.exports.get = function (t) {
            try {
              if (window.localStorage) return localStorage.getItem(t);
            } catch (e) {
              return window[t + "_localStorage"];
            }
            return "";
          });
      },
      {},
    ],
    42: [
      function (e, w, t) {
        var i, r;
        if (
          ((w.exports.USER_AGENT = navigator.userAgent),
          (w.exports.IS_IPHONE = /iPhone/i.test(w.exports.USER_AGENT)),
          (w.exports.IS_IPAD = /iPad/i.test(w.exports.USER_AGENT)),
          (w.exports.IS_IPOD = /iPod/i.test(w.exports.USER_AGENT)),
          (w.exports.IS_MAC = /mac/i.test(w.exports.USER_AGENT)),
          (w.exports.IS_EDGE = /Edge/i.test(w.exports.USER_AGENT)),
          (w.exports.IS_IE11 = /Trident\/7.0/i.test(w.exports.USER_AGENT)),
          (w.exports.IS_X5 = /qqbrowser/i.test(
            w.exports.USER_AGENT.toLowerCase()
          )),
          (w.exports.IS_CHROME =
            /Chrome/i.test(w.exports.USER_AGENT) &&
            !w.exports.IS_EDGE &&
            !w.exports.IS_X5),
          (w.exports.IS_SAFARI =
            /Safari/i.test(w.exports.USER_AGENT) && !w.exports.IS_CHROME),
          (w.exports.IS_FIREFOX = /Firefox/i.test(w.exports.USER_AGENT)),
          (w.exports.IS_UC = /ucweb|UCBrowser/i.test(w.exports.USER_AGENT)),
          document.all)
        )
          try {
            var n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            w.exports.HAS_FLASH = !!n;
          } catch (e) {
            w.exports.HAS_FLASH = !1;
          }
        else
          navigator.plugins && 0 < navigator.plugins.length
            ? ((n = navigator.plugins["Shockwave Flash"]),
              (w.exports.HAS_FLASH = !!n))
            : (w.exports.HAS_FLASH = !1);
        (w.exports.IS_MAC_SAFARI =
          w.exports.IS_MAC &&
          w.exports.IS_SAFARI &&
          !w.exports.IS_CHROME &&
          !w.exports.HAS_FLASH),
          (w.exports.IS_IOS =
            w.exports.IS_IPHONE || w.exports.IS_IPAD || w.exports.IS_IPOD),
          (w.exports.IOS_VERSION = (function () {
            var e = w.exports.USER_AGENT.match(/OS (\d+)_/i);
            if (e && e[1]) return e[1];
          })()),
          (w.exports.IS_ANDROID = /Android/i.test(w.exports.USER_AGENT)),
          (w.exports.ANDROID_VERSION = (i = w.exports.USER_AGENT.match(
            /Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i
          ))
            ? ((r = i[1] && parseFloat(i[1])),
              (n = i[2] && parseFloat(i[2])),
              r && n ? parseFloat(i[1] + "." + i[2]) : r || null)
            : null),
          (w.exports.IS_OLD_ANDROID =
            w.exports.IS_ANDROID &&
            /webkit/i.test(w.exports.USER_AGENT) &&
            w.exports.ANDROID_VERSION < 2.3),
          (w.exports.TOUCH_ENABLED = !!(
            "ontouchstart" in window ||
            (window.DocumentTouch && document instanceof window.DocumentTouch)
          )),
          (w.exports.IS_MOBILE = w.exports.IS_IOS || w.exports.IS_ANDROID),
          (w.exports.IS_H5 = w.exports.IS_MOBILE || !w.exports.HAS_FLASH),
          (w.exports.IS_PC = !w.exports.IS_MOBILE),
          (w.exports.is_X5 =
            /micromessenger/i.test(w.exports.USER_AGENT) ||
            /qqbrowser/i.test(w.exports.USER_AGENT)),
          (w.exports.IS_ANDROID_FIREFOX =
            w.exports.IS_ANDROID && w.exports.IS_FIREFOX),
          (w.exports.CHROME_VERSION =
            w.exports.IS_CHROME &&
            w.exports.USER_AGENT.match(/Chrome\/(\d+)/i)[1]),
          (w.exports.getHost = function (e) {
            var t = "";
            if (void 0 === e || null == e || "" == e) return "";
            var i = e.indexOf("//"),
              r = e,
              t = (r = -1 < i ? e.substring(i + 2) : r),
              r = r.split("/");
            return (t =
              (r = (t = r && 0 < r.length ? r[0] : t).split(":")) &&
              0 < r.length
                ? r[0]
                : t);
          }),
          (w.exports.dingTalk = function () {
            var e = w.exports.USER_AGENT.toLowerCase();
            return /dingtalk/i.test(e);
          }),
          (w.exports.wechat = function () {
            var e = w.exports.USER_AGENT.toLowerCase();
            return /micromessenger/i.test(e);
          }),
          (w.exports.inIFrame = function () {
            return self != top;
          }),
          (w.exports.getReferer = function () {
            var t = document.referrer;
            if (w.exports.inIFrame())
              try {
                t = top.document.referrer;
              } catch (e) {
                t = document.referrer;
              }
            return t;
          }),
          (w.exports.getHref = function () {
            location.href;
            if (w.exports.inIFrame())
              try {
                top.location.href;
              } catch (e) {
                location.href;
              }
            return location.href;
          }),
          (r = w.exports),
          function (e, t) {
            var i = (this.os = {}),
              r = (this.browser = {}),
              n = e.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
              o = e.match(/(Android);?[\s\/]+([\d.]+)?/),
              a = !!e.match(/\(Macintosh\; Intel /),
              s = e.match(/(iPad).*OS\s([\d_]+)/),
              l = e.match(/(iPod)(.*OS\s([\d_]+))?/),
              u = !s && e.match(/(iPhone\sOS)\s([\d_]+)/),
              c = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
              d = /Win\d{2}|Windows/.test(t),
              p = e.match(/Windows Phone ([\d.]+)/),
              h = c && e.match(/TouchPad/),
              f = e.match(/Kindle\/([\d.]+)/),
              _ = e.match(/Silk\/([\d._]+)/),
              y = e.match(/(BlackBerry).*Version\/([\d.]+)/),
              g = e.match(/(BB10).*Version\/([\d.]+)/),
              v = e.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
              m = e.match(/PlayBook/),
              S = e.match(/Chrome\/([\d.]+)/) || e.match(/CriOS\/([\d.]+)/),
              b = e.match(/Firefox\/([\d.]+)/),
              T = e.match(
                /\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/
              ),
              x =
                e.match(/MSIE\s([\d.]+)/) ||
                e.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
              E = !S && e.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
              t =
                E ||
                e.match(
                  /Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/
                );
            (r.webkit = !!n) && (r.version = n[1]),
              o && ((i.android = !0), (i.version = o[2])),
              u &&
                !l &&
                ((i.ios = i.iphone = !0),
                (i.version = u[2].replace(/_/g, "."))),
              s &&
                ((i.ios = i.ipad = !0), (i.version = s[2].replace(/_/g, "."))),
              l &&
                ((i.ios = i.ipod = !0),
                (i.version = l[3] ? l[3].replace(/_/g, ".") : null)),
              p && ((i.wp = !0), (i.version = p[1])),
              c && ((i.webos = !0), (i.version = c[2])),
              h && (i.touchpad = !0),
              y && ((i.blackberry = !0), (i.version = y[2])),
              g && ((i.bb10 = !0), (i.version = g[2])),
              v && ((i.rimtabletos = !0), (i.version = v[2])),
              m && (r.playbook = !0),
              f && ((i.kindle = !0), (i.version = f[1])),
              _ && ((r.silk = !0), (r.version = _[1])),
              !_ && i.android && e.match(/Kindle Fire/) && (r.silk = !0),
              S && ((r.chrome = !0), (r.version = S[1])),
              b && ((r.firefox = !0), (r.version = b[1])),
              T && ((i.firefoxos = !0), (i.version = T[1])),
              x && ((r.ie = !0), (r.version = x[1])),
              t &&
                (a || i.ios || d || o) &&
                ((r.safari = !0), i.ios || (r.version = t[1])),
              E && (r.webview = !0),
              !a ||
                ((E = e.match(/[\d]*_[\d]*_[\d]*/)) &&
                  0 < E.length &&
                  E[0] &&
                  (i.version = E[0].replace(/_/g, "."))),
              (i.tablet = !!(
                s ||
                m ||
                (o && !e.match(/Mobile/)) ||
                (b && e.match(/Tablet/)) ||
                (x && !e.match(/Phone/) && e.match(/Touch/))
              )),
              (i.phone = !(
                i.tablet ||
                i.ipod ||
                !(
                  o ||
                  u ||
                  c ||
                  y ||
                  g ||
                  (S && e.match(/Android/)) ||
                  (S && e.match(/CriOS\/([\d.]+)/)) ||
                  (b && e.match(/Mobile/)) ||
                  (x && e.match(/Touch/))
                )
              )),
              (i.pc = !i.tablet && !i.phone),
              a
                ? (i.name = "macOS")
                : d
                ? ((i.name = "windows"),
                  (i.version = (function () {
                    var e = navigator.userAgent,
                      t = "";
                    (-1 < e.indexOf("Windows NT 5.0") ||
                      -1 < e.indexOf("Windows 2000")) &&
                      (t = "2000");
                    (-1 < e.indexOf("Windows NT 5.1") ||
                      -1 < e.indexOf("Windows XP")) &&
                      (t = "XP");
                    (-1 < e.indexOf("Windows NT 5.2") ||
                      -1 < e.indexOf("Windows 2003")) &&
                      (t = "2003");
                    (-1 < e.indexOf("Windows NT 6.0") ||
                      -1 < e.indexOf("Windows Vista")) &&
                      (t = "Vista");
                    (-1 < e.indexOf("Windows NT 6.1") ||
                      -1 < e.indexOf("Windows 7")) &&
                      (t = "7");
                    (-1 < e.indexOf("Windows NT 6.2") ||
                      -1 < e.indexOf("Windows 8")) &&
                      (t = "8");
                    (-1 < e.indexOf("Windows NT 6.3") ||
                      -1 < e.indexOf("Windows 8.1")) &&
                      (t = "8.1");
                    (-1 < e.indexOf("Windows NT 10") ||
                      -1 < e.indexOf("Windows 10")) &&
                      (t = "10");
                    return t;
                  })()))
                : (i.name = (function () {
                    var e = navigator.userAgent,
                      t = "other",
                      i = w.exports.os;
                    if (i.ios) return "iOS";
                    if (i.android) return "android";
                    if (-1 < e.indexOf("Baiduspider")) return "Baiduspider";
                    if (-1 < e.indexOf("PlayStation")) return "PS4";
                    (i =
                      "Win32" == navigator.platform ||
                      "Windows" == navigator.platform ||
                      -1 < e.indexOf("Windows")),
                      (e =
                        "Mac68K" == navigator.platform ||
                        "MacPPC" == navigator.platform ||
                        "Macintosh" == navigator.platform ||
                        "MacIntel" == navigator.platform);
                    e && (t = "macOS");
                    "X11" != navigator.platform || i || e || (t = "Unix");
                    -1 < String(navigator.platform).indexOf("Linux") &&
                      (t = "Linux");
                    if (i) return "windows";
                    return t;
                  })()),
              (r.name =
                ((i = navigator.userAgent.toLowerCase()),
                (r = w.exports.browser).firefox
                  ? "Firefox"
                  : r.ie
                  ? /edge/.test(i)
                    ? "Edge"
                    : "IE"
                  : /micromessenger/.test(i)
                  ? "\u5fae\u4fe1\u5185\u7f6e\u6d4f\u89c8\u5668"
                  : /qqbrowser/.test(i)
                  ? "QQ\u6d4f\u89c8\u5668"
                  : r.webview
                  ? "webview"
                  : r.chrome
                  ? "Chrome"
                  : r.safari
                  ? "Safari"
                  : /baiduspider/.test(i)
                  ? "Baiduspider"
                  : /ucweb/.test(i) || /UCBrowser/.test(i)
                  ? "UC"
                  : /opera/.test(i)
                  ? "Opera"
                  : /ucweb/.test(i)
                  ? "UC"
                  : /360se/.test(i)
                  ? "360\u6d4f\u89c8\u5668"
                  : /bidubrowser/.test(i)
                  ? "\u767e\u5ea6\u6d4f\u89c8\u5668"
                  : /metasr/.test(i)
                  ? "\u641c\u72d7\u6d4f\u89c8\u5668"
                  : /lbbrowser/.test(i)
                  ? "\u730e\u8c79\u6d4f\u89c8\u5668"
                  : /playstation/.test(i)
                  ? "PS4\u6d4f\u89c8\u5668"
                  : void 0));
          }.call(r, navigator.userAgent, navigator.platform);
      },
      {},
    ],
    43: [
      function (e, t, i) {
        var s = e("./dom");
        (t.exports.getAbsoluteURL = function (e) {
          return (e = !e.match(/^https?:\/\//)
            ? s.createEl("div", { innerHTML: '<a href="' + e + '">x</a>' })
                .firstChild.href
            : e);
        }),
          (t.exports.parseUrl = function (e) {
            var t,
              i = [
                "protocol",
                "hostname",
                "port",
                "pathname",
                "search",
                "hash",
                "host",
              ],
              r = s.createEl("a", { href: e }),
              n = "" === r.host && "file:" !== r.protocol;
            n &&
              (((t = s.createEl("div")).innerHTML = '<a href="' + e + '"></a>'),
              (r = t.firstChild),
              t.setAttribute("style", "display:none; position:absolute;"),
              document.body.appendChild(t));
            for (var o = {}, a = 0; a < i.length; a++) o[i[a]] = r[i[a]];
            return (
              (o.segments = r.pathname.replace(/^\//, "").split("/")),
              n && document.body.removeChild(t),
              o
            );
          });
      },
      { "./dom": 28 },
    ],
    44: [
      function (e, i, t) {
        var r = e("./dom"),
          n = e("./ua"),
          o = e("./playerutil");
        (i.exports.formatTime = function (e) {
          var t = Math.floor(e),
            i = Math.floor(t / 3600);
          return (
            (t %= 3600),
            (e = Math.floor(t / 60)),
            (t = t % 60),
            !(
              i === 1 / 0 ||
              isNaN(i) ||
              e === 1 / 0 ||
              isNaN(e) ||
              t === 1 / 0 ||
              isNaN(t)
            ) &&
              ("00" === (i = 10 <= i ? i : "0" + i) ? "" : i + ":") +
                (e = 10 <= e ? e : "0" + e) +
                ":" +
                (t = 10 <= t ? t : "0" + t)
          );
        }),
          (i.exports.extractTime = function (e) {
            if (e) {
              var t = parseInt(e.getHours()),
                i = parseInt(e.getMinutes()),
                e = parseInt(e.getSeconds());
              return (
                ("00" === (t = 10 <= t ? t : "0" + t) ? "" : t + ":") +
                (i = 10 <= i ? i : "0" + i) +
                ":" +
                (e = 10 <= e ? e : "0" + e)
              );
            }
            return "";
          }),
          (i.exports.convertToTimestamp = function (e, t) {
            var i = "";
            return (
              e && (t ? (i = e.gettime()) : ((i = Date.parse(e)), (i /= 1e3))),
              i
            );
          }),
          (i.exports.convertToDate = function (e, t) {
            var i = "";
            return e && (i = new Date()).setTime(1e3 * e), i;
          }),
          (i.exports.parseTime = function (e) {
            if (!e) return "00:00:00";
            var t = e.split(":"),
              i = 0,
              r = 0,
              e = 0;
            return (
              3 === t.length
                ? ((i = t[0]), (r = t[1]), (e = t[2]))
                : 2 === t.length
                ? ((r = t[0]), (e = t[1]))
                : 1 === t.length && (e = t[0]),
              3600 * (i = parseInt(i, 10)) +
                60 * (r = parseInt(r, 10)) +
                (e = Math.ceil(parseFloat(e)))
            );
          }),
          (i.exports.formatDate = function (e, t) {
            var i,
              r = {
                "M+": e.getMonth() + 1,
                "d+": e.getDate(),
                "H+": e.getHours(),
                "m+": e.getMinutes(),
                "s+": e.getSeconds(),
                "q+": Math.floor((e.getMonth() + 3) / 3),
                S: e.getMilliseconds(),
              };
            for (i in (/(y+)/.test(t) &&
              (t = t.replace(
                RegExp.$1,
                (e.getFullYear() + "").substr(4 - RegExp.$1.length)
              )),
            r))
              new RegExp("(" + i + ")").test(t) &&
                (t = t.replace(
                  RegExp.$1,
                  1 == RegExp.$1.length
                    ? r[i]
                    : ("00" + r[i]).substr(("" + r[i]).length)
                ));
            return t;
          }),
          (i.exports.sleep = function (e) {
            for (var t = Date.now(); Date.now() - t <= e; );
          }),
          (i.exports.htmlEncodeAll = function (e) {
            return null == e
              ? ""
              : e
                  .replace(/\</g, "&lt;")
                  .replace(/\>/g, "&gt;")
                  .replace(/\&/g, "&amp;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&apos;");
          }),
          (i.exports.toBinary = function (e) {
            if (!window.atob) return "";
            for (
              var t = atob(e), i = t.length, r = new Uint8Array(i), n = 0;
              n < i;
              n++
            )
              r[n] = t.charCodeAt(n);
            return r;
          }),
          (i.exports.readyBinary = function (e) {
            for (
              var t = new Uint8Array(e), i = t.length, r = "", n = 0;
              n < i;
              n++
            )
              r += t[n];
            return r;
          }),
          (i.exports.delayHide = function (e, t) {
            e &&
              (void 0 === t && (t = 1e3),
              e.delayHanlder && clearTimeout(e.delayHanlder),
              (e.delayHanlder = setTimeout(function () {
                r.css(e, "display", "none");
              }, t)));
          }),
          (i.exports.openInFile = function () {
            return -1 != window.location.protocol.toLowerCase().indexOf("file");
          }),
          (i.exports.contentProtocolMixed = function (e) {
            return !!(
              n.os.pc &&
              ((o.isHls(e) && !n.browser.safari) || o.isFlv(e)) &&
              "https:" == window.location.protocol.toLowerCase() &&
              e &&
              -1 < e.toLowerCase().indexOf("http://")
            );
          }),
          (i.exports.queryString = function (e) {
            var t, i, r;
            return 2 !== (e = (e = decodeURIComponent(e)).split("?")).length
              ? {}
              : ((e = e[1]),
                (t = e.split("&"))
                  ? ((i = {}),
                    (r = 0),
                    $(t).each(function () {
                      var e = t[r].split("=");
                      2 === e.length && (i[e[0]] = e[1].replace(/\+/g, " ")),
                        r++;
                    }),
                    i)
                  : {});
          }),
          (i.exports.log = function (e) {
            var t = window.location.href,
              t = i.exports.queryString(t);
            t && 1 == t.debug && console.log(e);
          });
      },
      { "./dom": 28, "./playerutil": 40, "./ua": 42 },
    ],
    45: [
      function (e, t, i) {
        function a(e) {
          for (var t = 5381, i = e.length; i; )
            t = (33 * t) ^ e.charCodeAt(--i);
          return (t >>> 0).toString();
        }
        var s = e("./vttparse"),
          e = {
            parse: function (e, t, i) {
              var r,
                e = e
                  .trim()
                  .replace(/\r\n|\n\r|\n|\r/g, "\n")
                  .split("\n"),
                n = [],
                o = new s();
              (o.oncue = function (e) {
                (e.id = a(e.startTime) + a(e.endTime) + a(e.text)),
                  (e.text = decodeURIComponent(escape(e.text))),
                  (e.isBig = !1);
                var t = e.text.split("#xywh=");
                2 == t.length &&
                  ((t = t[1].split(",")),
                  (e.x = t[0]),
                  (e.y = t[1]),
                  (e.w = t[2]),
                  (e.h = t[3]),
                  (e.isBig = !0)),
                  0 < e.endTime && n.push(e);
              }),
                (o.onparsingerror = function (e) {
                  r = e;
                }),
                (o.onflush = function () {
                  if (r && i) return i(r), void console.log(r);
                  t(n);
                }),
                e.forEach(function (e) {
                  o.parse(e + "\n");
                }),
                o.flush();
            },
          };
        t.exports = e;
      },
      { "./vttparse": 47 },
    ],
    46: [
      function (e, t, i) {
        t.exports = (function () {
          if ("undefined" != typeof window && window.VTTCue)
            return window.VTTCue;
          var S = { "": !0, lr: !0, rl: !0 },
            t = { start: !0, middle: !0, end: !0, left: !0, right: !0 };
          function b(e) {
            return (
              "string" == typeof e && !!t[e.toLowerCase()] && e.toLowerCase()
            );
          }
          function T(e) {
            for (var t = 1; t < arguments.length; t++) {
              var i,
                r = arguments[t];
              for (i in r) e[i] = r[i];
            }
            return e;
          }
          function e(e, t, i) {
            var r = this,
              n = (function () {
                if ("undefined" != typeof navigator)
                  return /MSIE\s8\.0/.test(navigator.userAgent);
              })(),
              o = {};
            n ? (r = document.createElement("custom")) : (o.enumerable = !0),
              (r.hasBeenReset = !1);
            var a = "",
              s = !1,
              l = e,
              u = t,
              c = i,
              d = null,
              p = "",
              h = !0,
              f = "auto",
              _ = "start",
              y = 50,
              g = "middle",
              v = 50,
              m = "middle";
            if (
              (Object.defineProperty(
                r,
                "id",
                T({}, o, {
                  get: function () {
                    return a;
                  },
                  set: function (e) {
                    a = "" + e;
                  },
                })
              ),
              Object.defineProperty(
                r,
                "pauseOnExit",
                T({}, o, {
                  get: function () {
                    return s;
                  },
                  set: function (e) {
                    s = !!e;
                  },
                })
              ),
              Object.defineProperty(
                r,
                "startTime",
                T({}, o, {
                  get: function () {
                    return l;
                  },
                  set: function (e) {
                    if ("number" != typeof e)
                      throw new TypeError(
                        "Start time must be set to a number."
                      );
                    (l = e), (this.hasBeenReset = !0);
                  },
                })
              ),
              Object.defineProperty(
                r,
                "endTime",
                T({}, o, {
                  get: function () {
                    return u;
                  },
                  set: function (e) {
                    if ("number" != typeof e)
                      throw new TypeError("End time must be set to a number.");
                    (u = e), (this.hasBeenReset = !0);
                  },
                })
              ),
              Object.defineProperty(
                r,
                "text",
                T({}, o, {
                  get: function () {
                    return c;
                  },
                  set: function (e) {
                    (c = "" + e), (this.hasBeenReset = !0);
                  },
                })
              ),
              Object.defineProperty(
                r,
                "region",
                T({}, o, {
                  get: function () {
                    return d;
                  },
                  set: function (e) {
                    (d = e), (this.hasBeenReset = !0);
                  },
                })
              ),
              Object.defineProperty(
                r,
                "vertical",
                T({}, o, {
                  get: function () {
                    return p;
                  },
                  set: function (e) {
                    e =
                      "string" == typeof (e = e) &&
                      !!S[e.toLowerCase()] &&
                      e.toLowerCase();
                    if (!1 === e)
                      throw new SyntaxError(
                        "An invalid or illegal string was specified."
                      );
                    (p = e), (this.hasBeenReset = !0);
                  },
                })
              ),
              Object.defineProperty(
                r,
                "snapToLines",
                T({}, o, {
                  get: function () {
                    return h;
                  },
                  set: function (e) {
                    (h = !!e), (this.hasBeenReset = !0);
                  },
                })
              ),
              Object.defineProperty(
                r,
                "line",
                T({}, o, {
                  get: function () {
                    return f;
                  },
                  set: function (e) {
                    if ("number" != typeof e && "auto" !== e)
                      throw new SyntaxError(
                        "An invalid number or illegal string was specified."
                      );
                    (f = e), (this.hasBeenReset = !0);
                  },
                })
              ),
              Object.defineProperty(
                r,
                "lineAlign",
                T({}, o, {
                  get: function () {
                    return _;
                  },
                  set: function (e) {
                    e = b(e);
                    if (!e)
                      throw new SyntaxError(
                        "An invalid or illegal string was specified."
                      );
                    (_ = e), (this.hasBeenReset = !0);
                  },
                })
              ),
              Object.defineProperty(
                r,
                "position",
                T({}, o, {
                  get: function () {
                    return y;
                  },
                  set: function (e) {
                    if (e < 0 || 100 < e)
                      throw new Error("Position must be between 0 and 100.");
                    (y = e), (this.hasBeenReset = !0);
                  },
                })
              ),
              Object.defineProperty(
                r,
                "positionAlign",
                T({}, o, {
                  get: function () {
                    return g;
                  },
                  set: function (e) {
                    e = b(e);
                    if (!e)
                      throw new SyntaxError(
                        "An invalid or illegal string was specified."
                      );
                    (g = e), (this.hasBeenReset = !0);
                  },
                })
              ),
              Object.defineProperty(
                r,
                "size",
                T({}, o, {
                  get: function () {
                    return v;
                  },
                  set: function (e) {
                    if (e < 0 || 100 < e)
                      throw new Error("Size must be between 0 and 100.");
                    (v = e), (this.hasBeenReset = !0);
                  },
                })
              ),
              Object.defineProperty(
                r,
                "align",
                T({}, o, {
                  get: function () {
                    return m;
                  },
                  set: function (e) {
                    e = b(e);
                    if (!e)
                      throw new SyntaxError(
                        "An invalid or illegal string was specified."
                      );
                    (m = e), (this.hasBeenReset = !0);
                  },
                })
              ),
              (r.displayState = void 0),
              n)
            )
              return r;
          }
          return (
            (e.prototype.getCueAsHTML = function () {
              return window.WebVTT.convertCueToDOMTree(window, this.text);
            }),
            e
          );
        })();
      },
      {},
    ],
    47: [
      function (e, t, i) {
        function r() {
          return {
            decode: function (e) {
              if (!e) return "";
              if ("string" != typeof e)
                throw new Error("Error - expected string data.");
              return decodeURIComponent(encodeURIComponent(e));
            },
          };
        }
        var s = e("./vttcue");
        function n() {
          (this.window = window),
            (this.state = "INITIAL"),
            (this.buffer = ""),
            (this.decoder = new r()),
            (this.regionList = []);
        }
        function u() {
          this.values = Object.create(null);
        }
        function c(e, t, i, r) {
          var n,
            o,
            a = r ? e.split(r) : [e];
          for (n in a)
            "string" == typeof a[n] &&
              2 === (o = a[n].split(i)).length &&
              t(o[0], o[1]);
        }
        u.prototype = {
          set: function (e, t) {
            this.get(e) || "" === t || (this.values[e] = t);
          },
          get: function (e, t, i) {
            return i
              ? this.has(e)
                ? this.values[e]
                : t[i]
              : this.has(e)
              ? this.values[e]
              : t;
          },
          has: function (e) {
            return e in this.values;
          },
          alt: function (e, t, i) {
            for (var r = 0; r < i.length; ++r)
              if (t === i[r]) {
                this.set(e, t);
                break;
              }
          },
          integer: function (e, t) {
            /^-?\d+$/.test(t) && this.set(e, parseInt(t, 10));
          },
          percent: function (e, t) {
            return (
              !!(
                t.match(/^([\d]{1,3})(\.[\d]*)?%$/) &&
                0 <= (t = parseFloat(t)) &&
                t <= 100
              ) && (this.set(e, t), !0)
            );
          },
        };
        var d = new s(0, 0, 0),
          p = "middle" === d.align ? "middle" : "center";
        function l(r, e, o) {
          var t,
            i,
            a,
            n = r;
          function s() {
            var e,
              t,
              e = (t = (e = r).match(/^(\d+):(\d{2})(:\d{2})?(\.\d{3})?/))
                ? ((e = (e = t[4]) && e.replace(".", "")),
                  t[3]
                    ? i(t[1], t[2], t[3].replace(":", ""), e)
                    : 59 < t[1]
                    ? i(t[1], t[2], 0, e)
                    : i(0, t[1], t[2], e))
                : null;
            function i(e, t, i, r) {
              return 3600 * (0 | e) + 60 * (0 | t) + (0 | i) + (0 | r) / 1e3;
            }
            if (null === e) throw new Error("Malformed timestamp: " + n);
            return (r = r.replace(/^[^\sa-zA-Z-]+/, "")), e;
          }
          function l() {
            r = r.replace(/^\s+/, "");
          }
          if ((l(), (e.startTime = s()), l(), "--\x3e" !== r.substr(0, 3)))
            throw new Error(
              "Malformed time stamp (time stamps must be separated by '--\x3e'): " +
                n
            );
          (r = r.substr(3)),
            l(),
            (e.endTime = s()),
            l(),
            (t = r),
            (i = e),
            (a = new u()),
            c(
              t,
              function (e, t) {
                switch (e) {
                  case "region":
                    for (var i = o.length - 1; 0 <= i; i--)
                      if (o[i].id === t) {
                        a.set(e, o[i].region);
                        break;
                      }
                    break;
                  case "vertical":
                    a.alt(e, t, ["rl", "lr"]);
                    break;
                  case "line":
                    var r = t.split(","),
                      n = r[0];
                    a.integer(e, n),
                      a.percent(e, n) && a.set("snapToLines", !1),
                      a.alt(e, n, ["auto"]),
                      2 === r.length &&
                        a.alt("lineAlign", r[1], ["start", p, "end"]);
                    break;
                  case "position":
                    (r = t.split(",")),
                      a.percent(e, r[0]),
                      2 === r.length &&
                        a.alt("positionAlign", r[1], [
                          "start",
                          p,
                          "end",
                          "line-left",
                          "line-right",
                          "auto",
                        ]);
                    break;
                  case "size":
                    a.percent(e, t);
                    break;
                  case "align":
                    a.alt(e, t, ["start", p, "end", "left", "right"]);
                }
              },
              /:/,
              /\s/
            ),
            (i.region = a.get("region", null)),
            (i.vertical = a.get("vertical", "")),
            "auto" === (t = a.get("line", "auto")) && -1 === d.line && (t = -1),
            (i.line = t),
            (i.lineAlign = a.get("lineAlign", "start")),
            (i.snapToLines = a.get("snapToLines", !0)),
            (i.size = a.get("size", 100)),
            (i.align = a.get("align", p)),
            "auto" === (t = a.get("position", "auto")) &&
              50 === d.position &&
              (t =
                "start" === i.align || "left" === i.align
                  ? 0
                  : "end" === i.align || "right" === i.align
                  ? 100
                  : 50),
            (i.position = t);
        }
        (n.prototype = {
          parse: function (e) {
            var r = this;
            function t() {
              for (
                var e = 0, t = (t = r.buffer).replace(/<br(?: \/)?>/gi, "\n");
                e < t.length && "\r" !== t[e] && "\n" !== t[e];

              )
                ++e;
              var i = t.substr(0, e);
              return (
                "\r" === t[e] && ++e,
                "\n" === t[e] && ++e,
                (r.buffer = t.substr(e)),
                i
              );
            }
            e && (r.buffer += r.decoder.decode(e, { stream: !0 }));
            try {
              if ("INITIAL" === r.state) {
                if (!/\r\n|\n/.test(r.buffer)) return this;
                var i,
                  n = (i = t()).match(/^WEBVTT([ \t].*)?$/);
                if (!n || !n[0]) throw new Error("Malformed WebVTT signature.");
                r.state = "HEADER";
              }
              for (var o = !1; r.buffer; ) {
                if (!/\r\n|\n/.test(r.buffer)) return this;
                switch ((o ? (o = !1) : (i = t()), r.state)) {
                  case "HEADER":
                    /:/.test(i)
                      ? c(
                          i,
                          function (e, t) {
                            "Region" === e && console.log("parse region", t);
                          },
                          /:/
                        )
                      : i || (r.state = "ID");
                    continue;
                  case "NOTE":
                    i || (r.state = "ID");
                    continue;
                  case "ID":
                    if (/^NOTE($|[ \t])/.test(i)) {
                      r.state = "NOTE";
                      break;
                    }
                    if (!i) continue;
                    if (
                      ((r.cue = new s(0, 0, "")),
                      (r.state = "CUE"),
                      -1 === i.indexOf("--\x3e"))
                    ) {
                      r.cue.id = i;
                      continue;
                    }
                  case "CUE":
                    try {
                      l(i, r.cue, r.regionList);
                    } catch (e) {
                      (r.cue = null), (r.state = "BADCUE");
                      continue;
                    }
                    r.state = "CUETEXT";
                    continue;
                  case "CUETEXT":
                    var a = -1 !== i.indexOf("--\x3e");
                    if (!i || (a && (o = !0))) {
                      r.oncue && r.oncue(r.cue),
                        (r.cue = null),
                        (r.state = "ID");
                      continue;
                    }
                    r.cue.text && (r.cue.text += "\n"), (r.cue.text += i);
                    continue;
                  case "BADCUE":
                    i || (r.state = "ID");
                    continue;
                }
              }
            } catch (e) {
              "CUETEXT" === r.state && r.cue && r.oncue && r.oncue(r.cue),
                (r.cue = null),
                (r.state = "INITIAL" === r.state ? "BADWEBVTT" : "BADCUE");
            }
            return this;
          },
          flush: function () {
            var e = this;
            try {
              if (
                ((e.buffer += e.decoder.decode()),
                (!e.cue && "HEADER" !== e.state) ||
                  ((e.buffer += "\n\n"), e.parse()),
                "INITIAL" === e.state)
              )
                throw new Error("Malformed WebVTT signature.");
            } catch (e) {
              throw e;
            }
            return e.onflush && e.onflush(), this;
          },
        }),
          (t.exports = n);
      },
      { "./vttcue": 46 },
    ],
    48: [
      function (e, t, i) {
        var n = e("../lib/io");
        e("../lib/storage");
        function r(e) {
          (this._uploadDuration = e.logDuration || 5),
            (this._uploadCount = e.logCount || 10),
            (this._logReportTo = e.logReportTo),
            (this._logs = []),
            (this._retry = 0),
            (this._disposed = !1),
            (this._supportLocalStorage = !0);
          var t,
            i = this;
          window &&
            (window.onbeforeunload = function (e) {
              0 < i._logs.length &&
                (i._supportLocalStorage
                  ? localStorage.setItem(
                      "__aliplayer_log_data",
                      JSON.stringify(i._logs)
                    )
                  : (i._report(),
                    (function (e) {
                      for (var t = new Date().getTime(), i = t; i < t + e; )
                        i = new Date().getTime();
                    })(500)));
            });
          try {
            localStorage
              ? ((t = localStorage.getItem("__aliplayer_log_data")),
                localStorage.removeItem("__aliplayer_log_data"),
                t && (this._logs = JSON.parse(t)))
              : (this._supportLocalStorage = !1);
          } catch (e) {
            this._supportLocalStorage = !1;
          }
          this._start();
        }
        (r.prototype.add = function (e) {
          var t = this._logs.length;
          if (
            ((e.__time__ = Math.round(new Date() / 1e3)),
            0 < t && "4001" == e.e)
          ) {
            t = this._logs[t - 1];
            if ("4001" == t.e && t.__time__ - e.__time__ < 5) return;
          }
          this._logs.push(e),
            (this._logs.length > this._uploadCount ||
              "4001" == e.e ||
              "2002" == e.e) &&
              this._report();
        }),
          (r.prototype.dispose = function () {
            this._report(), (this._disposed = !0);
          }),
          (r.prototype._start = function () {
            this._disposed = !1;
            (this._retry = 0), this._report();
          }),
          (r.prototype._report = function (t) {
            var e, i, r;
            this._tickHandler &&
              (clearTimeout(this._tickHandler), (this._tickHandler = null)),
              0 < (t = t || this._logs.splice(0, this._uploadCount)).length
                ? ((r = {
                    "Content-Type": "application/json;charset=UTF-8",
                    "x-log-apiversion": "0.6.0",
                    "x-log-bodyrawsize": (e = JSON.stringify({
                      __logs__: t,
                      __source__: "",
                    })).length,
                  }),
                  n.postWithHeader(
                    (i = this)._logReportTo,
                    e,
                    r,
                    function (e) {
                      i._tick();
                    },
                    function (e) {
                      0 == i._retry
                        ? ((i._retry = 1), i._report(t))
                        : i._tick();
                    }
                  ))
                : this._tick();
          }),
          (r.prototype._tick = function () {
            var e;
            this._disposed ||
              ((this._retry = 0),
              (e = this)._logs.length > this._uploadCount
                ? e._report()
                : (this._tickHandler = setTimeout(function () {
                    e._report();
                  }, 1e3 * this._uploadDuration)));
          }),
          (t.exports = r);
      },
      { "../lib/io": 35, "../lib/storage": 41 },
    ],
    49: [
      function (e, t, i) {
        var r = e("../lib/oo"),
          a = e("../lib/object"),
          h = e("../lib/data"),
          s = e("../lib/io"),
          f = e("../lib/ua"),
          _ = e("../config"),
          o = e("../player/base/event/eventtype"),
          y = e("./util"),
          g = e("./log"),
          l = 0,
          u = {
            STARTFETCHDATA: 1003,
            COMPLETEFETCHDATA: 1004,
            PREPARE: 1101,
            PREPAREEND: 1102,
            STARTPLAY: 2e3,
            PLAY: 2001,
            STOP: 2002,
            PAUSE: 2003,
            SEEK: 2004,
            FULLSREEM: 2005,
            QUITFULLSCREEM: 2006,
            RESOLUTION: 2007,
            RESOLUTION_DONE: 2008,
            RECOVER: 2010,
            SEEK_END: 2011,
            FETCHEDIP: 2020,
            CDNDETECT: 2021,
            DETECT: 2022,
            UNDERLOAD: 3002,
            LOADED: 3001,
            RETRY: 3003,
            HEARTBEAT: 9001,
            ERROR: 4001,
            ERRORRETRY: 4002,
            SNAPSHOT: 2027,
            ROTATE: 2028,
            IMAGE: 2029,
            THUMBNAILSTART: 2031,
            THUMBNAILCOMPLETE: 2032,
            CCSTART: 2033,
            CCCOMPLETE: 2034,
            AUDIOTRACKSTART: 2033,
            AUDIOTRACKCOMPLETE: 2034,
          },
          r = r.extend({
            init: function (e, t, i) {
              (this.trackLog = i = void 0 === i ? !0 : i),
                (this.player = e),
                (this.requestId = ""),
                (this.sessionId = h.guid()),
                (this.playId = 0),
                (this.firstPlay = !0),
                (this.osName = f.os.name),
                (this.osVersion = f.os.version || ""),
                (this.exName = f.browser.name),
                (this.exVersion = f.browser.version || ""),
                (this._logService = ""),
                t.logBatched && (this._logService = new g(_));
              var r = this.player.getOptions(),
                n = t.from || "",
                o = (r.isLive, r.isLive ? "live" : "vod"),
                a = "pc";
              f.IS_IPAD ? (a = "pad") : f.os.phone && (a = "phone");
              var s = this.encodeURL(f.getReferer()),
                l = f.getHref(),
                u = this.encodeURL(l),
                c = "";
              l && (c = f.getHost(l));
              var d = _.h5Version,
                p = y.getUuid(),
                i = r.source ? this.encodeURL(r.source) : "",
                e = f.getHost(r.source),
                t = r.userId ? r.userId + "" : "0",
                l = this.sessionId,
                r = new Date().getTime();
              this._userNetInfo = { cdnIp: "", localIp: "" };
              (this.opt = {
                APIVersion: "0.6.0",
                t: r,
                ll: "info",
                lv: "1.0",
                pd: "player",
                md: "saas_player",
                ui: "saas_player",
                sm: "play",
                os: this.osName,
                ov: this.osVersion,
                et: this.exName,
                ev: this.exVersion,
                uat: f.USER_AGENT,
                hn: "0.0.0.0",
                bi: n,
                ri: l,
                e: "0",
                args: "0",
                vt: o,
                tt: a,
                dm: "h5",
                av: d,
                uuid: p,
                vu: i,
                vd: e,
                ua: t,
                dn: "custom",
                cdn_ip: "0.0.0.0",
                app_n: c,
                r: s,
                pu: u,
              }),
                this.bindEvent();
            },
            updateVideoInfo: function (e) {
              e = e.from || "";
              (this.opt.bi = e + ""), this.updateSourceInfo();
            },
            updateSourceInfo: function () {
              var e,
                t = this.player.getOptions();
              t &&
                ((e = t.source ? this.encodeURL(t.source) : ""),
                (t = f.getHost(t.source)),
                (this.opt.vu = e),
                (this.opt.vd = t));
            },
            replay: function () {
              this.reset(),
                this.player.trigger(o.Video.LoadStart),
                this.player.trigger(o.Video.LoadedMetadata),
                this.player.trigger(o.Video.LoadedData);
            },
            bindEvent: function () {
              var n = this;
              this.player.on(o.Player.Init, function () {
                n._onPlayerInit();
              }),
                this.player.on(o.Video.LoadStart, function () {
                  n._onPlayerloadstart();
                }),
                this.player.on(o.Video.LoadedMetadata, function () {
                  n._onPlayerLoadMetadata();
                }),
                this.player.on(o.Video.LoadedData, function () {
                  n._onPlayerLoaddata();
                }),
                this.player.on(o.Video.Play, function () {
                  n._onPlayerPlay();
                }),
                this.player.on(o.Video.Playing, function () {
                  n._onPlayerReady();
                }),
                this.player.on(o.Video.Ended, function () {
                  n._onPlayerFinish();
                }),
                this.player.on(o.Video.Pause, function () {
                  n._onPlayerPause();
                }),
                this.player.on(o.Private.SeekStart, function (e) {
                  n._onPlayerSeekStart(e);
                }),
                this.player.on(o.Private.EndStart, function (e) {
                  n._seekEndData = e.paramData;
                }),
                this.player.on(o.Player.Waiting, function () {
                  n._waitingDelayLoadingShowHandle &&
                    (clearTimeout(n._waitingDelayLoadingShowHandle),
                    (n._waitingDelayLoadingShowHandle = null)),
                    (n._waitingDelayLoadingShowHandle = setTimeout(function () {
                      n._onPlayerLoaded();
                    }, 1e3 * n.player._options.delayLoadingShow));
                }),
                this.player.on(o.Video.CanPlayThrough, function () {}),
                this.player.on(o.Video.CanPlay, function () {
                  n._waitingDelayLoadingShowHandle &&
                    (clearTimeout(n._waitingDelayLoadingShowHandle),
                    (n._waitingDelayLoadingShowHandle = null)),
                    n._onPlayerUnderload(),
                    n._onPlayerCanplay();
                }),
                this.player.on(o.Video.TimeUpdate, function () {
                  n._waitingDelayLoadingShowHandle &&
                    (clearTimeout(n._waitingDelayLoadingShowHandle),
                    (n._waitingDelayLoadingShowHandle = null)),
                    n._seekEndData && n.player._seeking && n._onPlayerSeekEnd();
                }),
                this.player.on(o.Player.Error, function () {
                  n._onPlayerError();
                }),
                this.player.on(o.Player.RequestFullScreen, function () {
                  n._onFullscreenChange(1);
                }),
                this.player.on(o.Player.CancelFullScreen, function () {
                  n._onFullscreenChange(0);
                }),
                this.player.on(o.Private.PREPARE, function (e) {
                  (n._prepareTime = new Date().getTime()),
                    n._log("PREPARE", { dn: e.paramData });
                }),
                this.player.on(o.Player.Snapshoted, function () {
                  n._log("SNAPSHOT");
                }),
                this.player.on(o.Private.Retry, function (e) {
                  e = e.paramData || {};
                  n._log("RETRY", { type: e.type, source: e.source });
                }),
                setInterval(function () {
                  var e, t, i, r;
                  n.player.getCurrentTime() &&
                    ((e = Math.floor(1e3 * n.player.getCurrentTime())),
                    n.player.paused() ||
                      (30 <= ++l &&
                        ((t = n._imageInfo() || {}),
                        (i = n.player.tag.playbackRate),
                        (r = n.player.getVolume()),
                        n._log("HEARTBEAT", {
                          vt: e,
                          interval: 1e3 * l,
                          imgLength: t.imgLength,
                          playbackRate: i,
                          volume: r,
                        }),
                        (l = 0))));
                }, 1e3);
            },
            removeEvent: function () {
              this.player.off("init"),
                this.player.off("ready"),
                this.player.off("ended"),
                this.player.off("play"),
                this.player.off("pause"),
                this.player.off("seekStart"),
                this.player.off("seekEnd"),
                this.player.off("canplaythrough"),
                this.player.off("playing"),
                this.player.off("timeupdate"),
                this.player.off("error"),
                this.player.off("fullscreenchange"),
                this.player.off(o.Private.PREPARE),
                this._logService && this._logService.dispose();
            },
            reset: function () {
              (this.startTimePlay = 0),
                (this.buffer_flag = 0),
                (this.firstPlay = !1),
                (this.playId = 0),
                (this.loadstarted = 0),
                (this._LoadedData = 0),
                (this._canPlay = 0);
            },
            encodeURL: function (e) {
              if (!e) return "";
              var t = this.player.getOptions();
              return t && !t.logBatched ? encodeURIComponent(e) : e;
            },
            _onFullscreenChange: function (e) {
              e ? this._log("FULLSREEM", {}) : this._log("QUITFULLSCREEM", {});
            },
            _onPlayerloadstart: function () {
              (this.loadstartTime = new Date().getTime()),
                (this.playId = h.guid()),
                !this.loadstarted &&
                  this.player._isPreload() &&
                  ((this.loadstarted = 1),
                  this._log("STARTPLAY", { vt: new Date().getTime() }));
            },
            _onPlayerLoadMetadata: function () {
              this.loadMetaDataCost = new Date().getTime() - this.loadstartTime;
            },
            _onPlayerLoaddata: function () {
              var e, t;
              this._LoadedData ||
                this.buffer_flag ||
                ((t = e = 0),
                this.player.tag &&
                  ((e = this.player.tag.videoWidth),
                  (t = this.player.tag.videoHeight)),
                this._log("PREPAREEND", {
                  tc: new Date().getTime() - this._prepareTime,
                  cc: new Date().getTime() - this.loadstartTime,
                  md: this.loadMetaDataCost,
                  mi: JSON.stringify({
                    type: "video",
                    definition: e + "*" + t,
                  }),
                })),
                (this._LoadedData = 1);
            },
            _onPlayerCanplay: function () {
              (this._canPlay = 1), this._reportPlay();
            },
            _onPlayerInit: function () {
              (this.buffer_flag = 0),
                (this.pause_flag = 0),
                (this.startTimePlay = 0),
                (this.loadstarted = 0),
                (this._LoadedData = 0),
                (this._canPlay = 0);
            },
            _onPlayerReady: function () {
              this.startTimePlay || (this.startTimePlay = new Date().getTime());
            },
            _onPlayerFinish: function () {
              this._log("STOP", {
                vt: Math.floor(1e3 * this.player.getCurrentTime()),
              }),
                this.reset();
            },
            _reportPlay: function () {
              return (
                !(
                  this.buffer_flag ||
                  !this._LoadedData ||
                  !this.playstartTime
                ) &&
                ((this.first_play_time = new Date().getTime()),
                this._log("PLAY", {
                  dsm: "fix",
                  tc: this.first_play_time - this.loadstartTime,
                  fc: this.first_play_time - this.playstartTime,
                }),
                (this.buffer_flag = 1),
                !0)
              );
            },
            _onPlayerPlay: function () {
              (this.playstartTime = new Date().getTime()),
                0 == this.playId && (this.playId = h.guid()),
                this.firstPlay ||
                  0 != this.pause_flag ||
                  this.player._seeking ||
                  (this.sessionId = h.guid()),
                this.player._isPreload() ||
                  (this._log("STARTPLAY", { vt: new Date().getTime() }),
                  (this.loadstartTime = new Date().getTime())),
                (this._canPlay && this._reportPlay()) ||
                  (this.buffer_flag &&
                    this.pause_flag &&
                    ((this.pause_flag = 0),
                    (this.pauseEndTime = new Date().getTime()),
                    this._log("RECOVER", {
                      vt: Math.floor(1e3 * this.player.getCurrentTime()),
                      cost: this.pauseEndTime - this.pauseTime,
                    })));
            },
            _onPlayerPause: function () {
              this.buffer_flag &&
                this.startTimePlay &&
                (this.player._seeking ||
                  ((this.pause_flag = 1),
                  (this.pauseTime = new Date().getTime()),
                  this._log("PAUSE", {
                    vt: Math.floor(1e3 * this.player.getCurrentTime()),
                  })));
            },
            _onPlayerSeekStart: function (e) {
              (this.seekStartTime = e.paramData.fromTime),
                (this.startTimePlay = 0),
                (this.seekStartStamp = new Date().getTime());
            },
            _onPlayerSeekEnd: function () {
              (this.seekEndStamp = new Date().getTime()),
                this._log("SEEK", {
                  drag_from_timestamp: Math.floor(1e3 * this.seekStartTime),
                  drag_to_timestamp: Math.floor(1e3 * this._seekEndData.toTime),
                }),
                this._log("SEEK_END", {
                  vt: Math.floor(1e3 * this.player.getCurrentTime()),
                  cost: this.seekEndStamp - this.seekStartStamp,
                }),
                (this._seekEndData = null);
            },
            _onPlayerLoaded: function () {
              var e;
              this.buffer_flag &&
                this.startTimePlay &&
                (this.stucking ||
                  this.player._seeking ||
                  ((this.stuckStartTime = new Date().getTime()),
                  this.stuckStartTime - this.startTimePlay <= 1e3 ||
                    ((this.stucking = !0),
                    (e = this._getbwEstimator()),
                    this._log("UNDERLOAD", {
                      vt: Math.floor(1e3 * this.player.getCurrentTime()),
                      bw: e,
                    }),
                    (this.stuckStartTime = new Date().getTime()))));
            },
            _onPlayerUnderload: function () {
              var e, t, i;
              (!this.buffer_flag &&
                this.player._options &&
                this.player._options.autoplay) ||
                (this.stucking &&
                  !this.player._seeking &&
                  ((e = Math.floor(1e3 * this.player.getCurrentTime())),
                  (i = this.stuckStartTime || new Date().getTime()),
                  0 < (t = Math.floor(new Date().getTime() - i)) &&
                    ((i = this._getbwEstimator()),
                    this._log("LOADED", { vt: e, cost: t, bw: i })),
                  (this.stucking = !1)));
            },
            _onPlayerHeartBeat: function () {
              var e, t;
              this.player._seeking ||
                ((e = Math.floor(1e3 * this.player.getCurrentTime())),
                (t = this).timer ||
                  (this.timer = setTimeout(function () {
                    this.player._seeking ||
                      t._log("HEARTBEAT", { progress: e }),
                      clearTimeout(t.timer),
                      (t.timer = null);
                  }, 6e4)));
            },
            _onPlayerError: function () {
              (this.playId = 0),
                (this._LoadedData = 1),
                this.buffer_flag || this._reportPlay();
            },
            _getbwEstimator: function () {
              var e = NaN;
              try {
                e =
                  this.player._getbwEstimator && this.player._getbwEstimator();
              } catch (e) {}
              return e;
            },
            _log: function (e, t) {
              if (this.trackLog) {
                this.updateSourceInfo();
                var i = a.copy(this.opt);
                this.requestId = h.guid();
                var r = _.logReportTo;
                (i.e = u[e] + ""),
                  (i.ri = this.sessionId),
                  (i.t = new Date().getTime() + ""),
                  (i.cdn_ip = this._userNetInfo.cdnIp),
                  (i.hn = this._userNetInfo.localIp);
                e = this.player.getCurrentQuality();
                "" != e && (i.definition = e.definition);
                var n = [];
                a.each(t, function (e, t) {
                  n.push(e + "=" + t);
                });
                var o,
                  e = "",
                  t = this.player.getOptions();
                t && t.vid && (e = t.vid), n.push("vid=" + e);
                try {
                  Aliplayer &&
                    Aliplayer.__logCallback__ &&
                    ((i.args = n), Aliplayer.__logCallback__(i));
                } catch (e) {
                  console.log(e);
                }
                return (
                  "" == (n = n.join("&")) && (n = "0"),
                  (i.args = this.encodeURL(n)),
                  this._logService
                    ? this._logService.add(i)
                    : ((o = []),
                      a.each(i, function (e, t) {
                        o.push(e + "=" + t);
                      }),
                      (o = o.join("&")),
                      s.jsonp(
                        r + "?" + o,
                        function () {},
                        function () {}
                      )),
                  this.sessionId
                );
              }
            },
            _imageInfo: function () {
              try {
                if (/MSIE\s8\.0/.test(navigator.userAgent)) return {};
                var e = this.player.tag;
                if (!e) return {};
                var t = document.createElement("canvas"),
                  i = e.videoWidth,
                  r = e.videoHeight;
                (t.width = i), (t.height = r);
                var n = t.getContext("2d");
                n.save(), n.drawImage(e, 0, 0, i, r), n.restore();
                var o = t.toDataURL("image/jpeg", 1),
                  a = "";
                return {
                  imgLength: (a = o
                    ? (a = o.substr(o.indexOf(",") + 1)) || ""
                    : a).length,
                };
              } catch (e) {
                return {};
              }
            },
          });
        t.exports = r;
      },
      {
        "../config": 13,
        "../lib/data": 26,
        "../lib/io": 35,
        "../lib/object": 37,
        "../lib/oo": 38,
        "../lib/ua": 42,
        "../player/base/event/eventtype": 54,
        "./log": 48,
        "./util": 50,
      },
    ],
    50: [
      function (e, t, i) {
        var r = e("../lib/cookie"),
          n = e("../lib/data"),
          o = e("../lib/ua");
        (t.exports.getUuid = function () {
          var e = r.get("p_h5_u");
          return e || ((e = n.guid()), r.set("p_h5_u", e, 730)), e;
        }),
          (t.exports.getTerminalType = function () {
            var e = "pc";
            return (
              o.IS_IPAD
                ? (e = "pad")
                : o.IS_ANDROID
                ? (e = "android")
                : o.IS_IOS && (e = "iphone"),
              e
            );
          }),
          (t.exports.returnUTCDate = function (e) {
            var t = e.getUTCFullYear(),
              i = e.getUTCMonth(),
              r = e.getUTCDate(),
              n = e.getUTCHours(),
              o = e.getUTCMinutes(),
              a = e.getUTCSeconds(),
              e = e.getUTCMilliseconds();
            return Date.UTC(t, i, r, n, o, a, e);
          }),
          (t.exports.getRfc822 = function (e) {
            return e.toUTCString().replace("UTC", "GMT");
          });
      },
      { "../lib/cookie": 25, "../lib/data": 26, "../lib/ua": 42 },
    ],
    51: [
      function (e, t, i) {
        var o = e("./base/player"),
          a = e("./flash/flashplayer"),
          s = e("./saas/mtsplayer"),
          l = e("./saas/vodplayer"),
          u = e("./audio/audioplayer"),
          c = e("./hls/hlsplayer"),
          d = e("./flv/flvplayer"),
          p = e("./rts/rtsplayer"),
          h = e("./drm/drmplayer"),
          f = e("../lib/ua"),
          _ = e("../lib/playerutil"),
          y = (e("../lib/dom"), e("../lib/io"), e("../lang/index"));
        t.exports.create = function (e, t) {
          navigator &&
            navigator.userAgent &&
            -1 < navigator.userAgent.indexOf("Olympic_Android") &&
            (e.useNativeControls = !0),
            (e.readyCallback = t = "function" != typeof t ? function () {} : t),
            y.setCurrentLanguage(e.language, "h5", e.languageTexts);
          var i = _.handleOption(e),
            r = i.source,
            t = _.isAudio(r);
          t && (i.mediaType = "audio");
          var n,
            e = _.createWrapper(i);
          if (e.player) return e.player;
          if (t) n = new u(e, i);
          else if (_.isRts(r)) n = new p(e, i);
          else if (!i.useFlashPrism && _.isFlv(r) && _.isSupportFlv())
            n = new d(e, i);
          else if (f.IS_MOBILE || (!i.useFlashPrism && !_.isRTMP(r)))
            if (i.vid && !i.source)
              if (i.authInfo) n = new s(e, i);
              else {
                if (!(i.playauth || (i.accessKeyId && i.accessKeySecret))) {
                  t =
                    "vid=" +
                    i.vid +
                    " playauth='', playauth property is required by VOD(\u89c6\u9891\u70b9\u64ad) as new Aliplayer.";
                  throw new Error(t);
                }
                n = new l(e, i);
              }
            else
              _.isDash(r) && _.isSupportMSE()
                ? (n = new h(e, i))
                : _.isHls(r)
                ? _.canPlayHls()
                  ? (n = new (
                      _.isSupportHls() &&
                      (_.isUsedHlsPluginOnMobile() ||
                        _.isSafariUsedHlsPlugin(i.useHlsPluginForSafari))
                        ? i.isDrm
                          ? h
                          : c
                        : i.isDrm
                        ? h
                        : o
                    )(e, i))
                  : _.isSupportHls()
                  ? (n = new (i.isDrm ? h : c)(e, i))
                  : f.os.pc
                  ? i.userH5Prism || i.useH5Prism || (n = new a(e, i))
                  : (n = new o(e, i))
                : (n = (f.os.pc, new o(e, i)));
          else n = new a(e, i);
          return n;
        };
      },
      {
        "../lang/index": 20,
        "../lib/dom": 28,
        "../lib/io": 35,
        "../lib/playerutil": 40,
        "../lib/ua": 42,
        "./audio/audioplayer": 52,
        "./base/player": 74,
        "./drm/drmplayer": 81,
        "./flash/flashplayer": 82,
        "./flv/flvplayer": 84,
        "./hls/hlsplayer": 86,
        "./rts/rtsplayer": 88,
        "./saas/mtsplayer": 92,
        "./saas/vodplayer": 98,
      },
    ],
    52: [
      function (e, t, i) {
        var r = e("../base/player"),
          n = e("../../ui/component"),
          o = e("../../lib/dom"),
          a = e("../../lib/object"),
          s = e("../../lib/playerutil"),
          e = r.extend({
            init: function (e, t) {
              (this._isAudio = !0),
                void 0 === t.skinLayout &&
                  (t.skinLayout = s.defaultAudioLayout),
                r.call(this, e, t);
            },
          });
        (e.prototype.createEl = function () {
          "AUDIO" !== this.tag.tagName &&
            ((this._el = this.tag),
            (this.tag = n.prototype.createEl.call(this, "audio")));
          var t = this._el,
            e = this.tag;
          e.player = this;
          var i = o.getElementAttributes(e);
          return (
            a.each(i, function (e) {
              t.setAttribute(e, i[e]);
            }),
            this.setVideoAttrs(),
            e.parentNode && e.parentNode.insertBefore(t, e),
            o.insertFirst(e, t),
            t
          );
        }),
          (t.exports = e);
      },
      {
        "../../lib/dom": 28,
        "../../lib/object": 37,
        "../../lib/playerutil": 40,
        "../../ui/component": 109,
        "../base/player": 74,
      },
    ],
    53: [
      function (e, t, i) {
        var a = e("../../../lib/event"),
          s = e("./eventtype"),
          r = e("../eventHandler/video/index"),
          n = e("../eventHandler/player/index");
        (t.exports.offAll = function (e) {
          var t,
            i,
            r,
            n = e.tag,
            o = e._el;
          for (t in s.Video) a.off(n, s.Video[t]);
          for (i in s.Player) a.off(o, s.Player[i]);
          for (r in s.Private) a.off(o, s.Private[r]);
        }),
          (t.exports.onAll = function (e) {
            r.bind(e), n.bind(e);
          });
      },
      {
        "../../../lib/event": 29,
        "../eventHandler/player/index": 58,
        "../eventHandler/video/index": 68,
        "./eventtype": 54,
      },
    ],
    54: [
      function (e, t, i) {
        t.exports = {
          Video: {
            TimeUpdate: "timeupdate",
            Play: "play",
            Playing: "playing",
            Pause: "pause",
            CanPlay: "canplay",
            Waiting: "waiting",
            Ended: "ended",
            Error: "error",
            Suspend: "suspend",
            Stalled: "stalled",
            LoadStart: "loadstart",
            DurationChange: "durationchange",
            LoadedData: "loadeddata",
            LoadedMetadata: "loadedmetadata",
            Progress: "progress",
            CanPlayThrough: "canplaythrough",
            ContextMenu: "contextmenu",
            Seeking: "seeking",
            Seeked: "seeked",
            ManualEnded: "manualended",
          },
          Player: {
            TimeUpdate: "timeupdate",
            DurationChange: "durationchange",
            Init: "init",
            Ready: "ready",
            Play: "play",
            Pause: "pause",
            CanPlay: "canplay",
            Waiting: "waiting",
            Ended: "ended",
            Error: "error",
            RequestFullScreen: "requestFullScreen",
            CancelFullScreen: "cancelFullScreen",
            Snapshoted: "snapshoted",
            Snapshoting: "snapshoting",
            OnM3u8Retry: "onM3u8Retry",
            LiveStreamStop: "liveStreamStop",
            AutoPlayPrevented: "autoPlayPrevented",
            AutoPlay: "autoplay",
            StartSeek: "startSeek",
            CompleteSeek: "completeSeek",
            TextTrackReady: "textTrackReady",
            AudioTrackReady: "audioTrackReady",
            AudioTrackUpdated: "audioTrackUpdated",
            LevelsLoaded: "levelsLoaded",
            AudioTrackSwitch: "audioTrackSwitch",
            AudioTrackSwitched: "audioTrackSwitched",
            LevelSwitch: "levelSwitch",
            LevelSwitched: "levelSwitched",
            MarkerDotOver: "markerDotOver",
            MarkerDotOut: "markerDotOut",
            DefaultBandWidth: "defaultbandwidth",
            ResolutionChange: "resolutionChange",
            SeiFrame: "seiFrame",
          },
          Private: {
            Play_Btn_Show: "play_btn_show",
            UiH5Ready: "uiH5Ready",
            Error_Hide: "error_hide",
            Error_Show: "error_show",
            Info_Show: "info_show",
            Info_Hide: "info_hide",
            H5_Loading_Show: "h5_loading_show",
            H5_Loading_Hide: "h5_loading_hide",
            HideProgress: "hideProgress",
            CancelHideProgress: "cancelHideProgress",
            UpdateProgress: "updateProgress",
            UpdateCursorPosition: "updateCursorPosition",
            Click: "click",
            MouseOver: "mouseover",
            MouseOut: "mouseout",
            MouseEnter: "mouseenter",
            MouseLeave: "mouseleave",
            TouchStart: "touchstart",
            TouchMove: "touchmove",
            TouchEnd: "touchend",
            HideBar: "hideBar",
            ShowBar: "showBar",
            ReadyState: "readyState",
            SourceLoaded: "sourceloaded",
            QualityChange: "qualitychange",
            Play_Btn_Hide: "play_btn_hide",
            Cover_Hide: "cover_hide",
            Cover_Show: "cover_show",
            SeekStart: "seekStart",
            EndStart: "endStart",
            UpdateProgressBar: "updateProgressBar",
            LifeCycleChanged: "lifeCycleChanged",
            Dispose: "dispose",
            Created: "created",
            Snapshot_Hide: "snapshot_hide",
            AutoStreamShow: "auto_stream_show",
            AutoStreamHide: "auto_stream_hide",
            VolumnChanged: "volumnchanged",
            LiveShiftQueryCompleted: "liveShiftQueryCompleted",
            LiveShiftSwitchToLive: "LiveShiftSwitchToLive",
            StreamSelectorHide: "streamSelectorHide",
            SpeedSelectorHide: "speedSelectorHide",
            SettingShow: "settingShow",
            SettingHide: "settingHide",
            SelectorShow: "selectorShow",
            SelectorHide: "selectorHide",
            SettingListShow: "settingListShow",
            SettingListHide: "settingListHide",
            ThumbnailHide: "thumbnailHide",
            ThumbnailShow: "thumbnailShow",
            ThumbnailLoaded: "thumbnailLoaded",
            TooltipShow: "tooltipShow",
            TooltipHide: "tooltipHide",
            SelectorUpdateList: "selectorUpdateList",
            SelectorValueChange: "selectorValueChange",
            VolumeVisibilityChange: "volumeVisibilityChange",
            ChangeURL: "changeURL",
            UpdateToSettingList: "updateToSettingList",
            CCChanged: "CCChanged",
            CCStateChanged: "CCStateChanged",
            PlayClick: "click",
            ProgressMarkerLoaded: "progressMarkerLoaded",
            MarkerTextShow: "markerTextShow",
            MarkerTextHide: "markerTextHide",
            PREPARE: "prepare",
            ProgressMarkerChanged: "progressMarkerChanged",
            SeiFrame: "privateSeiFrame",
            PlayInfoLoaded: "playInfoLoaded",
            Retry: "retry",
          },
        };
      },
      {},
    ],
    55: [
      function (e, t, i) {
        e("../../event/eventtype");
        var r = e("../../../../lib/dom"),
          n = e("../../../../lib/ua");
        t.exports.handle = function () {
          n.IS_IOS || r.removeClass(this.el(), "prism-fullscreen");
        };
      },
      {
        "../../../../lib/dom": 28,
        "../../../../lib/ua": 42,
        "../../event/eventtype": 54,
      },
    ],
    56: [
      function (e, t, i) {
        var r = e("../../event/eventtype");
        t.exports.handle = function (e) {
          var t = this;
          t.trigger(r.Player.CompleteSeek, e.paramData.toTime),
            t.one(r.Player.CanPlay, function () {
              t._enteredProgressMarker && t.pause();
            });
        };
      },
      { "../../event/eventtype": 54 },
    ],
    57: [
      function (e, t, i) {
        var r = e("../../event/eventtype"),
          n =
            (e("../../../../lib/constants"),
            e("../../../../lang/index"),
            e("../../../../monitor/util"));
        t.exports.handle = function (e) {
          var t = this,
            e = e.paramData;
          t.trigger(r.Private.H5_Loading_Hide),
            t.trigger(r.Private.Cover_Hide),
            t.trigger(r.Private.Play_Btn_Hide),
            t.trigger(r.Private.SettingListHide),
            t.trigger(r.Private.SelectorHide),
            t.trigger(r.Private.VolumeVisibilityChange, ""),
            (e = e || {}),
            t._monitor &&
              ((e.uuid = n.getUuid()),
              (e.requestId = t._serverRequestId),
              (e.cdnIp = t._monitor._userNetInfo.cdnIp),
              (e.localIp = t._monitor._userNetInfo.localIp)),
            (t._isError = !0),
            t.trigger(r.Private.Error_Show, e),
            t.trigger(r.Private.LifeCycleChanged, {
              type: r.Player.Error,
              data: e,
            });
        };
      },
      {
        "../../../../lang/index": 20,
        "../../../../lib/constants": 24,
        "../../../../monitor/util": 50,
        "../../event/eventtype": 54,
      },
    ],
    58: [
      function (e, t, i) {
        var r = e("../../event/eventtype"),
          o = e("../../../../lib/event"),
          a = e("./lifecyclecommon"),
          n = {
            endStart: e("./endstart"),
            seekStart: e("./seekstart"),
            requestFullScreen: e("./requestfullscreen"),
            cancelFullScreen: e("./cancelfullscreen"),
            error: e("./error"),
            privateSeiFrame: e("./seiframe"),
          },
          s = [
            r.Private.EndStart,
            r.Private.SeekStart,
            r.Player.RequestFullScreen,
            r.Player.CancelFullScreen,
            r.Player.Error,
            r.Player.Ready,
            r.Private.Dispose,
            r.Private.Created,
            r.Private.SeiFrame,
          ];
        t.exports.bind = function (e) {
          e.el();
          for (var t = 0; t < s.length; t++) {
            var i = s[t];
            "undefined" != n[i] &&
              (function (i, r, n) {
                var e = i.el();
                o.on(e, r, function (e) {
                  var t = (n && n.handle ? n : a).handle;
                  t.call(i, e, r);
                });
              })(e, i, n[i]);
          }
        };
      },
      {
        "../../../../lib/event": 29,
        "../../event/eventtype": 54,
        "./cancelfullscreen": 55,
        "./endstart": 56,
        "./error": 57,
        "./lifecyclecommon": 59,
        "./requestfullscreen": 60,
        "./seekstart": 61,
        "./seiframe": 62,
      },
    ],
    59: [
      function (e, t, i) {
        var r = e("../../event/eventtype");
        t.exports.handle = function (e, t) {
          this.trigger(r.Private.LifeCycleChanged, { type: t, data: e });
        };
      },
      { "../../event/eventtype": 54 },
    ],
    60: [
      function (e, t, i) {
        e("../../event/eventtype");
        var r = e("../../../../lib/dom"),
          n = e("../../../../lib/ua");
        t.exports.handle = function () {
          n.IS_IOS || r.addClass(this.el(), "prism-fullscreen");
        };
      },
      {
        "../../../../lib/dom": 28,
        "../../../../lib/ua": 42,
        "../../event/eventtype": 54,
      },
    ],
    61: [
      function (e, t, i) {
        var r = e("../../event/eventtype");
        t.exports.handle = function (e) {
          (this._seeking = !0),
            this.trigger(r.Player.StartSeek, e.paramData.fromTime);
        };
      },
      { "../../event/eventtype": 54 },
    ],
    62: [
      function (e, t, i) {
        e("../../event/eventtype");
        t.exports.handle = function (e) {
          var t,
            i = e.paramData,
            r = i.pts;
          this._hls &&
            ((t = i.pts),
            (e = this._initPTS),
            (r = parseInt((t - e) / 90, 10))),
            (this._seis[r] = i.dataContent);
        };
      },
      { "../../event/eventtype": 54 },
    ],
    63: [
      function (e, t, i) {
        var r = e("../../event/eventtype");
        t.exports.handle = function (e) {
          var t = this;
          (t._retrySwitchUrlCount = 0),
            (t._liveRetryCount = 0),
            t._clearLiveErrorHandle();
          var i = new Date().getTime() - t.readyTime;
          t._options.autoplay ||
            t._options._autoplay ||
            !t.paused() ||
            (t.trigger(r.Private.H5_Loading_Hide),
            t.trigger(r.Private.Play_Btn_Show)),
            t.trigger(r.Player.CanPlay, { loadtime: i });
        };
      },
      { "../../event/eventtype": 54 },
    ],
    64: [
      function (e, t, i) {
        var r = e("../../event/eventtype"),
          n = e("../../../../lib/dom"),
          o = e("../../../../lib/ua");
        t.exports.handle = function (e) {
          this._seeking = !1;
          var t = this.tag;
          "none" === t.style.display &&
            o.IS_IOS &&
            setTimeout(function () {
              n.css(t, "display", "block");
            }, 100),
            this.trigger(r.Video.CanPlayThrough);
        };
      },
      {
        "../../../../lib/dom": 28,
        "../../../../lib/ua": 42,
        "../../event/eventtype": 54,
      },
    ],
    65: [
      function (e, t, i) {
        t.exports.handle = function (e, t) {
          var i = "";
          e && e.paramData && (i = e.paramData), this.trigger(t, i);
        };
      },
      {},
    ],
    66: [
      function (e, t, i) {
        var r = e("../../event/eventtype");
        e("../../../../lang/index");
        t.exports.handle = function (e) {
          var t = this;
          (t.waiting = !1),
            (t._ended = !0),
            t._monitor && t._monitor._onPlayerInit(),
            t._options.rePlay
              ? (t.seek(0), t.tag.play())
              : t._options.isLive && t.trigger(r.Private.H5_Loading_Hide),
            t.trigger(r.Private.Play_Btn_Show),
            t.trigger(r.Player.Ended);
        };
      },
      { "../../../../lang/index": 20, "../../event/eventtype": 54 },
    ],
    67: [
      function (e, t, i) {
        var l = e("../../event/eventtype"),
          u = e("../../../../lib/constants"),
          c = e("../../../../lang/index"),
          d = e("../../../../lib/event");
        t.exports.handle = function (e) {
          var t,
            i,
            r,
            n,
            o,
            a,
            s = this;
          (s.waiting = !1),
            s._clearTimeout(),
            s.checkOnline() &&
              ((r = ""),
              (e = (t = e.target || e.srcElement).error.message),
              (r = ""),
              t.error.code &&
                ((i = t.error.code),
                (r = u.VideoErrorCode[t.error.code]),
                (e = i + " || " + e)),
              s._options.isLive
                ? s._options.liveRetry > s._liveRetryCount
                  ? s._reloadAndPlayForM3u8()
                  : ((s._liveRetryCount = 0),
                    s.trigger(l.Player.LiveStreamStop),
                    (s._liveErrorHandle = setTimeout(function () {
                      var e = {
                        mediaId: "ISLIVE",
                        error_code: r,
                        error_msg:
                          c.get("Error_Play_Text") +
                          "\uff0c" +
                          c.get("Error_Retry_Text"),
                      };
                      s.logError(e), s.trigger("error", e);
                    })))
                : -1 < e.indexOf("NS_ERROR_DOM_MEDIA_FATAL_ERR")
                ? ((n = s.getCurrentTime()),
                  (o = s.getDuration()) - n < 0.5 &&
                    (s.pause(),
                    (s._ended = !0),
                    (s.tag.currentTime = o),
                    d.trigger(s.tag, l.Video.ManualEnded)))
                : 3 == i
                ? ((a = {
                    mediaId: s._options.vid || "",
                    error_code: r,
                    error_msg: e,
                  }),
                  s.logError(a),
                  (a.display_msg = u.VideoErrorCodeText[i]),
                  s.trigger(l.Player.Error, a))
                : s._reloadForVod() ||
                  ((n = c.get("Error_Play_Text")),
                  (o = !1),
                  i < 3
                    ? (n = u.VideoErrorCodeText[i])
                    : s._eventState == u.SUSPEND
                    ? ((n = c.get("Error_Load_Abort_Text")),
                      (r = u.ErrorCode.RequestDataError))
                    : s._eventState == u.LOAD_START
                    ? ((n = c.get("Error_Network_Text")),
                      0 < s._options.source.indexOf("auth_key") &&
                        (n = n + "\uff0c" + c.get("Error_AuthKey_Text")),
                      (r = u.ErrorCode.StartLoadData))
                    : s._eventState == u.LOADED_METADATA &&
                      ((n = c.get("Error_Play_Text")),
                      (r = u.ErrorCode.PlayingError)),
                  (n = n + "\uff0c" + c.get("Error_Retry_Text")),
                  1 < s._urls.length &&
                    s._retrySwitchUrlCount < 3 &&
                    -1 == s._options.source.indexOf(".mpd") &&
                    (s.switchUrl(), (o = !0)),
                  (a = {
                    mediaId: s._options.vid || "",
                    error_code: r,
                    error_msg: e,
                  }),
                  o ||
                    (s.logError(a),
                    (a.display_msg = n),
                    s.trigger(l.Player.Error, a))));
        };
      },
      {
        "../../../../lang/index": 20,
        "../../../../lib/constants": 24,
        "../../../../lib/event": 29,
        "../../event/eventtype": 54,
      },
    ],
    68: [
      function (e, t, i) {
        var n = e("../../../../lib/event"),
          o = e("../../event/eventtype"),
          r = {
            canplay: e("./canplay"),
            canplaythrough: e("./canplaythrough"),
            common: e("./common"),
            ended: e("./ended"),
            error: e("./error"),
            pause: e("./pause"),
            play: e("./play"),
            playing: e("./playing"),
            waiting: e("./waiting"),
            timeupdate: e("./timeupdate"),
            manualended: e("./ended"),
          };
        t.exports.bind = function (e) {
          e.tag;
          for (var t in o.Video) {
            var i = o.Video[t];
            (function (t, i, r) {
              var e = t.tag;
              n.on(e, i, function (e) {
                r.handle.call(t, e, i),
                  i != o.Video.Error &&
                    (i == o.Video.ManualEnded && (i = o.Video.Ended),
                    t.trigger(o.Private.LifeCycleChanged, {
                      type: i,
                      data: e,
                    }));
              });
            })(e, i, void 0 !== r[i] ? r[i] : r.common);
          }
        };
      },
      {
        "../../../../lib/event": 29,
        "../../event/eventtype": 54,
        "./canplay": 63,
        "./canplaythrough": 64,
        "./common": 65,
        "./ended": 66,
        "./error": 67,
        "./pause": 69,
        "./play": 70,
        "./playing": 71,
        "./timeupdate": 72,
        "./waiting": 73,
      },
    ],
    69: [
      function (e, t, i) {
        var r = e("../../event/eventtype");
        t.exports.handle = function (e) {
          var t = this;
          t._clearTimeout(),
            t.trigger(r.Private.AutoStreamHide),
            t.trigger(r.Player.Pause),
            t._isManualPause &&
              (t.trigger(r.Private.Play_Btn_Show),
              t.trigger(r.Private.H5_Loading_Hide)),
            (t.waiting = !1);
        };
      },
      { "../../event/eventtype": 54 },
    ],
    70: [
      function (e, t, i) {
        var r = e("../../event/eventtype");
        t.exports.handle = function (e) {
          var t = this;
          t.trigger(r.Private.Error_Hide),
            t.trigger(r.Private.Cover_Hide),
            t.trigger(r.Private.AutoStreamHide),
            (t.waiting = !1),
            t.trigger(r.Player.Play);
        };
      },
      { "../../event/eventtype": 54 },
    ],
    71: [
      function (e, t, i) {
        var r = e("../../event/eventtype");
        t.exports.handle = function (e) {
          var t = this;
          t.trigger(r.Private.H5_Loading_Hide),
            t.trigger(r.Private.Cover_Hide),
            t.trigger(r.Private.Info_Hide),
            (t.waiting = !1),
            (t._ended = !1),
            (t._liveRetryCount = 0),
            (t._vodRetryCount = 0),
            (t._seeking = !1);
          var i = t.getCurrentTime();
          t._waitingReloadTime != i && (t._waitingTimeoutCount = 0),
            t._checkTimeoutHandle &&
              (clearTimeout(t._checkTimeoutHandle),
              (t._checkTimeoutHandle = null)),
            t._waitingLoadedHandle &&
              (clearTimeout(t._waitingLoadedHandle),
              (t._waitingLoadedHandle = null)),
            t._waitingDelayLoadingShowHandle &&
              (clearTimeout(t._waitingDelayLoadingShowHandle),
              (t._waitingDelayLoadingShowHandle = null)),
            t._waitingTimeoutHandle &&
              (clearTimeout(t._waitingTimeoutHandle),
              (t._waitingTimeoutHandle = null),
              t._ccService &&
                t._options.isLive &&
                ((i = t._ccService.getCurrentSubtitle()),
                (t._setDefaultCC = !0),
                i && t._ccService.switch(i))),
            t.trigger(r.Private.AutoStreamHide),
            t.trigger(r.Player.Playing),
            t.trigger(r.Private.Play_Btn_Hide),
            t.trigger(r.Private.Error_Hide);
        };
      },
      { "../../event/eventtype": 54 },
    ],
    72: [
      function (e, t, i) {
        var d = e("../../event/eventtype"),
          p = e("../../../../lib/ua"),
          h = e("../../../../lib/event"),
          f = e("../../plugin/status");
        t.exports.handle = function (e) {
          var i = this;
          i.trigger(d.Player.TimeUpdate, e.timeStamp);
          e = i.getCurrentTime();
          i.waiting && !i._TimeUpdateStamp && (i._TimeUpdateStamp = e),
            (0 != i.waiting && i._TimeUpdateStamp == e) ||
              (i.trigger(d.Private.H5_Loading_Hide),
              i.trigger(d.Private.AutoStreamHide),
              i._checkTimeoutHandle && clearTimeout(i._checkTimeoutHandle),
              i._waitingTimeoutHandle && clearTimeout(i._waitingTimeoutHandle),
              i._waitingLoadedHandle && clearTimeout(i._waitingLoadedHandle),
              (i.waiting = !1)),
            (i._TimeUpdateStamp = e),
            i._options.isLive ||
              ((t = !1),
              (t =
                ((r = i.getDuration()) < e && !i.paused()) ||
                (r - e < 0.2 &&
                  0 <= p.browser.version.indexOf("49.") &&
                  !i.paused()) ||
                i.exceedPreviewTime(e)
                  ? !0
                  : t) &&
                !i._ended &&
                (i.pause(), h.trigger(i.tag, d.Video.ManualEnded)));
          var t,
            r = i._player.tag;
          i._options.isLive &&
            r &&
            (i._player.resolution &&
              0 < r.videoWidth &&
              0 < r.videoHeight &&
              (0 < i._player.resolution.width ||
                0 < i._player.resolution.height) &&
              (i._player.resolution.width !== r.videoWidth ||
                i._player.resolution.height !== r.videoHeight) &&
              ((t = {
                oldResolution: {
                  width: i._player.resolution.width,
                  height: i._player.resolution.height,
                },
                newResolution: { width: r.videoWidth, height: r.videoHeight },
              }),
              i.trigger(d.Player.ResolutionChange, t)),
            (i._player.resolution.width =
              0 == r.videoWidth ? i._player.resolution.width : r.videoWidth),
            (i._player.resolution.height =
              0 == r.videoHeight
                ? i._player.resolution.height
                : r.videoHeight)),
            p.IS_CHROME &&
              Number(p.CHROME_VERSION) < 50 &&
              (i._playingSlientPause &&
                (clearTimeout(i._playingSlientPause),
                (i._playingSlientPause = null)),
              (i._playingSlientPause = setTimeout(function () {
                var e, t;
                i._status != f.playing ||
                  i.paused() ||
                  i._drm ||
                  i._urls.length ||
                  ((e = i.getCurrentTime()),
                  (t = i._options.isLive ? 0 : e),
                  i._loadByUrlInner(i._options.source, t, e, !0));
              }, 3e3)));
          var n = i._seis || {},
            o = Object.keys(n);
          if (0 !== o.length) {
            var a = parseInt(1e3 * e, 10);
            if (!(l = n[a]))
              for (var s = 0; s < 250; s++) {
                var l,
                  u = a + s;
                if ((l = n[u])) {
                  for (var c = 0; c < o.length && o[c] <= u; c++)
                    delete n[o[c]];
                  break;
                }
              }
            l && i.trigger(d.Player.SeiFrame, l);
          }
        };
      },
      {
        "../../../../lib/event": 29,
        "../../../../lib/ua": 42,
        "../../event/eventtype": 54,
        "../../plugin/status": 78,
      },
    ],
    73: [
      function (e, t, i) {
        var o = e("../../event/eventtype"),
          a = e("../../../../lib/constants"),
          s = e("../../../../lib/event"),
          l = e("../../../../lang/index");
        e("../../../../lib/ua");
        t.exports.handle = function (e) {
          var t = this;
          if (!t._options.isLive) {
            var i = this.getCurrentTime(),
              r = this.getDuration();
            if (0 < r && (r - i < 0.5 || r < i))
              return (
                t.pause(),
                (t._ended = !0),
                void s.trigger(this.tag, o.Video.ManualEnded)
              );
          }
          t.waiting = !0;
          function n() {
            t._checkTimeoutHandle &&
              (clearTimeout(t._checkTimeoutHandle),
              (t._checkTimeoutHandle = null)),
              t._waitingTimeoutHandle &&
                (clearTimeout(t._waitingTimeoutHandle),
                (t._waitingTimeoutHandle = null)),
              t._waitingLoadedHandle &&
                (clearTimeout(t._waitingLoadedHandle),
                (t._waitingLoadedHandle = null)),
              t._waitingDelayLoadingShowHandle &&
                (clearTimeout(t._waitingDelayLoadingShowHandle),
                (t._waitingDelayLoadingShowHandle = null));
          }
          n(),
            (t._waitingDelayLoadingShowHandle = setTimeout(function () {
              t.trigger(o.Private.H5_Loading_Show);
            }, 1e3 * t._options.delayLoadingShow)),
            (t._TimeUpdateStamp = null),
            (t._checkTimeoutHandle = setTimeout(function () {
              t.trigger(o.Private.AutoStreamShow);
            }, 1e3 * t._options.loadDataTimeout)),
            t.trigger(o.Player.Waiting),
            (t._waitingTimeoutHandle = setTimeout(function () {
              var e;
              t.tag &&
                t._options &&
                (t.pause(),
                (e = {
                  mediaId: t._options.vid || "",
                  error_code: a.ErrorCode.LoadingTimeout,
                  error_msg: l.get("Error_Waiting_Timeout_Text"),
                }),
                t.logError(e),
                t.trigger("error", e));
            }, 1e3 * t._options.waitingTimeout)),
            (t._waitingLoadedHandle = setTimeout(function () {
              var e = t.getCurrentTime();
              0 == t._waitingTimeoutCount &&
                e != t._waitingReloadTime &&
                ((t._waitingTimeoutCount = 1),
                (t._waitingReloadTime = e),
                (e = t._options.isLive ? 0 : e),
                t._loadByUrlInner(t._options.source, e, !0));
            }, (t._options.waitingTimeout / 2) * 1e3)),
            t.on("error", function () {
              n();
            });
        };
      },
      {
        "../../../../lang/index": 20,
        "../../../../lib/constants": 24,
        "../../../../lib/event": 29,
        "../../../../lib/ua": 42,
        "../../event/eventtype": 54,
      },
    ],
    74: [
      function (e, t, i) {
        var n = e("../../ui/component"),
          o = e("../../lib/object"),
          a = e("../../lib/dom"),
          s = e("../../lib/event"),
          l = e("../../ui/exports"),
          u = e("../../monitor/monitor"),
          c = e("../../lib/ua"),
          d = e("../../lib/constants"),
          p = e("../../lib/playerutil"),
          r = e("./x5play"),
          h = e("../../lib/cookie"),
          f = e("../../lang/index"),
          _ = e("../../feature/autoPlayDelay"),
          y = e("./event/eventmanager"),
          g = e("../../ui/component/cover"),
          v = e("../../ui/component/play-animation"),
          m = e("../../commonui/autostreamselector"),
          S = e("./event/eventtype"),
          b = e("./plugin/lifecyclemanager"),
          T = e("../service/export"),
          x = e("../../ui/component/progressmarker"),
          E = e("../../feature/keyboardControl"),
          w = e("./eventHandler/video/index"),
          e = n.extend({
            init: function (e, t) {
              var i, r;
              (this.tag = e),
                (this.loaded = !1),
                (this.played = !1),
                (this.waiting = !1),
                (this._urls = []),
                (this._currentPlayIndex = 0),
                (this._retrySwitchUrlCount = 0),
                (this._isError = !1),
                (this._isHls = !1),
                (this._liveRetryCount = 0),
                (this._liveRetryTimer = null),
                (this._vodRetryCount = 0),
                (this._seeking = !1),
                (this._serverRequestId = 0),
                (this._waitingTimeoutCount = 0),
                (this._waitingReloadTime = 0),
                (this._created = !1),
                (this._enteredProgressMarker = !1),
                (this._liveShiftSeekStartTime = 0),
                (this._duration = 0),
                (this._seis = {}),
                (this._initPTS = 0),
                (this.isMutiLevel = !1),
                (this.__disposed = !1),
                (this.resolution = { width: 0, height: 0 }),
                void 0 === t.skinLayout && (t.skinLayout = p.defaultH5Layout),
                c.wechat() &&
                  c.IS_ANDROID &&
                  !p.isRts(t.source) &&
                  (t.autoplay = !1),
                p.isRts(t.source) && !t.autoplay && (t.preload = !1),
                n.call(this, this, t),
                this.addClass("prism-player"),
                t.plugins &&
                  o.each(
                    t.plugins,
                    function (e, t) {
                      this[e](t);
                    },
                    this
                  ),
                this._createService(),
                (this.UI = {}),
                t.useNativeControls
                  ? this.tag.setAttribute("controls", "controls")
                  : ((this.UI = l),
                    0 == t.errorDisplay && (this.UI.errorDisplay = void 0)),
                this.initChildren(),
                this._options.trackLog &&
                  (this._monitor = new u(
                    this,
                    {
                      video_id: 0,
                      album_id: 0,
                      from: this._options.from,
                      source: this._options.source,
                      logBatched: this._options.logBatched,
                    },
                    this._options.trackLog
                  )),
                y.onAll(this),
                (this._lifeCycleManager = new b(this)),
                this._overrideNativePlay(),
                !this._liveshiftService || this._liveshiftService.validate()
                  ? (!this._options.extraInfo ||
                      ((r = this._options.extraInfo).liveRetry &&
                        (this._options.liveRetry = r.liveRetry)),
                    this.on(S.Private.ReadyState, function () {
                      this.trigger(S.Player.Ready);
                    }),
                    this._thumbnailService &&
                      this._options.thumbnailUrl &&
                      this._thumbnailService.get(this._options.thumbnailUrl),
                    0 < this._options.progressMarkers.length &&
                      this.trigger(
                        S.Private.ProgressMarkerLoaded,
                        this._options.progressMarkers
                      ),
                    this._options.source &&
                      this._options._native &&
                      this._executeReadyCallback(),
                    this._options.autoplay || this._options.preload
                      ? this.trigger(S.Private.H5_Loading_Show)
                      : this.trigger(S.Private.Play_Btn_Show),
                    this._extraMultiSources(),
                    this._options.source &&
                      (this.trigger(S.Private.PREPARE, "custom"),
                      this._options.autoPlayDelay
                        ? ((this._autoPlayDelay = new _(this)),
                          (i = this)._autoPlayDelay.handle(function () {
                            i.initPlay();
                          }))
                        : this.initPlay()),
                    E.init.call(this))
                  : ((r = {
                      mediaId: this._options.vid || "",
                      error_code: d.ErrorCode.InvalidParameter,
                      error_msg: f.get("ShiftLiveTime_Error"),
                    }),
                    this.trigger(S.Player.Error, r));
            },
          });
        (e.prototype.isSupportMSE = function () {
          return p.isSupportMSE();
        }),
          (e.prototype.initPlay = function (e) {
            this._initPlayBehavior(e, this._options.source);
          }),
          (e.prototype.initChildren = function () {
            var e = this.options(),
              t = e.skinLayout;
            if (!1 !== t && !o.isArray(t))
              throw new Error(
                "PrismPlayer Error: skinLayout should be false or type of array!"
              );
            !1 !== t &&
              0 !== t.length &&
              (this.options({ children: t }),
              n.prototype.initChildren.call(this)),
              (this.UI.cover = g),
              (e.className = ""),
              this.addChild("cover", e),
              (this.UI.playanimation = v),
              this.addChild("playanimation", e),
              (this.UI.autoStreamSelector = m),
              this.addChild("autoStreamSelector", e),
              (this.UI.progressMarker = x),
              this.addChild("progressMarker", e),
              this.trigger(S.Private.UiH5Ready);
          }),
          (e.prototype.createEl = function () {
            var e = !1;
            "VIDEO" !== this.tag.tagName
              ? ((this._el = this.tag),
                (this.tag = n.prototype.createEl.call(this, "video")),
                this._options.playsinline &&
                  (this.tag.setAttribute("webkit-playsinline", ""),
                  this.tag.setAttribute("playsinline", ""),
                  this.tag.setAttribute("x-webkit-airplay", ""),
                  this.tag.setAttribute("x5-playsinline", "")))
              : ((e = !0), (this._el = this.tag.parentNode));
            var t = this._el,
              i = this.tag;
            this._options.enableSystemMenu ||
              (i.addEventListener
                ? i.addEventListener(
                    "contextmenu",
                    function (e) {
                      e.preventDefault();
                    },
                    !1
                  )
                : i.attachEvent("oncontextmenu", function () {
                    window.event.returnValue = !1;
                  })),
              (i.player = this);
            var r = a.getElementAttributes(i);
            return (
              o.each(r, function (e) {
                t.setAttribute(e, r[e]);
              }),
              this.setVideoAttrs(),
              e ||
                (i.parentNode && i.parentNode.insertBefore(t, i),
                a.insertFirst(i, t)),
              t
            );
          }),
          (e.prototype.setVideoAttrs = function () {
            var e = this._options.preload,
              t = this._options.autoplay;
            if (
              ((this.tag.style.width = this._options.videoWidth || "100%"),
              (this.tag.style.height = this._options.videoHeight || "100%"),
              e && this.tag.setAttribute("preload", "preload"),
              t &&
                !this._isEnabledAILabel() &&
                "15" !== c.IOS_VERSION &&
                this.tag.setAttribute("autoplay", "autoplay"),
              c.IS_IOS &&
                this.tag.setAttribute(
                  "poster",
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAMZJREFUeAHt0DEBAAAAwqD1T20LL4hAYcCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMCAAQMGDBgwYMDAc2CcpAABaODCqQAAAABJRU5ErkJggg=="
                ),
              (c.IS_UC || c.dingTalk()) &&
                this.tag.setAttribute("renderer", "standard"),
              this._options.extraInfo)
            )
              for (var i in this._options.extraInfo)
                this.tag.setAttribute(i, this._options.extraInfo[i]);
            r.adaptX5Play(this);
          }),
          (e.prototype.checkOnline = function () {
            if (!this._options || this._options.debug) return !0;
            if (0 != navigator.onLine) return !0;
            var e = {
              mediaId: this._options.vid || "",
              error_code: d.ErrorCode.NetworkUnavaiable,
              error_msg: f.get("Error_Offline_Text"),
            };
            return (
              (e.display_msg = f.get("Error_Offline_Text")),
              this.trigger(S.Player.Error, e),
              !1
            );
          }),
          (e.prototype.id = function () {
            return this.el().id;
          }),
          (e.prototype.renderUI = function () {}),
          (e.prototype.switchUrl = function () {
            var e, t;
            0 != this._urls.length &&
              ((this._currentPlayIndex = this._currentPlayIndex + 1),
              this._urls.length <= this._currentPlayIndex &&
                ((this._currentPlayIndex = 0), this._retrySwitchUrlCount++),
              (e = this._urls[this._currentPlayIndex]),
              h.set(d.SelectedStreamLevel, e.definition, 365),
              this.trigger(
                S.Private.QualityChange,
                f.get("Quality_Change_Fail_Switch_Text")
              ),
              (t = this.getCurrentTime()),
              (this._vodRetryCount = 0),
              (this._originalSource = ""),
              this._loadByUrlInner(e.Url, t, !0));
          }),
          (e.prototype.setControls = function () {
            var e = this.options();
            e.useNativeControls
              ? this.tag.setAttribute("controls", "controls")
              : "object" == typeof e.controls &&
                ((e = this._initControlBar(e.controls)), this.addChild(e));
          }),
          (e.prototype._initControlBar = function (e) {
            return new ControlBar(this, e);
          }),
          (e.prototype.getMetaData = function () {
            var t = this,
              i = this.tag;
            t._readyStateTimer && clearInterval(t._readyStateTimer),
              (t._readyStateTimer = window.setInterval(function (e) {
                t.tag
                  ? i &&
                    0 < i.readyState &&
                    ((t._duration = i.duration < 1 ? 0 : i.duration),
                    clearInterval(t._readyStateTimer),
                    t.trigger(S.Private.ReadyState))
                  : clearInterval(t._readyStateTimer);
              }, 100));
          }),
          (e.prototype.getReadyTime = function () {
            return this.readyTime;
          }),
          (e.prototype.readyState = function () {
            return this.tag.readyState;
          }),
          (e.prototype.getError = function () {
            return this.tag.error;
          }),
          (e.prototype.getRecentOccuredEvent = function () {
            return this._eventState;
          }),
          (e.prototype.getSourceUrl = function () {
            return this._options ? this._options.source : "";
          }),
          (e.prototype.getMonitorInfo = function () {
            return this._monitor ? this._monitor.opt : {};
          }),
          (e.prototype.getCurrentQuality = function () {
            if (0 < this._urls.length) {
              var e = this._urls[this._currentPlayIndex];
              return { width: e.width, url: e.Url, definition: e.definition };
            }
            return "";
          }),
          (e.prototype.getCurrentPDT = function () {
            if ((c.IS_SAFARI || c.IS_IOS) && this.tag) {
              var e = Date.parse(this.tag.getStartDate());
              return isNaN(e) ? 0 : e + 1e3 * this.getCurrentTime();
            }
          }),
          (e.prototype.setSpeed = function (e) {
            this.tag &&
              ((this._originalPlaybackRate = e), (this.tag.playbackRate = e));
          }),
          (e.prototype.play = function (e) {
            return (
              this.tag &&
                (this.tag.ended || this._ended
                  ? this.replay()
                  : (((this._options.preload || this.loaded) && this.tag.src) ||
                      this._initLoad(this._options.source),
                    this.trigger(S.Private.Cover_Hide),
                    this.tag.play())),
              (this._isManualPlay = e || !1),
              this
            );
          }),
          (e.prototype.replay = function () {
            return (
              this._monitor && this._monitor.replay(),
              this.seek(0),
              this.tag.play(),
              this
            );
          }),
          (e.prototype.pause = function (e) {
            return (
              this.tag && this.tag.pause(),
              (this._isManualPause = e || !1),
              this
            );
          }),
          (e.prototype.stop = function () {
            return this.tag.setAttribute("src", null), this;
          }),
          (e.prototype.paused = function () {
            if (this.tag) return !1 !== this.tag.paused;
          }),
          (e.prototype.getDuration = function () {
            var e = 0;
            return (e = this.tag
              ? this.isPreview()
                ? this._vodDuration || this.tag.duration
                : this._duration && this._duration != 1 / 0
                ? this._duration
                : this.tag.duration
              : e);
          }),
          (e.prototype.getDisplayDuration = function () {
            var e = 0;
            return (e = this.tag ? this._vodDuration || this.getDuration() : e);
          }),
          (e.prototype.getCurrentTime = function () {
            return this.tag ? this.tag.currentTime : 0;
          }),
          (e.prototype.seek = function (e) {
            this._seeking = !0;
            var t = this.tag.duration;
            t <= (e = Math.floor(e)) && (e = t);
            var i = this._originalPlaybackRate || this.tag.playbackRate;
            try {
              var r = this;
              (this.tag.currentTime = e),
                setTimeout(function () {
                  r.tag && (r.tag.playbackRate = i);
                });
            } catch (e) {
              console.log(e);
            }
            return this;
          }),
          (e.prototype.firstNewUrlloadByUrl = function (e, t) {
            this._clearTimeout(),
              (this._options.vid = 0),
              (this._options.source = e),
              this._monitor &&
                this._monitor.updateVideoInfo({
                  video_id: 0,
                  album_id: 0,
                  source: e,
                  from: this._options.from,
                }),
              this.trigger(S.Private.ChangeURL),
              this.initPlay(),
              this._options.autoplay && this.trigger(S.Private.Cover_Hide),
              this._options.autoplay
                ? this.trigger(S.Player.Play)
                : this.trigger(S.Player.Pause),
              (!(t = t || 0) && 0 != t) || isNaN(t) || this.seek(t);
          }),
          (e.prototype._loadByUrlInner = function (e, t, i, r) {
            var n = this,
              o = this.tag.volume;
            if (r && c.IS_ANDROID_FIREFOX) {
              for (var a in S.Video) s.off(this.tag, S.Video[a]);
              this.tag.remove(), (this.tag = this._el), this.createEl();
            }
            this.loadByUrl(e, t, i, !0),
              (this.tag.volume = o),
              r &&
                c.IS_ANDROID_FIREFOX &&
                this.tag.addEventListener(S.Video.LoadedData, function e() {
                  n._player.trigger(S.Player.DurationChange),
                    w.bind(n),
                    n.tag.removeEventListener(S.Video.LoadedData, e);
                });
          }),
          (e.prototype.loadByUrl = function (e, i, t, r) {
            var n = this;
            r || (this._urls = []),
              this._monitor && !r && this._monitor.reset(),
              (this._isError = !1),
              (this._duration = 0),
              this._clearTimeout(),
              this.trigger(S.Private.Error_Hide),
              (this._options.source = e),
              this._monitor &&
                this._monitor.updateVideoInfo({
                  video_id: 0,
                  album_id: 0,
                  source: e,
                  from: this._options.from,
                }),
              r ||
                (this.trigger(S.Private.ChangeURL), (this._vodRetryCount = 0)),
              (this._options._autoplay = t),
              this.initPlay(t),
              (this._options.autoplay || t) &&
                this.trigger(S.Private.Cover_Hide),
              this._options.autoplay || t
                ? this.trigger(S.Player.Play)
                : this.trigger(S.Player.Pause),
              this._options.isLive ||
                (!i && 0 != i) ||
                isNaN(i) ||
                s.one(this.tag, S.Video.CanPlay, function (e) {
                  var t = n.getDuration();
                  n.seek(t <= i ? t : i);
                });
          }),
          (e.prototype.dispose = function () {
            (this.__disposed = !0),
              this.trigger(S.Private.Dispose),
              this.tag.pause(),
              y.offAll(this),
              E.dispose.call(this),
              this._monitor &&
                (this._monitor.removeEvent(), (this._monitor = null)),
              this._autoPlayDelay && this._autoPlayDelay.dispose(),
              this._checkTimeoutHandle &&
                (clearTimeout(this._checkTimeoutHandle),
                (this._checkTimeoutHandle = null)),
              this._waitingTimeoutHandle &&
                (clearTimeout(this._waitingTimeoutHandle),
                (this._waitingTimeoutHandle = null)),
              this._playingSlientPause &&
                (clearTimeout(this._playingSlientPause),
                (this._playingSlientPause = null)),
              this._waitingLoadedHandle &&
                (clearTimeout(this._waitingLoadedHandle),
                (this._waitingLoadedHandle = null)),
              this._readyStateTimer &&
                (clearInterval(this._readyStateTimer),
                (this._readyStateTimer = null)),
              this._vodRetryCountHandle &&
                (clearTimeout(this._vodRetryCountHandle),
                (this._vodRetryCountHandle = null)),
              this._waitingDelayLoadingShowHandle &&
                (clearTimeout(this._waitingDelayLoadingShowHandle),
                (this._waitingDelayLoadingShowHandle = null)),
              this._liveRetryTimer &&
                (clearTimeout(this._liveRetryTimer),
                (this._liveRetryTimer = null)),
              this._disposeService(),
              this._clearLiveErrorHandle(),
              (this._el.innerHTML = ""),
              this.destroy(),
              (this.tag = null),
              (this._options.recreatePlayer = null),
              (this._options = null),
              (this.isMutiLevel = !1),
              (this._seis = {}),
              (this._initPTS = 0);
          }),
          (e.prototype.mute = function () {
            this._muteInner(), (this._originalVolumn = this.tag.volume);
            var e = f.get("Volume_Mute");
            return (
              this._player.trigger(S.Private.Info_Show, {
                text: e,
                duration: 1e3,
                align: "lb",
              }),
              this._setInnerVolume(0),
              this
            );
          }),
          (e.prototype._muteInner = function () {
            (this.tag.muted = !0), this.trigger(S.Private.VolumnChanged, -1);
          }),
          (e.prototype.unMute = function () {
            this._unMuteInner();
            var e = f.get("Volume_UnMute");
            return (
              this._player.trigger(S.Private.Info_Show, {
                text: e,
                duration: 1e3,
                align: "lb",
              }),
              this._setInnerVolume(this._originalVolumn || 0.5),
              this
            );
          }),
          (e.prototype._unMuteInner = function () {
            (this.tag.muted = !1), this.trigger(S.Private.VolumnChanged, -2);
          }),
          (e.prototype.muted = function () {
            return this.tag.muted;
          }),
          (e.prototype.getVolume = function () {
            return this.tag.volume;
          }),
          (e.prototype.getOptions = function () {
            return this._options;
          }),
          (e.prototype.setVolume = function (e, t) {
            0 != e ? this._unMuteInner() : 0 == e && this._muteInner(),
              this._setInnerVolume(e);
            e =
              f.get("Curent_Volume") +
              "<span>" +
              (100 * e).toFixed() +
              "%</span>";
            this._player.trigger(S.Private.Info_Show, {
              text: e,
              duration: 1e3,
              align: "lb",
            });
          }),
          (e.prototype._setInnerVolume = function (e) {
            (this.tag.volume = e), this.trigger(S.Private.VolumnChanged, e);
          }),
          (e.prototype.hideProgress = function () {
            this.trigger(S.Private.HideProgress);
          }),
          (e.prototype.cancelHideProgress = function () {
            this.trigger(S.Private.CancelHideProgress);
          }),
          (e.prototype.setPlayerSize = function (e, t) {
            this._el &&
              ((this._el.style.width = e), (this._el.style.height = t));
          }),
          (e.prototype.getBuffered = function () {
            return this.tag.buffered;
          }),
          (e.prototype.setRotate = function (e) {
            this.tag &&
              ((this._rotate = e),
              this._setTransform(),
              this.log("ROTATE", { rotation: e }));
          }),
          (e.prototype.getRotate = function (e) {
            return void 0 === this._rotate ? 0 : this._rotate;
          }),
          (e.prototype.setImage = function (e) {
            this.tag &&
              ((this._image = e),
              this._setTransform(),
              this.log("IMAGE", { mirror: "horizon" == e ? 2 : 1, text: e }));
          }),
          (e.prototype.getImage = function () {
            return this._image;
          }),
          (e.prototype.cancelImage = function () {
            this.tag &&
              ((this._image = ""),
              this._setTransform(),
              this.log("IMAGE", { mirror: 0 }));
          }),
          (e.prototype.setCover = function (e) {
            var t = document.querySelector("#" + this.id() + " .prism-cover");
            t &&
              e &&
              ((t.style.backgroundImage = "url(" + e + ")"),
              (this._options.cover = e),
              this.trigger(S.Private.Cover_Show));
          }),
          (e.prototype._setTransform = function () {
            this._transformProp ||
              (this._transformProp = a.getTransformName(this.tag));
            var e = " translate(-50%, -50%)";
            this._rotate && (e += " rotate(" + this._rotate + "deg)"),
              this._image &&
                ("vertical" == this._image
                  ? (e += " scaleY(-1)")
                  : "horizon" == this._image && (e += " scaleX(-1)")),
              (this.tag.style[this._transformProp] = e);
          }),
          (e.prototype._startPlay = function () {
            this.tag.paused && this.tag.play();
          }),
          (e.prototype._initPlayBehavior = function (e, t) {
            if (this._checkSupportVideoType()) return !1;
            if (p.validateSource(t))
              return (
                void 0 === e && (e = !1),
                this._created ||
                  ((this._created = !0), this.trigger(S.Private.Created)),
                this.loaded || this.trigger(S.Player.Init),
                this._options.autoplay ||
                this._options._autoplay ||
                this._options.preload ||
                e
                  ? ((this._options._preload = !0),
                    this._initLoad(t),
                    (this._options.autoplay || this._options._autoplay) &&
                      this._startPlay())
                  : this.trigger(S.Private.Play_Btn_Show),
                !0
              );
            t = {
              mediaId: this._options.vid || "",
              error_code: d.ErrorCode.InvalidSourceURL,
              error_msg: "InvalidSourceURL",
            };
            return (
              (t.display_msg = f.get("Error_Invalidate_Source")),
              this.trigger(S.Player.Error, t),
              !1
            );
          }),
          (e.prototype._isPreload = function () {
            return (
              this._options.autoplay ||
              this._options.preload ||
              this._options._preload
            );
          }),
          (e.prototype._initLoad = function (e) {
            this.getMetaData(),
              e &&
                (this._isPreload() && !c.IS_MOBILE
                  ? this.trigger(S.Private.H5_Loading_Show)
                  : (this.trigger(S.Private.H5_Loading_Hide),
                    this.trigger(S.Private.Play_Btn_Show)),
                this.tag.setAttribute("src", e),
                (this.loaded = !0));
          }),
          (e.prototype._clearLiveErrorHandle = function () {
            this._liveErrorHandle &&
              (clearTimeout(this._liveErrorHandle),
              (this._liveErrorHandle = null));
          }),
          (e.prototype._reloadAndPlayForM3u8 = function () {
            0 == this._liveRetryCount && this.trigger(S.Player.OnM3u8Retry);
            var e = this._options,
              e = e.liveRetryInterval + e.liveRetryStep * this._liveRetryCount,
              t = this;
            this._liveRetryTimer &&
              (clearTimeout(this._liveRetryTimer),
              (this._liveRetryTimer = null)),
              (this._liveRetryTimer = setTimeout(function () {
                t._liveRetryCount++,
                  t.tag.load(t._options.source),
                  t.tag.play();
              }, 1e3 * e));
          }),
          (e.prototype._checkSupportVideoType = function () {
            if (!this.tag.canPlayType || !this._options.source || !c.IS_MOBILE)
              return "";
            var e = this._options.source,
              t = "";
            return (
              0 < e.indexOf("m3u8")
                ? "" != this.tag.canPlayType("application/x-mpegURL") ||
                  p.isSupportHls() ||
                  (t = f.get("Error_Not_Support_M3U8_Text"))
                : 0 < e.indexOf("mp4")
                ? "" == this.tag.canPlayType("video/mp4") &&
                  (t = f.get("Error_Not_Support_MP4_Text"))
                : (p.isRTMP(e) || p.isFlv(e)) &&
                  c.IS_MOBILE &&
                  (t = f.get("Error_Not_Support_Format_On_Mobile")),
              t &&
                ((e = {
                  mediaId: this._options.vid || "",
                  error_code: d.ErrorCode.FormatNotSupport,
                  error_msg: t,
                }),
                this.logError(e),
                (e.display_msg = t),
                this.trigger(S.Player.Error, e)),
              t
            );
          }),
          (e.prototype.getComponent = function (e) {
            return this._lifeCycleManager.getComponent(e);
          }),
          (e.prototype.logError = function (e, t) {
            ((e = e || {}).vt = this.getCurrentTime()),
              (this._serverRequestId = this.log(t ? "ERRORRETRY" : "ERROR", e));
          }),
          (e.prototype.log = function (e, t) {
            var i = 0,
              r = 0;
            if (this._monitor)
              return (
                this._options &&
                  ((i = this._options.vid || "0"),
                  (r = this._options.from || "0")),
                this._monitor.updateVideoInfo({
                  video_id: i,
                  album_id: 0,
                  source: this._options.source,
                  from: r,
                }),
                this._monitor._log(e, t)
              );
          }),
          (e.prototype.setSanpshotProperties = function (e, t, i) {
            if (
              (this._snapshotMatric || (this._snapshotMatric = {}),
              (this._snapshotMatric.width = e),
              (this._snapshotMatric.height = t),
              1 < i)
            )
              throw new Error("rate doesn't allow more than 1");
            this._snapshotMatric.rate = i;
          }),
          (e.prototype.getStatus = function () {
            return this._status || "init";
          }),
          (e.prototype.enterProgressMarker = function () {
            this._enteredProgressMarker = !0;
          }),
          (e.prototype.isInProgressMarker = function () {
            return this._enteredProgressMarker;
          }),
          (e.prototype.exitProgressMarker = function () {
            this._enteredProgressMarker = !1;
          }),
          (e.prototype.setProgressMarkers = function (e) {
            this.trigger(S.Private.ProgressMarkerChanged, (e = e || []));
          }),
          (e.prototype.getProgressMarkers = function () {
            return this._progressMarkerService
              ? this._progressMarkerService.progressMarkers
              : [];
          }),
          (e.prototype.setPreviewTime = function (e) {
            this._options.playConfig || (this._options.playConfig = {}),
              (this._options.playConfig.PreviewTime = e);
          }),
          (e.prototype.getPreviewTime = function () {
            var e = 0;
            return (e = this._options.playConfig
              ? this._options.playConfig.PreviewTime
              : e);
          }),
          (e.prototype.exceedPreviewTime = function (e) {
            return (
              this.isPreview() && e >= this._options.playConfig.PreviewTime
            );
          }),
          (e.prototype.isPreview = function () {
            var e = this._options.playConfig.PreviewTime,
              t = this._vodDuration || this.tag.duration;
            return 0 < e && e < t;
          }),
          (e.prototype._getSanpshotMatric = function () {
            return (
              this._snapshotMatric || (this._snapshotMatric = {}),
              this._snapshotMatric
            );
          }),
          (e.prototype._overrideNativePlay = function () {
            var i = this.tag.play,
              r = this;
            this.tag.play = function () {
              if (!r._options.source) {
                var e = {
                  mediaId: r._options.vid || "",
                  error_code: d.ErrorCode.InvalidSourceURL,
                  error_msg: "InvalidSourceURL",
                };
                return (
                  r._options.vid
                    ? (e.display_msg = f.get("Error_Vid_Empty_Source"))
                    : (e.display_msg = f.get("Error_Empty_Source")),
                  void r.trigger(S.Player.Error, e)
                );
              }
              r.readyTime = new Date().getTime();
              e = i.apply(r.tag);
              void 0 !== e &&
                e
                  .then(function () {
                    r.trigger(S.Player.AutoPlay, !0);
                  })
                  .catch(function (e) {
                    !r.tag ||
                      !r.tag.paused ||
                      r._isError ||
                      r._options._autoplay ||
                      r._switchedLevel ||
                      (r.trigger(S.Private.Play_Btn_Show),
                      r.trigger(S.Private.H5_Loading_Hide),
                      r.trigger(S.Player.AutoPlayPrevented),
                      r.trigger(S.Player.AutoPlay, !1),
                      r._options.cover && r.trigger(S.Private.Cover_Show));
                  });
              var t = r._originalPlaybackRate || r.tag.playbackRate;
              setTimeout(function () {
                r.tag && (r.tag.playbackRate = t);
              });
            };
          }),
          (e.prototype._extraMultiSources = function () {
            var e = this._options.source;
            if (e && -1 < e.indexOf("{") && -1 < e.indexOf("}")) {
              var t = "";
              try {
                t = JSON.parse(e);
              } catch (e) {
                console.error(e),
                  console.error(
                    "\u5730\u5740json\u4e32\u683c\u5f0f\u4e0d\u5bf9"
                  );
              }
              var i,
                r = [];
              for (i in t) {
                var n = d.QualityLevels[i];
                r.push({ definition: i, Url: t[i], desc: n || i });
              }
              0 < r.length &&
                ((this._currentPlayIndex = p.findSelectedStreamLevel(r)),
                (e = r[this._currentPlayIndex]),
                (this._urls = r),
                (this._options.source = e.Url),
                this.trigger(S.Private.SourceLoaded, e));
            }
          }),
          (e.prototype._isEnabledAILabel = function () {
            return this._options.ai && this._options.ai.label;
          }),
          (e.prototype._createService = function () {
            if (T)
              for (var e = T.length, t = 0; t < e; t++) {
                var i = T[t],
                  r = i.condition;
                void 0 === r
                  ? (r = !0)
                  : "function" == typeof r && (r = r.call(this)),
                  r && (this[i.name] = new i.service(this));
              }
          }),
          (e.prototype._disposeService = function () {
            if (T)
              for (var e = T.length, t = 0; t < e; t++) {
                var i = this[T[t].name];
                void 0 !== i && i.dispose && i.dispose();
              }
          }),
          (e.prototype._executeReadyCallback = function () {
            try {
              this._options.autoplay ||
                this._options.preload ||
                (this.trigger(S.Private.H5_Loading_Hide),
                this.trigger(S.Private.Play_Btn_Show)),
                this._options.readyCallback(this);
            } catch (e) {
              console.log(e);
            }
          }),
          (e.prototype._clearTimeout = function () {
            this._checkTimeoutHandle &&
              (clearTimeout(this._checkTimeoutHandle),
              (this._checkTimeoutHandle = null)),
              this._waitingTimeoutHandle &&
                (clearTimeout(this._waitingTimeoutHandle),
                (this._waitingTimeoutHandle = null)),
              this._clearLiveErrorHandle();
          }),
          (e.prototype._reloadForVod = function () {
            if (
              (this._originalSource ||
                (this._originalSource = this._options.source),
              this._vodRetryCount < this._options.vodRetry && navigator.onLine)
            ) {
              var e = this.getCurrentTime(),
                t = this._originalSource;
              t.indexOf("auth_key=") < 0 &&
                (t =
                  t && 0 < t.indexOf("?")
                    ? t + "&_t=" + new Date().valueOf()
                    : t + "?_t=" + new Date().valueOf()),
                this._vodRetryCountHandle &&
                  clearTimeout(this._vodRetryCountHandle);
              var i = this;
              return (
                (this._vodRetryCountHandle = setTimeout(function () {
                  i._loadByUrlInner(t, e, !0);
                }, 100 * this._vodRetryCount)),
                (this._vodRetryCount = this._vodRetryCount + 1),
                !0
              );
            }
            return !1;
          }),
          (t.exports = e);
      },
      {
        "../../commonui/autostreamselector": 10,
        "../../feature/autoPlayDelay": 15,
        "../../feature/keyboardControl": 16,
        "../../lang/index": 20,
        "../../lib/constants": 24,
        "../../lib/cookie": 25,
        "../../lib/dom": 28,
        "../../lib/event": 29,
        "../../lib/object": 37,
        "../../lib/playerutil": 40,
        "../../lib/ua": 42,
        "../../monitor/monitor": 49,
        "../../ui/component": 109,
        "../../ui/component/cover": 113,
        "../../ui/component/play-animation": 119,
        "../../ui/component/progressmarker": 122,
        "../../ui/exports": 139,
        "../service/export": 101,
        "./event/eventmanager": 53,
        "./event/eventtype": 54,
        "./eventHandler/video/index": 68,
        "./plugin/lifecyclemanager": 77,
        "./x5play": 79,
      },
    ],
    75: [
      function (e, t, i) {
        e = e("../../../lib/oo").extend({});
        t.exports = e;
      },
      { "../../../lib/oo": 38 },
    ],
    76: [
      function (e, t, i) {
        t.exports = {
          createEl: "createEl",
          created: "created",
          ready: "ready",
          loading: "loading",
          play: "play",
          pause: "pause",
          playing: "playing",
          waiting: "waiting",
          timeUpdate: "timeupdate",
          error: "error",
          ended: "ended",
          dispose: "dispose",
          markerDotOver: "markerDotOver",
          markerDotOut: "markerDotOut",
        };
      },
      {},
    ],
    77: [
      function (e, t, i) {
        var a = e("../../../lib/object"),
          l = e("../event/eventtype"),
          u = e("./lifecycle"),
          r = e("./status"),
          e = function (r) {
            ((this._player = r)._status = "init"), (this.components = []);
            var e = r.getOptions().components;
            if (e && a.isArray(e) && 0 < e.length)
              for (var t = 0; t < e.length; t++) {
                var i = e[t];
                if (!i)
                  return void console.log(
                    "The " + t + " custome component is " + i
                  );
                if (
                  ((constr = void 0 === i.type ? i : i.type),
                  (args = void 0 === i.args ? [] : i.args),
                  (name = void 0 === i.name ? "" : i.name),
                  !constr)
                )
                  return void console.log(name + " compenent is " + constr);
                args =
                  args && 0 < args.length ? [].concat.call([constr], args) : [];
                var n = new (Function.prototype.bind.apply(constr, args))(),
                  i = n[u.createEl];
                i && "function" == typeof i && i.call(n, r.el(), r),
                  this.components.push({ name: name, obj: n });
              }
            var o = this;
            r.on(l.Private.LifeCycleChanged, function (e) {
              var t = e.paramData,
                i = t.type,
                t = t.data;
              i === l.Video.CanPlayThrough &&
                o._player.trigger(l.Player.TimeUpdate, t.target.currentTime),
                i === l.Video.Ended &&
                  o._player.trigger(
                    l.Player.TimeUpdate,
                    o._player.getDuration()
                  ),
                0 != o.components.length && s.call(o, r, e);
            });
          };
        e.prototype.getComponent = function (e) {
          var t = null,
            i = this.components.length;
          if (e)
            for (var r = 0; r < i; r++)
              if (this.components[r].name == e) {
                t = this.components[r].obj;
                break;
              }
          return t;
        };
        var s = function (e, t) {
            if (t) {
              var t = t.paramData,
                i = t.type,
                r = t.data;
              ((t = i) != l.Video.LoadStart &&
                t != l.Video.LoadedData &&
                t != l.Video.LoadedMetadata) ||
                (i = u.loading),
                c(e, i);
              for (var n = this.components.length, o = 0; o < n; o++) {
                var a = this.components[o].obj,
                  s = a[i];
                s && "function" == typeof s && s.call(a, e, r);
              }
              i == l.Private.Dispose && (this.components = []);
            }
          },
          c = function (e, t) {
            void 0 !== r[t] &&
              (t != r.pause ||
                (e._status != r.error && e._status != r.ended)) &&
              ((t == r.ready && e._status == r.playing) || (e._status = t));
          };
        t.exports = e;
      },
      {
        "../../../lib/object": 37,
        "../event/eventtype": 54,
        "./lifecycle": 76,
        "./status": 78,
      },
    ],
    78: [
      function (e, t, i) {
        t.exports = {
          init: "init",
          ready: "ready",
          loading: "loading",
          play: "play",
          pause: "pause",
          playing: "playing",
          waiting: "waiting",
          error: "error",
          ended: "ended",
        };
      },
      {},
    ],
    79: [
      function (e, t, i) {
        function r(e, t) {
          var i = e.el().style.height,
            r = e.el().style.width;
          e.originalLayout = {
            container: { height: i, width: r },
            video: { width: e.tag.style.width, height: e.tag.style.height },
          };
          var n =
              document.body.clientHeight * (window.devicePixelRatio || 1) +
              "px",
            o = document.body.clientWidth + "px";
          (width = t
            ? ((height = n), o)
            : ((height = i.indexOf("%") ? i : i + "px"),
              r.indexOf("%") ? r : r + "px")),
            (e.tag.style.width = o),
            (e.tag.style.height = n),
            (e.el().style.height = t ? n : height);
        }
        var n = e("../../lib/ua"),
          o = e("../../lib/dom");
        (t.exports.isAndroidX5 = function () {
          return (n.os.android && n.is_X5) || n.dingTalk();
        }),
          (t.exports.adaptX5Play = function (i) {
            n.os.android &&
              n.is_X5 &&
              ("h5" == i._options.x5_type &&
                (i.tag.setAttribute("x5-video-player-type", i._options.x5_type),
                (window.onresize = function () {
                  var e, t;
                  r(
                    i,
                    i._options.x5_fullscreen ||
                      "center" == i._options.x5_video_position
                  ),
                    "landscape" == (e = i)._x5VideoOrientation &&
                      ((e._originalTagWidth = e.tag.style.width),
                      (e._originalTagHeight = e.tag.style.height),
                      (t = document.querySelector(
                        "#" + e.id() + " .prism-controlbar"
                      )) && parseFloat(t.offsetHeight),
                      (e.tag.style.height = "100%"),
                      (e.tag.style.width = window.screen.width + "px"));
                }),
                i.tag.addEventListener("x5videoenterfullscreen", function () {
                  r(
                    i,
                    i._options.x5_fullscreen ||
                      "center" == i._options.x5_video_position
                  ),
                    i.trigger("x5requestFullScreen");
                }),
                i.tag.addEventListener("x5videoexitfullscreen", function () {
                  var e, t;
                  (e = i).originalLayout &&
                    ((t = e.originalLayout),
                    (e.el().style.height = t.container.height),
                    (e.el().style.width = t.container.width),
                    (e.tag.style.width = t.video.width),
                    (e.tag.style.height = t.video.height)),
                    i.trigger("x5cancelFullScreen"),
                    i.fullscreenService.getIsFullScreen() &&
                      i.fullscreenService.cancelFullScreen();
                }),
                i.on("requestFullScreen", function () {
                  "top" == i._options.x5_video_position &&
                    o.removeClass(i.tag, "x5-top-left"),
                    n.os.android &&
                      n.is_X5 &&
                      i._options.x5LandscapeAsFullScreen &&
                      (i.tag.setAttribute("x5-video-orientation", "landscape"),
                      (i._x5VideoOrientation = "landscape"));
                }),
                i.on("cancelFullScreen", function () {
                  "top" == i._options.x5_video_position &&
                    o.addClass(i.tag, "x5-top-left"),
                    n.os.android &&
                      n.is_X5 &&
                      i._options.x5LandscapeAsFullScreen &&
                      (i.tag.setAttribute("x5-video-orientation", "portrait"),
                      r(
                        i,
                        i._options.x5_fullscreen ||
                          "center" == i._options.x5_video_position
                      ),
                      (i._x5VideoOrientation = "portrait"));
                })),
              void 0 !== i._options.x5_fullscreen &&
                i._options.x5_fullscreen &&
                (i.tag.setAttribute(
                  "x5-video-player-fullscreen",
                  i._options.x5_fullscreen
                ),
                o.addClass(i.tag, "x5-full-screen")),
              "top" == i._options.x5_video_position &&
                o.addClass(i.tag, "x5-top-left"),
              void 0 !== i._options.x5_orientation &&
                i.tag.setAttribute(
                  "x5-video-orientation",
                  i._options.x5_orientation
                ));
          });
      },
      { "../../lib/dom": 28, "../../lib/ua": 42 },
    ],
    80: [
      function (e, t, i) {
        var c = e("../../lib/io"),
          d = e("../../config"),
          p = e("../../lib/constants"),
          h = e("../../lib/util"),
          f = e("../../lib/playerutil"),
          _ = (e("../../lib/dom"), e("../../lang/index")),
          y = e("../base/event/eventtype"),
          g = e("../saas/drm"),
          v = e("../../lib/ua");
        t.exports.inject = function (e, t, i, r, o, n, a) {
          var s,
            l = r.source;
          function u(r) {
            var n = this;
            this._drm.load(this._options.source, r.startTime).then(function () {
              if (
                (n.trigger(y.Private.H5_Loading_Hide),
                r.continuePlay &&
                  (n.play(), r.prevVariant && 0 !== r.prevVariant))
              ) {
                for (
                  var e, t = n._drm.getVariantTracks(), i = 0;
                  i < t.length;
                  i++
                )
                  if (t[i].id === r.prevVariant) {
                    e = t[i];
                    break;
                  }
                e && n._drm.selectVariantTrack(e, !0);
              }
            });
          }
          (!n && ((n = l), e._drm || (!f.isDash(n) && !f.isHls(n)))) ||
            ((e._isDrm = !0),
            (e._drm = null),
            (e._isLoadedDrm = !1),
            (e._isFairPlay = v.IS_MAC_SAFARI || v.IS_IOS),
            (e._fairPlayHandlers = {}),
            console.log("use FairPlay", e._isFairPlay),
            (t.prototype._checkDrmReady = function () {
              if (null == e._drm && !e._isFairPlay)
                throw new Error("please invoke this method after ready event");
            }),
            (t.prototype.play = function (e) {
              this._checkDrmReady(), (this._isManualPlay = e || !1);
              return (
                this.trigger(y.Private.Cover_Hide),
                this.tag.ended
                  ? this.replay()
                  : (this.getCurrentTime(), this.tag.paused && this.tag.play()),
                this
              );
            }),
            (t.prototype.initPlay = function (e) {
              if (h.contentProtocolMixed(l)) {
                var t = {
                  mediaId: this._options.vid || "",
                  error_code: p.ErrorCode.InvalidSourceURL,
                  error_msg: "InvalidSourceURL",
                };
                return (
                  (t.display_msg = _.get("Request_Block_Text")),
                  void this.trigger(y.Player.Error, t)
                );
              }
              if (((this._waitingTimeoutCount = 1), this._isFairPlay))
                return (
                  this.trigger(y.Private.H5_Loading_Show),
                  void function (e, t) {
                    var i;
                    this._isFairPlay &&
                      ((i = this).destroy(),
                      g.loadCertificate(this, function () {
                        e && e(),
                          i._initPlayBehavior(t, i._options.source),
                          i._executeReadyCallback();
                      }));
                  }.call(this, o, e)
                );
              function i(n, t) {
                function i() {
                  var e;
                  (n._drm = new shaka.Player(n.tag)),
                    s(n, n._drm),
                    (e = n._options.isLive
                      ? "https://" + f.getLiveHostByRegion(n._options.region)
                      : "https://vod." + n._options.region + ".aliyuncs.com"),
                    n._drm.configure({
                      drm: {
                        servers: {
                          "com.widevine.alpha": e,
                          "com.microsoft.playready": e,
                        },
                      },
                    }),
                    n._drm
                      .getNetworkingEngine()
                      .registerRequestFilter(function (e, t) {
                        shaka.util.StringUtils;
                        var i = shaka.util.Uint8ArrayUtils;
                        e == shaka.net.NetworkingEngine.RequestType.LICENSE &&
                          ((i = i.toBase64(new Uint8Array(t.body))),
                          (i = n._options.isLive
                            ? g.getRequestUrl(i, n)
                            : g.postData(i, n)),
                          (t.uris[0] = i.url),
                          (t.headers["content-type"] =
                            "application/x-www-form-urlencoded"),
                          (t.body = i.data));
                      }),
                    n._drm
                      .getNetworkingEngine()
                      .registerResponseFilter(function (e, t) {
                        var i = shaka.util.StringUtils,
                          r = shaka.util.Uint8ArrayUtils;
                        e == shaka.net.NetworkingEngine.RequestType.LICENSE &&
                          ((i = i.fromUTF8(t.data)),
                          (i = JSON.parse(i)),
                          (i = n._options.isLive
                            ? i.Response.B64License
                            : JSON.parse(i.License).b64License),
                          (t.data = r.fromBase64(i)));
                      }),
                    n._drm.addEventListener("error", function (e) {
                      console.log("errorMessage"),
                        console.log(e.detail.code),
                        console.log(e.detail);
                    }),
                    n._drm.load(n._options.source).then(function () {
                      n._initPlayBehavior(t);
                    }),
                    o && o(n._drm),
                    r && n._executeReadyCallback();
                }
                var r = !n._drm;
                n.destroy(function (e) {
                  try {
                    i();
                  } catch (e) {
                    console.log(e);
                  }
                });
              }
              this._isLoadedDrm && "undefined" != typeof shaka
                ? i(this, e)
                : (this.trigger(y.Private.H5_Loading_Show),
                  function (e) {
                    var t = "aliplayer-drm-min.js",
                      i = "",
                      i = d.domain
                        ? "https://" +
                          d.domain +
                          "/de/prismplayer/" +
                          d.h5Version +
                          "/drm/" +
                          t
                        : "/build/drm/" + t,
                      r = this;
                    c.loadJS(i, function () {
                      shaka.polyfill.installAll(), e.apply(r);
                    });
                  }.call(this, function () {
                    (this._isLoadedDrm = !0), i(this, e);
                  }));
            }),
            (t.prototype.destroy = function (e) {
              var t;
              this._drm
                ? (t = this)._drm.destroy().then(function () {
                    (t._drm = null), "function" == typeof e && e(t);
                  })
                : (this._isFairPlay && this._destroyFairPlay(),
                  "function" == typeof e && e(this));
            }),
            (t.prototype._destroyFairPlay = function () {
              g.destroyFairPlay.call(this);
            }),
            (t.prototype.dispose = function () {
              i.dispose.call(this), this.destroy();
            }),
            (t.prototype._switchLevel = function (e, t) {
              if (
                ((t = t || {}),
                this.trigger(y.Player.LevelSwitch),
                (this._switchedLevel = !0),
                this._isFairPlay)
              ) {
                this._manuallySwitchDrmLevel = !t.isAuto;
                var i = this.autoplay || "pause" != this._status;
                this._loadByUrlInner(e, this.getCurrentTime(), i, !0);
              } else if (t.isAuto)
                this._drm.configure({ abr: { enabled: !0 } });
              else {
                for (
                  var r, n = this._drm.getVariantTracks(), o = 0;
                  o < n.length;
                  o++
                ) {
                  var a = n[o];
                  if (
                    Number(a.bandwidth) === Number(t.bitrate) &&
                    Number(a.height) === Number(t.resolution.split("x")[1])
                  ) {
                    r = a;
                    break;
                  }
                }
                console.log("find track", r),
                  this._drm.configure({ abr: { enabled: !1 } }),
                  this._drm.selectVariantTrack(
                    r,
                    !this._options.seamlessHandover
                  );
              }
              var s = this;
              setTimeout(function () {
                s.trigger(y.Player.LevelSwitched), (this._switchedLevel = !1);
              }, 1e3);
            }),
            (t.prototype._getDRMEncryptItem = function () {
              var e = this._urls;
              if (e && 0 < e.length) {
                for (var t = e.length, i = 0; i < t; i++) {
                  var r = e[i];
                  if (r.Url == this._options.source && +r.encryption) return r;
                }
                return "";
              }
              return "";
            }),
            (t.prototype._getItemBySource = function () {
              var e = this._urls;
              if (e && 0 < e.length) {
                for (var t = e.length, i = 0; i < t; i++) {
                  var r = e[i];
                  if (r.Url == this._options.source) return r;
                }
                return "";
              }
              return "";
            }),
            (s = function (t, i) {
              i.addEventListener("error", function (e) {
                (function (t, i) {
                  var r = "Error code:" + i.code + "message:" + i.message;
                  console.log(r);
                  var n = p.ErrorCode.OtherError,
                    r = _.get("Error_Play_Text");
                  i.code != shaka.util.Error.Code.EXPIRED
                    ? (i.code == shaka.util.Error.Code.HTTP_ERROR
                        ? ((n = p.ErrorCode.NetworkError),
                          (r = _.get("Http_Error")))
                        : i.code == shaka.util.Error.Code.TIMEOUT
                        ? ((n = p.ErrorCode.LoadingTimeout),
                          (r = _.get("Error_Waiting_Timeout_Text")))
                        : i.code == shaka.util.Error.Code.LICENSE_REQUEST_FAILED
                        ? ((n = p.ErrorCode.DrmLicenseRequestFailed),
                          (r = _.get("Error_Drm_License_Request_Failed")))
                        : i.Category == shaka.util.Error.NETWORK &&
                          ((n = p.ErrorCode.NetworkError),
                          (r = _.get("Error_Network_Text"))),
                      (function () {
                        var e;
                        setTimeout(function () {
                          t.trigger(y.Private.Play_Btn_Hide);
                        }),
                          t.checkOnline() &&
                            ((e = {
                              mediaId: t._options.vid || "",
                              error_code: n,
                              error_msg: i.message,
                            }),
                            t.logError(e),
                            (e.display_msg = i.code + "|" + r),
                            t.trigger(y.Player.Error, e));
                      })())
                    : function () {
                        var t = this;
                        this.trigger(y.Private.H5_Loading_Show);
                        var e = null;
                        this._options.isLive || (e = this.getCurrentTime());
                        var i,
                          r = !this.paused(),
                          n = this._drm.getConfiguration().abr.enabled;
                        if (!n)
                          for (
                            var o = this._drm.getVariantTracks(), a = 0;
                            a < o.length;
                            a++
                          )
                            if (o[a].active) {
                              i = o[a].id;
                              break;
                            }
                        var s = {
                          startTime: e,
                          continuePlay: r,
                          prevVariant: i,
                          isAdaptive: n,
                        };
                        "function" == typeof this._options.refreshAccessInfo
                          ? this._options
                              .refreshAccessInfo()
                              .then(function (e) {
                                (e = e || {}).accessKeyId &&
                                  (t._options.accessKeyId = e.accessKeyId),
                                  e.securityToken &&
                                    (t._options.securityToken =
                                      e.securityToken),
                                  e.accessKeySecret &&
                                    (t._options.accessKeySecret =
                                      e.accessKeySecret),
                                  u.call(t, s);
                              })
                          : u.call(t, s);
                      }.call(t);
                })(t, e.detail);
              }),
                i.addEventListener("variantchanged", function (e) {
                  console.log("DRM Event: variantchanged", e);
                }),
                i.addEventListener("abrstatuschanged", function (e) {
                  console.log("DRM Event: abrstatuschanged", e);
                }),
                i.addEventListener("abrstatuschanged", function (e) {
                  console.log("DRM Event: abrstatuschanged", e);
                }),
                i.addEventListener("drmsessionupdate", function (e) {
                  console.log("DRM Event: drmsessionupdate", e);
                }),
                i.addEventListener("expirationupdated", function (e) {
                  console.log("DRM Event: expirationupdated", e),
                    console.log("Exp:", this.getExpiration());
                }),
                i.addEventListener("adaptation", function (e) {
                  console.log("adaptation", e);
                  e = i.getVariantTracks().find(function (e) {
                    return e.active;
                  });
                  console.log("activeTrack", e),
                    t.trigger(y.Private.QualityChange, {
                      levelSwitch: !0,
                      bitrate: e.bandwidth,
                      desc: e.height,
                    });
                });
            }));
        };
      },
      {
        "../../config": 13,
        "../../lang/index": 20,
        "../../lib/constants": 24,
        "../../lib/dom": 28,
        "../../lib/io": 35,
        "../../lib/playerutil": 40,
        "../../lib/ua": 42,
        "../../lib/util": 44,
        "../base/event/eventtype": 54,
        "../saas/drm": 90,
      },
    ],
    81: [
      function (e, t, i) {
        var r = e("../base/player"),
          n = e("./drminjector"),
          o = r.extend({
            init: function (e, t) {
              n.inject(this, o, r.prototype, t, function (e) {}),
                (t._native = !1),
                r.call(this, e, t);
            },
          });
        t.exports = o;
      },
      { "../base/player": 74, "./drminjector": 80 },
    ],
    82: [
      function (e, t, i) {
        var r = e("../../ui/component"),
          n = e("../../lib/data"),
          o = e("../../lib/ua"),
          a = e("../../lib/constants"),
          s = e("../../lib/dom"),
          l = e("../../lib/object"),
          u = e("../../config"),
          c = e("../../lang/index"),
          d = e("../../lib/playerutil"),
          p = e("../../lib/util"),
          h = e("../../ui/component/info-display"),
          f = e("../../ui/component/error-display"),
          _ = e("../../feature/autoPlayDelay"),
          y = e("../../commonui/autostreamselector"),
          g = e("../base/event/eventtype"),
          v = e("../saas/ststoken"),
          e = r.extend({
            init: function (e, t) {
              var i;
              void 0 === t.skinLayout && (t.skinLayout = d.defaultFlashLayout),
                r.call(this, this, t),
                (this._id = "prism-player-" + n.guid()),
                (this.tag = e),
                (this._el = this.tag),
                (this._childrenUI = [f]),
                this.initChildren(),
                (this.id = this._id),
                (window[this.id] = this),
                c.setCurrentLanguage(
                  this._options.language,
                  "flash",
                  this._options.languageTexts
                ),
                p.openInFile()
                  ? ((e = {
                      mediaId: this._options.vid || "",
                      error_code: a.ErrorCode.FormatNotSupport,
                      error_msg: c.get("Open_Html_By_File", "flash"),
                    }),
                    this.trigger(g.Private.Error_Show, e))
                  : o.IS_MOBILE
                  ? this.trigger(g.Private.Error_Show, {
                      mediaId: this._options.vid || "",
                      error_code: a.ErrorCode.FormatNotSupport,
                      error_msg: c.get("Cant_Use_Flash_On_Mobile", "flash"),
                    })
                  : (this._options.vid &&
                    this._options.accessKeyId &&
                    this._options.securityToken &&
                    this._options.accessKeySecret
                      ? v.getPlayAuth(
                          (i = this)._options,
                          function (e) {
                            (i._options.playauth = e), i._createPlayer();
                          },
                          function (e) {
                            var t = {
                              mediaId: i._options.vid,
                              error_code: e.Code,
                              error_msg: e.Message,
                            };
                            e.sri && (t.sri = e.sri),
                              (t.display_msg = e.display_msg),
                              i.trigger(g.Private.Error_Show, t);
                          },
                          "flash"
                        )
                      : this._createPlayer(),
                    (this._status = "init"));
            },
            _createPlayer: function () {
              var e, t;
              this._options.autoPlayDelay
                ? ((t = new _(this)),
                  (e = this),
                  t.handle(function () {
                    (e._options.autoplay = !0),
                      e._initPlayer(),
                      (e._childrenUI = [h, y]),
                      e.initChildren();
                  }))
                : (this._initPlayer(),
                  (this._childrenUI = [h, y]),
                  this.initChildren()),
                o.HAS_FLASH ||
                  ((t = c.get("Flash_Not_Ready", "flash")),
                  this.trigger(g.Private.Info_Show, {
                    text: t,
                    align: "tc",
                    isBlack: !1,
                  }));
            },
            _initPlayer: function () {
              var e =
                "//" +
                u.domain +
                "/de/prismplayer-flash/" +
                u.flashVersion +
                "/PrismPlayer.swf";
              this._options.playerSwfPath
                ? (e = this._options.playerSwfPath)
                : u.domain
                ? -1 < u.domain.indexOf("localhost") &&
                  (e = "//" + u.domain + "/build/flash//PrismPlayer.swf")
                : (e =
                    "de/prismplayer-flash/" +
                    u.flashVersion +
                    "/PrismPlayer.swf");
              var t = this._comboFlashVars(),
                i = this._options.wmode || "opaque";
              this.tag.innerHTML =
                '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" width="100%" height="100%" id="' +
                this.id +
                '"><param name=movie value="' +
                e +
                '"><param name=quality value=High><param name="FlashVars" value="' +
                t +
                '"><param name="WMode" value="' +
                i +
                '"><param name="AllowScriptAccess" value="always"><param name="AllowFullScreen" value="true"><param name="AllowFullScreenInteractive" value="true"><embed name="' +
                this.id +
                '" src="' +
                e +
                '" quality=high pluginspage="//www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="100%" height="100%" AllowScriptAccess="always" AllowFullScreen="true" AllowFullScreenInteractive="true" WMode="' +
                i +
                '" FlashVars="' +
                t +
                '"></embed></object>';
            },
            _getPlayer: function (e) {
              return -1 != navigator.appName.indexOf("Microsoft")
                ? document.getElementById(e)
                : document[e];
            },
            _getLowerQualityLevel: function () {
              var e = this._getVideoUrls();
              if (!e) return "";
              var t = e.Urls,
                e = e.index;
              return !((t && 0 == t.length) || -1 == e) && 0 < e
                ? { item: t[e - 1], index: e - 1 }
                : "";
            },
            _comboFlashVars: function () {
              var e = encodeURIComponent(o.getReferer()),
                t = o.getHref(),
                i = encodeURIComponent(t),
                r = "";
              t && (r = o.getHost(t));
              var t = this._options,
                r = {
                  autoPlay: t.autoplay ? 1 : 0,
                  isInner: 0,
                  actRequest: 1,
                  vid: t.vid,
                  diagnosisButtonVisible: t.diagnosisButtonVisible ? 1 : 0,
                  domain: t.domain || "//tv.taobao.com",
                  statisticService: t.statisticService || u.logReportTo,
                  videoInfoService:
                    t.videoInfoService || "/player/json/getBaseVideoInfo.do",
                  disablePing: t.trackLog ? 0 : 1,
                  namespace: this.id,
                  barMode: 0 != t.barMode ? 1 : 0,
                  isLive: t.isLive ? 1 : 0,
                  waterMark: t.waterMark,
                  environment: t.environment,
                  vurl: t.source ? encodeURIComponent(t.source) : "",
                  plugins: t.plugins || "",
                  snapShotShow: t.snapshot ? 1 : 0,
                  accessId: t.accId || "",
                  accessKey: t.accSecret || "",
                  apiKey: t.apiKey || "",
                  flashApiKey: t.flashApiKey || "",
                  disableSeek: t.disableSeek ? 1 : 0,
                  disableFullScreen: t.disableFullScreen ? 1 : 0,
                  stsToken: t.stsToken || "",
                  domainRegion: t.domainRegion || "",
                  authInfo: t.authInfo ? encodeURIComponent(t.authInfo) : "",
                  playDomain: t.playDomain || "",
                  stretcherZoomType: t.stretcherZoomType || "",
                  playauth: t.playauth ? t.playauth.replace(/\+/g, "%2B") : "",
                  prismType: t.prismType || 0,
                  formats: t.formats || "",
                  notShowTips: t.notShowTips ? 1 : 0,
                  showBarTime: t.showBarTime || 0,
                  showBuffer: 0 == t.showBuffer ? 0 : 1,
                  rePlay: t.rePlay ? 1 : 0,
                  encryp: t.encryp || "",
                  secret: t.secret || "",
                  mediaType: "video",
                  logInfo: {
                    ud: o.getHost(t.source),
                    os: o.os.name,
                    ov: o.os.version || "",
                    et: o.browser.name,
                    ev: o.browser.version || "",
                    uat: o.USER_AGENT,
                    r: e,
                    pu: i,
                    app_n: r,
                  },
                },
                n = [];
              return (
                void 0 !== t.rtmpBufferTime &&
                  (r.rtmpBufferTime = t.rtmpBufferTime),
                t.cover && (r.cover = t.cover),
                t.extraInfo &&
                  (r.extraInfo = encodeURIComponent(
                    JSON.stringify(t.extraInfo)
                  )),
                r.logInfo &&
                  (r.logInfo = encodeURIComponent(JSON.stringify(r.logInfo))),
                (r.languageData = encodeURIComponent(
                  JSON.stringify(c.getLanguageData("flash"))
                )),
                (r.language = c.getCurrentLanguage()),
                l.each(r, function (e, t) {
                  n.push(e + "=" + t);
                }),
                n.join("&")
              );
            },
            initChildren: function () {
              for (var e = this._childrenUI.length, t = 0; t < e; t++) {
                var i = new this._childrenUI[t](this, this._options),
                  r = i.el();
                (r.id = i.id()), this.contentEl().appendChild(r), i.bindEvent();
              }
              var n = document.querySelector(
                "#" + this._options.id + " .prism-info-display"
              );
              s.css(n, "display", "none");
            },
            flashReady: function () {
              (this.flashPlayer = this._getPlayer(this.id)),
                (this._isReady = !0);
              var e = this._options.skinRes,
                t = this._options.skinLayout;
              if (!1 !== t && !l.isArray(t))
                throw new Error(
                  "PrismPlayer Error: skinLayout should be false or type of array!"
                );
              if ("string" != typeof e)
                throw new Error("PrismPlayer Error: skinRes should be string!");
              (t = 0 != t && 0 !== t.length && { skinRes: e, skinLayout: t }),
                this.flashPlayer.setPlayerSkin(t),
                this.trigger("ready");
              var i = this;
              window.addEventListener("beforeunload", function () {
                try {
                  i.flashPlayer.setPlayerCloseStatus();
                } catch (e) {}
              });
            },
            jsReady: function () {
              return !0;
            },
            snapshoted: function (e) {
              var t = p.toBinary(e),
                e = "data:image/jpeg;base64," + e;
              this.trigger("snapshoted", {
                time: this.getCurrentTime(),
                base64: e,
                binary: t,
              });
            },
            uiReady: function () {
              (this._status = "ready"), this.trigger("uiReady");
            },
            loadedmetadata: function () {
              "ended" != this._status &&
                ((this._status = "loading"), this.trigger("loadedmetadata"));
            },
            onPlay: function () {
              (this._status = "play"),
                this.trigger("play"),
                this._clearTimeoutHandle(),
                this.trigger(g.Private.AutoStreamHide);
            },
            onEnded: function () {
              this._clearTimeoutHandle(),
                (this._status = "ended"),
                this.trigger("ended");
            },
            onPause: function () {
              (this._status = "pause"),
                this._clearTimeoutHandle(),
                this.trigger(g.Private.AutoStreamHide),
                this.trigger("pause");
            },
            onBulletScreenReady: function () {
              this.trigger("bSReady");
            },
            onBulletScreenMsgSend: function (e) {
              this.trigger("bSSendMsg", e);
            },
            onVideoRender: function (e) {
              this._clearTimeoutHandle(),
                this.trigger("videoRender"),
                this.trigger("canplay", { loadtime: e });
            },
            onVideoError: function (e) {
              this._clearTimeoutHandle(),
                (this._status = "error"),
                this.trigger("error", { errortype: e });
            },
            onM3u8Retry: function () {
              this.trigger("m3u8Retry");
            },
            hideBar: function () {
              this.trigger("hideBar");
            },
            showBar: function () {
              this.trigger("showBar");
            },
            liveStreamStop: function () {
              this.trigger("liveStreamStop");
            },
            stsTokenExpired: function () {
              (this._status = "error"), this.trigger("stsTokenExpired");
            },
            onVideoBuffer: function () {
              var e;
              "pause" != this._status &&
                ((this._status = "waiting"),
                this.trigger("waiting"),
                this._clearTimeoutHandle(),
                ((e = this)._checkTimeoutHandle = setTimeout(function () {
                  e.trigger(g.Private.AutoStreamShow);
                }, 1e3 * this._options.loadDataTimeout)),
                this._checkVideoStatus());
            },
            startSeek: function (e) {
              this.trigger("startSeek", e);
            },
            completeSeek: function (e) {
              this.trigger("completeSeek", e);
            },
            _invoke: function () {
              var e = arguments[0],
                t = arguments;
              if ((Array.prototype.shift.call(t), !this.flashPlayer))
                throw new Error(
                  "PrismPlayer Error: flash player is not ready\uff0cplease use api after ready event occured!"
                );
              if ("function" != typeof this.flashPlayer[e])
                throw new Error(
                  "PrismPlayer Error: function " + e + " is not found!"
                );
              return this.flashPlayer[e].apply(this.flashPlayer, t);
            },
            play: function () {
              this._invoke("playVideo");
            },
            replay: function () {
              this._invoke("replayVideo");
            },
            pause: function () {
              this._invoke("pauseVideo");
            },
            stop: function () {
              this._invoke("stopVideo");
            },
            seek: function (e) {
              this._invoke("seekVideo", e);
            },
            getCurrentTime: function () {
              return this._invoke("getCurrentTime");
            },
            getDuration: function () {
              return this._invoke("getDuration");
            },
            getStatus: function () {
              return this._status;
            },
            _getVideoUrls: function () {
              var e = this._invoke("getVideoUrls"),
                t = [];
              if (e && e.Urls)
                for (var i = 0; i < e.Urls.length; i++) {
                  var r = e.Urls[i].value,
                    n = r.desc.indexOf("_"),
                    o = c.get(r.definition, "flash");
                  (r.desc = 0 < n ? o + "_" + r.height : o), t.push(r);
                }
              return { Urls: t, index: e.index };
            },
            _getVideoStatus: function () {
              return this._invoke("getVideoStatus");
            },
            _checkVideoStatus: function () {
              var i;
              this.flashPlayer &&
                !this._checkVideoStatusHandler &&
                ((i = this),
                (function t() {
                  i._checkVideoStatusHandler = setTimeout(function () {
                    var e = i._getVideoStatus();
                    "playing" == e.videoStatus && "bufferFull" == e.bufferStatus
                      ? ((i._status = "playing"), i._clearTimeoutHandle())
                      : "videoPlayOver" == e.videoStatus &&
                        ((i._status = "ended"), i._clearTimeoutHandle()),
                      t();
                  }, 500);
                })());
            },
            _clearTimeoutHandle: function () {
              this._checkTimeoutHandle &&
                (clearTimeout(this._checkTimeoutHandle),
                (this._checkTimeoutHandle = null));
            },
            _changeStream: function (e) {
              return this._invoke("changeStream", e);
            },
            mute: function () {
              this.setVolume(0);
            },
            unMute: function () {
              this.setVolume(0.5);
            },
            getVolume: function () {
              return this._invoke("getVolume");
            },
            setVolume: function (e) {
              this._invoke("setVolume", e);
            },
            loadByVid: function (e) {
              this._invoke("loadByVid", e, !1);
            },
            loadByUrl: function (e, t) {
              this._invoke("loadByUrl", e, t);
            },
            dispose: function () {
              this._clearTimeoutHandle(),
                this._checkVideoStatusHandler &&
                  (clearTimeout(this._checkVideoStatusHandler),
                  (this._checkVideoStatusHandler = null)),
                this._invoke("pauseVideo");
              var e = this;
              setTimeout(function () {
                e.off("completeSeek"),
                  e.off("startSeek"),
                  e.off("stsTokenExpired"),
                  e.off("liveStreamStop"),
                  e.off("showBar"),
                  e.off("hideBar"),
                  e.off("m3u8Retry"),
                  e.off("error"),
                  e.off("canplay"),
                  e.off("pause"),
                  e.off("ended"),
                  e.off("play"),
                  e.off("loadedmetadata"),
                  e.off("snapshoted"),
                  e.off("uiReady"),
                  e.off("ready"),
                  (e.flashPlayer = null),
                  e._el && (e._el.innerHTML = "");
              });
            },
            showBSMsg: function (e) {
              this._invoke("showBSMsg", e);
            },
            setToastEnabled: function (e) {
              this._invoke("setToastEnabled", e);
            },
            setLoadingInvisible: function () {
              this._invoke("setLoadingInvisible");
            },
            setPlayerSize: function (e, t) {
              (this._el.style.width = e), (this._el.style.height = t);
            },
          });
        t.exports = e;
      },
      {
        "../../commonui/autostreamselector": 10,
        "../../config": 13,
        "../../feature/autoPlayDelay": 15,
        "../../lang/index": 20,
        "../../lib/constants": 24,
        "../../lib/data": 26,
        "../../lib/dom": 28,
        "../../lib/object": 37,
        "../../lib/playerutil": 40,
        "../../lib/ua": 42,
        "../../lib/util": 44,
        "../../ui/component": 109,
        "../../ui/component/error-display": 114,
        "../../ui/component/info-display": 117,
        "../base/event/eventtype": 54,
        "../saas/ststoken": 95,
      },
    ],
    83: [
      function (e, t, i) {
        var a = e("../../lib/io"),
          u = e("../../config"),
          c = e("../../lib/constants"),
          d = e("../../lib/util"),
          p = e("../../lib/playerutil"),
          h = e("../../lib/ua"),
          f = e("../../lang/index"),
          _ = e("../base/event/eventtype");
        t.exports.inject = function (e, t, i, r, s, n) {
          var l,
            o = r.source;
          (!n && ((n = o), e._flv || !p.isFlv(n))) ||
            ((e._Type = t),
            (e._superType = i),
            (e._superPt = i.prototype),
            (e._disposed = !1),
            (t.prototype._checkFlvReady = function () {
              if (null == e._flv)
                throw new Error("please invoke this method after ready event");
            }),
            (e._isFlv = !0),
            (e._flv = null),
            (e._isLoadedFlv = !1),
            (e._originalUrl = ""),
            (t.prototype.play = function (e) {
              this._checkFlvReady(), (this._isManualPlay = e || !1);
              return (
                this.trigger(_.Private.Cover_Hide),
                this._options.isLive && e
                  ? this._loadByUrlInner(this._options.source, 0, e)
                  : this.tag.ended || this._ended
                  ? this.replay()
                  : (0 == this._seeking &&
                      ((e = 0),
                      this.tag.ended ||
                        this._ended ||
                        (0 == (e = this.getCurrentTime()) && (e = -1)),
                      -1 != e && this.seek(e)),
                    this.tag.paused &&
                      (this._hasLoaded ||
                        (this.getMetaData(), this._flv.load()),
                      this._flv.play())),
                this
              );
            }),
            (t.prototype.seek = function (e) {
              this._checkFlvReady(), (this._seeking = !0);
              var t = this.getDuration();
              t <= (e = Math.floor(e)) && (e = t);
              try {
                this._flv.currentTime = e;
              } catch (e) {
                console.log(e);
              }
              return this;
            }),
            (t.prototype.pause = function (e) {
              return (
                this._checkFlvReady(),
                (this._isManualPause = e || !1),
                this._flv.pause(),
                this
              );
            }),
            (t.prototype.getProgramDateTime = function () {
              if ((this._checkFlvReady(), !this._metadata)) return "";
              var e = this._flv.getFirstSample(),
                e = e && e.pts ? e.pts : 0;
              return (
                console.log(
                  "\u63a8\u6d41\u65f6\u95f4\uff1a" + this._metadata.NtpTime
                ),
                console.log("\u9996\u5e27PTS\uff1a" + e),
                this._metadata.NtpTime + e
              );
            }),
            (t.prototype.initPlay = function (e) {
              if (
                (h.browser.safari && this.trigger(_.Private.Snapshot_Hide),
                d.contentProtocolMixed(o))
              ) {
                var t = {
                  mediaId: this._options.vid || "",
                  error_code: c.ErrorCode.InvalidSourceURL,
                  error_msg: "InvalidSourceURL",
                };
                return (
                  (t.display_msg = f.get("Request_Block_Text")),
                  void this.trigger(_.Player.Error, t)
                );
              }
              function i(t, e) {
                var i = !t._flv;
                t._destroyFlv();
                var r = t._options.isLive,
                  n = {
                    isLive: r,
                    enableWorker: t._options.enableWorker,
                    stashInitialSize: 2048,
                  };
                h.IS_IE11 && (n.enableWorker = !1);
                var o,
                  a = { type: "flv", isLive: r, url: t._options.source };
                for (o in (r
                  ? ((n.enableStashBuffer = t._options.enableStashBufferForFlv),
                    (stashInitialSize = t._options.stashInitialSizeForFlv),
                    (n.autoCleanupSourceBuffer = !1))
                  : (n.lazyLoadMaxDuration = 600),
                t._options.isLive &&
                  (t._options.flvFrameChasing &&
                    (n.flvFrameChasing = t._options.flvFrameChasing),
                  t._options.chasingFirstParagraph &&
                    (n.chasingFirstParagraph =
                      t._options.chasingFirstParagraph),
                  t._options.chasingSecondParagraph &&
                    (n.chasingSecondParagraph =
                      t._options.chasingSecondParagraph),
                  t._options.chasingFirstSpeed &&
                    (n.chasingFirstSpeed = t._options.chasingFirstSpeed),
                  t._options.chasingSecondSpeed &&
                    (n.chasingSecondSpeed = t._options.chasingSecondSpeed)),
                t._options.flvOption))
                  "cors" == o ||
                  "hasAudio" == o ||
                  "withCredentials" == o ||
                  "hasVideo" == o ||
                  "type" == o
                    ? (a[o] = t._options.flvOption[o])
                    : (n[o] = t._options.flvOption[o]);
                (t._originalUrl = t._options.source),
                  (flvjs.LoggingControl.enableAll = t._options.debug),
                  (t._flv = flvjs.createPlayer(a, n)),
                  l(t, t._flv),
                  t._flv.on(flvjs.Events.MEDIA_INFO, function (e) {
                    t._metadata = e.metadata;
                  }),
                  t._flv.on(flvjs.Events.METADATA_ARRIVED, function (e) {
                    e &&
                      e.dataContent &&
                      e.dataContent.length &&
                      t.trigger(_.Private.SeiFrame, {
                        dataContent: e.dataContent,
                        pts: e.pts,
                      });
                  }),
                  t._flv.attachMediaElement(t.tag),
                  t._initPlayBehavior(e) &&
                    ((t._options.preload || t._options.autoplay) &&
                      ((t._hasLoaded = !0), t._flv.load()),
                    t._options.autoplay && !t.tag.paused && t._flv.play(),
                    s && s(t._flv),
                    i &&
                      (t._executeReadyCallback(),
                      t._urls &&
                        0 < t._urls.length &&
                        !t._options.defaultDefinition &&
                        ((t._currentPlayIndex = p.findSelectedStreamLevel(
                          t._urls
                        )),
                        (i = t._urls[t._currentPlayIndex]),
                        (t._options.source = i.Url),
                        t.trigger(_.Private.SourceLoaded, i))));
              }
              (that = this)._isLoadedFlv && "undefined" != typeof Hls
                ? setTimeout(function () {
                    i(that, e);
                  }, 1e3)
                : (this.trigger(_.Private.H5_Loading_Show),
                  function (e, t) {
                    var i = "aliplayer-flv-min.js",
                      r = "",
                      r = u.domain
                        ? "https://" +
                          u.domain +
                          "/de/prismplayer/" +
                          u.h5Version +
                          "/flv/" +
                          i
                        : "/build/flv/" + i,
                      n = this;
                    a.loadJS(r, function () {
                      e.apply(n);
                    });
                  }.call(
                    that,
                    function () {
                      (this._isLoadedFlv = !0), i(this, e);
                    },
                    this._options.debug
                  ));
            }),
            (t.prototype._destroyFlv = function () {
              try {
                this._flv && (this._flv.pause(), this._flv.destroy());
              } catch (e) {
                console.log(e);
              }
              (this.loaded = !1), (this._hasLoaded = !1), (this._flv = null);
            }),
            (t.prototype.dispose = function () {
              this._disposed ||
                ((this._disposed = !0),
                this._superPt && this._superPt.dispose.call(this),
                this._destroyFlv(),
                this._superPt &&
                  ((t.prototype.play = this._superPt.play),
                  (t.prototype.pause = this._superPt.pause),
                  (t.prototype.initPlay = this._superPt.initPlay),
                  (t.prototype.seek = this._superPt.seek),
                  (t.prototype.canSeekable = this._superPt.canSeekable)));
            }),
            (t.prototype.canSeekable = function (e) {
              var t = this._flv.mediaInfo;
              return !(
                !this._flv._isTimepointBuffered(e) &&
                t &&
                !t.hasKeyframesIndex
              );
            }),
            (l = function (s, e) {
              var l = !1;
              e.on(flvjs.Events.ERROR, function (e, t, i) {
                var r,
                  n,
                  o = c.ErrorCode.OtherError,
                  a = f.get("Error_Play_Text");
                e !== flvjs.ErrorTypes.BUFFER_FULL &&
                  (t == flvjs.ErrorDetails.NETWORK_EXCEPTION
                    ? !(n = s.getOptions().source) ||
                      (0 != n.toLowerCase().indexOf("http://") &&
                        0 != n.toLowerCase().indexOf("https://"))
                      ? ((o = c.ErrorCode.InvalidSourceURL),
                        (a = f.get(
                          "Error_Invalidate_Source_Widthout_Protocal"
                        )),
                        (l = !0))
                      : (a = navigator.onLine
                          ? ((o = c.ErrorCode.RequestDataError),
                            f.get("Maybe_Cors_Error"))
                          : ((o = c.ErrorCode.NetworkError),
                            f.get("Error_Network_Text")))
                    : t == flvjs.ErrorDetails.NETWORK_STATUS_CODE_INVALID
                    ? "404" == i.code
                      ? ((o = c.ErrorCode.NotFoundSourceURL),
                        (a = f.get("Error_Not_Found")))
                      : "403" == i.code
                      ? ((o = c.ErrorCode.AuthKeyExpired),
                        (a = f.get("Error_AuthKey_Text")),
                        (l = !0))
                      : ((o = c.ErrorCode.NetworkError),
                        (a = f.get("Error_Network_Text")))
                    : t == flvjs.ErrorDetails.NETWORK_TIMEOUT
                    ? ((o = c.ErrorCode.LoadingTimeout),
                      (a = f.get("Error_Waiting_Timeout_Text")))
                    : (t != flvjs.ErrorDetails.MEDIA_FORMAT_UNSUPPORTED &&
                        t != flvjs.ErrorDetails.MEDIA_CODEC_UNSUPPORTED) ||
                      ((o = c.ErrorCode.FormatNotSupport),
                      (a = f.get("Error_H5_Not_Support_Text")),
                      (l = !0)),
                  (e = function () {
                    var e;
                    setTimeout(function () {
                      s.trigger(_.Private.Play_Btn_Hide);
                    }),
                      s.checkOnline() &&
                        ((e = {
                          mediaId:
                            s._options && s._options.vid ? s._options.vid : "",
                          error_code: o,
                          error_msg: i.msg,
                        }),
                        s.logError(e),
                        (e.display_msg = a),
                        u.cityBrain && (s.flv = null),
                        s.trigger(_.Player.Error, e));
                  }),
                  s._options && s._options.isLive && !l
                    ? (r = s._options).liveRetry > s._liveRetryCount
                      ? (0 == s._liveRetryCount &&
                          s.trigger(_.Player.OnM3u8Retry),
                        (n =
                          r.liveRetryInterval +
                          r.liveRetryStep * s._liveRetryCount),
                        s._liveRetryCount++,
                        setTimeout(function () {
                          s._loadByUrlInner(r.source);
                        }, 1e3 * n))
                      : (s._liveErrorHandle && clearTimeout(s._liveErrorHandle),
                        s.trigger(_.Player.LiveStreamStop),
                        (s._liveErrorHandle = setTimeout(e, 500)))
                    : t === flvjs.ErrorDetails.MEDIA_MSE_ERROR &&
                      11 === i.code &&
                      s.getCurrentTime() < s.getDuration()
                    ? (s._flv.unload(),
                      s._flv.load(),
                      s._flv.detachMediaElement(),
                      s._flv.attachMediaElement(s.tag))
                    : s._reloadForVod() || e());
              });
            }));
        };
      },
      {
        "../../config": 13,
        "../../lang/index": 20,
        "../../lib/constants": 24,
        "../../lib/io": 35,
        "../../lib/playerutil": 40,
        "../../lib/ua": 42,
        "../../lib/util": 44,
        "../base/event/eventtype": 54,
      },
    ],
    84: [
      function (e, t, i) {
        var r = e("../base/player"),
          n = e("./flvinjector"),
          o = r.extend({
            init: function (e, t) {
              n.inject(this, o, r, t, function (e) {}),
                (t._native = !1),
                r.call(this, e, t);
            },
          });
        t.exports = o;
      },
      { "../base/player": 74, "./flvinjector": 83 },
    ],
    85: [
      function (e, t, i) {
        var c = e("../../lib/io"),
          d = e("../../config"),
          p = e("../../lib/constants"),
          h = e("../../lib/util"),
          f = e("../../lib/playerutil"),
          _ = e("../../lib/ua"),
          y = e("../../lang/index"),
          g = e("../base/event/eventtype"),
          v = e("../../lib/hls/hlsparse");
        function m() {
          this &&
            this._hls &&
            (this._hls.stopLoad(), this._hls.destroy(), (this._hls = null));
        }
        t.exports.inject = function (e, t, i, r, o, s) {
          e._hls2 = !1;
          var a,
            l = r.source,
            n = r.useHlsPluginForSafari,
            u = r.useHlsPlugOnMobile;
          (o ||
            s ||
            ((r = l),
            (n = n),
            (u = u),
            !e._hls &&
              f.isHls(r) &&
              (!f.canPlayHls() ||
                f.isSafariUsedHlsPlugin(n) ||
                (u && f.isUsedHlsPluginOnMobile())))) &&
            ((e._Type = t),
            (e._superType = i),
            (e._superPt = i.prototype),
            (e._disposed = !1),
            (t.prototype._checkHlsReady = function () {
              if (null == e._hls)
                throw new Error("please invoke this method after ready event");
            }),
            (e._isHls = !0),
            (e._hls = null),
            (e._isLoadedHls = !1),
            (e._stopLoadAsPaused = !0),
            (t.prototype.play = function (e) {
              this._checkHlsReady(), (this._isManualPlay = e || !1);
              return (
                this.trigger(g.Private.Cover_Hide),
                this._options.autoplay ||
                  this._options.preload ||
                  this._loadSourced ||
                  ((this._loadSourced = !0),
                  (this._options._autoplay = !0),
                  this._hls.loadSource(this._options.source)),
                this.tag.ended || this._ended
                  ? this.replay()
                  : this.tag.paused &&
                    (this.tag.play(),
                    this._stopLoadAsPaused &&
                      ((e = this.getCurrentTime()), this._hls.startLoad(e))),
                this
              );
            }),
            (t.prototype.replay = function () {
              return (
                this._monitor && this._monitor.replay(),
                this._hls.startLoad(0),
                this.tag.play(),
                this
              );
            }),
            (t.prototype.pause = function (e) {
              return (
                this.tag &&
                  (this._checkHlsReady(),
                  this.tag.pause(),
                  this._stopLoadAsPaused && this._hls.stopLoad()),
                (this._isManualPause = e || !1),
                this
              );
            }),
            (t.prototype.stop = function () {
              return (
                this._checkHlsReady(),
                this.tag.setAttribute("src", null),
                this._hls.stopLoad(),
                this
              );
            }),
            (t.prototype.seek = function (e) {
              this._checkHlsReady();
              try {
                this._superPt.seek.call(this, e),
                  this.tag.paused &&
                    this._stopLoadAsPaused &&
                    this._hls.startLoad(e);
              } catch (e) {
                console.log(e);
              }
              return this;
            }),
            (t.prototype.getProgramDateTime = function () {
              if ((this._checkHlsReady(), -1 == this._hls.currentLevel))
                return "";
              var e = this._hls.currentLevel,
                e = this._hls.levels[e].details;
              if (e) {
                e = e.programDateTime;
                if ((console.log("ProgramDateTime=" + e), e))
                  return new Date(e).valueOf();
              }
              return 0;
            }),
            (t.prototype.getCurrentPDT = function () {
              if ((this._checkHlsReady(), -1 == this._hls.currentLevel))
                return "";
              var e = this._hls.streamController.fragPlaying || {},
                t = e.pdt;
              if (!t) return 0;
              e = 1e3 * e.startPTS;
              return t + (1e3 * this.getCurrentTime() - e);
            }),
            (t.prototype._reloadAndPlayForM3u8 = function () {
              0 == this._liveRetryCount && this.trigger(g.Player.OnM3u8Retry),
                this._liveRetryCount++;
            }),
            (t.prototype._switchLevel = function (e) {
              var t = this.getCurrentTime(),
                i =
                  !this._qualityService.levels.length && 1 < this._urls.length;
              i &&
                (this.pause(),
                this._hls.stopLoad(),
                this._hls.detachMedia(),
                this._hls.destroy()),
                this.trigger(g.Player.LevelSwitch);
              var r = this._hls.levels,
                n = !0;
              i && this._loadByUrlInner(e, t, n, !0);
              for (var o = 0; o < r.length; o++)
                if (r[o].url == e || r[o].url[0] == e) {
                  (n = !1),
                    this._hls2 && this._options.seamlessHandover
                      ? ((this._hls.loadLevel = o),
                        console.log("Seamlessly set nextLevel to", o))
                      : ((this._hls.currentLevel = o),
                        console.log("Immediately set currentLevel to", o));
                  break;
                }
              n && (this._hls.currentLevel = -1), (this._switchedLevel = !0);
              var a = this;
              setTimeout(function () {
                a.trigger(g.Player.LevelSwitched), (this._switchedLevel = !1);
              }, 1e3);
            }),
            (t.prototype._getHlsVersion = function (r) {
              if (!0 === this._options.useHls2)
                return (this._hls2 = !0), void r();
              if (!1 !== this._options.useHls2)
                if (this._options.isLive)
                  if (s) r();
                  else {
                    if (this._options.lowLatencyMode)
                      return (this._hls2 = !0), void r();
                    var n = this,
                      o = new v();
                    o.load(
                      l,
                      function (e) {
                        var t, i;
                        e.levels && 0 !== e.levels.length
                          ? (t = e.levels[0].url)
                          : ((t = l), (i = e.string)),
                          o.loadMediaPlaylist(
                            { url: t, string: i },
                            function (e) {
                              e && (n._hls2 = "number" == typeof e.partTarget),
                                r();
                            },
                            a.bind(n)
                          );
                      },
                      a.bind(n)
                    );
                  }
                else r();
              else r();
              function a() {
                var e = {
                  mediaId:
                    this._options && this._options.vid ? this._options.vid : "",
                  error_code: p.ErrorCode.NotFoundSourceURL,
                  error_msg: "m3u8 load failed in pre-parser",
                };
                this.logError(e),
                  (e.display_msg =
                    y.get("Error_Network_Text") +
                    "(m3u8 load failed in pre-parser)"),
                  this.trigger(g.Player.Error, e);
              }
            }),
            (t.prototype.initPlay = function (t) {
              if (h.contentProtocolMixed(l)) {
                var e = {
                  mediaId: this._options.vid || "",
                  error_code: p.ErrorCode.InvalidSourceURL,
                  error_msg: "InvalidSourceURL",
                };
                return (
                  (e.display_msg = y.get("Request_Block_Text")),
                  void this.trigger(g.Player.Error, e)
                );
              }
              var i = this;
              function r(s, t) {
                var i = !s._hls;
                s._destroyHls();
                var e,
                  r = {
                    xhrSetup: function (e, t) {
                      e.withCredentials = s._options.withCredentials || !1;
                    },
                  },
                  n = s._options.loadingTimeOut || s._options.hlsLoadingTimeOut;
                for (e in (n &&
                  ((r.manifestLoadingTimeOut = n),
                  (r.levelLoadingTimeOut = n),
                  (r.fragLoadingTimeOut = n)),
                s._options.liveSyncDurationCount &&
                  (r.liveSyncDurationCount = s._options.liveSyncDurationCount),
                s._options.defaultBandwidth &&
                  (r.defaultBandwidth = s._options.defaultBandwidth),
                s._options.isLive &&
                  (s._options.hlsFrameChasing &&
                    (r.hlsFrameChasing = s._options.hlsFrameChasing),
                  s._options.chasingFirstParagraph &&
                    (r.chasingFirstParagraph =
                      s._options.chasingFirstParagraph),
                  s._options.chasingSecondParagraph &&
                    (r.chasingSecondParagraph =
                      s._options.chasingSecondParagraph),
                  s._options.chasingFirstSpeed &&
                    (r.chasingFirstSpeed = s._options.chasingFirstSpeed),
                  s._options.chasingSecondSpeed &&
                    (r.chasingSecondSpeed = s._options.chasingSecondSpeed)),
                s._hls2 &&
                  s._options.isLive &&
                  (_.IS_IE11 ||
                    ((r.backBufferLength = 12), (r.liveDurationInfinity = !0))),
                s._options.nudgeMaxRetry &&
                  (r.nudgeMaxRetry = s._options.nudgeMaxRetry),
                s._options.maxMaxBufferLength &&
                  (r.maxMaxBufferLength = s._options.maxMaxBufferLength),
                s._options.maxBufferSize &&
                  (r.maxBufferSize = s._options.maxBufferSize),
                s._options.fragLoadingRetryDelay &&
                  (r.fragLoadingRetryDelay = s._options.fragLoadingRetryDelay),
                s._options.maxBufferLength &&
                  (r.maxBufferLength = s._options.maxBufferLength),
                s._options.hlsBandWidthUpCacheTime &&
                  (r.abrBandWidthUpCacheTime =
                    s._options.hlsBandWidthUpCacheTime),
                s._options.seamlessHandover &&
                  (r.seamlessHandover = s._options.seamlessHandover),
                s._options.accessKeyId &&
                  (r.accessKeyId = s._options.accessKeyId),
                s._options.accessKeySecret &&
                  (r.accessKeySecret = s._options.accessKeySecret),
                s._options.securityToken &&
                  (r.securityToken = s._options.securityToken),
                s._options.app && (r.app = s._options.app),
                s._options.stream && (r.stream = s._options.stream),
                s._options.domain && (r.domain = s._options.domain),
                s._options.regionId && (r.regionId = s._options.regionId),
                o && (r._sce_dlgtqredxx = o),
                (r.enableWorker = s._options.enableWorker),
                (r.debug = s._options.debug),
                (s._stopLoadAsPaused = s._options.hlsOption.stopLoadAsPaused),
                s._options.hlsOption))
                  r[e] = s._options.hlsOption[e];
                _.IS_IE11 && (r.enableWorker = !1),
                  (s._hls = new Hls(r)),
                  a(s, s._hls),
                  (s._loadSourced = !1),
                  s._hls.attachMedia(s.tag),
                  s._hls.on(Hls.Events.INIT_PTS_FOUND, function (e, t) {
                    s._initPTS = t.initPTS;
                  }),
                  s._hls.on(Hls.Events.FRAG_PARSING_USERDATA, function (e, t) {
                    t &&
                      t.dataContent &&
                      t.dataContent.length &&
                      s.trigger(g.Private.SeiFrame, {
                        dataContent: t.dataContent,
                        pts: t.pts,
                      });
                  }),
                  s._hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                    var e;
                    s._hls.on(Hls.Events.MANIFEST_PARSED, function () {
                      s._initPlayBehavior(t || s._loadSourced);
                    }),
                      s._hls.on(
                        Hls.Events.AUDIO_TRACKS_UPDATED,
                        function (e, t) {
                          s.trigger(g.Player.AudioTrackUpdated, t);
                        }
                      ),
                      s._hls.on(Hls.Events.MANIFEST_LOADED, function (e, t) {
                        s.trigger(g.Player.LevelsLoaded, t);
                      }),
                      s._hls.on(Hls.Events.LEVEL_SWITCHED, function (e, t) {
                        if (s._qualityService) {
                          for (
                            var i = s._hls.levels[t.level].url,
                              r = s._qualityService.levels,
                              n = "",
                              o = "",
                              a = 0;
                            a < r.length;
                            a++
                          )
                            if (r[a].Url == i) {
                              (o = r[a].desc), (n = r[a].bitrate);
                              break;
                            }
                          (o || n) &&
                            s.trigger(g.Private.QualityChange, {
                              levelSwitch: !0,
                              url: i,
                              bitrate: n,
                              desc: o,
                            });
                        }
                      }),
                      s._hls.on(Hls.Events.AUDIO_TRACK_SWITCH, function (e, t) {
                        s.trigger(g.Player.AudioTrackSwitch, t),
                          setTimeout(function () {
                            s.trigger(g.Player.AudioTrackSwitched, t);
                          }, 1e3);
                      }),
                      (s._options.autoplay || s._options.preload || t) &&
                        ((s._loadSourced = !0),
                        s._levels && 1 < s._levels.length
                          ? (s._hls.trigger(Hls.Events.MANIFEST_LOADING, {}),
                            s._hls.trigger(Hls.Events.MANIFEST_LOADED, {
                              levels: s._levels,
                            }))
                          : s._hls.loadSource(s._options.source)),
                      i
                        ? (s._executeReadyCallback(),
                          s._urls &&
                            0 < s._urls.length &&
                            !s._options.defaultDefinition &&
                            ((s._currentPlayIndex = f.findSelectedStreamLevel(
                              s._urls
                            )),
                            (e = s._urls[s._currentPlayIndex]),
                            (s._options.source = e.Url),
                            s.trigger(g.Private.SourceLoaded, e)))
                        : s.trigger(g.Private.H5_Loading_Show);
                  });
              }
              this._isLoadedHls && "undefined" != typeof Hls
                ? r(this, t)
                : (this.trigger(g.Private.H5_Loading_Show),
                  this._getHlsVersion(function (e) {
                    !function (e, t) {
                      var i = "aliplayer-hls-min.js";
                      (t = t || {}).hls2 && (i = "aliplayer-hls2-min.js");
                      var t = "",
                        t = d.domain
                          ? "https://" +
                            d.domain +
                            "/de/prismplayer/" +
                            d.h5Version +
                            "/hls/" +
                            i
                          : "/build/hls/" + i,
                        r = this;
                      c.loadJS(t, function () {
                        e.apply(r);
                      });
                    }.call(
                      i,
                      function () {
                        (i._isLoadedHls = !0), r(i, t);
                      },
                      { debug: i._options.debug, hls2: i._hls2 }
                    );
                  }),
                  this.on("error", m));
            }),
            (t.prototype._getbwEstimator = function () {
              var e,
                t = NaN;
              return (t = this._hls
                ? (e = this._hls.abrController._bwEstimator)
                  ? e.getEstimate()
                  : NaN
                : t);
            }),
            (t.prototype._destroyHls = function () {
              this._hls && this._hls.destroy(), (this._hls = null);
            }),
            (t.prototype.dispose = function () {
              this._disposed ||
                ((this._disposed = !0),
                this._superPt && this._superPt.dispose.call(this),
                this._destroyHls(),
                this._superPt &&
                  ((t.prototype.play = this._superPt.play),
                  (t.prototype.pause = this._superPt.pause),
                  (t.prototype.initPlay = this._superPt.initPlay),
                  (t.prototype.replay = this._superPt.replay),
                  (t.prototype.stop = this._superPt.stop),
                  (t.prototype.seek = this._superPt.seek),
                  (t.prototype.dispose = this._superPt.dispose)));
            }),
            (a = function (l, u) {
              u.on(Hls.Events.DEFAULT_BANDWIDTH, function (e, t) {
                l.trigger(g.Player.DefaultBandWidth, {
                  width: t.width,
                  height: t.height,
                  bitrate: t.bitrate,
                });
              }),
                u.on(Hls.Events.ERROR, function (e, t) {
                  var i, r, n, o, a, s;
                  !l._options ||
                    t.details == Hls.ErrorDetails.FRAG_LOOP_LOADING_ERROR ||
                    1 == l._seeking ||
                    (0 == t.fatal && t.type != Hls.ErrorTypes.NETWORK_ERROR) ||
                    (l._clearTimeout(),
                    (i = p.ErrorCode.LoadedMetadata),
                    (n = y.get("Error_Play_Text")),
                    (s = r = !1),
                    t.details == Hls.ErrorDetails.MANIFEST_LOAD_ERROR ||
                    t.details == Hls.ErrorDetails.LEVEL_LOAD_ERROR
                      ? ((r = !0),
                        t.networkDetails,
                        t.response
                          ? (n =
                              "404" == t.response.code
                                ? ((i = p.ErrorCode.NotFoundSourceURL),
                                  y.get("Error_Not_Found"))
                                : "403" == t.response.code
                                ? ((i = p.ErrorCode.AuthKeyExpired),
                                  y.get("Error_AuthKey_Text"))
                                : "0" == t.response.code && navigator.onLine
                                ? ((i = p.ErrorCode.RequestDataError),
                                  n + "\uff0c" + y.get("Maybe_Cors_Error"))
                                : y.get("Error_Load_M3U8_Failed_Text"))
                          : l.liveShiftSerivce &&
                            l.liveShiftSerivce.isLiveShiftPlaying() &&
                            404 === t.networkDetails.status
                          ? ((i = p.ErrorCode.NotFoundSourceURL),
                            (n = y.get("Error_Liveshift_M3U8_Not_Found_Text")),
                            (s = !0))
                          : (n = y.get("Error_Load_M3U8_Failed_Text")))
                      : t.details == Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT ||
                        t.details == Hls.ErrorDetails.LEVEL_LOAD_TIMEOUT
                      ? ((r = !0), (n = y.get("Error_Load_M3U8_Timeout_Text")))
                      : t.details == Hls.ErrorDetails.MANIFEST_PARSING_ERROR ||
                        t.details ==
                          Hls.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR
                      ? ((r = !0), (n = y.get("Error_M3U8_Decode_Text")))
                      : t.type == Hls.ErrorTypes.NETWORK_ERROR
                      ? ((i = p.ErrorCode.NetworkError),
                        (n = y.get("Error_Network_Text")))
                      : (t.type != Hls.ErrorTypes.MUX_ERROR &&
                          t.type != Hls.ErrorTypes.MEDIA_ERROR) ||
                        ((i = p.ErrorCode.PlayDataDecode),
                        (n = y.get("Error_TX_Decode_Text"))),
                    (n = n + "(" + t.details + ")"),
                    (o = function () {
                      var e;
                      l.pause(),
                        setTimeout(function () {
                          l.trigger(g.Private.Play_Btn_Hide);
                        }),
                        l.checkOnline() &&
                          ((e = {
                            mediaId:
                              l._options && l._options.vid
                                ? l._options.vid
                                : "",
                            error_code: i,
                            error_msg: t.details,
                          }),
                          l.logError(e),
                          (e.display_msg = n),
                          l.trigger(g.Player.Error, e));
                    }),
                    (a = function () {
                      l._liveErrorHandle && clearTimeout(l._liveErrorHandle),
                        u.stopLoad(),
                        l.trigger(g.Player.LiveStreamStop),
                        (l._liveErrorHandle = setTimeout(o, 500));
                    }),
                    l._options && l._options.isLive
                      ? s
                        ? a()
                        : l._hls2
                        ? t.fatal && a()
                        : (s = l._options).liveRetry > l._liveRetryCount
                        ? (0 == l._liveRetryCount &&
                            l.trigger(g.Player.OnM3u8Retry),
                          (s =
                            s.liveRetryInterval +
                            s.liveRetryStep * l._liveRetryCount),
                          l._liveRetryCount++,
                          l.trigger(g.Private.H5_Loading_Show),
                          setTimeout(function () {
                            r && l._loadByUrlInner(l._options.source, 0, !0);
                          }, 1e3 * s))
                        : a()
                      : l._reloadForVod() || o());
                });
            }));
        };
      },
      {
        "../../config": 13,
        "../../lang/index": 20,
        "../../lib/constants": 24,
        "../../lib/hls/hlsparse": 34,
        "../../lib/io": 35,
        "../../lib/playerutil": 40,
        "../../lib/ua": 42,
        "../../lib/util": 44,
        "../base/event/eventtype": 54,
      },
    ],
    86: [
      function (e, t, i) {
        var r = e("../base/player"),
          n = e("./hlsinjector"),
          o = r.extend({
            init: function (e, t) {
              (t._native = !1), n.inject(this, o, r, t), r.call(this, e, t);
            },
          });
        t.exports = o;
      },
      { "../base/player": 74, "./hlsinjector": 85 },
    ],
    87: [
      function (e, t, i) {
        var l = e("../../lib/io"),
          u = e("../../config"),
          c = e("../../lib/constants"),
          d = e("../../lang/index"),
          p = e("../base/event/eventtype");
        function h() {
          var r = this;
          return (
            this.trigger(p.Private.H5_Loading_Show),
            this.trigger(p.Private.Play_Btn_Hide),
            r._rts
              .subscribe(r._options.source)
              .then(function (e) {
                return (
                  r._retryTimer &&
                    (clearTimeout(r._retryTimer), (r._retryTimer = null)),
                  (r.tag.srcObject = null),
                  e.play(r.tag),
                  !0
                );
              })
              .catch(function (e) {
                var t = null,
                  i = null;
                switch (Number(e.errorCode)) {
                  case 10101:
                    (t = c.ErrorCode.RtsSignalError),
                      (i = d.get("Rts_Err_Http_Signal_Error"));
                    break;
                  case 10114:
                    (t = c.ErrorCode.RtsCreateOfferError),
                      (i = d.get("Rts_Err_Create_Offer_Error"));
                    break;
                  case 10202:
                    (t = c.ErrorCode.RtsPlayUrlError),
                      (i = d.get("Rts_Err_Play_Url_Error"));
                    break;
                  case 10203:
                    (t = c.ErrorCode.RtsSubscribeNonthing),
                      (i = d.get("Rts_Err_Subscribe_Nonthing"));
                    break;
                  case 10205:
                    (t = c.ErrorCode.RtsHttpRequestFaild),
                      (i = d.get("Rts_Err_Http_Request_Failed"));
                    break;
                  case 10206:
                    (t = c.ErrorCode.RtsHttpAnswerFaild),
                      (i = d.get("Rts_Err_Http_Answer_Failed"));
                }
                e = { error_code: t, error_msg: i };
                return (
                  null !== e.error_code &&
                    null !== e.error_msg &&
                    r.trigger(p.Player.Error, e),
                  !1
                );
              })
          );
        }
        function f() {
          this._noDataTimer &&
            (clearTimeout(this._noDataTimer), (this._noDataTimer = null));
        }
        t.exports.inject = function (e, t, i, r, n, o) {
          function s(e, t) {
            var i, r, n;
            f.call(this),
              this._retryTimer ||
                ((e = e || c.ErrorCode.RtsPlayFailedError),
                (t = t || d.get("Rts_Err_Play_Failed")),
                (r = (i = this)._options)
                  ? r.liveRetry > i._liveRetryCount
                    ? (0 == i._liveRetryCount &&
                        i.trigger(p.Player.OnM3u8Retry),
                      (n =
                        Number(r.liveRetryInterval || 0) +
                        Number(r.liveRetryStep * i._liveRetryCount || 0)),
                      i._liveRetryCount++,
                      i.stop(),
                      setTimeout(function () {
                        i.trigger(p.Private.H5_Loading_Show),
                          i.trigger(p.Private.Play_Btn_Hide);
                      }, 50),
                      (i._retryTimer = setTimeout(function () {
                        i.trigger(p.Private.Retry, {
                          type: "rts",
                          source: r.source,
                        }),
                          h.call(i);
                      }, 1e3 * n)))
                    : (i._retryTimer && clearTimeout(i._retryTimer),
                      i._liveErrorHandle && clearTimeout(i._liveErrorHandle),
                      i.trigger(p.Player.LiveStreamStop),
                      (i._liveErrorHandle = setTimeout(
                        a.call(this, e, t),
                        500
                      )),
                      i.stop(),
                      (i._liveRetryCount = 0))
                  : console.warn("no options!"));
          }
          function a(e, t) {
            var i = this;
            i.pause(),
              setTimeout(function () {
                i.trigger(p.Private.Play_Btn_Hide);
              }),
              i.checkOnline() &&
                (i.logError((t = { error_code: e, error_msg: t })),
                i.trigger(p.Player.Error, t));
          }
          (e._Type = t),
            (e._superType = i),
            (e._superPt = i.prototype),
            (e._disposed = !1),
            (t.prototype._checkRtsReady = function () {
              if (null == e._rts)
                throw new Error("please invoke this method after ready event");
            }),
            (e._isRts = !0),
            (e._rts = null),
            (e._isLoadedRts = !1),
            (e._liveErrorHandle = null),
            (e._retryTimer = null),
            (e._noDataTimer = null),
            (e.bind_rtsPlayEventHandler = null),
            (e.bind_rtsErrorEventHandler = null),
            (t.prototype.play = function (e) {
              this._checkRtsReady(), (this._isManualPlay = e || !1);
              var t = this;
              return (
                t.trigger(p.Private.Cover_Hide),
                t.trigger(p.Private.Play_Btn_Hide),
                h.call(t).then(function (e) {
                  e && t._startPlay();
                }),
                this
              );
            }),
            (t.prototype.seek = function (e) {}),
            (t.prototype.setSpeed = function (e) {}),
            (t.prototype.pause = function (e) {
              return (
                this._checkRtsReady(), this._superPt.pause.call(this, !0), this
              );
            }),
            (t.prototype.stop = function () {
              return this._rts && this._rts.unsubscribe(), this;
            }),
            (t.prototype.dispose = function () {
              this._disposed ||
                ((this._disposed = !0),
                this._superPt && this._superPt.dispose.call(this),
                this._destroyRts(),
                this._superPt,
                this._liveErrorHandle &&
                  (clearTimeout(this._liveErrorHandle),
                  (this._liveErrorHandle = null)),
                this._retryTimer &&
                  (clearTimeout(this._retryTimer), (this._retryTimer = null)),
                f.call(this));
            }),
            (t.prototype._destroyRts = function () {
              this._rts &&
                (this.stop(),
                this._rts.off("onError", this.bind_rtsErrorEventHandler),
                this._rts.off("onPlayEvent", this.bind_rtsPlayEventHandler)),
                (this._rts = null);
            }),
            (t.prototype.initPlay = function (e) {
              function t(r, t) {
                var i = !r._rts;
                r._destroyRts(),
                  (r._rts = new AliRTS.createClient()),
                  r._checkRtsSupport(
                    function (e) {
                      n.call(r, r._rts),
                        r._options.autoplay
                          ? h.call(r).then(function (e) {
                              e && r._initPlayBehavior(t);
                            })
                          : r._initPlayBehavior(t),
                        i && r._executeReadyCallback();
                    },
                    function (e) {
                      console.log("[RTS isSupport error]", e);
                      var t = null,
                        i = null;
                      switch (Number(e.errorCode)) {
                        case 10110:
                          (t = c.ErrorCode.RtsNotSupportWebRtc),
                            (i = d.get("Rts_Err_Not_Support_Webrtc"));
                          break;
                        case 10111:
                          (t = c.ErrorCode.RtsBrowserNotSupport),
                            (i = d.get("Rts_Err_Browser_Not_Support"));
                          break;
                        case 10112:
                          (t = c.ErrorCode.RtsBrowserVersionTooLow),
                            (i = d.get("Rts_Err_Browser_Version_Too_Low"));
                          break;
                        case 10113:
                          (t = c.ErrorCode.RtsNotSupportH264),
                            (i = d.get("Rts_Err_Not_Support_H264"));
                          break;
                        case 10114:
                          (t = c.ErrorCode.RtsCreateOfferError),
                            (i = d.get("Rts_Err_Create_Offer_Error"));
                      }
                      return (
                        r.trigger(p.Player.Error, {
                          error_code: t,
                          error_msg: i,
                        }),
                        !1
                      );
                    }
                  );
              }
              this._isLoadedRts
                ? t(this, e)
                : (this.trigger(p.Private.H5_Loading_Show),
                  function (e, t) {
                    var i = this._options.rtsVersion || u.rtsVersion,
                      r = this;
                    l.loadJS(
                      "https://g.alicdn.com/CodeBaseOne/H5RTSSdk/" +
                        i +
                        "/aliyun-rts-sdk.js",
                      function () {
                        e.apply(r);
                      }
                    );
                  }.call(
                    this,
                    function () {
                      (this._isLoadedRts = !0), t(this, e);
                    },
                    this._options.debug
                  ));
              var n = function (e) {
                var t = this._rtsPlayEventHandler.bind(this),
                  i = this._rtsErrorEventHandler.bind(this);
                (this.bind_rtsPlayEventHandler = t),
                  (this.bind_rtsErrorEventHandler = i),
                  e.on("onError", i),
                  e.on("onPlayEvent", t);
              };
            }),
            (t.prototype._rtsPlayEventHandler = function (e) {
              var t = this,
                i = "canplay",
                r = "waiting",
                n = "playing",
                o = "media",
                a = "ended";
              e.event === i
                ? f.call(this)
                : e.event === r ||
                  (e.event === n
                    ? f.call(this)
                    : e.event === o
                    ? (n = e.data) &&
                      ((o = !1),
                      n.audio &&
                        n.video &&
                        0 == n.audio.bytesReceivedPerSecond &&
                        0 == n.video.bytesReceivedPerSecond &&
                        (o = !0),
                      n.audio &&
                        !n.video &&
                        0 == n.audio.bytesReceivedPerSecond &&
                        (o = !0),
                      (o =
                        !n.audio &&
                        n.video &&
                        0 == n.video.bytesReceivedPerSecond
                          ? !0
                          : o)
                        ? this._noDataTimer ||
                          (this._noDataTimer = setTimeout(function () {
                            s.call(t);
                          }, 5e3))
                        : f.call(this))
                    : e.event === a && s.call(this));
            }),
            (t.prototype._checkRtsSupport = function (e, t) {
              this._options.skipRtsSupportCheck
                ? e()
                : this._rts.isSupport({ isReceiveVideo: !0 }).then(e).catch(t);
            }),
            (t.prototype._rtsErrorEventHandler = function (e) {
              console.log("RTS Error:", e);
              var t, i;
              switch (Number(e.errorCode)) {
                case 10102:
                  s.call(this);
                  break;
                case 12e3:
                  (t = c.ErrorCode.RtsPeerConnectionUnknown),
                    (i = d.get("Rts_Err_PeerConnection_Unknown")),
                    a.call(this, t, i);
              }
            });
        };
      },
      {
        "../../config": 13,
        "../../lang/index": 20,
        "../../lib/constants": 24,
        "../../lib/io": 35,
        "../base/event/eventtype": 54,
      },
    ],
    88: [
      function (e, t, i) {
        var r = e("../base/player"),
          n = e("./rtsinjector"),
          o = r.extend({
            init: function (e, t) {
              t.isLive &&
                ((t._native = !1), n.inject(this, o, r, t), r.call(this, e, t));
            },
          });
        t.exports = o;
      },
      { "../base/player": 74, "./rtsinjector": 87 },
    ],
    89: [
      function (e, t, i) {
        var r = e("../../lib/constants"),
          e = e("../../lib/oo").extend({
            init: function (e) {
              (this.player = e), (this.tickhandle = null);
            },
          });
        (e.prototype.tick = function (e, t) {
          var i = this;
          this.tickhandle = setTimeout(function () {
            i.player && i.player.trigger(r.AuthKeyExpiredEvent), t && t();
          }, 1e3 * e);
        }),
          (e.prototype.clearTick = function (e) {
            this.tickhandle && clearTimeout(this.tickhandle);
          }),
          (t.exports = e);
      },
      { "../../lib/constants": 24, "../../lib/oo": 38 },
    ],
    90: [
      function (e, t, i) {
        function l(e, t, i) {
          var r = d.randomUUID(),
            n = "https://mts." + e.domainRegion + ".aliyuncs.com/?",
            r = {
              AccessKeyId: e.accessId,
              Action: "GetLicense",
              MediaId: e.vid,
              LicenseUrl: n,
              data: e.data,
              SecurityToken: e.stsToken,
              Format: "JSON",
              Type: e.encryptionType,
              Version: "2014-06-18",
              SignatureMethod: "HMAC-SHA1",
              SignatureVersion: "1.0",
              SignatureNonce: r,
            };
          e.header && (r.Header = e.header),
            (e =
              n +
              ("Signature=" +
                d.AliyunEncodeURI(
                  d.makeChangeSiga(r, e.accessSecret, "POST")
                ))),
            (r = d.makeUTF8sort(r, "=", "&")),
            o.post(
              e,
              r,
              function (e) {
                e
                  ? ((e = JSON.parse(e)), t && ((e = e.License), t(e)))
                  : i && i(a.createError("MPS\u83b7\u53d6License\u5931\u8d25"));
              },
              function (e) {
                if (i) {
                  var t = {
                    Code: "",
                    Message: s.get("Error_MTS_Fetch_Urls_Text"),
                  };
                  try {
                    t = JSON.parse(e);
                  } catch (e) {}
                  i({
                    Code: c.ErrorCode.ServerAPIError,
                    Message: t.Code + "|" + t.Message,
                    sri: t.requestId || "",
                  });
                }
              }
            );
        }
        var o = e("../../lib/io"),
          u = (e("../../lib/ua"), e("../../lib/bufferbase64")),
          c = e("../../lib/constants"),
          d = e("./signature"),
          a = e("./util"),
          p = e("../../lib/url"),
          h = e("../../lib/playerutil"),
          s = e("../../lang/index");
        function f(e) {
          window.console.error("The license request failed.");
        }
        function _(e) {
          window.console.error("A decryption key error was encountered"),
            window.console.error("A decryption key error was encountered", e);
        }
        function y(e) {
          window.console.log("Decryption key was added to session.");
        }
        function g(e, t, i) {
          i.addEventListener(
            e,
            function () {
              t(arguments[0]);
            },
            !1
          );
        }
        (t.exports.requestLicenseKey = function (e) {
          var s = e;
          return (
            s._options.vid && (s.__vid = s._options.vid),
            function (e, t) {
              var i,
                r,
                n,
                o = s._options,
                a = s._getDRMEncryptItem();
              a &&
                ((i = {
                  vid: s.__vid,
                  accessId: o.accId,
                  accessSecret: o.accSecret,
                  stsToken: o.stsToken,
                  domainRegion: o.domainRegion,
                  authInfo: o.authInfo,
                  encryptionType: a.encryptionType,
                }),
                a.encryptionType == c.EncryptionType.Widevine
                  ? (i.data = u.encode(e.message))
                  : a.encryptionType == c.EncryptionType.PlayReady &&
                    ((r = u.unpackPlayReady(e.message)),
                    (i.data = r.changange),
                    r.header && (i.header = JSON.stringify(r.header))),
                console.log(i.data),
                (r = s.__licenseKeys),
                (n = s.__vid + a.Url),
                r && r[n],
                l(
                  i,
                  function (e) {
                    s.__licenseKeys || (s.__licenseKeys = {}),
                      10 < i.data.length && (s.__licenseKeys[n] = e);
                    e = u.decode(e);
                    t(e);
                  },
                  function (e) {
                    e = {
                      mediaId: s.__vid,
                      error_code: e.Code,
                      error_msg: e.Message,
                    };
                    s.logError(e), s.trigger("error", e);
                  }
                ));
            }
          );
        }),
          (t.exports.loadCertificate = function (e, t) {
            var i = new XMLHttpRequest();
            i.addEventListener(
              "load",
              function (e, t) {
                t = t.target;
                try {
                  i = this._options.isLive
                    ? JSON.parse(t.response).Response.B64ServCert
                    : JSON.parse(JSON.parse(t.response).DRMCertInfo)
                        .b64ServCert;
                } catch (e) {
                  console.log(e);
                }
                var t = d.base64DecodeUint8Array(i),
                  i = function (e, t) {
                    var i = t.target,
                      r = t.initData,
                      n = d.arrayToString(r).split("skd://")[1].split("?")[0],
                      t = d.stringToArray(n);
                    (r = (function (e, t, i) {
                      "string" == typeof t && (t = stringToArray(t));
                      var r = 0,
                        n = new ArrayBuffer(
                          e.byteLength + 4 + t.byteLength + 4 + i.byteLength
                        ),
                        o = new DataView(n);
                      new Uint8Array(n, 0, e.byteLength).set(e),
                        (r += e.byteLength),
                        o.setUint32(r, t.byteLength, !0),
                        (r += 4);
                      e = new Uint16Array(n, r, t.length);
                      return (
                        e.set(t),
                        (r += e.byteLength),
                        o.setUint32(r, i.byteLength, !0),
                        (r += 4),
                        new Uint8Array(n, r, i.byteLength).set(i),
                        new Uint8Array(n, 0, n.byteLength)
                      );
                    })(r, t, e)),
                      i.webkitKeys ||
                        ((function () {
                          {
                            if (
                              !WebKitMediaKeys.isTypeSupported(
                                "com.apple.fps.1_0",
                                "video/mp4"
                              )
                            )
                              throw "Key System not supported";
                            keySystem = "com.apple.fps.1_0";
                          }
                        })(),
                        i.webkitSetMediaKeys(new WebKitMediaKeys(keySystem)));
                    if (!i.webkitKeys) throw "Could not create MediaKeys";
                    r = i.webkitKeys.createSession("video/mp4", r);
                    if (!r) throw "Could not create key session";
                    (r.contentId = n),
                      g(
                        "webkitkeymessage",
                        function (e) {
                          var t = this,
                            i = e.target,
                            r = e.message,
                            n = new XMLHttpRequest();
                          e.sessionId;
                          (n.responseType = "text"),
                            (n.session = i),
                            n.addEventListener(
                              "load",
                              function (e) {
                                var t = e.target;
                                e = this._options.isLive
                                  ? JSON.parse(t.response).Response.B64License
                                  : JSON.parse(JSON.parse(t.response).License)
                                      .b64License;
                                (e = d.base64DecodeUint8Array(e)),
                                  (e = d.Uint8ArrayToString(e));
                                "<ckc>" === e.substr(0, 5) &&
                                  "</ckc>" === e.substr(-6) &&
                                  (e = e.slice(5, -6));
                                e = d.base64DecodeUint8Array(e);
                                t.session.update(e);
                              }.bind(this),
                              !1
                            ),
                            n.addEventListener("error", f, !1);
                          var i = btoa(
                              "spc=" +
                                d.base64EncodeUint8Array(r) +
                                "&assetId=" +
                                encodeURIComponent(i.contentId)
                            ),
                            o = {
                              Format: "JSON",
                              SignatureMethod: "HMAC-SHA1",
                              SignatureVersion: "1.0",
                              Timestamp: d.ISODateString(new Date()),
                              SignatureNonce: d.randomUUID(),
                              AccessKeyId: t._options.accessKeyId,
                              SecurityToken: t._options.securityToken,
                              CertId: t._options.certId,
                            };
                          t._options.isLive
                            ? ((o.RegionId = t._options.region),
                              (o.Action = "DescribeDRMLicense"),
                              (o.Version = "2016-11-01"),
                              (o.CdmData = i),
                              (o.Type = "fairplay"),
                              (o.Domain = p.parseUrl(
                                t._options.source
                              ).hostname))
                            : ((o.region = t._options.region),
                              (o.Action = "GetDRMLicense"),
                              (o.Version = "2017-03-21"),
                              (o.VideoId = t._options.vid),
                              (o.CDMData = i),
                              (o.DRMType = "FairPlay"));
                          var a,
                            s,
                            i =
                              "Signature=" +
                              d.AliyunEncodeURI(
                                d.makeChangeSiga(
                                  o,
                                  t._options.accessKeySecret,
                                  "POST"
                                )
                              );
                          i = t._options.isLive
                            ? "https://" +
                              h.getLiveHostByRegion(t._options.region) +
                              "/?" +
                              i
                            : "https://vod." +
                              t._options.region +
                              ".aliyuncs.com/?" +
                              i;
                          for (s in (n.open("POST", i, !0),
                          n.setRequestHeader(
                            "Content-type",
                            "application/x-www-form-urlencoded"
                          ),
                          o)) {
                            var l;
                            o.hasOwnProperty(s) &&
                              ((l = o[s]),
                              (a = a
                                ? a +
                                  "&" +
                                  d.AliyunEncodeURI(s) +
                                  "=" +
                                  d.AliyunEncodeURI(l)
                                : d.AliyunEncodeURI(s) +
                                  "=" +
                                  d.AliyunEncodeURI(l)));
                          }
                          n.send(a);
                        }.bind(this),
                        r
                      ),
                      g("webkitkeyadded", y, r),
                      g("webkitkeyerror", _, r);
                  }.bind(this, t);
                this._fairPlayHandlers.onNeedKey = i;
                t = function (e) {
                  window.console.error("A video playback error occurred");
                }.bind(this);
                (this._fairPlayHandlers.onError = t),
                  this.tag.addEventListener("webkitneedkey", i, !1),
                  this.tag.addEventListener("error", t, !1),
                  (this.tag.src = this._options.source),
                  e && e();
              }.bind(e, t),
              !1
            ),
              i.addEventListener(
                "error",
                function (e) {
                  window.console.error(
                    "Failed to retrieve the server certificate."
                  );
                }.bind(e),
                !1
              );
            var r = {
              Format: "JSON",
              SignatureMethod: "HMAC-SHA1",
              SignatureVersion: "1.0",
              Timestamp: d.ISODateString(new Date()),
              SignatureNonce: d.randomUUID(),
              AccessKeyId: e._options.accessKeyId,
              SecurityToken: e._options.securityToken,
              CertId: e._options.certId,
            };
            e._options.isLive
              ? ((r.RegionId = e._options.region),
                (r.Action = "DescribeDRMCertificate"),
                (r.Version = "2016-11-01"))
              : ((r.region = e._options.region),
                (r.Action = "GetDRMCertInfo"),
                (r.Version = "2017-03-21"),
                (r.VideoId = e._options.vid));
            var n,
              o,
              a,
              t =
                "Signature=" +
                d.AliyunEncodeURI(
                  d.makeChangeSiga(r, e._options.accessKeySecret, "POST")
                ),
              t = e._options.isLive
                ? "https://" +
                  h.getLiveHostByRegion(e._options.region) +
                  "/?" +
                  t
                : "https://vod." + e._options.region + ".aliyuncs.com/?" + t;
            for (n in (i.open("POST", t, !0),
            i.setRequestHeader(
              "Content-type",
              "application/x-www-form-urlencoded"
            ),
            r))
              r.hasOwnProperty(n) &&
                ((o = r[n]),
                (a = a
                  ? a + "&" + d.AliyunEncodeURI(n) + "=" + d.AliyunEncodeURI(o)
                  : d.AliyunEncodeURI(n) + "=" + d.AliyunEncodeURI(o)),
                console.log(o));
            i.send(a);
          }),
          (t.exports.getRequestUrl = function (e, t) {
            var i = {
                AccessKeyId: t._options.accessKeyId,
                Format: "JSON",
                Version: "2016-11-01",
                SignatureMethod: "HMAC-SHA1",
                SignatureVersion: "1.0",
                Timestamp: d.ISODateString(new Date()),
                SignatureNonce: d.randomUUID(),
                CertId: t._options.certId,
                SecurityToken: t._options.securityToken,
                RegionId: t._options.region,
                Action: "DescribeDRMLicense",
                Type: "widevine",
                CdmData: e,
                Domain: p.parseUrl(t._options.source).hostname,
              },
              e =
                "Signature=" +
                d.AliyunEncodeURI(
                  d.makeChangeSiga(i, t._options.accessKeySecret, "POST")
                );
            return {
              url:
                "https://" +
                h.getLiveHostByRegion(t._options.region) +
                "/?" +
                e,
              data: d.makeUTF8sort(i, "=", "&"),
              jsonData: d.makeUTF8sort(i, "=", "&", "json"),
            };
          }),
          (t.exports.postData = function (e, t) {
            var i = d.randomUUID(),
              i = {
                AccessKeyId: t._options.accessKeyId,
                VideoId: t._options.vid,
                Format: "JSON",
                Version: "2017-03-21",
                SignatureMethod: "HMAC-SHA1",
                SignatureVersion: "1.0",
                SignatureNonce: i,
                CertId: t._options.certId,
                SecurityToken: t._options.securityToken,
                region: t._options.region,
                Action: "GetDRMLicense",
                DRMType: "Widevine",
                CDMData: e,
              },
              e =
                "Signature=" +
                d.AliyunEncodeURI(
                  d.makeChangeSiga(i, t._options.accessKeySecret, "POST")
                );
            return {
              url: "https://vod." + t._options.region + ".aliyuncs.com/?" + e,
              data: d.makeUTF8sort(i, "=", "&"),
              jsonData: d.makeUTF8sort(i, "=", "&", "json"),
            };
          }),
          (t.exports.destroyFairPlay = function () {
            this._fairPlayHandlers.onNeedKey &&
              this.tag.removeEventListener(
                "webkitneedkey",
                this._fairPlayHandlers.onNeedKey
              ),
              this._fairPlayHandlers.onError &&
                this.tag.removeEventListener(
                  "error",
                  this._fairPlayHandlers.onError
                ),
              (this._fairPlayHandlers = {});
          });
      },
      {
        "../../lang/index": 20,
        "../../lib/bufferbase64": 22,
        "../../lib/constants": 24,
        "../../lib/io": 35,
        "../../lib/playerutil": 40,
        "../../lib/ua": 42,
        "../../lib/url": 43,
        "./signature": 94,
        "./util": 96,
      },
    ],
    91: [
      function (e, t, i) {
        var r = e("../../lib/io"),
          l = e("../../lib/constants"),
          s = e("./signature"),
          u = e("./util"),
          c = e("../../lang/index"),
          d = e("../../lib/ua");
        var p = function (e, i) {
            var t = "";
            e.sort(function (e, t) {
              (e = parseInt(e.bitrate)), (t = parseInt(t.bitrate));
              return "desc" == i
                ? t < e
                  ? -1
                  : e < t
                  ? 1
                  : void 0
                : e < t
                ? -1
                : t < e
                ? 1
                : void 0;
            });
            for (var r = e.length, n = 0; n < r; n++) {
              var o = e[n],
                a = l.QualityLevels[o.definition],
                s = "",
                s = void 0 === a ? o.bitrate : t == a ? a + o.bitrate : a;
              (o.desc = s), (t = a);
            }
          },
          h = function (e, i) {
            var t = "";
            e.sort(function (e, t) {
              (e = parseInt(e.width)), (t = parseInt(t.width));
              return "desc" == i
                ? t < e
                  ? -1
                  : e < t
                  ? 1
                  : void 0
                : e < t
                ? -1
                : t < e
                ? 1
                : void 0;
            });
            for (var r = e.length, n = 0; n < r; n++) {
              var o = e[n],
                a = l.QualityLevels[o.definition],
                s = "",
                s = void 0 === a ? "" : t == a ? a + o.height : a;
              (o.desc = s), (t = a);
            }
          };
        t.exports.getDataByAuthInfo = function (e, n, o, a) {
          s.returnUTCDate(), s.randomUUID();
          var t = s.randomUUID(),
            t = {
              AccessKeyId: e.accessId,
              Action: "PlayInfo",
              MediaId: e.vid,
              Formats: e.format,
              AuthInfo: e.authInfo,
              AuthTimeout: e.authTimeout || l.AuthKeyExpired,
              IncludeSnapshotList: e.includeSnapshotList,
              Rand: e.rand,
              SecurityToken: e.stsToken,
              Format: "JSON",
              Version: "2014-06-18",
              SignatureMethod: "HMAC-SHA1",
              SignatureVersion: "1.0",
              Terminal: d.IS_CHROME
                ? "Chrome"
                : d.IS_EDGE
                ? "Edge"
                : d.IS_IE11
                ? "IE"
                : d.IS_SAFARI
                ? "Safari"
                : d.IS_FIREFOX
                ? "Firefox"
                : "",
              SignatureNonce: t,
            };
          e.hlsUriToken && (e.MtsHlsUriToken = e.hlsUriToken),
            e.playConfig && (t.PlayConfig = JSON.stringify(e.playConfig)),
            (t =
              s.makeUTF8sort(t, "=", "&") +
              "&Signature=" +
              s.AliyunEncodeURI(s.makeChangeSiga(t, e.accessSecret))),
            (t = "https://mts." + e.domainRegion + ".aliyuncs.com/?" + t),
            r.get(
              t,
              function (e) {
                var t, i, r;
                e
                  ? ((r = (t = JSON.parse(e)).PlayInfoList.PlayInfo),
                    (i = ""),
                    (e = t.SnapshotList ? t.SnapshotList.Snapshot : []) &&
                      0 < e.length &&
                      (i = e[0].Url),
                    (r = (function (e, t) {
                      for (
                        var i = [], r = [], n = [], o = [], a = e.length - 1;
                        0 <= a;
                        a--
                      ) {
                        var s = e[a];
                        ("mp4" == s.format
                          ? r
                          : "mp3" == s.format
                          ? n
                          : "m3u8" == s.format
                          ? i
                          : o
                        ).push(s);
                      }
                      return 0 < n.length
                        ? (p(n, t), n)
                        : 0 < r.length
                        ? (h(r, t), r)
                        : 0 < i.length
                        ? (h(i, t), i)
                        : (h(o, t), o);
                    })(r, n)),
                    o &&
                      o({ requestId: t.RequestId, urls: r, thumbnailUrl: i }))
                  : a &&
                    a(u.createError("MPS\u83b7\u53d6\u53d6\u6570\u5931\u8d25"));
              },
              function (e) {
                if (a) {
                  var t = {
                    Code: "",
                    Message: c.get("Error_MTS_Fetch_Urls_Text"),
                  };
                  try {
                    t = JSON.parse(e);
                  } catch (e) {}
                  a({
                    Code: l.ErrorCode.ServerAPIError,
                    Message: t.Code + "|" + t.Message,
                    sri: t.requestId || "",
                  });
                }
              }
            );
        };
      },
      {
        "../../lang/index": 20,
        "../../lib/constants": 24,
        "../../lib/io": 35,
        "../../lib/ua": 42,
        "./signature": 94,
        "./util": 96,
      },
    ],
    92: [
      function (e, t, i) {
        var r = e("./saasplayer"),
          n = (e("../../lib/constants"), e("./mts")),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t), (this.service = n), this.loadByMts();
            },
          });
        (e.prototype.loadByMts = function (e) {
          var t = {
            vid: this._options.vid,
            accessId: this._options.accId,
            accessSecret: this._options.accSecret,
            stsToken: this._options.stsToken,
            domainRegion: this._options.domainRegion,
            authInfo: this._options.authInfo,
            format: this._options.format,
            includeSnapshotList: this._options.includeSnapshotList || !1,
            defaultDefinition: this._options.defaultDefinition,
            authTimeout: this._options.authTimeout,
            hlsUriToken: this._options.hlsUriToken,
            playConfig: this._options.playConfig,
          };
          this.loadData(t, e);
        }),
          (e.prototype.replayByVidAndAuthInfo = function (e, t, i, r, n, o) {
            this.trigger("error_hide"),
              (this._options.source = ""),
              (this._isError = !1),
              (this._duration = 0),
              (this._options.cover = ""),
              (this._vodRetryCount = 0),
              this._clearTimeout(),
              this.reloadNewVideoInfo(e, t, i, r, n, o);
          }),
          (e.prototype.reloadNewVideoInfo = function (e, t, i, r, n, o) {
            if (
              (this.trigger("error_hide"),
              (this._options.source = ""),
              e &&
                ((this._options.vid = e),
                (this._options.accId = t),
                (this._options.accessSecret = i),
                (this._options.stsToken = r),
                (this._options.domainRegion = o),
                (this._options.authInfo = n)),
              !(
                this._options.vid &&
                this._options.accId &&
                this._options.accessSecret &&
                this._options.stsToken &&
                this._options.domainRegion &&
                this._options.authInfo
              ))
            )
              throw new Error(
                "\u9700\u8981\u63d0\u4f9bvid\u3001accId\u3001accessSecret\u3001stsToken\u3001domainRegion\u548cauthInfo\u53c2\u6570"
              );
            this.log(
              "STARTFETCHDATA",
              JSON.stringify({ it: "mps", pa: { vid: e } })
            ),
              this.loadByMts(!0);
          }),
          (t.exports = e);
      },
      { "../../lib/constants": 24, "./mts": 91, "./saasplayer": 93 },
    ],
    93: [
      function (e, t, i) {
        var p = e("../base/player"),
          r = e("../audio/audioplayer"),
          o = (e("../../lib/event"), e("../../lib/io")),
          h = e("../../lib/constants"),
          n = e("./signature"),
          a = e("./authkeyexpiredhandle"),
          f = e("../hls/hlsinjector"),
          _ = e("../flv/flvinjector"),
          y = e("../drm/drminjector"),
          g = (e("../../lib/cookie"), e("../../lang/index")),
          v = e("../../lib/ua"),
          s = e("../../config"),
          m = e("../../lib/playerutil"),
          S = e("../base/event/eventtype"),
          l = e("../../protected/anti-injector-protected"),
          b = p.extend({
            init: function (e, t) {
              l(t, this),
                (this._authKeyExpiredHandle = new a(this)),
                p.prototype._videoCreateEl ||
                  (p.prototype._videoCreateEl = p.prototype.createEl),
                "mp3" == t.format
                  ? ((t.height = "auto"),
                    (t.mediaType = "audio"),
                    (p.prototype.createEl = r.prototype.createEl),
                    r.call(this, e, t),
                    (b.prototype.play = p.prototype.play),
                    (b.prototype.pause = p.prototype.pause),
                    (b.prototype.initPlay = p.prototype.initPlay),
                    (b.prototype.replay = p.prototype.replay),
                    (b.prototype.stop = p.prototype.stop),
                    (b.prototype.seek = p.prototype.seek))
                  : ((p.prototype.createEl = p.prototype._videoCreateEl),
                    (t._native = !1),
                    p.call(this, e, t));
            },
          });
        (b.prototype.loadData = function (e, t) {
          var i, r, n;
          "undefined" != typeof _sce_r_skjhfnck ||
          ("" != e.format &&
            "m3u8" != e.format &&
            1 != this._options.encryptType)
            ? this._loadData(e, t)
            : ((i = "aliplayer-vod-min.js"),
              (r = ""),
              (r = s.domain
                ? "https://" +
                  s.domain +
                  "/de/prismplayer/" +
                  s.h5Version +
                  "/hls/" +
                  i
                : "/build/hls/" + i),
              (n = this),
              o.loadJS(r, function () {
                n._loadData(e, t);
              }));
        }),
          (b.prototype._loadData = function (s, l) {
            var u,
              c = new Date().getTime(),
              d = this;
            (this._urls = []),
              (this._currentPlayIndex = 0),
              (this._retrySwitchUrlCount = 0),
              this._authKeyExpiredHandle.clearTick(),
              ("" != s.format && "m3u8" != s.format) ||
              1 != this._options.encryptType
                ? (s.rand = n.randomUUID())
                : ((u = _sce_r_skjhfnck()),
                  (s.rand = _sce_lgtcaygl(u, d._vdnct6f))),
              this._options.thumbnailUrl &&
                (s.thumbnailUrl = this._options.thumbnailUrl),
              this.trigger(S.Private.H5_Loading_Show),
              this.service.getDataByAuthInfo(
                s,
                this._options.qualitySort,
                function (e) {
                  if (
                    (d.trigger(S.Private.PlayInfoLoaded, e),
                    e.urls && 0 == e.urls.length)
                  )
                    d._mtsError_message(
                      d,
                      {
                        Code: h.ErrorCode.URLsIsEmpty,
                        Message:
                          g.get("Error_Vod_URL_Is_Empty_Text") +
                          (s.format ? "(format:" + s.format + ")" : ""),
                      },
                      ""
                    );
                  else {
                    d.log("COMPLETEFETCHDATA", {
                      cost: new Date().getTime() - c,
                      mi: JSON.stringify(
                        (function (e) {
                          for (var t = [], i = 0; i < e.length; i++)
                            t.push({
                              width: e[i].width,
                              height: e[i].height,
                              definition: e[i].definition,
                              format: e[i].format,
                              encryptionType: e[i].encryptionType,
                              duration: e[i].duration,
                            });
                          return t;
                        })(e.urls)
                      ),
                    }),
                      (d._urls = e.urls),
                      d._urls.sort(function (e, t) {
                        return e.bitrate - t.bitrate;
                      }),
                      (d._currentPlayIndex = m.findSelectedStreamLevel(
                        d._urls,
                        s.defaultDefinition
                      ));
                    var t = (i = e.urls[d._currentPlayIndex]).Url;
                    if (
                      ((d._vodDuration = i.duration || 0),
                      (d._options.source = t),
                      (d.encType = ""),
                      d.trigger(S.Private.PREPARE, i.definition),
                      d.UI.cover &&
                        e.coverUrl &&
                        !d._options.cover &&
                        d.setCover(e.coverUrl),
                      m.isHls(t))
                    )
                      if (
                        e &&
                        e.playInfoAry &&
                        0 < e.playInfoAry.length &&
                        "Widevine-FairPlay" == e.playInfoAry[0].EncryptType
                      )
                        y.inject(d, b, p.prototype, d._options);
                      else {
                        if (e.encryptUrlArr && 0 < e.encryptUrlArr.length)
                          for (
                            var i, r, n = [], o = 0;
                            o < e.encryptUrlArr.length;
                            ++o
                          )
                            (i = e.encryptUrlArr[o]).encryptionType ===
                              h.EncryptionType.Private &&
                              ((r = _sce_dlgtqred(u, i.rand, i.plaintext)),
                              n.push({ url: i.Url, secData: r }));
                        else if (
                          ((ecData = ""),
                          i.encryptionType == h.EncryptionType.Private)
                        ) {
                          d.encType = i.encryptionType;
                          var a = m.checkSecuritSupport();
                          if (a)
                            return void d._mtsError_message(
                              d,
                              {
                                Code: h.ErrorCode.EncrptyVideoNotSupport,
                                Message: a,
                                display_msg: a,
                              },
                              ""
                            );
                          n = _sce_dlgtqred(u, i.rand, i.plaintext);
                        }
                        f.inject(d, b, p, d._options, n);
                      }
                    else
                      m.isFlv(t)
                        ? _.inject(d, b, p, d._options)
                        : m.isDash(t)
                        ? (console.log("isDash"), y.inject(d, b, p, d._options))
                        : d._player._executeReadyCallback();
                    d._authKeyExpiredHandle.tick(h.AuthKeyRefreshExpired),
                      d.trigger(S.Private.SourceLoaded, i),
                      d.initPlay(l),
                      d.trigger(S.Private.ChangeURL),
                      e.thumbnailUrl && d._thumbnailService.get(e.thumbnailUrl);
                    (a = d._player._isFlv),
                      (t = -1 < d._player.getOptions().source.indexOf("mp4"));
                    1 == d._player.encType ||
                      a ||
                      t ||
                      ((v.IS_IOS || v.IS_MAC_SAFARI || v.IS_X5 || v.IS_EDGE) &&
                        (d._player._executeReadyCallback(),
                        d._urls.length &&
                          d.trigger(S.Private.SourceLoaded, i)));
                  }
                },
                function (e) {
                  d._mtsError_message(d, e, "");
                }
              );
          }),
          (b.prototype._changeStream = function (e, t) {
            this._urls.length > e &&
              (this.loadByUrl(this._urls[e].Url, this.getCurrentTime()),
              (this._currentPlayIndex = e),
              this.trigger(
                S.Private.QualityChange,
                t || g.get("Quality_Change_Fail_Switch_Text")
              ));
          }),
          (b.prototype._getLowerQualityLevel = function () {
            if (0 == this._urls.length || -1 == this._currentPlayIndex)
              return "";
            if ("asc" == this.options().qualitySort) {
              if (0 < this._currentPlayIndex)
                return {
                  item: this._urls[this._currentPlayIndex - 1],
                  index: this._currentPlayIndex - 1,
                };
            } else if (this._currentPlayIndex < this._urls.length - 1)
              return {
                item: this._urls[this._currentPlayIndex + 1],
                index: this._currentPlayIndex + 1,
              };
            return "";
          }),
          (b.prototype._mtsError_message = function (e, t, i) {
            var r = e;
            r.trigger(S.Private.H5_Loading_Hide);
            var n = t.Code || "OTHER_ERR_CODE",
              o = t.Message || "OTHER_ERR_MSG",
              a = (h.ErrorCode.ServerAPIError, t.display_msg || "");
            -1 < o.indexOf("InvalidParameter.Rand") ||
            -1 < o.indexOf('"Rand" is not valid.')
              ? (h.ErrorCode.EncrptyVideoNotSupport,
                (a = g.get("Error_Not_Support_encrypt_Text")))
              : -1 < o.indexOf("SecurityToken.Expired")
              ? (h.ErrorCode.AuthKeyExpired,
                (a = g.get("Error_Playauth_Expired_Text")))
              : -1 < o.indexOf("InvalidVideo.NoneStream") &&
                (h.ErrorCode.URLsIsEmpty,
                (a =
                  g.get("Error_Fetch_NotStream") +
                  "(" +
                  r._options.format +
                  "|" +
                  r._options.definition +
                  ")"));
            (e = r._options.vid || "0"),
              r._options.from,
              (n = { mediaId: e, error_code: n, error_msg: o });
            t.sri && (n.sri = t.sri),
              r.logError(n),
              (n.display_msg =
                (a || g.get("Error_Vod_Fetch_Urls_Text")) + "</br>" + o),
              r.trigger("error", n),
              console.log(
                "PrismPlayer Error: " + i + "! error_msg :" + o + ";"
              );
          }),
          (t.exports = b);
      },
      {
        "../../config": 13,
        "../../lang/index": 20,
        "../../lib/constants": 24,
        "../../lib/cookie": 25,
        "../../lib/event": 29,
        "../../lib/io": 35,
        "../../lib/playerutil": 40,
        "../../lib/ua": 42,
        "../../protected/anti-injector-protected": 108,
        "../audio/audioplayer": 52,
        "../base/event/eventtype": 54,
        "../base/player": 74,
        "../drm/drminjector": 80,
        "../flv/flvinjector": 83,
        "../hls/hlsinjector": 85,
        "./authkeyexpiredhandle": 89,
        "./signature": 94,
      },
    ],
    94: [
      function (e, c, t) {
        var r = e("crypto-js/hmac-sha1"),
          n = e("crypto-js/enc-base64"),
          o = e("crypto-js/enc-utf8");
        (c.exports.randomUUID = function () {
          for (var e = [], t = "0123456789abcdef", i = 0; i < 36; i++)
            e[i] = t.substr(Math.floor(16 * Math.random()), 1);
          return (
            (e[14] = "4"),
            (e[19] = t.substr((3 & e[19]) | 8, 1)),
            (e[8] = e[13] = e[18] = e[23] = "-"),
            e.join("")
          );
        }),
          (c.exports.returnUTCDate = function () {
            var e = new Date(),
              t = e.getUTCFullYear(),
              i = e.getUTCMonth(),
              r = e.getUTCDate(),
              n = e.getUTCHours(),
              o = e.getUTCMinutes(),
              a = e.getUTCSeconds(),
              e = e.getUTCMilliseconds();
            return Date.UTC(t, i, r, n, o, a, e);
          }),
          (c.exports.AliyunEncodeURI = function (e) {
            e = encodeURIComponent(e);
            return (e = (e = (e = e.replace("+", "%2B")).replace(
              "*",
              "%2A"
            )).replace("%7E", "~"));
          }),
          (c.exports.makesort = function (e, t, i) {
            if (!e)
              throw new Error("PrismPlayer Error: vid should not be null!");
            var r = [];
            for (s in e) r.push(s);
            for (var n = r.sort(), o = "", a = n.length, s = 0; s < a; s++)
              "" == o
                ? (o = n[s] + t + e[n[s]])
                : (o += i + n[s] + t + e[n[s]]);
            return o;
          }),
          (c.exports.makeUTF8sort = function (e, t, i) {
            if (!e)
              throw new Error("PrismPlayer Error: vid should not be null!");
            var r = [];
            for (s in e) r.push(s);
            for (var n = r.sort(), o = "", a = n.length, s = 0; s < a; s++) {
              var l = c.exports.AliyunEncodeURI(n[s]),
                u = c.exports.AliyunEncodeURI(e[n[s]]);
              "" == o ? (o = l + t + u) : (o += i + l + t + u);
            }
            return o;
          }),
          (c.exports.makeChangeSiga = function (e, t, i) {
            if (!e)
              throw new Error("PrismPlayer Error: vid should not be null!");
            return n.stringify(
              r(
                (i = i || "GET") +
                  "&" +
                  c.exports.AliyunEncodeURI("/") +
                  "&" +
                  c.exports.AliyunEncodeURI(
                    c.exports.makeUTF8sort(e, "=", "&")
                  ),
                t + "&"
              )
            );
          }),
          (c.exports.ISODateString = function (e) {
            function t(e) {
              return e < 10 ? "0" + e : e;
            }
            return (
              e.getUTCFullYear() +
              "-" +
              t(e.getUTCMonth() + 1) +
              "-" +
              t(e.getUTCDate()) +
              "T" +
              t(e.getUTCHours()) +
              ":" +
              t(e.getUTCMinutes()) +
              ":" +
              t(e.getUTCSeconds()) +
              "Z"
            );
          }),
          (c.exports.encPlayAuth = function (e) {
            if (!(e = o.stringify(n.parse(e))))
              throw new Error("playuth\u53c2\u6570\u89e3\u6790\u4e3a\u7a7a");
            return JSON.parse(e);
          }),
          (c.exports.encRsa = function () {}),
          (c.exports.stringToArray = function (e) {
            for (
              var t = new ArrayBuffer(2 * e.length),
                i = new Uint16Array(t),
                r = 0,
                n = e.length;
              r < n;
              r++
            )
              i[r] = e.charCodeAt(r);
            return i;
          }),
          (c.exports.Uint8ArrayToString = function (e) {
            for (var t = "", i = 0; i < e.length; i++)
              t += String.fromCharCode(e[i]);
            return t;
          }),
          (c.exports.arrayToString = function (e) {
            e = new Uint16Array(e.buffer);
            return String.fromCharCode.apply(null, e);
          }),
          (c.exports.base64DecodeUint8Array = function (e) {
            var t = window.atob(e),
              r = t.length,
              n = new Uint8Array(new ArrayBuffer(r));
            for (i = 0; i < r; i++) n[i] = t.charCodeAt(i);
            return n;
          }),
          (c.exports.base64EncodeUint8Array = function (e) {
            for (
              var t,
                i,
                r,
                n,
                o,
                a,
                s =
                  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                l = "",
                u = 0;
              u < e.length;

            )
              (r = (a = e[u++]) >> 2),
                (n =
                  ((3 & a) << 4) |
                  ((t = u < e.length ? e[u++] : Number.NaN) >> 4)),
                (o =
                  ((15 & t) << 2) |
                  ((i = u < e.length ? e[u++] : Number.NaN) >> 6)),
                (a = 63 & i),
                isNaN(t) ? (o = a = 64) : isNaN(i) && (a = 64),
                (l += s.charAt(r) + s.charAt(n) + s.charAt(o) + s.charAt(a));
            return l;
          });
      },
      {
        "crypto-js/enc-base64": 2,
        "crypto-js/enc-utf8": 3,
        "crypto-js/hmac-sha1": 4,
      },
    ],
    95: [
      function (e, t, i) {
        var o = e("../../lib/io"),
          a = e("../../lib/constants"),
          s = e("./signature"),
          l = e("./util"),
          u = e("../../lang/index");
        t.exports.getPlayAuth = function (e, t, i, r) {
          s.randomUUID();
          var n = s.randomUUID(),
            n = {
              AccessKeyId: e.accessKeyId,
              Action: "GetVideoPlayAuth",
              VideoId: e.vid,
              AuthTimeout: a.AuthInfoExpired,
              SecurityToken: e.securityToken,
              Format: "JSON",
              Version: "2017-03-21",
              SignatureMethod: "HMAC-SHA1",
              SignatureVersion: "1.0",
              SignatureNonce: n,
            },
            n =
              s.makeUTF8sort(n, "=", "&") +
              "&Signature=" +
              s.AliyunEncodeURI(s.makeChangeSiga(n, e.accessKeySecret)),
            n = "https://vod." + e.region + ".aliyuncs.com/?" + n;
          o.get(
            n,
            function (e) {
              e
                ? ((e = JSON.parse(e)), t && t(e.PlayAuth))
                : i &&
                  i(
                    l.createError(
                      "\u83b7\u53d6\u89c6\u9891\u64ad\u653e\u51ed\u8bc1\u5931\u8d25"
                    )
                  );
            },
            function (e) {
              if (i) {
                var t = { Code: "", Message: u.get("Fetch_Playauth_Error") };
                try {
                  (t = JSON.parse(e)).Code;
                } catch (e) {}
                i({
                  Code: a.ErrorCode.ServerAPIError,
                  Message: t.Code + "|" + t.Message,
                  sri: t.requestId,
                  display_msg: u.get("Fetch_Playauth_Error", r),
                });
              }
            }
          );
        };
      },
      {
        "../../lang/index": 20,
        "../../lib/constants": 24,
        "../../lib/io": 35,
        "./signature": 94,
        "./util": 96,
      },
    ],
    96: [
      function (e, t, i) {
        t.exports.createError = function (e, t) {
          return { requestId: "", code: t || "", message: e };
        };
      },
      {},
    ],
    97: [
      function (e, t, i) {
        var r = e("../../lib/io"),
          d = e("../../lib/constants"),
          n = e("./signature"),
          p = e("./util"),
          o = e("../../config"),
          a = e("../../lang/index");
        function h(e, t) {
          for (
            var i = [], r = [], n = [], o = [], a = e.length - 1;
            0 <= a;
            a--
          ) {
            var s = e[a],
              l =
                (void 0,
                ((l = {}).width = (s = s).Width),
                (l.height = s.Height),
                (l.definition = s.Definition),
                (l.Url = s.PlayURL),
                (l.format = s.Format),
                (l.desc = d.QualityLevels[l.definition]),
                (l.encryptionType = d.VodEncryptionType[s.EncryptType]),
                (l.plaintext = s.Plaintext),
                (l.rand = s.Rand),
                (l.encrypt = s.Encrypt),
                (l.duration = s.Duration),
                (l.bitrate = s.Bitrate),
                l);
            ("mp4" == l.format
              ? r
              : "mp3" == l.format
              ? n
              : "m3u8" == l.format
              ? i
              : o
            ).push(l);
          }
          var u = [],
            u = 0 < n.length ? n : 0 < r.length ? r : 0 < i.length ? i : o;
          return "asc" == t && u.reverse(), u;
        }
        t.exports.getDataByAuthInfo = function (s, l, u, c) {
          n.randomUUID();
          var e = n.randomUUID(),
            e = {
              AccessKeyId: s.accessId,
              Action: "GetPlayInfo",
              VideoId: s.vid,
              Formats: s.format,
              AuthTimeout: s.authTimeout || d.AuthKeyExpired,
              Rand: s.rand,
              SecurityToken: s.stsToken,
              StreamType: s.mediaType,
              Format: "JSON",
              Version: "2017-03-21",
              SignatureMethod: "HMAC-SHA1",
              SignatureVersion: "1.0",
              SignatureNonce: e,
              PlayerVersion: o.h5Version,
              Channel: "HTML5",
            };
          "AUTO" === s.definition
            ? (e.ResultType = "Multiple")
            : s.definition && (e.Definition = s.definition),
            s.authInfo && (e.AuthInfo = s.authInfo),
            s.outputType && (e.OutputType = s.outputType),
            s.playConfig && (e.PlayConfig = JSON.stringify(s.playConfig)),
            s.reAuthInfo && (e.ReAuthInfo = JSON.stringify(s.reAuthInfo)),
            (e =
              n.makeUTF8sort(e, "=", "&") +
              "&Signature=" +
              n.AliyunEncodeURI(n.makeChangeSiga(e, s.accessSecret))),
            (e = "https://vod." + s.domainRegion + ".aliyuncs.com/?" + e),
            r.get(
              e,
              function (e) {
                if (e) {
                  var t = JSON.parse(e),
                    i = "",
                    e = t.VideoBase.ThumbnailList;
                  e && e.Thumbnail && 0 < e.Thumbnail.length
                    ? (i = e.Thumbnail[0].URL)
                    : s.thumbnailUrl && (i = String(s.thumbnailUrl));
                  for (
                    var r = t.PlayInfoList.PlayInfo,
                      n = [],
                      o = [],
                      a = r.length - 1;
                    0 <= a;
                    --a
                  )
                    "AUTO" === r[a].Definition
                      ? (n = [r.splice(a, 1)[0]])
                      : 1 === r[a].Encrypt && o.push(r[a]);
                  (e = null),
                    (o =
                      0 === n.length
                        ? ((e = h(r, l)), [])
                        : ((e = h(n)), h(o)));
                  e &&
                    u &&
                    u({
                      requestId: t.RequestId,
                      urls: e,
                      encryptUrlArr: o,
                      thumbnailUrl: i,
                      coverUrl: t.VideoBase.CoverURL,
                      playInfoAry: r,
                    });
                } else
                  c &&
                    c(
                      p.createError(
                        "\u70b9\u64ad\u670d\u52a1\u83b7\u53d6\u53d6\u6570\u5931\u8d25"
                      )
                    );
              },
              function (e) {
                if (c) {
                  var t = {
                    Code: "",
                    Message: a.get("Error_Vod_Fetch_Urls_Text"),
                  };
                  try {
                    t = JSON.parse(e);
                  } catch (e) {}
                  c({
                    Code: d.ErrorCode.ServerAPIError,
                    Message: t.Code + "|" + t.Message,
                    sri: t.requestId || "",
                  });
                }
              }
            );
        };
      },
      {
        "../../config": 13,
        "../../lang/index": 20,
        "../../lib/constants": 24,
        "../../lib/io": 35,
        "./signature": 94,
        "./util": 96,
      },
    ],
    98: [
      function (e, t, i) {
        var r = e("./saasplayer"),
          u = e("../../lib/constants"),
          n = e("./vod"),
          c = e("./signature"),
          o = (e("./authkeyexpiredhandle"), e("./ststoken"), e("../../lib/io")),
          a = e("../../config"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t), (this.service = n), this.loadByVod();
            },
          });
        (e.prototype.loadByVod = function (e) {
          var t, i, r;
          "undefined" != typeof _pa_n4lto7xi
            ? this._loadByVod(e)
            : ((t = "aliplayer-vod-p-min.js"),
              (i = ""),
              (i = a.domain
                ? "https://" +
                  a.domain +
                  "/de/prismplayer/" +
                  a.h5Version +
                  "/hls/" +
                  t
                : "/build/hls/" + t),
              (r = this),
              o.loadJS(i, function () {
                r._loadByVod(e);
              }));
        }),
          (e.prototype._loadByVod = function (e) {
            var t = "",
              i = "",
              r = "",
              n = "",
              o = "";
            if (this._options.accessKeyId && this._options.accessKeySecret)
              (t = this._options.accessKeyId),
                (i = this._options.accessKeySecret),
                (r = this._options.securityToken),
                (n = this._options.region),
                this.log(
                  "STARTFETCHDATA",
                  JSON.stringify({ it: "sts", pa: { vid: this._options.vid } })
                );
            else {
              try {
                var a = _pa_n4lto7xi(this._options.playauth);
                this._options.playauth !== a && (this._vdnct6f = !0);
                var s = c.encPlayAuth(a),
                  t = s.AccessKeyId,
                  i = s.AccessKeySecret,
                  r = s.SecurityToken,
                  n = s.Region,
                  o = s.AuthInfo;
              } catch (e) {
                console.log("e", e);
                var l = {
                  Code: u.ErrorCode.PlayauthDecode,
                  Message: "playauth decoded failed.",
                  displayMessage: "playauth\u89e3\u6790\u9519\u8bef",
                };
                return void this._mtsError_message(this, l, a);
              }
              (this._options.from = s.CustomerId || ""),
                this.log(
                  "STARTFETCHDATA",
                  JSON.stringify({
                    it: "playAuth",
                    pa: { vid: this._options.vid },
                  })
                );
            }
            this._loadByVodBySTS(t, i, r, n, o, e);
          }),
          (e.prototype.replayByVidAndPlayAuth = function (e, t) {
            this.trigger("error_hide"),
              (this._options.source = ""),
              (this._options.vid = e),
              (this._options.playauth = t),
              (this._isError = !1),
              (this._duration = 0),
              (this._options.cover = ""),
              (this._vodRetryCount = 0),
              this._clearTimeout(),
              this.loadByVod(!0);
          }),
          (e.prototype.updateSourcesByVidAndPlayAuth = function (e, t) {
            var i, r, n;
            "undefined" != typeof _pa_n4lto7xi
              ? this._updateSourcesByVidAndPlayAuth(e, t)
              : ((i = "aliplayer-vod-p-min.js"),
                (r = ""),
                (r = a.domain
                  ? "https://" +
                    a.domain +
                    "/de/prismplayer/" +
                    a.h5Version +
                    "/hls/" +
                    i
                  : "/build/hls/" + i),
                (n = this),
                o.loadJS(r, function () {
                  n._updateSourcesByVidAndPlayAuth(e, t);
                }));
          }),
          (e.prototype._updateSourcesByVidAndPlayAuth = function (e, t) {
            if (e == this._options.vid) {
              (this._options.vid = e), (this._options.playauth = t);
              try {
                var i = _pa_n4lto7xi(this._options.playauth);
                this._options.playauth !== i && (this._vdnct6f = !0);
                var r = c.encPlayAuth(i);
              } catch (e) {
                return void console.log("playauth\u89e3\u6790\u9519\u8bef");
              }
              r = {
                vid: e,
                accessId: r.AccessKeyId,
                accessSecret: r.AccessKeySecret,
                stsToken: r.SecurityToken,
                domainRegion: r.Region,
                authInfo: r.AuthInfo,
                playDomain: r.PlayDomain,
                format: this._options.format,
                mediaType: this._options.mediaType,
              };
              this._authKeyExpiredHandle.clearTick();
              var n = this;
              this.service.loadData(
                r,
                this._options.qualitySort,
                function (e) {
                  (n._serverRequestId = e.requestId),
                    0 != e.urls.length && (n._urls = e.urls),
                    n._authKeyExpiredHandle.tick(u.AuthKeyRefreshExpired);
                },
                function (e) {
                  console.log(e);
                }
              );
            } else
              console.log(
                "\u4e0d\u80fd\u66f4\u65b0\u5730\u5740\uff0cvid\u548c\u64ad\u653e\u4e2d\u7684\u4e0d\u4e00\u81f4"
              );
          }),
          (e.prototype.reloaduserPlayInfoAndVidRequestMts = function (e, t) {
            this.replayByVidAndPlayAuth(e, t, accessSecret);
          }),
          (e.prototype._loadByVodBySTS = function (e, t, i, r, n, o) {
            r = {
              vid: this._options.vid,
              accessId: e,
              accessSecret: t,
              stsToken: i,
              authInfo: n,
              domainRegion: r,
              format: this._options.format,
              mediaType: this._options.mediaType,
              definition: this._options.definition,
              defaultDefinition: this._options.defaultDefinition,
              authTimeout: this._options.authTimeout,
              outputType: this._options.outputType,
              playConfig: this._options.playConfig,
              reAuthInfo: this._options.reAuthInfo,
            };
            this.loadData(r, o);
          }),
          (t.exports = e);
      },
      {
        "../../config": 13,
        "../../lib/constants": 24,
        "../../lib/io": 35,
        "./authkeyexpiredhandle": 89,
        "./saasplayer": 93,
        "./signature": 94,
        "./ststoken": 95,
        "./vod": 97,
      },
    ],
    99: [
      function (e, t, i) {
        var r = e("../base/event/eventtype"),
          e = function (t) {
            (this._player = t), (this._video = t.tag);
            var i = this;
            (this._isCreated = !1),
              (this._canPlayTriggered = !1),
              (this._defaultTrack = ""),
              t.on(r.Private.ChangeURL, function () {
                (i._isCreated = !1),
                  (i._canPlayTriggered = !1),
                  (i._defaultTrack = "");
              }),
              t.on(r.Player.CanPlay, function () {
                var e;
                i._player._drm ||
                  i._canPlayTriggered ||
                  ((e = i._getTracks()) &&
                    ((i._isCreated = !0),
                    i._player._options.isVBR ||
                      i._hls ||
                      (t.trigger(r.Player.AudioTrackReady, e),
                      i._notifyDefaultValue(e))),
                  (i._canPlayTriggered = !0));
              }),
              t.on(r.Player.AudioTrackUpdated, function (e) {
                i._isCreated ||
                  ((e = i._getTracks(e.paramData.audioTracks)) &&
                    ((i._isCreated = !0),
                    t.trigger(r.Player.AudioTrackReady, e),
                    i._notifyDefaultValue(e)));
              });
          };
        (e.prototype._notifyDefaultValue = function (e) {
          !this._defaultTrack && 0 < e.length && (this._defaultTrack = e[0]),
            this._defaultTrack &&
              this._player.trigger(r.Private.SelectorUpdateList, {
                type: "audio",
                text: this._defaultTrack.text,
              });
        }),
          (e.prototype.support = function () {
            return !!this._video.audioTracks;
          }),
          (e.prototype._getTracks = function (e) {
            if (!this.support() && !e) return null;
            for (
              var t = [],
                i = (e =
                  this._video &&
                  this._video.audioTracks &&
                  (!e || 0 == e.length)
                    ? this._video.audioTracks
                    : e)
                  ? e.length
                  : 0,
                r = 0;
              r < i;
              r++
            ) {
              var n = e[r],
                o = { value: n.id, text: n.label || n.name || n.language };
              (n.default || n.enabled) && (this._defaultTrack = o), t.push(o);
            }
            return t;
          }),
          (e.prototype.switch = function (e) {
            if (this._player._hls) this._player._hls.audioTrack = +e;
            else
              for (
                var t = this._video.audioTracks
                    ? this._video.audioTracks.length
                    : 0,
                  i = 0;
                i < t;
                i++
              ) {
                var r = this._video.audioTracks[i];
                r.id == e ? (r.enabled = !0) : (r.enabled = !1);
              }
          }),
          (e.prototype.dispose = function () {
            this._player = null;
          }),
          (t.exports = e);
      },
      { "../base/event/eventtype": 54 },
    ],
    100: [
      function (e, t, i) {
        var s = e("../base/event/eventtype"),
          r = e("../../lib/dom"),
          l = e("../../lib/ua"),
          u = e("../../lib/cookie"),
          c = e("../../lib/constants"),
          e = function (o) {
            (this._video = o.tag),
              (this._player = o),
              (this._isCreated = !1),
              (this._backupCC = ""),
              (this.tracks = []),
              (this._defaultTrack = ""),
              (this._currentValue = ""),
              (this._storedTracks = []);
            var a = this;
            o.on(s.Player.LevelsLoaded, function (e) {
              if (l.IS_MAC_SAFARI || l.IS_IOS)
                if (e && e.paramData && e.paramData.subtitles) {
                  for (
                    var t = e.paramData.subtitles || [], i = [], r = 0;
                    r < t.length;
                    r++
                  ) {
                    var n = t[r];
                    (n.vttUrl = n.url && n.url.replace(".m3u8", ".vtt")),
                      i.push(n);
                  }
                  a._storedTracks = i;
                } else
                  a._patchSafariTracks(),
                    (a.tracks = a._getTracks()),
                    o.trigger(s.Player.TextTrackReady, a.tracks);
            }),
              o.on(s.Private.ChangeURL, function () {
                a._disabledTracks(),
                  (a._isCreated = !1),
                  (a._defaultTrack = "");
              }),
              o.on(s.Player.CanPlay, function () {
                a._player._drm ||
                  (a._isCreated ||
                    ((a.tracks = a._getTracks()),
                    o.trigger(s.Player.TextTrackReady, a.tracks)),
                  (a._isCreated && !a._player._setDefaultCC) ||
                    !a._defaultTrack ||
                    (o.trigger(s.Private.SelectorUpdateList, {
                      type: "cc",
                      text: a._defaultTrack.text,
                    }),
                    a.switch(a._defaultTrack.value),
                    (a._player._setDefaultCC = !1),
                    (a._isCreated = !0)));
              }),
              this._adaptiveCueStype(),
              o.on(s.Player.RequestFullScreen, function () {
                a._adaptiveCueStype();
              }),
              o.on(s.Player.CancelFullScreen, function () {
                a._adaptiveCueStype();
              });
          };
        (e.prototype._adaptiveCueStype = function () {
          var e,
            t = -10;
          l.IS_SAFARI
            ? ((t = -65),
              (e = this._player.fullscreenService) &&
                e.getIsFullScreen() &&
                (t = -95))
            : l.IS_MOBILE && (t = -30),
            r.addCssByStyle(
              "video::-webkit-media-text-track-container{transform: translateY(" +
                t +
                "px) !important;}"
            );
        }),
          (e.prototype.close = function () {
            for (
              var e =
                  this._video && this._video.textTracks
                    ? this._video.textTracks.length
                    : 0,
                t = 0;
              t < e;
              t++
            ) {
              var i = this._video.textTracks[t];
              "expired" != i.mode &&
                ("showing" == i.mode && (this._backupCC = i),
                (i.mode = "disabled"));
            }
          }),
          (e.prototype.open = function () {
            if (this.tracks && !(this.tracks.length < 2)) {
              var e = this._backupCC ? this._backupCC.language : "",
                t = this._backupCC ? this._backupCC.label : "";
              return (
                e || ((e = this.tracks[1].value), (t = this.tracks[1].text)),
                this.switch(e),
                t
              );
            }
          }),
          (e.prototype.getCurrentSubtitle = function () {
            return this._currentValue;
          }),
          (e.prototype._getTracks = function () {
            if (this._player._drm) return [];
            var e =
              this._video && this._video.textTracks
                ? this._video.textTracks.length
                : 0;
            this._defaultTrack = { value: "off", text: "Off" };
            for (
              var t = [this._defaultTrack],
                i = u.get(c.SelectedCC),
                r = "",
                n = !1,
                o = 0;
              o < e;
              o++
            ) {
              var a,
                s = this._video.textTracks[o];
              "expired" != s.mode &&
                "subtitles" == s.kind &&
                ((a = { value: s.language, text: s.label }),
                s.default && ((this._defaultTrack = a), (n = !0)),
                a.value == i && (r = a),
                t.push(a));
            }
            return !n && r && (this._defaultTrack = r), t;
          }),
          (e.prototype._disabledTracks = function () {
            for (
              var e =
                  this._video && this._video.textTracks
                    ? this._video.textTracks.length
                    : 0,
                t = 0;
              t < e;
              t++
            )
              this._video.textTracks[t].mode = "expired";
          }),
          (e.prototype.switch = function (e) {
            if ((this.close(), "off" != e)) {
              for (
                var t =
                    this._video && this._video.textTracks
                      ? this._video.textTracks.length
                      : 0,
                  i = 0;
                i < t;
                i++
              ) {
                var r = this._video.textTracks[i];
                r.language === e &&
                  "expired" != r.mode &&
                  (this._video.textTracks[i].mode = "showing");
              }
              this._currentValue = e;
            } else this.close();
          }),
          (e.prototype.dispose = function () {
            this._player = null;
          }),
          (e.prototype._patchSafariTracks = function () {
            if (
              (l.IS_MAC_SAFARI || l.IS_IOS) &&
              !(this._video && this._video.textTracks
                ? this._video.textTracks.length
                : 0)
            ) {
              var e = !1;
              if (
                !(e =
                  this._video.textTracks && this._video.textTracks.length
                    ? !0
                    : e)
              )
                for (var t = 0; t < this._storedTracks.length; t++) {
                  var i = this._storedTracks[t],
                    r = i.vttUrl,
                    n = document.createElement("track");
                  (n.src = r),
                    (n.kind = "subtitles"),
                    (n.label = i.name),
                    (n.srclang = i.lang),
                    this._video.appendChild(n);
                }
            }
          }),
          (t.exports = e);
      },
      {
        "../../lib/constants": 24,
        "../../lib/cookie": 25,
        "../../lib/dom": 28,
        "../../lib/ua": 42,
        "../base/event/eventtype": 54,
      },
    ],
    101: [
      function (e, t, i) {
        var r = e("../../lib/playerutil");
        t.exports = [
          { service: e("./ccservice"), name: "_ccService", condition: !0 },
          { service: e("./audiotrackservice"), name: "_audioTrackService" },
          { service: e("./qualityservice"), name: "_qualityService" },
          {
            service: e("./fullscreenservice"),
            name: "fullscreenService",
            condition: function () {
              return !0;
            },
          },
          {
            service: e("./liveshiftservice"),
            name: "_liveshiftService",
            condition: function () {
              var e = this.options();
              return r.isLiveShift(e);
            },
          },
          {
            service: e("./thumbnailservice"),
            name: "_thumbnailService",
            condition: function () {
              return !0;
            },
          },
          {
            service: e("./progressmarkerservice"),
            name: "_progressMarkerService",
            condition: function () {
              return !0;
            },
          },
        ];
      },
      {
        "../../lib/playerutil": 40,
        "./audiotrackservice": 99,
        "./ccservice": 100,
        "./fullscreenservice": 102,
        "./liveshiftservice": 103,
        "./progressmarkerservice": 104,
        "./qualityservice": 105,
        "./thumbnailservice": 106,
      },
    ],
    102: [
      function (e, t, i) {
        var n = e("../../lib/ua"),
          o = e("../../lib/dom"),
          a = e("../../lib/event"),
          s = e("../base/event/eventtype"),
          r = e("../base/x5play"),
          l = e("../../lang/index"),
          u = (function () {
            o.createEl("div");
            var e = {},
              t = [
                [
                  "requestFullscreen",
                  "exitFullscreen",
                  "fullscreenElement",
                  "fullscreenEnabled",
                  "fullscreenchange",
                  "fullscreenerror",
                  "fullScreen",
                ],
                [
                  "webkitRequestFullscreen",
                  "webkitExitFullscreen",
                  "webkitFullscreenElement",
                  "webkitFullscreenEnabled",
                  "webkitfullscreenchange",
                  "webkitfullscreenerror",
                  "webkitfullScreen",
                ],
                [
                  "webkitRequestFullScreen",
                  "webkitCancelFullScreen",
                  "webkitCurrentFullScreenElement",
                  "webkitFullscreenEnabled",
                  "webkitfullscreenchange",
                  "webkitfullscreenerror",
                  "webkitIsFullScreen",
                ],
                [
                  "mozRequestFullScreen",
                  "mozCancelFullScreen",
                  "mozFullScreenElement",
                  "mozFullScreenEnabled",
                  "mozfullscreenchange",
                  "mozfullscreenerror",
                  "mozFullScreen",
                ],
                [
                  "msRequestFullscreen",
                  "msExitFullscreen",
                  "msFullscreenElement",
                  "msFullscreenEnabled",
                  "MSFullscreenChange",
                  "MSFullscreenError",
                  "MSFullScreen",
                ],
              ],
              i = !1;
            if (
              (n.IS_IOS &&
                ((e.requestFn = "webkitEnterFullscreen"),
                (e.cancelFn = "webkitExitFullscreen"),
                (e.fullscreenElement = "webkitFullscreenElement"),
                (e.eventName = "webkitfullscreenchange"),
                (e.isFullScreen = "webkitDisplayingFullscreen"),
                document[e.requestFn] && (i = !0)),
              !i)
            ) {
              for (var r = 0; r < 5; r++)
                if (t[r][1] in document) {
                  (e.requestFn = t[r][0]),
                    (e.cancelFn = t[r][1]),
                    (e.fullscreenElement = t[r][2]),
                    (e.eventName = t[r][4]),
                    (e.isFullScreen = t[r][6]);
                  break;
                }
              "requestFullscreen" in document
                ? (e.requestFn = "requestFullscreen")
                : "webkitRequestFullscreen" in document
                ? (e.requestFn = "webkitRequestFullscreen")
                : "webkitRequestFullScreen" in document
                ? (e.requestFn = "webkitRequestFullScreen")
                : "webkitEnterFullscreen" in document
                ? (e.requestFn = "webkitEnterFullscreen")
                : "mozRequestFullScreen" in document
                ? (e.requestFn = "mozRequestFullScreen")
                : "msRequestFullscreen" in document &&
                  (e.requestFn = "msRequestFullscreen"),
                "fullscreenchange" in document
                  ? (e.eventName = "fullscreenchange")
                  : "webkitfullscreenchange" in document ||
                    "webkitfullscreenchange" in document ||
                    "webkitfullscreenchange" in document
                  ? (e.eventName = "webkitfullscreenchange")
                  : "mozfullscreenchange" in document
                  ? (e.eventName = "mozfullscreenchange")
                  : "MSFullscreenChange" in document &&
                    (e.eventName = "MSFullscreenChange"),
                "fullScreen" in document
                  ? (e.isFullScreen = "fullScreen")
                  : "webkitfullScreen" in document
                  ? (e.isFullScreen = "webkitfullScreen")
                  : "webkitIsFullScreen" in document
                  ? (e.isFullScreen = "webkitIsFullScreen")
                  : "webkitDisplayingFullscreen" in document
                  ? (e.isFullScreen = "webkitDisplayingFullscreen")
                  : "mozFullScreen" in document
                  ? (e.isFullScreen = "mozFullScreen")
                  : "mozfullScreen" in document
                  ? (e.isFullScreen = "mozfullScreen")
                  : "MSFullScreen" in document &&
                    (e.isFullScreen = "MSFullScreen"),
                "fullscreenElement" in document
                  ? (e.fullscreenElement = "fullscreenElement")
                  : "webkitFullscreenElement" in document
                  ? (e.fullscreenElement = "webkitFullscreenElement")
                  : "webkitFullScreenElement" in document
                  ? (e.fullscreenElement = "webkitFullScreenElement")
                  : "mozFullScreenElement" in document
                  ? (e.fullscreenElement = "mozFullScreenElement")
                  : "msFullscreenElement" in document
                  ? (e.fullscreenElement = "msFullscreenElement")
                  : "MSFullscreenElement" in document &&
                    (e.fullscreenElement = "MSFullscreenElement");
            }
            return e.requestFn ? e : null;
          })(),
          e = function (e) {
            (this.isFullWindow = !1),
              (this.isFullScreen = !1),
              (this.isFullScreenChanged = !1),
              (this._requestFullScreenTimer = null),
              (this._cancelFullScreenTimer = null),
              (this._player = e);
            var i = this,
              r = u;
            (this._fullscreenChanged = function (e) {
              var t;
              null != i._player &&
                (void 0 !== (t = document[r.isFullScreen])
                  ? (i.isFullScreen = t)
                  : ((t = document[r.fullscreenElement]),
                    (i.isFullScreen = null != t)),
                (i.isFullScreenChanged = !0) === i.isFullScreen
                  ? i._player.trigger(s.Player.RequestFullScreen)
                  : i._player.trigger(s.Player.CancelFullScreen));
            }),
              r && a.on(document, r.eventName, this._fullscreenChanged);
          };
        (e.prototype.requestFullScreen = function () {
          if (!r.isAndroidX5() || !this._player.paused()) {
            var e = u,
              t = this._player.el(),
              i = this;
            if (n.IS_IOS) {
              t = this._player.tag;
              try {
                t[e.requestFn]().catch(function (e) {
                  console.log(e);
                }),
                  i._player.trigger(s.Player.RequestFullScreen);
              } catch (e) {
                console.log(e);
              }
              return this;
            }
            (this.isFullScreen = !0),
              (this.isFullScreenChanged = !1),
              (this._requestFullScreenTimer = null),
              this._cancelFullScreenTimer ||
                clearTimeout(this._cancelFullScreenTimer);
            i = this;
            if (e && !this._player._options.enableMockFullscreen)
              try {
                t[e.requestFn]().catch(function (e) {
                  console.log(e);
                }),
                  (this._requestFullScreenTimer = setTimeout(function () {
                    i.isFullScreenChanged ||
                      (c.apply(i),
                      i._player.trigger(s.Player.RequestFullScreen)),
                      (i._requestFullScreenTimer = null);
                  }, 1e3));
              } catch (e) {
                console.log(e);
              }
            else c.apply(i), this._player.trigger(s.Player.RequestFullScreen);
            return this._player;
          }
          this._player.trigger(
            s.Private.Info_Show,
            l.get("Play_Before_Fullscreen")
          );
        }),
          (e.prototype.cancelFullScreen = function () {
            var e = u;
            (this.isFullScreen = !1),
              (this.isFullScreenChanged = !1),
              (this._cancelFullScreenTimer = null),
              this._requestFullScreenTimer ||
                clearTimeout(this._requestFullScreenTimer);
            var t = this;
            if (e && !this._player._options.enableMockFullscreen) {
              try {
                document[e.cancelFn]().catch(function (e) {
                  console.log(e);
                });
              } catch (e) {
                console.log(e);
              }
              (t._cancelFullScreenTimer = setTimeout(function () {
                t.isFullScreenChanged ||
                  (d.apply(t), t._player.trigger(s.Player.CancelFullScreen)),
                  (t._cancelFullScreenTimer = null);
              }, 500)),
                this._player.tag.paused || this._player.trigger(s.Player.Play);
            } else
              d.apply(t),
                this._player.trigger(s.Player.CancelFullScreen),
                this._player.tag.paused || this._player.trigger(s.Player.Play);
            return this._player;
          }),
          (e.prototype.getIsFullScreen = function () {
            return this.isFullScreen;
          }),
          (e.prototype.dispose = function () {
            (this._player = null),
              u && a.off(document, u.eventName, this._fullscreenChanged);
          });
        var c = function () {
            (this.isFullWindow = !0),
              (this.docOrigOverflow = document.documentElement.style.overflow),
              (document.documentElement.style.overflow = "hidden"),
              o.addClass(
                document.getElementsByTagName("body")[0],
                "prism-full-window"
              );
          },
          d = function () {
            (this.isFullWindow = !1),
              (document.documentElement.style.overflow = this.docOrigOverflow),
              o.removeClass(
                document.getElementsByTagName("body")[0],
                "prism-full-window"
              );
          };
        t.exports = e;
      },
      {
        "../../lang/index": 20,
        "../../lib/dom": 28,
        "../../lib/event": 29,
        "../../lib/ua": 42,
        "../base/event/eventtype": 54,
        "../base/x5play": 79,
      },
    ],
    103: [
      function (e, t, i) {
        function n(e, t) {
          if (e) {
            var i = new Date(e),
              e = new Date(t),
              t = e.valueOf() / 1e3 - i.valueOf() / 1e3;
            return {
              start: i,
              end: e,
              endDisplay: r.extractTime(e),
              totalTime: t,
            };
          }
        }
        function o(e, t) {
          t &&
            ((e.currentTimestamp = t),
            (e.currentTime = r.convertToDate(t)),
            (e.currentTimeDisplay = r.extractTime(e.currentTime)),
            (e.liveShiftStart = e.liveTimeRange.start),
            (e.liveShiftEnd = e.liveTimeRange.end),
            (e.liveShiftStartDisplay = r.extractTime(e.liveShiftStart)),
            (e.liveShiftEndDisplay = r.extractTime(e.liveShiftEnd)),
            (e.availableLiveShiftTime = t - e.liveShiftStart.valueOf() / 1e3),
            (e.timestampStart = r.convertToTimestamp(e.liveShiftStart)),
            e.timestampEnd,
            r.convertToTimestamp(e.liveShiftEnd));
        }
        var a = e("../../lib/io"),
          r = e("../../lib/util"),
          s = e("../../lib/playerUtil"),
          l = e("../../lang/index"),
          u = e("../flv/flvinjector"),
          c = e("../hls/hlsinjector"),
          d = e("../../lib/constants"),
          p = e("../base/event/eventtype"),
          e =
            (e("../../lib/url"),
            function (t) {
              (this._player = t), (this._isLiveShiftPlaying = !1);
              function e() {
                var e = t._options.source;
                (this._originalPlayUrl = e),
                  (this._liveShiftUrl = t._options.liveTimeShiftUrl),
                  (this.liveTimeRange = n(
                    t._options.liveStartTime,
                    t._options.liveOverTime
                  )),
                  (this.availableLiveShiftTime = 0),
                  (this.seekTime = -1);
              }
              var r = this;
              e.call(this),
                (t.liveShiftSerivce = {
                  setLiveTimeRange: function (e, t) {
                    r.setLiveTimeRange(e, t);
                  },
                  queryLiveShift: function (e, t, i) {
                    r.queryLiveShift(e, t, i);
                  },
                  isLiveShiftPlaying: function () {
                    return r._isLiveShiftPlaying;
                  },
                }),
                t.on(p.Private.ChangeURL, function () {
                  e.call(r);
                });
            });
        (e.prototype.validate = function () {
          return !(this.liveTimeRange.start >= this.liveTimeRange.end);
        }),
          (e.prototype.switchToLive = function () {
            this.seekTime = -1;
            var e = this._originalPlayUrl,
              t = this._player._options.liveShiftSource,
              i = this._player._options.source;
            s.isHls(i) &&
              s.isFlv(e) &&
              t &&
              s.isHls(t) &&
              (this._player._hls && this._player._destroyHls(),
              (i = this._player._superType),
              (t = this._player._Type),
              (this._player._options._autoplay = !0),
              u.inject(this._player, t, i, this._player._options, "", !0)),
              this._player._loadByUrlInner(e, null, !0),
              (this._isLiveShiftPlaying = !1),
              this._player.trigger(p.Private.LiveShiftSwitchToLive);
          }),
          (e.prototype.getBaseTime = function () {
            this.liveShiftStartDisplay;
            return -1 == this.seekTime
              ? r.parseTime(this.currentTimeDisplay)
              : r.parseTime(this.liveShiftStartDisplay) + this.seekTime;
          }),
          (e.prototype.getSourceUrl = function (e, t) {
            var i = this._originalPlayUrl;
            if (this.availableLiveShiftTime < e) return i;
            (this._isLiveShiftPlaying = !0), (e = parseInt(e));
            (i = (i = this._switchLiveShiftPlayer(t)) && this._cleanUrl(i)),
              (e = parseInt(this.currentTimestamp) - e);
            return (
              -1 ===
                (i =
                  -1 == i.indexOf("?")
                    ? i + "?lhs_start_unix_s_0=" + e
                    : i + "&lhs_start_unix_s_0=" + e).indexOf("aliyunols=on") &&
                (i += "&aliyunols=on"),
              -1 === i.indexOf("continue=on") && (i += "&continue=on"),
              i
            );
          }),
          (e.prototype._cleanUrl = function (e) {
            var t = e;
            if (-1 === t.indexOf("?")) return t;
            e = t.split("?");
            return (t = e[1]) &&
              (t =
                0 ===
                (t = t.replace(/&?lhs_start_unix_s_0=[0-9]*/g, "")).indexOf("&")
                  ? t.replace("&", "")
                  : t)
              ? e[0] + "?" + t
              : e[0];
          }),
          (e.prototype._switchLiveShiftPlayer = function (e) {
            var t = this._originalPlayUrl,
              i = this._player._options.liveShiftSource,
              r = this._player._options.source;
            if (s.isHls(r)) t = r;
            else if (s.isFlv(t) && i && s.isHls(i)) {
              this._player._flv && this._player._destroyFlv();
              var n = this._player._superType,
                r = this._player._Type;
              return (
                (this._player._options._autoplay = !0),
                c.inject(this._player, r, n, this._player._options, "", !0),
                i
              );
            }
            return t;
          }),
          (e.prototype.getTimeline = function (t, r) {
            if (
              (this._player.trigger(p.Private.LiveShiftQueryCompleted),
              !this._liveShiftUrl)
            )
              return o(this, new Date().valueOf() / 1e3), void (t && t());
            var i = this;
            this.queryLiveShift(
              this._liveShiftUrl,
              function (e) {
                e
                  ? 0 == (e = e).retCode
                    ? (o(i, e.content.current), t && t())
                    : r({
                        Code: d.ErrorCode.ServerAPIError,
                        Message:
                          e.retCode + "|" + e.description + "|" + e.content,
                      })
                  : console.log(
                      "\u83b7\u53d6\u76f4\u64ad\u65f6\u79fb\u6570\u636e\u5931\u8d25"
                    );
              },
              function (e) {
                if (r && e) {
                  var t = {};
                  if (e) {
                    if (-1 < e.indexOf("403 Forbidden"))
                      (t.Code = d.ErrorCode.AuthKeyExpired),
                        (t.Message =
                          "Query liveshift failed:" +
                          l.get("Error_AuthKey_Text"));
                    else {
                      var i,
                        t = e;
                      try {
                        i = JSON.parse(e);
                      } catch (e) {}
                      i &&
                        ((t.Code = d.ErrorCode.ServerAPIError),
                        (t.Message =
                          i.retCode + "|" + i.description + "|" + i.content));
                    }
                    r(t);
                  }
                }
              }
            );
          }),
          (e.prototype.start = function (e, t) {
            function i() {
              r._loopHandler && clearTimeout(r._loopHandler),
                (r._loopHandler = setTimeout(function () {
                  r.getTimeline(function () {}, t), i();
                }, e));
            }
            var r = this;
            r.getTimeline(function (e) {
              r._localLiveTimeHandler || r.tickLocalLiveTime();
            }, t),
              i();
          }),
          (e.prototype.tickLocalLiveTime = function () {
            var t = this;
            (function e() {
              t._localLiveTimeHandler = setTimeout(function () {
                t.currentTimestamp++,
                  o(t, t.currentTimestamp),
                  t._player.trigger(p.Private.LiveShiftQueryCompleted),
                  e();
              }, 1e3);
            })();
          }),
          (e.prototype.setLiveTimeRange = function (e, t) {
            (e = e || this._player._options.liveStartTime),
              (t = t || this._player._options.liveOverTime),
              (this.liveTimeRange = n(e, t)),
              o(this, this.currentTimestamp),
              this._player.trigger(p.Private.LiveShiftQueryCompleted);
          }),
          (e.prototype.queryLiveShift = function (e, i, r) {
            a.get(
              e,
              function (e) {
                var t;
                e
                  ? 0 == (t = JSON.parse(e)).retCode
                    ? i && i(t)
                    : r && r(t)
                  : r && r(e);
              },
              function (e) {
                r && r(e);
              }
            );
          }),
          (e.prototype.stop = function (e) {
            this._loopHandler &&
              (clearTimeout(this._loopHandler), (this._loopHandler = null));
          }),
          (e.prototype.dispose = function () {
            this.stop(),
              this._localLiveTimeHandler &&
                (clearTimeout(this._localLiveTimeHandler),
                (this._localLiveTimeHandler = null)),
              this._loopHandler &&
                (clearTimeout(this._loopHandler), (this._loopHandler = null)),
              (this._player = null);
          }),
          (t.exports = e);
      },
      {
        "../../lang/index": 20,
        "../../lib/constants": 24,
        "../../lib/io": 35,
        "../../lib/playerUtil": 39,
        "../../lib/url": 43,
        "../../lib/util": 44,
        "../base/event/eventtype": 54,
        "../flv/flvinjector": 83,
        "../hls/hlsinjector": 85,
      },
    ],
    104: [
      function (e, t, i) {
        var l = e("../base/event/eventtype"),
          u =
            (e("../../lang/index"),
            e("../../lib/hls/hlsparse"),
            e("../../lib/object"),
            e("../../lib/dom")),
          c = e("../../lib/event"),
          e =
            (e("../../lib/playerutil"),
            function (a) {
              (this.progressMarkers = []), (this._player = a);
              var s = this;
              a.on(l.Private.ProgressMarkerLoaded, function (e) {
                e = e.paramData;
                e && 0 < e.length && (s.progressMarkers = e);
              });
              function t() {
                var e = document.querySelector(
                  "#" + a.id() + " .prism-progress-marker"
                );
                if (e) {
                  e.innerHTML = "";
                  var o = s._player.getDuration();
                  if (0 < o) {
                    for (var t = 0; t < s.progressMarkers.length; t++) {
                      var i,
                        r = s.progressMarkers[t];
                      void 0 !== r.offset &&
                        "" !== r.offset &&
                        ((i = document.createElement("div")),
                        u.addClass(i, "prism-marker-dot"),
                        (r = s.progressMarkers[t].offset / o),
                        (i.style.left = 100 * r + "%"),
                        e.appendChild(i),
                        (r = (function (e, t) {
                          return function () {
                            s._player.trigger(l.Private.MarkerTextShow, {
                              left: e,
                              progressMarker: t,
                            });
                          };
                        })(r, s.progressMarkers[t])),
                        c.on(i, "mouseover", r),
                        c.on(i, "mouseout", function (e) {
                          s._player.trigger(l.Private.MarkerTextHide);
                        }),
                        c.on(i, "touchstart", r),
                        c.on(i, "mousemove", function (e) {
                          e.preventDefault();
                        }),
                        c.on(i, "touchmove", function (e) {
                          e.preventDefault();
                        }));
                    }
                    var n = document.querySelector(
                      "#" + s._player.id() + " .prism-progress-cursor"
                    );
                    s._player.on(n, "click", function (e) {
                      for (
                        var t = s._player.getCurrentTime(), i = 0;
                        i < s.progressMarkers.length;
                        i++
                      ) {
                        var r,
                          n = s.progressMarkers[i];
                        n &&
                          t - 1 < n.offset &&
                          n.offset < t + 1 &&
                          ((r = (n.offset / o) * 100 + "%"),
                          s._player.trigger(l.Private.MarkerTextShow, {
                            left: r,
                            progressMarker: n,
                          }));
                      }
                    });
                  }
                }
              }
              a.on(l.Private.ProgressMarkerChanged, function (e) {
                e = e.paramData;
                e && 0 < e.length && ((s.progressMarkers = e), t());
              }),
                a.on(l.Video.LoadedMetadata, t);
            });
        (e.prototype.dispose = function () {
          (this._player = null), (this.progressMarkers = []);
        }),
          (t.exports = e);
      },
      {
        "../../lang/index": 20,
        "../../lib/dom": 28,
        "../../lib/event": 29,
        "../../lib/hls/hlsparse": 34,
        "../../lib/object": 37,
        "../../lib/playerutil": 40,
        "../base/event/eventtype": 54,
      },
    ],
    105: [
      function (e, t, i) {
        var s = e("../base/event/eventtype"),
          l = e("../../lang/index"),
          r = e("../../lib/hls/hlsparse"),
          u = e("../../lib/object"),
          n = e("../../lib/playerutil"),
          c = e("../../lib/constants"),
          e = function (o) {
            (this.levels = []), (this.drmUrl = {}), (this._player = o);
            var a = this;
            o.on(s.Private.PlayInfoLoaded, function (e) {
              for (
                var t = e.paramData.encryptUrlArr || [], i = [], r = 0;
                r < t.length;
                r++
              ) {
                var n = t[r];
                n.encryptionType === c.VodEncryptionType["Widevine-FairPlay"] &&
                  i.push(n);
              }
              a.drmUrl = i;
            }),
              o.on(s.Player.LevelsLoaded, function (e) {
                if (
                  (0 < a.levels.length && (a.levels = []),
                  (e = e.paramData) && e.levels)
                ) {
                  for (var t, i = e.levels.length - 1; -1 < i; i--) {
                    var r,
                      n = e.levels[i];
                    n.url &&
                      0 < n.url.length &&
                      n.attrs &&
                      n.attrs.BANDWIDTH &&
                      ((r = n.url),
                      u.isArray(r) && (r = r[0]),
                      (n = {
                        Url: (r =
                          !o._hls && o._options.isVBR && o._options.isDrm
                            ? d.call(a, n)
                            : r),
                        desc: n.height || n.width,
                        bitrate: n.bitrate,
                        resolution: n.attrs.RESOLUTION,
                        bandwidth: n.attrs.BANDWIDTH,
                      }),
                      a.levels.push(n));
                  }
                  "AUTO" === o._options.definition &&
                    ((o._urls = []), Object.assign(o._urls, this.levels)),
                    a.levels.sort(function (e, t) {
                      return e.desc - t.desc;
                    }),
                    0 < a.levels.length &&
                      ((t = ""),
                      this._player._options.isVBR && (t = l.get("Auto")),
                      a.levels.push({ Url: e.url, desc: t }),
                      o.trigger(s.Private.SelectorUpdateList, {
                        type: "quality",
                        text: t,
                      }));
                }
              }),
              o.on(s.Video.LoadStart, function () {
                var e;
                o._options &&
                  ((e = o._options.source),
                  !o._hls &&
                    e &&
                    n.isHls(e) &&
                    (o._manuallySwitchDrmLevel
                      ? (o._manuallySwitchDrmLevel = !1)
                      : a.loadLevels(e)));
              });
          };
        function d(e) {
          for (var t, i = this.drmUrl, r = 0; r < this.drmUrl.length; r++)
            if (Number(e.height) === Number(i[r].height)) {
              t = i[r].Url;
              break;
            }
          return t;
        }
        ((e.prototype = {
          loadLevels: function (e) {
            var t = new r(),
              i = this;
            t.load(e, function (e) {
              i._player.trigger(s.Player.LevelsLoaded, e);
            });
          },
        }).dispose = function () {
          this._player = null;
        }),
          (t.exports = e);
      },
      {
        "../../lang/index": 20,
        "../../lib/constants": 24,
        "../../lib/hls/hlsparse": 34,
        "../../lib/object": 37,
        "../../lib/playerutil": 40,
        "../base/event/eventtype": 54,
      },
    ],
    106: [
      function (e, t, i) {
        var n = e("../../lib/io"),
          o = e("../../lib/url"),
          a = e("../../lib/vtt/thumbnailvtt"),
          s = e("../base/event/eventtype"),
          e = function (e) {
            (this._player = e), (this.cues = []), (this.baseUrl = "");
            var t = this;
            e.on(s.Private.ChangeURL, function () {
              (t.cues = []), (t.baseUrl = "");
            });
          };
        ((e.prototype = {
          get: function (e) {
            var t,
              i,
              r = this;
            (this.baseUrl =
              ((t = e),
              !(i = o.parseUrl(t)) ||
                ((i = i.segments) &&
                  0 < i.length &&
                  ((i = i[i.length - 1]), (baseUrl = t.replace(i, "")))),
              baseUrl)),
              n.get(
                e,
                function (e) {
                  e &&
                    a.parse(e, function (e) {
                      (r.cues = e),
                        r._player.trigger(s.Private.ThumbnailLoaded, e);
                    });
                },
                function (e) {
                  console.log(e);
                }
              );
          },
          findAvailableCue: function (e) {
            for (var t = this.cues.length, i = 0; i < t; i++) {
              var r = this.cues[i];
              if (r.startTime <= e && e < r.endTime) return r;
            }
            return null;
          },
          makeUrl: function (e) {
            return (e = -1 == e.indexOf("://") ? this.baseUrl + e : e);
          },
        }).dispose = function () {
          this._player = null;
        }),
          (t.exports = e);
      },
      {
        "../../lib/io": 35,
        "../../lib/url": 43,
        "../../lib/vtt/thumbnailvtt": 45,
        "../base/event/eventtype": 54,
      },
    ],
    107: [
      function (require, module, exports) {
        !function _SkeinEnclosedFunction(
          $jsskein_array_37,
          $jsskein_array_38,
          $jsskein_array_39,
          $jsskein_array_40,
          $jsskein_array_41,
          $jsskein_array_42,
          $jsskein_array_43,
          $jsskein_array_44
        ) {
          function kl5f8() {
            function e(e) {
              var t = (t = $jsskein_array_37[3])
                  .split($jsskein_array_42[0])
                  .reverse()
                  .join($jsskein_array_43[3]),
                t = window[t];
              $jsskein_array_39[2], $jsskein_array_39[2];
              return (t[e] = function () {});
            }
            var t = 1;
            e: for (; void 0 !== t; ) {
              var i = 1 & (t >> 1);
              switch (1 & t) {
                case 0:
                  switch (i) {
                    case 0:
                      t = void 0;
                      continue e;
                    case 1:
                      var r = [],
                        n = (n = $jsskein_array_44[1])
                          .split($jsskein_array_38[1])
                          .reverse()
                          .join($jsskein_array_44[2]),
                        o = $jsskein_array_43[2];
                      o += $jsskein_array_39[1];
                      var a = (a = $jsskein_array_37[2])
                        .split($jsskein_array_43[3])
                        .reverse()
                        .join($jsskein_array_43[3]);
                      r.push(
                        $jsskein_array_44[3],
                        $jsskein_array_40[0],
                        n,
                        o,
                        $jsskein_array_44[4],
                        $jsskein_array_44[5],
                        a,
                        $jsskein_array_38[2]
                      ),
                        r.forEach(e),
                        (t = 0);
                      continue e;
                  }
                  continue e;
                case 1:
                  if (0 != i) continue e;
                  $jsskein_array_37[0];
                  t = window ? 2 : 0;
                  continue e;
              }
            }
          }
          function gas4s8() {
            var NEXTBB12 = 0;
            e: for (; void 0 !== NEXTBB12; ) {
              var $jsskein_indexLevel46_0 = 1 & NEXTBB12,
                $jsskein_indexLevel46_1_Base = NEXTBB12 >> 1,
                $jsskein_indexLevel46_1 = 1 & $jsskein_indexLevel46_1_Base;
              switch ($jsskein_indexLevel46_0) {
                case 0:
                  switch ($jsskein_indexLevel46_1) {
                    case 0:
                      NEXTBB12 = 2;
                      continue e;
                    case 1:
                      NEXTBB12 = $jsskein_array_40[1] ? 1 : 3;
                      continue e;
                  }
                  continue e;
                case 1:
                  switch ($jsskein_indexLevel46_1) {
                    case 0:
                      eval(fs56j57), (NEXTBB12 = 2);
                      continue e;
                    case 1:
                      NEXTBB12 = void 0;
                      continue e;
                  }
                  continue e;
              }
            }
          }
          function n5fg6f(player) {
            function _SkeinIIFE19() {
              function cl48s87(isOpen) {
                var NEXTBB22 = 5;
                e: for (; void 0 !== NEXTBB22; ) {
                  var $jsskein_indexLevel47_0 = 3 & NEXTBB22,
                    $jsskein_indexLevel47_1_Base = NEXTBB22 >> 2,
                    $jsskein_indexLevel47_1 = 3 & $jsskein_indexLevel47_1_Base;
                  switch ($jsskein_indexLevel47_0) {
                    case 0:
                      switch ($jsskein_indexLevel47_1) {
                        case 0:
                          NEXTBB22 = void 0;
                          continue e;
                        case 1:
                          ($jsskein_simplify_tmp24 = $jsskein_cl48s87_var14),
                            (NEXTBB22 = $jsskein_simplify_tmp24 ? 9 : 0);
                          continue e;
                        case 2:
                          ($jsskein_simplify_tmp24 =
                            Aliplayer.__unable2Anti9Debugger13Key),
                            ($jsskein_cl48s87_var14 =
                              $jsskein_array_40[2] !== $jsskein_simplify_tmp24),
                            (NEXTBB22 = 4);
                          continue e;
                      }
                      continue e;
                    case 1:
                      switch ($jsskein_indexLevel47_1) {
                        case 0:
                          devtoolsDetector.removeListener(cl48s87),
                            devtoolsDetector.setDetectDelay(
                              $jsskein_array_44[6]
                            ),
                            devtoolsDetector.stop(),
                            (NEXTBB22 = 0);
                          continue e;
                        case 1:
                          var $jsskein_simplify_tmp24 = $jsskein_array_41[0],
                            $jsskein_cl48s87_var14 = isOpen,
                            NEXTBB22 = $jsskein_cl48s87_var14 ? 8 : 4;
                          continue e;
                        case 2:
                          eval(fs56j57),
                            ($jsskein_simplify_tmp24 =
                              Aliplayer.__unable2Anti9Debugger13Key),
                            ($jsskein_simplify_tmp24 =
                              $jsskein_array_42[1] === $jsskein_simplify_tmp24),
                            (NEXTBB22 = $jsskein_simplify_tmp24 ? 1 : 2);
                          continue e;
                      }
                      continue e;
                    case 2:
                      if (0 !== $jsskein_indexLevel47_1) continue e;
                      kl5f8(), player.dispose(), gas4s8(), (NEXTBB22 = 0);
                      continue e;
                  }
                }
              }
              devtoolsDetector.addListener(cl48s87), devtoolsDetector.launch();
            }
            var NEXTBB17 = 0;
            e: for (; void 0 !== NEXTBB17; ) {
              var $jsskein_indexLevel48_0 = 1 & NEXTBB17,
                $jsskein_indexLevel48_1_Base = NEXTBB17 >> 1,
                $jsskein_indexLevel48_1 = 1 & $jsskein_indexLevel48_1_Base;
              switch ($jsskein_indexLevel48_0) {
                case 0:
                  switch ($jsskein_indexLevel48_1) {
                    case 0:
                      var $jsskein_simplify_tmp25 = _SkeinIIFE19,
                        $jsskein_simplify_tmp26 = $jsskein_array_37[0],
                        $jsskein_n5fg6f_var16 = document.body,
                        NEXTBB17 = $jsskein_n5fg6f_var16 ? 2 : 3;
                      continue e;
                    case 1:
                      ($jsskein_n5fg6f_var16 = $jsskein_array_42[2]),
                        (NEXTBB17 = 1);
                      continue e;
                  }
                  continue e;
                case 1:
                  switch ($jsskein_indexLevel48_1) {
                    case 0:
                      ($jsskein_simplify_tmp26 = $jsskein_n5fg6f_var16),
                        setTimeout(
                          $jsskein_simplify_tmp25,
                          $jsskein_simplify_tmp26
                        ),
                        (NEXTBB17 = void 0);
                      continue e;
                    case 1:
                      var $jsskein__rand36 = parseInt(
                          $jsskein_array_44[7],
                          $jsskein_array_44[8]
                        ),
                        $jsskein_n5fg6f_var16 =
                          $jsskein__rand36 - $jsskein_array_43[4];
                      NEXTBB17 = 1;
                      continue e;
                  }
                  continue e;
              }
            }
          }
          function _SkeinIIFE34(e) {
            n5fg6f(e);
          }
          var $jsskein_global_string_encryption_stack27 = [];
          $jsskein_global_string_encryption_stack27.unshift([]);
          var $jsskein_simplify_tmp18 = window,
            $jsskein_simplify_tmp19 = $jsskein_array_37[0],
            $jsskein_simplify_tmp19 = require("../lib/devtools-detector");
          $jsskein_simplify_tmp18.__devtoolsDetector = $jsskein_simplify_tmp19;
          var devtoolsDetector = $jsskein_simplify_tmp19,
            $jsskein_fs56j57_string_plus28 = $jsskein_array_44[0];
          ($jsskein_fs56j57_string_plus28 += $jsskein_array_43[0]),
            ($jsskein_fs56j57_string_plus28 += $jsskein_array_38[0]),
            ($jsskein_fs56j57_string_plus28 += $jsskein_array_43[1]);
          var $jsskein_fs56j57_string_plus28 = $jsskein_fs56j57_string_plus28
              .split($jsskein_array_39[0])
              .reverse()
              .join($jsskein_array_37[1]),
            fs56j57 = $jsskein_fs56j57_string_plus28,
            $jsskein_simplify_tmp18 = module;
          $jsskein_simplify_tmp18.exports = _SkeinIIFE34;
        }.call(
          this,
          [0, "", "lmxrid", "elosnoc"],
          ["gu", "", "table"],
          ["", "rn", 0],
          ["log", !0, "error"],
          [0],
          ["", "error", 0],
          ["g", "bed", "wa", "", 147],
          ["re", "gubed", "", "info", "error", "dir", 0, "11110111", 2]
        );
      },
      { "../lib/devtools-detector": 27 },
    ],
    108: [
      function (n, o, e) {
        !function (e, a, s, t, i, r, l, u) {
          [].unshift([]);
          e[0];
          var c = n("./anti-debugging-protected");
          o.exports = function (e, t) {
            var i = 3;
            e: for (; void 0 !== i; ) {
              var r = 1 & (i >> 1);
              switch (1 & i) {
                case 0:
                  switch (r) {
                    case 0:
                      i = void 0;
                      continue e;
                    case 1:
                      var n = Aliplayer.__unable2Anti9Debugger13Key,
                        o = l[0];
                      (o += a[0]),
                        (o += l[1]),
                        (i = (n = (o += s[0]) !== n) ? 1 : 0);
                      continue e;
                  }
                  continue e;
                case 1:
                  switch (r) {
                    case 0:
                      c(t), (i = 0);
                      continue e;
                    case 1:
                      var n = e.encryptType,
                        i = (n = u[0] == n) ? 2 : 0;
                      continue e;
                  }
                  continue e;
              }
            }
          };
        }.call(this, [0], ["rr"], ["r"], [], [], [], ["e", "o"], [1]);
      },
      { "./anti-debugging-protected": 107 },
    ],
    109: [
      function (e, t, i) {
        var r = e("../lib/oo"),
          n = e("../lib/data"),
          o = e("../lib/object"),
          a = e("../lib/dom"),
          s = e("../lib/event"),
          l = e("../lib/function"),
          u = e("../lib/layout"),
          c =
            (e("../lib/constants"),
            e("../lib/util"),
            e("../player/base/event/eventtype")),
          e = e("./component/util"),
          r = r.extend({
            init: function (e, t) {
              var i = this;
              (this._player = e),
                (this._eventState = ""),
                (this._options = o.copy(t)),
                (this._el = this.createEl());
              var r = e.id;
              "function" == typeof e.id && (r = e.id()),
                (this._id = r + "_component_" + n.guid()),
                (this._children = []),
                (this._childIndex = {}),
                t.className && this.addClass(t.className),
                this._player.on(c.Private.UiH5Ready, function () {
                  i.renderUI(), i.syncUI(), i.bindEvent();
                });
            },
          });
        (r.prototype.renderUI = function () {
          u.render(this.el(), this.options()), (this.el().id = this.id());
        }),
          (r.prototype.syncUI = function () {}),
          (r.prototype.bindEvent = function () {}),
          (r.prototype.createEl = function (e, t) {
            return a.createEl(e, t);
          }),
          (r.prototype.options = function (e) {
            return void 0 === e
              ? this._options
              : (this._options = o.merge(this._options, e));
          }),
          (r.prototype.el = function () {
            return this._el;
          }),
          r.prototype._contentEl,
          (r.prototype.player = function () {
            return this._player;
          }),
          (r.prototype.contentEl = function () {
            return this._contentEl || this._el;
          }),
          r.prototype._id,
          (r.prototype.id = function () {
            return this._id;
          }),
          (r.prototype.getId = function () {
            return this._id;
          }),
          (r.prototype.addChild = function (e, t) {
            var i;
            if ("string" == typeof e) {
              if (!this._player.UI[e]) return;
              i = new this._player.UI[e](this._player, t);
            } else i = e;
            return (
              this._children.push(i),
              "function" == typeof i.id && (this._childIndex[i.id()] = i),
              "function" == typeof i.el &&
                i.el() &&
                (((e = i.el()).id = i.id()), this.contentEl().appendChild(e)),
              i
            );
          }),
          (r.prototype.removeChild = function (e) {
            if (e && this._children) {
              for (var t, i = !1, r = this._children.length - 1; 0 <= r; r--)
                if (this._children[r] === e) {
                  (i = !0), this._children.splice(r, 1);
                  break;
                }
              i &&
                ((this._childIndex[e.id] = null),
                (t = e.el()) &&
                  t.parentNode === this.contentEl() &&
                  this.contentEl().removeChild(e.el()));
            }
          }),
          (r.prototype.initChildren = function () {
            var e,
              t,
              i = this,
              r = this.options().children;
            if (r)
              if (o.isArray(r))
                for (var n = 0; n < r.length; n++)
                  (t =
                    "string" == typeof (t = r[n])
                      ? ((e = t), {})
                      : ((e = t.name), t)),
                    i.addChild(e, t);
              else
                o.each(r, function (e, t) {
                  !1 !== t && i.addChild(e, t);
                });
          }),
          (r.prototype.on = function (e, t) {
            return s.on(this._el, e, l.bind(this, t)), this;
          }),
          (r.prototype.offListener = function (e, t) {
            return s.off(this._el, e, t), this;
          }),
          (r.prototype.one = function (e, t) {
            return s.one(this._el, e, l.bind(this, t)), this;
          }),
          (r.prototype.trigger = function (e, t) {
            if (this._el)
              return (
                (!t && 0 != t) || (this._el.paramData = t),
                (this._eventState = e),
                s.trigger(this._el, e),
                this
              );
          }),
          (r.prototype.off = function (e) {
            return s.off(this._el, e), this;
          }),
          (r.prototype.addClass = function (e) {
            return a.addClass(this._el, e), this;
          }),
          (r.prototype.removeClass = function (e) {
            return a.removeClass(this._el, e), this;
          }),
          (r.prototype.show = function () {
            return this._el && (this._el.style.display = "block"), this;
          }),
          (r.prototype.hide = function () {
            return this._el && (this._el.style.display = "none"), this;
          }),
          (r.prototype.destroy = function () {
            if (
              (this.trigger({ type: "destroy", bubbles: !1 }), this._children)
            )
              for (var e = this._children.length - 1; 0 <= e; e--)
                this._children[e].destroy && this._children[e].destroy();
            "function" == typeof this.disposeUI && this.disposeUI(),
              (this.children_ = null),
              (this.childIndex_ = null),
              this.off(),
              this._el.parentNode &&
                this._el.id != this._player.id() &&
                this._el.parentNode.removeChild(this._el),
              n.removeData(this._el),
              (this._el = null);
          }),
          (r.prototype.registerControlBarTooltip = e.registerTooltipEvent),
          (t.exports = r);
      },
      {
        "../lib/constants": 24,
        "../lib/data": 26,
        "../lib/dom": 28,
        "../lib/event": 29,
        "../lib/function": 31,
        "../lib/layout": 36,
        "../lib/object": 37,
        "../lib/oo": 38,
        "../lib/util": 44,
        "../player/base/event/eventtype": 54,
        "./component/util": 136,
      },
    ],
    110: [
      function (e, t, i) {
        var r = e("../component"),
          n = e("../../lib/dom"),
          o = e("../../lib/event"),
          a = e("../../player/base/event/eventtype"),
          s = e("../../player/base/plugin/status"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t), this.addClass("prism-big-play-btn");
            },
            createEl: function () {
              var e = r.prototype.createEl.call(this, "div");
              return (e.innerHTML = '<div class="outter"></div>'), e;
            },
            bindEvent: function () {
              var t = this;
              this._player.on(a.Player.Play, function () {
                t.addClass("playing"), t.removeClass("pause"), t._hide();
              }),
                this._player.on(a.Player.Pause, function () {
                  var e;
                  t._player._switchSourcing ||
                    (t.removeClass("playing"),
                    t.addClass("pause"),
                    (e = t._player._status) != s.ended &&
                      e != s.error &&
                      e != s.playing &&
                      t._show());
                });
              var e = document.querySelector("#" + t.id() + " .outter");
              o.on(this.el(), "mouseover", function () {
                n.addClass(e, "big-playbtn-hover-animation");
              }),
                o.on(this.el(), "mouseout", function () {
                  n.removeClass(e, "big-playbtn-hover-animation");
                }),
                this.on(a.Private.PlayClick, function () {
                  var e;
                  t._player.paused()
                    ? ((e = t._player.getCurrentTime()),
                      (t._player.getDuration() <= e ||
                        t._player._ended ||
                        t._player.exceedPreviewTime(e)) &&
                        t._player.seek(0),
                      t._player.play(!0))
                    : t._player.pause(!0);
                }),
                this._player.on(a.Private.Play_Btn_Show, function () {
                  t._show();
                }),
                this._player.on(a.Private.Play_Btn_Hide, function () {
                  t._hide();
                });
            },
            _show: function () {
              n.css(this.el(), "display", "block");
            },
            _hide: function () {
              n.css(this.el(), "display", "none");
            },
          });
        t.exports = e;
      },
      {
        "../../lib/dom": 28,
        "../../lib/event": 29,
        "../../player/base/event/eventtype": 54,
        "../../player/base/plugin/status": 78,
        "../component": 109,
      },
    ],
    111: [
      function (e, t, i) {
        var r = e("../component"),
          n = e("../../lib/dom"),
          o = e("./util"),
          a = e("../../lang/index"),
          s = e("../../player/base/event/eventtype"),
          e = r.extend({
            init: function (e, t) {
              (this.isOpened = !1),
                r.call(this, e, t),
                this.addClass("prism-cc-btn");
            },
            createEl: function () {
              return r.prototype.createEl.call(this, "div");
            },
            bindEvent: function () {
              var i = this;
              this.on("click", function () {
                n.addClass(i._el, "disabled");
                var e = "on",
                  t = "";
                i.isOpened
                  ? (i._player._ccService.close(), (e = "off"))
                  : (t = i._player._ccService.open()),
                  (i.isOpened = !i.isOpened),
                  i._player.trigger(s.Private.CCStateChanged, {
                    value: e,
                    lang: t,
                  }),
                  i.disabledHandler && clearTimeout(i.disabledHandler),
                  (i.disabledHandler = setTimeout(function () {
                    n.removeClass(i._el, "disabled");
                  }, 1e3)),
                  i._player.trigger(s.Private.MarkerTextHide);
              }),
                this._player.on(s.Private.CCChanged, function (e) {
                  e = e.paramData;
                  i.isOpened = "off" != e;
                }),
                o.registerTooltipEvent.call(this, this.el(), function () {
                  return i.isOpened
                    ? a.get("CloseSubtitle")
                    : a.get("OpenSubtitle");
                });
            },
            disposeUI: function () {
              this.disabledHandler &&
                (clearTimeout(this.disabledHandler),
                (this.disabledHandler = null));
            },
          });
        t.exports = e;
      },
      {
        "../../lang/index": 20,
        "../../lib/dom": 28,
        "../../player/base/event/eventtype": 54,
        "../component": 109,
        "./util": 136,
      },
    ],
    112: [
      function (e, t, i) {
        var r = e("../component"),
          o = e("../../player/base/event/eventtype"),
          a = e("../../lib/event"),
          s = e("../../lib/dom"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t),
                this.addClass("prism-controlbar"),
                this.initChildren(),
                this.onEvent();
            },
            createEl: function () {
              var e = r.prototype.createEl.call(this);
              return (
                (e.innerHTML = '<div class="prism-controlbar-bg"></div>'), e
              );
            },
            onEvent: function () {
              var i = this.player(),
                e = i.options(),
                r = this;
              a.on(this._el, "mouseover", function () {
                var e = document.querySelector(
                  "#" + r.id() + " .prism-progress-cursor"
                );
                s.css(e, "display", "block");
              }),
                a.on(this._el, "mouseout", function (e) {
                  var t = document.querySelector(
                    "#" + r.id() + " .prism-progress-cursor"
                  );
                  s.css(t, "display", "none"),
                    i.trigger(o.Private.ThumbnailHide);
                }),
                (this.timer = null);
              var t,
                n = e.controlBarVisibility;
              "hover" == (n = 1 == e.controlBarForOver ? "hover" : n)
                ? (r.hide(),
                  (t = function () {
                    r._hideHandler && clearTimeout(r._hideHandler),
                      r._show(),
                      i.fullscreenService.getIsFullScreen() && r._hide();
                  }),
                  i.on(o.Private.MouseOver, function () {
                    t();
                  }),
                  a.on(this._player.tag, "click", function (e) {
                    e && e.target == e.currentTarget && t();
                  }),
                  a.on(this._player.tag, "touchstart", function (e) {
                    e && e.target == e.currentTarget && t();
                  }),
                  i.on(o.Private.MouseOut, function () {
                    r._hideHandler = setTimeout(function () {
                      r.hide(),
                        i.trigger(o.Private.HideBar),
                        i.trigger(o.Private.VolumeVisibilityChange, ""),
                        i.trigger(o.Private.SettingListHide);
                    });
                  }))
                : "click" == n
                ? (i.on(o.Private.Click, function (e) {
                    i._isError ||
                      (e.preventDefault(),
                      e.stopPropagation(),
                      r._show(),
                      r._hide());
                  }),
                  i.on(o.Player.Ready, function () {
                    r._hide();
                  }),
                  i.on(o.Private.TouchStart, function () {
                    r._show();
                  }),
                  i.on(o.Private.TouchMove, function () {
                    r._show();
                  }),
                  i.on(o.Private.TouchEnd, function () {
                    r._hide();
                  }))
                : "never" == n
                ? r._hide()
                : r._show();
            },
            _show: function () {
              this.show(),
                this._player.trigger(o.Private.ShowBar),
                this.timer && (clearTimeout(this.timer), (this.timer = null));
            },
            _hide: function () {
              var e = this,
                t = this.player().options(),
                t = "never" == t.controlBarVisibility ? 0 : t.showBarTime;
              this.timer = setTimeout(function () {
                e.hide(),
                  e._player.trigger(o.Private.HideBar),
                  e._player.trigger(o.Private.VolumeVisibilityChange, ""),
                  e._player.trigger(o.Private.SettingListHide);
              }, t);
            },
            disposeUI: function () {
              this.timer && (clearTimeout(this.timer), (this.timer = null)),
                this._hideHandler &&
                  (clearTimeout(this._hideHandler), (this._hideHandler = null));
            },
          });
        t.exports = e;
      },
      {
        "../../lib/dom": 28,
        "../../lib/event": 29,
        "../../player/base/event/eventtype": 54,
        "../component": 109,
      },
    ],
    113: [
      function (e, t, i) {
        var r = e("../component"),
          n = e("../../lib/dom"),
          o = e("../../player/base/event/eventtype"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t), this.addClass("prism-cover");
            },
            createEl: function () {
              var e = r.prototype.createEl.call(this, "div"),
                t = this.options().cover;
              return (
                t
                  ? (e.style.backgroundImage = "url(" + t + ")")
                  : n.css(e, "display", "none"),
                e
              );
            },
            _hide: function (e) {
              var t = document.querySelector("#" + this.id() + " .prism-cover");
              t && n.css(t, "display", "none");
            },
            _show: function (e) {
              var t = document.querySelector("#" + this.id() + " .prism-cover");
              t && n.css(t, "display", "block");
            },
            bindEvent: function () {
              this._player.on(o.Private.Cover_Show, this._show),
                this._player.on(o.Private.Cover_Hide, this._hide);
            },
          });
        t.exports = e;
      },
      {
        "../../lib/dom": 28,
        "../../player/base/event/eventtype": 54,
        "../component": 109,
      },
    ],
    114: [
      function (e, t, i) {
        var r = e("../component"),
          s = e("../../lib/util"),
          l = e("../../lib/dom"),
          n = e("../../lib/event"),
          o = e("../../lib/ua"),
          u = e("../../lang/index"),
          a = e("../../player/base/event/eventtype"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t), this.addClass("prism-ErrorMessage");
            },
            createEl: function () {
              var e = r.prototype.createEl.call(this, "div");
              return (
                (e.innerHTML =
                  "<div class='prism-error-content'><p></p></div><div class='prism-error-operation'><a class='prism-button prism-button-refresh'>" +
                  u.get("Refresh_Text") +
                  "</a><a class='prism-button prism-button-retry'  target='_blank'>" +
                  u.get("Retry") +
                  "</a><a class='prism-button prism-button-orange'  target='_blank'>" +
                  u.get("Detection_Text") +
                  "</a></div><div class='prism-detect-info prism-center'><p class='errorCode'><span class='info-label'>code\uff1a</span><span class='info-content'></span></p><p class='vid'><span class='info-label'>vid:</span><span class='info-content'></span></p><p class='uuid'><span class='info-label'>uuid:</span><span class='info-content'></span></p><p class='requestId'><span class='info-label'>requestId:</span><span class='info-content'></span></p><p class='dateTime'><span class='info-label'>" +
                  u.get("Play_DateTime") +
                  "\uff1a</span><span class='info-content'></span></p></div>"),
                e
              );
            },
            bindEvent: function () {
              var i = this;
              i._player.on(a.Private.Error_Show, function (e) {
                var t = null;
                i._player.getMonitorInfo && (t = i._player.getMonitorInfo()),
                  i._show(e, t);
              }),
                i._player.on(a.Private.Error_Hide, function () {
                  i._hide();
                });
              var e = document.querySelector(
                "#" + i.id() + " .prism-button-refresh"
              );
              n.on(e, "click", function () {
                location.reload(!0);
              }),
                o.IS_MOBILE &&
                  ((e = document.querySelector(
                    "#" + i.id() + " .prism-detect-info"
                  )),
                  l.addClass(e, "prism-width90"));
              e = document.querySelector("#" + i.id() + " .prism-button-retry");
              n.on(e, "click", function () {
                var e = i._player.getCurrentTime(),
                  t = i._player._options.source;
                (i._player._setDefaultCC = !0),
                  i._player._loadByUrlInner(t, e, !0);
              });
            },
            _show: function (e, t) {
              var i = e.paramData,
                r = "",
                n = "";
              i.mediaId && (r = i.mediaId);
              var o,
                a,
                e = document.querySelector(
                  "#" + this.id() + " .prism-button-orange"
                );
              e &&
                (t && this._player._options.diagnosisButtonVisible
                  ? (t.vu
                      ? (n = decodeURIComponent(t.vu))
                      : l.css(e, "display", "none"),
                    (t =
                      "//player.alicdn.com/detection.html?from=h5&vid=" +
                      r +
                      "&source=" +
                      (n ? encodeURIComponent(n) : "") +
                      "&uuid=" +
                      t.uuid +
                      "&lang=" +
                      u.getCurrentLanguage()),
                    e && (e.href = t))
                  : l.css(e, "display", "none"),
                (e = i.display_msg || i.error_msg),
                (document.querySelector(
                  "#" + this.id() + " .prism-error-content p"
                ).innerHTML = e),
                (document.querySelector(
                  "#" + this.id() + " .errorCode .info-content"
                ).innerText = i.error_code),
                (e = document.querySelector("#" + this.id() + " .vid")),
                i.mediaId
                  ? (l.css(e, "display", "block"),
                    (document.querySelector(
                      "#" + this.id() + " .vid .info-content"
                    ).innerText = i.mediaId))
                  : l.css(e, "display", "none"),
                i.uuid
                  ? (document.querySelector(
                      "#" + this.id() + " .uuid .info-content"
                    ).innerText = i.uuid)
                  : ((e = document.querySelector("#" + this.id() + " .uuid")),
                    l.css(e, "display", "none")),
                i.requestId
                  ? (document.querySelector(
                      "#" + this.id() + " .requestId .info-content"
                    ).innerText = i.requestId)
                  : ((o = document.querySelector(
                      "#" + this.id() + " .requestId"
                    )),
                    l.css(o, "display", "none")),
                (document.querySelector(
                  "#" + this.id() + " .dateTime .info-content"
                ).innerText = s.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss")),
                (o = document.querySelector("#" + this.id())),
                l.css(o, "display", "block"),
                (a = this).playHideHandler && clearTimeout(a.playHideHandler),
                (a.playHideHandler = setTimeout(function () {
                  a._player.trigger("play_btn_hide");
                })));
            },
            _hide: function () {
              var e = document.querySelector("#" + this.id());
              l.css(e, "display", "none");
            },
            disposeUI: function () {
              this.playHideHandler &&
                (clearTimeout(this.playHideHandler),
                (this.playHideHandler = null));
            },
          });
        t.exports = e;
      },
      {
        "../../lang/index": 20,
        "../../lib/dom": 28,
        "../../lib/event": 29,
        "../../lib/ua": 42,
        "../../lib/util": 44,
        "../../player/base/event/eventtype": 54,
        "../component": 109,
      },
    ],
    115: [
      function (e, t, i) {
        var r = e("../component"),
          n = e("../../player/base/event/eventtype"),
          o = (e("../../lib/event"), e("../../lib/ua")),
          a = e("../../lang/index"),
          s = e("./util"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t), this.addClass("prism-fullscreen-btn");
            },
            bindEvent: function () {
              var e = this;
              this._player.on(n.Player.RequestFullScreen, function () {
                o.IS_IOS || e.addClass("fullscreen");
              }),
                this._player.on(n.Player.CancelFullScreen, function () {
                  e.removeClass("fullscreen");
                }),
                s.registerTooltipEvent.call(this, this.el(), function () {
                  return e._player.fullscreenService.getIsFullScreen()
                    ? a.get("ExistFullScreen")
                    : a.get("Fullscreen");
                }),
                this.on("click", function () {
                  e._player.fullscreenService.getIsFullScreen()
                    ? e._player.fullscreenService.cancelFullScreen()
                    : e._player.fullscreenService.requestFullScreen(),
                    e._player.trigger(n.Private.MarkerTextHide);
                });
            },
          });
        t.exports = e;
      },
      {
        "../../lang/index": 20,
        "../../lib/event": 29,
        "../../lib/ua": 42,
        "../../player/base/event/eventtype": 54,
        "../component": 109,
        "./util": 136,
      },
    ],
    116: [
      function (e, t, i) {
        "use strict";
        var r = e("../component"),
          n = e("../../lib/dom"),
          o = e("../../player/base/event/eventtype"),
          a = e("../../lib/ua.js"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t), this.addClass("prism-hide");
            },
            createEl: function () {
              var e = r.prototype.createEl.call(this, "div");
              return (
                (e.innerHTML = a.IS_ANDROID_FIREFOX
                  ? '<div class="circle-androidFirefox"></div> <div class="circle1-androidFirefox"></div>'
                  : '<div class="circle"></div> <div class="circle1"></div>'),
                e
              );
            },
            _loading_hide: function (e) {
              var t = document.querySelector(
                "#" + this.id() + " .prism-loading"
              );
              t &&
                (n.removeClass(t, "prism-loading"),
                n.addClass(t, "prism-hide"));
            },
            _loading_show: function (e) {
              var t = document.querySelector("#" + this.id() + " .prism-hide");
              t &&
                (n.removeClass(t, "prism-hide"),
                n.addClass(t, "prism-loading"));
            },
            bindEvent: function () {
              this._player.on(o.Private.H5_Loading_Show, this._loading_show),
                this._player.on(o.Private.H5_Loading_Hide, this._loading_hide);
            },
          });
        t.exports = e;
      },
      {
        "../../lib/dom": 28,
        "../../lib/ua.js": 42,
        "../../player/base/event/eventtype": 54,
        "../component": 109,
      },
    ],
    117: [
      function (e, t, i) {
        var r = e("../component"),
          n = (e("../../lib/util"), e("../../lib/dom")),
          o =
            (e("../../lib/event"),
            e("../../lib/ua"),
            e("../../lang/index"),
            e("../../player/base/event/eventtype")),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t), this.addClass("prism-info-display");
            },
            createEl: function () {
              return r.prototype.createEl.call(this, "p");
            },
            bindEvent: function () {
              var i = this;
              i._player.on(o.Private.Info_Show, function (e) {
                var t = document.querySelector("#" + i.id()),
                  e = e.paramData;
                e &&
                  (void 0 !== e.text && e.text
                    ? ((t.innerHTML = e.text),
                      void 0 !== e.duration &&
                        e.duration &&
                        (i.handler && clearTimeout(i.handler),
                        (i.handler = setTimeout(function () {
                          n.css(t, "display", "none");
                        }, e.duration))),
                      "lb" == e.align
                        ? (n.addClass(t, "prism-info-left-bottom"),
                          n.removeClass(t, "prism-info-top-center"))
                        : "tc" == e.align
                        ? (n.addClass(t, "prism-info-top-center"),
                          n.removeClass(t, "prism-info-left-bottom"))
                        : (n.removeClass(t, "prism-info-left-bottom"),
                          n.removeClass(t, "prism-info-top-center")),
                      e.isBlack
                        ? n.addClass(t, "prism-info-black")
                        : n.removeClass(t, "prism-info-black"))
                    : (t.innerHTML = e),
                  n.css(t, "display", "block"));
              }),
                i._player.on(o.Private.Info_Hide, function (e) {
                  var t = document.querySelector("#" + i.id());
                  n.css(t, "display", "none");
                });
            },
            disposeUI: function () {
              this.handler &&
                (clearTimeout(this.handler), (this.handler = null));
            },
          });
        t.exports = e;
      },
      {
        "../../lang/index": 20,
        "../../lib/dom": 28,
        "../../lib/event": 29,
        "../../lib/ua": 42,
        "../../lib/util": 44,
        "../../player/base/event/eventtype": 54,
        "../component": 109,
      },
    ],
    118: [
      function (e, t, i) {
        var r = e("../component"),
          n = e("./util"),
          o = (e("../../lib/util"), e("../../lib/dom")),
          a = e("../../lib/event"),
          s = e("../../lib/playerUtil"),
          l = e("../../lang/index"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t), this.addClass("prism-live-display");
            },
            createEl: function () {
              var e = r.prototype.createEl.call(this, "p");
              return (
                (e.innerText = "LIVE"),
                s.isLiveShift(this._player._options) &&
                  o.addClass(e, "live-shift-display"),
                e
              );
            },
            bindEvent: function () {
              var e = document.querySelector("#" + this.id()),
                t = this;
              s.isLiveShift(this._player._options) &&
                (a.on(e, "click", function () {
                  t._player._liveshiftService.switchToLive();
                }),
                n.registerTooltipEvent.call(
                  this,
                  this.el(),
                  l.get("SwitchToLive")
                ));
            },
          });
        t.exports = e;
      },
      {
        "../../lang/index": 20,
        "../../lib/dom": 28,
        "../../lib/event": 29,
        "../../lib/playerUtil": 39,
        "../../lib/util": 44,
        "../component": 109,
        "./util": 136,
      },
    ],
    119: [
      function (e, t, i) {
        var r = e("../component"),
          n =
            (e("../../lib/dom"),
            e("../../lib/event"),
            e("../../player/base/event/eventtype")),
          o = e("../../player/base/plugin/status"),
          a = e("../../lib/ua.js"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t), this.addClass("prism-animation");
            },
            bindEvent: function () {
              var t = this;
              this._player.on(n.Player.Play, function () {
                t._player._isManualPlay &&
                  (t.removeClass("prism-pause-animation"),
                  t.addClass("prism-play-animation"),
                  a.IS_ANDROID_FIREFOX || t.removeClass("play-apply-animation"),
                  t.playHandler && clearTimeout(t.playHandler),
                  (t.playHandler = setTimeout(function () {
                    a.IS_ANDROID_FIREFOX || t.addClass("play-apply-animation");
                  })));
              }),
                this._player.on(n.Player.Pause, function () {
                  var e = t._player._status;
                  e != o.ended &&
                    e != o.error &&
                    t._player._isManualPause &&
                    (t.removeClass("prism-play-animation"),
                    t.addClass("prism-pause-animation"),
                    a.IS_ANDROID_FIREFOX ||
                      t.removeClass("play-apply-animation"),
                    t.pauseHandler && clearTimeout(t.pauseHandler),
                    (t.pauseHandler = setTimeout(function () {
                      a.IS_ANDROID_FIREFOX ||
                        t.addClass("play-apply-animation");
                    })));
                });
            },
            disposeUI: function () {
              this.playHandler &&
                (clearTimeout(this.playHandler), (this.playHandler = null)),
                this.pauseHandler &&
                  (clearTimeout(this.pauseHandler), (this.pauseHandler = null));
            },
          });
        t.exports = e;
      },
      {
        "../../lib/dom": 28,
        "../../lib/event": 29,
        "../../lib/ua.js": 42,
        "../../player/base/event/eventtype": 54,
        "../../player/base/plugin/status": 78,
        "../component": 109,
      },
    ],
    120: [
      function (e, t, i) {
        var r = e("../component"),
          n = e("../../player/base/event/eventtype"),
          o = e("./util"),
          a = e("../../lang/index"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t), this.addClass("prism-play-btn");
            },
            bindEvent: function () {
              var t = this;
              this._player.on(n.Player.Play, function () {
                t.addClass("playing");
              }),
                this._player.on(n.Player.Pause, function () {
                  t.removeClass("playing");
                }),
                this.on(n.Private.PlayClick, function () {
                  var e;
                  t._player.paused()
                    ? ((e = t._player.getCurrentTime()),
                      (t._player.getDuration() <= e ||
                        t._player._ended ||
                        t._player.exceedPreviewTime(e)) &&
                        t._player.seek(0),
                      t._player.play(!0),
                      t.addClass("playing"))
                    : (t._player.pause(!0), t.removeClass("playing")),
                    t._player.trigger(n.Private.MarkerTextHide);
                }),
                o.registerTooltipEvent.call(this, this.el(), function () {
                  return t._player.paused() ? a.get("Play") : a.get("Pause");
                });
            },
          });
        t.exports = e;
      },
      {
        "../../lang/index": 20,
        "../../player/base/event/eventtype": 54,
        "../component": 109,
        "./util": 136,
      },
    ],
    121: [
      function (e, t, i) {
        var r = e("../component"),
          o = e("../../lib/dom"),
          a = (e("../../lib/constants"), e("../../lib/event")),
          s = e("../../lib/ua"),
          l = e("../../lib/function"),
          n = e("../../lang/index"),
          u = e("../../config"),
          c = e("../../lib/util"),
          d = e("../../player/base/event/eventtype"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t),
                (this._seekTime = -1),
                this.addClass("prism-progress");
            },
            createEl: function () {
              var e = r.prototype.createEl.call(this);
              return (
                (e.innerHTML =
                  '<div class="prism-progress-loaded"></div><div class="prism-progress-played"></div><div class="prism-progress-marker"></div><div class="prism-progress-cursor"><img></img></div><p class="prism-progress-time"></p>'),
                e
              );
            },
            bindEvent: function () {
              var t = this;
              (this.loadedNode = document.querySelector(
                "#" + this.id() + " .prism-progress-loaded"
              )),
                (this.playedNode = document.querySelector(
                  "#" + this.id() + " .prism-progress-played"
                )),
                (this.cursorNode = document.querySelector(
                  "#" + this.id() + " .prism-progress-cursor"
                )),
                (this.timeNode = document.querySelector(
                  "#" + this._player._options.id + " .prism-progress-time"
                )),
                (this.thumbnailNode =
                  document.querySelector(".prism-thumbnail")),
                (this.controlNode = document.querySelector(
                  "#" + this._player._options.id + " .prism-controlbar"
                ));
              var i = document.querySelector("#" + this.id()),
                e = document.querySelector(
                  "#" + this.id() + " .prism-progress-cursor img"
                ),
                r = "",
                r = u.domain
                  ? "https://" +
                    u.domain +
                    "/de/prismplayer/" +
                    u.h5Version +
                    "/skins/default/img/dragcursor.png"
                  : "/build/skins/default/img/dragcursor.png";
              (e.src = r),
                a.on(this.cursorNode, "mousedown", function (e) {
                  t._onMouseDown(e);
                }),
                a.on(this.cursorNode, "touchstart", function (e) {
                  t._onMouseDown(e);
                }),
                a.on(i, "mousemove", function (e) {
                  t._progressMove(e);
                }),
                a.on(i, "touchmove", function (e) {
                  t._progressMove(e);
                });
              function n(e) {
                t._progressDown = e;
              }
              a.on(i, "mousedown", function (e) {
                n(!0);
              }),
                a.on(i, "touchstart", function (e) {
                  n(!0);
                }),
                a.on(i, "mouseup", function (e) {
                  n(!1);
                }),
                a.on(i, "touchend", function (e) {
                  n(!1);
                }),
                a.on(this._el, "click", function (e) {
                  t._onMouseClick(e);
                }),
                this._player.on(d.Private.HideProgress, function (e) {
                  t._hideProgress(e);
                }),
                this._player.on(d.Private.CancelHideProgress, function (e) {
                  t._cancelHideProgress(e);
                }),
                this._player.on(d.Private.HideBar, function (e) {
                  t._player._seeking = !1;
                }),
                a.on(i, d.Private.MouseOver, function (e) {
                  t._onMouseOver(e);
                }),
                a.on(i, d.Private.MouseOut, function (e) {
                  t._onMouseOut(e);
                }),
                a.on(this.controlNode, d.Private.MouseLeave, function (e) {
                  t._offMouseUp();
                }),
                s.IS_PC
                  ? (a.on(i, "mouseover", function () {
                      o.addClass(i, "prism-progress-hover"),
                        o.addClass(t.cursorNode, "cursor-hover");
                    }),
                    a.on(i, "mouseout", function (e) {
                      o.removeClass(i, "prism-progress-hover"),
                        o.removeClass(t.cursorNode, "cursor-hover"),
                        (t._progressDown = !1);
                    }))
                  : (o.addClass(i, "prism-progress-hover"),
                    o.addClass(t.cursorNode, "cursor-hover")),
                (this.bindTimeupdate = l.bind(this, this._onTimeupdate)),
                this._player.on(d.Player.TimeUpdate, this.bindTimeupdate),
                s.IS_IPAD
                  ? (this.interval = setInterval(function () {
                      t._onProgress();
                    }, 500))
                  : this._player.on(d.Video.Progress, function () {
                      t._onProgress();
                    }),
                this._player.on(d.Private.UpdateProgress, function (e) {
                  t._updateProgressBar(t.playedNode, e.paramData.targetTime);
                }),
                this._player.on(d.Private.UpdateCursorPosition, function (e) {
                  t._updateCursorPosition(e.paramData.targetTime);
                });
            },
            _progressMove: function (e) {
              e.preventDefault();
              var t,
                i,
                r = this._getSeconds(e);
              r != 1 / 0 &&
                ((t = c.formatTime(r)),
                (i = this._getDistance(e)),
                this.cursorNode &&
                  (this._player.trigger(d.Private.ThumbnailShow, {
                    time: r,
                    formatTime: t,
                    left: i,
                    progressWidth: this.el().offsetWidth,
                  }),
                  this._progressDown && this._onMouseMove(e)));
            },
            _hideProgress: function (e) {
              a.off(this.cursorNode, "mousedown"),
                a.off(this.cursorNode, "touchstart");
            },
            _cancelHideProgress: function (e) {
              var t = this;
              a.on(this.cursorNode, "mousedown", function (e) {
                t._onMouseDown(e);
              }),
                a.on(this.cursorNode, "touchstart", function (e) {
                  t._onMouseDown(e);
                });
            },
            _canSeekable: function (e) {
              var t = !0;
              return (t =
                "function" == typeof this._player.canSeekable
                  ? this._player.canSeekable(e)
                  : t);
            },
            _onMouseOver: function (e) {
              this._cursorHideHandler &&
                (clearTimeout(this._cursorHideHandler),
                (this._cursorHideHandler = null)),
                this._mouseInProgress ||
                  this._updateCursorPosition(this._player.getCurrentTime()),
                (this._mouseInProgress = !0);
            },
            _onMouseOut: function (e) {
              var t = this;
              this._cursorHideHandler && clearTimeout(this._cursorHideHandler),
                (this._cursorHideHandler = setTimeout(function () {
                  t._player.trigger(d.Private.ThumbnailHide),
                    (t._mouseInProgress = !1);
                }));
            },
            _getSeconds: function (e) {
              var t = this._getDistance(e),
                e = this.el().offsetWidth,
                e = this._player.getDuration()
                  ? (t / e) * this._player.getDuration()
                  : 0;
              return (e =
                (e = e < 0 ? 0 : e) > this._player.getDuration()
                  ? this._player.getDuration()
                  : e);
            },
            _getDistance: function (e) {
              for (
                var t = this.el().offsetLeft, i = this.el();
                (i = i.offsetParent);

              ) {
                var r = o.getTranslateX(i);
                t += i.offsetLeft + r;
              }
              e = (e.touches ? e.touches[0] : e).pageX - t;
              return (e = e < 0 ? 0 : e);
            },
            _onMouseClick: function (e) {
              var t = this,
                i = t._getSeconds(e);
              t._canSeekable(i)
                ? (t._player.exceedPreviewTime(i) &&
                    (i = t._player.getPreviewTime()),
                  (this._seekTime = i),
                  t._updateProgressBar(this.playedNode, i),
                  t._updateCursorPosition(i),
                  this._mouseClickTimeHandle &&
                    clearTimeout(this._mouseClickTimeHandle),
                  (this._mouseClickTimeHandle = setTimeout(function () {
                    (t._player._seeking = !0),
                      (t._mouseDown && !s.IS_MOBILE) ||
                        (t._player.trigger(d.Private.SeekStart, {
                          fromTime: t._player.getCurrentTime(),
                        }),
                        t._player.trigger(d.Private.EndStart, { toTime: i })),
                      t._player.seek(i),
                      (t._mouseDown = !1),
                      (t._mouseClickTimeHandle = null),
                      (t._inWaitingSeek = !1);
                  }, 0)),
                  (this._inWaitingSeek = !0))
                : t._player.trigger(d.Private.Info_Show, {
                    text: n.get("Can_Not_Seekable"),
                    duration: 2e3,
                  });
            },
            _onMouseDown: function (e) {
              var t = this;
              e.preventDefault(),
                (this._mouseDown = !0),
                this._player.trigger(d.Private.SeekStart, {
                  fromTime: this._player.getCurrentTime(),
                }),
                a.on(this.controlNode, "mousemove", function (e) {
                  t._onMouseMove(e);
                }),
                a.on(this.controlNode, "touchmove", function (e) {
                  t._onMouseMove(e);
                }),
                a.on(this.controlNode, "mouseup", function (e) {
                  t._onControlBarMouseUp(e);
                }),
                a.on(this.controlNode, "touchend", function (e) {
                  t._onControlBarMouseUp(e);
                });
              e = t._getSeconds(e);
              t._canSeekable(e)
                ? t._player.exceedPreviewTime(e) && t._player.getPreviewTime()
                : t._player.trigger(d.Private.Info_Show, {
                    text: n.get("Can_Not_Seekable"),
                    duration: 2e3,
                  });
            },
            _onMouseUp: function (e) {
              this._onMouseUpIntern(e);
            },
            _onControlBarMouseUp: function (e) {
              this._onMouseUpIntern(e);
            },
            _onPlayerMouseUp: function (e) {
              this._onMouseUpIntern(e);
            },
            _offMouseUp: function () {
              a.off(this.controlNode, "mousemove"),
                a.off(this.controlNode, "touchmove"),
                a.off(this.controlNode, "mouseup"),
                a.off(this.controlNode, "touchend");
            },
            _onMouseUpIntern: function (e) {
              e.preventDefault(), this._offMouseUp();
              (e =
                (this.playedNode.offsetWidth / this.el().offsetWidth) *
                this._player.getDuration()),
                this._player.getDuration();
              isNaN(e) || this._player.seek(e),
                this._player.trigger(d.Private.EndStart, { toTime: e });
            },
            _onMouseMove: function (e) {
              e.preventDefault();
              e = this._getSeconds(e);
              this._player.exceedPreviewTime(e) &&
                (e = this._player.getPreviewTime()),
                this._player.seek(e),
                this._updateProgressBar(this.playedNode, e),
                this._updateCursorPosition(e);
            },
            _onTimeupdate: function (e) {
              var t = this._player._options.source,
                i = this._getUrlSuffix(t),
                t = !1;
              "mp4" === i &&
                (s.IS_MAC_SAFARI && (t = !0),
                s.IS_IOS && (t = !0),
                s.IS_IE11 && (t = !0)),
                "m3u8" === i && s.IS_IE11 && (t = !0),
                "audio" == this._player._options.mediaType &&
                  s.IS_IOS &&
                  (this._player._seeking = !1),
                ((this._inWaitingSeek ||
                  (this._player._seeking && !s.IS_EDGE) ||
                  this._progressDown) &&
                  !t) ||
                  (this._updateProgressBar(
                    this.playedNode,
                    this._player.getCurrentTime()
                  ),
                  this._updateCursorPosition(this._player.getCurrentTime()),
                  this._player.trigger(d.Private.UpdateProgressBar, {
                    time: this._player.getCurrentTime(),
                  }));
            },
            _onProgress: function (e) {
              this._player.getDuration() &&
                1 <= this._player.getBuffered().length &&
                this._updateProgressBar(
                  this.loadedNode,
                  this._player
                    .getBuffered()
                    .end(this._player.getBuffered().length - 1)
                );
            },
            _updateProgressBar: function (e, t) {
              var i = this._player.getDuration();
              1 != this._player._switchSourcing &&
                i &&
                (-1 != this._seekTime &&
                  (this._player.getCurrentTime() >= this._seekTime ||
                  !this._player._seeking
                    ? (this._seekTime = -1)
                    : (t = this._seekTime)),
                1 < (i = t / i + 0.005) && (i = 1),
                e && o.css(e, "width", 100 * i + "%"));
            },
            _updateCursorPosition: function (e) {
              var t,
                i,
                r,
                n = this._player.getDuration();
              1 != this._player._switchSourcing &&
                n &&
                ((t = 1),
                (r = 10 / (i = this._player.el().clientWidth)),
                0 != i && (t = 1 - r),
                (r = (r = e / n - r) < 0 ? 0 : r),
                this.cursorNode &&
                  (t < r
                    ? (o.css(this.cursorNode, "right", "0px"),
                      o.css(this.cursorNode, "left", "auto"))
                    : (o.css(this.cursorNode, "right", "auto"),
                      o.css(this.cursorNode, "left", 100 * r + "%"))));
            },
            _getUrlSuffix: function (e) {
              if (!e) return "";
              if ("string" != typeof e) return "";
              e = (e.split("?")[0] || "").split(".");
              return (e[e.length - 1] || "").toLowerCase();
            },
            disposeUI: function () {
              this.cursorNodeHandler &&
                (clearTimeout(this.cursorNodeHandler),
                (this.cursorNodeHandler = null)),
                this._cursorHideHandler &&
                  (clearTimeout(this._cursorHideHandler),
                  (this._cursorHideHandler = null)),
                this._mouseClickTimeHandle &&
                  (clearTimeout(this._mouseClickTimeHandle),
                  (this._mouseClickTimeHandle = null));
            },
          });
        t.exports = e;
      },
      {
        "../../config": 13,
        "../../lang/index": 20,
        "../../lib/constants": 24,
        "../../lib/dom": 28,
        "../../lib/event": 29,
        "../../lib/function": 31,
        "../../lib/ua": 42,
        "../../lib/util": 44,
        "../../player/base/event/eventtype": 54,
        "../component": 109,
      },
    ],
    122: [
      function (e, t, i) {
        var r = e("../component"),
          n = (e("../../lib/util"), e("../../lib/dom")),
          o = e("../../lib/event"),
          a = e("../../player/base/event/eventtype"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t), this.addClass("prism-marker-text");
            },
            createEl: function () {
              var e = r.prototype.createEl.call(this, "div");
              return (e.innerHTML = "<p></p>"), e;
            },
            bindEvent: function () {
              var r = this;
              r._player.on(a.Private.MarkerTextShow, function (e) {
                var t = e.paramData,
                  i = a.Player.MarkerDotOver;
                r._player.trigger(i, e.paramData),
                  t.progressMarker.isCustomized
                    ? r._player.trigger(a.Private.LifeCycleChanged, {
                        type: i,
                        data: e.paramData,
                      })
                    : (r._thumbnailShowHanlde &&
                        (n.css(r.el(), "display", "none"),
                        clearTimeout(r._thumbnailShowHanlde)),
                      (r._thumbnailShowHanlde = setTimeout(function () {
                        var e;
                        (document.querySelector("#" + r.id() + " p").innerText =
                          t.progressMarker.text || ""),
                          t &&
                            (n.css(r.el(), "display", "block"),
                            (e = r._player.el().offsetWidth),
                            (left = e * t.left),
                            (width = r.el().offsetWidth),
                            left + width > e
                              ? (n.css(r.el(), "right", "0px"),
                                n.css(r.el(), "left", "auto"))
                              : ((left -= width / 2),
                                (left = left < 0 ? 0 : left),
                                n.css(r.el(), "right", "auto"),
                                n.css(r.el(), "left", left + "px")));
                      }, 30)));
              }),
                r._player.on(a.Private.MarkerTextHide, function (e) {
                  r._player.trigger(a.Player.MarkerDotOut),
                    r._player.trigger(a.Private.LifeCycleChanged, {
                      type: a.Player.MarkerDotOut,
                      data: "",
                    }),
                    r._thumbnailShowHanlde &&
                      clearTimeout(r._thumbnailShowHanlde),
                    n.css(r.el(), "display", "none");
                }),
                o.on(r._player.tag, "click", function (e) {
                  e &&
                    e.target == e.currentTarget &&
                    r._player.trigger(a.Private.MarkerTextHide);
                }),
                o.on(r._player.tag, "touchstart", function (e) {
                  e &&
                    e.target == e.currentTarget &&
                    r._player.trigger(a.Private.MarkerTextHide);
                });
            },
            disposeUI: function () {
              this._thumbnailShowHanlde &&
                (clearTimeout(this._thumbnailShowHanlde),
                (this._thumbnailShowHanlde = null));
            },
          });
        t.exports = e;
      },
      {
        "../../lib/dom": 28,
        "../../lib/event": 29,
        "../../lib/util": 44,
        "../../player/base/event/eventtype": 54,
        "../component": 109,
      },
    ],
    123: [
      function (e, t, i) {
        var r = e("./selector"),
          s = e("../../../lib/object"),
          u = (e("../../../lib/util"), e("../../../lib/cookie")),
          l = e("../../../lib/dom"),
          c = (e("../../../lib/event"), e("../../../lib/constants")),
          d = e("../../../lang/index"),
          a = e("../../../player/base/event/eventtype"),
          e = r.extend({
            init: function (e, t) {
              (this.Name = d.get("Quality")),
                (this.Type = "quality"),
                (this.Tooltip = d.get("Quality_Switch_To")),
                r.call(this, e, t),
                (this._isMasterLevel = !1);
            },
            showTip: function (e, t) {
              this._player.trigger(a.Private.Info_Show, {
                text: e,
                duration: t,
                align: "lb",
              });
            },
            bindEvent: function () {
              this.bindCommonEvent();
              var o = this;
              this._player.on(a.Private.QualityChange, function (e) {
                var t,
                  i,
                  r,
                  n =
                    0 < o._player._urls.length
                      ? o._player._urls
                      : o._player._qualityService.levels;
                (data = e.paramData),
                  data.levelSwitch
                    ? ((r = data.desc || data.bitrate),
                      (o._autoSWitchDesc = r),
                      o._updateText(r))
                    : 0 < o._player._currentPlayIndex &&
                      ((o._autoSWitchDesc = ""),
                      (i = n[(t = o._player._currentPlayIndex) - 1].desc),
                      (r = n[t].desc),
                      o.showTip(i + e.paramData + r, 1e3),
                      o._player.trigger(
                        a.Private.SelectorValueChange,
                        n[t].Url
                      ));
              });
              var e = document.querySelector("#" + o.id() + " .selector-list");
              this._player.on(a.Player.LevelSwitch, function () {
                l.addClass(e, "disabled");
              }),
                this._player.on(a.Player.LevelSwitched, function () {
                  l.removeClass(e, "disabled");
                });
            },
            generateList: function (e) {
              var t = this._player._urls,
                n = this._player._currentPlayIndex,
                i = this._player._qualityService.levels;
              0 < i.length &&
                ((this._isMasterLevel = !0),
                this._player._options.isVBR && (n = (t = i).length - 1));
              var o,
                a = document.querySelector("#" + this.id() + " .selector-list");
              0 < t.length &&
                ((o = this),
                s.each(t, function (e, t) {
                  var i, r;
                  (e.desc || e.bitrate) &&
                    ((i = l.createEl.call(this, "li", {
                      key: e.Url,
                      index: t,
                      text: e.desc || e.bitrate,
                    })),
                    (r = l.createEl.call(this, "span", {
                      key: e.Url,
                      index: t,
                      text: e.desc || e.bitrate,
                    })),
                    t == n &&
                      (l.addClass(i, "current"), (o._previousSelection = i)),
                    (r.innerText = e.desc || e.bitrate),
                    i.appendChild(r),
                    a.appendChild(i));
                })),
                this._autoSWitchDesc && this._updateText(this._autoSWitchDesc);
            },
            execute: function (e) {
              if (((this._player._switchSourcing = !0), this._isMasterLevel)) {
                for (
                  var t, i = this._player._qualityService.levels, r = 0;
                  r < i.length;
                  r++
                )
                  i[r].Url == e &&
                    i[r].desc != d.get("Auto") &&
                    ((t = i[r]), this._resetAutoText());
                this._player._switchLevel
                  ? this._player._switchLevel(e, t || { isAuto: !0 })
                  : ((n =
                      this._player.autoplay || "pause" != this._player._status),
                    this._player._loadByUrlInner(
                      e,
                      this._player.getCurrentTime(),
                      n
                    ));
              } else {
                for (
                  var n,
                    o = this._player._urls.length,
                    a = this._player._currentPlayIndex,
                    s = -1,
                    r = 0;
                  r < o;
                  r++
                )
                  if (this._player._urls[r].Url == e) {
                    (s = this._player._currentPlayIndex = r),
                      u.set(
                        c.SelectedStreamLevel,
                        this._player._urls[r].definition,
                        365
                      );
                    break;
                  }
                a != s &&
                  -1 < s &&
                  ((a = this._player.getCurrentTime()),
                  (n =
                    this._player.autoplay || "pause" != this._player._status),
                  this._player.autoplay || 0 != a || (n = !1),
                  this._player._switchLevel && !this._player._options.isLive
                    ? this._player._switchLevel(e)
                    : this._player._loadByUrlInner(e, a, n, !0));
              }
              var l = this;
              setTimeout(function () {
                l._player._switchSourcing = !1;
              });
            },
            _updateText: function (e) {
              var t = document.querySelector(
                  "#" + this.id() + " .selector-list .current"
                ),
                i = document.querySelector(
                  "#" + this.id() + " .selector-list .current span"
                ),
                r = d.get("Auto");
              i &&
                i.innerText &&
                -1 < i.innerText.indexOf(r) &&
                ((i.innerText = r += e ? "(" + e + ")" : ""),
                t && (t.text = r));
            },
            _resetAutoText: function () {
              for (
                var e = d.get("Auto"),
                  t = document.querySelectorAll(
                    "#" + this.id() + " .selector-list li"
                  ),
                  i = 0;
                i <= t.length;
                i++
              ) {
                var r = t[i],
                  n = r.querySelector("span");
                if (-1 < n.innerText.indexOf(e)) {
                  (n.innerText = e), (r.text = e);
                  break;
                }
              }
            },
          });
        t.exports = e;
      },
      {
        "../../../lang/index": 20,
        "../../../lib/constants": 24,
        "../../../lib/cookie": 25,
        "../../../lib/dom": 28,
        "../../../lib/event": 29,
        "../../../lib/object": 37,
        "../../../lib/util": 44,
        "../../../player/base/event/eventtype": 54,
        "./selector": 129,
      },
    ],
    124: [
      function (e, t, i) {
        var r = e("./selector"),
          a = e("../../../lib/object"),
          s =
            (e("../../../lib/util"),
            e("../../../lib/cookie"),
            e("../../../lib/dom")),
          n = (e("../../../lib/event"), e("./util"), e("../../../lang/index")),
          l = e("../../../player/base/event/eventtype"),
          e = r.extend({
            init: function (e, t) {
              (this.Name = n.get("AudioTrack")),
                (this.Type = "audio"),
                (this.Tooltip = n.get("AudioTrack_Switch_To")),
                r.call(this, e, t);
            },
            bindEvent: function () {
              this.bindCommonEvent();
              var n = this,
                o = document.querySelector("#" + n.id() + " .selector-list");
              document.querySelector("#" + n.id() + " .header");
              n._player.on(l.Private.ChangeURL, function () {
                n._hasGeneratedList = !1;
              }),
                this._player.on(l.Player.AudioTrackSwitch, function () {
                  s.addClass(o, "disabled");
                }),
                this._player.on(l.Player.AudioTrackSwitched, function () {
                  s.removeClass(o, "disabled");
                }),
                n._player.on(l.Player.AudioTrackReady, function (e) {
                  n._hasGeneratedList ||
                    (n._clear(),
                    (e = e.paramData) &&
                      (a.each(e, function (e, t) {
                        var i = s.createEl.call(n, "li", {
                            key: e.value,
                            text: e.text,
                          }),
                          r = s.createEl.call(n, "span", {
                            key: e.value,
                            text: e.text,
                          });
                        (r.innerText = e.text),
                          i.appendChild(r),
                          o.appendChild(i);
                      }),
                      (n._hasGeneratedList = !0)));
                });
            },
            execute: function (e) {
              this._player._audioTrackService.switch(e);
            },
          });
        t.exports = e;
      },
      {
        "../../../lang/index": 20,
        "../../../lib/cookie": 25,
        "../../../lib/dom": 28,
        "../../../lib/event": 29,
        "../../../lib/object": 37,
        "../../../lib/util": 44,
        "../../../player/base/event/eventtype": 54,
        "./selector": 129,
        "./util": 131,
      },
    ],
    125: [
      function (e, t, i) {
        var r = e("../../component"),
          n =
            (e("../../../lib/dom"), e("../../../player/base/event/eventtype")),
          o = e("./list"),
          a = e("../../../lang/index"),
          s = e("../util"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t),
                this.addClass(t.className || "prism-setting-btn"),
                (this._settingList = new o(e, t)),
                e.addChild(this._settingList, t);
            },
            createEl: function () {
              return r.prototype.createEl.call(this, "div");
            },
            bindEvent: function () {
              var e = this;
              this.on("click", function () {
                e._settingList.isOpened
                  ? e._player.trigger(n.Private.SettingListHide)
                  : e._player.trigger(n.Private.SettingListShow),
                  e._player.trigger(n.Private.SelectorHide),
                  e._player.trigger(n.Private.MarkerTextHide),
                  e._player.trigger(n.Private.VolumeVisibilityChange, "");
              }),
                s.registerTooltipEvent.call(this, this.el(), a.get("Setting"));
            },
          });
        t.exports = e;
      },
      {
        "../../../lang/index": 20,
        "../../../lib/dom": 28,
        "../../../player/base/event/eventtype": 54,
        "../../component": 109,
        "../util": 136,
        "./list": 128,
      },
    ],
    126: [
      function (e, t, i) {
        var r = e("./selector"),
          s = e("../../../lib/object"),
          l = e("../../../lib/dom"),
          n = (e("../../../lib/event"), e("./util"), e("../../../lib/cookie")),
          o = e("../../../lib/constants"),
          a = e("../../../lang/index"),
          u = e("../../../player/base/event/eventtype"),
          e = r.extend({
            init: function (e, t) {
              (this.Name = a.get("Subtitle")),
                (this.Type = "cc"),
                (this.Tooltip = a.get("CC_Switch_To")),
                r.call(this, e, t);
            },
            bindEvent: function () {
              this.bindCommonEvent();
              var i = this;
              this._player.on(u.Private.CCStateChanged, function (e) {
                var t = e.paramData.value,
                  e = e.paramData.lang;
                "on" == t && e
                  ? (i._backCCText = e)
                  : "off" == t &&
                    "" == i._backCCText &&
                    (i._backCCText = i._previousSelection.text);
                e = "Off";
                "on" == t && (e = i._backCCText),
                  i._player.trigger(u.Private.SelectorUpdateList, {
                    type: "cc",
                    text: e,
                  });
              });
            },
            generateList: function (n) {
              var o = document.querySelector(
                  "#" + this.id() + " .selector-list"
                ),
                e = this._player._ccService.tracks,
                a = this;
              s.each(e, function (e, t) {
                var i = l.createEl.call(this, "li", {
                    key: e.value,
                    text: e.text,
                  }),
                  r = l.createEl.call(this, "span", {
                    key: e.value,
                    text: e.text,
                  });
                e.text == n &&
                  (l.addClass(i, "current"), (a._previousSelection = i)),
                  (r.innerText = e.text),
                  i.appendChild(r),
                  o.appendChild(i);
              });
            },
            execute: function (e) {
              (this._backCCText = ""),
                n.set(o.SelectedCC, e, 365),
                this._player._ccService.switch(e),
                this._player.trigger(u.Private.CCChanged, e);
            },
          });
        t.exports = e;
      },
      {
        "../../../lang/index": 20,
        "../../../lib/constants": 24,
        "../../../lib/cookie": 25,
        "../../../lib/dom": 28,
        "../../../lib/event": 29,
        "../../../lib/object": 37,
        "../../../player/base/event/eventtype": 54,
        "./selector": 129,
        "./util": 131,
      },
    ],
    127: [
      function (e, t, i) {
        t.exports = {
          CC: e("./cc"),
          Speed: e("./speed"),
          Quality: e("./Quality"),
          Audio: e("./audio"),
        };
      },
      { "./Quality": 123, "./audio": 124, "./cc": 126, "./speed": 130 },
    ],
    128: [
      function (e, t, i) {
        var o = e("../../component"),
          n = e("../../../lib/dom"),
          a = e("../../../lib/ua"),
          s = e("../../../lib/event"),
          l = e("../../../player/base/event/eventtype"),
          u = e("./export"),
          c = e("./util"),
          d = e("../../../lang/index"),
          e = o.extend({
            init: function (e, t) {
              for (var i in ((this.isOpened = !1),
              o.call(this, e, t),
              this.addClass(t.className || "prism-setting-list"),
              u)) {
                var r = new u[i](e, t);
                e.addChild(r, t);
              }
            },
            createEl: function () {
              var e = o.prototype.createEl.call(this, "div"),
                t =
                  "<div class='prism-setting-item prism-setting-{type}' type={type}><div class='setting-content'><span class='setting-title'>{value}</span><span class='array'></span><span class='current-setting'></span></div></div>",
                i = t
                  .replace(/{type}/g, "speed")
                  .replace("{value}", d.get("Speed")),
                r = t
                  .replace(/{type}/g, "cc")
                  .replace("{value}", d.get("Subtitle")),
                n = t
                  .replace(/{type}/g, "audio")
                  .replace("{value}", d.get("AudioTrack")),
                t = t
                  .replace(/{type}/g, "quality")
                  .replace("{value}", d.get("Quality"));
              return (e.innerHTML = i + r + n + t), e;
            },
            bindEvent: function () {
              function t() {
                r._player.trigger(l.Private.SettingListHide), (r.isOpened = !1);
              }
              function i(e) {
                e &&
                  e.text &&
                  (document.querySelector(
                    "#" +
                      r.id() +
                      " .prism-setting-" +
                      e.type +
                      " .current-setting"
                  ).innerText = e.text);
              }
              var r = this;
              this._player.on(l.Private.SettingListShow, function (e) {
                r.isOpened = !0;
                e = e.paramData;
                i(e), n.css(r.el(), "display", "block");
              }),
                this._player.on(l.Private.UpdateToSettingList, function (e) {
                  e = e.paramData;
                  i(e);
                }),
                this._player.on(l.Private.SelectorUpdateList, function (e) {
                  e = e.paramData;
                  i(e), r._player.trigger(l.Private.SelectorValueChange, e);
                }),
                this._player.on(l.Private.SettingListHide, function () {
                  (r.isOpened = !1), n.css(r.el(), "display", "none");
                }),
                s.on(this.el(), "click", function (e) {
                  r._player.trigger(l.Private.SettingListHide);
                  e = e.srcElement || e.target;
                  (e = c.findItemElementForList(e)) &&
                    ((e = e.getAttribute("type")),
                    r._player.trigger(l.Private.SelectorShow, { type: e }));
                });
              var e = a.IS_MOBILE ? "touchleave" : "mouseleave";
              s.on(this.el(), e, function () {
                t();
              }),
                s.on(this._player.tag, "click", function (e) {
                  e && e.target == e.currentTarget && t();
                }),
                s.on(this._player.tag, "touchstart", function (e) {
                  e && e.target == e.currentTarget && t();
                }),
                this._player.on(l.Private.QualityChange, function (e) {
                  var t,
                    i = e.paramData;
                  i.levelSwitch &&
                    ((t = document.querySelector(
                      "#" + r.id() + " .prism-setting-quality .current-setting"
                    )),
                    (e = d.get("Auto")),
                    -1 < t.innerText.indexOf(e) &&
                      (t.innerText = e + (i.desc ? "(" + i.desc + ")" : "")));
                });
            },
          });
        t.exports = e;
      },
      {
        "../../../lang/index": 20,
        "../../../lib/dom": 28,
        "../../../lib/event": 29,
        "../../../lib/ua": 42,
        "../../../player/base/event/eventtype": 54,
        "../../component": 109,
        "./export": 127,
        "./util": 131,
      },
    ],
    129: [
      function (e, t, i) {
        var r = e("../../component"),
          n =
            (e("../../../lib/object"),
            e("../../../lib/util"),
            e("../../../lib/ua")),
          a = (e("../../../lib/cookie"), e("../../../lib/dom")),
          s = e("../../../lib/event"),
          l = e("./util"),
          u =
            (e("../../../lang/index"),
            e("../../../player/base/event/eventtype")),
          e = r.extend({
            init: function (e, t) {
              (this._hasGeneratedList = !1),
                (this._previousSelection = null),
                (this._backupSelector = ""),
                r.call(this, e, t),
                (this.className =
                  t.className ||
                  "prism-" + this.Type + "-selector prism-setting-selector"),
                this.addClass(this.className);
            },
            createEl: function () {
              var e = r.prototype.createEl.call(this, "div");
              return (
                (e.innerHTML =
                  '<div class="header"><div class="left-array"></div><span>' +
                  this.Name +
                  '</span></div><ul class="selector-list"></ul>'),
                e
              );
            },
            bindEvent: function () {
              this.bindCommonEvent();
            },
            bindCommonEvent: function () {
              var o = this,
                e = document.querySelector("#" + o.id() + " .selector-list"),
                t = document.querySelector("#" + o.id() + " .header");
              function i() {
                o._hasGeneratedList ||
                  (o._clear(),
                  o.generateList(o._backupSelector),
                  (o._backupSelector = ""),
                  (o._hasGeneratedList = !0));
              }
              this._player.on(u.Private.ChangeURL, function () {
                o._hasGeneratedList = !1;
              }),
                s.on(t, "click", function () {
                  o._player.trigger(u.Private.SelectorHide),
                    o._player.trigger(u.Private.SettingListShow, {
                      type: o.Type,
                      text: o._previousSelection
                        ? o._previousSelection.text
                        : "",
                    });
                }),
                s.on(e, "click", function (e) {
                  var t = e.srcElement || e.target,
                    i = t.key,
                    e = t.text;
                  void 0 !== e &&
                    (o._previousSelection &&
                      a.removeClass(o._previousSelection, "current"),
                    (o._previousSelection = l.findliElementForSelector(t)),
                    a.addClass(o._previousSelection, "current"),
                    o.execute && o.execute(i),
                    (e = o.Tooltip + "<span>" + e + "</span>"),
                    o._player.trigger(u.Private.Info_Show, {
                      text: e,
                      duration: 1e3,
                      align: "lb",
                    }));
                }),
                o._player.on(u.Private.SelectorHide, function () {
                  r();
                }),
                o._player.on(u.Private.SelectorValueChange, function (e) {
                  var t = e.paramData;
                  if (t && t.type == o.Type) {
                    var i = document.querySelectorAll(
                      "#" + o.id() + " .selector-list li"
                    );
                    if (i) {
                      var r = i.length;
                      0 == r && (o._backupSelector = t.text);
                      for (var n = 0; n < r; n++)
                        if (i[n].text == t.text) {
                          o._previousSelection &&
                            a.removeClass(o._previousSelection, "current"),
                            a.addClass(i[n], "current"),
                            (o._previousSelection = i[n]);
                          break;
                        }
                    }
                  }
                }),
                o._player.on(u.Private.SettingListShow, function () {
                  i();
                }),
                o._player.on(u.Private.SelectorShow, function (e) {
                  (e = e.paramData).type == o.Type &&
                    ((e = document.querySelector(
                      "#" + o._player.id() + " .prism-" + e.type + "-selector"
                    )),
                    o._hasGeneratedList || i(),
                    a.css(e, "display", "block"));
                });
              var r = function () {
                  a.css(o.el(), "display", "none"),
                    o._player.trigger(u.Private.UpdateToSettingList, {
                      type: o.Type,
                      text: o._previousSelection
                        ? o._previousSelection.text
                        : "",
                    });
                },
                e = n.IS_MOBILE ? "touchleave" : "mouseleave";
              s.on(this.el(), e, function () {
                r();
              }),
                s.on(this._player.tag, "click", function (e) {
                  e && e.target == e.currentTarget && r();
                }),
                s.on(this._player.tag, "touchstart", function (e) {
                  e && e.target == e.currentTarget && r();
                });
            },
            setSelected: function (e) {},
            generateList: function () {},
            _clear: function () {
              document.querySelector(
                "#" + this.id() + " .selector-list"
              ).innerHTML = "";
            },
          });
        t.exports = e;
      },
      {
        "../../../lang/index": 20,
        "../../../lib/cookie": 25,
        "../../../lib/dom": 28,
        "../../../lib/event": 29,
        "../../../lib/object": 37,
        "../../../lib/ua": 42,
        "../../../lib/util": 44,
        "../../../player/base/event/eventtype": 54,
        "../../component": 109,
        "./util": 131,
      },
    ],
    130: [
      function (e, t, i) {
        var r = e("./selector"),
          a = e("../../../lib/object"),
          s =
            (e("../../../lib/util"),
            e("../../../lib/cookie"),
            e("../../../lib/dom")),
          l =
            (e("../../../lib/event"), e("./util"), e("../../../lib/constants")),
          u = e("../../../lang/index"),
          e =
            (e("../../../player/base/event/eventtype"),
            r.extend({
              init: function (e, t) {
                (this.Name = u.get("Speed")),
                  (this.Type = "speed"),
                  (this.Tooltip = u.get("Speed_Switch_To")),
                  r.call(this, e, t);
              },
              generateList: function () {
                var n = document.querySelector(
                    "#" + this.id() + " .selector-list"
                  ),
                  e = l.SpeedLevels,
                  o = this;
                a.each(e, function (e, t) {
                  var i = s.createEl.call(this, "li", {
                      key: e.key,
                      text: e.text,
                    }),
                    r = s.createEl.call(this, "span", {
                      key: e.key,
                      text: e.text,
                    });
                  (r.innerText = e.text),
                    e.text == u.get("Speed_1X_Text") &&
                      (s.addClass(i, "current"), (o._previousSelection = i)),
                    i.appendChild(r),
                    n.appendChild(i);
                });
              },
              execute: function (e) {
                this._player.setSpeed(e);
              },
            }));
        t.exports = e;
      },
      {
        "../../../lang/index": 20,
        "../../../lib/constants": 24,
        "../../../lib/cookie": 25,
        "../../../lib/dom": 28,
        "../../../lib/event": 29,
        "../../../lib/object": 37,
        "../../../lib/util": 44,
        "../../../player/base/event/eventtype": 54,
        "./selector": 129,
        "./util": 131,
      },
    ],
    131: [
      function (e, i, t) {
        (i.exports.findliElementForSelector = function (e) {
          if (!e || "li" == e.tagName.toLowerCase()) return e;
          e = e.parentElement;
          return e && "li" == e.tagName.toLowerCase() ? e : null;
        }),
          (i.exports.findliElementByKey = function (e, t) {
            document.querySelectors(e);
            return null;
          }),
          (i.exports.findItemElementForList = function (e) {
            if (!e || -1 < e.className.indexOf("prism-setting-item")) return e;
            var t = e.parentElement;
            return (e = t ? i.exports.findItemElementForList(t) : e);
          });
      },
      {},
    ],
    132: [
      function (e, t, i) {
        var r = e("../component"),
          n = e("../../lib/dom"),
          u = e("../../lib/util"),
          o = e("../../lang/index"),
          c = e("../../player/base/event/eventtype"),
          a = e("./util"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t), this.addClass("prism-snapshot-btn");
            },
            createEl: function () {
              return r.prototype.createEl.call(this, "div");
            },
            bindEvent: function () {
              var l = this;
              this._player.on(c.Private.Snapshot_Hide, function () {
                n.css(l._el, "display", "none");
              }),
                a.registerTooltipEvent.call(this, this.el(), o.get("Snapshot")),
                this.on("click", function () {
                  l.trigger(c.Player.Snapshoting);
                  var e = document.createElement("canvas"),
                    t = l._player.tag,
                    i = t.videoWidth,
                    r = t.videoHeight,
                    n = l._player._getSanpshotMatric();
                  (e.width = n.width || i), (e.height = n.height || r);
                  var o = l._player.getCurrentTime(),
                    a = e.getContext("2d");
                  a.save();
                  var s = l._player.getImage();
                  "vertical" == s
                    ? (a.translate(0, e.height), a.scale(1, -1))
                    : "horizon" == s &&
                      (a.translate(e.width, 0), a.scale(-1, 1)),
                    a.drawImage(t, 0, 0, i, r),
                    a.restore(),
                    d(a, l._player.getOptions());
                  (i = ""), (r = "");
                  try {
                    i = e.toDataURL("image/jpeg", n.rate || 1);
                  } catch (e) {
                    r = e;
                  }
                  (a = ""), (e = ""), (n = "");
                  i &&
                    ((e = (a = i).substr(a.indexOf(",") + 1)),
                    (n = u.toBinary(e))),
                    l.trigger(c.Player.Snapshoted, {
                      time: o,
                      base64: a,
                      binary: n,
                      error: r,
                    });
                });
            },
          }),
          d = function (e, t) {
            t = t.snapshotWatermark;
            t &&
              t.text &&
              ((e.font = t.font),
              t.fillColor &&
                ((e.fillStyle = t.fillColor),
                e.fillText(t.text, t.left, t.top)),
              t.strokeColor &&
                ((e.strokeStyle = t.strokeColor),
                e.strokeText(t.text, t.left, t.top)),
              e.stroke());
          };
        t.exports = e;
      },
      {
        "../../lang/index": 20,
        "../../lib/dom": 28,
        "../../lib/util": 44,
        "../../player/base/event/eventtype": 54,
        "../component": 109,
        "./util": 136,
      },
    ],
    133: [
      function (e, t, i) {
        var r = e("../component"),
          s = (e("../../lib/util"), e("../../lib/dom")),
          n = e("../../lib/event"),
          o =
            (e("../../lib/ua"),
            e("../../lang/index"),
            e("../../player/base/event/eventtype")),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t), this.addClass("prism-thumbnail");
            },
            createEl: function () {
              var e = r.prototype.createEl.call(this, "div");
              return (e.innerHTML = "<img></img><span></span>"), e;
            },
            bindEvent: function () {
              var a = this;
              n.on(this._el, "mousemove", function (e) {
                e.preventDefault();
              }),
                n.on(this._el, "touchmove", function (e) {
                  e.preventDefault();
                }),
                a._player.on(o.Private.ThumbnailLoaded, function (e) {
                  var i,
                    r,
                    t = e.paramData;
                  t &&
                    0 < t.length &&
                    ((e = a._player._thumbnailService.makeUrl(t[0].text)),
                    a._player.log("THUMBNAILSTART", {
                      tu: encodeURIComponent(e),
                    }),
                    (i = new Date().getTime()),
                    t[0].isBig
                      ? (s.css(a.el(), "background", "url(" + e + ")"),
                        s.css(a.el(), "width", t[0].w + "px"),
                        s.css(a.el(), "height", t[0].h + "px"),
                        a._player.log("THUMBNAILCOMPLETE", {
                          ftt: new Date().getTime() - i,
                        }))
                      : (((r = document.querySelector(
                          "#" + a.id() + " img"
                        )).onload = function () {
                          var e = r.width,
                            t = r.height;
                          s.css(a.el(), "width", e + "px"),
                            s.css(a.el(), "height", t + "px"),
                            a._player.log("THUMBNAILCOMPLETE", {
                              ftt: new Date().getTime() - i,
                            });
                        }),
                        (r.src = e)));
                }),
                a._player.on(o.Private.ThumbnailShow, function (o) {
                  a._thumbnailShowHanlde &&
                    clearTimeout(a._thumbnailShowHanlde),
                    (a._thumbnailShowHanlde = setTimeout(function () {
                      var e,
                        t,
                        i,
                        r = document.querySelector("#" + a.id() + " span"),
                        n = o.paramData;
                      (r.innerText = n.formatTime),
                        n &&
                          ((e = a._player._thumbnailService.findAvailableCue(
                            n.time
                          ))
                            ? e.isBig
                              ? ((i = a._player._thumbnailService.makeUrl(
                                  e.text
                                )),
                                s.css(a.el(), "background", "url(" + i + ")"),
                                e.w,
                                e.h,
                                (t = -1 * e.x + "px " + -1 * e.y + "px"),
                                s.css(a.el(), "background-position", t))
                              : ((t = document.querySelector(
                                  "#" + a.id() + " img"
                                )),
                                (i = a._player._thumbnailService.makeUrl(
                                  e.text
                                )),
                                t.src != i && (t.src = i))
                            : (s.css(a.el(), "border", "none"),
                              s.css(r, "left", "0px")),
                          s.css(a.el(), "display", "block"),
                          (i = 0),
                          (r = (e ? a.el() : r).offsetWidth),
                          (i =
                            n.left + r > n.progressWidth
                              ? n.left - r
                              : (i = n.left - r / 2) < 0
                              ? 0
                              : i),
                          s.css(a.el(), "left", i + "px"));
                    }, 30));
                }),
                a._player.on(o.Private.ThumbnailHide, function (e) {
                  a._thumbnailShowHanlde &&
                    clearTimeout(a._thumbnailShowHanlde),
                    s.css(a.el(), "display", "none");
                });
            },
            _createSamllThumbnail: function () {},
            disposeUI: function () {
              this._thumbnailShowHanlde &&
                (clearTimeout(this._thumbnailShowHanlde),
                (this._thumbnailShowHanlde = null));
            },
          });
        t.exports = e;
      },
      {
        "../../lang/index": 20,
        "../../lib/dom": 28,
        "../../lib/event": 29,
        "../../lib/ua": 42,
        "../../lib/util": 44,
        "../../player/base/event/eventtype": 54,
        "../component": 109,
      },
    ],
    134: [
      function (e, t, i) {
        var r = e("../component"),
          n = e("../../lib/util"),
          o = e("../../player/base/event/eventtype"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t), this.addClass("prism-time-display");
            },
            createEl: function () {
              var e = r.prototype.createEl.call(this, "div");
              return (
                (e.innerHTML =
                  '<span class="current-time">00:00</span> <span class="time-bound">/</span> <span class="duration">00:00</span>'),
                e
              );
            },
            bindEvent: function () {
              var t = this;
              this._player.on(o.Video.DurationChange, function () {
                var e = n.formatTime(t._player.getDisplayDuration());
                e
                  ? ((document.querySelector(
                      "#" + t.id() + " .time-bound"
                    ).style.display = "inline"),
                    (document.querySelector(
                      "#" + t.id() + " .duration"
                    ).style.display = "inline"),
                    (document.querySelector(
                      "#" + t.id() + " .duration"
                    ).innerText = e))
                  : ((document.querySelector(
                      "#" + t.id() + " .duration"
                    ).style.display = "none"),
                    (document.querySelector(
                      "#" + t.id() + " .time-bound"
                    ).style.display = "none"));
              }),
                this._player.on(o.Video.TimeUpdate, function () {
                  var e = t._player.getCurrentTime(),
                    e = n.formatTime(e);
                  document.querySelector("#" + t.id() + " .current-time") &&
                    (e
                      ? ((document.querySelector(
                          "#" + t.id() + " .current-time"
                        ).style.display = "inline"),
                        (document.querySelector(
                          "#" + t.id() + " .current-time"
                        ).innerText = e))
                      : (document.querySelector(
                          "#" + t.id() + " .current-time"
                        ).style.display = "none"));
                });
            },
          });
        t.exports = e;
      },
      {
        "../../lib/util": 44,
        "../../player/base/event/eventtype": 54,
        "../component": 109,
      },
    ],
    135: [
      function (e, t, i) {
        var r = e("../component"),
          o = e("../../lib/dom"),
          a = e("../../player/base/event/eventtype"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t), this.addClass("prism-tooltip");
            },
            createEl: function () {
              var e = r.prototype.createEl.call(this, "p");
              return (e.innerText = "\u63d0\u793a\u4fe1\u606f"), e;
            },
            bindEvent: function () {
              var n = this;
              n._player.on(a.Private.TooltipShow, function (e) {
                var t = document.querySelector("#" + n.id()),
                  i = e.paramData;
                (t.innerText = i.text), o.css(t, "display", "block");
                var r = t.offsetWidth,
                  e = document.querySelector(
                    "#" + n._player.id() + " .prism-controlbar"
                  );
                e &&
                  ((e = e.offsetWidth),
                  i.left + r > e
                    ? o.css(t, "left", e - r + "px")
                    : o.css(t, "left", i.left - (r - i.width) / 2 + "px"));
              }),
                n._player.on(a.Private.TooltipHide, function (e) {
                  var t = document.querySelector("#" + n.id());
                  o.css(t, "display", "none");
                });
            },
          });
        t.exports = e;
      },
      {
        "../../lib/dom": 28,
        "../../player/base/event/eventtype": 54,
        "../component": 109,
      },
    ],
    136: [
      function (e, t, i) {
        var r = e("../../lib/event"),
          s = e("../../player/base/event/eventtype");
        (t.exports.registerTooltipEvent = function (e, n) {
          function o() {
            a._controlbarTooltipHandler &&
              (clearTimeout(a._controlbarTooltipHandler),
              (a._controlbarTooltipHandler = null));
          }
          var a = this;
          r.on(this.el(), "mouseover", function (e) {
            o(),
              (a._controlbarTooltipHandler = setTimeout(function () {
                a._player.trigger(s.Private.TooltipHide);
              }, 4e3));
            var t = a.el().offsetLeft,
              i = a.el().offsetWidth,
              r = n;
            "function" == typeof n && (r = n.call(this)),
              a._player.trigger(s.Private.TooltipShow, {
                left: t,
                width: i,
                text: r,
              });
          }),
            r.on(this.el(), "mouseout", function () {
              o(), a._player.trigger(s.Private.TooltipHide);
            });
        }),
          (t.exports.throttle = function (i, r) {
            var n = Date.now();
            return function () {
              var e = arguments,
                t = Date.now();
              r <= t - n && (i(e), (n = t));
            };
          });
      },
      { "../../lib/event": 29, "../../player/base/event/eventtype": 54 },
    ],
    137: [
      function (e, t, i) {
        var r = e("../component"),
          n = e("../../lib/dom"),
          o = e("../../lib/event"),
          a = e("../../player/base/event/eventtype"),
          s = e("./util"),
          l = e("../../lang/index"),
          u = e("./volumecontrol"),
          e = r.extend({
            init: function (e, t) {
              r.call(this, e, t), this.addClass("prism-volume");
              var i = new u(e, t);
              e.addChild(i, t);
            },
            createEl: function () {
              var e = r.prototype.createEl.call(this, "div");
              return (
                (e.innerHTML =
                  '<div class="volume-icon"><div class="short-horizontal"></div><div class="long-horizontal"></div></div>'),
                e
              );
            },
            bindEvent: function () {
              var i = this;
              (this.icon = document.querySelector(
                "#" + i.id() + "  .volume-icon"
              )),
                s.registerTooltipEvent.call(this, this.el(), function () {
                  return i._player.muted() || 0 == i._player.getVolume()
                    ? l.get("Muted")
                    : l.get("Volume");
                }),
                o.on(this.icon, "click", function (e) {
                  var t = i.el().offsetLeft;
                  i._player.trigger(a.Private.SettingListHide),
                    i._player.trigger(a.Private.SelectorHide),
                    i._player.trigger(a.Private.VolumeVisibilityChange, t),
                    i._player.trigger(a.Private.MarkerTextHide);
                });
              var e = document.querySelector(
                  "#" + i.id() + "  .long-horizontal"
                ),
                t = document.querySelector(
                  "#" + i.id() + "  .short-horizontal"
                );
              o.on(this.el(), "mouseover", function () {
                n.removeClass(e, "volume-hover-animation"),
                  setTimeout(function () {
                    n.addClass(e, "volume-hover-animation");
                  }),
                  setTimeout(function () {
                    n.removeClass(e, "volume-hover-animation"),
                      n.addClass(t, "volume-hover-animation"),
                      setTimeout(function () {
                        n.removeClass(t, "volume-hover-animation"),
                          n.addClass(e, "volume-hover-animation");
                      }, 300);
                  }, 300);
              });
            },
          });
        t.exports = e;
      },
      {
        "../../lang/index": 20,
        "../../lib/dom": 28,
        "../../lib/event": 29,
        "../../player/base/event/eventtype": 54,
        "../component": 109,
        "./util": 136,
        "./volumecontrol": 138,
      },
    ],
    138: [
      function (e, t, i) {
        var r = e("../component"),
          n = e("../../lib/dom"),
          o = e("../../lib/event"),
          a = e("../../player/base/event/eventtype"),
          e =
            (e("./util"),
            e("../../lang/index"),
            r.extend({
              init: function (e, t) {
                r.call(this, e, t),
                  this.addClass("prism-volume-control"),
                  (this._shown = !1);
              },
              createEl: function () {
                var e = r.prototype.createEl.call(this, "div");
                return (
                  (e.innerHTML =
                    '<div class="volume-range"><div class="volume-value"></div><div class="volume-cursor"></div></div>'),
                  e
                );
              },
              bindEvent: function () {
                var i = this;
                (this.icon = document.querySelector(
                  "#" + i._player.id() + "  .volume-icon"
                )),
                  (this.control = document.querySelector("#" + i.id())),
                  (this.volumnValue = document.querySelector(
                    "#" + i.id() + "  .volume-value"
                  )),
                  (this.volumnRange = document.querySelector(
                    "#" + i.id() + "  .volume-range"
                  )),
                  (this.volumnCursor = document.querySelector(
                    "#" + i.id() + "  .volume-cursor"
                  )),
                  this._player.on(
                    a.Private.VolumeVisibilityChange,
                    function (e) {
                      var t = e.paramData;
                      !i._shown && t
                        ? ((e = i._player.getVolume()),
                          i._setVolumnUI(e),
                          n.css(i.control, "display", "block"),
                          t && n.css(i.control, "left", t - 5 + "px"),
                          (i._shown = !0))
                        : (n.css(i.control, "display", "none"),
                          (i._shown = !1));
                    }
                  ),
                  o.on(this.volumnRange, "click", function (e) {
                    e = n.getPointerPosition(i.volumnRange, e).y;
                    e < 0 ||
                      1 < e ||
                      (i._setVolumnUI((e = 1 < (e = e < 0 ? 0 : e) ? 1 : e)),
                      i._setMuteUI(e),
                      i._player.setVolume(e));
                  }),
                  o.on(this._player.tag, "click", function (e) {
                    e &&
                      e.target == e.currentTarget &&
                      n.css(i.control, "display", "none");
                  }),
                  o.on(this._player.tag, "touchstart", function (e) {
                    e &&
                      e.target == e.currentTarget &&
                      n.css(i.control, "display", "none");
                  }),
                  o.on(this.volumnCursor, "mousedown", function (e) {
                    i._onMouseDown(e);
                  }),
                  o.on(this.volumnCursor, "touchstart", function (e) {
                    i._onMouseDown(e);
                  }),
                  this._player.on(a.Private.VolumnChanged, function (e) {
                    e = e.paramData;
                    -1 < e && i._setVolumnUI(e), i._setMuteUI(e);
                  }),
                  o.on(this.control, "mouseleave", function () {
                    i._offEvent(),
                      n.css(i.control, "display", "none"),
                      (i._shown = !1);
                  }),
                  o.on(this.control, "mouseover", function () {
                    n.addClass(i.control, "hover");
                  }),
                  (i._rangeBottom = i._getBottom());
              },
              _getBottom: function () {
                if (window.getComputedStyle) {
                  var e = window
                    .getComputedStyle(this.volumnRange, null)
                    .getPropertyValue("bottom");
                  return parseFloat(e);
                }
                return 26;
              },
              _onMouseDown: function (e) {
                var t = this;
                e.preventDefault(),
                  o.on(this.control, "mousemove", function (e) {
                    t._onMouseMove(e);
                  }),
                  o.on(this.control, "touchmove", function (e) {
                    t._onMouseMove(e);
                  }),
                  o.on(this._player.tag, "mouseup", function (e) {
                    t._onMouseUp(e);
                  }),
                  o.on(this._player.tag, "touchend", function (e) {
                    t._onMouseUp(e);
                  }),
                  o.on(this.control, "mouseup", function (e) {
                    t._onMouseUp(e);
                  }),
                  o.on(this.control, "touchend", function (e) {
                    t._onMouseUp(e);
                  });
              },
              _onMouseUp: function (e) {
                e.preventDefault(),
                  this._offEvent(),
                  this.volumnRange.offsetHeight &&
                    ((e = (
                      this.volumnValue.offsetHeight /
                      this.volumnRange.offsetHeight
                    ).toFixed(2)),
                    this._player.setVolume(e),
                    this._setMuteUI(e));
              },
              _onMouseMove: function (e) {
                e.preventDefault();
                e = n.getPointerPosition(this.volumnRange, e).y;
                e < 0 ||
                  1 < e ||
                  this._setVolumnUI((e = 1 < (e = e < 0 ? 0 : e) ? 1 : e));
              },
              _getPosition: function (e) {
                for (var t = this.volumnRange, i = 0; (t = t.offsetParent); )
                  i += t.offsetTop;
                var r = this.volumnRange.offsetHeight,
                  n = this.volumnCursor.offsetHeight,
                  o = (e.touches ? e.touches[0] : e).pageY;
                return (
                  (r - ((o = r < o - i ? e.clientY : o) - i) + n) /
                  (r = this.volumnRange.offsetHeight)
                );
              },
              _offEvent: function () {
                o.off(this._player.tag, "mouseup"),
                  o.off(this._player.tag, "touchend"),
                  o.off(this.control, "mousemove"),
                  o.off(this.control, "touchmove"),
                  o.off(this.control, "mouseup"),
                  o.off(this.control, "touchend");
              },
              _setMuteUI: function (e) {
                isNaN(e) ||
                  (0 == e || -1 == e
                    ? n.addClass(this.icon, "mute")
                    : n.removeClass(this.icon, "mute"));
              },
              _setVolumnUI: function (e) {
                isNaN(e) ||
                  (n.css(this.volumnValue, "height", 100 * e + "%"),
                  n.css(
                    this.volumnCursor,
                    "bottom",
                    100 * (e = 1 == e ? 0.99 : e) + "%"
                  ));
              },
            }));
        t.exports = e;
      },
      {
        "../../lang/index": 20,
        "../../lib/dom": 28,
        "../../lib/event": 29,
        "../../player/base/event/eventtype": 54,
        "../component": 109,
        "./util": 136,
      },
    ],
    139: [
      function (e, t, i) {
        t.exports = {
          H5Loading: e("./component/h5-loading"),
          bigPlayButton: e("./component/big-play-button"),
          controlBar: e("./component/controlbar"),
          progress: e("./component/progress"),
          playButton: e("./component/play-button"),
          liveDisplay: e("./component/live-display"),
          timeDisplay: e("./component/time-display"),
          fullScreenButton: e("./component/fullscreen-button"),
          volume: e("./component/volume"),
          snapshot: e("./component/snapshot"),
          errorDisplay: e("./component/error-display"),
          infoDisplay: e("./component/info-display"),
          liveShiftProgress: e("../commonui/liveshiftprogress"),
          liveShiftTimeDisplay: e("../commonui/livetimedisplay"),
          setting: e("./component/setting/button"),
          subtitle: e("./component/cc-button"),
          thumbnail: e("./component/thumbnail"),
          tooltip: e("./component/tooltip"),
        };
      },
      {
        "../commonui/liveshiftprogress": 11,
        "../commonui/livetimedisplay": 12,
        "./component/big-play-button": 110,
        "./component/cc-button": 111,
        "./component/controlbar": 112,
        "./component/error-display": 114,
        "./component/fullscreen-button": 115,
        "./component/h5-loading": 116,
        "./component/info-display": 117,
        "./component/live-display": 118,
        "./component/play-button": 120,
        "./component/progress": 121,
        "./component/setting/button": 125,
        "./component/snapshot": 132,
        "./component/thumbnail": 133,
        "./component/time-display": 134,
        "./component/tooltip": 135,
        "./component/volume": 137,
      },
    ],
  },
  {},
  [14]
);
