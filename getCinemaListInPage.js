/**
 * jsv: 2.4.11
appKey: 12574478
t: 1530176131022
sign: 4d3362a8d04ec1bf2b1b9d5e8887b443
api: mtop.film.MtopCinemaAPI.getCinemaListInPage
v: 7.5
timeout: 10000
forceAntiCreep: true
AntiCreep: true
type: jsonp
dataType: jsonp
callback: mtopjsonp3
data: {"pageSize":10,"pageIndex":1,"pageCode":"APP_SHOW_CINEMA","regionName":"","support":0,"showTime":"","sortType":1,"brandCode":"","showDate":0,"cityCode":"310100","longitude":116.2907824,"latitude":40.048131999999995,"showId":"4363","platform":"8"}
 */

const calcSign = require('./tb/calcSign')
const tbFetch = require('./util/tbFetch')
const { APP_KEY, CINEMA_LIST_IN_PAGE_URL } = require('./util/constant')
const tsFunc = require('./util/index').ts
function genQsObj(cookieStr, { showId, pageIndex, pageSize, cityCode }) {
  const ts = tsFunc()
  const dataObj = {
    pageSize,
    pageIndex,
    pageCode: 'APP_SHOW_CINEMA',
    regionName: '',
    support: 0,
    showTime: '',
    sortType: 1,
    brandCode: '',
    showDate: 0,
    cityCode,
    longitude: 116.2907824,
    latitude: 40.048131999999995,
    showId,
    platform: '8'
  }
  const dataStr = JSON.stringify(dataObj)
  return {
    jsv: '2.4.11',
    appKey: APP_KEY,
    t: ts,
    sign: calcSign(cookieStr, ts, APP_KEY, dataStr),
    api: 'mtop.film.MtopCinemaAPI.getCinemaListInPage',
    v: '7.5',
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
function getCinemaListInPage(cookieStr, payload) {
  const qsObj = genQsObj(cookieStr, payload)
  return tbFetch({
    cookie: cookieStr,
    url: CINEMA_LIST_IN_PAGE_URL,
    qsObj
  })
}
module.exports = getCinemaListInPage
