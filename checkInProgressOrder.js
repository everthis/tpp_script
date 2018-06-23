/**
 * jsv: 2.4.11
appKey: 12574478
t: 1529680144229
sign: 02856011e6500abf038829795093c83f
api: mtop.film.MtopSeatAPI.getOrderingSeatsCheck
v: 5.0
ecode: 1
isSec: 1
timeout: 10000
forceAntiCreep: true
AntiCreep: true
type: jsonp
dataType: jsonp
callback: mtopjsonp5
data: {"platform":"8"}
 */

const calcSign = require('./tb/calcSign')
const tbFetch = require('./util/tbFetch')
const { APP_KEY, PAY_CHECK_URL } = require('./util/constant')
const tsFunc = require('./util/index').ts
function genQsObj(cookieStr, obj) {
  const ts = tsFunc()
  const applyKeySplitter = ', '
  const dataObj = {
    useCouponFlag: 0,
    preSaleProcedure: 0,
    lockSeatApplyKey: `${userNumId}_${scheduleId}_[${seatIdsArr.join(
      applyKeySplitter
    )}]`,
    scheduleId: `${scheduleId}`,
    seatIDs: `${seatIdsArr.join('|')}`,
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
 * @param {string} scheduleId
 */
function lockSeat(cookieStr, scheduleId) {
  const qsObj = genQsObj(cookieStr, scheduleId)
  return tbFetch({
    cookie: cookieStr,
    url: PAY_CHECK_URL,
    qsObj
  })
}
module.exports = lockSeat
