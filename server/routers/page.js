/**
 * 页面路由
 */

var Router = require('koa-router')
var router = new Router()

// 主页
router.get('/', async function (ctx, next) {
  await ctx.render('index')
})

// 登录页
router.get('/login', async function (ctx, next) {
  await ctx.render('login')
})

module.exports = router
