import merge from 'lodash/merge';

// ------------------------------------
// Constants
// ------------------------------------
export const INFO_UPDATE = 'INFO_UPDATE'
// export const RESULTS_LOAD_MORE = 'RESULTS_LOAD_MORE'
// export const RESULTS_LOADING = 'RESULTS_LOADING'

// ------------------------------------
// Actions
// ------------------------------------
export function info_update (info = {}) {
  return {
    type    : INFO_UPDATE,
    payload : info
  }
}

// export function loading (load = false) {
//   return {
//     type    : RESULTS_REFRESH,
//     loading : load
//   }
// }

// export function loadmore (data = []) {
//   return {
//     type    : RESULTS_REFRESH,
//     list : data
//   }
// }

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

// export const doubleAsync = () => {
//   return (dispatch, getState) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         dispatch({
//           type    : COUNTER_DOUBLE_ASYNC,
//           payload : getState().counter
//         })
//         resolve()
//       }, 200)
//     })
//   }
// }

export const actions = {
info_update
  // loading,
  // loadmore
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INFO_UPDATE] : (state, action) => {
     return merge({}, state,{
       info:action.payload
     })
  },
  // [RESULTS_LOADING] : (state, action) => {
  //   return merge({}, state,{
  //      loading:action.loading
  //    })
  // },
  // [RESULTS_LOAD_MORE] : (state, action) => {
  //   return merge({}, state,{
  //      list:[...state.list, ...list]
  //    })
  // }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
   info: {}
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
