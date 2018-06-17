require('dotenv').config()
const puppeteer = require('puppeteer')
const { TB_LOGIN_URL, USER_AGENT } = require('./util/constant')
const cookiesArrToStr = require('./util/cookiesArrToStr')
const { sleep } = require('./util/index')
const TB_USERNAME = process.env.TB_USERNAME
const TB_PASSWORD = process.env.TB_PASSWORD

/**
 * use puppeteer to get wanted cookies
 */
async function headlessLogin() {
  const browser = await puppeteer.launch({
    args: [`--user-agent=${USER_AGENT}`]
  })
  const page = await browser.newPage()
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
  const cookies = await page.cookies()
  await browser.close()
  // bypass tb server-side invalid response
  await sleep(100)
  return cookiesArrToStr(cookies)
}

module.exports = headlessLogin
