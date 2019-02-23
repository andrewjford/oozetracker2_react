const expensesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_RECENT_EXPENSES':
      return {
        ...state,
        expenses: action.payload,

      }
    case 'NEW_EXPENSE':
      return {
        ...state,
        expenses: [action.payload, ...state.expenses]
      }
    default:
      return state
  }
}

export default expensesReducer;
