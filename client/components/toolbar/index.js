/**
 * Datagrid 数据展示组件上面的工具栏组件
 */

import React from 'react'
import { Button, message, Modal } from 'antd'
import { connect } from 'react-redux'
import RowFormModal from '../row-form-modal/index'
import {
  openFormModal,
  changeFormModalTitle,
  readRow,
  readRowSuccess,
  deleteRow
} from '../../actions/rowFormModal'
import './index.less'

const confirm = Modal.confirm

const Toolbar = (props) => {
  const { selectedRowId, columns } = props.datagrid
  const { dispatch } = props

  // 新增行
  const create = () => {
    dispatch(readRowSuccess(columns))
    dispatch(openFormModal())
    dispatch(changeFormModalTitle('新增'))
  }

  // 更新行
  const update = () => {
    if (!selectedRowId) {
      message.warn('请选择需要更新的行')
      return
    }

    // 读取行内容，读取成功则打开模态框，反之不打开
    dispatch(readRow())
  }

  // 删除文档
  const del = () => {
    if (!selectedRowId) {
      message.warn('请选择需要删除的行')
      return
    }

    confirm({
      title: '你真的要删除这条记录吗？',
      content: '记录删除后不可恢复！',
      onOk() {
        dispatch(deleteRow())
      },
      onCancel() {}
    })
  }

  return (
    <div className="datagrid-toolbar">
      <Button onClick={create} type="primary">新增</Button>
      <Button onClick={update}>更新</Button>
      <Button onClick={del} type="danger">删除</Button>
      <RowFormModal />
    </div>
  )
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Toolbar)
