/**
 * 重新传参，一次完成fresh登录－－－>尝试最近这次API请求－－－>获得punish的URL
 * －－－>过验证码－－－>拿到期望的API数据--->保存新的cookie
 *
 */
require('dotenv').config()
const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPhoneX = devices['iPhone X']
const headlessLogin = require('./headlessLogin')
const cookiesArrToStr = require('../util/cookiesArrToStr')
const {
  TB_LOGIN_URL,
  MY_TB_PAGE_URL,
  TPP_MOBILE_HOMEPAGE_URL
} = require('../util/constant')
const TB_USERNAME = process.env.TB_USERNAME
const TB_PASSWORD = process.env.TB_PASSWORD
function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time)
  })
}

function reGeneratePunishLink(state, cbFn, cbFnPayload) {
  return async function({ browser, page }) {
    const cookiesArr = await page.cookies()
    const cookiesStr = cookiesArrToStr(cookiesArr)
    const apiResponse = await cbFn(
      { tbCookie: cookiesStr, tbCookieArr: cookiesArr },
      cbFnPayload
    )

    if (apiResponse && apiResponse.data && apiResponse.data.url) {
      const punishUrl = apiResponse.data.url
      const homepage = await browser.newPage()
      await homepage.emulate(iPhoneX)
      await homepage.goto(TPP_MOBILE_HOMEPAGE_URL)
      await delay(1000)

      const page = await browser.newPage()
      await page.emulate(iPhoneX)

      console.log('punishLink', punishUrl)
      await page.goto(punishUrl)
      page.on('request', req => console.log(req.url(), req.headers()))
      page.on('response', res => res.text().then(d => console.log(d)))
      page.on('console', msg => {
        for (let i = 0; i < msg.args.length; ++i)
          console.log(`${i}: ${msg.args[i]}`)
      })

      await delay(2000)
      const label = await page.$('.slider .label')
      const btn = await page.$('.slider .button')
      const btnBox = await btn.boundingBox()
      const labelBox = await label.boundingBox()
      const initCoord = {
        x: btnBox.x + btnBox.width / 2,
        y: btnBox.y + btnBox.height / 2
      }
      await page.mouse.move(initCoord.x, initCoord.y)
      await page.mouse.down()
      const distance = Math.floor(btnBox.x + labelBox.width - btnBox.width)
      await page.mouse.move(initCoord.x + distance, initCoord.y)
      await page.mouse.up()

      const windowHandle = await page.evaluateHandle(
        () => window.__captchah5_uaboption
      )
      console.log(await windowHandle.jsonValue())
      await page.screenshot({ path: `captcha-last.png` })

      const cc = await page.cookies()
      console.log(cc)
    }
  }
}
async function noCaptcha(apiData, state, cbFn, cbFnPayload) {
  console.log('preLink', apiData.data.url)
  await headlessLogin(reGeneratePunishLink(state, cbFn, cbFnPayload))
  return apiData
}

module.exports = noCaptcha
