const chkType = val => Object.prototype.toString.call(val)
const arrLikeObjToArr = obj => Array.prototype.slice.call(obj)
module.exports = {
  chkType,
  arrLikeObjToArr
}
