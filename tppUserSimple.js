const calcSign = require('./tb/calcSign')
const tbFetch = require('./util/tbFetch')
const { APP_KEY, TPP_USER_SIMPLE_URL } = require('./util/constant')
const tsFunc = require('./util/index').ts
function genQsObj(cookieStr) {
  const ts = tsFunc()
  const dataObj = { platform: '8' }
  const dataStr = JSON.stringify(dataObj)
  return {
    jsv: '2.4.11',
    appKey: APP_KEY,
    t: ts,
    sign: calcSign(cookieStr, ts, APP_KEY, dataStr),
    api: 'mtop.user.getUserSimple',
    v: '1.0',
    ecode: '1',
    timeout: 10000,
    forceAntiCreep: false,
    AntiCreep: false,
    type: 'get',
    dataType: 'json',
    data: dataStr
  }
}

function tppUserSimple(cookieStr) {
  const qsObj = genQsObj(cookieStr)
  return tbFetch({
    cookie: cookieStr,
    url: TPP_USER_SIMPLE_URL,
    qsObj
  })
}
module.exports = tppUserSimple
