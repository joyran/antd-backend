// 登录表单容器组件
import { connect } from 'react-redux'
import Login from '../components/login/index'

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(Login)
