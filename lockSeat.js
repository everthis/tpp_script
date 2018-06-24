const calcSign = require('./tb/calcSign')
const tbFetch = require('./util/tbFetch')
const { APP_KEY, LOCK_SEAT_URL } = require('./util/constant')
const tsFunc = require('./util/index').ts
function genQsObj(cookieStr, { scheduleId, mobile, seatIDs, seatNames }) {
  const ts = tsFunc()
  const dataObj = {
    scheduleId,
    mobile,
    seatIDs,
    seatNames,
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
function lockSeat(cookieStr, payload) {
  const qsObj = genQsObj(cookieStr, payload)
  return tbFetch({
    cookie: cookieStr,
    url: LOCK_SEAT_URL,
    qsObj
  })
}
module.exports = lockSeat
