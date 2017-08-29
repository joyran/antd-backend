// global reducers

import { handleActions } from 'redux-actions'

const global = handleActions({
  TOOGLE_COLLAPSE_SIDER: state => ({
    ...state,
    siderCollapsed: !state.siderCollapsed
  }),

  READ_ME_SUCCESS: (state, action) => ({
    ...state,
    me: action.payload
  }),

  UPDATE_MENU_SELECTED_KEY: (state, action) => ({
    ...state,
    menuSelectedKey: action.payload
  })
}, {})

export default global
