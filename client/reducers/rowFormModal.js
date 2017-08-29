// 行 更新，删除，新增 actions

import { handleActions } from 'redux-actions'

const rowFormModal = handleActions({
  OPEN_FORM_MODAL: state => ({
    ...state,
    visible: true,
    saveBtnLoading: false
  }),

  CLOSE_FORM_MODAL: state => ({
    ...state,
    visible: false,
    saveBtnLoading: false,
    row: []
  }),

  CHANGE_FORM_MODAL_TITLE: (state, action) => ({
    ...state,
    title: action.payload
  }),

  READ_ROW_SUCCESS: (state, action) => ({
    ...state,
    row: action.payload
  }),

  CREATE_ROW_START: state => ({
    ...state,
    saveBtnLoading: true
  }),

  CREATE_ROW_SUCCESS: state => ({
    ...state,
    saveBtnLoading: false
  }),

  CREATE_ROW_FAIL: state => ({
    ...state,
    saveBtnLoading: false
  }),

  UPDATE_ROW_START: state => ({
    ...state,
    saveBtnLoading: true
  }),

  UPDATE_ROW_SUCCESS: state => ({
    ...state,
    saveBtnLoading: false
  }),

  UPDATE_ROW_FAIL: state => ({
    ...state,
    saveBtnLoading: false
  })
}, {})

export default rowFormModal
