const calcSign = require('../tb/calcSign')
const tbFetch = require('../util/tbFetch')
const { APP_KEY, TPP_SCHEDULE_SEAT_URL } = require('../util/constant')
const tsFunc = require('../util/index').ts
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
