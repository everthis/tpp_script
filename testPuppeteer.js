require('dotenv').config()
const puppeteer = require('puppeteer')
const TB_USERNAME = process.env.TB_USERNAME
const TB_PASSWORD = process.env.TB_PASSWORD
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
const url =
  'https://h5.m.taopiaopiao.com/app/moviemine/pages/profile/index.html?from=def&title=%E6%88%91%E7%9A%84'

function waitForFrame(page) {
  let fulfill
  const promise = new Promise(x => (fulfill = x))
  checkFrame()
  return promise

  function checkFrame() {
    const frame = page.frames()[0]
    if (frame) fulfill(frame)
    else page.once('frameattached', checkFrame)
  }
}

async function login() {
  const browser = await puppeteer.launch({
    args: ['--disable-features=site-per-process']
  })
  const page = await browser.newPage()
  await page.goto(url)

  const frame = await waitForFrame(page)
  // 2. waiting for the frame to contain the necessary selector
  const umtEl = await frame.waitForSelector('#username')
  console.log(umtEl)
  // await sleep(3000)
  // const frame = await page.frames()[0]
  // await frame.waitForSelector('input[name=um_token]')
  // const uel = await frame.$('#username')
  // const pel = await frame.$('#password')
  // const btnEl = await frame.$('#btn-submit')
  // uel.value = TB_USERNAME
  // pel.value = TB_PASSWORD
  // btnEl.click()

  // const button = await frame.$('#selector');
  // await page.evaluate(
  //   (u, p) => {
  //     document.querySelector('#username').value = u
  //     document.querySelector('#password').value = p
  //     document.querySelector('#btn-submit').click()
  //   },
  //   TB_USERNAME,
  //   TB_PASSWORD
  // )
  const cookies = await page.cookies()
  console.log(cookies)

  await browser.close()
}

login()
