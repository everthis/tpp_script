const n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
function u_encode(e) {
  if (!e) return ''
  for (let t, r, o, i, a, u, c, s = '', f = 0; f < e.length; )
    (t = e.charCodeAt(f++)),
      (r = e.charCodeAt(f++)),
      (o = e.charCodeAt(f++)),
      (i = t >> 2),
      (a = ((3 & t) << 4) | (r >> 4)),
      (u = ((15 & r) << 2) | (o >> 6)),
      (c = 63 & o),
      isNaN(r) ? (u = c = 64) : isNaN(o) && (c = 64),
      (s = s + n.charAt(i) + n.charAt(a) + n.charAt(u) + n.charAt(c))
  return s
}
module.exports = u_encode
