// ------------------------------------------------------------------
// 所有 API 请求控制器
// ------------------------------------------------------------------

var { mongoose } = require('../utils/mongoose')
var log = require('../middlewares/log')

// 导入 models
var User    = require('../models/user')
var Menu    = require('../models/menu')
var Column  = require('../models/column')
var Article = require('../models/article')
var Comment = require('../models/comment')


// 根据 table 名返回对应的 Model 模型
const getModelByTable = (table) => {
  switch (table) {
    case 'article':
      return Article
      break

    case 'comment':
      return Comment
      break

    default:
      console.error('未匹配到 Model')
      return undefined
      break
  }
}


// 根据 data 递归生成树形 json 数组
const recursion = (data, pkey) => {
  var result = []
  var temp
  for (var i = 0; i < data.length; i++) {
    if (data[i].pkey == pkey) {
      var { title, key, link, icon } = data[i]
      var obj = { title, key, link, icon }
      temp = recursion(data, data[i].key)
      if (temp.length > 0) {
        obj.children = temp
      }
      result.push(obj)
    }
  }
  return result
}


// ------------------------------------------------------------------
// API 认证中间件，每一个 API 调用之前都要认证，未认证返回 401 需要认证
// ------------------------------------------------------------------
exports.authCheck = async (ctx, next) => {
  // 排除登录请求
  if (!ctx.session.uid && ctx.path != '/api/session') {
    var status = 401
    var msg = '需要认证'

    // 输出返回值
    var body = { status, msg }
    ctx.status = status
    ctx.body = body

    // 记录错误日志 log
    log(ctx, { type: 'API', msg })
  } else {
    await next()
  }
}

// ------------------------------------------------------------------
// 登录验证，登录对应的资源是 session，登录为创建新的会话
// ------------------------------------------------------------------
exports.login = async (ctx) => {
  // 读取用户名，密码，是否记住我选项
  var { username , password, remember } = ctx.request.body

  // 检测账号是否被锁定, 如果被锁定则不继续登录
  var user = await User.findOne({
                      state: '禁用',
                      $or: [
                        { username: username },
                        { mail:     username }
                    ]})

  if (user) {
    var msg = '账号被禁用，请联系管理员'
    var status  = 401
  } else {
    // password 和 username,email 中任何一个匹配成功则登录成功，反之登录失败
    var user = await User.findOne({
                        password: password,
                        $or: [
                          { username: username },
                          { mail:     username }
                      ]})

    if (user) {
      // 登录成功
      var status  = 201
      var msg = '登录成功'

      // 登录成功则将 uid,username,avator 写入session
      ctx.session.uid       = user.uid
      ctx.session.username  = user.username
      ctx.session.avatar    = user.avatar

      // 如果勾选“下次自动登录”，将uid写入到cookie中，生存时间1个月
      if (remember) {
        ctx.cookies.set('uid', user.uid, {
          signed: true,
          maxAge: 1000*3600*24*30,
          httpOnly: true
        })
      }
    } else {
      // 登录失败
      var status  = 401
      var msg = '登录失败，用户名或者密码错误！'
    }
  }

  // 输出返回值
  var body = { status, msg }
  ctx.status = status
  ctx.body = body
}


// ------------------------------------------------------------------
// 退出登录，删除 uid 和 koa:sess cookie，删除所有session
// ------------------------------------------------------------------
exports.logout = async (ctx) => {
  // 清空 session
  ctx.session = {}

  // 删除 uid和koa:sess cookie，设置 maxAge = 0实现
  ctx.cookies.set('uid', '', {
    maxAge: 0
  })
  ctx.cookies.set('koa:sess', '', {
    maxAge: 0
  })

  ctx.status = 204
}


// ------------------------------------------------------------------
// 读取 menus 数据结构，返回树形 json 数组
// ------------------------------------------------------------------
exports.getMenu = async (ctx) => {
  var result = await Menu.find({})
  // 根节点 key 为 root
  var menu = recursion(result, 'root')
  var status = 200

  // 输出返回值
  var body = { status, menu }
  ctx.status = status
  ctx.body = body
}


// ------------------------------------------------------------------
// 根据 table 返回 columns json 数据格式
// ------------------------------------------------------------------
exports.readColumns = async (ctx) => {
  var { table } = ctx.params
  var result = await Column.findOne({ table })

  var columns = result.columns
  var status = 200

  // 输出返回值
  var body = { status, columns }
  ctx.status = status
  ctx.body = body
}


// ------------------------------------------------------------------
// 读取表格数据源
// ------------------------------------------------------------------
exports.readDataSource = async (ctx) => {
  var { table } = ctx.params
  var skip  = parseInt(ctx.query.skip)
  var limit = parseInt(ctx.query.limit)
  var Model = getModelByTable(table)

  // 根据 skip 和 limit 返回文档集合
  var source = await Model.find({}).skip(skip).limit(limit)

  // 读取 table 所有文档数量
  var total = await Model.count({})
  var status = 200

  // 输出返回值
  var body = { status, source, total }
  ctx.status = status
  ctx.body = body
}


// ------------------------------------------------------------------
// 根据 table 和 rowId 读取行内容
// ------------------------------------------------------------------
exports.readRow = async (ctx) => {
  var { table, rowId } = ctx.params
  var Model = getModelByTable(table)

  // 第一步加载 column
  var result = await Column.findOne({ table })
  var columns = result.columns

  // 第二步根据 rowId 读取指定行
  var result = await Model.findOne({ _id: rowId })

  if (!result) {
    throw { type: 'API', msg: '读取文档失败' }
  }

  var status = 200
  // 更新 value
  columns.map((item) => {
    return item.value = result[item.dataIndex]
  })
  var body = { status, row: columns }

  // 输出返回值
  ctx.status = status
  ctx.body = body
}


// ------------------------------------------------------------------
// 更新行
// ------------------------------------------------------------------
exports.updateRow = async (ctx) => {
  var { table, rowId } = ctx.params
  var Model = getModelByTable(table)
  var row = ctx.request.body

  // upsert: false 找不到符合条件的文档时不新增
  // new: true 返回更新后的文档，如果为 false 且新增时返回null，所以new必须为 true
  var result = await Model.findOneAndUpdate({ _id: rowId }, row, { upsert: false, new: true })

  if (!result) {
    throw { type: 'API', msg: '更新失败' }
  }

  var status = 201
  // 输出返回值
  var body = { status }
  ctx.status = status
  ctx.body = body
}


// ------------------------------------------------------------------
// 新增行
// ------------------------------------------------------------------
exports.createRow = async (ctx) => {
  var { table } = ctx.params
  var Model = getModelByTable(table)
  var row = ctx.request.body

  row.owner = ctx.session.username
  var newRow = new Model(row)
  var result = await newRow.save()

  if (!result) {
    throw { type: 'API', msg: '新增失败' }
  }

  var status = 201
  // 输出返回值
  var body = { status }
  ctx.status = status
  ctx.body = body
}


// ------------------------------------------------------------------
// 删除一条 datagrid 记录
// ------------------------------------------------------------------
exports.deleteRow = async (ctx) => {
  var { table, rowId } = ctx.params
  var Model = getModelByTable(table)

  var result = await Model.findOne({ _id: rowId }).remove()
  if (!result) {
    throw { type: 'API', msg: '删除文档失败' }
  }

  ctx.status = 204
}


// ------------------------------------------------------------------
// 读取当前登录用户基本信息
// ------------------------------------------------------------------
exports.getUser = async (ctx) => {
  // 当前登录用户 uid
  var { uid } = ctx.session
  var result = await User.findOne({ uid })

  var status = 200
  var user = {
    username: result.username,
    mail: result.mail,
    score: result.score
  }

  // 输出返回值
  var body = { status, user }
  ctx.status = status
  ctx.body = body
}


// ------------------------------------------------------------------
// 未匹配到返回 404 Not Found
// ------------------------------------------------------------------
exports.notFound = async (ctx) => {
  throw { type: 'API', msg: '未匹配的 API 请求' }
}
