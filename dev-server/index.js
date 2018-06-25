const Koa = require('koa')
const Router = require('koa-router')
const headlessLogin = require('../headlessLogin')
const { parse, stringify } = JSON

const app = new Koa()
const router = new Router({
  prefix: '/tpp'
})
let alreadyLoggedIn = false
app.use(async (ctx, next) => {
  // if (!alreadyLoggedIn) {
  // ctx.state.tppCookieStr = await headlessLogin()
  // alreadyLoggedIn = true
  // }
  ctx.state.status = '123'
  await next()
})
router.get('/test', async (ctx, next) => {
  console.log(ctx.state)
  // ctx.router available
  ctx.body = stringify({ status: 'ok' })
})
router.get('/schedules', async (ctx, next) => {
  // ctx.state.tppCookieStr = '123142'
  // ctx.router available
  ctx.body = stringify({ status: 'ok' })
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(8082)
