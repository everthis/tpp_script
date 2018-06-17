function cookiesArrToStr(arr) {
  return arr.reduce((ac, el, idx, a) => {
    return `${ac}${el.name + '=' + el.value}${idx === a.length - 1 ? '' : ';'}`
  }, '')
}
module.exports = cookiesArrToStr
