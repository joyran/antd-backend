/**
 * log4js 重新封装，定义了两个函数
 * apiLog 记录 API 请求错误
 * exceptionLog 记录所有异常
 */

var log4js = require('log4js')

log4js.configure({
  appenders: {
    Exception: {
      type: 'dateFile',
      filename: 'logs/',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: { appenders: ['Exception'], level: 'error'},
    API: { appenders: ['Exception'], level: 'error' },
    Exception: { appenders: ['Exception'], level: 'error'}
  }
})

// API请求失败 log
const apiLogger = log4js.getLogger('API')
// 异常 log
const exceptionLogger = log4js.getLogger('Exception')

// 返回格式化后的 log
const format = (ctx, content) => {
  // 错误消息
  var text = content + '\n'

  // 请求 url
  text += `    request url:     ${ctx.path}\n`

  // 请求方法
  text += `    request method:  ${ctx.request.method}\n`

  // 请求参数, 请求方法为GET时读取 ctx.params, 其它方法读取 ctx.request.body
  if (ctx.method == 'GET') {
    var params = JSON.stringify(ctx.params)
  } else {
    var params = JSON.stringify(ctx.request.body)
  }
  text += `    request params:  ${params}\n`

  // 请求地址
  text += `    request host:    ${ctx.request.ip}\n`
  
  // 回复状态码
  text += `    response status: ${ctx.status}`

  return text
}

const log = (ctx, content) => {
  if (content.type == 'API') {
    apiLogger.error(format(ctx, content.msg))
  } else {
    exceptionLogger.error(format(ctx, content))
  }
}

module.exports = log
