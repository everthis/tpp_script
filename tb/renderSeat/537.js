// 537
'use strict'
const oneOneThree = require('./113')
const thirteen = require('./13')
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

var a = oneOneThree,
  o = n(a),
  s = thirteen

function t(e) {
  r(this, t),
    (this.data = e),
    (this.mapConfig = e.mapConfig),
    (this.seatDic = {}),
    (this.seatRowColDic = {}),
    (this.floorData = {}),
    (this.allSeats = []),
    (this.selectedSeats = []),
    (this.rowIndexes = {}),
    this.parseFloors(),
    this.parseSeats(),
    this.parseRowNames()
}
t.prototype.setSeatXY = function(t, e) {
  var i = t.column - e.minColumn + 1,
    n = t.row - e.minRow + 1,
    r = this.mapConfig.seatWidth,
    a = this.mapConfig.seatHeight
  ;(t.x =
    (r + this.mapConfig.seatMargin) * (i - 1) +
    this.mapConfig.margin.left +
    e.vx),
    (t.y =
      (a + this.mapConfig.seatMargin) * (n - 1) + this.mapConfig.margin.top),
    this.floorData.floors.length > 1 && (t.y += this.mapConfig.floorDistance),
    (t.vx = t.x),
    (t.vy = t.y + e.vy)
  var o = this.mapConfig.radarSeatWidth,
    s = this.mapConfig.radarSeatHeight,
    c = this.mapConfig.radarSeatMargin
  ;(t.rx = (o + this.mapConfig.radarSeatMargin) * (i - 1) + c + e.rx),
    (t.ry = (s + this.mapConfig.radarSeatMargin) * (n - 1) + c + e.ry)
}
t.prototype.parseFloors = function() {
  for (
    var t = this.data.hallSeatMap,
      e = t.sectionSeatMapList || [],
      i = this.mapConfig.seatWidth,
      n = this.mapConfig.seatHeight,
      r = this.mapConfig.seatMargin,
      a = this.mapConfig.radarSeatWidth,
      o = this.mapConfig.radarSeatHeight,
      s = this.mapConfig.radarSeatMargin,
      c = 0,
      l = 0,
      u = 0,
      h = 0,
      d = [],
      f = 0,
      p = e.length;
    f < p;
    f++
  ) {
    var g = e[f],
      m = 1 * g.maxRow,
      v = 1 * g.minRow,
      y = 1 * g.maxColumn,
      S = 1 * g.minColumn,
      C = y - S + 1,
      w = m - v + 1
    c < C && (c = C),
      u < w && (u = w),
      (l += w),
      d.push({
        minColumn: S,
        maxColumn: y,
        minRow: v,
        maxRow: m,
        sectionId: g.sectionId || '',
        sectionName: g.sectionName || '',
        cols: C,
        rows: w,
        areas: g.areas,
        seats: g.seats
      })
  }
  for (
    var x =
        i * c +
        r * (c - 1) +
        this.mapConfig.margin.left +
        this.mapConfig.margin.right,
      b = 0,
      I = a * c + s * (c + 1),
      _ = s,
      T = 0,
      k = 0,
      A = 0,
      O = d.length;
    A < O;
    A++
  ) {
    var P = d[A]
    ;(P.w = x),
      (P.h = (n + r) * P.rows),
      d.length > 1
        ? (P.h += this.mapConfig.floorDistance)
        : 0 === A && (P.h += this.mapConfig.margin.top),
      A === O - 1 && (P.h += this.mapConfig.margin.bottom),
      (b += P.h),
      (_ += (o + s) * P.rows),
      h < P.h && (h = P.h)
    var L = Math.floor((c - P.cols) / 2)
    ;(P.leftOffsetCols = L),
      (P.vx = L * (i + r)),
      (P.vy = T),
      (P.rx = L * (a + s)),
      (P.ry = k),
      (T += P.h),
      (k += (o + s) * P.rows)
  }
  this.floorData = {
    totalCols: c,
    totalRows: l,
    floorMaxHeight: h,
    mapWidth: x,
    mapHeight: b,
    radarMapWidth: I,
    radarMapHeight: _,
    floors: d
  }
}
t.prototype.parseSeats = function() {
  var t = this
  ;(this.rowDic = {}),
    this.floorData.floors.forEach(function(e) {
      e.parsedSeats || (e.parsedSeats = []),
        e.loverSeatMap || (e.loverSeatMap = {})
      var i = e.seats || []
      t.parseAreaInfo(e)
      for (var n = 0, r = i.length; n < r; n++) {
        var a = i[n],
          s = {
            sectionId: e.sectionId,
            area: a.area || '',
            areaNo: t.getAreaNo(t.getAreaKey(e.sectionId, a.area)),
            name: a.name,
            rowName: a.rowName,
            extId: a.extId,
            column: a.column,
            row: a.row,
            seatId: a.seatId,
            flag: a.flag,
            status: a.status
          }
        if (
          (o['default'].isLoverSeat(s) &&
            (e.loverSeatMap[a.row]
              ? e.loverSeatMap[a.row].cols.push(s.column)
              : (e.loverSeatMap[a.row] = {
                  cols: [s.column]
                })),
          t.setSeatXY(s, e),
          !t.seatDic[s.extId])
        ) {
          ;(t.seatDic[s.extId] = s),
            t.allSeats.push(s),
            e.parsedSeats.push(s),
            t.data.selectedSeatIds.indexOf(a.seatId) !== -1 &&
              t.selectedSeats.push(s)
          var c = t.getSeatKey(e.sectionId, s.row, s.column)
          t.seatRowColDic[c] || (t.seatRowColDic[c] = s)
          var l = t.getRowKey(e.sectionId, s.row)
          if (!t.rowDic[l]) {
            var u = {
              rowName: s.rowName,
              row: parseInt(s.row, 10)
            }
            t.rowDic[l] = u
          }
        }
      }
      var h = t.seatRowColDic
      Object.keys(e.loverSeatMap).forEach(function(i) {
        for (
          var n = (e.loverSeatMap[i].cols || []).sort(function(t, e) {
              return t - e
            }),
            r = 0,
            a = n.length / 2;
          r < a;
          r++
        ) {
          var s = t.getSeatKey(e.sectionId, i, n[2 * r]),
            c = t.getSeatKey(e.sectionId, i, n[2 * r + 1]),
            l = h[c],
            u = h[s]
          !l && u && (u.flag = '0'),
            !u && l && (l.flag = '0'),
            l &&
              u &&
              +l.column > +u.column &&
              o['default'].isLeftLoverSeat(l) &&
              o['default'].isRightLoverSeat(u) &&
              ((l.flag = '2'), (u.flag = '1'))
        }
      })
    })
}
t.prototype.getRowKey = function(t, e) {
  return (t || 's') + '_' + e
}
t.prototype.parseRowNames = function() {
  var t = this,
    e = []
  this.floorData.floors.forEach(function(i) {
    for (var n = i.minRow; n <= i.maxRow; n++) {
      var r = t.getRowKey(i.sectionId, n),
        a = t.rowDic[r]
      n === i.minRow &&
        t.floorData.floors.length > 1 &&
        e.push({
          rowName: ''
        }),
        a
          ? e.push({
              row: n,
              rowName: a.rowName
            })
          : e.push({
              row: n,
              rowName: ''
            })
    }
  }),
    (this.rowIndexes = {
      rows: e,
      height: this.mapConfig.seatHeight + this.mapConfig.seatMargin
    })
}
t.prototype.resetFloorDimension = function() {
  var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1
  return this.floorData.floors.forEach(function(e) {
    ;(e.styleWidth = e.w), (e.w *= t), (e.styleHeight = e.h), (e.h *= t)
  })
}
t.prototype.parseAreaInfo = function() {
  var t = this,
    e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
  ;(this.areaDic = {}),
    e.areas &&
      e.areas.forEach(function(i) {
        var n = t.getAreaKey(e.sectionId, i.area)
        t.areaDic[n] || (t.areaDic[n] = parseInt(i.areaNo, 10))
      })
}
t.prototype.getAreaKey = function(t, e) {
  return t + '_' + e + '}'
}
t.prototype.getAreaNo = function(t) {
  return this.areaDic[t] || ''
}
t.prototype.getSeatById = function(t) {
  return this.seatDic[t]
}
t.prototype.getSeatKey = function() {
  var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
    e = arguments[1],
    i = arguments[2]
  return '' + ((t || 's') + '_') + e + '_' + i
}
t.prototype.getSeatByRowAndCol = function(t, e, i) {
  return this.seatRowColDic[this.getSeatKey(t, e, i)]
}
t.prototype.getFloorData = function() {
  return this.floorData
}
t.prototype.hasMultiFloor = function() {
  return (
    !(!this.floorData || !Array.isArray(this.floorData.floors)) &&
    this.floorData.floors.length > 1
  )
}
t.prototype.getAllSeats = function() {
  return this.allSeats || []
}
t.prototype.getSelectedSeats = function() {
  return this.selectedSeats
}
t.prototype.isSelected = function(t) {
  return this.selectedSeats.some(function(e) {
    return Array.isArray(t)
      ? t.some(function(t) {
          return t.seatId === e.seatId
        })
      : !!t.seatId && t.seatId === e.seatId
  })
}
t.prototype.removeSeat = function(t) {
  var e = this.getLoverSeat(t)
  this.selectedSeats = this.selectedSeats.filter(function(i) {
    return e
      ? i.seatId !== t.seatId && i.seatId !== e.seatId
      : i.seatId !== t.seatId
  })
}
t.prototype.addSeat = function(t) {
  if (!this.isSelected(t)) {
    this.selectedSeats.push(t)
    var e = this.getLoverSeat(t)
    e && this.selectedSeats.push(e)
  }
}
t.prototype.getRowIndexes = function() {
  return this.rowIndexes
}
t.prototype.getLoverSeat = function(t) {
  var e = null
  return (
    o['default'].isLeftLoverSeat(t)
      ? (e = this.getSeatByRowAndCol(t.sectionId, t.row, +t.column + 1))
      : o['default'].isRightLoverSeat(t) &&
        (e = this.getSeatByRowAndCol(t.sectionId, t.row, +t.column - 1)),
    e
  )
}
t.prototype.getBestArea = function() {
  var t = this.floorData,
    e = t.floors[0]
  if (this.isSupportAreaPrice()) return null
  var i = e.maxColumn - e.minColumn + 1,
    n = e.maxRow - e.minRow + 1
  if (i < 6 || n < 6) return null
  for (
    var r = Math.floor(n % 3 === 0 ? n / 3 : n / 3 + 1),
      a = Math.floor((i % 3) + i / 3),
      s = Math.floor((n + 1) / 3),
      c = Math.floor(i / 3),
      l = s + parseInt(e.minRow, 10),
      u = l + r - 1,
      h = c + parseInt(e.minColumn, 10),
      d = h + a - 1,
      f = !1,
      p = !0,
      g = !1,
      m = !1,
      v = l,
      y = u;
    v <= y;
    v++
  )
    for (var S = h, C = d; S <= C; S++) {
      var w = this.getSeatByRowAndCol(e.sectionId, v, S)
      S === h && o['default'].isRightLoverSeat(w) && !g && (g = !0),
        S === d && o['default'].isLeftLoverSeat(w) && !m && (m = !0),
        w || (f = !0),
        o['default'].canSold(w) && (p = !1)
    }
  return f || p
    ? null
    : (g && ((a += 1), (h -= 1)),
      m && (a += 1),
      (l = l - e.minRow + 1),
      (h = h - e.minColumn + 1 + e.leftOffsetCols),
      {
        startRow: l,
        startCol: h,
        rows: r,
        cols: a
      })
}
t.prototype.isSupportAreaPrice = function() {
  return !(
    !this.data.schedule ||
    !this.data.schedule.hasArea ||
    'true' !== this.data.schedule.hasArea.toString()
  )
}
t.prototype.getAreaPriceList = function() {
  var t = this
  return Array.isArray(this.priceList) && this.priceList.length
    ? this.priceList
    : ((this.priceList = []),
      this.data.priceList &&
        this.data.priceList.forEach(function(e) {
          var i = parseInt(e.oriPrice, 10),
            n = parseInt(e.promotionPrice, 10),
            r = (0, s.displayPrice)(i) + '\u5143'
          n < i &&
            (r +=
              '&nbsp;<span class="tip">(' +
              (e.activityFlag || e.cardFlag || '\u60e0') +
              (0, s.displayPrice)(n) +
              '\u5143)</span>'),
            t.priceList.push({
              cls: e.areaNo > 10 ? 'i-normal' : 'i-area-' + e.areaNo,
              txt: r
            })
        }),
      this.priceList)
}
t.prototype.getSeatLegendData = function(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
    n = i.customLegendNormal,
    r = i.customLegendSold,
    a = {
      cls: 'i-normal',
      txt: '\u53ef\u9009'
    },
    o = {
      cls: 'i-sold',
      txt: '\u5df2\u552e'
    },
    s = {
      cls: 'i-best-area',
      txt: '\u6700\u4f73\u89c2\u5f71\u533a'
    }
  n &&
    (a = {
      img: i.customLegendNormal,
      txt: '\u53ef\u9009'
    }),
    r &&
      (o = {
        img: r,
        txt: '\u5df2\u552e'
      })
  var c = []
  if (e) {
    c.push(o)
    var l = this.getAreaPriceList()
    return (
      l.forEach(function(t) {
        c.push(t)
      }),
      c
    )
  }
  return (c = c.concat([a, o])), t && c.push(s), c
}

module.exports = t
