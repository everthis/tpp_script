const calcSign = require('./tb/calcSign')
const tbFetch = require('./util/tbFetch')
const { APP_KEY, PLACE_ORDER_URL } = require('./util/constant')
const tsFunc = require('./util/index').ts
function genQsObj(
  cookieStr,
  {
    scheduleId,
    lockSeatApplyKey,
    seatIDs,
    seatNames,
    totalPrice,
    activityIds,
    useActivityFlag,
    mobile
  }
) {
  const ts = tsFunc()
  const dataObj = {
    scheduleId,
    lockSeatApplyKey,
    seatIDs,
    seatNames,
    totalPrice,
    useActivityFlag: useActivityFlag || '1',
    useMcardFlag: '1',
    orderExtInfo: 'sqm=a1z2r.7661912.1.1',
    mobile,
    platform: '8'
  }
  if (activityIds) {
    dataObj.activityIds = activityIds
  }
  const dataStr = JSON.stringify(dataObj)
  return {
    jsv: '2.4.11',
    appKey: APP_KEY,
    t: ts,
    sign: calcSign(cookieStr, ts, APP_KEY, dataStr),
    api: 'mtop.film.MtopOrderAPI.ordering',
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
function placeOrder(cookieStr, payload) {
  const qsObj = genQsObj(cookieStr, payload)
  return tbFetch({
    cookie: cookieStr,
    url: PLACE_ORDER_URL,
    qsObj
  })
}
module.exports = placeOrder
