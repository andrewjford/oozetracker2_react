const dataReducer = (
  state = {},
  action) => {
  switch (action.type) {
    case 'FETCH_EXPENSES':
      return {
        ...state,
        expenses: action.payload,

      }
    default:
      return state
  }
}

export default dataReducer;
