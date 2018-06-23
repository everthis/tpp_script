'use strict'
const threeNine = require('./39')
function n(t) {
  if (Array.isArray(t)) {
    for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e]
    return i
  }
  return Array.from(t)
}

var r =
    'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
      ? function(t) {
          return typeof t
        }
      : function(t) {
          return t &&
            'function' == typeof Symbol &&
            t.constructor === Symbol &&
            t !== Symbol.prototype
            ? 'symbol'
            : typeof t
        },
  a = threeNine,
  o = function(t) {
    var e = !1,
      i = void 0
    return function() {
      return e ? i : ((e = !0), (i = t.apply(this, arguments)), (t = null), i)
    }
  },
  s = {
    on: function(t, e, i) {
      if (!l(this, 'on', t, [e, i]) || !e) return this
      this._events || (this._events = {})
      var n = this._events[t] || (this._events[t] = [])
      return (
        n.push({
          callback: e,
          context: i,
          ctx: i || this
        }),
        this
      )
    },
    once: function h(t, e, i) {
      if (!l(this, 'once', t, [e, i]) || !e) return this
      var n = this,
        h = o(function() {
          n.off(t, h), e.apply(this, arguments)
        })
      return (h._callback = e), this.on(t, h, i)
    },
    off: function(t, e, i) {
      if (!this._events || !l(this, 'off', t, [e, i])) return this
      if (!t && !e && !i) return (this._events = void 0), this
      for (
        var n = t ? [t] : Object.keys(this._events), r = 0, a = n.length;
        r < a;
        r++
      ) {
        t = n[r]
        var o = this._events[t]
        if (o)
          if (e || i) {
            for (var s = [], c = 0, u = o.length; c < u; c++) {
              var h = o[c]
              ;((e && e !== h.callback && e !== h.callback._callback) ||
                (i && i !== h.context)) &&
                s.push(h)
            }
            s.length ? (this._events[t] = s) : delete this._events[t]
          } else delete this._events[t]
      }
      return this
    },
    trigger: function(t) {
      if (!this._events) return this
      var e = Array.prototype.slice.call(arguments, 1)
      if (!l(this, 'trigger', t, e)) return this
      var i = this._events[t],
        n = this._events.all
      return i && u(i, e), n && u(n, arguments), this
    },
    listenTo: function(t, e, i) {
      var n = this._listeningTo || (this._listeningTo = {}),
        o = t._listenId || (t._listenId = a.guid('l'))
      return (
        (n[o] = t),
        i ||
          'object' !== ('undefined' == typeof e ? 'undefined' : r(e)) ||
          (i = this),
        t.on(e, i, this),
        this
      )
    },
    listenToOnce: function(t, e, i) {
      if ('object' === ('undefined' == typeof e ? 'undefined' : r(e))) {
        for (var n in e) this.listenToOnce(t, n, e[n])
        return this
      }
      var a = o(function() {
        this.stopListening(t, e, a), i.apply(this, arguments)
      })
      return (a._callback = i), this.listenTo(t, e, a)
    },
    stopListening: function(t, e, i) {
      var n = this._listeningTo
      if (!n) return this
      var o = !e && !i
      i ||
        'object' !== ('undefined' == typeof e ? 'undefined' : r(e)) ||
        (i = this),
        t && ((n = {})[t._listenId] = t)
      for (var s in n)
        (t = n[s]),
          t.off(e, i, this),
          (o || a.isEmpty(t._events)) && delete this._listeningTo[s]
      return this
    }
  },
  c = /\s+/,
  l = function(t, e, i, a) {
    if (!i) return !0
    if ('object' === ('undefined' == typeof i ? 'undefined' : r(i))) {
      for (var o in i) t[e].apply(t, n([o, i[o]].concat(a)))
      return !1
    }
    if (c.test(i)) {
      for (var s = i.split(c), l = 0, u = s.length; l < u; l++)
        t[e].apply(t, n([s[l]].concat(a)))
      return !1
    }
    return !0
  },
  u = function(t, e) {
    var i = void 0,
      n = -1,
      r = t.length,
      a = e[0],
      o = e[1],
      s = e[2]
    switch (e.length) {
      case 0:
        for (; ++n < r; ) (i = t[n]).callback.call(i.ctx)
        return
      case 1:
        for (; ++n < r; ) (i = t[n]).callback.call(i.ctx, a)
        return
      case 2:
        for (; ++n < r; ) (i = t[n]).callback.call(i.ctx, a, o)
        return
      case 3:
        for (; ++n < r; ) (i = t[n]).callback.call(i.ctx, a, o, s)
        return
      default:
        for (; ++n < r; ) (i = t[n]).callback.apply(i.ctx, e)
    }
  }
module.exports = s
