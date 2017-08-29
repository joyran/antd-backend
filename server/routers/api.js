/**
 * API 路由集合
 */

var Router = require('koa-router')
var router = new Router()

// 导入控制器
var Api     = require('../controllers/api')

// Api 请求权限认证
router.all('/api/*', Api.authCheck)
// 登录
router.post('/api/session', Api.login)
// 注销，退出
router.del('/api/session', Api.logout)
// 获取 menu
router.get('/api/menu', Api.getMenu)
// 读取 columns
router.get('/api/columns/:table', Api.readColumns)
// 读取表格数据源
router.get('/api/source/:table', Api.readDataSource)
// 读取指定行
router.get('/api/source/:table/:rowId', Api.readRow)
// 更新行
router.put('/api/source/:table/:rowId', Api.updateRow)
// 新增行
router.post('/api/source/:table', Api.createRow)
// 删除行
router.del('/api/source/:table/:rowId', Api.deleteRow)
// 读取当前登录用户
router.get('/api/user/me', Api.getUser)
// API 未匹配到路由写入日志文件
router.get('/api/*', Api.notFound)

// 导出路由 router
module.exports = router
