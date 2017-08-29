/**
 * 权限认证中间件，未登录则强制跳转到 login 登录页面
 * 已登陆则不做处理，除非访问的是 login 登录页面，会跳转到主页
 */

var Router = require('koa-router')
var router = new Router()
// 导入 User model
var User = require('../models/user')

// /*匹配所有路径，在访问所有路径之前
router.get('/*', async function (ctx, next) {
  if (ctx.session.uid) {
    // session.uid存在则表明已经登录成功
    var loginState = true
  } else {
    // session.uid不存在则判断cookie.uid是否合法，在数据库中查找uid
    if (ctx.cookies.get('uid')) {
      let uid = ctx.cookies.get('uid')
      let user = await User.findOne({ uid })

      if (user) {
        // cookie.uid 合法则将 uid,cname,ename,avator 写入session
        ctx.session.uid       = user.uid
        ctx.session.username  = user.username
        ctx.session.avatar    = user.avatar

        var loginState = true
      } else {
        // cookie.uid 非法
        var loginState = false
      }
    } else {
      // session.uid 和 cookie.uid 都不存在表明未登录
      var loginState = false
    }
  }

  if (loginState) {
    // 已经登录则跳转到主页/，但如果已经跳转到主页/则不在跳转，否则会出现重定向循环
    if (ctx.path == '/login') {
      await ctx.redirect('/')
    } else{
      await ctx.render('index')
    }
  } else {
    // 未登录则跳转到登录页面/login，但如果已经跳转到/login则不在跳转，否则会出现重定向循环
    if (ctx.path != '/login') {
      await ctx.redirect('/login')
    }
  }

  await next()
})

module.exports = router
