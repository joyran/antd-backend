import { createStore, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import DevTools from '../containers/devtools'

const history = createHistory()
const middleware = routerMiddleware(history)

const enhancer = compose(
  // 你要使用的中间件，放在前面
  applyMiddleware(middleware, thunk),
  // 必须的！启用带有monitors（监视显示）的DevTools
  DevTools.instrument()
)

export default function configureStore(reducers, initialState = {}) {
  const store = createStore(
    reducers,
    initialState,
    enhancer
  )
  return store
}
