'use strict'
function i(t, e) {
  if (!(t instanceof e))
    throw new TypeError('Cannot call a class as a function')
}

var n =
  Object.assign ||
  function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = arguments[e]
      for (var n in i)
        Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
    }
    return t
  }

function t(e) {
  i(this, t),
    (this.cfg = n(
      {
        width: 0,
        height: 0
      },
      e
    )),
    (this._xtop = 0),
    (this._xright = 0),
    (this._xleft = 0),
    (this._xbottom = 0),
    this.refresh({
      width: this.cfg.width,
      height: this.cfg.height
    })
}
t.prototype.reset = function() {
  return (
    this.resetTop(),
    this.resetLeft(),
    this.resetBottom(),
    this.resetRight(),
    this
  )
}

t.prototype.resetTop = function() {
  return (this._xtop = 0), this.refresh(), this
}

t.prototype.resetLeft = function() {
  return (this._xleft = 0), this.refresh(), this
}

t.prototype.resetBottom = function() {
  return (this._xbottom = 0), this.refresh(), this
}

t.prototype.resetRight = function() {
  return (this._xright = 0), this.refresh(), this
}

t.prototype.expandTop = function(t) {
  return (this._xtop = t), this.refresh(), this
}

t.prototype.expandLeft = function(t) {
  return (this._xleft = t), this.refresh(), this
}

t.prototype.expandRight = function(t) {
  return (this._xright = t), this.refresh(), this
}

t.prototype.expandBottom = function(t) {
  return (this._xbottom = t), this.refresh(), this
}

t.prototype.refresh = function(t) {
  return (
    (this.cfg = n({}, this.cfg, t)),
    (this.top = this._xtop),
    (this.left = this._xleft),
    (this.bottom = ((t && t.height) || this.cfg.height || 0) - this._xbottom),
    (this.right = ((t && t.width) || this.cfg.width || 0) - this._xright),
    (this.width = this.right - this.left > 0 ? this.right - this.left : 0),
    (this.height = this.bottom - this.top > 0 ? this.bottom - this.top : 0),
    this
  )
}

module.exports = t
