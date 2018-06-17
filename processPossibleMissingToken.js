const FormData = require('form-data')
const querystring = require('querystring')
const calcSign = require('./tb/calcSign')
const cookiesArrToStr = require('./util/cookiesArrToStr')
const {
  USER_AGENT,
  SET_MISSING_TOKEN_URL,
  APP_KEY
} = require('./util/constant')
const fetch = require('node-fetch')
const tsFunc = require('./util/index').ts
async function processPossibleMissingToken(arr, ctx) {
  const mH5Token = arr.find(el => el.name === '_m_h5_tk')
  if (mH5Token == null) {
    const cookieStr = cookiesArrToStr(arr)
    const ts = tsFunc()
    const qsObj = {
      jsv: '2.4.0',
      appKey: APP_KEY,
      t: ts,
      sign: calcSign(cookieStr, ts, APP_KEY, ''),
      api: 'mtop.taobao.baichuan.smb.get',
      v: '1.0',
      type: 'get',
      dataType: 'json',
      timeout: 10000
    }
    const dataObj = {
      pageCode: 'mainMyTaobao',
      ua: USER_AGENT,
      params:
        '{"url":"http://h5.m.taobao.com/mlapp/mytaobao.html","referrer":"","oneId":null}'
    }
    const dataStr = JSON.stringify(dataObj)
    const fd = new FormData()
    fd.append('data', dataStr)
    return await fetch(
      `${SET_MISSING_TOKEN_URL}?${querystring.stringify(qsObj)}`,
      {
        method: 'post',
        headers: {
          cookie: cookieStr
        },
        body: fd
      }
    )
  }
}
module.exports = processPossibleMissingToken
