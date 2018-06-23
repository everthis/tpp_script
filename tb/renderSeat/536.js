'use strict'
const one = require('./1')
const oneSevenOne = require('./171')
function n(t) {
  return t && t.__esModule
    ? t
    : {
        default: t
      }
}

var r = one,
  a = n(r),
  o = oneSevenOne,
  s = n(o),
  c = {
    getPixelRatio: function(t) {
      var e = window.devicePixelRatio || 1,
        i =
          t.webkitBackingStorePixelRatio ||
          t.mozBackingStorePixelRatio ||
          t.msBackingStorePixelRatio ||
          t.oBackingStorePixelRatio ||
          t.backingStorePixelRatio ||
          1,
        n = e / i
      return n > 2 ? 2 : n.toFixed(1)
    },
    adjustPixelRatio: function(t, e, i) {
      if (i <= 1) return 1
      var n = s['default'].maxSize
      a['default'].isIOS && (n = 2048)
      var r = t * i,
        o = e * i
      return r > n || o > n ? ((i -= 0.5), this.adjustPixelRatio(t, e, i)) : i
    }
  }
module.exports = c
