const accountReducer = (state = {
  token: null,
}, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload.token,
      }
    case 'REMOVE_TOKEN':
      const { token, ...rest } = state;
      return {
        ...rest
      }
    default:
      return state
  }
}

export default accountReducer;
