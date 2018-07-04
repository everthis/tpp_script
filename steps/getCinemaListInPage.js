const calcSign = require('../tb/calcSign')
const tbFetch = require('../util/tbFetch')
const { APP_KEY, CINEMA_LIST_IN_PAGE_URL } = require('../util/constant')
const tsFunc = require('../util/index').ts
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
    longitude: 0,
    latitude: 0,
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
