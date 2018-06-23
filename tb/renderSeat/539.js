'use strict'
const oneOneThree = require('./113')
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
  o = oneOneThree,
  s = n(o)

function t(e, i) {
  r(this, t),
    (this.options = a(
      {
        msg: {
          doNotLeaveSingleSeat:
            '\u4e0d\u8981\u7559\u4e0b\u5355\u4e2a\u7a7a\u5ea7',
          seatsMustContinuous:
            '\u8bf7\u9009\u62e9\u8fde\u5728\u4e00\u8d77\u7684\u5ea7\u4f4d\uff0c\u4e0d\u8981\u7559\u4e0b\u5355\u4e2a\u7a7a\u5ea7'
        }
      },
      i
    )),
    (this.repository = e)
}

t.prototype.validate = function() {
  ;(this.selectedSeats = this.repository.getSelectedSeats()),
    (this.sortedSeats = []),
    this.sortByRowAndCol()
  var t = this.sortedSeats.length
  if (t >= 2) {
    for (
      var e = this.sortedSeats[0], i = this.sortedSeats[0], n = 1, r = 1;
      r < t;
      r++
    ) {
      var a = this.sortedSeats[r]
      if (this.isAdjacent(e, a)) n += 1
      else {
        if (this.hasSingleEmptySeat(e, a))
          return this.options.msg.seatsMustContinuous
        if (1 === n && !this.isSeatValid(e))
          return this.options.msg.doNotLeaveSingleSeat
        if (n > 1 && !this.areAdjacentSeatsValid(i, e))
          return this.options.msg.doNotLeaveSingleSeat
        ;(n = 1), (i = a)
      }
      e = a
    }
    return 1 !== n || this.isSeatValid(e)
      ? n > 1 && !this.areAdjacentSeatsValid(i, e)
        ? this.options.msg.doNotLeaveSingleSeat
        : ''
      : this.options.msg.doNotLeaveSingleSeat
  }
  return t && this.isSeatValid(this.sortedSeats[0])
    ? ''
    : this.options.msg.doNotLeaveSingleSeat
}
t.prototype.isSeatCanBeSold = function(t) {
  return !(!t || !t.status) && '1' === t.status.toString()
}
t.prototype.hasSingleEmptySeat = function(t, e) {
  if (s['default'].isLoverSeat(t) || s['default'].isLoverSeat(e)) return !1
  if (t.row === e.row) {
    for (
      var i = 0, n = parseInt(t.column, 10) + 1, r = +e.column, a = n;
      a < r;
      a++
    ) {
      var o = this.repository.getSeatByRowAndCol(t.sectionId, t.row, a)
      if (!this.isSeatCanBeSold(o)) return !1
      i++
    }
    return 1 === i
  }
  return !1
}
t.prototype.isSeatValid = function(t) {
  if (s['default'].isLoverSeat(t)) return !0
  var e = this.isSeatCanBeSold(
      this.repository.getSeatByRowAndCol(t.sectionId, t.row, t.column - 1)
    ),
    i = this.isSeatCanBeSold(
      this.repository.getSeatByRowAndCol(t.sectionId, t.row, t.column - 2)
    ),
    n = this.isSeatCanBeSold(
      this.repository.getSeatByRowAndCol(t.sectionId, t.row, +t.column + 1)
    ),
    r = this.isSeatCanBeSold(
      this.repository.getSeatByRowAndCol(t.sectionId, t.row, +t.column + 2)
    )
  return !(e || !n || r) || (!(!e || i || n) || (!(e && !i) && !(n && !r)))
}
t.prototype.areAdjacentSeatsValid = function(t, e) {
  if (s['default'].isLoverSeat(t) || s['default'].isLoverSeat(e)) return !0
  var i = this.isSeatCanBeSold(
      this.repository.getSeatByRowAndCol(t.sectionId, t.row, t.column - 1)
    ),
    n = this.isSeatCanBeSold(
      this.repository.getSeatByRowAndCol(t.sectionId, t.row, t.column - 2)
    )
  if (!i) return !0
  var r = this.isSeatCanBeSold(
      this.repository.getSeatByRowAndCol(e.sectionId, e.row, +e.column + 1)
    ),
    a = this.isSeatCanBeSold(
      this.repository.getSeatByRowAndCol(e.sectionId, e.row, +e.column + 2)
    )
  return !r || (!(i && !n) && !(r && !a))
}
t.prototype.isAdjacent = function(t, e) {
  return t.row === e.row && 1 === Math.abs(t.column - e.column)
}
t.prototype.sortByRowAndCol = function() {
  this.sortedSeats = this.selectedSeats.sort(function(t, e) {
    return t.row - e.row > 0
      ? 1
      : t.row - e.row < 0
        ? -1
        : t.column - e.column > 0
          ? 1
          : t.column - e.column < 0
            ? -1
            : 0
  })
}

module.exports = t
