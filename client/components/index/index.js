/**
 * 主页 UI 组件
 */

import React from 'react'
import { Layout } from 'antd'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// 自定义容器组件
import Menus from '../menus/index'
import Head from '../head/index'
import Datagrid from '../datagrid/index'

// 收起展示侧边栏 action
import { toogleCollapseSider } from '../../actions/global'
import './index.less'

const { Header, Content, Sider } = Layout

const Index = (props) => {
  const onCollapse = () => {
    props.dispatch(toogleCollapseSider())
  }

  return (
    <Router>
      <Layout>
        {/* Sider 左边栏菜单导航 */}
        <Sider
          width={160}
          collapsible
          collapsed={props.global.siderCollapsed}
          onCollapse={onCollapse}
        >
          <Menus
            dataSource={props.menu}
          />
        </Sider>
        <Layout>
          {/* Header 头部导航菜单 */}
          <Header>
            <Head />
          </Header>
          {/* Content 主体内容 */}
          <Content>
            <Route exact path="/:table" component={Datagrid} />
          </Content>
        </Layout>
      </Layout>
    </Router>
  )
}

export default Index
