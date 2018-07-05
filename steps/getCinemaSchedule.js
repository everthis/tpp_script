const calcSign = require('../tb/calcSign')
const tbFetch = require('../util/tbFetch')
const noCaptcha = require('./noCaptcha')
const { APP_KEY, CINEMA_SCHEDULE_URL } = require('../util/constant')
const tsFunc = require('../util/index').ts
function genQsObj(cookieStr, { cinemaId }) {
  const ts = tsFunc()
  const dataObj = {
    cinemaId,
    hall: '',
    showVersion: '',
    h5AccessFlag: 0,
    platform: '8'
  }
  const dataStr = JSON.stringify(dataObj)
  return {
    jsv: '2.4.11',
    appKey: APP_KEY,
    t: ts,
    sign: calcSign(cookieStr, ts, APP_KEY, dataStr),
    api: 'mtop.film.MtopScheduleAPI.getCinemaSchedules',
    v: '7.0',
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
function getCinemaSchedule(state, payload) {
  const { tbCookie: cookieStr } = state
  const qsObj = genQsObj(cookieStr, payload)
  return tbFetch({
    cookie: cookieStr,
    url: CINEMA_SCHEDULE_URL,
    qsObj
  })
  // .then(async d => {
  //   if (d.data && d.data.url) {
  //     // return d
  //     return await noCaptcha(state, d, getCinemaSchedule, payload)
  //   } else {
  //     return d
  //   }
  // })
}
module.exports = getCinemaSchedule
