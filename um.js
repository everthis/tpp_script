/* 2018-05-30 16:44:29 */
!(function(e) {
  function t(r) {
    if (n[r]) return n[r].exports
    var o = (n[r] = {
      exports: {},
      id: r,
      loaded: !1
    })
    return e[r].call(o.exports, o, o.exports, t), (o.loaded = !0), o.exports
  }
  var n = {}
  return (t.m = e), (t.c = n), (t.p = ''), t(0)
})([
  function(e, t, n) {
    ;(function(e) {
      var t,
        r = n(1),
        o = n(2),
        i = n(3),
        a = n(6),
        u = n(9),
        c = n(15),
        s = e,
        f = (s.document, {}),
        l = {
          version: '3.3.7',
          getStatus: function(e) {
            return t ? (e ? t.status : t.status >= 200) : !!e && 0
          },
          getData: function() {
            return t ? t.getData() : '{}'
          },
          getToken: function() {
            return t ? t.getToken() : u()
          },
          init: function(e) {
            var n = i.extend({}, c, e || {})
            if (!n.enabled) return r.reject('not enabled')
            var o = n.token || u()
            if (f[o]) return f[o]
            var s = r.defer()
            return (
              (f[o] = s.promise),
              (t = new a(n)),
              t.init(),
              (t.defer = s),
              s.promise
            )
          }
        }
      o.trigger('main.loaded', {
        um: l
      })
      var p = s.umx && s.umx.version >= '3.1.0'
      p || ((s.umx = l), (s.um = l)),
        s.pointman &&
          s.pointman.define('um', function() {
            return p ? s.umx : l
          })
      try {
        s.AWSCInner && s.AWSCInner.register('umidH5Module', 'umh5', l)
      } catch (h) {}
    }.call(
      t,
      (function() {
        return this
      })()
    ))
  },
  function(e, t) {
    function n(e) {
      return this instanceof n
        ? ((this._state = c),
          (this._onFulfilled = []),
          (this._onRejected = []),
          (this._value = null),
          (this._reason = null),
          void (l(e) && e(i(this.resolve, this), i(this.reject, this))))
        : new n(e)
    }
    function r(e, t, n) {
      return function(r) {
        if (l(t))
          try {
            var i = t(r)
            o(i)
              ? i.then(
                  function(t) {
                    e.resolve(t)
                  },
                  function(t) {
                    e.reject(t)
                  }
                )
              : e.resolve(i)
          } catch (a) {
            e.reject(a)
          }
        else e[n](r)
      }
    }
    function o(e) {
      return e && l(e.then)
    }
    function i(e, t) {
      var n = [].slice,
        r = n.call(arguments, 2),
        o = function() {},
        i = function() {
          return e.apply(
            this instanceof o ? this : t,
            r.concat(n.call(arguments))
          )
        }
      return (o.prototype = e.prototype), (i.prototype = new o()), i
    }
    function a(e) {
      return function(t) {
        return {}.toString.call(t) == '[object ' + e + ']'
      }
    }
    function u(e, t) {
      for (var n = 0, r = e.length; n < r; n++) t(e[n], n)
    }
    var c = 0,
      s = 1,
      f = 2
    ;(n.prototype = {
      constructor: n,
      then: function(e, t) {
        var o = new n(),
          i = r(o, e, 'resolve'),
          a = r(o, t, 'reject')
        return (
          this._state === s
            ? i(this._value)
            : this._state === f
              ? a(this._reason)
              : (this._onFulfilled.push(i), this._onRejected.push(a)),
          o
        )
      },
      resolve: function(e) {
        this._state === c &&
          ((this._state = s),
          (this._value = e),
          u(this._onFulfilled, function(t) {
            t(e)
          }),
          (this._onFulfilled = []))
      },
      reject: function(e) {
        this._state === c &&
          ((this._state = f),
          (this._reason = e),
          u(this._onRejected, function(t) {
            t(e)
          }),
          (this._onRejected = []))
      },
      catch: function(e) {
        return this.then(null, e)
      },
      always: function(e) {
        return this.then(e, e)
      }
    }),
      (n.defer = function() {
        var e = {}
        return (
          (e.promise = new n(function(t, n) {
            ;(e.resolve = t), (e.reject = n)
          })),
          e
        )
      }),
      (n.race = function(e) {
        var t = n.defer()
        e.length
        return (
          u(e, function(e) {
            e.then(
              function(e) {
                t.resolve(e)
              },
              function(e) {
                t.reject(e)
              }
            )
          }),
          t.promise
        )
      }),
      (n.all = function(e) {
        var t = n.defer(),
          r = e.length,
          o = []
        return (
          u(e, function(e, n) {
            e.then(
              function(e) {
                ;(o[n] = e), r--, 0 === r && t.resolve(o)
              },
              function(e) {
                t.reject(e)
              }
            )
          }),
          t.promise
        )
      }),
      (n.resolve = function(e) {
        return new n(function(t) {
          t(e)
        })
      }),
      (n.reject = function(e) {
        return new n(function(t, n) {
          n(e)
        })
      })
    var l = a('Function')
    e.exports = n
  },
  function(e, t) {
    var n = [].slice,
      r = {},
      o = function(e, t) {
        var n = r[e] || (r[e] = [])
        n.push(t)
      },
      i = function(e, t) {
        var n = function() {
          a(e, n), t.apply(null, arguments)
        }
        o(e, n)
      },
      a = function(e, t) {
        if (!e && !t) return void (r = {})
        var n = r[e]
        if (n)
          if (t)
            for (var o = n.length - 1; o >= 0; o--) n[o] === t && n.splice(o, 1)
          else delete r[e]
      },
      u = function(e) {
        var t = r[e],
          o = n.call(arguments, 1)
        if (t) {
          t = t.slice()
          for (var i = 0, a = t.length; i < a; i++) t[i].apply(null, o)
        }
      }
    e.exports = {
      on: o,
      one: i,
      off: a,
      trigger: u,
      __events: r
    }
  },
  function(e, t, n) {
    ;(function(t) {
      function r(e) {
        return function(t) {
          return {}.toString.call(t) == '[object ' + e + ']'
        }
      }
      var o = t,
        i = o.document,
        a = n(4),
        u = n(1),
        c = n(5),
        s = (o.JSON || a).stringify,
        f = (o.JSON || a).parse,
        l = i.getElementsByTagName('script')[0].parentNode,
        p = function(e, t, n) {
          if (e) {
            var r = 0,
              o = e.length
            if (o === +o) for (; r < o && t.call(n, e[r], r, e) !== !1; r++);
            else
              for (r in e)
                if (e.hasOwnProperty(r) && t.call(n, e[r], r, e) === !1) break
          }
        },
        h = {
          isObject: r('Object'),
          isFunction: r('Function'),
          wait: function(e) {
            return new u(function(t, n) {
              setTimeout(n, e)
            })
          },
          allSettled: function(e) {
            var t = u.defer(),
              n = 0
            return (
              p(e, function() {
                n++
              }),
              p(e, function(e) {
                e.always(function() {
                  n--, 0 === n && t.resolve()
                })
              }),
              t.promise
            )
          },
          each: p,
          singleton: function(e, t) {
            var n
            return function() {
              return 'undefined' != typeof n ? n : (n = e.apply(t, arguments))
            }
          },
          extend: function(e) {
            for (
              var t, n, r = [].slice.call(arguments), o = r.length, i = 1;
              i < o;
              i++
            ) {
              t = r[i]
              for (n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            }
            return e
          },
          poll: function(e, t, n) {
            ;(n = n || 1e4), (t = t || 500)
            var r = null,
              o = u.race([
                h.wait(n),
                new u(function(n, o) {
                  function i() {
                    var t = e()
                    return t ? (n(t), 1) : 0
                  }
                  i() || (r = setInterval(i, t))
                })
              ])
            return (
              o.always(function() {
                clearInterval(r)
              }),
              o
            )
          },
          append: function(e, t) {
            e || (e = i.body)
            var n = i.createElement('span')
            ;(n.innerHTML = t),
              e.insertBefore(n.firstChild, e.firstChild),
              (n = null)
          },
          post: function(e, t, n) {
            var r =
              'undefined' != typeof XMLHttpRequest &&
              'withCredentials' in new XMLHttpRequest()
            if (!r || n) return h.jsonp(e, t)
            var o = new u(function(n, r) {
              var o,
                i = 'POST',
                a = function() {
                  var e = o && o.responseText
                  n(f(e || '{}'))
                },
                u = function(e) {
                  r(e)
                }
              setTimeout(r, 5e3),
                (o = new XMLHttpRequest()),
                o.open(i, e, !0),
                (o.withCredentials = !0),
                o.setRequestHeader &&
                  o.setRequestHeader(
                    'Content-Type',
                    'application/x-www-form-urlencoded; charset=UTF-8'
                  ),
                (o.onload = a),
                (o.onerror = u),
                o.send('data=' + encodeURIComponent(t))
            })
            return o['catch'](function(n) {
              return h.jsonp(e, t)
            })
          },
          jsonp: function(e, t) {
            return new u(function(n, r) {
              var a = i.createElement('script'),
                u =
                  '_' +
                  parseInt(1e4 * Math.random(), 10) +
                  '_' +
                  new Date().getTime(),
                c = []
              ;(a.onerror = function(e) {
                r(e)
              }),
                setTimeout(r, 5e3),
                c.push('data=' + encodeURIComponent(t)),
                c.push('_callback=' + u),
                (e += e.indexOf('?') > 0 ? '&' : '?'),
                (e += c.join('&')),
                (a.src = e),
                (o[u] = function(e) {
                  n(e)
                  try {
                    l.removeChild(a), delete o[u]
                  } catch (t) {}
                }),
                l.appendChild(a)
            })
          },
          parseJson: f,
          toJson: s,
          log: function(e) {
            var t = new Image(),
              n = '_um_img_' + Math.random()
            ;(o[n] = t),
              (t.onload = t.onerror = function() {
                o[n] = null
              }),
              (t.src = e)
          },
          groupHash: function(e) {
            if (0 === e.length) return ''
            var t = {}
            p(e, function(e) {
              var n = e.charAt(0).toUpperCase()
              ;(n < 'A' || n > 'Z') && (n = 'zh'),
                (t[n] = t[n] || []),
                t[n].push(e)
            })
            var n = []
            return (
              p(t, function(e, t) {
                n.push(('zh' === t ? '#' : t) + c.hash(e.join(',')))
              }),
              n.join(',')
            )
          }
        }
      e.exports = h
    }.call(
      t,
      (function() {
        return this
      })()
    ))
  },
  function(module, exports) {
    var JSON = {}
    !(function() {
      'use strict'
      function f(e) {
        return e < 10 ? '0' + e : e
      }
      function this_value() {
        return this.valueOf()
      }
      function quote(e) {
        return (
          (rx_escapable.lastIndex = 0),
          rx_escapable.test(e)
            ? '"' +
              e.replace(rx_escapable, function(e) {
                var t = meta[e]
                return 'string' == typeof t
                  ? t
                  : '\\u' + ('0000' + e.charCodeAt(0).toString(16)).slice(-4)
              }) +
              '"'
            : '"' + e + '"'
        )
      }
      function str(e, t) {
        var n,
          r,
          o,
          i,
          a,
          u = gap,
          c = t[e]
        switch ((c &&
          'object' == typeof c &&
          'function' == typeof c.toJSON &&
          (c = c.toJSON(e)),
        'function' == typeof rep && (c = rep.call(t, e, c)),
        typeof c)) {
          case 'string':
            return quote(c)
          case 'number':
            return isFinite(c) ? String(c) : 'null'
          case 'boolean':
          case 'null':
            return String(c)
          case 'object':
            if (!c) return 'null'
            if (
              ((gap += indent),
              (a = []),
              '[object Array]' === Object.prototype.toString.apply(c))
            ) {
              for (i = c.length, n = 0; n < i; n += 1)
                a[n] = str(n, c) || 'null'
              return (
                (o =
                  0 === a.length
                    ? '[]'
                    : gap
                      ? '[\n' + gap + a.join(',\n' + gap) + '\n' + u + ']'
                      : '[' + a.join(',') + ']'),
                (gap = u),
                o
              )
            }
            if (rep && 'object' == typeof rep)
              for (i = rep.length, n = 0; n < i; n += 1)
                'string' == typeof rep[n] &&
                  ((r = rep[n]),
                  (o = str(r, c)),
                  o && a.push(quote(r) + (gap ? ': ' : ':') + o))
            else
              for (r in c)
                Object.prototype.hasOwnProperty.call(c, r) &&
                  ((o = str(r, c)),
                  o && a.push(quote(r) + (gap ? ': ' : ':') + o))
            return (
              (o =
                0 === a.length
                  ? '{}'
                  : gap
                    ? '{\n' + gap + a.join(',\n' + gap) + '\n' + u + '}'
                    : '{' + a.join(',') + '}'),
              (gap = u),
              o
            )
        }
      }
      var rx_one = /^[\],:{}\s]*$/,
        rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rx_four = /(?:^|:|,)(?:\s*\[)+/g,
        rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g
      'function' != typeof Date.prototype.toJSON &&
        ((Date.prototype.toJSON = function() {
          return isFinite(this.valueOf())
            ? this.getUTCFullYear() +
                '-' +
                f(this.getUTCMonth() + 1) +
                '-' +
                f(this.getUTCDate()) +
                'T' +
                f(this.getUTCHours()) +
                ':' +
                f(this.getUTCMinutes()) +
                ':' +
                f(this.getUTCSeconds()) +
                'Z'
            : null
        }),
        (Boolean.prototype.toJSON = this_value),
        (Number.prototype.toJSON = this_value),
        (String.prototype.toJSON = this_value))
      var gap, indent, meta, rep
      'function' != typeof JSON.stringify &&
        ((meta = {
          '\b': '\\b',
          '\t': '\\t',
          '\n': '\\n',
          '\f': '\\f',
          '\r': '\\r',
          '"': '\\"',
          '\\': '\\\\'
        }),
        (JSON.stringify = function(e, t, n) {
          var r
          if (((gap = ''), (indent = ''), 'number' == typeof n))
            for (r = 0; r < n; r += 1) indent += ' '
          else 'string' == typeof n && (indent = n)
          if (
            ((rep = t),
            t &&
              'function' != typeof t &&
              ('object' != typeof t || 'number' != typeof t.length))
          )
            throw new Error('JSON.stringify')
          return str('', {
            '': e
          })
        })),
        'function' != typeof JSON.parse &&
          (JSON.parse = function(text, reviver) {
            function walk(e, t) {
              var n,
                r,
                o = e[t]
              if (o && 'object' == typeof o)
                for (n in o)
                  Object.prototype.hasOwnProperty.call(o, n) &&
                    ((r = walk(o, n)), void 0 !== r ? (o[n] = r) : delete o[n])
              return reviver.call(e, t, o)
            }
            var j
            if (
              ((text = String(text)),
              (rx_dangerous.lastIndex = 0),
              rx_dangerous.test(text) &&
                (text = text.replace(rx_dangerous, function(e) {
                  return (
                    '\\u' + ('0000' + e.charCodeAt(0).toString(16)).slice(-4)
                  )
                })),
              rx_one.test(
                text
                  .replace(rx_two, '@')
                  .replace(rx_three, ']')
                  .replace(rx_four, '')
              ))
            )
              return (
                (j = eval('(' + text + ')')),
                'function' == typeof reviver
                  ? walk(
                      {
                        '': j
                      },
                      ''
                    )
                  : j
              )
            throw new SyntaxError('JSON.parse')
          })
    })(),
      (module.exports = JSON)
  },
  function(e, t) {
    var n = {}
    ;(n.encode = function(e) {
      var t = e.replace(/[\u0080-\u07ff]/g, function(e) {
        var t = e.charCodeAt(0)
        return String.fromCharCode(192 | (t >> 6), 128 | (63 & t))
      })
      return (t = t.replace(/[\u0800-\uffff]/g, function(e) {
        var t = e.charCodeAt(0)
        return String.fromCharCode(
          224 | (t >> 12),
          128 | ((t >> 6) & 63),
          128 | (63 & t)
        )
      }))
    }),
      (n.ROTL = function(e, t) {
        return (e << t) | (e >>> (32 - t))
      }),
      (n.toHexStr = function(e) {
        for (var t, n = '', r = 7; r >= 0; r--)
          (t = (e >>> (4 * r)) & 15), (n += t.toString(16))
        return n
      }),
      (n.f = function(e, t, n, r) {
        switch (e) {
          case 0:
            return (t & n) ^ (~t & r)
          case 1:
            return t ^ n ^ r
          case 2:
            return (t & n) ^ (t & r) ^ (n & r)
          case 3:
            return t ^ n ^ r
        }
      }),
      (n.hash = function(e, t) {
        ;(t = 'undefined' == typeof t || t), t && (e = n.encode(e))
        var r = [1518500249, 1859775393, 2400959708, 3395469782]
        e += String.fromCharCode(128)
        var o,
          i,
          a,
          u = e.length / 4 + 2,
          c = Math.ceil(u / 16),
          s = new Array(c)
        for (o = 0; o < c; o++)
          for (s[o] = new Array(16), a = 0; a < 16; a++)
            s[o][a] =
              (e.charCodeAt(64 * o + 4 * a) << 24) |
              (e.charCodeAt(64 * o + 4 * a + 1) << 16) |
              (e.charCodeAt(64 * o + 4 * a + 2) << 8) |
              e.charCodeAt(64 * o + 4 * a + 3)
        ;(s[c - 1][14] = 8 * (e.length - 1) / Math.pow(2, 32)),
          (s[c - 1][14] = Math.floor(s[c - 1][14])),
          (s[c - 1][15] = (8 * (e.length - 1)) & 4294967295)
        var f,
          l,
          p,
          h,
          d,
          v = 1732584193,
          g = 4023233417,
          m = 2562383102,
          y = 271733878,
          x = 3285377520,
          b = new Array(80)
        for (o = 0; o < c; o++) {
          for (i = 0; i < 16; i++) b[i] = s[o][i]
          for (i = 16; i < 80; i++)
            b[i] = n.ROTL(b[i - 3] ^ b[i - 8] ^ b[i - 14] ^ b[i - 16], 1)
          for (f = v, l = g, p = m, h = y, d = x, i = 0; i < 80; i++) {
            var j = Math.floor(i / 20),
              _ =
                (n.ROTL(f, 5) + n.f(j, l, p, h) + d + r[j] + b[i]) & 4294967295
            ;(d = h), (h = p), (p = n.ROTL(l, 30)), (l = f), (f = _)
          }
          ;(v = (v + f) & 4294967295),
            (g = (g + l) & 4294967295),
            (m = (m + p) & 4294967295),
            (y = (y + h) & 4294967295),
            (x = (x + d) & 4294967295)
        }
        return (
          n.toHexStr(v) +
          n.toHexStr(g) +
          n.toHexStr(m) +
          n.toHexStr(y) +
          n.toHexStr(x)
        )
      }),
      (e.exports = n)
  },
  function(e, t, n) {
    ;(function(t) {
      function r(e, t) {
        e &&
          o(e).then(function(e) {
            i(e, t)
          })
      }
      function o(e) {
        return s.poll(
          function() {
            return v.getElementById(e)
          },
          100,
          2e3
        )
      }
      function i(e, t) {
        var n,
          r,
          o = e.getElementsByTagName('input')
        for (n = 0; n < o.length; n++)
          if ('um_token' == o[n].getAttribute('name')) {
            r = o[n]
            break
          }
        return (
          r
            ? (r.value = t)
            : ((r = v.createElement('input')),
              (r.type = 'hidden'),
              (r.name = 'um_token'),
              (r.value = t),
              e.appendChild(r)),
          r
        )
      }
      var a = n(7),
        u = n(8),
        c = n(9),
        s = n(3),
        f = n(14),
        l = n(11),
        p = n(12),
        h = {
          cn: 'https://ynuf.alipay.com/service/um.json',
          us: 'https://us.ynuf.alipay.com/service/um.json',
          aliapp: 'https://ynuf.aliapp.org/service/um.json',
          usaliapp: 'https://us.ynuf.aliapp.org/service/um.json',
          in: 'https://aprisk.paytm.in/service/um.json',
          sg: 'https://sgynuf.alibaba.com/service/um.json',
          daily: 'https://umidstable.alibaba-inc.com/service/um.json',
          lazada: 'https://umlazada.alibaba.com/service/um.json'
        },
        d = t,
        v = d.document,
        g = function(e) {
          ;(e = e || {}),
            (e.serviceUrl = e.serviceUrl || h[e.serviceLocation]),
            (this.options = e),
            (this.status = 0),
            (this.clientToken = c()),
            (this.data = {})
        }
      ;(g.prototype = {
        getToken: function() {
          return this.options.token || this.serverToken || this.clientToken
        },
        init: function() {
          var e = this.options
          ;(this.status = 1),
            (this.startTime = new Date()),
            s.extend(this.data, {
              xv: '3.3.7',
              xt: this.getToken(),
              etf: e.token ? 'b' : 'u',
              xa: e.appName,
              siteId: e.siteId,
              uid: e.userId,
              eml: e.model,
              etid: e.traceId,
              esid: e.sessionId,
              serverTime: e.serverTime
            }),
            r(e.formId, this.getToken()),
            e.closeImage ||
              s.log(
                e.serviceUrl.replace('um.json', 'clear.png') +
                  '?xt=' +
                  this.getToken() +
                  '&xa=' +
                  e.appName
              ),
            this.run()
        },
        run: function() {
          var e = this,
            t = e.options
          e.status = 2
          var n = f.init(t, e)
          s
            .allSettled(n)
            .then(function() {
              var t = {}
              s.each(n, function(e, n) {
                null != e._value &&
                  (s.isObject(e._value)
                    ? s.extend(t, e._value)
                    : (t[n] = e._value))
              }),
                s.extend(e.data, t),
                e.send()
            })
            ['catch'](function() {})
        },
        getData: function() {
          return s.toJson(this.data)
        },
        send: function() {
          var e = this,
            t = e.options
          if (t.noRequest) {
            try {
              t.callback()
            } catch (n) {}
            return void e.defer.resolve()
          }
          e.status = 4
          var o = 'ENCODE~~V01~~' + u.encode(e.getData())
          s
            .post(t.serviceUrl, o, t.jsonp)
            .then(function(n) {
              n && n.id
                ? ((e.status = 255), l.set(p.storeKey, n.id))
                : (e.status = 200)
              try {
                t.callback(n)
              } catch (o) {}
              e.defer.resolve(n),
                a.set(p.storeTimeKey, new Date() - e.startTime),
                n.tn && ((e.serverToken = n.tn), r(t.formId, n.tn))
            })
            ['catch'](function(n) {
              e.defer.reject(n), t.errorCallback && t.errorCallback(n)
            })
        }
      }),
        (e.exports = g)
    }.call(
      t,
      (function() {
        return this
      })()
    ))
  },
  function(e, t) {
    e.exports = {
      set: function(e, t) {
        try {
          localStorage.setItem(e, t)
        } catch (n) {}
      },
      get: function(e) {
        try {
          return localStorage.getItem(e)
        } catch (t) {}
      },
      remove: function(e) {
        try {
          localStorage.removeItem(e)
        } catch (t) {}
      }
    }
  },
  function(e, t) {
    var n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
      r = function(e) {
        if (!e) return ''
        for (var t, r, o, i, a, u, c, s = '', f = 0; f < e.length; )
          (t = e.charCodeAt(f++)),
            (r = e.charCodeAt(f++)),
            (o = e.charCodeAt(f++)),
            (i = t >> 2),
            (a = ((3 & t) << 4) | (r >> 4)),
            (u = ((15 & r) << 2) | (o >> 6)),
            (c = 63 & o),
            isNaN(r) ? (u = c = 64) : isNaN(o) && (c = 64),
            (s = s + n.charAt(i) + n.charAt(a) + n.charAt(u) + n.charAt(c))
        return s
      }
    e.exports = {
      encode: r
    }
  },
  function(e, t, n) {
    ;(function(t) {
      function r(e) {
        for (var t = ''; t.length < e; )
          t += Math.random()
            .toString()
            .substr(2)
        return t.substring(t.length - e)
      }
      var o = t,
        i = n(10),
        a = n(7),
        u = n(11),
        c = n(12).collinaCookieKey,
        s = n(13).isTT,
        f = function() {
          var e = (o._sec_module = o._sec_module || {})
          if (e.token) return 'C' + e.token
          var t = +new Date(),
            n = u.get(c)
          n
            ? (n = n.value)
            : ((n = t + r(11)), s ? a.set(c, n) : i.set(c, n, null, 3650, '/'))
          var f = n + t + r(3)
          return (e.token = f), 'C' + f
        }
      e.exports = f
    }.call(
      t,
      (function() {
        return this
      })()
    ))
  },
  function(e, t) {
    var n = 864e5,
      r = encodeURIComponent,
      o = function(e) {
        return decodeURIComponent((e + '').replace(/\+/g, ' '))
      },
      i = function(e) {
        return 'string' == typeof e && '' !== e
      }
    e.exports = {
      get: function(e) {
        var t, n
        return (
          i(e) &&
            (n = String(document.cookie).match(
              new RegExp('(?:^| )' + e + '(?:(?:=([^;]*))|;|$)')
            )) &&
            (t = n[1] ? o(n[1]) : ''),
          t
        )
      },
      set: function(e, t, o, a, u, c) {
        var s = String(r(t)),
          f = a
        return (
          'number' == typeof f &&
            ((f = new Date()), f.setTime(f.getTime() + a * n)),
          f instanceof Date && (s += '; expires=' + f.toUTCString()),
          i(o) && (s += '; domain=' + o),
          i(u) && (s += '; path=' + u),
          c && (s += '; secure'),
          (document.cookie = e + '=' + s),
          this
        )
      },
      remove: function(e, t, n, r) {
        return this.set(e, '', t, -1, n, r), this
      }
    }
  },
  function(e, t, n) {
    var r = n(2),
      o = n(10),
      i = n(7),
      a = n(12),
      u = n(13).isTT
    e.exports = {
      set: function(e, t) {
        r.trigger('store.set', {
          name: e,
          value: t
        }),
          i.set(e, t),
          e === a.storeKey && u
            ? o.set('um', t, u[1], 365, '/')
            : o.set(e, t, null, 365, '/')
      },
      get: function(e) {
        var t,
          n = {
            name: e
          }
        return (
          r.trigger('store.get', n),
          (t = n.value)
            ? {
                type: n.type,
                value: t
              }
            : (t = i.get(e))
              ? {
                  type: 2,
                  value: t
                }
              : ((t =
                  e === a.storeKey && u ? o.get('um') || o.get(e) : o.get(e)),
                t
                  ? {
                      type: 16,
                      value: t
                    }
                  : void 0)
        )
      },
      remove: function(e) {
        o.remove(e),
          i.remove(e),
          r.trigger('store.remove', {
            name: e
          })
      }
    }
  },
  function(e, t) {
    e.exports = {
      storeKey: '_umdata',
      storeTimeKey: '_umcost',
      tkCache: '_umtk',
      collinaCookieKey: '_uab_collina'
    }
  },
  function(e, t, n) {
    ;(function(t) {
      var r = (n(3), t),
        o = r.document,
        i = (r.navigator, o.createElement('canvas')),
        a = {
          canvas: !(!i.getContext || !i.getContext('2d')),
          CORS: !!(
            'undefined' != typeof XMLHttpRequest &&
            'withCredentials' in new XMLHttpRequest()
          )
        },
        u = /firefox/i.test(navigator.userAgent),
        c = u && /(tmall\.com|taobao\.com)/.exec(location.hostname),
        s = {
          support: a,
          isTT: c
        }
      e.exports = s
    }.call(
      t,
      (function() {
        return this
      })()
    ))
  },
  function(e, t, n) {
    ;(function(t) {
      function r() {
        function e() {
          o(n)
        }
        var t = a.defer()
        um.__idcb = function(e) {
          i != -1 && (clearTimeout(i), t.resolve(e))
        }
        var n = document.createElement('script')
        ;(n.src = 'https://ynuf.alipay.com/uid'), (n.onload = n.onerror = e)
        var r = document.getElementsByTagName('head')[0]
        r.appendChild(n)
        var i = setTimeout(function() {
          ;(i = -1), t.reject(), e()
        }, 5e3)
        return t
      }
      function o(e) {
        var t = e.parentNode
        t && t.removeChild(e)
      }
      function i() {
        var e = top && top.location
        if (!e) return ''
        var t = e.pathname
        return (
          '/' !== t.charAt(0) && (t = '/' + t), e.protocol + '//' + e.host + t
        )
      }
      var a = n(1),
        u = n(5),
        c = (n(2), n(10)),
        s = n(7),
        f = n(11),
        l = n(3),
        p = n(12),
        h = n(13),
        d = (h.support, l.each, l.extend, l.singleton, l.groupHash, t),
        v = d.document,
        g = d.navigator,
        m = {
          type: function() {
            return 'wap'
          },
          nce: function() {
            return g.cookieEnabled
          },
          plat: function() {
            var e = g.platform
            if (e) return e.split(' ').shift()
          },
          nacn: function() {
            return g.appCodeName
          },
          nan: function() {
            return g.appName
          },
          nlg: function() {
            return g.language
          },
          sw: function() {
            return d.screen.width
          },
          sh: function() {
            return d.screen.height
          },
          saw: function() {
            return d.screen.availWidth
          },
          sah: function() {
            return d.screen.availHeight
          },
          bsw: function() {
            return v.body && v.body.clientWidth
          },
          bsh: function() {
            return v.body && v.body.clientHeight
          },
          eloc: function() {
            return encodeURIComponent(i())
          },
          etz: function() {
            var e = new Date()
            e.setDate(1), e.setMonth(5)
            var t = -e.getTimezoneOffset()
            e.setMonth(11)
            var n = -e.getTimezoneOffset()
            return Math.min(t, n)
          },
          ett: function() {
            return new Date().getTime()
          },
          ecn: function() {
            if (h.support.canvas) {
              var e = v.createElement('canvas'),
                t = e.getContext('2d')
              return (
                (e.height = 60),
                (e.width = 400),
                (e.style.display = 'inline'),
                (t.textBaseline = 'alphabetic'),
                (t.fillStyle = '#f60'),
                t.fillRect(125, 1, 62, 20),
                (t.fillStyle = '#069'),
                (t.font = '11pt no-real-font-123'),
                t.fillText('Cwm fjordbank glyphs vext quiz, 😃', 2, 15),
                (t.fillStyle = 'rgba(102, 204, 0, 0.7)'),
                (t.font = '18pt Arial'),
                t.fillText('Cwm fjordbank glyphs vext quiz, 😃', 4, 45),
                u.hash(e.toDataURL() || '')
              )
            }
          },
          eca: function() {
            return c.get('cna')
          },
          token: function() {
            var e = f.get(p.storeKey)
            if (e && e.value)
              return {
                est: e.type,
                xs: e.value
              }
          },
          ms: function() {
            return s.get(p.storeTimeKey)
          },
          erd: function() {
            var e = a.defer()
            return /Android/.test(g.userAgent)
              ? void e.reject()
              : (g.mediaDevices && g.mediaDevices.enumerateDevices
                  ? navigator.mediaDevices.enumerateDevices().then(
                      function(t) {
                        var n = t.map(function(e) {
                          return e.deviceId
                        })
                        return n ? void e.resolve(n.join(',')) : void e.reject()
                      },
                      function() {
                        e.reject()
                      }
                    )
                  : e.reject(),
                e)
          }
        }
      e.exports = {
        init: function(e, t) {
          var n = {},
            o = e.serviceLocation
          return (
            ('cn' !== o && 'aliapp' !== o && 'daily' !== o) || (m.cacheid = r),
            l.each(m, function(r, o) {
              try {
                var i = r(e, t)
                'undefined' == typeof i
                  ? (n[o] = a.reject())
                  : l.isObject(i)
                    ? i instanceof a
                      ? (n[o] = i)
                      : i.promise instanceof a
                        ? (setTimeout(function() {
                            i.reject(o + ': timeout')
                          }, 3e3),
                          (n[o] = i.promise))
                        : (n[o] = a.resolve(i))
                    : (n[o] = a.resolve(i))
              } catch (u) {}
            }),
            n
          )
        }
      }
    }.call(
      t,
      (function() {
        return this
      })()
    ))
  },
  function(e, t, n) {
    function r(e) {
      var t = 'g.alicdn.com'
      if (!e) return t
      if (/aliexpress/.test(location.href)) return 'aeis.alicdn.com'
      var n = a.exec(e)
      return n ? n[3] + (n[4] ? ':' + n[4] : '') : t
    }
    function o() {
      for (
        var e,
          t = u.getElementsByTagName('script'),
          n = /security\/umscript/,
          r = 0;
        r < t.length;
        r++
      )
        if (((e = i(t[r])), n.test(e))) return t[r]
      return u.currentScript ? u.currentScript : t[t.length - 1]
    }
    function i(e) {
      return e.hasAttribute ? e.src : e.getAttribute('src', 4)
    }
    var a = (n(3),
      new RegExp(
        '^([\\w\\d+.-]+:)?(?://(?:([^/?#@]*)@)?([\\w\\d\\-\\u0100-\\uffff.+%]*|\\[[^\\]]+\\])(?::([0-9]+))?)?([^?#]+)?(\\?[^#]*)?(#.*)?$'
      )),
      u = document,
      c = (r(i(o())),
      {
        enabled: !0,
        cache: !0,
        closeImage: !0,
        jsonp: !1,
        token: '',
        appName: '',
        siteId: '',
        sessionId: '',
        userId: n(16).get() || '',
        model: 'AA',
        traceId: '',
        formId: '',
        serviceLocation: 'cn',
        noRequest: !1,
        clientType: 'M'
      })
    e.exports = c
  },
  function(e, t, n) {
    var r = n(10),
      o = n(7),
      i = n(3),
      a = i.parseJson,
      u = {
        taobao: function() {
          return r.get('tracknick')
        },
        alipay: function() {
          var e = o.get('home-username')
          if (e) {
            e = a(e)
            var t = e.match(/^(\d+?)\|/)
            return t && 2 === t.length ? a(e.replace(t[0], '')).value : void 0
          }
        },
        alibaba: function() {
          var e,
            t,
            n = document.getElementById('alibaba-login-box')
          if (n && ((e = n.src), (t = /loginId=(?:([^&#]*)|&|#|$)/.exec(e))))
            return decodeURIComponent(t[1])
        }
      }
    e.exports = {
      get: function() {
        var e
        return (
          i.each(u, function(t) {
            try {
              e = t()
            } catch (n) {}
            if (e) return !1
          }),
          e
        )
      }
    }
  }
])
