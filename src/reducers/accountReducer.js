const accountReducer = (state = {
  id: null,
  token: null,
}, action) => {
  switch (action.type) {
    case 'ACCOUNT_LOGIN':
      return {
        ...state,
        id: action.payload.id,
        token: action.payload.token,
      }
    default:
      return state
  }
}

export default accountReducer;
