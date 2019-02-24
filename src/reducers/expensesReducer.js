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
    case 'UPDATE_EXPENSE':
      const updatedExpenses = state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return action.payload;
        } else {
          return expense;
        }
      });

      return {
        ...state,
        expenses: updatedExpenses,
      }
    case 'GET_EXPENSE':
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      }
    case 'DELETE_EXPENSE':
      const afterDelete = state.expenses.filter((expense) => {
        return expense.id !== action.payload;
      });
      return {
        ...state,
        expenses: afterDelete
      }
    default:
      return state
  }
}

export default expensesReducer;
