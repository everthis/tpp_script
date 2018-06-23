'use strict'
const threeNine = require('./39')
const sixFour = require('./64')
var n = threeNine,
  r = sixFour,
  a = 300,
  o = function s(t) {
    s.superclass.constructor.call(this, t),
      (this.userConfig = n.mix(
        {
          minScale: 1,
          maxScale: 2,
          duration: a
        },
        t
      ))
  }
n.extend(o, r, {
  pluginId: 'scale',
  pluginInitializer: function(t) {
    var e = this
    return (
      (e.scale = 1),
      (e.xscroll = t.render()),
      (e.initialContainerWidth = t.containerWidth),
      (e.initialContainerHeight = t.containerHeight),
      (e.minScale =
        e.userConfig.minScale ||
        Math.max(t.width / t.containerWidth, t.height / t.containerHeight)),
      (e.maxScale = e.userConfig.maxScale || 1),
      e.bindEvent(),
      e
    )
  },
  pluginDestructor: function() {
    var t = this,
      e = t.xscroll
    return (
      e.off('pinchstart', t.onPinchStart, t),
      e.off('pinchmove', t.onPinch, t),
      e.off('pinchend pinchcancel', t.onPinchEnd, t),
      t
    )
  },
  onPinchStart: function(t) {
    var e = this,
      i = e.xscroll
    e.disablePan(),
      i.stop(),
      (e.isScaling = !1),
      (e.scale = i.scale),
      (e.originX = (t.center.x - i.x) / i.containerWidth),
      (e.originY = (t.center.y - i.y) / i.containerHeight)
  },
  onPinch: function(t) {
    var e = this,
      i = e.scale,
      n = e.xscroll,
      r = e.originX,
      a = e.originY,
      o = i * t.scale
    o <= e.userConfig.minScale &&
      (o =
        0.5 * e.userConfig.minScale * Math.pow(2, o / e.userConfig.minScale)),
      o >= e.userConfig.maxScale &&
        (o =
          2 * e.userConfig.maxScale * Math.pow(0.5, e.userConfig.maxScale / o)),
      e._scale(o, r, a),
      e.xscroll.translate(n.x, n.y, o, 'e.scale', t.scale)
  },
  onPinchEnd: function() {
    var t = this,
      e = t.originX,
      i = t.originY,
      n = t.xscroll
    n.scale < t.minScale
      ? t.scaleTo(t.minScale, e, i, a, 'ease-out', t.enablePan)
      : n.scale > t.maxScale
        ? t.scaleTo(t.maxScale, e, i, a, 'ease-out', t.enablePan)
        : t.enablePan()
  },
  disablePan: function() {
    return (
      this.xscroll.mc.get('pan').set({
        enable: !1
      }),
      this
    )
  },
  enablePan: function() {
    return (
      this.xscroll.mc.get('pan').set({
        enable: !0
      }),
      this
    )
  },
  bindEvent: function() {
    var t = this,
      e = t.xscroll
    return (
      e.on('pinchstart', t.onPinchStart, t),
      e.on('pinchmove', t.onPinch, t),
      e.on('pinchend pinchcancel', t.onPinchEnd, t),
      t
    )
  },
  _scale: function(t, e, i) {
    var n = this,
      r = n.xscroll,
      a = n.xscroll.boundary
    n.isScaling ||
      ((n.scaleBegin = r.scale),
      (n.isScaling = !0),
      (n.scaleBeginX = r.x),
      (n.scaleBeginY = r.y)),
      e && (n.originX = e),
      i && (n.originY = i)
    var o = t * n.initialContainerWidth,
      s = t * n.initialContainerHeight
    ;(r.containerWidth = Math.round(o > r.width ? o : r.width)),
      (r.containerHeight = Math.round(s > r.height ? s : r.height)),
      (r.scale = t)
    var c =
        e * (n.initialContainerWidth * n.scaleBegin - r.containerWidth) +
        n.scaleBeginX,
      l =
        i * (n.initialContainerHeight * n.scaleBegin - r.containerHeight) +
        n.scaleBeginY
    c > a.left && (c = a.left),
      l > a.top && (l = a.top),
      c < a.right - r.containerWidth && (c = a.right - r.containerWidth),
      l < a.bottom - r.containerHeight && (l = a.bottom - r.containerHeight),
      (r.x = c),
      (r.y = l)
  },
  scaleTo: function(t, e, i, n, r, o) {
    var s = this,
      c = s.xscroll
    c.scale !== t &&
      t &&
      (0 !== n && (n = n || a),
      (r = r || 'ease-out'),
      (s.scaleStart = c.scale || 1),
      s._scale(t, e, i),
      (s.onScale = function(n) {
        var r = (t - s.scaleStart) * n.percent + s.scaleStart
        s.trigger('scale', {
          scale: r,
          origin: {
            x: e,
            y: i
          }
        })
      }),
      (s.onScaleEnd = function() {
        ;(s.isScaling = !1),
          s.enablePan(),
          s.trigger('scaleend', {
            type: 'scaleend',
            scale: s.scale,
            origin: {
              x: e,
              y: i
            }
          })
      }),
      s.trigger('scaleanimate', {
        type: 'scaleanimate',
        scale: c.scale,
        duration: n,
        easing: r,
        offset: {
          x: c.x,
          y: c.y
        },
        origin: {
          x: e,
          y: i
        }
      }),
      c._animate(
        'x',
        'translateX(' + c.x + 'px) scale(' + t + ')',
        n,
        r,
        function(t) {
          ;(s.isScaling = !1), o && o.call(s, t)
        },
        function() {
          c.__timers.x.timer.off('run', s.onScale, s),
            c.__timers.x.timer.off('stop', s.onScaleEnd, s),
            c.__timers.x.timer.on('run', s.onScale, s),
            c.__timers.x.timer.on('stop', s.onScaleEnd, s)
        }
      ),
      c._animate('y', 'translateY(' + c.y + 'px)', n, r, function(t) {
        o && o.call(s, t)
      }))
  }
})
module.exports = o
