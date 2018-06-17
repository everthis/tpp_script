const calcSign = require('./tb/calcSign')
const tbFetch = require('./util/tbFetch')
const { APP_KEY, TB_USER_SIMPLE_INFO_URL } = require('./util/constant')
const tsFunc = require('./util/index').ts
function genQsObj(cookieStr) {
  const ts = tsFunc()
  const dataObj = { pageName: 'index' }
  const dataStr = JSON.stringify(dataObj)
  return {
    jsv: '2.4.0',
    appKey: APP_KEY,
    t: ts,
    sign: calcSign(cookieStr, ts, APP_KEY, dataStr),
    api: 'mtop.taobao.mclaren.getMyTaobaoPage',
    v: '1.0',
    ecode: '1',
    type: 'get',
    dataType: 'json',
    data: dataStr
  }
}

async function userSimpleInfo(cookieStr) {
  const qsObj = genQsObj(cookieStr)
  await tbFetch({
    cookie: cookieStr,
    url: TB_USER_SIMPLE_INFO_URL,
    qsObj
  })
}
module.exports = userSimpleInfo
