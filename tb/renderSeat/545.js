'use strict'
const threeNine = require('./39')
const sixFour = require('./64')
const oneZeroTwo = require('./102')
const oneSevenTwo = require('./172')
const oneSevenFour = require('./174')
const fiveFourFour = require('./544')
var n = threeNine,
  r = sixFour,
  a = oneSevenFour,
  o = oneSevenTwo,
  s = oneZeroTwo,
  c = fiveFourFour,
  l = function(t) {
    return new c(t)
  }
;(l.Util = n),
  (l.Base = r),
  (l.Timer = a),
  (l.Animate = o),
  (l.Hammer = s),
  (l.Plugins = {})
module.exports = l
