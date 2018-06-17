require('dotenv').config()
const puppeteer = require('puppeteer')
const { TB_LOGIN_URL, USER_AGENT } = require('./util/constant')
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
  const cookies = await page.cookies()
  //   const mH5TokenExist = cookies.find(el => el.name === '_m_h5_tk')
  //   console.log('prev')
  //   console.log(mH5TokenExist)
  await processPossibleMissingToken(cookies)
  const processedCookies = await page.cookies()
  //   const mH5Token = processedCookies.find(el => el.name === '_m_h5_tk')
  //   console.log('current')
  //   console.log(mH5Token)
  await browser.close()
  return cookiesArrToStr(processedCookies)
}

module.exports = headlessLogin
