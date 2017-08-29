/**
 * 异常处理中间件, 捕获所有的异常并返回 404 Not Found
 */
var log = require('./log')

const exception = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    // 捕获到异常时返回 404 并写入 log
    ctx.status = 404
    ctx.body = { msg: 'Not Found', status: 404 }
    log(ctx, err)
  }
}

module.exports = exception
