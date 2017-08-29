/**
 * 合并 reducers
 */

import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import menu     from './menu'
import datagrid from './datagrid'
import global   from './global'
import rowFormModal from './rowFormModal'

// 合并 reducers
const reducers = combineReducers({
  menu,
  datagrid,
  rowFormModal,
  global,
  router: routerReducer
})

export default reducers
