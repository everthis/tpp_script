var n,
  r =
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
        }
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
// !(function(a, o, s, c) {
var a = window
var o = document
var c = undefined
;('use strict')
function l(t, e, i) {
  return setTimeout(p(t, i), e)
}
function u(t, e, i) {
  return !!Array.isArray(t) && (h(t, i[e], i), !0)
}
function h(t, e, i) {
  var n
  if (t)
    if (t.forEach) t.forEach(e, i)
    else if (t.length !== c)
      for (n = 0; n < t.length; ) e.call(i, t[n], n, t), n++
    else for (n in t) t.hasOwnProperty(n) && e.call(i, t[n], n, t)
}
function d(t, e, i) {
  var n = 'DEPRECATED METHOD: ' + e + '\n' + i + ' AT \n'
  return function() {
    var e = new Error('get-stack-trace'),
      i =
        e && e.stack
          ? e.stack
              .replace(/^[^\(]+?[\n$]/gm, '')
              .replace(/^\s+at\s+/gm, '')
              .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
          : 'Unknown Stack Trace',
      r = a.console && (a.console.warn || a.console.log)
    return r && r.call(a.console, n, i), t.apply(this, arguments)
  }
}
function f(t, e, i) {
  var n,
    r = e.prototype
  ;(n = t.prototype = Object.create(r)),
    (n.constructor = t),
    (n._super = r),
    i && mt(n, i)
}
function p(t, e) {
  return function() {
    return t.apply(e, arguments)
  }
}
function g(t, e) {
  return ('undefined' == typeof t ? 'undefined' : r(t)) == St
    ? t.apply(e ? e[0] || c : c, e)
    : t
}
function m(t, e) {
  return t === c ? e : t
}
function v(t, e, i) {
  h(w(e), function(e) {
    t.addEventListener(e, i, !1)
  })
}
function y(t, e, i) {
  h(w(e), function(e) {
    t.removeEventListener(e, i, !1)
  })
}
function S(t, e) {
  for (; t; ) {
    if (t == e) return !0
    t = t.parentNode
  }
  return !1
}
function C(t, e) {
  return t.indexOf(e) > -1
}
function w(t) {
  return t.trim().split(/\s+/g)
}
function x(t, e, i) {
  if (t.indexOf && !i) return t.indexOf(e)
  for (var n = 0; n < t.length; ) {
    if ((i && t[n][i] == e) || (!i && t[n] === e)) return n
    n++
  }
  return -1
}
function b(t) {
  return Array.prototype.slice.call(t, 0)
}
function I(t, e, i) {
  for (var n = [], r = [], a = 0; a < t.length; ) {
    var o = e ? t[a][e] : t[a]
    x(r, o) < 0 && n.push(t[a]), (r[a] = o), a++
  }
  return (
    i &&
      (n = e
        ? n.sort(function(t, i) {
            return t[e] > i[e]
          })
        : n.sort()),
    n
  )
}
function _(t, e) {
  for (var i, n, r = e[0].toUpperCase() + e.slice(1), a = 0; a < vt.length; ) {
    if (((i = vt[a]), (n = i ? i + r : e), n in t)) return n
    a++
  }
  return c
}
function T() {
  return _t++
}
function k(t) {
  var e = t.ownerDocument || t
  return e.defaultView || e.parentWindow || a
}
function A(t, e) {
  var i = this
  ;(this.manager = t),
    (this.callback = e),
    (this.element = t.element),
    (this.target = t.options.inputTarget),
    (this.domHandler = function(e) {
      g(t.options.enable, [t]) && i.handler(e)
    }),
    this.init()
}
function O(t) {
  var e,
    i = t.options.inputClass
  return new (e = i ? i : At ? U : Ot ? q : kt ? V : X)(t, P)
}
function P(t, e, i) {
  var n = i.pointers.length,
    r = i.changedPointers.length,
    a = e & Dt && n - r === 0,
    o = e & (Bt | Wt) && n - r === 0
  ;(i.isFirst = !!a),
    (i.isFinal = !!o),
    a && (t.session = {}),
    (i.eventType = e),
    L(t, i),
    t.emit('hammer.input', i),
    t.recognize(i),
    (t.session.prevInput = i)
}
function L(t, e) {
  var i = t.session,
    n = e.pointers,
    r = n.length
  i.firstInput || (i.firstInput = R(e)),
    r > 1 && !i.firstMultiple
      ? (i.firstMultiple = R(e))
      : 1 === r && (i.firstMultiple = !1)
  var a = i.firstInput,
    o = i.firstMultiple,
    s = o ? o.center : a.center,
    c = (e.center = D(n))
  ;(e.timeStamp = xt()),
    (e.deltaTime = e.timeStamp - a.timeStamp),
    (e.angle = H(s, c)),
    (e.distance = W(s, c)),
    M(i, e),
    (e.offsetDirection = B(e.deltaX, e.deltaY))
  var l = N(e.deltaTime, e.deltaX, e.deltaY)
  ;(e.overallVelocityX = l.x),
    (e.overallVelocityY = l.y),
    (e.overallVelocity = wt(l.x) > wt(l.y) ? l.x : l.y),
    (e.scale = o ? Y(o.pointers, n) : 1),
    (e.rotation = o ? j(o.pointers, n) : 0),
    (e.maxPointers = i.prevInput
      ? e.pointers.length > i.prevInput.maxPointers
        ? e.pointers.length
        : i.prevInput.maxPointers
      : e.pointers.length),
    E(i, e)
  var u = t.element
  S(e.srcEvent.target, u) && (u = e.srcEvent.target), (e.target = u)
}
function M(t, e) {
  var i = e.center,
    n = t.offsetDelta || {},
    r = t.prevDelta || {},
    a = t.prevInput || {}
  ;(e.eventType !== Dt && a.eventType !== Bt) ||
    ((r = t.prevDelta = {
      x: a.deltaX || 0,
      y: a.deltaY || 0
    }),
    (n = t.offsetDelta = {
      x: i.x,
      y: i.y
    })),
    (e.deltaX = r.x + (i.x - n.x)),
    (e.deltaY = r.y + (i.y - n.y))
}
function E(t, e) {
  var i,
    n,
    r,
    a,
    o = t.lastInterval || e,
    s = e.timeStamp - o.timeStamp
  if (e.eventType != Wt && (s > Rt || o.velocity === c)) {
    var l = e.deltaX - o.deltaX,
      u = e.deltaY - o.deltaY,
      h = N(s, l, u)
    ;(n = h.x),
      (r = h.y),
      (i = wt(h.x) > wt(h.y) ? h.x : h.y),
      (a = B(l, u)),
      (t.lastInterval = e)
  } else
    (i = o.velocity), (n = o.velocityX), (r = o.velocityY), (a = o.direction)
  ;(e.velocity = i), (e.velocityX = n), (e.velocityY = r), (e.direction = a)
}
function R(t) {
  for (var e = [], i = 0; i < t.pointers.length; )
    (e[i] = {
      clientX: Ct(t.pointers[i].clientX),
      clientY: Ct(t.pointers[i].clientY)
    }),
      i++
  return {
    timeStamp: xt(),
    pointers: e,
    center: D(e),
    deltaX: t.deltaX,
    deltaY: t.deltaY
  }
}
function D(t) {
  var e = t.length
  if (1 === e)
    return {
      x: Ct(t[0].clientX),
      y: Ct(t[0].clientY)
    }
  for (var i = 0, n = 0, r = 0; r < e; )
    (i += t[r].clientX), (n += t[r].clientY), r++
  return {
    x: Ct(i / e),
    y: Ct(n / e)
  }
}
function N(t, e, i) {
  return {
    x: e / t || 0,
    y: i / t || 0
  }
}
function B(t, e) {
  return t === e ? Ht : wt(t) >= wt(e) ? (t < 0 ? jt : Yt) : e < 0 ? Xt : Ut
}
function W(t, e, i) {
  i || (i = Kt)
  var n = e[i[0]] - t[i[0]],
    r = e[i[1]] - t[i[1]]
  return Math.sqrt(n * n + r * r)
}
function H(t, e, i) {
  i || (i = Kt)
  var n = e[i[0]] - t[i[0]],
    r = e[i[1]] - t[i[1]]
  return (180 * Math.atan2(r, n)) / Math.PI
}
function j(t, e) {
  return H(e[1], e[0], Vt) + H(t[1], t[0], Vt)
}
function Y(t, e) {
  return W(e[0], e[1], Vt) / W(t[0], t[1], Vt)
}
function X() {
  ;(this.evEl = Jt),
    (this.evWin = Gt),
    (this.pressed = !1),
    A.apply(this, arguments)
}
function U() {
  ;(this.evEl = te),
    (this.evWin = ee),
    A.apply(this, arguments),
    (this.store = this.manager.session.pointerEvents = [])
}
function z() {
  ;(this.evTarget = ne),
    (this.evWin = re),
    (this.started = !1),
    A.apply(this, arguments)
}
function F(t, e) {
  var i = b(t.touches),
    n = b(t.changedTouches)
  return e & (Bt | Wt) && (i = I(i.concat(n), 'identifier', !0)), [i, n]
}
function q() {
  ;(this.evTarget = oe), (this.targetIds = {}), A.apply(this, arguments)
}
function K(t, e) {
  var i = b(t.touches),
    n = this.targetIds
  if (e & (Dt | Nt) && 1 === i.length) return (n[i[0].identifier] = !0), [i, i]
  var r,
    a,
    o = b(t.changedTouches),
    s = [],
    c = this.target
  if (
    ((a = i.filter(function(t) {
      return S(t.target, c)
    })),
    e === Dt)
  )
    for (r = 0; r < a.length; ) (n[a[r].identifier] = !0), r++
  for (r = 0; r < o.length; )
    n[o[r].identifier] && s.push(o[r]),
      e & (Bt | Wt) && delete n[o[r].identifier],
      r++
  return s.length ? [I(a.concat(s), 'identifier', !0), s] : void 0
}
function V() {
  A.apply(this, arguments)
  var t = p(this.handler, this)
  ;(this.touch = new q(this.manager, t)),
    (this.mouse = new X(this.manager, t)),
    (this.primaryTouch = null),
    (this.lastTouches = [])
}
function $(t, e) {
  t & Dt
    ? ((this.primaryTouch = e.changedPointers[0].identifier), J.call(this, e))
    : t & (Bt | Wt) && J.call(this, e)
}
function J(t) {
  var e = t.changedPointers[0]
  if (e.identifier === this.primaryTouch) {
    var i = {
      x: e.clientX,
      y: e.clientY
    }
    this.lastTouches.push(i)
    var n = this.lastTouches,
      r = function() {
        var t = n.indexOf(i)
        t > -1 && n.splice(t, 1)
      }
    setTimeout(r, se)
  }
}
function G(t) {
  for (
    var e = t.srcEvent.clientX, i = t.srcEvent.clientY, n = 0;
    n < this.lastTouches.length;
    n++
  ) {
    var r = this.lastTouches[n],
      a = Math.abs(e - r.x),
      o = Math.abs(i - r.y)
    if (a <= ce && o <= ce) return !0
  }
  return !1
}
function Z(t, e) {
  ;(this.manager = t), this.set(e)
}
function Q(t) {
  if (C(t, pe)) return pe
  var e = C(t, ge),
    i = C(t, me)
  return e && i ? pe : e || i ? (e ? ge : me) : C(t, fe) ? fe : de
}
function tt() {
  if (!ue) return !1
  var t = {},
    e = a.CSS && a.CSS.supports
  return (
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(
      function(i) {
        t[i] = !e || a.CSS.supports('touch-action', i)
      }
    ),
    t
  )
}
function et(t) {
  ;(this.options = mt({}, this.defaults, t || {})),
    (this.id = T()),
    (this.manager = null),
    (this.options.enable = m(this.options.enable, !0)),
    (this.state = ye),
    (this.simultaneous = {}),
    (this.requireFail = [])
}
function it(t) {
  return t & be
    ? 'cancel'
    : t & we
      ? 'end'
      : t & Ce
        ? 'move'
        : t & Se
          ? 'start'
          : ''
}
function nt(t) {
  return t == Ut
    ? 'down'
    : t == Xt
      ? 'up'
      : t == jt
        ? 'left'
        : t == Yt
          ? 'right'
          : ''
}
function rt(t, e) {
  var i = e.manager
  return i ? i.get(t) : t
}
function at() {
  et.apply(this, arguments)
}
function ot() {
  at.apply(this, arguments), (this.pX = null), (this.pY = null)
}
function st() {
  at.apply(this, arguments)
}
function ct() {
  et.apply(this, arguments), (this._timer = null), (this._input = null)
}
function lt() {
  at.apply(this, arguments)
}
function ut() {
  at.apply(this, arguments)
}
function ht() {
  et.apply(this, arguments),
    (this.pTime = !1),
    (this.pCenter = !1),
    (this._timer = null),
    (this._input = null),
    (this.count = 0)
}
function dt(t, e) {
  return (
    (e = e || {}),
    (e.recognizers = m(e.recognizers, dt.defaults.preset)),
    new ft(t, e)
  )
}
function ft(t, e) {
  ;(this.options = mt({}, dt.defaults, e || {})),
    (this.options.inputTarget = this.options.inputTarget || t),
    (this.handlers = {}),
    (this.session = {}),
    (this.recognizers = []),
    (this.oldCssProps = {}),
    (this.element = t),
    (this.input = O(this)),
    (this.touchAction = new Z(this, this.options.touchAction)),
    pt(this, !0),
    h(
      this.options.recognizers,
      function(t) {
        var e = this.add(new t[0](t[1]))
        t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3])
      },
      this
    )
}
function pt(t, e) {
  var i = t.element
  if (i.style) {
    var n
    h(t.options.cssProps, function(r, a) {
      ;(n = _(i.style, a)),
        e
          ? ((t.oldCssProps[n] = i.style[n]), (i.style[n] = r))
          : (i.style[n] = t.oldCssProps[n] || '')
    }),
      e || (t.oldCssProps = {})
  }
}
function gt(t, e) {
  var i = o.createEvent('Event')
  i.initEvent(t, !0, !0), (i.gesture = e), e.target.dispatchEvent(i)
}
var mt,
  vt = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'],
  yt = o.createElement('div'),
  St = 'function',
  Ct = Math.round,
  wt = Math.abs,
  xt = Date.now
mt =
  'function' != typeof Object.assign
    ? function(t) {
        if (t === c || null === t)
          throw new TypeError('Cannot convert undefined or null to object')
        for (var e = Object(t), i = 1; i < arguments.length; i++) {
          var n = arguments[i]
          if (n !== c && null !== n)
            for (var r in n) n.hasOwnProperty(r) && (e[r] = n[r])
        }
        return e
      }
    : Object.assign
var bt = d(
    function(t, e, i) {
      for (var n = Object.keys(e), r = 0; r < n.length; )
        (!i || (i && t[n[r]] === c)) && (t[n[r]] = e[n[r]]), r++
      return t
    },
    'extend',
    'Use `assign`.'
  ),
  It = d(
    function(t, e) {
      return bt(t, e, !0)
    },
    'merge',
    'Use `assign`.'
  ),
  _t = 1,
  Tt = /mobile|tablet|ip(ad|hone|od)|android/i,
  kt = 'ontouchstart' in a,
  At = _(a, 'PointerEvent') !== c,
  Ot = kt && Tt.test(navigator.userAgent),
  Pt = 'touch',
  Lt = 'pen',
  Mt = 'mouse',
  Et = 'kinect',
  Rt = 25,
  Dt = 1,
  Nt = 2,
  Bt = 4,
  Wt = 8,
  Ht = 1,
  jt = 2,
  Yt = 4,
  Xt = 8,
  Ut = 16,
  zt = jt | Yt,
  Ft = Xt | Ut,
  qt = zt | Ft,
  Kt = ['x', 'y'],
  Vt = ['clientX', 'clientY']
A.prototype = {
  handler: function() {},
  init: function() {
    this.evEl && v(this.element, this.evEl, this.domHandler),
      this.evTarget && v(this.target, this.evTarget, this.domHandler),
      this.evWin && v(k(this.element), this.evWin, this.domHandler)
  },
  destroy: function() {
    this.evEl && y(this.element, this.evEl, this.domHandler),
      this.evTarget && y(this.target, this.evTarget, this.domHandler),
      this.evWin && y(k(this.element), this.evWin, this.domHandler)
  }
}
var $t = {
    mousedown: Dt,
    mousemove: Nt,
    mouseup: Bt
  },
  Jt = 'mousedown',
  Gt = 'mousemove mouseup'
f(X, A, {
  handler: function(t) {
    var e = $t[t.type]
    e & Dt && 0 === t.button && (this.pressed = !0),
      e & Nt && 1 !== t.which && (e = Bt),
      this.pressed &&
        (e & Bt && (this.pressed = !1),
        this.callback(this.manager, e, {
          pointers: [t],
          changedPointers: [t],
          pointerType: Mt,
          srcEvent: t
        }))
  }
})
var Zt = {
    pointerdown: Dt,
    pointermove: Nt,
    pointerup: Bt,
    pointercancel: Wt,
    pointerout: Wt
  },
  Qt = {
    2: Pt,
    3: Lt,
    4: Mt,
    5: Et
  },
  te = 'pointerdown',
  ee = 'pointermove pointerup pointercancel'
a.MSPointerEvent &&
  !a.PointerEvent &&
  ((te = 'MSPointerDown'), (ee = 'MSPointerMove MSPointerUp MSPointerCancel')),
  f(U, A, {
    handler: function(t) {
      var e = this.store,
        i = !1,
        n = t.type.toLowerCase().replace('ms', ''),
        r = Zt[n],
        a = Qt[t.pointerType] || t.pointerType,
        o = a == Pt,
        s = x(e, t.pointerId, 'pointerId')
      r & Dt && (0 === t.button || o)
        ? s < 0 && (e.push(t), (s = e.length - 1))
        : r & (Bt | Wt) && (i = !0),
        s < 0 ||
          ((e[s] = t),
          this.callback(this.manager, r, {
            pointers: e,
            changedPointers: [t],
            pointerType: a,
            srcEvent: t
          }),
          i && e.splice(s, 1))
    }
  })
var ie = {
    touchstart: Dt,
    touchmove: Nt,
    touchend: Bt,
    touchcancel: Wt
  },
  ne = 'touchstart',
  re = 'touchstart touchmove touchend touchcancel'
f(z, A, {
  handler: function(t) {
    var e = ie[t.type]
    if ((e === Dt && (this.started = !0), this.started)) {
      var i = F.call(this, t, e)
      e & (Bt | Wt) && i[0].length - i[1].length === 0 && (this.started = !1),
        this.callback(this.manager, e, {
          pointers: i[0],
          changedPointers: i[1],
          pointerType: Pt,
          srcEvent: t
        })
    }
  }
})
var ae = {
    touchstart: Dt,
    touchmove: Nt,
    touchend: Bt,
    touchcancel: Wt
  },
  oe = 'touchstart touchmove touchend touchcancel'
f(q, A, {
  handler: function(t) {
    var e = ae[t.type],
      i = K.call(this, t, e)
    i &&
      this.callback(this.manager, e, {
        pointers: i[0],
        changedPointers: i[1],
        pointerType: Pt,
        srcEvent: t
      })
  }
})
var se = 2500,
  ce = 25
f(V, A, {
  handler: function(t, e, i) {
    var n = i.pointerType == Pt,
      r = i.pointerType == Mt
    if (!(r && i.sourceCapabilities && i.sourceCapabilities.firesTouchEvents)) {
      if (n) $.call(this, e, i)
      else if (r && G.call(this, i)) return
      this.callback(t, e, i)
    }
  },
  destroy: function() {
    this.touch.destroy(), this.mouse.destroy()
  }
})
var le = _(yt.style, 'touchAction'),
  ue = le !== c,
  he = 'compute',
  de = 'auto',
  fe = 'manipulation',
  pe = 'none',
  ge = 'pan-x',
  me = 'pan-y',
  ve = tt()
Z.prototype = {
  set: function(t) {
    t == he && (t = this.compute()),
      ue &&
        this.manager.element.style &&
        ve[t] &&
        (this.manager.element.style[le] = t),
      (this.actions = t.toLowerCase().trim())
  },
  update: function() {
    this.set(this.manager.options.touchAction)
  },
  compute: function() {
    var t = []
    return (
      h(this.manager.recognizers, function(e) {
        g(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
      }),
      Q(t.join(' '))
    )
  },
  preventDefaults: function(t) {
    var e = t.srcEvent,
      i = t.offsetDirection
    if (this.manager.session.prevented) return void e.preventDefault()
    var n = this.actions,
      r = C(n, pe) && !ve[pe],
      a = C(n, me) && !ve[me],
      o = C(n, ge) && !ve[ge]
    if (r) {
      var s = 1 === t.pointers.length,
        c = t.distance < 2,
        l = t.deltaTime < 250
      if (s && c && l) return
    }
    return o && a
      ? void 0
      : r || (a && i & zt) || (o && i & Ft)
        ? this.preventSrc(e)
        : void 0
  },
  preventSrc: function(t) {
    ;(this.manager.session.prevented = !0), t.preventDefault()
  }
}
var ye = 1,
  Se = 2,
  Ce = 4,
  we = 8,
  xe = we,
  be = 16,
  Ie = 32
;(et.prototype = {
  defaults: {},
  set: function(t) {
    return (
      mt(this.options, t),
      this.manager && this.manager.touchAction.update(),
      this
    )
  },
  recognizeWith: function(t) {
    if (u(t, 'recognizeWith', this)) return this
    var e = this.simultaneous
    return (
      (t = rt(t, this)), e[t.id] || ((e[t.id] = t), t.recognizeWith(this)), this
    )
  },
  dropRecognizeWith: function(t) {
    return u(t, 'dropRecognizeWith', this)
      ? this
      : ((t = rt(t, this)), delete this.simultaneous[t.id], this)
  },
  requireFailure: function(t) {
    if (u(t, 'requireFailure', this)) return this
    var e = this.requireFail
    return (
      (t = rt(t, this)),
      x(e, t) === -1 && (e.push(t), t.requireFailure(this)),
      this
    )
  },
  dropRequireFailure: function(t) {
    if (u(t, 'dropRequireFailure', this)) return this
    t = rt(t, this)
    var e = x(this.requireFail, t)
    return e > -1 && this.requireFail.splice(e, 1), this
  },
  hasRequireFailures: function() {
    return this.requireFail.length > 0
  },
  canRecognizeWith: function(t) {
    return !!this.simultaneous[t.id]
  },
  emit: function Ae(t) {
    function Ae(i) {
      e.manager.emit(i, t)
    }
    var e = this,
      i = this.state
    i < we && Ae(e.options.event + it(i)),
      Ae(e.options.event),
      t.additionalEvent && Ae(t.additionalEvent),
      i >= we && Ae(e.options.event + it(i))
  },
  tryEmit: function(t) {
    return this.canEmit() ? this.emit(t) : void (this.state = Ie)
  },
  canEmit: function() {
    for (var t = 0; t < this.requireFail.length; ) {
      if (!(this.requireFail[t].state & (Ie | ye))) return !1
      t++
    }
    return !0
  },
  recognize: function(t) {
    var e = mt({}, t)
    return g(this.options.enable, [this, e])
      ? (this.state & (xe | be | Ie) && (this.state = ye),
        (this.state = this.process(e)),
        void (this.state & (Se | Ce | we | be) && this.tryEmit(e)))
      : (this.reset(), void (this.state = Ie))
  },
  process: function(t) {},
  getTouchAction: function() {},
  reset: function() {}
}),
  f(at, et, {
    defaults: {
      pointers: 1
    },
    attrTest: function(t) {
      var e = this.options.pointers
      return 0 === e || t.pointers.length === e
    },
    process: function(t) {
      var e = this.state,
        i = t.eventType,
        n = e & (Se | Ce),
        r = this.attrTest(t)
      return n && (i & Wt || !r)
        ? e | be
        : n || r
          ? i & Bt
            ? e | we
            : e & Se
              ? e | Ce
              : Se
          : Ie
    }
  }),
  f(ot, at, {
    defaults: {
      event: 'pan',
      threshold: 10,
      pointers: 1,
      direction: qt
    },
    getTouchAction: function() {
      var t = this.options.direction,
        e = []
      return t & zt && e.push(me), t & Ft && e.push(ge), e
    },
    directionTest: function(t) {
      var e = this.options,
        i = !0,
        n = t.distance,
        r = t.direction,
        a = t.deltaX,
        o = t.deltaY
      return (
        r & e.direction ||
          (e.direction & zt
            ? ((r = 0 === a ? Ht : a < 0 ? jt : Yt),
              (i = a != this.pX),
              (n = Math.abs(t.deltaX)))
            : ((r = 0 === o ? Ht : o < 0 ? Xt : Ut),
              (i = o != this.pY),
              (n = Math.abs(t.deltaY)))),
        (t.direction = r),
        i && n > e.threshold && r & e.direction
      )
    },
    attrTest: function(t) {
      return (
        at.prototype.attrTest.call(this, t) &&
        (this.state & Se || (!(this.state & Se) && this.directionTest(t)))
      )
    },
    emit: function(t) {
      ;(this.pX = t.deltaX), (this.pY = t.deltaY)
      var e = nt(t.direction)
      e && (t.additionalEvent = this.options.event + e),
        this._super.emit.call(this, t)
    }
  }),
  f(st, at, {
    defaults: {
      event: 'pinch',
      threshold: 0,
      pointers: 2
    },
    getTouchAction: function() {
      return [pe]
    },
    attrTest: function(t) {
      return (
        this._super.attrTest.call(this, t) &&
        (Math.abs(t.scale - 1) > this.options.threshold || this.state & Se)
      )
    },
    emit: function(t) {
      if (1 !== t.scale) {
        var e = t.scale < 1 ? 'in' : 'out'
        t.additionalEvent = this.options.event + e
      }
      this._super.emit.call(this, t)
    }
  }),
  f(ct, et, {
    defaults: {
      event: 'press',
      pointers: 1,
      time: 251,
      threshold: 9
    },
    getTouchAction: function() {
      return [de]
    },
    process: function(t) {
      var e = this.options,
        i = t.pointers.length === e.pointers,
        n = t.distance < e.threshold,
        r = t.deltaTime > e.time
      if (((this._input = t), !n || !i || (t.eventType & (Bt | Wt) && !r)))
        this.reset()
      else if (t.eventType & Dt)
        this.reset(),
          (this._timer = l(
            function() {
              ;(this.state = xe), this.tryEmit()
            },
            e.time,
            this
          ))
      else if (t.eventType & Bt) return xe
      return Ie
    },
    reset: function() {
      clearTimeout(this._timer)
    },
    emit: function(t) {
      this.state === xe &&
        (t && t.eventType & Bt
          ? this.manager.emit(this.options.event + 'up', t)
          : ((this._input.timeStamp = xt()),
            this.manager.emit(this.options.event, this._input)))
    }
  }),
  f(lt, at, {
    defaults: {
      event: 'rotate',
      threshold: 0,
      pointers: 2
    },
    getTouchAction: function() {
      return [pe]
    },
    attrTest: function(t) {
      return (
        this._super.attrTest.call(this, t) &&
        (Math.abs(t.rotation) > this.options.threshold || this.state & Se)
      )
    }
  }),
  f(ut, at, {
    defaults: {
      event: 'swipe',
      threshold: 10,
      velocity: 0.3,
      direction: zt | Ft,
      pointers: 1
    },
    getTouchAction: function() {
      return ot.prototype.getTouchAction.call(this)
    },
    attrTest: function(t) {
      var e,
        i = this.options.direction
      return (
        i & (zt | Ft)
          ? (e = t.overallVelocity)
          : i & zt
            ? (e = t.overallVelocityX)
            : i & Ft && (e = t.overallVelocityY),
        this._super.attrTest.call(this, t) &&
          i & t.offsetDirection &&
          t.distance > this.options.threshold &&
          t.maxPointers == this.options.pointers &&
          wt(e) > this.options.velocity &&
          t.eventType & Bt
      )
    },
    emit: function(t) {
      var e = nt(t.offsetDirection)
      e && this.manager.emit(this.options.event + e, t),
        this.manager.emit(this.options.event, t)
    }
  }),
  f(ht, et, {
    defaults: {
      event: 'tap',
      pointers: 1,
      taps: 1,
      interval: 300,
      time: 250,
      threshold: 9,
      posThreshold: 10
    },
    getTouchAction: function() {
      return [fe]
    },
    process: function(t) {
      var e = this.options,
        i = t.pointers.length === e.pointers,
        n = t.distance < e.threshold,
        r = t.deltaTime < e.time
      if ((this.reset(), t.eventType & Dt && 0 === this.count))
        return this.failTimeout()
      if (n && r && i) {
        if (t.eventType != Bt) return this.failTimeout()
        var a = !this.pTime || t.timeStamp - this.pTime < e.interval,
          o = !this.pCenter || W(this.pCenter, t.center) < e.posThreshold
        ;(this.pTime = t.timeStamp),
          (this.pCenter = t.center),
          o && a ? (this.count += 1) : (this.count = 1),
          (this._input = t)
        var s = this.count % e.taps
        if (0 === s)
          return this.hasRequireFailures()
            ? ((this._timer = l(
                function() {
                  ;(this.state = xe), this.tryEmit()
                },
                e.interval,
                this
              )),
              Se)
            : xe
      }
      return Ie
    },
    failTimeout: function() {
      return (
        (this._timer = l(
          function() {
            this.state = Ie
          },
          this.options.interval,
          this
        )),
        Ie
      )
    },
    reset: function() {
      clearTimeout(this._timer)
    },
    emit: function() {
      this.state == xe &&
        ((this._input.tapCount = this.count),
        this.manager.emit(this.options.event, this._input))
    }
  }),
  (dt.VERSION = '2.0.7'),
  (dt.defaults = {
    domEvents: !1,
    touchAction: he,
    enable: !0,
    inputTarget: null,
    inputClass: null,
    preset: [
      [
        lt,
        {
          enable: !1
        }
      ],
      [
        st,
        {
          enable: !1
        },
        ['rotate']
      ],
      [
        ut,
        {
          direction: zt
        }
      ],
      [
        ot,
        {
          direction: zt
        },
        ['swipe']
      ],
      [ht],
      [
        ht,
        {
          event: 'doubletap',
          taps: 2
        },
        ['tap']
      ],
      [ct]
    ],
    cssProps: {
      userSelect: 'none',
      touchSelect: 'none',
      touchCallout: 'none',
      contentZooming: 'none',
      userDrag: 'none',
      tapHighlightColor: 'rgba(0,0,0,0)'
    }
  })
var _e = 1,
  Te = 2
;(ft.prototype = {
  set: function(t) {
    return (
      mt(this.options, t),
      t.touchAction && this.touchAction.update(),
      t.inputTarget &&
        (this.input.destroy(),
        (this.input.target = t.inputTarget),
        this.input.init()),
      this
    )
  },
  stop: function(t) {
    this.session.stopped = t ? Te : _e
  },
  recognize: function(t) {
    var e = this.session
    if (!e.stopped) {
      this.touchAction.preventDefaults(t)
      var i,
        n = this.recognizers,
        r = e.curRecognizer
      ;(!r || (r && r.state & xe)) && (r = e.curRecognizer = null)
      for (var a = 0; a < n.length; )
        (i = n[a]),
          e.stopped === Te || (r && i != r && !i.canRecognizeWith(r))
            ? i.reset()
            : i.recognize(t),
          !r && i.state & (Se | Ce | we) && (r = e.curRecognizer = i),
          a++
    }
  },
  get: function(t) {
    if (t instanceof et) return t
    for (var e = this.recognizers, i = 0; i < e.length; i++)
      if (e[i].options.event == t) return e[i]
    return null
  },
  add: function(t) {
    if (u(t, 'add', this)) return this
    var e = this.get(t.options.event)
    return (
      e && this.remove(e),
      this.recognizers.push(t),
      (t.manager = this),
      this.touchAction.update(),
      t
    )
  },
  remove: function(t) {
    if (u(t, 'remove', this)) return this
    if ((t = this.get(t))) {
      var e = this.recognizers,
        i = x(e, t)
      i !== -1 && (e.splice(i, 1), this.touchAction.update())
    }
    return this
  },
  on: function(t, e) {
    if (t !== c && e !== c) {
      var i = this.handlers
      return (
        h(w(t), function(t) {
          ;(i[t] = i[t] || []), i[t].push(e)
        }),
        this
      )
    }
  },
  off: function(t, e) {
    if (t !== c) {
      var i = this.handlers
      return (
        h(w(t), function(t) {
          e ? i[t] && i[t].splice(x(i[t], e), 1) : delete i[t]
        }),
        this
      )
    }
  },
  emit: function(t, e) {
    this.options.domEvents && gt(t, e)
    var i = this.handlers[t] && this.handlers[t].slice()
    if (i && i.length) {
      ;(e.type = t),
        (e.preventDefault = function() {
          e.srcEvent.preventDefault()
        })
      for (var n = 0; n < i.length; ) i[n](e), n++
    }
  },
  destroy: function() {
    this.element && pt(this, !1),
      (this.handlers = {}),
      (this.session = {}),
      this.input.destroy(),
      (this.element = null)
  }
}),
  mt(dt, {
    INPUT_START: Dt,
    INPUT_MOVE: Nt,
    INPUT_END: Bt,
    INPUT_CANCEL: Wt,
    STATE_POSSIBLE: ye,
    STATE_BEGAN: Se,
    STATE_CHANGED: Ce,
    STATE_ENDED: we,
    STATE_RECOGNIZED: xe,
    STATE_CANCELLED: be,
    STATE_FAILED: Ie,
    DIRECTION_NONE: Ht,
    DIRECTION_LEFT: jt,
    DIRECTION_RIGHT: Yt,
    DIRECTION_UP: Xt,
    DIRECTION_DOWN: Ut,
    DIRECTION_HORIZONTAL: zt,
    DIRECTION_VERTICAL: Ft,
    DIRECTION_ALL: qt,
    Manager: ft,
    Input: A,
    TouchAction: Z,
    TouchInput: q,
    MouseInput: X,
    PointerEventInput: U,
    TouchMouseInput: V,
    SingleTouchInput: z,
    Recognizer: et,
    AttrRecognizer: at,
    Tap: ht,
    Pan: ot,
    Swipe: ut,
    Pinch: st,
    Rotate: lt,
    Press: ct,
    on: v,
    off: y,
    each: h,
    merge: It,
    extend: bt,
    assign: mt,
    inherit: f,
    bindFn: p,
    prefixed: _
  })
var ke =
  'undefined' != typeof window ? window : 'undefined' != typeof self ? self : {}
ke.Hammer = dt
// (n = function() {
//   return dt
// }.call(e, i, e, t)),
// !(n !== c && (t.exports = n))
module.exports = dt
