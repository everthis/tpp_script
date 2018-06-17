/**
 * jsv: 2.4.11
appKey: 12574478
t: 1529245129790
sign: eba471a8d658bdb260c1884c4a8aba8a
api: mtop.film.MtopSeatAPI.getScheduleSeat
v: 7.5
ecode: 1
isSec: 1
timeout: 10000
forceAntiCreep: true
AntiCreep: true
type: jsonp
dataType: jsonp
callback: mtopjsonp2
data: {"scheduleId":"535813455","preSaleCode":"","platform":"8"}
 */
const calcSign = require('./tb/calcSign')
const tbFetch = require('./util/tbFetch')
const { APP_KEY, TPP_SCHEDULE_SEAT_URL } = require('./util/constant')
const tsFunc = require('./util/index').ts
function genQsObj(cookieStr, scheduleId) {
  const ts = tsFunc()
  const dataObj = { scheduleId, preSaleCode: '', platform: '8' }
  const dataStr = JSON.stringify(dataObj)
  return {
    jsv: '2.4.11',
    appKey: APP_KEY,
    t: ts,
    sign: calcSign(cookieStr, ts, APP_KEY, dataStr),
    api: 'mtop.film.MtopSeatAPI.getScheduleSeat',
    v: '7.5',
    ecode: '1',
    isSec: '1',
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
 * @param {string} scheduleId
 */
function queryScheduleSeat(cookieStr, scheduleId) {
  const qsObj = genQsObj(cookieStr, scheduleId)
  return tbFetch({
    cookie: cookieStr,
    url: TPP_SCHEDULE_SEAT_URL,
    qsObj
  })
}
module.exports = queryScheduleSeat
