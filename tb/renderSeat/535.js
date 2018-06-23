'use strict'
function i(t, e) {
  if (!(t instanceof e))
    throw new TypeError('Cannot call a class as a function')
}

function t() {
  return i(this, t), t.instance ? t.instance : void (t.instance = this)
}
t.prototype.load = function(t) {
  var e = this
  if (t.name && t.src)
    return new Promise(function(e, i) {
      var n = t.src,
        r = new Image()
      ;(r.onload = function() {
        e({
          name: t.name,
          img: r
        })
      }),
        (r.onerror = function(t) {
          i(t)
        }),
        (r.src = n)
    })
  if (Array.isArray(t)) {
    var i = t.map(function(t) {
      return e.load(t)['catch'](function(t) {
        return t
      })
    })
    return Promise.all(i)
  }
  return Promise.reject()
}

module.exports = t
