'use strict'
const two = require('./2')
const three = require('./3')
const oneThree = require('./13')
const oneOneThree = require('./113')
const fiveThreeFour = require('./534')
const fiveThreeFive = require('./535')
const fiveThreeSix = require('./536')
const fiveThreeSeven = require('./537')
const fiveThreeNine = require('./539')
const fiveFourThree = require('./543')
const fiveFourFive = require('./545')
const sixFourThree = require('./643')
const sixFourFour = require('./644')
function n(t) {
  return t && t.__esModule
    ? t
    : {
        default: t
      }
}
function r(t, e) {
  if (!(t instanceof e))
    throw new TypeError('Cannot call a class as a function')
}
function i() {}
var a =
    Object.assign ||
    function(t) {
      for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e]
        for (var n in i)
          Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
      }
      return t
    },
  o = three,
  s = n(o),
  c = two,
  l = n(c),
  u = fiveThreeFive,
  h = n(u),
  d = fiveThreeFour,
  f = n(d),
  p = fiveFourFive,
  g = n(p),
  m = fiveFourThree,
  v = n(m),
  y = oneOneThree,
  S = n(y),
  C = fiveThreeNine,
  w = n(C),
  x = fiveThreeSeven,
  b = n(x),
  I = fiveThreeSix,
  _ = n(I),
  T = sixFourFour,
  k = n(T),
  A = sixFourThree,
  O = n(A),
  P = oneThree

function t() {
  var e = this,
    i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
  r(this, t),
    (this.config = a({}, i)),
    (this.mapConfig = this.config.mapConfig),
    (this.data = this.config.seatData),
    (this.container = this.config.container),
    (this.viewWidth = this.config.viewWidth),
    (this.viewHeight = this.config.viewHeight),
    (this.maxRadarWidth = 0.5 * this.viewWidth),
    (this.seatImgs = {
      order: '0'
    }),
    (this.selectedSeats = []),
    (this.nowScale = 1),
    (this.pixelRatio = 1),
    (this.mapWidth = 0),
    (this.mapHeight = 0),
    (this.repository = new b['default'](
      a({}, this.data, {
        mapConfig: this.mapConfig,
        selectedSeatIds: this.config.selectedSeatIds
      })
    )),
    (this.seatValidator = new w['default'](this.repository)),
    (this.supportAreaPrice = this.data.hasArea),
    (this.bestArea = this.repository.getBestArea()),
    (this.floorData = this.repository.getFloorData()),
    this.setPixelRatio(),
    this.repository.resetFloorDimension(this.pixelRatio),
    this.parseCustomImgs(),
    this.renderLayout(),
    (0, s['default'])(this.container + ' .xseat-map canvas').each(function(
      t,
      i
    ) {
      i && i.getContext('2d').scale(e.pixelRatio, e.pixelRatio)
    }),
    (this.radarCanvas = document.querySelector(
      this.container + ' .canvas-radar'
    )),
    (this.radarCtx = this.radarCanvas.getContext('2d')),
    (this.seatIndexEle = document.querySelector(
      this.container + ' .xseat-index'
    )),
    this.loadImgs().then(function() {
      e.setSeatMapDimension(), e.renderSeatMap()
    })
}
t.prototype.loadImgs = function() {
  var t = this,
    e = new h['default'](),
    i = a({}, this.config.seatImgs, this.customSeatImgs),
    n = []
  return (
    Object.keys(i).forEach(function(t) {
      var e = i[t]
      e &&
        n.push({
          name: t,
          src: i[t]
        })
    }),
    e.load(n).then(function(e) {
      e.forEach(function(e) {
        t.seatImgs[e.name] = e.img
      })
    })
  )
}
t.prototype.renderLayout = function() {
  ;(0, s['default'])('' + this.container).html(
    (0, l['default'])(O['default'], {
      hallName: this.data.schedule.hallName,
      legends: this.repository.getSeatLegendData(
        this.bestArea,
        this.supportAreaPrice,
        this.customSeatImgs
      ),
      floors: this.repository.floorData.floors
    })
  )
  var t = (0, s['default'])(this.container + ' .seat-legend'),
    e = t.find('ul')
  e.width() > t.width() && t.addClass('fn-left'),
    this.resize(0, this.viewHeight)
}
t.prototype.setPixelRatio = function() {
  var t = document.createElement('canvas'),
    e = t.getContext('2d')
  ;(this.pixelRatio = _['default'].getPixelRatio(e)),
    (this.pixelRatio = _['default'].adjustPixelRatio(
      this.floorData.mapWidth,
      this.floorData.floorMaxHeight,
      this.pixelRatio
    ))
  ;(e = null), (t = null)
}
t.prototype.resize = function(t, e) {
  var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
    n = arguments[3]
  if (
    ((this.viewHeight =
      e - this.mapConfig.screenHeight - this.mapConfig.legendHeight),
    t &&
      (0, s['default'])('.xseat-map, ' + this.container + ' .map-c').css(
        'width',
        t + 'px'
      ),
    e &&
      (0, s['default'])('.xseat-map, ' + this.container + ' .map-c').css(
        'height',
        this.viewHeight + 'px'
      ),
    this.xscroll && i.length > 0)
  ) {
    var r = i[0],
      a = r.vy + this.mapConfig.seatHeight > this.viewHeight
    this.xscroll.resetSize(a && this.isLastNRowSeat(r, 3), n)
  }
}
t.prototype.renderBestArea = function(t, e) {
  if ((e = e || this.bestArea)) {
    var i = this.repository.hasMultiFloor(),
      n = 6,
      r = e.startCol - 1,
      a = e.startRow - 1,
      o =
        this.mapConfig.seatWidth * r +
        this.mapConfig.seatMargin * (r - 1 + 0.5) +
        this.mapConfig.margin.left,
      s =
        this.mapConfig.seatHeight * a +
        this.mapConfig.seatMargin * (a - 1 + 0.5) +
        this.mapConfig.margin.top
    i && (s += this.mapConfig.floorDistance)
    var c = (this.mapConfig.seatWidth + this.mapConfig.seatMargin) * e.cols,
      l = (this.mapConfig.seatHeight + this.mapConfig.seatMargin) * e.rows
    t.beginPath(),
      t.setLineDash([3, 2]),
      (t.strokeStyle = f['default'].bestAreaBorderColor),
      (t.lineWidth = 1),
      t.moveTo(o + n, s),
      t.lineTo(o + c - n, s),
      t.quadraticCurveTo(o + c, s, o + c, s + n),
      t.lineTo(o + c, s + l - n),
      t.quadraticCurveTo(o + c, s + l, o + c - n, s + l),
      t.lineTo(o + n, s + l),
      t.quadraticCurveTo(o, s + l, o, s + l - n),
      t.lineTo(o, s + n),
      t.quadraticCurveTo(o, s, o + n, s),
      t.stroke(),
      t.closePath()
  }
}
t.prototype.renderMiddleLine = function(t) {
  var e = this.getCenterPosition().x
  t.beginPath(),
    t.setLineDash([3, 2]),
    (t.strokeStyle = f['default'].middleLineColor),
    (t.lineWidth = 1),
    t.moveTo(e, 0),
    t.lineTo(e, this.mapHeight - this.mapConfig.margin.bottom + 8),
    t.stroke(),
    t.closePath()
}
t.prototype.getCenterPosition = function() {
  var t =
      (this.mapWidth +
        this.mapConfig.margin.left -
        this.mapConfig.margin.right) /
      2,
    e =
      (this.mapHeight +
        this.mapConfig.margin.top -
        this.mapConfig.margin.bottom) /
      2
  return {
    x: t,
    y: e
  }
}
t.prototype.setSeatMapDimension = function() {
  ;(this.mapWidth = this.floorData.mapWidth),
    (this.mapHeight = this.floorData.mapHeight)
  var t = this.floorData.radarMapWidth,
    e = this.floorData.radarMapHeight
  ;(this.radarScale = 1),
    t > e && t > this.maxRadarWidth
      ? ((this.radarScale = this.maxRadarWidth / t),
        (e *= this.radarScale),
        (t = this.maxRadarWidth))
      : e > t &&
        e > this.maxRadarWidth &&
        ((this.radarScale = this.maxRadarWidth / e),
        (t *= this.radarScale),
        (e = this.maxRadarWidth)),
    (this.radarWidth = t),
    (this.radarHeight = e),
    (this.radarCanvas.width = t * this.pixelRatio),
    (this.radarCanvas.height = e * this.pixelRatio),
    (this.radarCanvas.style.width = t + 'px'),
    (this.radarCanvas.style.height = e + 'px'),
    this.radarCtx.scale(
      this.pixelRatio * this.radarScale,
      this.pixelRatio * this.radarScale
    )
}
t.prototype.renderSeatMap = function() {
  var t = this,
    e = this.repository.getFloorData()
  e.floors.forEach(function(e, i) {
    var n = e.parsedSeats
    if (n.length) {
      var r = t.getCtxBy(e.sectionId)
      0 === i && t.renderBestArea(r), t.renderFloorHeader(r, e)
      for (var a = 0, o = n.length; a < o; a++) {
        var s = n[a]
        t.renderSeat(r, s)
        // t.renderRadarSeat(s)
      }
      t.renderMiddleLine(r)
    }
  }),
    this.renderSeatIndex(),
    this.setMinScale()
  // this.setXScroll()
}
t.prototype.renderFloorHeader = function(t, e) {
  if (this.repository.hasMultiFloor()) {
    var i = this.mapConfig.margin.top + this.mapConfig.floorDistance / 2,
      n = e.sectionName.length,
      r = 20 * n
    t.beginPath(),
      (t.strokeStyle = f['default'].middleLineColor),
      (t.lineWidth = 0.5),
      t.moveTo(0, i),
      t.lineTo(this.mapWidth / 2 - r / 2, i),
      t.moveTo(this.mapWidth / 2 + r / 2, i),
      t.lineTo(this.mapWidth, i),
      t.stroke(),
      (t.font = '16px serif'),
      (t.textAlign = 'center'),
      (t.textBaseline = 'middle'),
      (t.fillStyle = '#999'),
      t.fillText(e.sectionName, this.mapWidth / 2, i),
      t.closePath()
  }
}
t.prototype.parseCustomImgs = function() {
  var t = this,
    e = this.data.skinsData && this.data.skinsData.contentVO
  if (e) {
    ;(this.seatImgs.order = e.seatSkinOrder.toString()),
      (this.customSeatImgs = {})
    var i = '310x310'
    ;(this.customSeatImgs.customLegendNormal = (0, P.getImgUrl)(
      e.availablePic,
      i
    )),
      (this.customSeatImgs.customNormal = (0, P.getImgUrl)(
        e.availableSingleSeatPic,
        i
      )),
      (this.customSeatImgs.customLoverNormal = (0, P.getImgUrl)(
        e.availableDoubleSeatPic,
        i
      )),
      (this.customSeatImgs.customSelected = (0, P.getImgUrl)(
        e.lockedSinglePic,
        i
      )),
      (this.customSeatImgs.customLoverSelected = (0, P.getImgUrl)(
        e.lockedDoublePic,
        i
      )),
      (this.customSeatImgs.customLegendSold = (0, P.getImgUrl)(
        e.soldoutPic,
        i
      )),
      (e.singleSeatPics = e.singleSeatPics.split(',')),
      (e.doubleSeatPics = e.doubleSeatPics.split(',')),
      e.singleSeatPics.forEach(function(e, n) {
        t.customSeatImgs['customSold' + n] = (0, P.getImgUrl)(e, i)
      }),
      e.doubleSeatPics.forEach(function(e, n) {
        t.customSeatImgs['customLoverSold' + n] = (0, P.getImgUrl)(e, i)
      }),
      (this.seatImgs.customSoldLength = e.singleSeatPics.length),
      (this.seatImgs.customLoverSoldLength = e.doubleSeatPics.length)
  }
}
t.prototype.getCustomSoldImg = function() {
  var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '0',
    e = Math.floor(Math.random() * this.seatImgs.customSoldLength),
    i = Math.floor(Math.random() * this.seatImgs.customLoverSoldLength),
    n = this.seatImgs.order
  if (
    (this.seatImgs.singleIdx || (this.seatImgs.singleIdx = 0),
    this.seatImgs.singleIdx >= this.seatImgs.customSoldLength &&
      (this.seatImgs.singleIdx = 0),
    this.seatImgs.loverIdx || (this.seatImgs.loverIdx = 0),
    this.seatImgs.loverIdx >= this.seatImgs.customLoverSoldLength &&
      (this.seatImgs.loverIdx = 0),
    '0' === t)
  ) {
    var r = '0' === n ? e : this.seatImgs.singleIdx++
    return {
      img: this.seatImgs['customSold' + r],
      x: 0,
      y: 0,
      w: 120,
      h: 120
    }
  }
  var a = '0' === n ? i : this.seatImgs.loverIdx++
  return {
    img: this.seatImgs['customLoverSold' + a],
    x: 0,
    y: 0,
    w: 264,
    h: 120
  }
}
t.prototype.getSeatImg = function() {
  var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    e = (t.flag || '').toString(),
    i = (t.status || '').toString(),
    n = '1' === i,
    r = this.repository.isSelected(t)
  return '0' === e
    ? r
      ? this.seatImgs.customSelected
        ? {
            img: this.seatImgs.customSelected,
            x: 0,
            y: 0,
            w: 120,
            h: 120
          }
        : {
            img: this.seatImgs.Sprite,
            x: 0,
            y: 80,
            w: 80,
            h: 80
          }
      : n
        ? this.supportAreaPrice
          ? a(
              {
                img: this.seatImgs.Sprite
              },
              S['default'].getAreaImgInfo(t)
            )
          : this.seatImgs.customNormal
            ? {
                img: this.seatImgs.customNormal,
                x: 0,
                y: 0,
                w: 80,
                h: 80
              }
            : {
                img: this.seatImgs.Sprite,
                x: 0,
                y: 0,
                w: 80,
                h: 80
              }
        : this.seatImgs.customSoldLength
          ? this.getCustomSoldImg(e)
          : {
              img: this.seatImgs.Sprite,
              x: 0,
              y: 160,
              w: 80,
              h: 80
            }
    : '1' === e || '2' === e
      ? r
        ? this.seatImgs.customLoverSelected
          ? {
              img: this.seatImgs.customLoverSelected,
              x: 0,
              y: 0,
              w: 264,
              h: 120
            }
          : {
              img: this.seatImgs.Sprite,
              x: 80,
              y: 80,
              w: 176,
              h: 80
            }
        : n
          ? this.supportAreaPrice
            ? a(
                {
                  img: this.seatImgs.Sprite
                },
                S['default'].getAreaImgInfo(t)
              )
            : this.seatImgs.customLoverNormal
              ? {
                  img: this.seatImgs.customLoverNormal,
                  x: 0,
                  y: 0,
                  w: 264,
                  h: 120
                }
              : {
                  img: this.seatImgs.Sprite,
                  x: 80,
                  y: 0,
                  w: 176,
                  h: 80
                }
          : this.seatImgs.customLoverSoldLength
            ? this.getCustomSoldImg(e)
            : {
                img: this.seatImgs.Sprite,
                x: 80,
                y: 160,
                w: 176,
                h: 80
              }
      : null
}
t.prototype.renderSeat = function(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
    i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
    n = this.getSeatImg(e)
  if (n) {
    var r = S['default'].isLeftLoverSeat(e),
      a = S['default'].isRightLoverSeat(e)
    return (
      i &&
        (r
          ? t.clearRect(
              e.x,
              e.y,
              2 * this.mapConfig.seatWidth + this.mapConfig.seatMargin,
              this.mapConfig.seatHeight
            )
          : a
            ? t.clearRect(
                e.x - this.mapConfig.seatWidth - this.mapConfig.seatMargin,
                e.y,
                2 * this.mapConfig.seatWidth + this.mapConfig.seatMargin,
                this.mapConfig.seatHeight
              )
            : t.clearRect(
                e.x,
                e.y,
                this.mapConfig.seatWidth,
                this.mapConfig.seatHeight
              )),
      r
        ? void t.drawImage(
            n.img,
            n.x,
            n.y,
            n.w,
            n.h,
            e.x,
            e.y,
            2 * this.mapConfig.seatWidth + this.mapConfig.seatMargin,
            this.mapConfig.seatHeight
          )
        : a
          ? void t.drawImage(
              n.img,
              n.x,
              n.y,
              n.w,
              n.h,
              e.x - this.mapConfig.seatWidth - this.mapConfig.seatMargin,
              e.y,
              2 * this.mapConfig.seatWidth + this.mapConfig.seatMargin,
              this.mapConfig.seatHeight
            )
          : void t.drawImage(
              n.img,
              n.x,
              n.y,
              n.w,
              n.h,
              e.x,
              e.y,
              this.mapConfig.seatWidth,
              this.mapConfig.seatHeight
            )
    )
  }
}
t.prototype.getRadarSeatColor = function() {
  var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
  return S['default'].canSold(t)
    ? this.repository.isSelected(t)
      ? f['default'].radarSeatSelectedColor
      : f['default'].radarSeatColor
    : f['default'].radarSeatSoldColor
}
t.prototype.renderRadarSeat = function() {
  var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
  this.radarCtx.fillStyle = this.getRadarSeatColor(t)
  var i = S['default'].isRightLoverSeat(t),
    n = S['default'].isLeftLoverSeat(t),
    r = 2 * this.mapConfig.radarSeatWidth + this.mapConfig.radarSeatMargin,
    a = t.rx,
    o = t.ry
  e &&
    (i
      ? this.radarCtx.clearRect(
          a - this.mapConfig.radarSeatWidth - this.mapConfig.radarSeatMargin,
          o,
          r,
          this.mapConfig.radarSeatHeight
        )
      : n
        ? this.radarCtx.clearRect(a, o, r, this.mapConfig.radarSeatHeight)
        : this.radarCtx.clearRect(
            a,
            o,
            this.mapConfig.radarSeatWidth,
            this.mapConfig.radarSeatHeight
          )),
    i
      ? this.radarCtx.fillRect(
          a - this.mapConfig.radarSeatWidth - this.mapConfig.radarSeatMargin,
          o,
          r,
          this.mapConfig.radarSeatHeight
        )
      : n
        ? this.radarCtx.fillRect(a, o, r, this.mapConfig.radarSeatHeight)
        : this.radarCtx.fillRect(
            a,
            o,
            this.mapConfig.radarSeatWidth,
            this.mapConfig.radarSeatHeight
          )
}
t.prototype.renderSeatIndex = function() {
  this.seatIndexEle.innerHTML = (0, l['default'])(k['default'], {
    rowHeight: this.mapConfig.seatHeight + this.mapConfig.seatMargin,
    data: this.repository.getRowIndexes()
  })
}
t.prototype.getTouchedSeat = function(t, e) {
  var i = this
  return this.repository.getAllSeats().filter(function(n) {
    var r = n.vx,
      a = n.vy,
      o = r + i.mapConfig.seatWidth,
      s = a + i.mapConfig.seatHeight,
      c = S['default'].isLeftLoverSeat(n),
      l = S['default'].isRightLoverSeat(n)
    return (
      c && (o += i.mapConfig.seatMargin / 2),
      l && (r -= i.mapConfig.seatMargin / 2),
      r <= t && t <= o && a <= e && e <= s
    )
  })
}
t.prototype.canSelect = function(t) {
  return !(
    !(t && t.seatId && S['default'].canSold(t)) || this.repository.isSelected(t)
  )
}
t.prototype.postValidate = function() {
  return this.seatValidator.validate()
}
t.prototype.invokeCallback = function() {
  var t = this,
    e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
    i = e.filter(function(e) {
      return t.isSeatOnMiddleLine(e)
    })
  if (i.length > 0) {
    var n = i[0]
    this.renderMiddleLine(this.getCtxBy(n.sectionId))
  }
  var r = this.repository.getSelectedSeats()
  console.log('Selected Seats: ', r),
    'function' == typeof this.config.afterSelectSeats &&
      this.config.afterSelectSeats(r, e)
}
t.prototype.getCtxBy = function(t) {
  var e = document.querySelector(this.container + ' .canvas-' + t)
  return e ? e.getContext('2d') : null
}
t.prototype.parseTappedSeats = function(t) {
  var e = this
  return t.map(function(t) {
    return 'string' == typeof t || 'number' == typeof t
      ? e.repository.getSeatById(t.toString())
      : t
  })
}
t.prototype.selectSeats = function() {
  var t = this,
    e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
    i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
  this.beforeSelectSeats(e, !1).then(function(n) {
    n &&
      Array.isArray(e) &&
      (i && t.scaleTo(t.minScale),
      (e = t.parseTappedSeats(e)),
      e.forEach(function(e) {
        var i = t.getCtxBy(e.sectionId)
        t.canSelect(e) &&
          (t.repository.addSeat(e),
          t.renderSeat(i, e, !0),
          t.renderRadarSeat(e, !0))
      }),
      t.invokeCallback(e))
  })
}
t.prototype.deselectSeats = function() {
  var t = this,
    e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
  this.beforeSelectSeats(e, !0).then(function(i) {
    i &&
      Array.isArray(e) &&
      ((e = t.parseTappedSeats(e)),
      e.forEach(function(e) {
        var i = t.getCtxBy(e.sectionId)
        t.repository.removeSeat(e),
          t.renderSeat(i, e, !0),
          t.renderRadarSeat(e, !0)
      })),
      t.invokeCallback(e)
  })
}
t.prototype.updateRadarState = function(t) {
  var e = document,
    i = e.querySelector('.radar-frame'),
    n = this.xscroll.containerWidth,
    r = this.xscroll.width,
    a = this.xscroll.containerHeight,
    o = this.xscroll.height,
    s = this.xscroll.getScrollPos(),
    c =
      ((t && void 0 === t.scrollLeft ? s.scrollLeft : t && t.scrollLeft) / n) *
      this.radarWidth,
    l =
      ((t && void 0 === t.scrollTop ? s.scrollTop : t && t.scrollTop) / a) *
      this.radarHeight
  ;(i.style.webkitTransform =
    'translate(' + c + 'px, ' + l + 'px) translateZ(0)'),
    (i.style.width = (this.radarWidth * r) / n + 'px'),
    (i.style.height = (this.radarHeight * o) / a + 'px'),
    (i.style.webkitTransition =
      'all ' + ((t && t.duration / 1e3) || 0) + 's ' + ((t && t.easing) || ''))
}
t.prototype.setMinScale = function() {
  ;(this.minScale = Math.min(
    this.viewWidth / this.mapWidth,
    this.viewHeight / this.mapHeight
  )),
    this.viewWidth >= this.mapWidth &&
      this.viewHeight >= this.mapHeight &&
      (this.minScale = 1)
}
t.prototype.getRowHeight = function() {
  return this.mapConfig.seatHeight + this.mapConfig.seatMargin
}
t.prototype.setXScroll = function() {
  var t = this,
    e = (0, s['default'])(this.container + ' .xseat-rows'),
    i = (0, s['default'])(this.container + ' .seat-watermark')
  ;(this.xscroll = new g['default']({
    renderTo: this.container + ' .xseat-map',
    lockX: !1,
    lockY: !1,
    useTransition: !0
  })),
    (this.xscrollScale = new v['default']({
      minScale: this.minScale,
      maxScale: this.maxScale,
      duration: 200
    })),
    this.xscroll.plug(this.xscrollScale)
  var n = new g['default']({
    renderTo: this.container + ' .xseat-index',
    lockX: !1,
    lockY: !1,
    useTransition: !0
  })
  this.xscroll.on('scroll', function(e) {
    n.scrollTo(0, e.scrollTop), t.updateRadarState(e)
  }),
    this.xscroll.on('tap', function(e) {
      t.onTap(e)
    }),
    this.xscroll.on('pinchend', function(r) {
      ;(t.nowScale = t.xscroll.scale),
        n.scrollTo(0, t.xscroll.y),
        t.updateRadarState(r),
        t.adjustRowHeight(e),
        t.adjustWatermark(i)
    }),
    this.xscrollScale.on('scaleanimate', function(n) {
      ;(t.nowScale = n.scale),
        t.updateRadarState(n),
        t.adjustRowHeight(e),
        t.adjustWatermark(i)
    }),
    // (0, s['default'])(this.container + ' .xseat-map .xs-content').on(
    //   'touchstart',
    //   function() {
    //     t.showRadar()
    //   }
    // ),
    this.showRadar(),
    this.adjustRowHeight(e),
    this.updateRadarState(),
    this.mapWidth > this.viewWidth &&
      setTimeout(function() {
        t.scaleTo(t.viewWidth / t.mapWidth, 0, 0, 500)
      }, 1e3)
}
t.prototype.adjustRowHeight = function(t) {
  t.css({
    height: this.mapHeight * this.nowScale,
    padding: 4 * this.nowScale + 'px 0 ' + 6 * this.nowScale + 'px 0'
  })
}
t.prototype.adjustWatermark = function(t) {
  var e = 20 / this.nowScale
  t.css({
    height: e,
    bottom: '-' + (e + 18) + 'px'
  })
}
t.prototype.scaleTo = function(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
    n = arguments[3]
  this.xscrollScale.scaleTo(t, e, i, n)
}
t.prototype.showRadar = function() {
  this.timer && clearTimeout(this.timer)
  var t = (0, s['default'])(this.container + ' .xseat-radar')
  t.addClass('active'),
    (this.timer = setTimeout(function() {
      t.removeClass('active')
    }, 2e3))
}
t.prototype.onTap = function(t) {
  t.preventDefault()
  var e = (0, s['default'])(t.target)
    .closest('.xs-content')
    .offset()
  if (e) {
    var i = t.center.x - e.left,
      n = t.center.y - e.top,
      r = i / this.nowScale,
      a = n / this.nowScale,
      o = this.getTouchedSeat(r, a)[0]
    if (o) {
      var c = null
      S['default'].isLeftLoverSeat(o)
        ? (c = this.repository.getSeatByRowAndCol(
            o.sectionId,
            o.row,
            +o.column + 1
          ))
        : S['default'].isRightLoverSeat(o) &&
          (c = this.repository.getSeatByRowAndCol(
            o.sectionId,
            o.row,
            +o.column - 1
          ))
      var l = []
      S['default'].canSold(o) && (l.push(o), c && l.push(c)),
        l.length &&
          (this.repository.isSelected(o)
            ? this.deselectSeats(l)
            : this.selectSeats(l))
    } else
      o = {
        vx: r,
        vy: a
      }
    this.scaleToSeat(o)
  }
}
t.prototype.isSeatOnMiddleLine = function(t) {
  var e = this.getCenterPosition().x,
    i = t.x,
    n = i + this.mapConfig.seatWidth
  return (
    S['default'].isLeftLoverSeat(t)
      ? (n = i + 2 * this.mapConfig.seatWidth + this.mapConfig.seatMargin)
      : S['default'].isRightLoverSeat(t) &&
        (i = i - this.mapConfig.seatWidth - this.mapConfig.seatMargin),
    i <= e && e <= n
  )
}
t.prototype.beforeSelectSeats = function(t, e) {
  if ('function' == typeof this.config.beforeSelectSeats) {
    var i = this.repository.getSelectedSeats()
    return this.config.beforeSelectSeats(i, e ? [] : t)
  }
  return Promise.resolve(!0)
}
t.prototype.scaleToSeat = function(t) {
  var e = this.getCenterPosition(),
    i = e.x,
    n = e.y,
    r = this.mapWidth,
    a = this.mapHeight,
    o = 0,
    s = 0
  t.vx < i
    ? ((o = -(this.mapConfig.seatWidth + 2 * this.mapConfig.seatMargin)),
      S['default'].isRightLoverSeat(t) &&
        (o = 2 * -(this.mapConfig.seatWidth + this.mapConfig.seatMargin)))
    : t.vx > i &&
      ((o = this.mapConfig.seatWidth),
      S['default'].isLeftLoverSeat(t) &&
        (o = 2 * (this.mapConfig.seatWidth + this.mapConfig.seatMargin))),
    t.vy < n
      ? (s = this.mapConfig.seatHeight)
      : t.vy > n && (s = this.mapConfig.seatHeight)
  var c = (t.vx + o) / r
  c > 1 ? (c = 1) : c < 0 && (c = 0)
  var l = (t.vy + s) / a
  l > 1 ? (l = 1) : l < 0 && (l = 0), this.xscrollScale.scaleTo(1, c, l, 300)
}
t.prototype.isLastNRowSeat = function(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3,
    i = this.repository.getFloorData()
  if (i && i.floors.length) {
    var n = i.floors.length,
      r = i.floors[n - 1]
    return t.sectionId === r.sectionId && t.row >= r.maxRow - e
  }
  return !1
}

module.exports = t
