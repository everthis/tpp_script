const calcSign = require('../tb/calcSign')
const tbFetch = require('../util/tbFetch')
const { APP_KEY, ALL_REGION_URL } = require('../util/constant')
const tsFunc = require('../util/index').ts
function genQsObj(cookieStr) {
  const ts = tsFunc()
  const dataObj = {
    platform: '8'
  }
  const dataStr = JSON.stringify(dataObj)
  return {
    jsv: '2.4.11',
    appKey: APP_KEY,
    t: ts,
    sign: calcSign(cookieStr, ts, APP_KEY, dataStr),
    api: 'mtop.film.MtopRegionAPI.getAllRegion',
    v: '4.0',
    timeout: 10000,
    forceAntiCreep: false,
    AntiCreep: false,
    type: 'get',
    dataType: 'json',
    data: dataStr
  }
}
/**
 *
 * @param {string} cookieStr
 */
function getAllRegion(cookieStr) {
  const qsObj = genQsObj(cookieStr)
  return tbFetch({
    cookie: cookieStr,
    url: ALL_REGION_URL,
    qsObj
  })
}
module.exports = getAllRegion
