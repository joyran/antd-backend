import { handleActions } from 'redux-actions'

const menu = handleActions({
  READ_MENU_SUCCESS: (state, action) => (action.payload)
}, [])

export default menu
