/**
 * 登录 reducer
 */

import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

const login = handleActions({
  LOGIN_START: () => ({
    loading: true,
    label: '正在登录...'
  }),

  LOGIN_FAILED: () => ({
    loading: false,
    label: '登录'
  })
}, {})

const reducers = combineReducers({
  login
})

export default reducers
