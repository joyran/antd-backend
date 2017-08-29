/**
 * 导出 Column model，对应集合为 Columns, 数据展示表格的列字段 column
 */

// 从 mongoose.js 中导出 mongoose, Schema 两个变量
var { mongoose, Schema } = require('../utils/mongoose')

// 新建 ColumnSchema
var ColumnSchema = new Schema({
  table   : String,
  columns : Array
}, { versionKey: false })

// 根据 ColumnSchema 新建 Column model，对应集合为 users
var Column = mongoose.model('Column', ColumnSchema)

module.exports = Column
