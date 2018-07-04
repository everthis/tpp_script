const puppeteer = require('puppeteer')
;(async () => {
  const browser = await puppeteer.launch({
    headless: true
  })

  const page = await browser.newPage()
  await page.setUserAgent(
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36'
  )
  await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 1 })

  await page.goto(
    'https://www.google.de/maps/@52.4889552,13.4707445,1555m/data=!3m1!1e3'
  )
  await page.waitForNavigation({ waitUntil: 'networkidle2' })

  await page.screenshot({ path: '1.png', fullPage: true })

  const innerWidth = await page.evaluate(_ => {
    return window.innerWidth
  })
  const innerHeight = await page.evaluate(_ => {
    return window.innerHeight
  })

  const mouse = page.mouse
  await mouse.move(innerWidth / 2, innerHeight / 2)
  await mouse.down()
  await mouse.move(innerWidth / 2 + 400, innerHeight / 2, { steps: 100 })
  await mouse.up()
  await page.waitForNavigation({ waitUntil: 'networkidle2' })

  await page.screenshot({ path: '2.png', fullPage: true })

  browser.close()
})()
