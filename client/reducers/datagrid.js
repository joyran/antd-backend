// datagrid reducers

import { handleActions } from 'redux-actions'

const datagrid = handleActions({
  CHANGE_PAGINATION: (state, action) => ({
    ...state,
    pagination: action.payload
  }),

  SELECT_ROW: (state, action) => ({
    ...state,
    selectedRowId: action.payload
  }),

  UNSELECT_ROW: state => ({
    ...state,
    selectedRowId: undefined
  }),

  SELECT_TABLE: (state, action) => ({
    ...state,
    selectedTable: action.payload
  }),

  READ_COLUMNS_SUCCESS: (state, action) => ({
    ...state,
    columns: action.payload
  }),

  READ_COLUMNS_FAIL: state => ({
    ...state,
    columns: []
  }),

  READ_DATA_SOURCE_START: state => ({
    ...state,
    loading: true
  }),

  READ_DATA_SOURCE_SUCCESS: (state, action) => ({
    ...state,
    loading: false,
    dataSource: action.payload,
    total: action.meta
  }),

  READ_DATA_SOURCE_FAIL: state => ({
    ...state,
    loading: false,
    dataSource: [],
    total: 0
  }),
}, {})

export default datagrid
