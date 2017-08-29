// 登录表单 UI 组件

import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'

// 导入加密模块
import crypto from 'crypto'

// 导入 login action
import { login } from '../../actions/login'

// 导入 less 文件
import './index.less'

const FormItem = Form.Item

const LoginUI = (props) => {
  const { getFieldDecorator } = props.form
  const { dispatch } = props

  const handleSubmit = (e) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        const username = values.username
        const password = crypto.createHash('md5').update(values.password).digest('hex')
        const remember = values.remember
        dispatch(login(username, password, remember))
      }
    })
  }


  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <h1>Antd · 登录</h1>
      <FormItem>
        { getFieldDecorator('username', {
          rules: [{ required: true, message: '请输入用户名/邮箱' }],
        })(
          <Input placeholder="用户名/邮箱" />
        )}
      </FormItem>
      <FormItem>
        { getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码' }],
        })(
          <Input type="password" placeholder="密码" />
        )}
      </FormItem>
      <FormItem>
        { getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(
          <Checkbox>下次自动登录</Checkbox>
        )}
        <a>忘记密码</a>
        <Button
          type="primary"
          htmlType="submit"
          loading={props.login.loading}
        >
          {props.login.label}
        </Button>
      </FormItem>
    </Form>
  )
}

const Login = Form.create()(LoginUI)

export default Login
