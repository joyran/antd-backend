// 登录 actions

import fetch from 'isomorphic-fetch'
import { message } from 'antd'
import { createActions } from 'redux-actions'

const networkErrorMsg = '网络异常，请刷新重试！'

// 批量创建 actions
const { loginStart, loginFailed } = createActions('LOGIN_START', 'LOGIN_FAILED')

/**
 * 登录 action 构造函数
 * @param username 用户名
 * @param password 密码
 * @param remember 下次自动登录，true or false
 */
export function login(username, password, remember) {
  return (dispatch) => {
    dispatch(loginStart())
    return fetch('/api/session', {
      credentials: 'include',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        remember
      })
    })
      .then(res => res.json())
      .then((res) => {
        if (res.status === 201) {
          // 验证成功跳转到主页
          location.href = '/'
        } else {
          // 验证失败提示用户错误消息
          message.error(res.msg, 5)
          dispatch(loginFailed())
        }
      })
      .catch((err) => {
        console.error(err.message)
        message.error(networkErrorMsg, 5)
        dispatch(loginFailed())
      })
  }
}

/**
 * 退出登录
 */
export function logout() {
  return () => {
    return fetch('/api/session', {
      credentials: 'include',
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status === 204) {
          // 退出成功跳转到登录页面
          location.href = '/login'
        }
      })
      .catch((err) => {
        console.error(err.message)
        message.error(networkErrorMsg, 5)
      })
  }
}
