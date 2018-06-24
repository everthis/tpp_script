/**
jsv: 2.4.11
appKey: 12574478
t: 1529834266454
sign: 4889d7409d33746934765264b783931a
api: mtop.film.MtopOrderAPI.ordering
v: 5.0
ecode: 1
timeout: 10000
forceAntiCreep: true
AntiCreep: true
type: jsonp
dataType: jsonp
callback: mtopjsonp3
data: {"scheduleId":"537894352","lockSeatApplyKey":"388001568_537894352_[0000000000000001-2-06, 0000000000000001-2-05, 0000000000000001-2-04]","seatIDs":"0000000000000001-2-06|0000000000000001-2-05|0000000000000001-2-04","seatNames":"2排06座|2排05座|2排04座","totalPrice":"16200","useActivityFlag":"1","useMcardFlag":"1","orderExtInfo":"sqm=a1z2r.7661912.1.1","mobile":"13408522119","platform":"8"}
{"scheduleId":"538216834","lockSeatApplyKey":"388001568_538216834_[0000000000000001-4-07, 0000000000000001-4-06, 0000000000000001-4-05]","seatIDs":"0000000000000001-4-07|0000000000000001-4-06|0000000000000001-4-05","seatNames":"4排07座|4排06座|4排05座","activityIds":"64522","totalPrice":"12980","useActivityFlag":"4","useMcardFlag":"1","orderExtInfo":"sqm=a1z2r.7661912.1.1","mobile":"13408522119","platform":"8"}
 */

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
