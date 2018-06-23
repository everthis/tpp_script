'use strict'
var n = function(e) {
    e = e || ''
    for (
      var t = ['waptest', 'wapa', 'm'], n = t[t.length - 1], r = 0;
      r < t.length;
      r++
    )
      if (e.indexOf(t[r]) != -1) {
        n = t[r]
        break
      }
    return n
  },
  r = 'm'

module.exports = {
  env: r,
  Env: n
}
