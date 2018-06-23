var n = (function() {
  function e(e) {
    return null == e ? String(e) : k[j.call(e)] || 'object'
  }
  function t(t) {
    return 'function' == e(t)
  }
  function n(e) {
    return null != e && e == e.window
  }
  function r(e) {
    return null != e && e.nodeType == e.DOCUMENT_NODE
  }
  function o(t) {
    return 'object' == e(t)
  }
  function i(e) {
    return o(e) && !n(e) && Object.getPrototypeOf(e) == Object.prototype
  }
  function a(e) {
    return 'number' == typeof e.length
  }
  function s(e) {
    return x.call(e, function(e) {
      return null != e
    })
  }
  function u(e) {
    return e.length > 0 ? y.fn.concat.apply([], e) : e
  }
  function c(e) {
    return e in C ? C[e] : (C[e] = new RegExp('(^|\\s)' + e + '(\\s|$)'))
  }
  function l(e) {
    return 'children' in e
      ? S.call(e.children)
      : y.map(e.childNodes, function(e) {
          if (1 == e.nodeType) return e
        })
  }
  function f(e, t) {
    return null == t ? y(e) : y(e).filter(t)
  }
  function d(e, n, r, o) {
    return t(n) ? n.call(e, r, o) : n
  }
  function p(e, t, n) {
    null == n ? e.removeAttribute(t) : e.setAttribute(t, n)
  }
  function h(e, t) {
    var n = e.className,
      r = n && n.baseVal !== v
    return t === v
      ? r
        ? n.baseVal
        : n
      : void (r ? (n.baseVal = t) : (e.className = t))
  }
  function m(e) {
    var t
    try {
      return e
        ? 'true' == e ||
            ('false' != e &&
              ('null' == e
                ? null
                : /^0/.test(e) || isNaN((t = Number(e)))
                  ? /^[\[\{]/.test(e)
                    ? y.parseJSON(e)
                    : e
                  : t))
        : e
    } catch (n) {
      return e
    }
  }
  var v,
    g,
    y,
    b,
    _,
    w,
    O = [],
    S = O.slice,
    x = O.filter,
    P = window,
    T = P.document,
    E = {},
    C = {},
    A = /^\s*<(\w+|!)[^>]*>/,
    k = {},
    j = k.toString,
    M = {},
    L = Array.isArray
  return (
    (M.matches = function(e, t) {
      var n = T.createElement('div')
      if (!t || !e || 1 !== e.nodeType) return !1
      var r = e.webkitMatchesSelector || e.matchesSelector
      if (r) return r.call(e, t)
      var o,
        i = e.parentNode,
        a = !i
      return (
        a && (i = n).appendChild(e),
        (o = ~M.qsa(i, t).indexOf(e)),
        a && n.removeChild(e),
        o
      )
    }),
    (_ = function(e) {
      return e.replace(/-+(.)?/g, function(e, t) {
        return t ? t.toUpperCase() : ''
      })
    }),
    (w = function(e) {
      return x.call(e, function(t, n) {
        return e.indexOf(t) == n
      })
    }),
    (M.fragment = function(e, t) {
      var n,
        r,
        o = T.createElement('table'),
        i = T.createElement('tr'),
        a = {
          tr: T.createElement('tbody'),
          tbody: o,
          thead: o,
          tfoot: o,
          td: i,
          th: i,
          '*': T.createElement('div')
        },
        s = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        u = /^<(\w+)\s*\/?>(?:<\/\1>|)$/
      return (
        u.test(e) && (n = y(T.createElement(RegExp.$1))),
        n ||
          (e.replace && (e = e.replace(s, '<$1></$2>')),
          t === v && (t = A.test(e) && RegExp.$1),
          t in a || (t = '*'),
          (r = a[t]),
          (r.innerHTML = '' + e),
          (n = y.each(S.call(r.childNodes), function() {
            r.removeChild(this)
          }))),
        n
      )
    }),
    (M.Z = function(e, t) {
      return (e = e || []), (e.__proto__ = y.fn), (e.selector = t || ''), e
    }),
    (M.isZ = function(e) {
      return e instanceof M.Z
    }),
    (M.init = function(e, n) {
      var r
      if (!e) return M.Z()
      if ('string' == typeof e)
        if (((e = e.trim()), '<' == e[0] && A.test(e)))
          (r = M.fragment(e, RegExp.$1, n)), (e = null)
        else {
          if (n !== v) return y(n).find(e)
          r = M.qsa(T, e)
        }
      else {
        if (t(e)) return y(T).ready(e)
        if (M.isZ(e)) return e
        if (L(e)) r = s(e)
        else if (o(e)) (r = [e]), (e = null)
        else if (A.test(e)) (r = M.fragment(e.trim(), RegExp.$1, n)), (e = null)
        else {
          if (n !== v) return y(n).find(e)
          r = M.qsa(T, e)
        }
      }
      return M.Z(r, e)
    }),
    (y = function(e, t) {
      return M.init(e, t)
    }),
    (y.extend = function(e) {
      var t,
        n = function(e, t, r) {
          for (g in t)
            r && (i(t[g]) || L(t[g]))
              ? (i(t[g]) && !i(e[g]) && (e[g] = {}),
                L(t[g]) && !L(e[g]) && (e[g] = []),
                n(e[g], t[g], r))
              : t[g] !== v && (e[g] = t[g])
        },
        r = S.call(arguments, 1)
      return (
        'boolean' == typeof e && ((t = e), (e = r.shift())),
        r.forEach(function(r) {
          n(e, r, t)
        }),
        e
      )
    }),
    (M.qsa = function(e, t) {
      var n,
        o = '#' == t[0],
        i = !o && '.' == t[0],
        a = o || i ? t.slice(1) : t,
        s = /^[\w-]*$/.test(a)
      return r(e) && s && o
        ? (n = e.getElementById(a))
          ? [n]
          : []
        : 1 !== e.nodeType && 9 !== e.nodeType
          ? []
          : S.call(
              s && !o
                ? i
                  ? e.getElementsByClassName(a)
                  : e.getElementsByTagName(t)
                : e.querySelectorAll(t)
            )
    }),
    (y.contains = function(e, t) {
      return e !== t && e.contains(t)
    }),
    (y.type = e),
    (y.isFunction = t),
    (y.isWindow = n),
    (y.isArray = L),
    (y.isPlainObject = i),
    (y.camelCase = _),
    (y.trim = function(e) {
      return null == e ? '' : String.prototype.trim.call(e)
    }),
    (y.uuid = 0),
    (y.support = {}),
    (y.expr = {}),
    (y.map = function(e, t) {
      var n,
        r,
        o,
        i = []
      if (a(e))
        for (r = 0; r < e.length; r++) (n = t(e[r], r)), null != n && i.push(n)
      else for (o in e) (n = t(e[o], o)), null != n && i.push(n)
      return u(i)
    }),
    (y.each = function(e, t) {
      var n, r
      if (a(e)) {
        for (n = 0; n < e.length; n++)
          if (t.call(e[n], n, e[n]) === !1) return e
      } else for (r in e) if (t.call(e[r], r, e[r]) === !1) return e
      return e
    }),
    (y.parseJSON = JSON.parse),
    y.each(
      'Boolean Number String Function Array Date RegExp Object Error'.split(
        ' '
      ),
      function(e, t) {
        k['[object ' + t + ']'] = t.toLowerCase()
      }
    ),
    (y.fn = {
      forEach: O.forEach,
      reduce: O.reduce,
      push: O.push,
      sort: O.sort,
      indexOf: O.indexOf,
      concat: O.concat,
      map: function(e) {
        return y(
          y.map(this, function(t, n) {
            return e.call(t, n, t)
          })
        )
      },
      slice: function() {
        return y(S.apply(this, arguments))
      },
      ready: function(e) {
        var t = /complete|loaded|interactive/
        return (
          t.test(T.readyState)
            ? e(y)
            : T.addEventListener(
                'DOMContentLoaded',
                function() {
                  e(y)
                },
                !1
              ),
          this
        )
      },
      get: function(e) {
        return e === v ? S.call(this) : this[e >= 0 ? e : e + this.length]
      },
      toArray: function() {
        return this.get()
      },
      size: function() {
        return this.length
      },
      remove: function() {
        return this.each(function() {
          null != this.parentNode && this.parentNode.removeChild(this)
        })
      },
      each: function(e) {
        return (
          O.every.call(this, function(t, n) {
            return e.call(t, n, t) !== !1
          }),
          this
        )
      },
      filter: function(e) {
        return t(e)
          ? this.not(this.not(e))
          : y(
              x.call(this, function(t) {
                return M.matches(t, e)
              })
            )
      },
      add: function(e, t) {
        return y(w(this.concat(y(e, t))))
      },
      is: function(e) {
        return this.length > 0 && M.matches(this[0], e)
      },
      not: function(e) {
        var n = []
        if (t(e) && e.call !== v)
          this.each(function(t) {
            e.call(this, t) || n.push(this)
          })
        else {
          var r =
            'string' == typeof e
              ? this.filter(e)
              : a(e) && t(e.item)
                ? S.call(e)
                : y(e)
          this.forEach(function(e) {
            r.indexOf(e) < 0 && n.push(e)
          })
        }
        return y(n)
      },
      has: function(e) {
        return this.filter(function() {
          return o(e)
            ? y.contains(this, e)
            : y(this)
                .find(e)
                .size()
        })
      },
      eq: function(e) {
        return e === -1 ? this.slice(e) : this.slice(e, +e + 1)
      },
      first: function() {
        var e = this[0]
        return e && !o(e) ? e : y(e)
      },
      last: function() {
        var e = this[this.length - 1]
        return e && !o(e) ? e : y(e)
      },
      find: function(e) {
        var t,
          n = this
        return (t =
          'object' == typeof e
            ? y(e).filter(function() {
                var e = this
                return O.some.call(n, function(t) {
                  return y.contains(t, e)
                })
              })
            : 1 == this.length
              ? y(M.qsa(this[0], e))
              : this.map(function() {
                  return M.qsa(this, e)
                }))
      },
      closest: function(e, t) {
        var n = [],
          o = 'object' == typeof e && y(e)
        return (
          this.each(function(i, a) {
            for (; a && !(o ? o.indexOf(a) >= 0 : M.matches(a, e)); )
              a = a !== t && !r(a) && a.parentNode
            a && n.indexOf(a) < 0 && n.push(a)
          }),
          y(n)
        )
      },
      parents: function(e) {
        for (var t = [], n = this; n.length > 0; )
          n = y.map(n, function(e) {
            if ((e = e.parentNode) && !r(e) && t.indexOf(e) < 0)
              return t.push(e), e
          })
        return f(t, e)
      },
      parent: function(e) {
        return f(w(this.pluck('parentNode')), e)
      },
      children: function(e) {
        return f(
          this.map(function() {
            return l(this)
          }),
          e
        )
      },
      siblings: function(e) {
        return f(
          this.map(function(e, t) {
            return x.call(l(t.parentNode), function(e) {
              return e !== t
            })
          }),
          e
        )
      },
      pluck: function(e) {
        return y.map(this, function(t) {
          return t[e]
        })
      },
      show: function() {
        var e = function(e) {
          return getComputedStyle(e, '').getPropertyValue('display')
        }
        return this.each(function() {
          if (
            ('none' == this.style.display && (this.style.display = ''),
            'none' == e(this))
          ) {
            var t = function(t) {
              var n, r
              return (
                E[t] ||
                  ((n = T.createElement(t)),
                  T.body.appendChild(n),
                  (r = e(n)),
                  n.parentNode.removeChild(n),
                  'none' == r && (r = 'block'),
                  (E[t] = r)),
                E[t]
              )
            }
            this.style.display = t(this.nodeName)
          }
        })
      },
      replaceWith: function(e) {
        return this.before(e).remove()
      },
      clone: function() {
        return this.map(function() {
          return this.cloneNode(!0)
        })
      },
      hide: function() {
        return this.css('display', 'none')
      },
      toggle: function(e) {
        return this.each(function() {
          var t = y(this)
          ;(e === v ? 'none' == t.css('display') : e) ? t.show() : t.hide()
        })
      },
      prev: function(e) {
        return y(this.pluck('previousElementSibling')).filter(e || '*')
      },
      next: function(e) {
        return y(this.pluck('nextElementSibling')).filter(e || '*')
      },
      html: function(e) {
        return 0 === arguments.length
          ? this.length > 0
            ? this[0].innerHTML
            : null
          : this.each(function(t) {
              var n = this.innerHTML
              ;(this.innerHTML = ''), y(this).append(d(this, e, t, n))
            })
      },
      text: function(e) {
        return 0 === arguments.length
          ? this.length > 0
            ? this[0].textContent
            : null
          : this.each(function() {
              this.textContent = e === v ? '' : '' + e
            })
      },
      attr: function(e, t) {
        var n
        return 'string' == typeof e && t === v
          ? 0 == this.length || 1 !== this[0].nodeType
            ? v
            : 'value' == e && 'INPUT' == this[0].nodeName
              ? this.val()
              : !(n = this[0].getAttribute(e)) && e in this[0]
                ? this[0][e]
                : n
          : this.each(function(n) {
              if (1 === this.nodeType)
                if (o(e)) for (g in e) p(this, g, e[g])
                else p(this, e, d(this, t, n, this.getAttribute(e)))
            })
      },
      removeAttr: function(e) {
        return this.each(function() {
          1 === this.nodeType && p(this, e)
        })
      },
      data: function(e, t) {
        var n = /([A-Z])/g,
          r = this.attr('data-' + e.replace(n, '-$1').toLowerCase(), t)
        return null !== r ? m(r) : v
      },
      val: function(e) {
        return 0 === arguments.length
          ? this[0] &&
              (this[0].multiple
                ? y(this[0])
                    .find('option')
                    .filter(function() {
                      return this.selected
                    })
                    .pluck('value')
                : this[0].value)
          : this.each(function(t) {
              this.value = d(this, e, t, this.value)
            })
      },
      offset: function() {
        if (0 == this.length) return null
        var e = this[0].getBoundingClientRect()
        return {
          left: e.left + P.pageXOffset,
          top: e.top + P.pageYOffset,
          width: Math.round(e.width),
          height: Math.round(e.height)
        }
      },
      css: function(t, n) {
        var r = function(e, t) {
            var n = {
              'column-count': 1,
              columns: 1,
              'font-weight': 1,
              'line-height': 1,
              opacity: 1,
              'z-index': 1,
              zoom: 1
            }
            return 'number' != typeof t || n[o(e)] ? t : t + 'px'
          },
          o = function(e) {
            return e
              .replace(/::/g, '/')
              .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
              .replace(/([a-z\d])([A-Z])/g, '$1_$2')
              .replace(/_/g, '-')
              .toLowerCase()
          }
        if (arguments.length < 2) {
          var i = this[0]
          if (!i) return
          var a = getComputedStyle(i, '')
          if ('string' == typeof t)
            return i.style[_(t)] || a.getPropertyValue(t)
          if (L(t)) {
            var s = {}
            return (
              y.each(L(t) ? t : [t], function(e, t) {
                s[t] = i.style[_(t)] || a.getPropertyValue(t)
              }),
              s
            )
          }
        }
        var u = ''
        if ('string' == e(t))
          n || 0 === n
            ? (u = o(t) + ':' + r(t, n))
            : this.each(function() {
                this.style.removeProperty(o(t))
              })
        else
          for (g in t)
            t[g] || 0 === t[g]
              ? (u += o(g) + ':' + r(g, t[g]) + ';')
              : this.each(function() {
                  this.style.removeProperty(o(g))
                })
        return this.each(function() {
          this.style.cssText += ';' + u
        })
      },
      index: function(e) {
        return e
          ? this.indexOf(y(e)[0])
          : this.parent()
              .children()
              .indexOf(this[0])
      },
      hasClass: function(e) {
        return (
          !!e &&
          O.some.call(
            this,
            function(e) {
              return this.test(h(e))
            },
            c(e)
          )
        )
      },
      addClass: function(e) {
        return e
          ? this.each(function(t) {
              b = []
              var n = h(this),
                r = d(this, e, t, n)
              r.split(/\s+/g).forEach(function(e) {
                y(this).hasClass(e) || b.push(e)
              }, this),
                b.length && h(this, n + (n ? ' ' : '') + b.join(' '))
            })
          : this
      },
      removeClass: function(e) {
        return this.each(function(t) {
          return e === v
            ? h(this, '')
            : ((b = h(this)),
              d(this, e, t, b)
                .split(/\s+/g)
                .forEach(function(e) {
                  b = b.replace(c(e), ' ')
                }),
              void h(this, b.trim()))
        })
      },
      toggleClass: function(e, t) {
        return e
          ? this.each(function(n) {
              var r = y(this),
                o = d(this, e, n, h(this))
              o.split(/\s+/g).forEach(function(e) {
                ;(t === v
                ? !r.hasClass(e)
                : t)
                  ? r.addClass(e)
                  : r.removeClass(e)
              })
            })
          : this
      },
      scrollTop: function(e) {
        if (this.length) {
          var t = 'scrollTop' in this[0]
          return e === v
            ? t
              ? this[0].scrollTop
              : this[0].pageYOffset
            : this.each(
                t
                  ? function() {
                      this.scrollTop = e
                    }
                  : function() {
                      this.scrollTo(this.scrollX, e)
                    }
              )
        }
      }
    }),
    (y.fn.detach = y.fn.remove),
    ['width', 'height'].forEach(function(e) {
      var t = e.replace(/./, function(e) {
        return e[0].toUpperCase()
      })
      y.fn[e] = function(o) {
        var i,
          a = this[0]
        return o === v
          ? n(a)
            ? a['inner' + t]
            : r(a)
              ? a.documentElement['scroll' + t]
              : (i = this.offset()) && i[e]
          : this.each(function(t) {
              ;(a = y(this)), a.css(e, d(this, o, t, a[e]()))
            })
      }
    }),
    ['after', 'prepend', 'before', 'append'].forEach(function(t, n) {
      var r = n % 2
      ;(y.fn[t] = function() {
        var t,
          o,
          i = y.map(arguments, function(n) {
            return (
              (t = e(n)),
              'object' == t || 'array' == t || null == n ? n : M.fragment(n)
            )
          }),
          a = this.length > 1
        return i.length < 1
          ? this
          : this.each(function(e, t) {
              ;(o = r ? t : t.parentNode),
                (t =
                  0 == n
                    ? t.nextSibling
                    : 1 == n
                      ? t.firstChild
                      : 2 == n
                        ? t
                        : null)
              var s = function(e, t) {
                t(e)
                for (var n in e.childNodes) s(e.childNodes[n], t)
              }
              i.forEach(function(e) {
                if (a) e = e.cloneNode(!0)
                else if (!o) return y(e).remove()
                s(o.insertBefore(e, t), function(e) {
                  null == e.nodeName ||
                    'SCRIPT' !== e.nodeName.toUpperCase() ||
                    (e.type && 'text/javascript' !== e.type) ||
                    e.src ||
                    P.eval.call(P, e.innerHTML)
                })
              })
            })
      }),
        (y.fn[r ? t + 'To' : 'insert' + (n ? 'Before' : 'After')] = function(
          e
        ) {
          return y(e)[t](this), this
        })
    }),
    (M.Z.prototype = y.fn),
    (M.uniq = w),
    (M.deserializeValue = m),
    (y.zepto = y.yocto = M),
    y
  )
})()
module.exports = n
