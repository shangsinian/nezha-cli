import * as userService from '../service/user';


export default {

  namespace: 'user',

  state: {
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/user') {
          dispatch({
            type: 'query',
            payload: location.query
          })
        }
      })
    }
  },

  effects: {
    * query ({ payload }, { call, put }) {
    	console.log(payload)
      const data = yield call(userService.fetch, payload)
      if (data) {
        console.log(data)
      }
    },
  },

  reducers: {
    querySuccess (state, action) {
      const {list, pagination} = action.payload
      return { ...state,
        list,
        loading: false,
        pagination: {
          ...state.pagination,
          ...pagination
        }}
    }
  }

}