/**
 * 导出 User model，对应集合为 users
 */

// 从 mongoose.js 中导出 mongoose, Schema 两个变量
var { mongoose, Schema } = require('../utils/mongoose')

// 新建 userSchema
var userSchema = new Schema({
  uid     : Number,
  username: String,
  password: String,
  mail    : String,
  avatar  : String,
  state   : String,
  sex     : String,
  age     : Number,
  birthday: String,
  phone   : String,
  createAt: String
}, { versionKey: false })

// 根据 userSchema 新建 User model，对应集合为 users
var User = mongoose.model('User', userSchema)

module.exports = User
