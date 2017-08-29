// 全局 global actions

import { createActions } from 'redux-actions'
import fetch from 'isomorphic-fetch'

// 使用 createActions 批量创建 actions
export const {
  toogleCollapseSider,
  readMeSuccess,
  updateMenuSelectedKey,
  toogleAdvanceSearch,
  hideAdvanceSearch
} = createActions(
  'TOOGLE_COLLAPSE_SIDER',      // 收起或者展开 sider
  'READ_ME_SUCCESS',            // 读取个人信息
  'UPDATE_MENU_SELECTED_KEY',   // 更新 menu 被选中的 item
  'TOOGLE_ADVANCE_SEARCH',      // 隐藏或者显示高级搜索
  'HIDE_ADVANCE_SEARCH'         // 隐藏高级搜索
)


/**
 * 读取当前登录用户姓名
 */
export function readMe() {
  return (dispatch) => {
    return fetch('/api/user/me', {
      credentials: 'include',
      method: 'get'
    })
      .then(res => res.json())
      .then((res) => {
        dispatch(readMeSuccess(res.user.username))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
}
