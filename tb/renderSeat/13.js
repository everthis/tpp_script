const first = require('./1')
const tenth = require('./10')
function thriteen(e, t, n) {
  'use strict'
  function r(e) {
    return e && e.__esModule
      ? e
      : {
          default: e
        }
  }
  function o(e) {
    if (Array.isArray(e)) {
      for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]
      return n
    }
    return Array.from(e)
  }
  function i(e) {
    return function(t) {
      return {}.toString.call(t) === '[object ' + e + ']'
    }
  }
  function a(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 8,
      n = 60 * e.getTimezoneOffset() * 1e3,
      r = +e + n
    return new Date(r + 60 * t * 60 * 1e3)
  }
  function s(e) {
    var t = void 0,
      n = void 0
    return (
      b(e)
        ? (t = e.getTime())
        : isNaN(e)
          ? (t = (e || '').replace(/-/g, '/'))
          : ((e += ''),
            (n = (+new Date() + '').length - e.length),
            n &&
              (e += Array.apply(
                void 0,
                o({
                  length: n
                })
              )
                .map(function() {
                  return 0
                })
                .join('')),
            (t = +e)),
      a(new Date(t))
    )
  }
  function u(e, t) {
    var n = ''
    e = s(e)
    var r = e.getFullYear()
    if (!r) return n
    var o = e.getMonth() + 1
    o >= 10 || (o = '0' + o)
    var i = e.getDate()
    i >= 10 || (i = '0' + i)
    var a = e.getHours()
    a >= 10 || (a = '0' + a)
    var u = e.getMinutes()
    u >= 10 || (u = '0' + u)
    var c = e.getSeconds()
    switch ((c >= 10 || (c = '0' + c), t)) {
      case 'MM-DD HH:mm':
        n = o + '-' + i + ' ' + a + ':' + u
        break
      case 'M\u6708D\u65e5 HH:mm':
        n = o + '\u6708' + i + '\u65e5 ' + a + ':' + u
        break
      case 'YYYY-MM-DD HH:mm':
        n = r + '-' + o + '-' + i + ' ' + a + ':' + u
        break
      case 'YYYY-MM-DD':
        n = r + '-' + o + '-' + i
        break
      default:
        n = r + '-' + o + '-' + i + ' ' + a + ':' + u + ':' + c
    }
    return n
  }
  function c(e) {
    var t = void 0,
      n = void 0
    y(e) ? ((t = e.num), (n = e.map0)) : (t = e)
    var r = +t || 0,
      o = 1e8,
      i = 1e4
    return (
      t >= i &&
        (t >= o
          ? (r = (10 * (t / o).toFixed(1)) / 10 + '\u4ebf')
          : ((r = (10 * (t / i).toFixed(1)) / 10),
            r === i ? (r = '1\u4ebf') : (r += '\u4e07'))),
      0 === r && n && (r = n),
      r
    )
  }
  function l(e, t) {
    var n = s(t),
      r = n.getTime()
    r || ((n = new Date()), (r = n.getTime()))
    var o = s(e),
      i = o.getTime(),
      a = ~~((r - i) / 1e3),
      c = 3600,
      l = '',
      f = void 0,
      d = void 0
    return (
      a < 60
        ? (l = '\u521a\u521a')
        : a >= 60 && a < c
          ? (l = ~~(a / 60) + '\u5206\u949f\u524d')
          : a >= c && a <= 12 * c
            ? (l = ~~(a / c) + '\u5c0f\u65f6\u524d')
            : ((f = n.getFullYear()),
              (d = Date.parse(f + '/01/01')),
              (l = i >= d ? u(o, 'MM-DD HH:mm') : u(o, 'YYYY-MM-DD HH:mm'))),
      l
    )
  }
  function f(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2
    return (e = +e || 0), (e = 1 * (e / 100).toFixed(t))
  }
  function d() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
      t =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : '720x720',
      n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
    if ('string' != typeof e) return ''
    var r = e
      .split('.')
      .pop()
      .trim()
      .toLowerCase()
    return 'gif' === r
      ? m['default'].imgHash2Cdn(e, '', '', !1)
      : 'png' === r
        ? m['default'].imgHash2Cdn(e, '', '')
        : m['default'].imgHash2Cdn(
            e,
            '_' + t + (n ? 'Q75' : 'Q30s100') + '.jpg'
          )
  }
  function p() {
    return (
      g['default'].isAP || /^https?:\/\/68687093/g.test(window.location.href)
    )
  }
  ;(t.numComma = t.touchActive = void 0),
    (t.displayNum = c),
    (t.displayTime = l),
    (t.displayPrice = f),
    (t.getImgUrl = d),
    (t.hasNativeNav = p)
  var h = tenth,
    m = r(h),
    v = first,
    g = r(v),
    y = i('Object'),
    b = i('Date')
  ;(t.touchActive = function(e) {
    e = e || {}
    var t = void 0,
      n = !1,
      r = e.activeClass || 'touch-hover',
      o = e.lockTime || 1e3,
      i = e.rootSelector || '#root',
      a = e.touchSelector || '[data-touch="yes"]',
      s = function(e) {
        var i = e.currentTarget
        n ||
          ((i.className = i.className + ' ' + r),
          (t = setTimeout(function() {
            i.className = i.className.replace(r, '')
          }, o)))
      },
      u = function(e) {
        var o = e.currentTarget
        ;(o.className = o.className.replace(r, '')), clearTimeout(t), (n = !1)
      },
      c = function(e) {
        ;(n = !0), u(e)
      }
    $(i)
      .on('touchstart', a, s)
      .on('touchmove', a, c)
      .on('touchend', a, u)
      .on('touchcancel', a, u)
  }),
    (t.numComma = function(e) {
      return (
        e &&
        !isNaN(e) &&
        parseInt(e, 10)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      )
    })
  return t
}

module.exports = thriteen
