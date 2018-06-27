export default function toSnakeCase(str) {
  const upperChars = str.match(/([A-Z])/g)
  if (!upperChars) {
    return str
  }

  let res = str.toString()
  for (let i = 0, n = upperChars.length; i < n; i++) {
    res = res.replace(
      new RegExp(upperChars[i]),
      '_' + upperChars[i].toLowerCase()
    )
  }
  if (res.slice(0, 1) === '_') {
    res = res.slice(1)
  }

  return res
}
