require('dotenv').config()
const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPhoneX = devices['iPhone X']
const { TB_LOGIN_URL, USER_AGENT, MY_TB_PAGE_URL } = require('../util/constant')
const cookiesArrToStr = require('../util/cookiesArrToStr')
const TB_USERNAME = process.env.TB_USERNAME
const TB_PASSWORD = process.env.TB_PASSWORD

/**
 * use puppeteer to get wanted cookies
 */
async function headlessLogin(...cbFnArr) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.emulate(iPhoneX)
  await page.goto(TB_LOGIN_URL)

  await page.evaluate(
    (u, p) => {
      document.querySelector('#username').value = u
      document.querySelector('#password').value = p
      document.querySelector('#btn-submit').click()
    },
    TB_USERNAME,
    TB_PASSWORD
  )
  await page.waitForNavigation()
  await page.goto(MY_TB_PAGE_URL, {
    waitUntil: 'networkidle0'
  })
  const cookies = await page.cookies()

  // execute callback functions if they are passed in.
  // do this procedure before browser.close()
  if (cbFnArr.length) {
    for (let fn of cbFnArr) {
      await fn({ browser, page })
    }
  }
  await browser.close()
  return [cookiesArrToStr(cookies), cookies]
}

module.exports = headlessLogin
