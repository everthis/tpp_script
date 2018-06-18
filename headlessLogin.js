require('dotenv').config()
const puppeteer = require('puppeteer')
const { TB_LOGIN_URL, USER_AGENT, MY_TB_PAGE_URL } = require('./util/constant')
const cookiesArrToStr = require('./util/cookiesArrToStr')
const processPossibleMissingToken = require('./processPossibleMissingToken')
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
  await page.goto(MY_TB_PAGE_URL, {
    waitUntil: 'networkidle2'
  })
  const cookies = await page.cookies()

  await browser.close()
  return cookiesArrToStr(cookies)
}

module.exports = headlessLogin
