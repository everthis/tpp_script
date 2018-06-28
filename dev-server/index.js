const Koa = require('koa')
const Router = require('koa-router')
const schedule = require('node-schedule')
const chalk = require('chalk')
const getShowsByCityCode = require('../getShowsByCityCode')
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
const job = schedule.scheduleJob('*/20 * * * *', async function() {
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
  router.get('/schedules', async (ctx, next) => {
    ctx.body = stringify({ status: 'ok' })
  })

  app.use(router.routes()).use(router.allowedMethods())
  app.listen(8082)
})
