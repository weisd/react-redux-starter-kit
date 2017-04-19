import merge from 'lodash/merge';

// ------------------------------------
// Constants
// ------------------------------------
export const RESULTS_REFRESH = 'RESULTS_REFRESH'
export const RESULTS_LOAD_MORE = 'RESULTS_LOAD_MORE'
export const RESULTS_LOADING = 'RESULTS_LOADING'

// ------------------------------------
// Actions
// ------------------------------------
export function refresh (data = []) {
  return {
    type    : RESULTS_REFRESH,
    list : data
  }
}

export function loading (load = false) {
  return {
    type    : RESULTS_REFRESH,
    loading : load
  }
}

export function loadmore (data = []) {
  return {
    type    : RESULTS_REFRESH,
    list : data
  }
}

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
  refresh,
  loading,
  loadmore
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RESULTS_REFRESH] : (state, action) => {
     return merge({}, state,{
       list:action.list
     })
  },
  [RESULTS_LOADING] : (state, action) => {
    return merge({}, state,{
       loading:action.loading
     })
  },
  [RESULTS_LOAD_MORE] : (state, action) => {
    return merge({}, state,{
       list:[...state.list, ...list]
     })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
   loading : false,
   list:[1,2]
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
