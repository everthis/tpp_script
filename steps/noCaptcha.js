/**
 * a: X82Y
t: 2d56ac674af65b6fd44842b0fd28e50e
scene: register_h5
p: {"ncSessionID":"77a0c9c70f8"}
n: 109#3LCa7OTqap0GxBuLpB/yC0Tp6nvERMZcCqXyej8XGMHGr1LSejUWa8e1YBIG/AECrSADWeWB62a6FMqrMuseuq3XMmhBaS9ClJ50Txbc1MFA9yeugQ5n1T5YBh9Ul2qECK3CmoqAOcOR+saYgUlBS/1pliY4F6CI4D7eEU+SgecE4spYBUIaaNcRlB+HnCaa4YbcL+gQGacBf4CmSIC7EfGq2qNivu3M1ut09Nzb5w/JeiTCHk1AQENd/TnRZ4+4VXRoPhGjNPsnGsezsfqcO6KZQM6yrPLGvDNWPnCGOC19gx4Iv7RdhhhTyH/8aVfQuRhq+xdkKY9XzfqCdBLe24TqBYZ6mMbs9z1lWt33WgqfEgrFGJDz+jiPXNvTa3F7b8jDvq1qFj==
v: 923
callback: __jsonp_2532512858
 */
const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPhoneX = devices['iPhone X']
function delay(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time)
  })
}
async function singleMove(page) {
  await page.mouse.move(x, y)
}
async function noCaptcha({ tbCookie, tbCookieArr }, apiData) {
  const { url: punishUrl } = apiData.data
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.emulate(iPhoneX)
  await page.setCookie(...tbCookieArr)
  await page.goto(punishUrl)
  console.log(punishUrl)

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
    btnBox.x + labelBox.width - btnBox.width + 10,
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
