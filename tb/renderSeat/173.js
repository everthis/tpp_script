'use strict'

var i = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
  quadratic: [0.33, 0.66, 0.66, 1],
  circular: [0.1, 0.57, 0.1, 1],
  bounce: [0.71, 1.35, 0.47, 1.41],
  format: function(t) {
    if (t)
      return 'string' == typeof t && this[t]
        ? this[t] instanceof Array
          ? [' cubic-bezier(', this[t], ') '].join('')
          : this[t]
        : t instanceof Array
          ? [' cubic-bezier(', t, ') '].join('')
          : t
  }
}
module.exports = i
