'use strict'
const threeNine = require('./39')
const sixFour = require('./64')
const oneSevenThree = require('./173')
const oneSevenFour = require('./174')
function n(t) {
  return Math.round(1e5 * parseFloat(t)) / 1e5
}
function r() {
  return {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    skewY: 0,
    scaleX: 1,
    scaleY: 1
  }
}
function a(t) {
  return (
    (t = t.split(/,/)),
    (t = Array.prototype.map.call(t, function(t) {
      return n(t)
    }))
  )
}
function o(t) {
  t = a(t)
  var e = void 0,
    i = void 0,
    r = void 0,
    o = t[0],
    s = t[1],
    c = t[2],
    l = t[3]
  return (
    o * l - s * c
      ? ((e = Math.sqrt(o * o + s * s)),
        (r = (o * c + s * l) / (o * l - c * s)),
        (i = (o * l - s * c) / e),
        o * l < s * c && ((r = -r), (e = -e)))
      : (e = i = r = 0),
    {
      translateX: n(t[4]),
      translateY: n(t[5]),
      rotate: n((180 * Math.atan2(s, o)) / Math.PI),
      skewX: n((180 * Math.atan(r)) / Math.PI),
      skewY: 0,
      scaleX: n(e),
      scaleY: n(i)
    }
  )
}
function s(t) {
  t = t.split(')')
  for (
    var e = -1, i = void 0, a = void 0, s = void 0, c = t.length - 1, l = r();
    ++e < c;

  )
    switch (((i = t[e].split('(')), (a = d.trim(i[0])), (s = i[1]), a)) {
      case 'translateX':
      case 'translateY':
      case 'scaleX':
      case 'scaleY':
        l[a] = n(s)
        break
      case 'translate':
      case 'translate3d':
        ;(s = s.split(',')),
          (l.translateX = n(s[0])),
          (l.translateY = n(s[1] || 0))
        break
      case 'scale':
        ;(s = s.split(',')), (l.scaleX = n(s[0])), (l.scaleY = n(s[1] || s[0]))
        break
      case 'matrix':
        return o(s)
    }
  return l
}
function c(t, e) {
  if (t && e && e.css) {
    var i = this
    ;(i.cfg = e), (i.el = t)
    var n = e.duration || 0,
      r = e.easing || 'ease'
    e.run &&
      ((i.timer =
        i.timer ||
        new f({
          duration: Math.round(n),
          easing: r
        })),
      i.timer.on('run', e.run)),
      i.bindEvent()
  }
}
function l(t, e) {
  var i = s(t),
    n = s(e),
    r = {}
  return (
    Object.keys(n).forEach(function(t) {
      r[t] = {
        prevVal: i[t],
        newVal: n[t]
      }
    }),
    r
  )
}
function u(t, e, i) {
  switch (e) {
    case 'scrollTop':
    case 'scrollLeft':
      t[e] = i
      break
    case 'transform':
      t.style[m] = i
      break
    case 'opacity':
      t.style[e] = i
  }
}
function h(t, e, i, n, r) {
  i = isNaN(Number(i)) ? 0 : Number(i)
  var a = (n - i) * r + i
  u(t, e, a)
}

var d = threeNine,
  f = oneSevenFour,
  p = oneSevenThree,
  g = sixFour,
  m = d.prefixStyle('transform'),
  v = d.prefixStyle('transition'),
  y = d.vendor ? d.prefixStyle('transitionEnd') : 'transitionend',
  S = 'translateX({translateX}px) translateY({translateY}px) translateZ(0)',
  C = {
    transform: !0,
    opacity: !0,
    scrollTop: !0,
    scrollLeft: !0
  }
d.extend(c, g, {
  run: function() {
    var t = this,
      e = t.cfg,
      i = t.el,
      n = e.duration || 0,
      r = e.easing || 'ease',
      a = e.delay || 0
    return (
      (t.__isTransitionEnd = !1),
      clearTimeout(t.__itv),
      t.timer && t.timer.run(),
      n <= f.MIN_DURATION
        ? (Object.keys(e.css).forEach(function(t) {
            u(i, t, e.css[t])
          }),
          t.stop(),
          void t.__handlers.stop.call(t))
        : (d.isBadAndroid() && (e.useTransition = !1),
          void (e.useTransition
            ? ((i.style[v] = d.substitute(
                'all {duration}ms {easing} {delay}ms',
                {
                  duration: Math.round(n),
                  easing: p.format(r),
                  delay: a
                }
              )),
              Object.keys(e.css).forEach(function(t) {
                u(i, t, e.css[t])
              }),
              (t.__itv = setTimeout(function() {
                t.__isTransitionEnd ||
                  ((t.__isTransitionEnd = !0), t.trigger('transitionend'))
              }, Number(n) + 60)))
            : ((t.computeStyle = t.computeStyle || window.getComputedStyle(i)),
              e.css.transform &&
                t.timer &&
                ((t.transmap = l(t.computeStyle[m], e.css.transform)),
                t.timer.off('run', t.__handlers.transRun),
                t.timer.off('end', t.__handlers.transRun),
                t.timer.on('run', t.__handlers.transRun, t),
                t.timer.on('end', t.__handlers.transRun, t)))))
    )
  },
  _transitionEndHandler: function() {
    var t = this
    t.stop(), t.__handlers.stop.call(t)
  },
  __handlers: {
    transRun: function(t) {
      var e = this,
        i = e.transmap,
        n = e.el,
        r = {}
      Object.keys(i).forEach(function(e) {
        r[e] = (i[e].newVal - i[e].prevVal) * t.percent + i[e].prevVal
      }),
        (n.style[m] = d.substitute(S + ' scale({scaleX},{scaleY})', r))
    },
    stop: function() {
      var t = this,
        e = t.cfg
      e.end &&
        e.end({
          percent: 1
        })
    }
  },
  bindEvent: function() {
    var t = this,
      e = t.cfg,
      i = t.el
    t.el.addEventListener(y, function(e) {
      ;(t.__isTransitionEnd = !0),
        e.target === e.currentTarget && t.trigger('transitionend', e)
    }),
      t.on('transitionend', t._transitionEndHandler, t)
    var n = function(n) {
      ;(t.computeStyle = t.computeStyle || window.getComputedStyle(i)),
        Object.keys(e.css).forEach(function(i) {
          ;/transform/.test(i) ||
            h(t.el, i, t.computeStyle[i], e.css[i], n.percent)
        })
    }
    t.timer && t.timer.on('run', n),
      t.timer && t.timer.on('stop', t.__handlers.stop, t)
  },
  stop: function() {
    var t = this
    if (t.cfg.useTransition && t.cfg.duration > f.MIN_DURATION) {
      var e = window.getComputedStyle(this.el)
      Object.keys(t.cfg.css).forEach(function(i) {
        if (C[i]) {
          var n = /transform/.test(i) ? e[m] : e[i],
            r = d.substitute(S + ' scale({scaleX},{scaleY})', s(n))
          u(t.el, i, r)
        }
      }),
        (t.el.style[v] = 'none')
    }
    return (
      t.timer && t.timer.stop() && t.timer.reset(), (t.computeStyle = null), t
    )
  },
  reset: function(t) {
    var e = this
    return (
      (e.computeStyle = null),
      d.mix(e.cfg, t),
      this.timer &&
        e.timer.reset({
          duration: Math.round(e.cfg.duration),
          easing: e.cfg.easing
        }),
      e
    )
  }
})
module.exports = c
