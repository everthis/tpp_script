const chkType = val => Object.prototype.toString.call(val)
const arrLikeObjToArr = obj => Array.prototype.slice.call(obj)
const ts = () => new Date().getTime()
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
module.exports = {
  chkType,
  arrLikeObjToArr,
  ts,
  sleep
}
