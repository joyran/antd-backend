/**
 *  Header UI 组件
 */

import React from 'react'
import { Icon, Tooltip } from 'antd'
import { connect } from 'react-redux'
import { logout } from '../../actions/login'
import './index.less'

const Head = (props) => {
  const { me } = props.global
  const { dispatch } = props
  return (
    <div>
      <Tooltip title="退出登录">
        <Icon type="poweroff" className="logout" onClick={() => dispatch(logout())} />
      </Tooltip>
      <span className="user">欢迎你，{me}</span>
    </div>
  )
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Head)
