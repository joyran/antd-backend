// 左边栏菜单 actions

import fetch from 'isomorphic-fetch'
import { createActions } from 'redux-actions'

// 读取菜单成功
export const { readMenuSuccess } = createActions('READ_MENU_SUCCESS')

/**
 * 请求左边栏菜单导航数据
 */
export function readMenu() {
  return (dispatch) => {
    return fetch('/api/menu', {
      credentials: 'include',
      method: 'get'
    })
      .then(res => res.json())
      .then((res) => {
        dispatch(readMenuSuccess(res.menu))
      })
      .catch((err) => {
        console.error(err.message)
      })
  }
}
