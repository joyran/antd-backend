/**
 * 数据表格展示 UI 组件
 */

import React, { Component } from 'react'
import { Table } from 'antd'
import { connect } from 'react-redux'
import Toolbar from '../toolbar/index'
import './index.less'
import {
  readColumns,
  readDataSource,
  changePagination,
  selectRow,
  unselectRow,
  selectTable
} from '../../actions/datagrid'
import { updateMenuSelectedKey } from '../../actions/global'


class Datagrid extends Component {
  constructor(props) {
    super(props)
    this.dispatch = this.props.dispatch
    this.onChange = this.onChange.bind(this)
  }
  // 分页组件变化时触发
  onChange(pagination) {
    const limit = pagination.pageSize
    const skip  = (pagination.current - 1) * limit

    this.dispatch(changePagination(skip, limit))
    this.dispatch(readDataSource())
  }

  // 用于第一次挂载时请求
  componentDidMount() {
    const { table } = this.props.match.params
    this.dispatch(selectTable(table))
    this.dispatch(readColumns())
    this.dispatch(readDataSource())
    this.dispatch(updateMenuSelectedKey(table))
  }

  // 当 props 发生改变时请求, 也就是点击 menu 菜单切换不同的 datagrid
  componentWillReceiveProps(nextProps) {
    const { table } = nextProps.match.params
    if (this.props.match.params.table !== table) {
      this.dispatch(selectTable(table))
      this.dispatch(unselectRow())       // 切换到其它表格时必须取消选择
      this.dispatch(readColumns())
      this.dispatch(readDataSource())
      this.dispatch(updateMenuSelectedKey(table))
    }
  }

  render() {
    // 为了能让整个页面高度不溢出， datagrid scroll Y 高度自动计算
    const height = document.body.clientHeight
    const scrollY =  height - 298

    // 被选中的行索引 selectedRowId
    const { selectedRowId, total }  = this.props.datagrid

    // 单击行时修改 selectedRowKeys，从而选中该行
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: [selectedRowId],
      onChange: (selectedRowKeys) => {
        this.dispatch(selectRow(selectedRowKeys[0]))
      }
    }

    // 翻页组件，显示总数
    const pagination = {
      total,
      showSizeChanger: true,
      showTotal: () => `总数 ${total}`
    }

    return (
      <div>
        <Toolbar />
        <Table
          scroll={{ y: scrollY }}
          columns={this.props.datagrid.columns}
          dataSource={this.props.datagrid.dataSource}
          pagination={pagination}
          rowKey="_id"
          loading={this.props.datagrid.loading}
          rowSelection={rowSelection}
          onRowClick={row => this.dispatch(selectRow(row._id))}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Datagrid)
