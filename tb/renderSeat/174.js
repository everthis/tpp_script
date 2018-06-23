'use strict'
const threeNine = require('./39')
const sixFour = require('./64')
const oneSevenThree = require('./173')
function n(t, e, i, n, r) {
  var a = function(e) {
      var n = 1 - e
      return 3 * n * n * e * t + 3 * n * e * e * i + e * e * e
    },
    o = function(t) {
      var i = 1 - t
      return 3 * i * i * t * e + 3 * i * t * t * n + t * t * t
    },
    s = function(e) {
      var n = 1 - e
      return (
        3 * (2 * (e - 1) * e + n * n) * t + 3 * (-e * e * e + 2 * n * e) * i
      )
    }
  return function(t) {
    var e = t,
      i = void 0,
      n = void 0,
      c = void 0,
      l = void 0,
      u = void 0,
      h = void 0
    for (c = e, h = 0; h < 8; h++) {
      if (((l = a(c) - e), Math.abs(l) < r)) return o(c)
      if (((u = s(c)), Math.abs(u) < 1e-6)) break
      c -= l / u
    }
    if (((i = 0), (n = 1), (c = e), c < i)) return o(i)
    if (c > n) return o(n)
    for (; i < n; ) {
      if (((l = a(c)), Math.abs(l - e) < r)) return o(c)
      e > l ? (i = c) : (n = c), (c = 0.5 * (n - i) + i)
    }
    return o(c)
  }
}
function r(t) {
  var e = this
  e.cfg = a.mix(
    {
      easing: 'linear'
    },
    t
  )
}

for (
  var a = threeNine,
    o = sixFour,
    s = oneSevenThree,
    c =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(t) {
        window.setTimeout(t, 1e3 / 60)
      },
    l = ['webkit', 'moz', 'ms', 'o'],
    u = window.cancelAnimationFrame,
    h = 0;
  h < l.length;
  h++
)
  (window[l[h] + 'CancelAnimationFrame'] ||
    window[l[h] + 'CancelRequestAnimationFrame']) &&
    (u =
      window[l[h] + 'CancelAnimationFrame'] ||
      window[l[h] + 'CancelRequestAnimationFrame'])
;(u = u || window.clearTimeout),
  (r.MIN_DURATION = 1),
  a.extend(r, o, {
    reset: function(t) {
      var e = this
      a.mix(e.cfg, t), (e.isFinished = !1), (e.percent = 0), (e.stopInfo = null)
    },
    run: function() {
      var t = this,
        e = t.cfg.duration
      if (
        (e <= r.MIN_DURATION &&
          ((t.isFinished = !0),
          t.trigger('run', {
            percent: 1
          }),
          t.trigger('end', {
            percent: 1
          })),
        !t.isFinished)
      ) {
        ;(t.finishedPercent = (t.stopInfo && t.stopInfo.percent) || 0),
          (t.stopInfo = null),
          (t.start = Date.now()),
          (t.percent = 0)
        var i = 1e3 / 60 / e / 4,
          a = s[t.cfg.easing]
        ;(t.easingFn = n(a[0], a[1], a[2], a[3], i)), t.tick()
      }
    },
    tick: function() {
      var t = this
      u(t._raf),
        (t._raf = c(function() {
          t.now = Date.now()
          var e = t.now - t.start
          return (
            (t.duration = e >= t.cfg.duration ? t.cfg.duration : e),
            (t.progress = t.easingFn(t.duration / t.cfg.duration)),
            (t.percent = t.duration / t.cfg.duration + t.finishedPercent),
            t.trigger('run', {
              percent: t.progress
            }),
            t.percent >= 1 || t.stopInfo
              ? ((t.percent =
                  t.stopInfo && t.stopInfo.percent ? t.stopInfo.percent : 1),
                (t.duration =
                  t.stopInfo && t.stopInfo.duration
                    ? t.stopInfo.duration
                    : t.duration),
                t.trigger('stop', {
                  percent: t.percent
                }),
                void (
                  t.percent >= 1 &&
                  ((t.isFinished = !0),
                  t.trigger('end', {
                    percent: 1
                  }))
                ))
              : void t.tick()
          )
        }))
    },
    stop: function() {
      var t = this
      ;(t.stopInfo = {
        percent: t.percent,
        now: t.now
      }),
        u(t._raf)
    }
  })
module.exports = r
