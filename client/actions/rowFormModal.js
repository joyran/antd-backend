// rowFormModal actions

import fetch from 'isomorphic-fetch'
import { message } from 'antd'
import { createActions } from 'redux-actions'
import { readDataSource, unselectRow } from './datagrid'

const networkErrorMsg = '网络异常，请刷新重试！'

// 使用 createActions 批量创建 actions
export const {
  openFormModal, closeFormModal, changeFormModalTitle,
  readRowStart, readRowSuccess, readRowFail,
  createRowStart, createRowSuccess, createRowFail,
  updateRowStart, updateRowSuccess, updateRowFail,
  deleteRowStart, deleteRowSuccess, deleteRowFail
} = createActions(
  'OPEN_FORM_MODAL', 'CLOSE_FORM_MODAL', 'CHANGE_FORM_MODAL_TITLE',
  'READ_ROW_START', 'READ_ROW_SUCCESS', 'READ_ROW_FAIL',
  'CREATE_ROW_START', 'CREATE_ROW_SUCCESS', 'CREATE_ROW_FAIL',
  'UPDATE_ROW_START', 'UPDATE_ROW_SUCCESS', 'UPDATE_ROW_FAIL',
  'DELETE_ROW_START', 'DELETE_ROW_SUCCESS', 'DELETE_ROW_FAIL'
)

// 根据 table 和 rowId 读取行详细内容
export function readRow() {
  return (dispatch, getState) => {
    dispatch(readRowStart())
    const { selectedTable, selectedRowId } = getState().datagrid
    return fetch(`/api/source/${selectedTable}/${selectedRowId}`, {
      credentials: 'include',
      method: 'get'
    })
      .then(res => res.json())
      .then((res) => {
        if (res.status === 200) {
          // 请求文档成功才打开模态框
          dispatch(readRowSuccess(res.row))
          dispatch(openFormModal())
          dispatch(changeFormModalTitle('更新'))
        } else {
          // 请求数据失败弹出错误警告框
          dispatch(readRowFail())
          message.error(res.msg, 3)
        }
      })
      .catch((err) => {
        dispatch(readRowFail())
        message.error(networkErrorMsg, 3)
        console.error(err.message)
      })
  }
}

/**
 * 新增行
 */
export function createRow(row) {
  return (dispatch, getState) => {
    dispatch(createRowStart())
    const { selectedTable } = getState().datagrid
    return fetch(`/api/source/${selectedTable}`, {
      credentials: 'include',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(row)
    })
      .then(res => res.json())
      .then((res) => {
        if (res.status === 201) {
          // 新增文档成功关闭模态框并请求新的文档
          dispatch(closeFormModal())
          dispatch(readDataSource())
          message.info('新增成功', 3)
        } else {
          // 新增文档失败弹出错误警告框
          message.error('新增失败', 3)
        }
      })
      .catch((err) => {
        message.error(networkErrorMsg, 3)
        console.error(err.message)
      })
  }
}


/**
 * 更新行
 */
export function updateRow(row) {
  return (dispatch, getState) => {
    dispatch(updateRowStart())
    const { selectedTable, selectedRowId } = getState().datagrid
    return fetch(`/api/source/${selectedTable}/${selectedRowId}`, {
      credentials: 'include',
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(row)
    })
      .then(res => res.json())
      .then((res) => {
        if (res.status === 201) {
          // 更新行成功关闭模态框并请求新的文档
          dispatch(closeFormModal())
          dispatch(readDataSource())
          message.info('更新成功', 3)
        } else {
          // 更新文档失败弹出错误警告框
          message.error('更新失败', 3)
        }
      })
      .catch((err) => {
        message.error(networkErrorMsg, 3)
        console.error(err.message)
      })
  }
}


// 删除行
export function deleteRow() {
  return (dispatch, getState) => {
    dispatch(deleteRowStart())
    const { selectedTable, selectedRowId } = getState().datagrid
    return fetch(`/api/source/${selectedTable}/${selectedRowId}`, {
      credentials: 'include',
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status === 204) {
          // 删除文档成功取消选中行并请求新的文档
          dispatch(unselectRow())
          dispatch(readDataSource())
          message.info('删除成功', 3)
        } else {
          // 删除文档失败弹出错误警告框
          message.error('删除失败', 3)
        }
      })
      .catch((err) => {
        console.error(err.message)
        message.error(networkErrorMsg, 3)
      })
  }
}
