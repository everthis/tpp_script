const calcSign = require('./tb/calcSign')
const tbFetch = require('./util/tbFetch')
const { APP_KEY, ALL_REGION_URL } = require('./util/constant')
const tsFunc = require('./util/index').ts
function genQsObj(cookieStr, { pageIndex, pagesize, citycode }) {
  const ts = tsFunc()
  const dataObj = {
    field:
      'i:id;poster;showName;showMark;remark;preScheduleRemark;director;leadingRole;previewNum;openDay;openTime;wantCount;fantastic;specialSchedules(i:id;tag;title;description)-1;derivationList(i:id;label;title;links;advertiseType);activities(i:id;activityTag;activityExtType;activityTitle;longDescription);type;duration;country;openCountry;friendCount;friends;starMeeting;preScheduleDates;soldTitle;soldType',
    pageIndex,
    pagesize,
    citycode,
    pageCode: '',
    platform: '8'
  }
  const dataStr = JSON.stringify(dataObj)
  return {
    jsv: '2.4.11',
    appKey: APP_KEY,
    t: ts,
    sign: calcSign(cookieStr, ts, APP_KEY, dataStr),
    api: 'mtop.film.MtopShowAPI.getShowsByCityCode',
    v: '4.0',
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
function getShowsByCityCode(cookieStr, payload) {
  const qsObj = genQsObj(cookieStr, payload)
  return tbFetch({
    cookie: cookieStr,
    url: ALL_REGION_URL,
    qsObj
  })
}
module.exports = getShowsByCityCode
