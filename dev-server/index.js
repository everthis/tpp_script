const Koa = require('koa')
const Router = require('koa-router')
const schedule = require('node-schedule')
const chalk = require('chalk')
const getShowsByCityCode = require('../getShowsByCityCode')
const getCinemaListInPage = require('../getCinemaListInPage')
const getCinemaSchedule = require('../getCinemaSchedule')
const headlessLogin = require('../headlessLogin')
const getAllRegion = require('../getAllRegion')
const { parse, stringify } = JSON
const { log } = console

const app = new Koa()
const router = new Router({
  prefix: '/tpp'
})
const cstate = {
  tbCookie: ''
}
const job = schedule.scheduleJob('*/10 * * * *', async function() {
  await headlessLogin().then(s => {
    cstate.tbCookie = s
    log(chalk.magenta('tbCookie refreshed!'))
  })
})
headlessLogin().then(tbCookie => {
  log(chalk.green('login successfully.'))
  cstate.tbCookie = tbCookie
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
    const schedules = await getCinemaSchedule(ctx.state.tbCookie, {
      cinemaId
    })
    ctx.body = stringify(schedules)
  })
  router.get('/schedules', async (ctx, next) => {
    ctx.body = stringify({ status: 'ok' })
  })

  app.use(router.routes()).use(router.allowedMethods())
  app.listen(8082)
})
