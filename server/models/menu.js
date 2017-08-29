/**
 * 导出 Menu model，对应集合为 menus, 左边菜单栏
 */

// 从 mongoose.js 中导出 mongoose, Schema 两个变量
var { mongoose, Schema } = require('../utils/mongoose')

// 新建 menuSchema
var menuSchema = new Schema({
  key   : String,
  pkey  : String,
  icon  : String,
  title : String,
  link  : String
}, { versionKey: false })

// 根据 menuSchema 新建 Menu model，对应集合为 users
var Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu
