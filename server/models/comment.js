/**
 * 导出 Comment model，对应集合为 Comments
 */

// 从 mongoose.js 中导出 mongoose, Schema 两个变量
var { mongoose, Schema } = require('../utils/mongoose')

// 新建 commentSchema
var commentSchema = new Schema({
  titleid   : Number,
  comment   : String,
  author    : String,
  createdAt : String
}, { versionKey: false })

// 根据 commentSchema 新建 Comment model，对应集合为 comments
var Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
