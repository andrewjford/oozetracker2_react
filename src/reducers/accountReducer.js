const accountReducer = (state = {
  token: null,
}, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload.token,
      }
    default:
      return state
  }
}

export default accountReducer;
