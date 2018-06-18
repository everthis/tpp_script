const calcSign = require('./tb/calcSign')
const tbFetch = require('./util/tbFetch')
const { APP_KEY, LOCK_SEAT_URL } = require('./util/constant')
const tsFunc = require('./util/index').ts
function genQsObj(cookieStr, obj) {
  const ts = tsFunc()
  const dataObj = {
    scheduleId: '536194133',
    mobile: '1340xxxxxxxx',
    seatIDs: '0000000000000001-5-08|0000000000000001-5-09',
    seatNames: '5排08座|5排09座',
    platform: '8',
    activityIds: 0
  }
  const dataStr = JSON.stringify(dataObj)
  return {
    jsv: '2.4.11',
    appKey: APP_KEY,
    t: ts,
    sign: calcSign(cookieStr, ts, APP_KEY, dataStr),
    api: 'mtop.film.MtopSeatAPI.asyLockSeat',
    v: '5.0',
    ecode: '1',
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
function lockSeat(cookieStr, scheduleId) {
  const qsObj = genQsObj(cookieStr, scheduleId)
  return tbFetch({
    cookie: cookieStr,
    url: LOCK_SEAT_URL,
    qsObj
  })
}
module.exports = lockSeat
