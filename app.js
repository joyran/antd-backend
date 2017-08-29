const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const Router = require('koa-router')
const router = new Router()
const server = require('koa-static')
const bodyParser = require('koa-bodyparser')
const debug = require('debug')('http')

// 当 NODE_ENV 为开发环境 development 时采用 koa-webpack-middleware 同时调试node和react
if (process.env.NODE_ENV == 'development') {
  const webpack = require('webpack')
  const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware')
  const webpackConfig = require('./webpack.config.js')
  const compiler = webpack(webpackConfig)

  app.use(devMiddleware(compiler, {
    noInfo: true,
    quiet: true,
    lazy: false,
    publicPath: "/dist/",
    stats: { colors: true }
  }))

  app.use(hotMiddleware(compiler))

  debug('webpack start build')
}

const { mongoose, Schema } = require('./server/utils/mongoose')
const koaSession = require('koa-session2')
const SessionStore = require("./server/utils/session-store")
const exception = require('./server/middlewares/exception')

// 加密密钥
app.keys = ['i love you']

// 应用 session 中间件，存储到 mongodb sessions 集合
app.use(koaSession({
  store: new SessionStore(mongoose)
}))

// 应用异常处理中间件
app.use(exception)

// 定义 views 模版文件路径
app.use(views('./server/views', {}))

// 定义静态文件存储路径
app.use(server('./server/static'))

// -----------------------------------------------
// 导入路由文件
// -----------------------------------------------

// 登录状态合法性检测中间件
const auth = require('./server/routers/auth')
// 页面路由
const page = require('./server/routers/page')
// api 集合
const api = require('./server/routers/api')

// 应用路由
app.use(bodyParser())
app.use(auth.routes()).use(auth.allowedMethods())
app.use(page.routes()).use(page.allowedMethods())
app.use(api.routes()).use(api.allowedMethods())

// 开启服务器，监听端口 80
app.listen(80, (err) => {
  if (err) throw err
  debug('http server listen on http://localhost:80')
})
