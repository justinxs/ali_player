/*! Aliplayer - v2.9.19 - 2022-01-14 15.57.28 */
!(function o(n, i, a) {
  function s(t, e) {
    if (!i[t]) {
      if (!n[t]) {
        var r = "function" == typeof require && require;
        if (!e && r) return r(t, !0);
        if (l) return l(t, !0);
        throw (
          (((r = new Error("Cannot find module '" + t + "'")).code =
            "MODULE_NOT_FOUND"),
          r)
        );
      }
      (r = i[t] = { exports: {} }),
        n[t][0].call(
          r.exports,
          function (e) {
            return s(n[t][1][e] || e);
          },
          r,
          r.exports,
          o,
          n,
          i,
          a
        );
    }
    return i[t].exports;
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
      function (m, r, o) {
        !function (f) {
          !function () {
            var e, t;
            (e = this),
              (t = function () {
                return (function (c) {
                  var o;
                  if (
                    ("undefined" != typeof window &&
                      window.crypto &&
                      (o = window.crypto),
                    "undefined" != typeof self &&
                      self.crypto &&
                      (o = self.crypto),
                    !(o =
                      !(o =
                        !(o =
                          "undefined" != typeof globalThis && globalThis.crypto
                            ? globalThis.crypto
                            : o) &&
                        "undefined" != typeof window &&
                        window.msCrypto
                          ? window.msCrypto
                          : o) &&
                      void 0 !== f &&
                      f.crypto
                        ? f.crypto
                        : o) && "function" == typeof m)
                  )
                    try {
                      o = m("crypto");
                    } catch (e) {}
                  var r =
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
                    i = (n.Base = {
                      extend: function (e) {
                        var t = r(this);
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
                    u = (n.WordArray = i.extend({
                      init: function (e, t) {
                        (e = this.words = e || []),
                          (this.sigBytes = null != t ? t : 4 * e.length);
                      },
                      toString: function (e) {
                        return (e || s).stringify(this);
                      },
                      concat: function (e) {
                        var t = this.words,
                          r = e.words,
                          o = this.sigBytes,
                          n = e.sigBytes;
                        if ((this.clamp(), o % 4))
                          for (var i = 0; i < n; i++) {
                            var a = (r[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
                            t[(o + i) >>> 2] |= a << (24 - ((o + i) % 4) * 8);
                          }
                        else
                          for (var s = 0; s < n; s += 4)
                            t[(o + s) >>> 2] = r[s >>> 2];
                        return (this.sigBytes += n), this;
                      },
                      clamp: function () {
                        var e = this.words,
                          t = this.sigBytes;
                        (e[t >>> 2] &= 4294967295 << (32 - (t % 4) * 8)),
                          (e.length = c.ceil(t / 4));
                      },
                      clone: function () {
                        var e = i.clone.call(this);
                        return (e.words = this.words.slice(0)), e;
                      },
                      random: function (e) {
                        for (var t = [], r = 0; r < e; r += 4)
                          t.push(
                            (function () {
                              if (o) {
                                if ("function" == typeof o.getRandomValues)
                                  try {
                                    return o.getRandomValues(
                                      new Uint32Array(1)
                                    )[0];
                                  } catch (e) {}
                                if ("function" == typeof o.randomBytes)
                                  try {
                                    return o.randomBytes(4).readInt32LE();
                                  } catch (e) {}
                              }
                              throw new Error(
                                "Native crypto module could not be used to get secure random number."
                              );
                            })()
                          );
                        return new u.init(t, e);
                      },
                    })),
                    a = (e.enc = {}),
                    s = (a.Hex = {
                      stringify: function (e) {
                        for (
                          var t = e.words, r = e.sigBytes, o = [], n = 0;
                          n < r;
                          n++
                        ) {
                          var i = (t[n >>> 2] >>> (24 - (n % 4) * 8)) & 255;
                          o.push((i >>> 4).toString(16)),
                            o.push((15 & i).toString(16));
                        }
                        return o.join("");
                      },
                      parse: function (e) {
                        for (var t = e.length, r = [], o = 0; o < t; o += 2)
                          r[o >>> 3] |=
                            parseInt(e.substr(o, 2), 16) << (24 - (o % 8) * 4);
                        return new u.init(r, t / 2);
                      },
                    }),
                    l = (a.Latin1 = {
                      stringify: function (e) {
                        for (
                          var t = e.words, r = e.sigBytes, o = [], n = 0;
                          n < r;
                          n++
                        ) {
                          var i = (t[n >>> 2] >>> (24 - (n % 4) * 8)) & 255;
                          o.push(String.fromCharCode(i));
                        }
                        return o.join("");
                      },
                      parse: function (e) {
                        for (var t = e.length, r = [], o = 0; o < t; o++)
                          r[o >>> 2] |=
                            (255 & e.charCodeAt(o)) << (24 - (o % 4) * 8);
                        return new u.init(r, t);
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
                    p = (n.BufferedBlockAlgorithm = i.extend({
                      reset: function () {
                        (this._data = new u.init()), (this._nDataBytes = 0);
                      },
                      _append: function (e) {
                        "string" == typeof e && (e = d.parse(e)),
                          this._data.concat(e),
                          (this._nDataBytes += e.sigBytes);
                      },
                      _process: function (e) {
                        var t,
                          r = this._data,
                          o = r.words,
                          n = r.sigBytes,
                          i = this.blockSize,
                          a = n / (4 * i),
                          s =
                            (a = e
                              ? c.ceil(a)
                              : c.max((0 | a) - this._minBufferSize, 0)) * i,
                          n = c.min(4 * s, n);
                        if (s) {
                          for (var l = 0; l < s; l += i)
                            this._doProcessBlock(o, l);
                          (t = o.splice(0, s)), (r.sigBytes -= n);
                        }
                        return new u.init(t, n);
                      },
                      clone: function () {
                        var e = i.clone.call(this);
                        return (e._data = this._data.clone()), e;
                      },
                      _minBufferSize: 0,
                    })),
                    h =
                      ((n.Hasher = p.extend({
                        cfg: i.extend(),
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
                        _createHelper: function (r) {
                          return function (e, t) {
                            return new r.init(t).finalize(e);
                          };
                        },
                        _createHmacHelper: function (r) {
                          return function (e, t) {
                            return new h.HMAC.init(r, t).finalize(e);
                          };
                        },
                      })),
                      (e.algo = {}));
                  return e;
                })(Math);
              }),
              "object" == typeof o
                ? (r.exports = o = t())
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
      { crypto: 7 },
    ],
    2: [
      function (e, t, r) {
        var o, n;
        (o = this),
          (n = function (e) {
            var l;
            return (
              (l = e.lib.WordArray),
              (e.enc.Base64 = {
                stringify: function (e) {
                  var t = e.words,
                    r = e.sigBytes,
                    o = this._map;
                  e.clamp();
                  for (var n = [], i = 0; i < r; i += 3)
                    for (
                      var a =
                          (((t[i >>> 2] >>> (24 - (i % 4) * 8)) & 255) << 16) |
                          (((t[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) &
                            255) <<
                            8) |
                          ((t[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) &
                            255),
                        s = 0;
                      s < 4 && i + 0.75 * s < r;
                      s++
                    )
                      n.push(o.charAt((a >>> (6 * (3 - s))) & 63));
                  var l = o.charAt(64);
                  if (l) for (; n.length % 4; ) n.push(l);
                  return n.join("");
                },
                parse: function (e) {
                  var t = e.length,
                    r = this._map;
                  if (!(o = this._reverseMap))
                    for (
                      var o = (this._reverseMap = []), n = 0;
                      n < r.length;
                      n++
                    )
                      o[r.charCodeAt(n)] = n;
                  var i = r.charAt(64);
                  return (
                    !i || (-1 !== (i = e.indexOf(i)) && (t = i)),
                    (function (e, t, r) {
                      for (var o = [], n = 0, i = 0; i < t; i++) {
                        var a, s;
                        i % 4 &&
                          ((a = r[e.charCodeAt(i - 1)] << ((i % 4) * 2)),
                          (s = r[e.charCodeAt(i)] >>> (6 - (i % 4) * 2)),
                          (s = a | s),
                          (o[n >>> 2] |= s << (24 - (n % 4) * 8)),
                          n++);
                      }
                      return l.create(o, n);
                    })(e, t, o)
                  );
                },
                _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
              }),
              e.enc.Base64
            );
          }),
          "object" == typeof r
            ? (t.exports = r = n(e("./core")))
            : "function" == typeof define && define.amd
            ? define(["./core"], n)
            : n(o.CryptoJS);
      },
      { "./core": 1 },
    ],
    3: [
      function (e, t, r) {
        var o, n;
        (o = this),
          (n = function (e) {
            return e.enc.Utf8;
          }),
          "object" == typeof r
            ? (t.exports = r = n(e("./core")))
            : "function" == typeof define && define.amd
            ? define(["./core"], n)
            : n(o.CryptoJS);
      },
      { "./core": 1 },
    ],
    4: [
      function (e, t, r) {
        var o, n;
        (o = this),
          (n = function (e) {
            return e.HmacSHA1;
          }),
          "object" == typeof r
            ? (t.exports = r = n(e("./core"), e("./sha1"), e("./hmac")))
            : "function" == typeof define && define.amd
            ? define(["./core", "./sha1", "./hmac"], n)
            : n(o.CryptoJS);
      },
      { "./core": 1, "./hmac": 5, "./sha1": 6 },
    ],
    5: [
      function (e, t, r) {
        var o, n;
        (o = this),
          (n = function (e) {
            var t, s;
            (t = e.lib.Base),
              (s = e.enc.Utf8),
              (e.algo.HMAC = t.extend({
                init: function (e, t) {
                  (e = this._hasher = new e.init()),
                    "string" == typeof t && (t = s.parse(t));
                  var r = e.blockSize,
                    o = 4 * r;
                  (t = t.sigBytes > o ? e.finalize(t) : t).clamp();
                  for (
                    var e = (this._oKey = t.clone()),
                      t = (this._iKey = t.clone()),
                      n = e.words,
                      i = t.words,
                      a = 0;
                    a < r;
                    a++
                  )
                    (n[a] ^= 1549556828), (i[a] ^= 909522486);
                  (e.sigBytes = t.sigBytes = o), this.reset();
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
          "object" == typeof r
            ? (t.exports = r = n(e("./core")))
            : "function" == typeof define && define.amd
            ? define(["./core"], n)
            : n(o.CryptoJS);
      },
      { "./core": 1 },
    ],
    6: [
      function (e, t, r) {
        var o, n;
        (o = this),
          (n = function (e) {
            var t, r, o, n, u;
            return (
              (r = (t = e).lib),
              (o = r.WordArray),
              (n = r.Hasher),
              (r = t.algo),
              (u = []),
              (r = r.SHA1 =
                n.extend({
                  _doReset: function () {
                    this._hash = new o.init([
                      1732584193, 4023233417, 2562383102, 271733878, 3285377520,
                    ]);
                  },
                  _doProcessBlock: function (e, t) {
                    for (
                      var r = this._hash.words,
                        o = r[0],
                        n = r[1],
                        i = r[2],
                        a = r[3],
                        s = r[4],
                        l = 0;
                      l < 80;
                      l++
                    ) {
                      l < 16
                        ? (u[l] = 0 | e[t + l])
                        : ((c = u[l - 3] ^ u[l - 8] ^ u[l - 14] ^ u[l - 16]),
                          (u[l] = (c << 1) | (c >>> 31)));
                      var c = ((o << 5) | (o >>> 27)) + s + u[l];
                      (c +=
                        l < 20
                          ? 1518500249 + ((n & i) | (~n & a))
                          : l < 40
                          ? 1859775393 + (n ^ i ^ a)
                          : l < 60
                          ? ((n & i) | (n & a) | (i & a)) - 1894007588
                          : (n ^ i ^ a) - 899497514),
                        (s = a),
                        (a = i),
                        (i = (n << 30) | (n >>> 2)),
                        (n = o),
                        (o = c);
                    }
                    (r[0] = (r[0] + o) | 0),
                      (r[1] = (r[1] + n) | 0),
                      (r[2] = (r[2] + i) | 0),
                      (r[3] = (r[3] + a) | 0),
                      (r[4] = (r[4] + s) | 0);
                  },
                  _doFinalize: function () {
                    var e = this._data,
                      t = e.words,
                      r = 8 * this._nDataBytes,
                      o = 8 * e.sigBytes;
                    return (
                      (t[o >>> 5] |= 128 << (24 - (o % 32))),
                      (t[14 + (((64 + o) >>> 9) << 4)] = Math.floor(
                        r / 4294967296
                      )),
                      (t[15 + (((64 + o) >>> 9) << 4)] = r),
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
              (t.SHA1 = n._createHelper(r)),
              (t.HmacSHA1 = n._createHmacHelper(r)),
              e.SHA1
            );
          }),
          "object" == typeof r
            ? (t.exports = r = n(e("./core")))
            : "function" == typeof define && define.amd
            ? define(["./core"], n)
            : n(o.CryptoJS);
      },
      { "./core": 1 },
    ],
    7: [function (e, t, r) {}, {}],
    8: [
      function (e, t, r) {
        var o = e("../ui/component"),
          n = (e("../lib/util"), e("../lib/dom")),
          i = e("../lib/event"),
          a = (e("../lib/ua"), e("../lang/index")),
          s = e("../player/base/event/eventtype"),
          e = o.extend({
            init: function (e, t) {
              o.call(this, e, t),
                (this.className = t.className || "prism-auto-stream-selector"),
                this.addClass(this.className);
            },
            createEl: function () {
              var e = o.prototype.createEl.call(this, "div");
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
              var o = this;
              o._player.on(s.Private.AutoStreamShow, function (e) {
                var t,
                  r = document.querySelector("#" + o.getId() + " .tip-text");
                !o._player._getLowerQualityLevel ||
                  ((t = o._player._getLowerQualityLevel()) &&
                    ((o._switchUrl = t),
                    (r.innerText = a
                      .get("Auto_Stream_Tip_Text")
                      .replace("$$", t.item.desc)),
                    n.css(o.el(), "display", "block")));
              }),
                o._player.on(s.Private.AutoStreamHide, function (e) {
                  document.querySelector("#" + o.getId() + " .tip-text");
                  n.css(o.el(), "display", "none");
                });
              var e = document.querySelector(
                "#" + o.getId() + " .prism-button-ok"
              );
              i.on(e, "click", function () {
                o._player._changeStream &&
                  o._switchUrl &&
                  o._player._changeStream(
                    o._switchUrl.index,
                    a.get("Quality_Change_Text")
                  ),
                  n.css(o.el(), "display", "none");
              });
              e = document.querySelector(
                "#" + o.getId() + " .prism-button-cancel"
              );
              i.on(e, "click", function () {
                n.css(o.el(), "display", "none");
              });
            },
          });
        t.exports = e;
      },
      {
        "../lang/index": 15,
        "../lib/dom": 20,
        "../lib/event": 21,
        "../lib/ua": 30,
        "../lib/util": 32,
        "../player/base/event/eventtype": 33,
        "../ui/component": 39,
      },
    ],
    9: [
      function (e, t, r) {
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
    10: [
      function (e, t, r) {
        var o = e("./player/flash/flashplayer"),
          n =
            (e("./lib/dom"),
            e("./lib/ua"),
            e("./lib/object"),
            e("./lib/playerutil")),
          e =
            (e("./config"),
            function (e) {
              var t = n.createWrapper(e),
                e = n.handleOption(e);
              return n.adjustContainerLayout(t, e), t.player || new o(t, e);
            }),
          i = (window.Aliplayer = e);
        (e.players = {}),
          "function" == typeof define && define.amd
            ? define([], function () {
                return i;
              })
            : "object" == typeof r && "object" == typeof t && (t.exports = i);
      },
      {
        "./config": 9,
        "./lib/dom": 20,
        "./lib/object": 26,
        "./lib/playerutil": 28,
        "./lib/ua": 30,
        "./player/flash/flashplayer": 35,
      },
    ],
    11: [
      function (e, t, r) {
        var o = e("../lib/oo"),
          n = e("../lang/index"),
          o = o.extend({
            init: function (e, t) {
              (this._player = e), (this._options = e.options());
            },
          });
        (o.prototype.handle = function (e) {
          var t, r;
          this._options.autoPlayDelay &&
            ((t =
              (t = this._options.autoPlayDelayDisplayText) ||
              n
                .get("AutoPlayDelayDisplayText")
                .replace("$$", this._options.autoPlayDelay)),
            this._player.trigger("info_show", t),
            this._player.trigger("h5_loading_hide"),
            this._player.trigger("play_btn_hide"),
            ((r = this)._timeHandler = setTimeout(function () {
              r._player.trigger("info_hide"),
                (r._options.autoPlayDelay = 0),
                e && e();
            }, 1e3 * this._options.autoPlayDelay)),
            this._player.on("play", function () {
              i(r);
            }),
            this._player.on("pause", function () {
              i(r);
            }));
        }),
          (o.prototype.dispose = function () {
            i(this), (this._player = null);
          });
        var i = function (e) {
          e._timeHandler &&
            (clearTimeout(e._timeHandler), (e._timeHandler = null));
        };
        t.exports = o;
      },
      { "../lang/index": 15, "../lib/oo": 27 },
    ],
    12: [
      function (e, t, r) {
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
    13: [
      function (e, t, r) {
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
    14: [
      function (e, t, r) {
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
    15: [
      function (i, e, t) {
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
          var r = d(e),
            o = "",
            n = u(),
            o =
              "flash" == e
                ? "en-us" == n
                  ? i("./flash/en-us")
                  : "zh-cn" == n
                  ? i("./flash/zh-cn")
                  : t[n]
                : "en-us" == n
                ? i("./en-us")
                : "zh-cn" == n
                ? i("./zh-cn")
                : t[n];
          s.set(r, JSON.stringify(o)), c(e, o);
        }
        var r = i("../config"),
          s = i("../lib/storage"),
          o = (i("../lib/io"), "aliplayer_lang_data"),
          l = "aliplayer_lang",
          c = function (e, t) {
            e = d(e);
            window[e] = t;
          },
          u = function () {
            return n();
          },
          d = function (e) {
            var t = u();
            return (
              o +
              "_" +
              (e = e || "h5") +
              "_" +
              r.h5Version.replace(/\./g, "_") +
              "_" +
              t
            );
          };
        (e.exports.setCurrentLanguage = function (e, t, r) {
          var o = window[l];
          if (
            !(
              "en-us" == (e = void 0 === e || !e ? n() : e) ||
              "zh-cn" == e ||
              (r && r[e])
            )
          )
            throw new Error(
              "There is not language resource for " +
                e +
                ", please specify the language resource by languageTexts property"
            );
          (window[l] = e),
            a(t, r),
            e != o && i("../lib/constants").updateByLanguage();
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
        "../config": 9,
        "../lib/constants": 17,
        "../lib/io": 24,
        "../lib/storage": 29,
        "./en-us": 12,
        "./flash/en-us": 13,
        "./flash/zh-cn": 14,
        "./zh-cn": 16,
      },
    ],
    16: [
      function (e, t, r) {
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
    17: [
      function (e, t, r) {
        var o = e("../lang/index");
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
            1: o.get("Error_Load_Abort_Text"),
            2: o.get("Error_Network_Text"),
            3: o.get("Error_Decode_Text"),
            4: o.get("Error_Server_Network_NotSupport_Text"),
          }),
            (t.exports.VideoLevels = {
              0: o.get("OD"),
              640: o.get("FD"),
              960: o.get("LD"),
              1280: o.get("SD"),
              1920: o.get("HD"),
              2580: o.get("2K"),
              3840: o.get("4K"),
            }),
            (t.exports.QualityLevels = {
              OD: o.get("OD"),
              LD: o.get("LD"),
              FD: o.get("FD"),
              SD: o.get("SD"),
              HD: o.get("HD"),
              "2K": o.get("2K"),
              "4K": o.get("4K"),
              XLD: o.get("XLD"),
              FHD: o.get("FHD"),
              SQ: o.get("SQ"),
              HQ: o.get("HQ"),
            }),
            (t.exports.SpeedLevels = [
              { key: 0.5, text: o.get("Speed_05X_Text") },
              { key: 1, text: o.get("Speed_1X_Text") },
              { key: 1.25, text: o.get("Speed_125X_Text") },
              { key: 1.5, text: o.get("Speed_15X_Text") },
              { key: 2, text: o.get("Speed_2X_Text") },
            ]);
        };
        e(), (t.exports.updateByLanguage = e);
      },
      { "../lang/index": 15 },
    ],
    18: [
      function (e, t, r) {
        (t.exports.get = function (e) {
          for (
            var t = e + "", r = document.cookie.split(";"), o = 0;
            o < r.length;
            o++
          ) {
            var n = r[o].trim();
            if (0 == n.indexOf(t))
              return unescape(n.substring(t.length + 1, n.length));
          }
          return "";
        }),
          (t.exports.set = function (e, t, r) {
            var o = new Date();
            o.setTime(o.getTime() + 24 * r * 60 * 60 * 1e3);
            o = "expires=" + o.toGMTString();
            document.cookie = e + "=" + escape(t) + "; " + o;
          });
      },
      {},
    ],
    19: [
      function (e, r, t) {
        var o = e("./object");
        (r.exports.cache = {}),
          (r.exports.guid = function (e, t) {
            var r,
              o,
              n =
                "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
                  ""
                ),
              i = [];
            if (((t = t || n.length), e))
              for (r = 0; r < e; r++) i[r] = n[0 | (Math.random() * t)];
            else
              for (
                i[8] = i[13] = i[18] = i[23] = "-", i[14] = "4", r = 0;
                r < 36;
                r++
              )
                i[r] ||
                  ((o = 0 | (16 * Math.random())),
                  (i[r] = n[19 == r ? (3 & o) | 8 : o]));
            return i.join("");
          }),
          (r.exports.expando = "vdata" + new Date().getTime()),
          (r.exports.getData = function (e) {
            var t = e[r.exports.expando];
            return (
              t ||
                ((t = e[r.exports.expando] = r.exports.guid()),
                (r.exports.cache[t] = {})),
              r.exports.cache[t]
            );
          }),
          (r.exports.hasData = function (e) {
            var t = "";
            return !(
              !(t = e ? e[r.exports.expando] : t) ||
              o.isEmpty(r.exports.cache[t])
            );
          }),
          (r.exports.removeData = function (t) {
            var e = "";
            if ((e = t ? t[r.exports.expando] : e)) {
              delete r.exports.cache[e];
              try {
                delete t[r.exports.expando];
              } catch (e) {
                t.removeAttribute
                  ? t.removeAttribute(r.exports.expando)
                  : (t[r.exports.expando] = null);
              }
            }
          });
      },
      { "./object": 26 },
    ],
    20: [
      function (e, l, t) {
        var o = e("./object");
        (l.exports.el = function (e) {
          return document.getElementById(e);
        }),
          (l.exports.createEl = function (e, t) {
            var r;
            return (
              (e = e || "div"),
              (t = t || {}),
              (r = document.createElement(e)),
              o.each(t, function (e, t) {
                -1 !== e.indexOf("aria-") || "role" == e
                  ? r.setAttribute(e, t)
                  : (r[e] = t);
              }),
              r
            );
          }),
          (l.exports.addClass = function (e, t) {
            -1 == (" " + e.className + " ").indexOf(" " + t + " ") &&
              (e.className = "" === e.className ? t : e.className + " " + t);
          }),
          (l.exports.removeClass = function (e, t) {
            var r, o;
            if (-1 != e.className.indexOf(t)) {
              for (o = (r = e.className.split(" ")).length - 1; 0 <= o; o--)
                r[o] === t && r.splice(o, 1);
              e.className = r.join(" ");
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
              r,
              o = {},
              n = ",autoplay,controls,loop,muted,default,";
            if (e && e.attributes && 0 < e.attributes.length)
              for (var i, a = (i = e.attributes).length - 1; 0 <= a; a--)
                (t = i[a].name),
                  (r = i[a].value),
                  ("boolean" != typeof e[t] &&
                    -1 === n.indexOf("," + t + ",")) ||
                    (r = null !== r),
                  (o[t] = r);
            return o;
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
          (l.exports.css = function (r, e, t) {
            return (
              !(!r || !r.style) &&
              (e && t
                ? ((r.style[e] = t), !0)
                : t || "string" != typeof e
                ? !t &&
                  "object" == typeof e &&
                  (o.each(e, function (e, t) {
                    r.style[e] = t;
                  }),
                  !0)
                : r.style[e])
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
                r = t[0],
                o = 0,
                n = t.length;
              o < n;
              o++
            )
              if (void 0 !== e.style[t[o]]) {
                r = t[o];
                break;
              }
            return r;
          }),
          (l.exports.getTransformEventName = function (e, t) {
            for (
              var r = ["", "Webkit", "Moz", "ms", "O"],
                o = t.toLowerCase(),
                n = [
                  "transform",
                  "WebkitTransform",
                  "MozTransform",
                  "msTransform",
                  "OTransform",
                ],
                i = 0,
                a = n.length;
              i < a;
              i++
            )
              if (void 0 !== e.style[n[i]]) {
                0 != i && (o = r[i] + t);
                break;
              }
            return o;
          }),
          (l.exports.addCssByStyle = function (e) {
            var t = document,
              r = t.createElement("style");
            r.setAttribute("type", "text/css"),
              r.styleSheet
                ? (r.styleSheet.cssText = e)
                : ((o = t.createTextNode(e)), r.appendChild(o));
            var o = t.getElementsByTagName("head");
            (o.length ? o[0] : t.documentElement).appendChild(r);
          }),
          (l.exports.getTranslateX = function (e) {
            var t = 0;
            if (e)
              try {
                var r = window.getComputedStyle(e),
                  o = l.exports.getTransformName(e),
                  t = new (window.DOMMatrix ||
                    window.WebKitCSSMatrix ||
                    window.CSSMatrix ||
                    window.MSCSSMatrix)(r[o]).m41;
              } catch (e) {
                console.log(e);
              }
            return t;
          }),
          (l.exports.getPointerPosition = function (e, t) {
            var r = {},
              o = l.exports.findPosition(e),
              n = e.offsetWidth,
              i = e.offsetHeight,
              a = o.top,
              s = o.left,
              e = t.pageY,
              o = t.pageX;
            return (
              t.changedTouches &&
                ((o = t.changedTouches[0].pageX),
                (e = t.changedTouches[0].pageY)),
              (r.y = Math.max(0, Math.min(1, (a - e + i) / i))),
              (r.x = Math.max(0, Math.min(1, (o - s) / n))),
              r
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
            var r = document.documentElement,
              o = document.body,
              n = r.clientLeft || o.clientLeft || 0,
              e = window.pageXOffset || o.scrollLeft,
              n = t.left + e - n,
              r = r.clientTop || o.clientTop || 0,
              o = window.pageYOffset || o.scrollTop,
              r = t.top + o - r;
            return { left: Math.round(n), top: Math.round(r) };
          });
      },
      { "./object": 26 },
    ],
    21: [
      function (e, l, t) {
        var c = e("./object"),
          u = e("./data"),
          r = e("./ua"),
          o = e("./fastclick");
        function d(t, r, e, o) {
          c.each(e, function (e) {
            t(r, e, o);
          });
        }
        (l.exports.on = function (i, e, t) {
          if (i) {
            if (c.isArray(e)) return d(l.exports.on, i, e, t);
            r.IS_MOBILE && "click" == e && o.attach(i);
            var a = u.getData(i);
            a.handlers || (a.handlers = {}),
              a.handlers[e] || (a.handlers[e] = []),
              t.guid || (t.guid = u.guid()),
              a.handlers[e].push(t),
              a.dispatcher ||
                ((a.disabled = !1),
                (a.dispatcher = function (e) {
                  if (!a.disabled) {
                    e = l.exports.fixEvent(e);
                    var t = a.handlers[e.type];
                    if (t)
                      for (
                        var r = t.slice(0), o = 0, n = r.length;
                        o < n && !e.isImmediatePropagationStopped();
                        o++
                      )
                        r[o].call(i, e);
                  }
                })),
              1 == a.handlers[e].length &&
                (i.addEventListener
                  ? i.addEventListener(e, a.dispatcher, !1)
                  : i.attachEvent && i.attachEvent("on" + e, a.dispatcher));
          }
        }),
          (l.exports.off = function (t, e, r) {
            if (t && u.hasData(t)) {
              var o = u.getData(t);
              if (o.handlers) {
                if (c.isArray(e)) return d(l.exports.off, t, e, r);
                function n(e) {
                  (o.handlers[e] = []), l.exports.cleanUpEvents(t, e);
                }
                if (e) {
                  var i = o.handlers[e];
                  if (i)
                    if (r) {
                      if (r.guid)
                        for (var a = 0; a < i.length; a++)
                          i[a].guid === r.guid && i.splice(a--, 1);
                      l.exports.cleanUpEvents(t, e);
                    } else n(e);
                } else for (var s in o.handlers) n(s);
              }
            }
          }),
          (l.exports.cleanUpEvents = function (e, t) {
            var r = u.getData(e);
            0 === r.handlers[t].length &&
              (delete r.handlers[t],
              e.removeEventListener
                ? e.removeEventListener(t, r.dispatcher, !1)
                : e.detachEvent && e.detachEvent("on" + t, r.dispatcher)),
              c.isEmpty(r.handlers) &&
                (delete r.handlers, delete r.dispatcher, delete r.disabled),
              c.isEmpty(r) && u.removeData(e);
          }),
          (l.exports.fixEvent = function (e) {
            function t() {
              return !0;
            }
            function r() {
              return !1;
            }
            if (!e || !e.isPropagationStopped) {
              var o,
                n,
                i,
                a = e || window.event;
              for (o in ((e = {}), a))
                "layerX" !== o &&
                  "layerY" !== o &&
                  "keyboardEvent.keyLocation" !== o &&
                  (("returnValue" == o && a.preventDefault) || (e[o] = a[o]));
              e.target || (e.target = e.srcElement || document),
                (e.relatedTarget =
                  e.fromElement === e.target ? e.toElement : e.fromElement),
                (e.preventDefault = function () {
                  a.preventDefault && a.preventDefault(),
                    (e.returnValue = !1),
                    (e.isDefaultPrevented = t),
                    (e.defaultPrevented = !0);
                }),
                (e.isDefaultPrevented = r),
                (e.defaultPrevented = !1),
                (e.stopPropagation = function () {
                  a.stopPropagation && a.stopPropagation(),
                    (e.cancelBubble = !0),
                    (e.isPropagationStopped = t);
                }),
                (e.isPropagationStopped = r),
                (e.stopImmediatePropagation = function () {
                  a.stopImmediatePropagation && a.stopImmediatePropagation(),
                    (e.isImmediatePropagationStopped = t),
                    e.stopPropagation();
                }),
                (e.isImmediatePropagationStopped = r),
                null != e.clientX &&
                  ((n = document.documentElement),
                  (i = document.body),
                  (e.pageX =
                    e.clientX +
                    ((n && n.scrollLeft) || (i && i.scrollLeft) || 0) -
                    ((n && n.clientLeft) || (i && i.clientLeft) || 0)),
                  (e.pageY =
                    e.clientY +
                    ((n && n.scrollTop) || (i && i.scrollTop) || 0) -
                    ((n && n.clientTop) || (i && i.clientTop) || 0))),
                (e.which = e.charCode || e.keyCode),
                null != e.button &&
                  (e.button =
                    1 & e.button ? 0 : 4 & e.button ? 1 : 2 & e.button ? 2 : 0);
            }
            return e;
          }),
          (l.exports.trigger = function (e, t) {
            if (e) {
              var r,
                o = u.hasData(e) ? u.getData(e) : {},
                n = e.parentNode || e.ownerDocument;
              return (
                "string" == typeof t &&
                  ((r = null),
                  (!e.paramData && 0 != e.paramData) ||
                    ((r = e.paramData),
                    (e.paramData = null),
                    e.removeAttribute(r)),
                  (t = { type: t, target: e, paramData: r })),
                (t = l.exports.fixEvent(t)),
                o.dispatcher && o.dispatcher.call(e, t),
                n && !t.isPropagationStopped() && !1 !== t.bubbles
                  ? l.exports.trigger(n, t)
                  : n ||
                    t.defaultPrevented ||
                    ((n = u.getData(t.target)),
                    t.target[t.type] &&
                      ((n.disabled = !0),
                      "function" == typeof t.target[t.type] &&
                        t.target[t.type](),
                      (n.disabled = !1))),
                !t.defaultPrevented
              );
            }
          }),
          (l.exports.one = function (e, t, r) {
            if (e) {
              if (c.isArray(t)) return d(l.exports.one, e, t, r);
              function o() {
                l.exports.off(e, t, o), r.apply(this, arguments);
              }
              (o.guid = r.guid = r.guid || u.guid()), l.exports.on(e, t, o);
            }
          });
      },
      { "./data": 19, "./fastclick": 22, "./object": 26, "./ua": 30 },
    ],
    22: [
      function (e, t, r) {
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
              var r = [
                  "onMouse",
                  "onClick",
                  "onTouchStart",
                  "onTouchMove",
                  "onTouchEnd",
                  "onTouchCancel",
                ],
                o = 0,
                i = r.length;
              o < i;
              o++
            )
              this[r[o]] = (function (e, t) {
                return function () {
                  return e.apply(t, arguments);
                };
              })(this[r[o]], this);
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
                ((n.removeEventListener = function (e, t, r) {
                  var o = Node.prototype.removeEventListener;
                  "click" === e
                    ? o.call(n, e, t.hijacked || t, r)
                    : o.call(n, e, t, r);
                }),
                (n.addEventListener = function (e, t, r) {
                  var o = Node.prototype.addEventListener;
                  "click" === e
                    ? o.call(
                        n,
                        e,
                        t.hijacked ||
                          (t.hijacked = function (e) {
                            e.propagationStopped || t(e);
                          }),
                        r
                      )
                    : o.call(n, e, t, r);
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
        var o = 0 <= navigator.userAgent.indexOf("Windows Phone"),
          s = 0 < navigator.userAgent.indexOf("Android") && !o,
          l = /iP(ad|hone|od)/.test(navigator.userAgent) && !o,
          c = l && /OS 4_\d(_\d)?/.test(navigator.userAgent),
          u = l && /OS [6-7]_\d/.test(navigator.userAgent),
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
            var r;
            document.activeElement &&
              document.activeElement !== e &&
              document.activeElement.blur(),
              (r = t.changedTouches[0]),
              (t = document.createEvent("MouseEvents")).initMouseEvent(
                this.determineEventType(e),
                !0,
                !0,
                window,
                1,
                r.screenX,
                r.screenY,
                r.clientX,
                r.clientY,
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
              r = e.fastClickScrollParent;
            if (!r || !r.contains(e)) {
              t = e;
              do {
                if (t.scrollHeight > t.offsetHeight) {
                  (r = t), (e.fastClickScrollParent = t);
                  break;
                }
              } while ((t = t.parentElement));
            }
            r && (r.fastClickLastScrollTop = r.scrollTop);
          }),
          (a.prototype.getTargetElementFromEventTarget = function (e) {
            return e.nodeType === Node.TEXT_NODE ? e.parentNode : e;
          }),
          (a.prototype.onTouchStart = function (e) {
            var t, r, o;
            if (1 < e.targetTouches.length) return !0;
            if (
              ((t = this.getTargetElementFromEventTarget(e.target)),
              (r = e.targetTouches[0]),
              l)
            ) {
              if ((o = window.getSelection()).rangeCount && !o.isCollapsed)
                return !0;
              if (!c) {
                if (r.identifier && r.identifier === this.lastTouchIdentifier)
                  return e.preventDefault(), !1;
                (this.lastTouchIdentifier = r.identifier),
                  this.updateScrollParent(t);
              }
            }
            return (
              (this.trackingClick = !0),
              (this.trackingClickStart = e.timeStamp),
              (this.targetElement = t),
              (this.touchStartX = r.pageX),
              (this.touchStartY = r.pageY),
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
              r,
              o,
              n,
              i = this.targetElement;
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
              u &&
                ((n = e.changedTouches[0]),
                ((i =
                  document.elementFromPoint(
                    n.pageX - window.pageXOffset,
                    n.pageY - window.pageYOffset
                  ) || i).fastClickScrollParent =
                  this.targetElement.fastClickScrollParent)),
              "label" === (r = i.tagName.toLowerCase()))
            ) {
              if ((n = this.findControl(i))) {
                if ((this.focus(i), s)) return !1;
                i = n;
              }
            } else if (this.needsFocus(i))
              return (
                100 < e.timeStamp - t ||
                (l && window.top !== window && "input" === r)
                  ? (this.targetElement = null)
                  : (this.focus(i),
                    this.sendClick(i, e),
                    (l && "select" === r) ||
                      ((this.targetElement = null), e.preventDefault())),
                !1
              );
            return (
              !(
                !l ||
                c ||
                !(o = i.fastClickScrollParent) ||
                o.fastClickLastScrollTop === o.scrollTop
              ) ||
              (this.needsClick(i) || (e.preventDefault(), this.sendClick(i, e)),
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
            var t, r, o;
            if (void 0 === window.ontouchstart) return !0;
            if (
              (r = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1])
            ) {
              if (!s) return !0;
              if ((t = document.querySelector("meta[name=viewport]"))) {
                if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
                if (
                  31 < r &&
                  document.documentElement.scrollWidth <= window.outerWidth
                )
                  return !0;
              }
            }
            if (
              n &&
              10 <=
                (o = navigator.userAgent.match(
                  /Version\/([0-9]*)\.([0-9]*)/
                ))[1] &&
              3 <= o[2] &&
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
    23: [
      function (e, t, r) {
        var n = e("./data");
        t.exports.bind = function (e, t, r) {
          t.guid || (t.guid = n.guid());
          function o() {
            return t.apply(e, arguments);
          }
          return (o.guid = r ? r + "_" + t.guid : t.guid), o;
        };
      },
      { "./data": 19 },
    ],
    24: [
      function (e, s, t) {
        var h = e("./url");
        (s.exports.get = function (e, t, r, o, n) {
          s.exports.ajax("GET", e, {}, t, r, o, n);
        }),
          (s.exports.post = function (e, t, r, o, n, i) {
            var a = {
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
              Accept: "application/json",
            };
            s.exports.ajax("POST", e, t, r, o, n, i, a);
          }),
          (s.exports.postWithHeader = function (e, t, r, o, n) {
            s.exports.ajax("POST", e, t, o, n, !0, !1, r);
          }),
          (s.exports.ajax = function (e, t, r, o, n, i, a, s) {
            var l, c, u, d;
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
              (c = new XMLHttpRequest()),
              (u = h.parseUrl(t)),
              (d = window.location),
              !(u.protocol + u.host !== d.protocol + d.host) ||
              !window.XDomainRequest ||
              "withCredentials" in c
                ? ((l = "file:" == u.protocol || "file:" == d.protocol),
                  (c.onreadystatechange = function () {
                    4 === c.readyState &&
                      (200 === c.status || (l && 0 === c.status) ? o : n)(
                        c.responseText
                      );
                  }))
                : (((c = new window.XDomainRequest()).onload = function () {
                    o(c.responseText);
                  }),
                  (c.onerror = n),
                  (c.onprogress = function () {}),
                  (c.ontimeout = n));
            try {
              if (
                (void 0 === i && (i = !0),
                c.open(e, t, i),
                a && (c.withCredentials = !0),
                s)
              )
                for (var p in s)
                  s.hasOwnProperty(p) && c.setRequestHeader(p, s[p]);
            } catch (e) {
              return void n(e);
            }
            try {
              c.send(r);
            } catch (e) {
              n(e);
            }
          }),
          (s.exports.jsonp = function (e, t, r) {
            var o = "jsonp_callback_" + Math.round(1e5 * Math.random()),
              n = document.createElement("script");
            e &&
              ((n.src =
                e +
                (0 <= e.indexOf("?") ? "&" : "?") +
                "callback=" +
                o +
                "&cb=" +
                o),
              (n.onerror = function () {
                delete window[o], document.body.removeChild(n), r();
              }),
              (n.onload = function () {
                setTimeout(function () {
                  window[o] && (delete window[o], document.body.removeChild(n));
                }, 0);
              }),
              (window[o] = function (e) {
                delete window[o], document.body.removeChild(n), t(e);
              }),
              document.body.appendChild(n));
          }),
          (s.exports.loadJS = function (e, t) {
            var r = document.getElementsByTagName("HEAD").item(0),
              o = document.createElement("script");
            e &&
              e.toLowerCase().indexOf("https://") < 0 &&
              e.toLowerCase().indexOf("http://") < 0 &&
              (e = document.URL.replace(/(\/[^\/]*?)$/i, "") + e),
              (o.type = "text/javascript"),
              (o.src = e),
              (o.onload = function () {
                t && t();
              }),
              r.appendChild(o);
          });
      },
      { "./url": 31 },
    ],
    25: [
      function (e, t, r) {
        var a = e("./dom");
        t.exports.render = function (e, t) {
          var r = t.align || (t.className ? "" : "tl"),
            o = t.x || 0,
            n = t.y || 0,
            i = o.indexOf && 0 < o.indexOf("%") ? "" : "px",
            t = n.indexOf && 0 < n.indexOf("%") ? "" : "px";
          "tl" === r
            ? a.css(e, {
                float: "left",
                "margin-left": o + i,
                "margin-top": n + t,
              })
            : "tr" === r
            ? a.css(e, {
                float: "right",
                "margin-right": o + i,
                "margin-top": n + t,
              })
            : "tlabs" === r
            ? a.css(e, { position: "absolute", left: o + i, top: n + t })
            : "trabs" === r
            ? a.css(e, { position: "absolute", right: o + i, top: n + t })
            : "blabs" === r
            ? a.css(e, { position: "absolute", left: o + i, bottom: n + t })
            : "brabs" === r
            ? a.css(e, { position: "absolute", right: o + i, bottom: n + t })
            : "cc" === r && a.addClass(e, "loading-center");
        };
      },
      { "./dom": 20 },
    ],
    26: [
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
          (a.exports.each = function (e, t, r) {
            if (a.exports.isArray(e))
              for (
                var o = 0, n = e.length;
                o < n && !1 !== t.call(r || this, e[o], o);
                ++o
              );
            else
              for (var i in e)
                if (s.call(e, i) && !1 === t.call(r || this, i, e[i])) break;
            return e;
          }),
          (a.exports.merge = function (e, t) {
            if (!t) return e;
            for (var r in t) s.call(t, r) && (e[r] = t[r]);
            return e;
          }),
          (a.exports.deepMerge = function (e, t) {
            var r, o, n;
            for (r in ((e = a.exports.copy(e)), t))
              s.call(t, r) &&
                ((o = e[r]),
                (n = t[r]),
                a.exports.isPlain(o) && a.exports.isPlain(n)
                  ? (e[r] = a.exports.deepMerge(o, n))
                  : (e[r] = t[r]));
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
    27: [
      function (e, t, r) {
        var n = e("./object"),
          i = function () {};
        ((i = function () {}).extend = function (e) {
          var t,
            r,
            o =
              (e = e || {}).init ||
              e.init ||
              this.prototype.init ||
              this.prototype.init ||
              function () {};
          for (r in (((((t = function () {
            o.apply(this, arguments);
          }).prototype = n.create(this.prototype)).constructor = t).extend =
            i.extend),
          (t.create = i.create),
          e))
            e.hasOwnProperty(r) && (t.prototype[r] = e[r]);
          return t;
        }),
          (i.create = function () {
            var e = n.create(this.prototype);
            return this.apply(e, arguments), e;
          }),
          (t.exports = i);
      },
      { "./object": 26 },
    ],
    28: [
      function (e, f, t) {
        var m = e("./object"),
          r = e("../config"),
          o = e("./dom"),
          n = e("./cookie"),
          i = e("./constants"),
          a = e("../lang/index"),
          s = e("./ua"),
          y = e("../player/base/plugin/defaultemptycomponent"),
          _ = {
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
              r.domain +
              "/de/prismplayer-flash/" +
              r.flashVersion +
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
            for (var r = 0, o = e.length; r < o; r++) {
              var n = e[r].name;
              if (n == t) return !0;
              if ("controlBar" == n)
                return f.exports.hasUIComponent(e[r].children, t);
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
                  ? (0 === t.indexOf("#") && (t = t.slice(1)), o.el(t))
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
            var r = t;
            if (!r && !(r = n.get(i.SelectedStreamLevel)))
              return n.set(i.SelectedStreamLevel, e[0].definition, 365), 0;
            for (var o = 0; o < e.length; o++)
              if (e[o].definition == r) return o;
            return 0;
          }),
          (f.exports.handleOption = function (e, t) {
            f.exports.isRts(e.source) && (e.isLive = !0);
            var r,
              o = m.merge(m.copy(_), e),
              n = [
                { name: "fullScreenButton", align: "tr", x: 20, y: 12 },
                { name: "subtitle", align: "tr", x: 15, y: 12 },
                { name: "setting", align: "tr", x: 15, y: 12 },
                { name: "volume", align: "tr", x: 5, y: 10 },
              ],
              i = !1;
            if (
              (e.useFlashPrism || f.exports.isRTMP(e.source)
                ? ((i = !0),
                  (n = [
                    { name: "liveIco", align: "tlabs", x: 15, y: 25 },
                    { name: "fullScreenButton", align: "tr", x: 10, y: 25 },
                    { name: "volume", align: "tr", x: 10, y: 25 },
                  ]))
                : (r = f.exports.isLiveShift(o))
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
                o.skinLayout = [
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
                o.skinLayout = [
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
                  var a = e.skinLayout.length, s = [], l = -1, c = 0;
                  c < a;
                  c++
                )
                  if ("controlBar" == o.skinLayout[c].name) {
                    for (
                      var l = c, u = o.skinLayout[c].children.length, d = 0;
                      d < u;
                      d++
                    ) {
                      var p,
                        h = o.skinLayout[c].children[d].name;
                      ("liveDisplay" != h &&
                        "liveIco" != h &&
                        "fullScreenButton" != h &&
                        "volume" != h &&
                        "snapshot" != h &&
                        "setting" != h &&
                        "subtitle" != h &&
                        (!r ||
                          ("progress" != h &&
                            "playButton" != h &&
                            "timeDisplay" != h))) ||
                        ((p = o.skinLayout[c].children[d]),
                        "progress" == h
                          ? (p.name = "liveShiftProgress")
                          : "timeDisplay" == h
                          ? (p.name = "liveShiftTimeDisplay")
                          : i && "liveDisplay" == h && (p.name = "liveIco"),
                        s.push(p));
                    }
                    break;
                  }
                -1 != l && (o.skinLayout[l].children = s);
              }
            return (
              (void 0 === e.components ||
                !e.components ||
                (m.isArray(e.components) && 0 == e.components.length)) &&
                "false" != e.components &&
                (o.components = [y]),
              o
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
        "../config": 9,
        "../lang/index": 15,
        "../player/base/plugin/defaultemptycomponent": 34,
        "./constants": 17,
        "./cookie": 18,
        "./dom": 20,
        "./object": 26,
        "./ua": 30,
      },
    ],
    29: [
      function (e, t, r) {
        (t.exports.set = function (t, r) {
          try {
            window.localStorage && localStorage.setItem(t, r);
          } catch (e) {
            window[t + "_localStorage"] = r;
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
    30: [
      function (e, E, t) {
        var r, o;
        if (
          ((E.exports.USER_AGENT = navigator.userAgent),
          (E.exports.IS_IPHONE = /iPhone/i.test(E.exports.USER_AGENT)),
          (E.exports.IS_IPAD = /iPad/i.test(E.exports.USER_AGENT)),
          (E.exports.IS_IPOD = /iPod/i.test(E.exports.USER_AGENT)),
          (E.exports.IS_MAC = /mac/i.test(E.exports.USER_AGENT)),
          (E.exports.IS_EDGE = /Edge/i.test(E.exports.USER_AGENT)),
          (E.exports.IS_IE11 = /Trident\/7.0/i.test(E.exports.USER_AGENT)),
          (E.exports.IS_X5 = /qqbrowser/i.test(
            E.exports.USER_AGENT.toLowerCase()
          )),
          (E.exports.IS_CHROME =
            /Chrome/i.test(E.exports.USER_AGENT) &&
            !E.exports.IS_EDGE &&
            !E.exports.IS_X5),
          (E.exports.IS_SAFARI =
            /Safari/i.test(E.exports.USER_AGENT) && !E.exports.IS_CHROME),
          (E.exports.IS_FIREFOX = /Firefox/i.test(E.exports.USER_AGENT)),
          (E.exports.IS_UC = /ucweb|UCBrowser/i.test(E.exports.USER_AGENT)),
          document.all)
        )
          try {
            var n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            E.exports.HAS_FLASH = !!n;
          } catch (e) {
            E.exports.HAS_FLASH = !1;
          }
        else
          navigator.plugins && 0 < navigator.plugins.length
            ? ((n = navigator.plugins["Shockwave Flash"]),
              (E.exports.HAS_FLASH = !!n))
            : (E.exports.HAS_FLASH = !1);
        (E.exports.IS_MAC_SAFARI =
          E.exports.IS_MAC &&
          E.exports.IS_SAFARI &&
          !E.exports.IS_CHROME &&
          !E.exports.HAS_FLASH),
          (E.exports.IS_IOS =
            E.exports.IS_IPHONE || E.exports.IS_IPAD || E.exports.IS_IPOD),
          (E.exports.IOS_VERSION = (function () {
            var e = E.exports.USER_AGENT.match(/OS (\d+)_/i);
            if (e && e[1]) return e[1];
          })()),
          (E.exports.IS_ANDROID = /Android/i.test(E.exports.USER_AGENT)),
          (E.exports.ANDROID_VERSION = (r = E.exports.USER_AGENT.match(
            /Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i
          ))
            ? ((o = r[1] && parseFloat(r[1])),
              (n = r[2] && parseFloat(r[2])),
              o && n ? parseFloat(r[1] + "." + r[2]) : o || null)
            : null),
          (E.exports.IS_OLD_ANDROID =
            E.exports.IS_ANDROID &&
            /webkit/i.test(E.exports.USER_AGENT) &&
            E.exports.ANDROID_VERSION < 2.3),
          (E.exports.TOUCH_ENABLED = !!(
            "ontouchstart" in window ||
            (window.DocumentTouch && document instanceof window.DocumentTouch)
          )),
          (E.exports.IS_MOBILE = E.exports.IS_IOS || E.exports.IS_ANDROID),
          (E.exports.IS_H5 = E.exports.IS_MOBILE || !E.exports.HAS_FLASH),
          (E.exports.IS_PC = !E.exports.IS_MOBILE),
          (E.exports.is_X5 =
            /micromessenger/i.test(E.exports.USER_AGENT) ||
            /qqbrowser/i.test(E.exports.USER_AGENT)),
          (E.exports.IS_ANDROID_FIREFOX =
            E.exports.IS_ANDROID && E.exports.IS_FIREFOX),
          (E.exports.CHROME_VERSION =
            E.exports.IS_CHROME &&
            E.exports.USER_AGENT.match(/Chrome\/(\d+)/i)[1]),
          (E.exports.getHost = function (e) {
            var t = "";
            if (void 0 === e || null == e || "" == e) return "";
            var r = e.indexOf("//"),
              o = e,
              t = (o = -1 < r ? e.substring(r + 2) : o),
              o = o.split("/");
            return (t =
              (o = (t = o && 0 < o.length ? o[0] : t).split(":")) &&
              0 < o.length
                ? o[0]
                : t);
          }),
          (E.exports.dingTalk = function () {
            var e = E.exports.USER_AGENT.toLowerCase();
            return /dingtalk/i.test(e);
          }),
          (E.exports.wechat = function () {
            var e = E.exports.USER_AGENT.toLowerCase();
            return /micromessenger/i.test(e);
          }),
          (E.exports.inIFrame = function () {
            return self != top;
          }),
          (E.exports.getReferer = function () {
            var t = document.referrer;
            if (E.exports.inIFrame())
              try {
                t = top.document.referrer;
              } catch (e) {
                t = document.referrer;
              }
            return t;
          }),
          (E.exports.getHref = function () {
            location.href;
            if (E.exports.inIFrame())
              try {
                top.location.href;
              } catch (e) {
                location.href;
              }
            return location.href;
          }),
          (o = E.exports),
          function (e, t) {
            var r = (this.os = {}),
              o = (this.browser = {}),
              n = e.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
              i = e.match(/(Android);?[\s\/]+([\d.]+)?/),
              a = !!e.match(/\(Macintosh\; Intel /),
              s = e.match(/(iPad).*OS\s([\d_]+)/),
              l = e.match(/(iPod)(.*OS\s([\d_]+))?/),
              c = !s && e.match(/(iPhone\sOS)\s([\d_]+)/),
              u = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
              d = /Win\d{2}|Windows/.test(t),
              p = e.match(/Windows Phone ([\d.]+)/),
              h = u && e.match(/TouchPad/),
              f = e.match(/Kindle\/([\d.]+)/),
              m = e.match(/Silk\/([\d._]+)/),
              y = e.match(/(BlackBerry).*Version\/([\d.]+)/),
              _ = e.match(/(BB10).*Version\/([\d.]+)/),
              g = e.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
              v = e.match(/PlayBook/),
              x = e.match(/Chrome\/([\d.]+)/) || e.match(/CriOS\/([\d.]+)/),
              S = e.match(/Firefox\/([\d.]+)/),
              T = e.match(
                /\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/
              ),
              w =
                e.match(/MSIE\s([\d.]+)/) ||
                e.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
              b = !x && e.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
              t =
                b ||
                e.match(
                  /Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/
                );
            (o.webkit = !!n) && (o.version = n[1]),
              i && ((r.android = !0), (r.version = i[2])),
              c &&
                !l &&
                ((r.ios = r.iphone = !0),
                (r.version = c[2].replace(/_/g, "."))),
              s &&
                ((r.ios = r.ipad = !0), (r.version = s[2].replace(/_/g, "."))),
              l &&
                ((r.ios = r.ipod = !0),
                (r.version = l[3] ? l[3].replace(/_/g, ".") : null)),
              p && ((r.wp = !0), (r.version = p[1])),
              u && ((r.webos = !0), (r.version = u[2])),
              h && (r.touchpad = !0),
              y && ((r.blackberry = !0), (r.version = y[2])),
              _ && ((r.bb10 = !0), (r.version = _[2])),
              g && ((r.rimtabletos = !0), (r.version = g[2])),
              v && (o.playbook = !0),
              f && ((r.kindle = !0), (r.version = f[1])),
              m && ((o.silk = !0), (o.version = m[1])),
              !m && r.android && e.match(/Kindle Fire/) && (o.silk = !0),
              x && ((o.chrome = !0), (o.version = x[1])),
              S && ((o.firefox = !0), (o.version = S[1])),
              T && ((r.firefoxos = !0), (r.version = T[1])),
              w && ((o.ie = !0), (o.version = w[1])),
              t &&
                (a || r.ios || d || i) &&
                ((o.safari = !0), r.ios || (o.version = t[1])),
              b && (o.webview = !0),
              !a ||
                ((b = e.match(/[\d]*_[\d]*_[\d]*/)) &&
                  0 < b.length &&
                  b[0] &&
                  (r.version = b[0].replace(/_/g, "."))),
              (r.tablet = !!(
                s ||
                v ||
                (i && !e.match(/Mobile/)) ||
                (S && e.match(/Tablet/)) ||
                (w && !e.match(/Phone/) && e.match(/Touch/))
              )),
              (r.phone = !(
                r.tablet ||
                r.ipod ||
                !(
                  i ||
                  c ||
                  u ||
                  y ||
                  _ ||
                  (x && e.match(/Android/)) ||
                  (x && e.match(/CriOS\/([\d.]+)/)) ||
                  (S && e.match(/Mobile/)) ||
                  (w && e.match(/Touch/))
                )
              )),
              (r.pc = !r.tablet && !r.phone),
              a
                ? (r.name = "macOS")
                : d
                ? ((r.name = "windows"),
                  (r.version = (function () {
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
                : (r.name = (function () {
                    var e = navigator.userAgent,
                      t = "other",
                      r = E.exports.os;
                    if (r.ios) return "iOS";
                    if (r.android) return "android";
                    if (-1 < e.indexOf("Baiduspider")) return "Baiduspider";
                    if (-1 < e.indexOf("PlayStation")) return "PS4";
                    (r =
                      "Win32" == navigator.platform ||
                      "Windows" == navigator.platform ||
                      -1 < e.indexOf("Windows")),
                      (e =
                        "Mac68K" == navigator.platform ||
                        "MacPPC" == navigator.platform ||
                        "Macintosh" == navigator.platform ||
                        "MacIntel" == navigator.platform);
                    e && (t = "macOS");
                    "X11" != navigator.platform || r || e || (t = "Unix");
                    -1 < String(navigator.platform).indexOf("Linux") &&
                      (t = "Linux");
                    if (r) return "windows";
                    return t;
                  })()),
              (o.name =
                ((r = navigator.userAgent.toLowerCase()),
                (o = E.exports.browser).firefox
                  ? "Firefox"
                  : o.ie
                  ? /edge/.test(r)
                    ? "Edge"
                    : "IE"
                  : /micromessenger/.test(r)
                  ? "\u5fae\u4fe1\u5185\u7f6e\u6d4f\u89c8\u5668"
                  : /qqbrowser/.test(r)
                  ? "QQ\u6d4f\u89c8\u5668"
                  : o.webview
                  ? "webview"
                  : o.chrome
                  ? "Chrome"
                  : o.safari
                  ? "Safari"
                  : /baiduspider/.test(r)
                  ? "Baiduspider"
                  : /ucweb/.test(r) || /UCBrowser/.test(r)
                  ? "UC"
                  : /opera/.test(r)
                  ? "Opera"
                  : /ucweb/.test(r)
                  ? "UC"
                  : /360se/.test(r)
                  ? "360\u6d4f\u89c8\u5668"
                  : /bidubrowser/.test(r)
                  ? "\u767e\u5ea6\u6d4f\u89c8\u5668"
                  : /metasr/.test(r)
                  ? "\u641c\u72d7\u6d4f\u89c8\u5668"
                  : /lbbrowser/.test(r)
                  ? "\u730e\u8c79\u6d4f\u89c8\u5668"
                  : /playstation/.test(r)
                  ? "PS4\u6d4f\u89c8\u5668"
                  : void 0));
          }.call(o, navigator.userAgent, navigator.platform);
      },
      {},
    ],
    31: [
      function (e, t, r) {
        var s = e("./dom");
        (t.exports.getAbsoluteURL = function (e) {
          return (e = !e.match(/^https?:\/\//)
            ? s.createEl("div", { innerHTML: '<a href="' + e + '">x</a>' })
                .firstChild.href
            : e);
        }),
          (t.exports.parseUrl = function (e) {
            var t,
              r = [
                "protocol",
                "hostname",
                "port",
                "pathname",
                "search",
                "hash",
                "host",
              ],
              o = s.createEl("a", { href: e }),
              n = "" === o.host && "file:" !== o.protocol;
            n &&
              (((t = s.createEl("div")).innerHTML = '<a href="' + e + '"></a>'),
              (o = t.firstChild),
              t.setAttribute("style", "display:none; position:absolute;"),
              document.body.appendChild(t));
            for (var i = {}, a = 0; a < r.length; a++) i[r[a]] = o[r[a]];
            return (
              (i.segments = o.pathname.replace(/^\//, "").split("/")),
              n && document.body.removeChild(t),
              i
            );
          });
      },
      { "./dom": 20 },
    ],
    32: [
      function (e, r, t) {
        var o = e("./dom"),
          n = e("./ua"),
          i = e("./playerutil");
        (r.exports.formatTime = function (e) {
          var t = Math.floor(e),
            r = Math.floor(t / 3600);
          return (
            (t %= 3600),
            (e = Math.floor(t / 60)),
            (t = t % 60),
            !(
              r === 1 / 0 ||
              isNaN(r) ||
              e === 1 / 0 ||
              isNaN(e) ||
              t === 1 / 0 ||
              isNaN(t)
            ) &&
              ("00" === (r = 10 <= r ? r : "0" + r) ? "" : r + ":") +
                (e = 10 <= e ? e : "0" + e) +
                ":" +
                (t = 10 <= t ? t : "0" + t)
          );
        }),
          (r.exports.extractTime = function (e) {
            if (e) {
              var t = parseInt(e.getHours()),
                r = parseInt(e.getMinutes()),
                e = parseInt(e.getSeconds());
              return (
                ("00" === (t = 10 <= t ? t : "0" + t) ? "" : t + ":") +
                (r = 10 <= r ? r : "0" + r) +
                ":" +
                (e = 10 <= e ? e : "0" + e)
              );
            }
            return "";
          }),
          (r.exports.convertToTimestamp = function (e, t) {
            var r = "";
            return (
              e && (t ? (r = e.gettime()) : ((r = Date.parse(e)), (r /= 1e3))),
              r
            );
          }),
          (r.exports.convertToDate = function (e, t) {
            var r = "";
            return e && (r = new Date()).setTime(1e3 * e), r;
          }),
          (r.exports.parseTime = function (e) {
            if (!e) return "00:00:00";
            var t = e.split(":"),
              r = 0,
              o = 0,
              e = 0;
            return (
              3 === t.length
                ? ((r = t[0]), (o = t[1]), (e = t[2]))
                : 2 === t.length
                ? ((o = t[0]), (e = t[1]))
                : 1 === t.length && (e = t[0]),
              3600 * (r = parseInt(r, 10)) +
                60 * (o = parseInt(o, 10)) +
                (e = Math.ceil(parseFloat(e)))
            );
          }),
          (r.exports.formatDate = function (e, t) {
            var r,
              o = {
                "M+": e.getMonth() + 1,
                "d+": e.getDate(),
                "H+": e.getHours(),
                "m+": e.getMinutes(),
                "s+": e.getSeconds(),
                "q+": Math.floor((e.getMonth() + 3) / 3),
                S: e.getMilliseconds(),
              };
            for (r in (/(y+)/.test(t) &&
              (t = t.replace(
                RegExp.$1,
                (e.getFullYear() + "").substr(4 - RegExp.$1.length)
              )),
            o))
              new RegExp("(" + r + ")").test(t) &&
                (t = t.replace(
                  RegExp.$1,
                  1 == RegExp.$1.length
                    ? o[r]
                    : ("00" + o[r]).substr(("" + o[r]).length)
                ));
            return t;
          }),
          (r.exports.sleep = function (e) {
            for (var t = Date.now(); Date.now() - t <= e; );
          }),
          (r.exports.htmlEncodeAll = function (e) {
            return null == e
              ? ""
              : e
                  .replace(/\</g, "&lt;")
                  .replace(/\>/g, "&gt;")
                  .replace(/\&/g, "&amp;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&apos;");
          }),
          (r.exports.toBinary = function (e) {
            if (!window.atob) return "";
            for (
              var t = atob(e), r = t.length, o = new Uint8Array(r), n = 0;
              n < r;
              n++
            )
              o[n] = t.charCodeAt(n);
            return o;
          }),
          (r.exports.readyBinary = function (e) {
            for (
              var t = new Uint8Array(e), r = t.length, o = "", n = 0;
              n < r;
              n++
            )
              o += t[n];
            return o;
          }),
          (r.exports.delayHide = function (e, t) {
            e &&
              (void 0 === t && (t = 1e3),
              e.delayHanlder && clearTimeout(e.delayHanlder),
              (e.delayHanlder = setTimeout(function () {
                o.css(e, "display", "none");
              }, t)));
          }),
          (r.exports.openInFile = function () {
            return -1 != window.location.protocol.toLowerCase().indexOf("file");
          }),
          (r.exports.contentProtocolMixed = function (e) {
            return !!(
              n.os.pc &&
              ((i.isHls(e) && !n.browser.safari) || i.isFlv(e)) &&
              "https:" == window.location.protocol.toLowerCase() &&
              e &&
              -1 < e.toLowerCase().indexOf("http://")
            );
          }),
          (r.exports.queryString = function (e) {
            var t, r, o;
            return 2 !== (e = (e = decodeURIComponent(e)).split("?")).length
              ? {}
              : ((e = e[1]),
                (t = e.split("&"))
                  ? ((r = {}),
                    (o = 0),
                    $(t).each(function () {
                      var e = t[o].split("=");
                      2 === e.length && (r[e[0]] = e[1].replace(/\+/g, " ")),
                        o++;
                    }),
                    r)
                  : {});
          }),
          (r.exports.log = function (e) {
            var t = window.location.href,
              t = r.exports.queryString(t);
            t && 1 == t.debug && console.log(e);
          });
      },
      { "./dom": 20, "./playerutil": 28, "./ua": 30 },
    ],
    33: [
      function (e, t, r) {
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
    34: [
      function (e, t, r) {
        e = e("../../../lib/oo").extend({});
        t.exports = e;
      },
      { "../../../lib/oo": 27 },
    ],
    35: [
      function (e, t, r) {
        var o = e("../../ui/component"),
          n = e("../../lib/data"),
          i = e("../../lib/ua"),
          a = e("../../lib/constants"),
          s = e("../../lib/dom"),
          l = e("../../lib/object"),
          c = e("../../config"),
          u = e("../../lang/index"),
          d = e("../../lib/playerutil"),
          p = e("../../lib/util"),
          h = e("../../ui/component/info-display"),
          f = e("../../ui/component/error-display"),
          m = e("../../feature/autoPlayDelay"),
          y = e("../../commonui/autostreamselector"),
          _ = e("../base/event/eventtype"),
          g = e("../saas/ststoken"),
          e = o.extend({
            init: function (e, t) {
              var r;
              void 0 === t.skinLayout && (t.skinLayout = d.defaultFlashLayout),
                o.call(this, this, t),
                (this._id = "prism-player-" + n.guid()),
                (this.tag = e),
                (this._el = this.tag),
                (this._childrenUI = [f]),
                this.initChildren(),
                (this.id = this._id),
                (window[this.id] = this),
                u.setCurrentLanguage(
                  this._options.language,
                  "flash",
                  this._options.languageTexts
                ),
                p.openInFile()
                  ? ((e = {
                      mediaId: this._options.vid || "",
                      error_code: a.ErrorCode.FormatNotSupport,
                      error_msg: u.get("Open_Html_By_File", "flash"),
                    }),
                    this.trigger(_.Private.Error_Show, e))
                  : i.IS_MOBILE
                  ? this.trigger(_.Private.Error_Show, {
                      mediaId: this._options.vid || "",
                      error_code: a.ErrorCode.FormatNotSupport,
                      error_msg: u.get("Cant_Use_Flash_On_Mobile", "flash"),
                    })
                  : (this._options.vid &&
                    this._options.accessKeyId &&
                    this._options.securityToken &&
                    this._options.accessKeySecret
                      ? g.getPlayAuth(
                          (r = this)._options,
                          function (e) {
                            (r._options.playauth = e), r._createPlayer();
                          },
                          function (e) {
                            var t = {
                              mediaId: r._options.vid,
                              error_code: e.Code,
                              error_msg: e.Message,
                            };
                            e.sri && (t.sri = e.sri),
                              (t.display_msg = e.display_msg),
                              r.trigger(_.Private.Error_Show, t);
                          },
                          "flash"
                        )
                      : this._createPlayer(),
                    (this._status = "init"));
            },
            _createPlayer: function () {
              var e, t;
              this._options.autoPlayDelay
                ? ((t = new m(this)),
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
                i.HAS_FLASH ||
                  ((t = u.get("Flash_Not_Ready", "flash")),
                  this.trigger(_.Private.Info_Show, {
                    text: t,
                    align: "tc",
                    isBlack: !1,
                  }));
            },
            _initPlayer: function () {
              var e =
                "//" +
                c.domain +
                "/de/prismplayer-flash/" +
                c.flashVersion +
                "/PrismPlayer.swf";
              this._options.playerSwfPath
                ? (e = this._options.playerSwfPath)
                : c.domain
                ? -1 < c.domain.indexOf("localhost") &&
                  (e = "//" + c.domain + "/build/flash//PrismPlayer.swf")
                : (e =
                    "de/prismplayer-flash/" +
                    c.flashVersion +
                    "/PrismPlayer.swf");
              var t = this._comboFlashVars(),
                r = this._options.wmode || "opaque";
              this.tag.innerHTML =
                '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" width="100%" height="100%" id="' +
                this.id +
                '"><param name=movie value="' +
                e +
                '"><param name=quality value=High><param name="FlashVars" value="' +
                t +
                '"><param name="WMode" value="' +
                r +
                '"><param name="AllowScriptAccess" value="always"><param name="AllowFullScreen" value="true"><param name="AllowFullScreenInteractive" value="true"><embed name="' +
                this.id +
                '" src="' +
                e +
                '" quality=high pluginspage="//www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="100%" height="100%" AllowScriptAccess="always" AllowFullScreen="true" AllowFullScreenInteractive="true" WMode="' +
                r +
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
              var e = encodeURIComponent(i.getReferer()),
                t = i.getHref(),
                r = encodeURIComponent(t),
                o = "";
              t && (o = i.getHost(t));
              var t = this._options,
                o = {
                  autoPlay: t.autoplay ? 1 : 0,
                  isInner: 0,
                  actRequest: 1,
                  vid: t.vid,
                  diagnosisButtonVisible: t.diagnosisButtonVisible ? 1 : 0,
                  domain: t.domain || "//tv.taobao.com",
                  statisticService: t.statisticService || c.logReportTo,
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
                    ud: i.getHost(t.source),
                    os: i.os.name,
                    ov: i.os.version || "",
                    et: i.browser.name,
                    ev: i.browser.version || "",
                    uat: i.USER_AGENT,
                    r: e,
                    pu: r,
                    app_n: o,
                  },
                },
                n = [];
              return (
                void 0 !== t.rtmpBufferTime &&
                  (o.rtmpBufferTime = t.rtmpBufferTime),
                t.cover && (o.cover = t.cover),
                t.extraInfo &&
                  (o.extraInfo = encodeURIComponent(
                    JSON.stringify(t.extraInfo)
                  )),
                o.logInfo &&
                  (o.logInfo = encodeURIComponent(JSON.stringify(o.logInfo))),
                (o.languageData = encodeURIComponent(
                  JSON.stringify(u.getLanguageData("flash"))
                )),
                (o.language = u.getCurrentLanguage()),
                l.each(o, function (e, t) {
                  n.push(e + "=" + t);
                }),
                n.join("&")
              );
            },
            initChildren: function () {
              for (var e = this._childrenUI.length, t = 0; t < e; t++) {
                var r = new this._childrenUI[t](this, this._options),
                  o = r.el();
                (o.id = r.id()), this.contentEl().appendChild(o), r.bindEvent();
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
              var r = this;
              window.addEventListener("beforeunload", function () {
                try {
                  r.flashPlayer.setPlayerCloseStatus();
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
                this.trigger(_.Private.AutoStreamHide);
            },
            onEnded: function () {
              this._clearTimeoutHandle(),
                (this._status = "ended"),
                this.trigger("ended");
            },
            onPause: function () {
              (this._status = "pause"),
                this._clearTimeoutHandle(),
                this.trigger(_.Private.AutoStreamHide),
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
                  e.trigger(_.Private.AutoStreamShow);
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
                for (var r = 0; r < e.Urls.length; r++) {
                  var o = e.Urls[r].value,
                    n = o.desc.indexOf("_"),
                    i = u.get(o.definition, "flash");
                  (o.desc = 0 < n ? i + "_" + o.height : i), t.push(o);
                }
              return { Urls: t, index: e.index };
            },
            _getVideoStatus: function () {
              return this._invoke("getVideoStatus");
            },
            _checkVideoStatus: function () {
              var r;
              this.flashPlayer &&
                !this._checkVideoStatusHandler &&
                ((r = this),
                (function t() {
                  r._checkVideoStatusHandler = setTimeout(function () {
                    var e = r._getVideoStatus();
                    "playing" == e.videoStatus && "bufferFull" == e.bufferStatus
                      ? ((r._status = "playing"), r._clearTimeoutHandle())
                      : "videoPlayOver" == e.videoStatus &&
                        ((r._status = "ended"), r._clearTimeoutHandle()),
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
        "../../commonui/autostreamselector": 8,
        "../../config": 9,
        "../../feature/autoPlayDelay": 11,
        "../../lang/index": 15,
        "../../lib/constants": 17,
        "../../lib/data": 19,
        "../../lib/dom": 20,
        "../../lib/object": 26,
        "../../lib/playerutil": 28,
        "../../lib/ua": 30,
        "../../lib/util": 32,
        "../../ui/component": 39,
        "../../ui/component/error-display": 40,
        "../../ui/component/info-display": 41,
        "../base/event/eventtype": 33,
        "../saas/ststoken": 37,
      },
    ],
    36: [
      function (e, u, t) {
        var o = e("crypto-js/hmac-sha1"),
          n = e("crypto-js/enc-base64"),
          r = e("crypto-js/enc-utf8");
        (u.exports.randomUUID = function () {
          for (var e = [], t = "0123456789abcdef", r = 0; r < 36; r++)
            e[r] = t.substr(Math.floor(16 * Math.random()), 1);
          return (
            (e[14] = "4"),
            (e[19] = t.substr((3 & e[19]) | 8, 1)),
            (e[8] = e[13] = e[18] = e[23] = "-"),
            e.join("")
          );
        }),
          (u.exports.returnUTCDate = function () {
            var e = new Date(),
              t = e.getUTCFullYear(),
              r = e.getUTCMonth(),
              o = e.getUTCDate(),
              n = e.getUTCHours(),
              i = e.getUTCMinutes(),
              a = e.getUTCSeconds(),
              e = e.getUTCMilliseconds();
            return Date.UTC(t, r, o, n, i, a, e);
          }),
          (u.exports.AliyunEncodeURI = function (e) {
            e = encodeURIComponent(e);
            return (e = (e = (e = e.replace("+", "%2B")).replace(
              "*",
              "%2A"
            )).replace("%7E", "~"));
          }),
          (u.exports.makesort = function (e, t, r) {
            if (!e)
              throw new Error("PrismPlayer Error: vid should not be null!");
            var o = [];
            for (s in e) o.push(s);
            for (var n = o.sort(), i = "", a = n.length, s = 0; s < a; s++)
              "" == i
                ? (i = n[s] + t + e[n[s]])
                : (i += r + n[s] + t + e[n[s]]);
            return i;
          }),
          (u.exports.makeUTF8sort = function (e, t, r) {
            if (!e)
              throw new Error("PrismPlayer Error: vid should not be null!");
            var o = [];
            for (s in e) o.push(s);
            for (var n = o.sort(), i = "", a = n.length, s = 0; s < a; s++) {
              var l = u.exports.AliyunEncodeURI(n[s]),
                c = u.exports.AliyunEncodeURI(e[n[s]]);
              "" == i ? (i = l + t + c) : (i += r + l + t + c);
            }
            return i;
          }),
          (u.exports.makeChangeSiga = function (e, t, r) {
            if (!e)
              throw new Error("PrismPlayer Error: vid should not be null!");
            return n.stringify(
              o(
                (r = r || "GET") +
                  "&" +
                  u.exports.AliyunEncodeURI("/") +
                  "&" +
                  u.exports.AliyunEncodeURI(
                    u.exports.makeUTF8sort(e, "=", "&")
                  ),
                t + "&"
              )
            );
          }),
          (u.exports.ISODateString = function (e) {
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
          (u.exports.encPlayAuth = function (e) {
            if (!(e = r.stringify(n.parse(e))))
              throw new Error("playuth\u53c2\u6570\u89e3\u6790\u4e3a\u7a7a");
            return JSON.parse(e);
          }),
          (u.exports.encRsa = function () {}),
          (u.exports.stringToArray = function (e) {
            for (
              var t = new ArrayBuffer(2 * e.length),
                r = new Uint16Array(t),
                o = 0,
                n = e.length;
              o < n;
              o++
            )
              r[o] = e.charCodeAt(o);
            return r;
          }),
          (u.exports.Uint8ArrayToString = function (e) {
            for (var t = "", r = 0; r < e.length; r++)
              t += String.fromCharCode(e[r]);
            return t;
          }),
          (u.exports.arrayToString = function (e) {
            e = new Uint16Array(e.buffer);
            return String.fromCharCode.apply(null, e);
          }),
          (u.exports.base64DecodeUint8Array = function (e) {
            var t = window.atob(e),
              r = t.length,
              o = new Uint8Array(new ArrayBuffer(r));
            for (i = 0; i < r; i++) o[i] = t.charCodeAt(i);
            return o;
          }),
          (u.exports.base64EncodeUint8Array = function (e) {
            for (
              var t,
                r,
                o,
                n,
                i,
                a,
                s =
                  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                l = "",
                c = 0;
              c < e.length;

            )
              (o = (a = e[c++]) >> 2),
                (n =
                  ((3 & a) << 4) |
                  ((t = c < e.length ? e[c++] : Number.NaN) >> 4)),
                (i =
                  ((15 & t) << 2) |
                  ((r = c < e.length ? e[c++] : Number.NaN) >> 6)),
                (a = 63 & r),
                isNaN(t) ? (i = a = 64) : isNaN(r) && (a = 64),
                (l += s.charAt(o) + s.charAt(n) + s.charAt(i) + s.charAt(a));
            return l;
          });
      },
      {
        "crypto-js/enc-base64": 2,
        "crypto-js/enc-utf8": 3,
        "crypto-js/hmac-sha1": 4,
      },
    ],
    37: [
      function (e, t, r) {
        var i = e("../../lib/io"),
          a = e("../../lib/constants"),
          s = e("./signature"),
          l = e("./util"),
          c = e("../../lang/index");
        t.exports.getPlayAuth = function (e, t, r, o) {
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
          i.get(
            n,
            function (e) {
              e
                ? ((e = JSON.parse(e)), t && t(e.PlayAuth))
                : r &&
                  r(
                    l.createError(
                      "\u83b7\u53d6\u89c6\u9891\u64ad\u653e\u51ed\u8bc1\u5931\u8d25"
                    )
                  );
            },
            function (e) {
              if (r) {
                var t = { Code: "", Message: c.get("Fetch_Playauth_Error") };
                try {
                  (t = JSON.parse(e)).Code;
                } catch (e) {}
                r({
                  Code: a.ErrorCode.ServerAPIError,
                  Message: t.Code + "|" + t.Message,
                  sri: t.requestId,
                  display_msg: c.get("Fetch_Playauth_Error", o),
                });
              }
            }
          );
        };
      },
      {
        "../../lang/index": 15,
        "../../lib/constants": 17,
        "../../lib/io": 24,
        "./signature": 36,
        "./util": 38,
      },
    ],
    38: [
      function (e, t, r) {
        t.exports.createError = function (e, t) {
          return { requestId: "", code: t || "", message: e };
        };
      },
      {},
    ],
    39: [
      function (e, t, r) {
        var o = e("../lib/oo"),
          n = e("../lib/data"),
          i = e("../lib/object"),
          a = e("../lib/dom"),
          s = e("../lib/event"),
          l = e("../lib/function"),
          c = e("../lib/layout"),
          u =
            (e("../lib/constants"),
            e("../lib/util"),
            e("../player/base/event/eventtype")),
          e = e("./component/util"),
          o = o.extend({
            init: function (e, t) {
              var r = this;
              (this._player = e),
                (this._eventState = ""),
                (this._options = i.copy(t)),
                (this._el = this.createEl());
              var o = e.id;
              "function" == typeof e.id && (o = e.id()),
                (this._id = o + "_component_" + n.guid()),
                (this._children = []),
                (this._childIndex = {}),
                t.className && this.addClass(t.className),
                this._player.on(u.Private.UiH5Ready, function () {
                  r.renderUI(), r.syncUI(), r.bindEvent();
                });
            },
          });
        (o.prototype.renderUI = function () {
          c.render(this.el(), this.options()), (this.el().id = this.id());
        }),
          (o.prototype.syncUI = function () {}),
          (o.prototype.bindEvent = function () {}),
          (o.prototype.createEl = function (e, t) {
            return a.createEl(e, t);
          }),
          (o.prototype.options = function (e) {
            return void 0 === e
              ? this._options
              : (this._options = i.merge(this._options, e));
          }),
          (o.prototype.el = function () {
            return this._el;
          }),
          o.prototype._contentEl,
          (o.prototype.player = function () {
            return this._player;
          }),
          (o.prototype.contentEl = function () {
            return this._contentEl || this._el;
          }),
          o.prototype._id,
          (o.prototype.id = function () {
            return this._id;
          }),
          (o.prototype.getId = function () {
            return this._id;
          }),
          (o.prototype.addChild = function (e, t) {
            var r;
            if ("string" == typeof e) {
              if (!this._player.UI[e]) return;
              r = new this._player.UI[e](this._player, t);
            } else r = e;
            return (
              this._children.push(r),
              "function" == typeof r.id && (this._childIndex[r.id()] = r),
              "function" == typeof r.el &&
                r.el() &&
                (((e = r.el()).id = r.id()), this.contentEl().appendChild(e)),
              r
            );
          }),
          (o.prototype.removeChild = function (e) {
            if (e && this._children) {
              for (var t, r = !1, o = this._children.length - 1; 0 <= o; o--)
                if (this._children[o] === e) {
                  (r = !0), this._children.splice(o, 1);
                  break;
                }
              r &&
                ((this._childIndex[e.id] = null),
                (t = e.el()) &&
                  t.parentNode === this.contentEl() &&
                  this.contentEl().removeChild(e.el()));
            }
          }),
          (o.prototype.initChildren = function () {
            var e,
              t,
              r = this,
              o = this.options().children;
            if (o)
              if (i.isArray(o))
                for (var n = 0; n < o.length; n++)
                  (t =
                    "string" == typeof (t = o[n])
                      ? ((e = t), {})
                      : ((e = t.name), t)),
                    r.addChild(e, t);
              else
                i.each(o, function (e, t) {
                  !1 !== t && r.addChild(e, t);
                });
          }),
          (o.prototype.on = function (e, t) {
            return s.on(this._el, e, l.bind(this, t)), this;
          }),
          (o.prototype.offListener = function (e, t) {
            return s.off(this._el, e, t), this;
          }),
          (o.prototype.one = function (e, t) {
            return s.one(this._el, e, l.bind(this, t)), this;
          }),
          (o.prototype.trigger = function (e, t) {
            if (this._el)
              return (
                (!t && 0 != t) || (this._el.paramData = t),
                (this._eventState = e),
                s.trigger(this._el, e),
                this
              );
          }),
          (o.prototype.off = function (e) {
            return s.off(this._el, e), this;
          }),
          (o.prototype.addClass = function (e) {
            return a.addClass(this._el, e), this;
          }),
          (o.prototype.removeClass = function (e) {
            return a.removeClass(this._el, e), this;
          }),
          (o.prototype.show = function () {
            return this._el && (this._el.style.display = "block"), this;
          }),
          (o.prototype.hide = function () {
            return this._el && (this._el.style.display = "none"), this;
          }),
          (o.prototype.destroy = function () {
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
          (o.prototype.registerControlBarTooltip = e.registerTooltipEvent),
          (t.exports = o);
      },
      {
        "../lib/constants": 17,
        "../lib/data": 19,
        "../lib/dom": 20,
        "../lib/event": 21,
        "../lib/function": 23,
        "../lib/layout": 25,
        "../lib/object": 26,
        "../lib/oo": 27,
        "../lib/util": 32,
        "../player/base/event/eventtype": 33,
        "./component/util": 42,
      },
    ],
    40: [
      function (e, t, r) {
        var o = e("../component"),
          s = e("../../lib/util"),
          l = e("../../lib/dom"),
          n = e("../../lib/event"),
          i = e("../../lib/ua"),
          c = e("../../lang/index"),
          a = e("../../player/base/event/eventtype"),
          e = o.extend({
            init: function (e, t) {
              o.call(this, e, t), this.addClass("prism-ErrorMessage");
            },
            createEl: function () {
              var e = o.prototype.createEl.call(this, "div");
              return (
                (e.innerHTML =
                  "<div class='prism-error-content'><p></p></div><div class='prism-error-operation'><a class='prism-button prism-button-refresh'>" +
                  c.get("Refresh_Text") +
                  "</a><a class='prism-button prism-button-retry'  target='_blank'>" +
                  c.get("Retry") +
                  "</a><a class='prism-button prism-button-orange'  target='_blank'>" +
                  c.get("Detection_Text") +
                  "</a></div><div class='prism-detect-info prism-center'><p class='errorCode'><span class='info-label'>code\uff1a</span><span class='info-content'></span></p><p class='vid'><span class='info-label'>vid:</span><span class='info-content'></span></p><p class='uuid'><span class='info-label'>uuid:</span><span class='info-content'></span></p><p class='requestId'><span class='info-label'>requestId:</span><span class='info-content'></span></p><p class='dateTime'><span class='info-label'>" +
                  c.get("Play_DateTime") +
                  "\uff1a</span><span class='info-content'></span></p></div>"),
                e
              );
            },
            bindEvent: function () {
              var r = this;
              r._player.on(a.Private.Error_Show, function (e) {
                var t = null;
                r._player.getMonitorInfo && (t = r._player.getMonitorInfo()),
                  r._show(e, t);
              }),
                r._player.on(a.Private.Error_Hide, function () {
                  r._hide();
                });
              var e = document.querySelector(
                "#" + r.id() + " .prism-button-refresh"
              );
              n.on(e, "click", function () {
                location.reload(!0);
              }),
                i.IS_MOBILE &&
                  ((e = document.querySelector(
                    "#" + r.id() + " .prism-detect-info"
                  )),
                  l.addClass(e, "prism-width90"));
              e = document.querySelector("#" + r.id() + " .prism-button-retry");
              n.on(e, "click", function () {
                var e = r._player.getCurrentTime(),
                  t = r._player._options.source;
                (r._player._setDefaultCC = !0),
                  r._player._loadByUrlInner(t, e, !0);
              });
            },
            _show: function (e, t) {
              var r = e.paramData,
                o = "",
                n = "";
              r.mediaId && (o = r.mediaId);
              var i,
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
                      o +
                      "&source=" +
                      (n ? encodeURIComponent(n) : "") +
                      "&uuid=" +
                      t.uuid +
                      "&lang=" +
                      c.getCurrentLanguage()),
                    e && (e.href = t))
                  : l.css(e, "display", "none"),
                (e = r.display_msg || r.error_msg),
                (document.querySelector(
                  "#" + this.id() + " .prism-error-content p"
                ).innerHTML = e),
                (document.querySelector(
                  "#" + this.id() + " .errorCode .info-content"
                ).innerText = r.error_code),
                (e = document.querySelector("#" + this.id() + " .vid")),
                r.mediaId
                  ? (l.css(e, "display", "block"),
                    (document.querySelector(
                      "#" + this.id() + " .vid .info-content"
                    ).innerText = r.mediaId))
                  : l.css(e, "display", "none"),
                r.uuid
                  ? (document.querySelector(
                      "#" + this.id() + " .uuid .info-content"
                    ).innerText = r.uuid)
                  : ((e = document.querySelector("#" + this.id() + " .uuid")),
                    l.css(e, "display", "none")),
                r.requestId
                  ? (document.querySelector(
                      "#" + this.id() + " .requestId .info-content"
                    ).innerText = r.requestId)
                  : ((i = document.querySelector(
                      "#" + this.id() + " .requestId"
                    )),
                    l.css(i, "display", "none")),
                (document.querySelector(
                  "#" + this.id() + " .dateTime .info-content"
                ).innerText = s.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss")),
                (i = document.querySelector("#" + this.id())),
                l.css(i, "display", "block"),
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
        "../../lang/index": 15,
        "../../lib/dom": 20,
        "../../lib/event": 21,
        "../../lib/ua": 30,
        "../../lib/util": 32,
        "../../player/base/event/eventtype": 33,
        "../component": 39,
      },
    ],
    41: [
      function (e, t, r) {
        var o = e("../component"),
          n = (e("../../lib/util"), e("../../lib/dom")),
          i =
            (e("../../lib/event"),
            e("../../lib/ua"),
            e("../../lang/index"),
            e("../../player/base/event/eventtype")),
          e = o.extend({
            init: function (e, t) {
              o.call(this, e, t), this.addClass("prism-info-display");
            },
            createEl: function () {
              return o.prototype.createEl.call(this, "p");
            },
            bindEvent: function () {
              var r = this;
              r._player.on(i.Private.Info_Show, function (e) {
                var t = document.querySelector("#" + r.id()),
                  e = e.paramData;
                e &&
                  (void 0 !== e.text && e.text
                    ? ((t.innerHTML = e.text),
                      void 0 !== e.duration &&
                        e.duration &&
                        (r.handler && clearTimeout(r.handler),
                        (r.handler = setTimeout(function () {
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
                r._player.on(i.Private.Info_Hide, function (e) {
                  var t = document.querySelector("#" + r.id());
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
        "../../lang/index": 15,
        "../../lib/dom": 20,
        "../../lib/event": 21,
        "../../lib/ua": 30,
        "../../lib/util": 32,
        "../../player/base/event/eventtype": 33,
        "../component": 39,
      },
    ],
    42: [
      function (e, t, r) {
        var o = e("../../lib/event"),
          s = e("../../player/base/event/eventtype");
        (t.exports.registerTooltipEvent = function (e, n) {
          function i() {
            a._controlbarTooltipHandler &&
              (clearTimeout(a._controlbarTooltipHandler),
              (a._controlbarTooltipHandler = null));
          }
          var a = this;
          o.on(this.el(), "mouseover", function (e) {
            i(),
              (a._controlbarTooltipHandler = setTimeout(function () {
                a._player.trigger(s.Private.TooltipHide);
              }, 4e3));
            var t = a.el().offsetLeft,
              r = a.el().offsetWidth,
              o = n;
            "function" == typeof n && (o = n.call(this)),
              a._player.trigger(s.Private.TooltipShow, {
                left: t,
                width: r,
                text: o,
              });
          }),
            o.on(this.el(), "mouseout", function () {
              i(), a._player.trigger(s.Private.TooltipHide);
            });
        }),
          (t.exports.throttle = function (r, o) {
            var n = Date.now();
            return function () {
              var e = arguments,
                t = Date.now();
              o <= t - n && (r(e), (n = t));
            };
          });
      },
      { "../../lib/event": 21, "../../player/base/event/eventtype": 33 },
    ],
  },
  {},
  [10]
);
