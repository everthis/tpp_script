'use strict'
const threeNine = require('./39')
const oneZeroTwo = require('./102')
const oneSevenTwo = require('./172')
const fiveFourOne = require('./541')
function n(t) {
  n.superclass.constructor.call(this, t)
}

var r =
    Object.assign ||
    function(t) {
      for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e]
        for (var n in i)
          Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
      }
      return t
    },
  a = threeNine,
  o = fiveFourOne,
  s = oneSevenTwo,
  c = oneZeroTwo,
  l = 0.382,
  u = 5e-4,
  h = 0.03,
  d = a.prefixStyle('transformOrigin'),
  f = a.prefixStyle('transform')
a.extend(n, o, {
  init: function() {
    var t = this
    return (
      n.superclass.init.call(this),
      (this.userConfig = r(
        {
          preventDefault: !0,
          preventTouchMove: !0
        },
        this.userConfig
      )),
      (t.SCROLL_ACCELERATION = t.userConfig.SCROLL_ACCELERATION || u),
      (t.BOUNDARY_ACCELERATION = t.userConfig.BOUNDARY_ACCELERATION || h),
      t._initContainer(),
      t.resetSize(),
      t._setOverflowBehavior(),
      (t.defaultConfig = {
        lockY: t.userConfig.lockY,
        lockX: t.userConfig.lockX
      }),
      t
    )
  },
  destroy: function() {
    var t = this
    n.superclass.destroy.call(this),
      (t.renderTo.style.overflow = ''),
      (t.renderTo.style.touchAction = ''),
      (t.container.style.transform = ''),
      (t.container.style.transformOrigin = ''),
      (t.content.style.transform = ''),
      (t.content.style.transformOrigin = ''),
      t.off('touchstart mousedown', t._ontouchstart),
      t.off('touchmove', t._ontouchmove)
  },
  _setOverflowBehavior: function() {
    var t = this,
      e = t.renderTo,
      i = getComputedStyle(e)
    return (
      (t.userConfig.lockX =
        void 0 === t.userConfig.lockX
          ? !('hidden' !== i['overflow-x'] && t.width !== t.containerWidth)
          : t.userConfig.lockX),
      (t.userConfig.lockY =
        void 0 === t.userConfig.lockY
          ? !('hidden' !== i['overflow-y'] && t.height !== t.containerHeight)
          : t.userConfig.lockY),
      t
    )
  },
  resetLockConfig: function() {
    var t = this
    return (
      (t.userConfig.lockX = t.defaultConfig.lockX),
      (t.userConfig.lockY = t.defaultConfig.lockY),
      t
    )
  },
  _initContainer: function() {
    var t = this
    n.superclass._initContainer.call(t),
      !t.__isContainerInited &&
        t.container &&
        t.content &&
        ((t.container.style[d] = '0 0'),
        (t.content.style[d] = '0 0'),
        t.translate(0, 0),
        (t.__isContainerInited = !0))
  },
  getScrollTop: function() {
    var t = window.getComputedStyle(this.container)[f].match(/[-\d\.*\d*]+/g)
    return t ? (0 === Math.round(t[5]) ? 0 : -Math.round(t[5])) : 0
  },
  getScrollLeft: function() {
    var t = window.getComputedStyle(this.content)[f].match(/[-\d\.*\d*]+/g)
    return t ? (0 === Math.round(t[4]) ? 0 : -Math.round(t[4])) : 0
  },
  scrollLeft: function(t, e, i, n) {
    if (!this.userConfig.lockX) {
      var r = this.userConfig.gpuAcceleration ? ' translateZ(0px) ' : ''
      ;(this.x = void 0 === t || isNaN(t) || 0 === t ? 0 : -Math.round(t)),
        this._animate(
          'x',
          'translateX(' + this.x + 'px) scale(' + this.scale + ')' + r,
          e,
          i,
          n
        )
    }
  },
  scrollTop: function(t, e, i, n) {
    if (!this.userConfig.lockY) {
      var r = this.userConfig.gpuAcceleration ? ' translateZ(0px) ' : ''
      ;(this.y = void 0 === t || isNaN(t) || 0 === t ? 0 : -Math.round(t)),
        this._animate('y', 'translateY(' + this.y + 'px) ' + r, e, i, n)
    }
  },
  translate: function(t, e, i) {
    var n = this.userConfig.gpuAcceleration ? ' translateZ(0px) ' : ''
    return (
      (this.x = t || this.x || 0),
      (this.y = e || this.y || 0),
      (this.scale = i || this.scale || 1),
      (this.content.style[f] =
        'translate(' + this.x + 'px,0px) scale(' + this.scale + ') ' + n),
      (this.container.style[f] = 'translate(0px,' + this.y + 'px) ' + n),
      this
    )
  },
  _animate: function(t, e, i, n, r, a) {
    var o = this
    ;(i = i || 0), (n = n || 'quadratic')
    var c = 'y' === t ? o.container : o.content,
      l = {
        css: {
          transform: e
        },
        duration: i,
        easing: n,
        run: function() {
          a && a(),
            o.trigger('scroll', {
              scrollTop: o.getScrollTop(),
              scrollLeft: o.getScrollLeft(),
              type: 'scroll'
            })
        },
        useTransition: o.userConfig.useTransition,
        end: function() {
          r && r(),
            (0 !== o['_bounce' + t] && void 0 !== o['_bounce' + t]) ||
              'linear' === n ||
              ((o['isScrolling' + t.toUpperCase()] = !1),
              (o['isRealScrolling' + t.toUpperCase()] = !1),
              o.trigger('scrollend', {
                type: 'scrollend',
                scrollTop: o.getScrollTop(),
                scrollLeft: o.getScrollLeft(),
                zoomType: t,
                duration: i,
                easing: n
              }))
        }
      }
    o.__timers[t] = o.__timers[t] || new s(c, l)
    var u = o.__timers[t]
    return (
      u.stop(),
      u.reset(l),
      u.run(),
      o.trigger('scrollanimate', {
        type: 'scrollanimate',
        scrollTop: -o.y,
        scrollLeft: -o.x,
        duration: i,
        easing: n,
        zoomType: t
      }),
      this
    )
  },
  _ontap: function() {
    var t = this
    t.boundaryCheck()
  },
  bindEvent: function() {
    n.superclass.bindEvent.call(this)
    var t = this
    if (!t.__isEvtBind) {
      t.__isEvtBind = !0
      var e = new c.Pinch()
      t.mc.add(e),
        t.on('touchstart mousedown', t._ontouchstart, t),
        t.on('touchmove', t._ontouchmove, t),
        t.on('tap', t._ontap, t),
        t.on('panstart', t._onpanstart, t),
        t.on('pan', t._onpan, t),
        t.on('panend', t._onpanend, t),
        window.addEventListener(
          'resize',
          function() {
            setTimeout(function() {
              t.resetSize(), t.boundaryCheck(0), t.render()
            }, 100)
          },
          t
        )
    }
  },
  _ontouchstart: function(t) {
    var e = this
    e.userConfig.preventDefault && t.preventDefault()
    var i = e.getPlugin('scale')
    ;(i && i.isScaling) || e.stop()
  },
  _ontouchmove: function(t) {
    this.userConfig.preventTouchMove && t.preventDefault()
  },
  _onpanstart: function(t) {
    this.userConfig.preventTouchMove && t.preventDefault()
    var e = this,
      i = e.getScrollLeft(),
      n = e.getScrollTop()
    e.stop(), e.translate(-i, -n)
    var r = e.mc.get('pan').options.threshold
    return (
      (e.thresholdY = 8 === t.direction ? r : 16 === t.direction ? -r : 0),
      (e.thresholdX = 2 === t.direction ? r : 4 === t.direction ? -r : 0),
      e
    )
  },
  _onpan: function(t) {
    this.userConfig.preventTouchMove && t.preventDefault()
    var e = this,
      i = e.boundary,
      n = e.userConfig,
      r = n.boundaryCheck,
      a = n.bounce,
      o = e.topStart || (e.topStart = -e.getScrollTop()),
      s = e.leftStart || (e.leftStart = -e.getScrollLeft()),
      c = n.lockY ? Number(o) : Number(o) + (t.deltaY + e.thresholdY),
      u = n.lockX ? Number(s) : Number(s) + (t.deltaX + e.thresholdX),
      h = e.containerWidth,
      d = e.containerHeight
    return (
      r &&
        ((c = c > i.top ? (a ? (c - i.top) * l + i.top : i.top) : c),
        (c =
          c < i.bottom - d
            ? a
              ? c + (i.bottom - d - c) * l
              : i.bottom - d
            : c),
        (u = u > i.left ? (a ? (u - i.left) * l + i.left : i.left) : u),
        (u =
          u < i.right - h ? (a ? u + (i.right - h - u) * l : i.right - h) : u)),
      e.translate(u, c),
      (e.directionX =
        'panleft' === t.type ? 'right' : 'panright' === t.type ? 'left' : ''),
      (e.directionY =
        'panup' === t.type ? 'down' : 'pandown' === t.type ? 'up' : ''),
      e.trigger('scroll', {
        scrollTop: -c,
        scrollLeft: -u,
        triggerType: 'pan',
        type: 'scroll'
      }),
      e
    )
  },
  _onpanend: function(t) {
    var e = this,
      i = e.computeScroll('x', -t.velocityX),
      n = e.computeScroll('y', -t.velocityY),
      r = i ? i.pos : 0,
      a = n ? n.pos : 0,
      o = void 0
    return (
      i &&
        n &&
        'inside' === i.status &&
        'inside' === n.status &&
        i.duration &&
        n.duration &&
        (o = Math.max(i.duration, n.duration)),
      i &&
        e.scrollLeft(r, o || i.duration, i.easing, function() {
          e.boundaryCheckX()
        }),
      n &&
        e.scrollTop(a, o || n.duration, n.easing, function() {
          e.boundaryCheckY()
        }),
      (e.directionX = t.velocityX < 0 ? 'left' : 'right'),
      (e.directionY = t.velocityY < 0 ? 'up' : 'down'),
      (e.topStart = null),
      (e.leftStart = null),
      e
    )
  },
  isBoundaryOut: function() {
    return (
      this.isBoundaryOutLeft() ||
      this.isBoundaryOutRight() ||
      this.isBoundaryOutTop() ||
      this.isBoundaryOutBottom()
    )
  },
  isBoundaryOutLeft: function() {
    return this.getBoundaryOutLeft() > 0
  },
  isBoundaryOutRight: function() {
    return this.getBoundaryOutRight() > 0
  },
  isBoundaryOutTop: function() {
    return this.getBoundaryOutTop() > 0
  },
  isBoundaryOutBottom: function() {
    return this.getBoundaryOutBottom() > 0
  },
  getBoundaryOutTop: function() {
    return -this.boundary.top - this.getScrollTop()
  },
  getBoundaryOutLeft: function() {
    return -this.boundary.left - this.getScrollLeft()
  },
  getBoundaryOutBottom: function() {
    return this.boundary.bottom - this.containerHeight + this.getScrollTop()
  },
  getBoundaryOutRight: function() {
    return this.boundary.right - this.containerWidth + this.getScrollLeft()
  },
  computeScroll: function(t, e) {
    var i = this,
      n = i.userConfig,
      r = i.boundary,
      a = 'x' === t ? i.getScrollLeft() : i.getScrollTop(),
      o = 'x' === t ? r.left : r.top,
      s = 'x' === t ? r.right : r.bottom,
      c = 'x' === t ? i.containerWidth : i.containerHeight,
      l = n.maxSpeed || 2,
      u = n.boundaryCheck,
      h = n.bounce,
      d = {},
      f = 'inside'
    if (u) {
      if ('x' === t && (i.isBoundaryOutLeft() || i.isBoundaryOutRight()))
        return i.boundaryCheckX(), null
      if ('y' === t && (i.isBoundaryOutTop() || i.isBoundaryOutBottom()))
        return i.boundaryCheckY(), null
    }
    if ('x' === t && i.userConfig.lockX) return null
    if ('y' === t && i.userConfig.lockY) return null
    e = e > l ? l : e < -l ? -l : e
    var p = i.SCROLL_ACCELERATION * (e / (Math.abs(e) || 1)),
      g = i.BOUNDARY_ACCELERATION,
      m = isNaN(e / p) ? 0 : e / p,
      v = Number(a) + (m * e) / 2
    if (v < -o && u) {
      var y = -o - a,
        S = (Math.sqrt(-2 * p * y + e * e) + e) / p,
        C = e - p * S,
        w = Math.abs(C / g),
        x = (C / 2) * w
      ;(m = S + w), (v = h ? -o + x : -o), (f = 'outside')
    } else if (v > c - s && u) {
      var b = s - c + a,
        I = (Math.sqrt(-2 * p * b + e * e) - e) / p,
        _ = e - p * I,
        T = Math.abs(_ / g),
        k = (_ / 2) * T
      ;(m = I + T), (v = h ? c - s + k : c - s), (f = 'outside')
    }
    if (isNaN(v) || isNaN(m)) return null
    ;(d.pos = v),
      (d.duration = m),
      (d.easing = Math.abs(e) > 2 ? 'circular' : 'quadratic'),
      (d.status = f)
    var A = t.toUpperCase()
    return (i['isScrolling' + A] = !0), (i['isRealScrolling' + A] = !0), d
  },
  boundaryCheckX: function(t, e, i) {
    var n = this
    if (
      n.userConfig.boundaryCheck &&
      ('function' == typeof t
        ? ((i = t),
          (t = n.userConfig.BOUNDARY_CHECK_DURATION),
          (e = n.userConfig.BOUNDARY_CHECK_EASING))
        : ((t = 0 === t ? 0 : n.userConfig.BOUNDARY_CHECK_DURATION),
          (e = e || n.userConfig.BOUNDARY_CHECK_EASING)),
      n.userConfig.bounce && !n.userConfig.lockX)
    ) {
      var r = n.boundary
      n.isBoundaryOutLeft()
        ? n.scrollLeft(-r.left, t, e, i)
        : n.isBoundaryOutRight() &&
          n.scrollLeft(n.containerWidth - r.right, t, e, i)
    }
  },
  boundaryCheckY: function(t, e, i) {
    var n = this
    if (
      n.userConfig.boundaryCheck &&
      ('function' == typeof t
        ? ((i = t),
          (t = n.userConfig.BOUNDARY_CHECK_DURATION),
          (e = n.userConfig.BOUNDARY_CHECK_EASING))
        : ((t = 0 === t ? 0 : n.userConfig.BOUNDARY_CHECK_DURATION),
          (e = e || n.userConfig.BOUNDARY_CHECK_EASING)),
      n.userConfig.boundaryCheck && !n.userConfig.lockY)
    ) {
      var r = n.boundary
      n.isBoundaryOutTop()
        ? n.scrollTop(-r.top, t, e, i)
        : n.isBoundaryOutBottom() &&
          n.scrollTop(n.containerHeight - r.bottom, t, e, i)
    }
  },
  boundaryCheck: function(t, e, i) {
    return this.boundaryCheckX(t, e, i), this.boundaryCheckY(t, e, i), this
  },
  stop: function() {
    var t = this
    if (
      (t.__timers.x && t.__timers.x.stop(),
      t.__timers.y && t.__timers.y.stop(),
      t.isScrollingX || t.isScrollingY)
    ) {
      var e = t.getScrollTop(),
        i = t.getScrollLeft()
      t.trigger('scrollend', {
        scrollTop: e,
        scrollLeft: i
      }),
        t.trigger('stop', {
          scrollTop: e,
          scrollLeft: i
        }),
        (t.isScrollingX = !1),
        (t.isScrollingY = !1)
    }
    return t
  },
  render: function() {
    var t = this
    return (
      n.superclass.render.call(this),
      'static' === getComputedStyle(t.renderTo).position &&
        (t.renderTo.style.position = 'relative'),
      (t.renderTo.style.overflow = 'hidden'),
      t
    )
  },
  _triggerClick: function(t) {
    var e = t.target
    if (!/(SELECT|INPUT|TEXTAREA)/i.test(e.tagName)) {
      var i = document.createEvent('MouseEvents')
      i.initMouseEvent(
        'click',
        !0,
        !0,
        t.view,
        1,
        e.screenX,
        e.screenY,
        e.clientX,
        e.clientY,
        t.ctrlKey,
        t.altKey,
        t.shiftKey,
        t.metaKey,
        0,
        null
      ),
        e.dispatchEvent(i)
    }
  }
})
module.exports = n
