/**
 * 把 mongoose 的声明和数据库连接部分单独打包成一个模块
 * 导出 mongoose 和  Schema 两个变量
 * 其中 mongoose 类型为 object， Schema 类型为 function，是一个构造函数
 */

// mongodb 操作采用 mongoose 模块
const mongoose = require('mongoose')
const debug = require('debug')('http')
const Schema = mongoose.Schema

// 设置 mongoose 的 promise 为 bluebird
mongoose.Promise = require('bluebird')
const config = require('config')

// mongodb 服务器地址
const host = config.get('mongodb.host')
// mongodb 服务器连接端口号
const port = config.get('mongodb.port')
// mongodb 数据库名称
const database = config.get('mongodb.database')
// mongodb 数据库连接用户名
const username = config.get('mongodb.username')
// mongodb 数据库连接密码
const password = config.get('mongodb.password')

// 连接 mongodb 服务器
mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}`, {useMongoClient: true})

// 得到数据库操作对象 db
const db = mongoose.connection
// 连接失败时报错
db.on('error', () => {debug('connect mongodb error')})
// 连接成功时提示连接成功
db.once('open', () => {debug('connect mongodb success')})

// 导出 mongoose 和  Schema 两个变量
module.exports = { mongoose, Schema }
