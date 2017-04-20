// import merge from 'lodash/merge';

// ------------------------------------
// Constants
// ------------------------------------
export const TOKEN_LOGIN = 'TOKEN_LOGIN'
export const TOKEN_LOGOUT = 'TOKEN_LOGOUT'

// ------------------------------------
// Actions
// ------------------------------------
export function login (token = '') {
  return {
    type    : TOKEN_LOGIN,
    payload : token
  }
}

export function logout () {
  return {
    type    : TOKEN_LOGOUT,
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
  login,
  logout,
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TOKEN_LOGIN] : (state, action) => {
     return action.payload
  },
  [TOKEN_LOGOUT] : (state, action) => {
    return ''
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = ''
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
