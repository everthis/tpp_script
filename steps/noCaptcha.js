/**
 * 重新传参，一次完成fresh登录－－－>尝试最近这次API请求－－－>获得punish的URL－－－>过验证码－－－>拿到期望的API数据--->保存新的cookie
 *
 */
require('dotenv').config()
const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPhoneX = devices['iPhone X']
const { TB_LOGIN_URL, MY_TB_PAGE_URL } = require('../util/constant')
const TB_USERNAME = process.env.TB_USERNAME
const TB_PASSWORD = process.env.TB_PASSWORD
function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time)
  })
}
async function noCaptcha(state, apiData) {
  const { tbCookie, tbCookieArr } = state
  const { url: punishUrl } = apiData.data
  const browser = await puppeteer.launch()
  const prepage = await browser.newPage()
  await prepage.emulate(iPhoneX)

  await prepage.goto(TB_LOGIN_URL)

  await prepage.evaluate(
    (u, p) => {
      document.querySelector('#username').value = u
      document.querySelector('#password').value = p
      document.querySelector('#btn-submit').click()
    },
    TB_USERNAME,
    TB_PASSWORD
  )
  await prepage.waitForNavigation()
  await prepage.goto(MY_TB_PAGE_URL, {
    waitUntil: 'networkidle0'
  })

  const page = await browser.newPage()
  await page.emulate(iPhoneX)

  // await page.setCookie(...tbCookieArr)
  await page.goto(punishUrl)
  page.on('request', req => console.log(req.url()))
  page.on('response', res => res.text().then(d => console.log(d)))
  console.log(punishUrl)
  await delay(1000)
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
  const distance = Math.floor(btnBox.x + labelBox.width - btnBox.width) + 10
  for (
    let i = 0, stepLen = 1;
    stepLen < distance;
    i++, stepLen += Math.floor(100 * Math.random())
  ) {
    await page.mouse.move(
      initCoord.x + stepLen,
      initCoord.y + 5 * Math.random()
    )
  }
  await page.mouse.move(
    btnBox.x + labelBox.width - btnBox.width + 50,
    initCoord.y
  )
  await page.screenshot({ path: `captcha-last.png` })
  await page.mouse.up()

  await delay(2000)
  const cc = await page.cookies()
  console.log(cc)
  await browser.close()
  return apiData
}

module.exports = noCaptcha
