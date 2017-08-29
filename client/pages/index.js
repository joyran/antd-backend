// 主页
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// 导入自定义组件
import DevTools from '../containers/devtools'
import Index from '../containers/index'

import reducers from '../reducers/index'
import configureStore from '../store/configureStore'

// 导入 actions
import { readMenu } from '../actions/menu'
import { readMe } from '../actions/global'

// 初始化 state
const initialState = {
  menu: [],
  datagrid: {
    columns: [],
    dataSource: [],
    selectedRowId: undefined,
    selectedTable: undefined,
    loading: false,
    pagination: {
      skip: 0,
      limit: 10
    }
  },
  rowFormModal: {
    visible: false,
    row: []
  },
  global: {
    siderCollapsed: false,
    menuSelectedKey: 'dashboard',
    me: undefined
  }
}
// 根据 reducers 和 initialState 生成 store
const store = configureStore(reducers, initialState)

// 初始化触发 readMenu action, 加载左边栏导航菜单
store.dispatch(readMenu())

// 请求当前登录用户基本信息
store.dispatch(readMe())

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Index />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('react-root')
)
