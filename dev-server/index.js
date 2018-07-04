const Koa = require('koa')
const Router = require('koa-router')
const schedule = require('node-schedule')
const chalk = require('chalk')
const getShowsByCityCode = require('../steps/getShowsByCityCode')
const getCinemaListInPage = require('../steps/getCinemaListInPage')
const getCinemaSchedule = require('../steps/getCinemaSchedule')
const queryScheduleSeat = require('../steps/queryScheduleSeat')
const headlessLogin = require('../steps/headlessLogin')
const getAllRegion = require('../steps/getAllRegion')
const { parse, stringify } = JSON
const { log } = console

const app = new Koa()
const router = new Router({
  prefix: '/tpp'
})
const cstate = {
  tbCookie: '',
  tbCookieArr: []
}
const job = schedule.scheduleJob('*/20 * * * *', async function() {
  await headlessLogin().then(([s, arr]) => {
    cstate.tbCookie = s
    cstate.tbCookieArr = arr
    log(chalk.magenta('tbCookie refreshed!'))
  })
})
headlessLogin().then(([tbCookie, tbCookieArr]) => {
  log(chalk.green('login successfully.'))
  cstate.tbCookie = tbCookie
  cstate.tbCookieArr = tbCookieArr
  app.use(async (ctx, next) => {
    ctx.state = cstate
    await next()
  })
  router.get('/test', async (ctx, next) => {
    console.log(ctx.state)
    ctx.body = stringify({ status: 'ok' })
  })
  router.get('/allRegion', async (ctx, next) => {
    const regions = await getAllRegion(ctx.state.tbCookie)
    ctx.body = stringify(regions)
  })
  router.get('/getShowsByCityCode', async (ctx, next) => {
    const crq = ctx.request.query
    const shows = await getShowsByCityCode(ctx.state.tbCookie, {
      pageIndex: crq.page,
      pagesize: crq.pageSize,
      citycode: crq.cityCode
    })
    ctx.body = stringify(shows)
  })
  router.get('/getCinemaListInPage', async (ctx, next) => {
    const { showId, pageIndex, pageSize, cityCode } = ctx.request.query
    const cinemas = await getCinemaListInPage(ctx.state.tbCookie, {
      showId,
      pageIndex,
      pageSize,
      cityCode
    })
    ctx.body = stringify(cinemas)
  })
  router.get('/getCinemaSchedule', async (ctx, next) => {
    const { cinemaId } = ctx.request.query
    const schedules = await getCinemaSchedule(ctx.state, {
      cinemaId
    })
    ctx.body = stringify(schedules)
  })
  router.get('/queryScheduleSeat', async (ctx, next) => {
    const { scheduleId } = ctx.request.query
    const seats = await queryScheduleSeat(ctx.state.tbCookie, scheduleId)
    ctx.body = stringify(seats)
  })

  app.use(router.routes()).use(router.allowedMethods())
  app.listen(8082)
})
