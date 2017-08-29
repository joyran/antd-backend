/**
 * 左边栏导航菜单 UI 组件
 */

import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './index.less'

const SubMenu = Menu.SubMenu

const Menus = (props) => {
  // 递归生成菜单栏
  const recursion = (dataSource) => {
    if (dataSource.length) {
      return (
        dataSource.map((menu) => {
          if (menu.children) {
            return (
              <SubMenu key={menu.key} title={<span><Icon type={menu.icon} /><span>{menu.title}</span></span>}>
                { recursion(menu.children) }
              </SubMenu>
            )
          }

          return (
            <Menu.Item key={menu.key}>
              <Link to={menu.link}>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
              </Link>
            </Menu.Item>
          )
        })
      )
    }
  }

  const { menuSelectedKey } = props.global

  return (
    <div>
      {<div className="logo">
        <img src="/logo.svg" alt="logo" />
      </div>}
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[menuSelectedKey]}
      >
        { recursion(props.dataSource) }
      </Menu>
    </div>
  )
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Menus)
