'use strict'
const threeNine = require('./39')
const fiveFourTwo = require('./542')
var n = threeNine,
  r = fiveFourTwo,
  a = function() {}
n.mix(a.prototype, r),
  n.mix(a.prototype, {
    plug: function(t) {
      var e = this
      if (t && t.pluginId) {
        e.__plugins || (e.__plugins = [])
        var i = e.getPlugin(t.pluginId)
        i && e.unplug(t.pluginId), t.pluginInitializer(e), e.__plugins.push(t)
      }
    },
    unplug: function(t) {
      var e = this
      if (t && e.__plugins) {
        var i = 'string' == typeof t ? e.getPlugin(t) : t
        i.pluginDestructor(e)
        for (var n = 0, r = e.__plugins.length; n < r; n++)
          e.__plugins[n] === i && e.__plugins.splice(n, 1)
      }
    },
    getPlugin: function(t) {
      var e = this,
        i = []
      if (!e.__plugins) return null
      for (var n = 0, r = e.__plugins.length; n < r; n++)
        e.__plugins[n] &&
          e.__plugins[n].pluginId === t &&
          i.push(e.__plugins[n])
      return i.length > 1 ? i : i[0] || null
    }
  })
module.exports = a
