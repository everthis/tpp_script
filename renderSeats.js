const mapConfig = {
  floorDistance: 48,
  legendHeight: 34,
  margin: {
    bottom: 8,
    left: 28,
    right: 28,
    top: 8
  },
  maxSize: 4096,
  radarSeatHeight: 4,
  radarSeatMargin: 2,
  radarSeatWidth: 4,
  screenHeight: 37,
  seatHeight: 40,
  seatMargin: 8,
  seatWidth: 40
}
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
        t.renderSeat(r, s), t.renderRadarSeat(s)
      }
      t.renderMiddleLine(r)
    }
  }),
    this.renderSeatIndex(),
    this.setMinScale(),
    this.setXScroll()
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
