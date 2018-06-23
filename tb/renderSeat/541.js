'use strict'
const threeNine = require('./39')
const sixFour = require('./64')
const oneZeroTwo = require('./102')
const fiveFourZero = require('./540')
function n(t) {
  n.superclass.constructor.call(this), (this.userConfig = t), this.init()
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
  o = sixFour,
  s = fiveFourZero,
  c = oneZeroTwo,
  l = 500,
  u = 'ease',
  h = 0.1
a.extend(n, o, {
  init: function() {
    var t = {
      preventDefault: !0,
      bounce: !0,
      boundaryCheck: !0,
      useTransition: !0,
      gpuAcceleration: !0,
      BOUNDARY_CHECK_EASING: u,
      BOUNDARY_CHECK_DURATION: l,
      BOUNDARY_CHECK_ACCELERATION: h,
      useOriginScroll: !1,
      zoomType: 'y',
      container: '.xs-container',
      content: '.xs-content',
      touchAction: 'auto'
    }
    ;(this.guid = a.guid()),
      (this.renderTo = a.getNode(this.userConfig.renderTo)),
      (this.__timers = {})
    var e = JSON.parse(this.renderTo.getAttribute('xs-cfg')),
      i = (this.userConfig = r({}, t, e, this.userConfig))
    return (
      (this.container = a.getNode(i.container, this.renderTo)),
      (this.content = a.getNode(i.content, this.renderTo)),
      (this.boundary = new s()),
      this.boundary.refresh(),
      this
    )
  },
  destroy: function() {
    this.mc && this.mc.destroy(),
      this.sticky && this.sticky.destroy(),
      this.fixed && this.fixed.destroy()
  },
  _initContainer: function() {},
  enableGPUAcceleration: function() {
    return (this.userConfig.gpuAcceleration = !0), this
  },
  disableGPUAcceleration: function() {
    return (this.userConfig.gpuAcceleration = !1), this
  },
  getScrollPos: function() {
    return {
      scrollLeft: this.getScrollLeft(),
      scrollTop: this.getScrollTop()
    }
  },
  getScrollTop: function() {},
  getScrollLeft: function() {},
  scrollTo: function(t, e, i, n, r) {
    ;(t = void 0 === t || isNaN(t) ? -this.getScrollLeft() : t),
      (e = void 0 === e || isNaN(e) ? -this.getScrollTop() : e),
      this.scrollLeft(t, i, n, r),
      this.scrollTop(e, i, n, r)
  },
  scrollBy: function(t, e, i, n, r) {
    this.scrollByX(t, i, n, r), this.scrollByY(e, i, n, r)
  },
  scrollLeftBy: function(t, e, i, n) {
    this.scrollLeft(Number(t) + Number(this.getScrollLeft()), e, i, n)
  },
  scrollTopBy: function(t, e, i, n) {
    this.scrollTop(Number(t) + Number(this.getScrollTop()), e, i, n)
  },
  scrollLeft: function(t, e, i, n) {},
  scrollTop: function(t, e, i, n) {},
  resetSize: function(t) {
    var e = this
    if (this.container && this.content) {
      var i = this.userConfig,
        n = getComputedStyle(this.renderTo)
      ;(this.width =
        (i.width || this.renderTo.offsetWidth) -
        a.px2Num(n['padding-left']) -
        a.px2Num(n['padding-right'])),
        (this.height =
          (i.height || this.renderTo.offsetHeight) -
          a.px2Num(n['padding-top']) -
          a.px2Num(n['padding-bottom']))
      var r = this.content.offsetWidth,
        o = this.content.offsetHeight,
        s = (i.containerWidth || r) * this.scale,
        c = (i.containerHeight || o) * this.scale,
        l = this.boundary.height
      if (
        ((this.containerWidth = s < this.width ? this.width : s),
        (this.containerHeight = c < this.height ? this.height : c),
        this.boundary.refresh({
          width: this.width,
          height: this.height
        }),
        t)
      ) {
        var u = Math.abs(this.height - l)
        this.height < l
          ? setTimeout(function() {
              e.scrollTopBy(u, 300)
            }, 500)
          : this.height > l &&
            setTimeout(function() {
              e.scrollTopBy(-u, 300)
            }, 500)
      }
    }
  },
  render: function() {
    return (
      this.resetSize(),
      this.trigger('afterrender', {
        type: 'afterrender'
      }),
      this.bindEvent(),
      this.initTouchAction(),
      this
    )
  },
  initTouchAction: function() {
    return (
      this.mc.set({
        touchAction: this.userConfig.touchAction
      }),
      this
    )
  },
  boundaryCheck: function() {
    return this
  },
  boundaryCheckX: function() {
    return this
  },
  boundaryCheckY: function() {
    return this
  },
  bindEvent: function() {
    var t = this
    if (!this.___isEvtBind) {
      this.___isEvtBind = !0
      var e = (this.mc = new c.Manager(this.renderTo)),
        i = new c.Tap(),
        n = new c.Pan()
      e.add([i, n]),
        this.mc.on(
          'panstart pan panend pancancel pinchstart pinchmove pinchend pinchcancel pinchin pinchout',
          function(e) {
            t.trigger(e.type, e)
          }
        )
      for (
        var r = [
            'touchstart',
            'touchmove',
            'touchend',
            'touchcancel',
            'mousedown'
          ],
          a = 0,
          o = r.length;
        a < o;
        a++
      )
        this.renderTo.addEventListener(r[a], function(e) {
          t.trigger(e.type, e)
        })
      this.mc.on('tap', function(e) {
        1 === e.tapCount
          ? ((e.type = 'tap'), t.trigger(e.type, e))
          : 2 === e.tapCount &&
            ((e.type = 'doubletap'), t.trigger('doubletap', e))
      })
    }
  },
  resetLockConfig: function() {},
  stop: function() {}
})
module.exports = n
