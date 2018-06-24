const calcSign = require('./tb/calcSign')
const tbFetch = require('./util/tbFetch')
const { APP_KEY, PAY_CHECK_URL } = require('./util/constant')
const tsFunc = require('./util/index').ts
function genQsObj(cookieStr, { scheduleId, lockSeatApplyKey, seatIDs }) {
  const ts = tsFunc()
  const dataObj = {
    useCouponFlag: 0,
    preSaleProcedure: 0,
    lockSeatApplyKey,
    scheduleId,
    seatIDs,
    useActivityFlag: 1,
    preSaleCodes: '',
    useMCardFlag: 1,
    actionType: '1',
    platform: '8'
  }
  const dataStr = JSON.stringify(dataObj)
  return {
    jsv: '2.4.11',
    appKey: APP_KEY,
    t: ts,
    sign: calcSign(cookieStr, ts, APP_KEY, dataStr),
    api: 'mtop.film.mtopmarketingapi.cacpaymentsolution',
    v: '7.2',
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
 * @param {object} payload
 */
function payCheck(cookieStr, payload) {
  const qsObj = genQsObj(cookieStr, payload)
  return tbFetch({
    cookie: cookieStr,
    url: PAY_CHECK_URL,
    qsObj
  })
}
module.exports = payCheck
