/**
_tb_token_: 3beea031e19b3
ttid: h5@iframe
action: LoginAction
event_submit_do_login: 1
TPL_redirect_url: https://h5.m.taobao.com/other/loginend.html?origin=https%3A%2F%2Fh5.m.taopiaopiao.com
loginFrom: WAP_TAOBAO
style: 
bind_token: 
assets_css: 
assets_js: 
ssottid: 
nv: false
otherLoginUrl: https://login.m.taobao.com/msg_login.htm?ttid=h5%40iframe&redirectURL=https%3A%2F%2Fh5.m.taobao.com%2Fother%2Floginend.html%3Forigin%3Dhttps%253A%252F%252Fh5.m.taopiaopiao.com
TPL_timestamp: 
TPL_password2: 7f91a952a454b59e1f1c463bc39a3327b02fa8d6dd0ac16fe84f5f3eec5a8450c9f4f5435972e52a24fe5c3f60a3331e047e140eaa33e7a4a8f8fe7513009337a1525d4a2ac5ac327c9ca8ef7d77bb4de6b6622dccb6ae8e2ae179b19de417e513499ca83ba16c855bad7c04c4985de073ead102df54843ef65253c5b4a8b1c5
page: loginV3
ncoSig: 
ncoSessionid: 
ncoToken: 
TPL_username: wwwaap@gmail.com
um_token: HV01WAAZ0b83f229246e11145b208c3900a25ac1
ua: 107#sszsBsS9s91EGVcyLP9jXzy1Xn6sgO6Xjs6bTAqUgaiyXzgO//fCSaTblnhggeDfSpLEiAdvgKqExl4c/uaZmzOqxrxgIVmV8F8tV6ZSjWo+/cYroZoKWLVDbtDXyheOatVCWJbOqihEppcu/fSQKN54SM28K3KMuC2o6/pwk0l39CGOM22twzPcnSs5XXEdPkYDPyFlXQl1PLcVF+OEqqyhwhrqodCj7jyV2ETLI7vX101oc0K+rYXt3h/0o0TQjpiU7xYAqioGlJGfd0hLwC+D8uWl30/k6piKJiF6oJweZ50qvclmcYTtvqCIvmET+Ft6WctewvI21da5ufu8qS9ZePEzopyVkBEm+HjYe1ZqvdSpQvHze/DEbVC1e1DS6T/4iXjz8dN9QvIdF7+Yte9pCC+ht0g+2FMB2yFLGZabc62al5rieeDhhuicpprej9rHmTDmrcou19ca929kp+yh3qKHG09sgFQH6y/7hZRvcvAZ0dqgqs+DCerqC7922Qj0gTt5GZseQ119XBQ/atyh3qTL8BrWByuA5gqg3gZFZ5fbQ79krqYauzOj32922Qj05gqg37cb816wZJyPteiDeeuu8BlW699A69i/Xf53Z5Zr0xMzUhyEGrFahvVjy9/4kiHj8ms8Qv7pxBlLw/pDCVur8visBFpg6yuiCmNqv1ACcJHiw/DEheVhIJjig9hRk9t/wZxr90aq1dC6rWTduqjt3xWjijKL6HEH3cwtE6I4UZQiuV+hG/Cpt1pB5iiygHpj3vPbvxPuQ0hHbqThbW/G3ctiyp+nBHyi37dVfxxqF2KWuqYawq/Q32p92LMB2yilrcouE21Re09kbhXawqgx32Cn2jXgiDMW37v3Em60cmKmrhTewhuMeZuykTQTgyyXCf0IvZIpv1FXCMHEb3i0hJgWmxYDPyFXXZrwx8b7ZXXlEIY4
*/
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const FormData = require('form-data')
const cheerio = require('cheerio')
const encryptRSA = require('./tb/encryptPwd').RSAKey
const { chkType, arrLikeObjToArr } = require('./util/index')
const {
  LOGIN_IFRAME_URL: loginPageUrl,
  USER_AGENT
} = require('./util/constant')
const { log } = console
const TB_PASSWORD = process.env.TB_PASSWORD

function calcTplPwd(pwd, jm, je) {
  const ins = new encryptRSA()
  ins.setPublic(jm, je)
  return ins.encrypt(pwd)
}

function mergeArrOfObj(arr) {
  const res = {}
  arr.forEach(el => Object.assign(res, el))
  return res
}

function loginFormData(params) {
  const form = new FormData()
  const {
    J_Module,
    J_Exponent,
    _tb_token_,
    ttid,
    action,
    event_submit_do_login,
    TPL_redirect_url,
    loginFrom,
    otherLoginUrl,
    nv,
    page
  } = params
  form.append('_tb_token_', _tb_token_)
  form.append('ttid', ttid)
  form.append('action', action)
  form.append('event_submit_do_login', event_submit_do_login)
  form.append('TPL_redirect_url', TPL_redirect_url)
  form.append('loginFrom', loginFrom)
  form.append('otherLoginUrl', otherLoginUrl)
  form.append('nv', nv)
  form.append('page', page)
  form.append('TPL_username', process.env.TB_USERNAME)
  form.append('TPL_password2', calcTplPwd(TB_PASSWORD, J_Module, J_Exponent))
  return form
}
function parseForm(str) {
  const $ = cheerio.load(str)
  const loginFormEl = $('#loginForm')
  const actionParams = {
    url: $(loginFormEl).attr('action'),
    method: $(loginFormEl).attr('method')
  }
  const inputs = $(loginFormEl)
    .find('input')
    .map((idx, el) => ({
      [$(el).attr('name') || $(el).attr('id')]: $(el).attr('value')
    }))
  return {
    actionParams,
    formDataParams: mergeArrOfObj(arrLikeObjToArr(inputs))
  }
}
function tbLogin({ actionParams, formDataParams }) {
  return fetch(actionParams.url, {
    method: actionParams.method,
    body: loginFormData(formDataParams),
    redirect: 'follow',
    credentials: 'include',
    headers: {
      'user-agent': USER_AGENT,
      referer: actionParams.url,
      origin: path.parse(actionParams.url).dir
    }
  }).then(r => {
    for (var pair of r.headers.entries()) {
      log(pair[0] + ': ' + pair[1])
    }
    return r.text()
  })
}

fetch(loginPageUrl)
  .then(r => r.text())
  .then(parseForm)
  .then(tbLogin)
