'use strict'
var a = navigator.userAgent
// var a =
// 'Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'
var s = {
  isUCU4: a.match(/UCBrowser/) && a.match(/UCBS/),
  isUCU3: a.match(/UCBrowser/) && a.match(/U3/),
  isIOS: a.match(/iP(hone|od|ad)/),
  isAndroid: a.match(/Android/),
  isWindVane: a.match(/WindVane/),
  isTBMovie: a.match(/TBMovie\/(\d+\.\d+)\.(\d+)/),
  isDY4: a.match(/WindVane/) && a.match(/AliApp.(DY)/),
  isDY5: a.match(/TBMovie/) && a.match(/AliApp.(DY)/),
  isMV: a.match(/WindVane/) && a.match(/AliApp.(DY)/),
  isDY: a.match(/TBMovie/) && a.match(/AliApp.(DY)/),
  isAT: a.match(/AliApp.(LX)/),
  isTB: a.match(/AliApp.(TB)/),
  isAP: a.match(/AliApp.(AP)/),
  isKB: a.match(/AliApp.(KB)/),
  isMVP: a.match(/AliApp.(MoviePro)/),
  isWB: a.match(/Weibo/),
  isWBM: a.match(/MovieApp/),
  isGD: a.match(/amap/),
  isXM: a.match(/AliApp.(XM)/),
  isYK: a.match(/Youku/),
  isTD: a.match(/tudou/),
  isYN: a.match(/yos/),
  isWL: a.match(/wulin/),
  isLW: a.match(/AliApp.(LW)/),
  isSM: a.match(/ALiSearchApp/),
  isUC: a.match(/AliApp.TUnionSDK/) && a.match(/UCBrowser/),
  isMJ: a.match(/ShoppingStreets/),
  isSG: a.match(/SogouMSESDK/),
  isWX: a.match(/MicroMessenger/),
  isQQ: a.match(/QQ/),
  isQZ: a.match(/Qzone/),
  isQR: a.match(/qrcode/),
  isDM: a.match(/damai|AliApp.(DM)/),
  isTM: a.match(/tmall/),
  isBC: a.match(/AliApp.(BC)/),
  isAliApp: a.match(/AliApp\(([^\/]+)\/([\d\.\_]+)\)/i),
  toString: function() {
    return a
  }
}
module.exports = s
