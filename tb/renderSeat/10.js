'use strict'
const seventyOne = require('./71')
var r =
    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
      ? function(e) {
          return typeof e
        }
      : function(e) {
          return e &&
            'function' == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? 'symbol'
            : typeof e
        },
  o = seventyOne.env,
  i = {
    isNumber: function(e) {
      return e === +e
    },
    toLocaleString: function(e) {
      return Number.prototype.toLocaleString.call(e)
    },
    typeof: function(e) {
      return Object.prototype.toString.call(e)
    },
    zeroFill: function(e, t, n) {
      var r,
        o,
        i = e >= 0
      ;(e = String.prototype.split.call(e, '.')),
        (r = 1 * (e[0] || 0)),
        (o = e[1] || void 0)
      var a = '' + Math.abs(r)
      return (
        (a = (Array(t).join('0') + a).slice(-t)),
        (i ? (n ? '+' : '') : '-') + a + (o ? '.' + o : '')
      )
    },
    createScript: function(e, t) {
      var n = document.createElement('script')
      n.addEventListener('load', function() {
        t()
      }),
        (n.src = e),
        (n.charset = 'utf-8'),
        (n.id = 'dlJS' + Date.now()),
        document.getElementsByTagName('head')[0].appendChild(n)
    },
    priorityDebounce: function(e, t) {
      var n, r
      return function() {
        var o = [].slice.call(arguments, 0, arguments.length),
          i = o[o.length - 1]
        return (
          o.pop(),
          i && e
            ? ((n = e.apply(this, o)), clearTimeout(r), (e = null))
            : e &&
              (clearTimeout(r),
              (r = setTimeout(function() {
                e.apply(this, o)
              }, t))),
          n
        )
      }
    },
    throttle: function(e, t, n) {
      var r,
        o,
        i,
        a = null,
        s = 0
      n || (n = {})
      var u = function() {
        ;(s = n.leading === !1 ? 0 : Date.now()),
          (a = null),
          (i = e.apply(r, o)),
          a || (r = o = null)
      }
      return function() {
        var c = Date.now()
        s || n.leading !== !1 || (s = c)
        var l = t - (c - s)
        return (
          (r = this),
          (o = arguments),
          l <= 0 || l > t
            ? (a && (clearTimeout(a), (a = null)),
              (s = c),
              (i = e.apply(r, o)),
              a || (r = o = null))
            : a || n.trailing === !1 || (a = setTimeout(u, l)),
          i
        )
      }
    },
    safeAlert: function(e) {
      setTimeout(function() {
        'object' == ('undefined' == typeof e ? 'undefined' : r(e)) &&
          (e = JSON.stringify(e, null, 2)),
          alert(e)
      }, 10)
    },
    safeConfirm: function(e, t, n) {
      ;(n = n || function() {}),
        setTimeout(function() {
          confirm(e) ? t() : n()
        }, 10)
    },
    substitute: function(e, t, n) {
      return String(e).replace(n || /\\?\{([^{}]+)\}/g, function(e, n) {
        return '\\' == e.charAt(0) ? e.slice(1) : void 0 !== t[n] ? t[n] : ''
      })
    },
    capitalize: function(e) {
      return e.replace(/(?:^|\s)\S/g, function(e) {
        return e.toUpperCase()
      })
    },
    clone: function(e) {
      if (
        null === e ||
        'object' != ('undefined' == typeof e ? 'undefined' : r(e))
      )
        return e
      var t = e.constructor()
      for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
      return t
    },
    array_unique: function(e) {
      return e.filter(function(e, t, n) {
        return n.indexOf(e) === t
      })
    },
    array_contains: function(e, t) {
      for (var n = !1, r = 0; r < e.length; r++) e[r] === t && (n = !0)
      return n
    },
    imgHash2Cdn: function(e, t, n, r) {
      if (('undefined' == typeof r && (r = !0), !e)) return ''
      if (/^(https?:|)\/\/.+/.test(e)) {
        var i = e.split('//')
        if ((i.shift(), !/alicdn/.test(e))) {
          if (
            e.indexOf('//image.uc.cn/s/') !== -1 &&
            e.indexOf('?') === -1 &&
            e.indexOf(';') === -1
          ) {
            var a = '3',
              s = '700x',
              u = ';,' + a + ',jpegx;3,' + s
            return '//image.uc.cn/o/' + e.split('//image.uc.cn/s/')[1] + u
          }
          return e
        }
        return e.indexOf('//gw.alicdn.com/') !== -1
          ? '//' + i.join('') + (t || '')
          : '//' + i.join('')
      }
      var c = ''
      o = n || o
      var l = 'waptest' == o ? '//gw.daily.taobaocdn.net/' : '//gw.alicdn.com/'
      return (
        (c = /\//.test(e) ? l + e : l + 'tfscom/' + e),
        t && (c += t),
        r &&
          c.indexOf('webp') < 0 &&
          navigator.userAgent.match(/Android|Chrome|Opera/) &&
          (c += '_.webp'),
        c
      )
    },
    getStrLength: function(e, t) {
      var n,
        r = [],
        o = /^[\\uff01\\uffe5\\uff08\\uff09\\uff1a\\uff1b\\u3001\\u2018\\u2019\\u201c\\u201d\\uff0c\\u3002\\uff1f\\u2014\u2014\\xb7\\u3010\\u3011\u2E80-\uFE4F]$/
      n = t ? e.trim().split('') : e.split('')
      for (var i = 0, a = n.length; i < a; i++)
        o.test(n[i]) ? r.push(1) : r.push(5)
      for (var s = 0, i = 0; i < r.length; i++) s += 5 == r[i] ? 0.5 : 1
      return Math.round(s)
    },
    getChars: function(e) {
      var t = 0,
        n = 0,
        r = 0,
        o = 0
      if (null == e || '' == e) return 0
      for (o = e.length, t = 0; t < o; t++)
        (r = e.charCodeAt(t)), (n += r < 127 ? 1 : 2)
      return n
    },
    sb_strlen: function(e) {
      return this.getChars(e)
    },
    sb_substr: function(e, t, n) {
      var r = 0,
        o = 0,
        i = 0,
        a = '',
        s = e.length,
        u = this.sb_strlen(e)
      for (
        t < 0 && (t = u + t), n < 1 && (n = u + n), r = 0;
        r < s && !(o >= t);
        r++
      ) {
        var i = e.charCodeAt(r)
        o += i < 127 ? 1 : 2
      }
      for (r = r; r < s; r++) {
        var i = e.charCodeAt(r)
        if (((o += i < 127 ? 1 : 2), (a += e.charAt(r)), o >= n)) break
      }
      return a
    },
    isHighDPI: function() {
      return ua.isUCU4
        ? document.documentElement.clientWidth > 480 ||
            screen.width * window.devicePixelRatio >= 640 ||
            window.devicePixelRatio >= 2
        : document.documentElement.clientWidth > 480 ||
            screen.width >= 640 ||
            window.devicePixelRatio >= 2
    },
    calcDistance: function(e) {
      function t(e) {
        return (e * r) / 180
      }
      var n = 6378137,
        r = Math.PI
      e = e || {}
      var o = t(e.lat1),
        i = t(e.lat2),
        a = t(e.lng1),
        s = t(e.lng2),
        u = o - i,
        c = a - s,
        l =
          2 *
          Math.asin(
            Math.sqrt(
              Math.pow(Math.sin(u / 2), 2) +
                Math.cos(o) * Math.cos(i) * Math.pow(Math.sin(c / 2), 2)
            )
          )
      return (l *= n), (l = Math.round(1e4 * l) / 1e4 / 1e3)
    },
    getCookie: function(e) {
      var t = document.cookie
      if (((name = e + '='), (start = t.indexOf(name)), start < 0)) return null
      start += name.length
      var n = t.indexOf(';', start)
      return (n = n == -1 ? t.length : n), t.substring(start, n)
    },
    html_encode: function(e) {
      return (
        (e = e || ''),
        (e = e.replace(/\xb7/g, '&middot;')),
        (e = e.replace(/&/g, '&amp;')),
        (e = e.replace(/'/g, '&#39;')),
        (e = e.replace(/"/g, '&quot;')),
        (e = e.replace(/</g, '&lt;')),
        (e = e.replace(/>/g, '&gt;')),
        (e = e.replace(/\s/g, '&nbsp;'))
      )
    },
    html_decode: function(e) {
      return (
        (e = e || ''),
        (e = e.replace(/&middot;/g, '\xb7')),
        (e = e.replace(/&amp;/g, '&')),
        (e = e.replace(/&#39;/g, "'")),
        (e = e.replace(/&quot;/g, '"')),
        (e = e.replace(/&lt;/g, '<')),
        (e = e.replace(/&gt;/g, '>')),
        (e = e.replace(/&nbsp;/g, ' '))
      )
    },
    fixURLEncoder: function(e) {
      return e.replace(/\+/g, '%20').replace(/%(?:7E|21|27|28|29)/gi, unescape)
    },
    query2LowerCase: function(e) {
      return Object.keys(e).reduce(function(t, n) {
        return (t[n.toLowerCase()] = e[n]), t
      }, {})
    },
    img2Cdn: function(e) {
      if (!e) return ''
      var t = e.url,
        n = e.width,
        r = e.height,
        o = e.isOrigin,
        i = +e.maxQ || 75,
        a = +e.minQ || 30,
        s = e.isWiFi,
        u = e.cut,
        c = e.sharpen,
        l = e.env || l,
        f = ['_']
      return o
        ? ('waptest' === l ? '//gw.daily.taobaocdn.net/' : '//gw.alicdn.com/') +
            t
        : (n > 0 && (r > 0 || (r = n), f.push(n + 'x' + r)),
          u && f.push(u),
          f.push(s ? 'Q' + i : 'Q' + a),
          c && f.push('s' + c),
          f.push('.jpg'),
          this.imgHash2Cdn(t, f.join(''), l))
    }
  }
module.exports = i
