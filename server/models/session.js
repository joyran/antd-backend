/**
 * 导出 Session model，对应集合为 sessions，存储 session
 */

// 从 mongoose.js 中导出 mongoose, Schema 两个变量
var { mongoose, Schema } = require('../utils/mongoose')

// 新建 sessionSchema
// sid 为 session id 简写
// session 具体内容，格式如 {"uid":1,"username":"胡张东"}
var sessionSchema = new Schema({
  sid     : String,
  session : String
}, { versionKey: false })

// 根据 sessionSchema 新建 Session model，对应集合为 sessions
var Session = mongoose.model('Session', sessionSchema)

module.exports = Session
