const Koa = require('koa')
const Router = require('koa-router')
const schedule = require('node-schedule')
const chalk = require('chalk')
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
const job = schedule.scheduleJob('*/1 * * * *', async function() {
  log(chalk.magenta('The answer to life, the universe, and everything!'))
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
  router.get('/schedules', async (ctx, next) => {
    ctx.body = stringify({ status: 'ok' })
  })

  app.use(router.routes()).use(router.allowedMethods())
  app.listen(8082)
})
