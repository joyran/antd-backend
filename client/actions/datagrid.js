// 数据展示表格 actions

import { createActions } from 'redux-actions'
import fetch from 'isomorphic-fetch'
import { message } from 'antd'

const networkErrorMsg = '网络异常，请刷新重试！'

// 使用 createActions 批量创建 actions
export const {
  readDataSourceSuccess,
  changePagination,
  selectRow,
  unselectRow,
  selectTable,
  readColumnsSuccess,
  readColumnsFail,
  readDataSourceStart,
  readDataSourceFail
} = createActions(
  {
    READ_DATA_SOURCE_SUCCESS: [
      dataSource => dataSource,     // payload
      (dataSource, total) => total  // meta
    ]
  },
  'CHANGE_PAGINATION',              // 分页按钮改变时修改 skip 和 limit
  'SELECT_ROW',                     // 选中表格某一行
  'UNSELECT_ROW',                   // 取消选中表格行
  'SELECT_TABLE',                   // 选择表格
  'READ_COLUMNS_SUCCESS',           // 读取表格列表字段成功
  'READ_COLUMNS_FAIL',
  'READ_DATA_SOURCE_START',         // 开始读取表格源数据
  'READ_DATA_SOURCE_FAIL'
)

/**
 * 请求数据表格 columns
 */
export function readColumns() {
  return (dispatch, getState) => {
    const { selectedTable } = getState().datagrid
    return fetch(`/api/columns/${selectedTable}`, {
      credentials: 'include',
      method: 'get'
    })
      .then(res => res.json())
      .then((res) => {
        if (res.status === 200) {
          dispatch(readColumnsSuccess(res.columns))
        } else {
          dispatch(readColumnsFail())
        }
      })
      .catch((err) => {
        message.error(networkErrorMsg, 3)
        console.error(err.message)
      })
  }
}

/**
 * 请求数据表格的源数据 source
 * @param table
 * @param skip  偏移量
 * @param limit 限制量
 */
export function readDataSource() {
  return (dispatch, getState) => {
    dispatch(readDataSourceStart())
    const store = getState()
    const { selectedTable } = store.datagrid
    const { skip, limit } = store.datagrid.pagination
    return fetch(`/api/source/${selectedTable}?skip=${skip}&limit=${limit}`, {
      credentials: 'include',
      method: 'get'
    })
      .then(res => res.json())
      .then((res) => {
        if (res.status === 200) {
          dispatch(readDataSourceSuccess(res.source, res.total))
        } else {
          // 请求失败弹出错误警告框
          dispatch(readDataSourceFail())
          message.error(res.msg, 3)
        }
      })
      .catch((err) => {
        dispatch(readDataSourceFail())
        message.error(networkErrorMsg, 3)
        console.error(err.message)
      })
  }
}
