'use strict'
function i() {}
function n(t, e) {
  var n = void 0
  return (
    Object.create ? (n = Object.create(t)) : ((i.prototype = t), (n = new i())),
    (n.constructor = e),
    n
  )
}
function r(t, e) {
  if (t) {
    if (t.nodeType) return [t]
    var e = e && e.nodeType ? e : document
    return t && 'string' == typeof t ? e.querySelectorAll(t) : void 0
  }
}

for (
  var a = /\\?\{([^{}]+)\}/g,
    o = '',
    s = /^[\s\xa0]+|[\s\xa0]+$/g,
    c = String.prototype.trim,
    l = c
      ? function(t) {
          return null == t ? o : c.call(t)
        }
      : function(t) {
          return null == t ? o : (t + '').replace(s, o)
        },
    u = 0,
    h = function m(t) {
      var e = t.offsetTop
      return null != t.offsetParent && (e += m(t.offsetParent)), e
    },
    d = function v(t) {
      var e = t.offsetLeft
      return null != t.offsetParent && (e += v(t.offsetParent)), e
    },
    f = {
      isObject: function(t) {
        return t === Object(t)
      },
      isArray:
        Array.isArray ||
        function(t) {
          return '[object Array]' === toString.call(t)
        },
      isEmpty: function(t) {
        if (null == t) return !0
        if (this.isArray(t) || this.isString(t)) return 0 === t.length
        for (var e in t) if (this.has(t, e)) return !1
        return !0
      },
      mix: function(t, e, i) {
        for (var n in e) t[n] = e[n]
        return t
      },
      extend: function(t, e, i, r) {
        if (!e || !t) return t
        var a = e.prototype,
          o = void 0
        return (
          (o = n(a, t)),
          (t.prototype = this.mix(o, t.prototype)),
          (t.superclass = n(a, e)),
          i && this.mix(o, i),
          r && this.mix(t, r),
          t
        )
      },
      startsWith: function(t, e) {
        return 0 === t.lastIndexOf(e, 0)
      },
      endsWith: function(t, e) {
        var i = t.length - e.length
        return i >= 0 && t.indexOf(e, i) === i
      },
      trim: l,
      substitute: function(t, e, i) {
        return 'string' == typeof t && e
          ? t.replace(i || a, function(t, i) {
              return '\\' === t.charAt(0)
                ? t.slice(1)
                : void 0 === e[i]
                  ? o
                  : e[i]
            })
          : t
      },
      vendor: (function() {
        for (
          var t = document.createElement('div').style,
            e = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
            i = void 0,
            n = 0,
            r = e.length;
          n < r;
          n++
        )
          if (((i = e[n] + 'ransform'), (i in t)))
            return e[n].substr(0, e[n].length - 1)
        return !1
      })(),
      prefixStyle: function(t) {
        return (
          this.vendor !== !1 &&
          ('' === this.vendor
            ? t
            : this.vendor + t.charAt(0).toUpperCase() + t.substr(1))
        )
      },
      hasClass: function(t, e) {
        return t && t.className && e && t.className.indexOf(e) != -1
      },
      addClass: function(t, e) {
        t && e && !this.hasClass(t, e) && (t.className += ' ' + e)
      },
      removeClass: function(t, e) {
        t && t.className && e && (t.className = t.className.replace(e, ''))
      },
      remove: function(t) {
        t && t.parentNode && t.parentNode.removeChild(t)
      },
      getOffsetTop: h,
      getOffsetLeft: d,
      findParentEl: function(t, e, i) {
        var n = null,
          r = null,
          a = /^#/.test(e) ? 'id' : /^\./.test(e) ? 'class' : 'tag',
          o = e.replace(/\.|#/g, '')
        if (
          (i && 'string' == typeof i && (i = document.querySelector(i)),
          (i = i || document.body),
          t && e)
        ) {
          if ('class' == a && t.className && t.className.match(o)) return t
          if ('id' == a && t.id && l(t.id) == o) return t
          if ('tag' == a && t.tagName.toLowerCase() == o) return t
          for (; !n && r != i && (r = t.parentNode); ) {
            if (
              ('class' == a && r.className && r.className.match(o)) ||
              ('id' == a && r.id && l(r.id) == o) ||
              ('tag' == a && r.tagName && r.tagName.toLowerCase() == o)
            )
              return (n = r)
            t = r
          }
          return null
        }
      },
      guid: function(t) {
        var e = ++u + ''
        return t ? t + e : e
      },
      isAndroid: function() {
        return /Android /.test(window.navigator.appVersion)
      },
      isBadAndroid: function() {
        return (
          /Android /.test(window.navigator.appVersion) &&
          !/Chrome\/\d/.test(window.navigator.appVersion)
        )
      },
      px2Num: function(t) {
        return Number(t.replace(/px/, ''))
      },
      getNodes: r,
      getNode: function(t, e) {
        var i = r(t, e)
        return i && i[0]
      },
      stringifyStyle: function(t) {
        var e = ''
        for (var i in t) e += [i, ':', t[i], ';'].join('')
        return e
      }
    },
    p = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'],
    g = 0;
  g < p.length;
  g++
)
  f['is' + p[g]] = function(t) {
    return toString.call(t) == '[object ' + p[g] + ']'
  }
module.exports = f
