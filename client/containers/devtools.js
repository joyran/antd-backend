// redux devtools
import React from 'react'
import { createDevTools } from 'redux-devtools'

// 显示包是单独的，要额外指定
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import Dispatcher from 'redux-devtools-dispatch'
import MultipleMonitors from 'redux-devtools-multiple-monitors'

// 创建DevTools组件
const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultIsVisible={false}
  >
    <MultipleMonitors>
      <LogMonitor theme="tomorrow" />
      <Dispatcher />
    </MultipleMonitors>
  </DockMonitor>
)

export default DevTools
