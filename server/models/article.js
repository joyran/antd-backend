/**
 * 导出 Article model，对应集合为 Articles
 */

// 从 mongoose.js 中导出 mongoose, Schema 两个变量
var { mongoose, Schema } = require('../utils/mongoose')

// 新建 articleSchema
var articleSchema = new Schema({
  title     : String,
  author    : String,
  views     : Number,
  likes     : Number,
  comments  : Number,
  createdAt : String
}, { versionKey: false })

// 根据 articleSchema 新建 Article model，对应集合为 articles
var Article = mongoose.model('Article', articleSchema)

module.exports = Article
