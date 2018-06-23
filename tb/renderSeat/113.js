var i = {
  canSold: function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      e = (t.status || '').toString()
    return '1' === e
  },
  getAreaImgInfo: function(t) {
    var e = 1 * t.areaNo
    return (
      e > 10 ? (e = -1) : e > 0 ? (e -= 1) : (e = -1),
      e === -1
        ? i.isLoverSeat(t)
          ? {
              x: 80,
              y: 0,
              w: 176,
              h: 80
            }
          : {
              x: 0,
              y: 0,
              w: 80,
              h: 80
            }
        : i.isLoverSeat(t)
          ? {
              x: 336,
              y: 80 * e,
              w: 176,
              h: 80
            }
          : {
              x: 256,
              y: 80 * e,
              w: 80,
              h: 80
            }
    )
  },
  isLoverSeat: function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
    return this.isLeftLoverSeat(t) || this.isRightLoverSeat(t)
  },
  isLeftLoverSeat: function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      e = (t.flag || '').toString()
    return '1' === e.toString()
  },
  isRightLoverSeat: function() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      e = (t.flag || '').toString()
    return '2' === e.toString()
  }
}

module.exports = i
