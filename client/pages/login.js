// 登录页面

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Login from '../containers/login'
import DevTools from '../containers/devtools'
import configureStore from '../store/configureStore'
import reducers from '../reducers/login'

// 初始化 state
const initialState = {
  login: {
    loading: false,
    label: '登录'
  }
}
// 根据 reducers 和 initialState 生成 store
const store = configureStore(reducers, initialState)

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Login />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('react-root')
)
