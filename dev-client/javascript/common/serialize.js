/*
 * object to query params
 */
export default function serialize(obj, prefix) {
  const str = []
  let p
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + '[' + p + ']' : p,
        v = obj[p]
      str.push(
        v !== null && typeof v === 'object'
          ? serialize(v, k)
          : encodeURIComponent(k) + '=' + encodeURIComponent(v)
      )
    }
  }
  return str.join('&')
}
