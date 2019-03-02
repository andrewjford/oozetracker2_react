const expensesReducer = (state = {
  monthlies: {
    monthlies: [],
  },
}, action) => {
  switch (action.type) {
    case 'FETCH_RECENT_EXPENSES':
      return {
        ...state,
        expenses: action.payload,

      }
    case 'NEW_EXPENSE':
      const sortedExpenses = [action.payload, ...state.expenses].sort((a,b) => new Date(a.date) - new Date(b.date));
      return {
        ...state,
        expenses: sortedExpenses,
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
    case 'GET_MONTHLY':
      return {
        ...state,
        monthlies: {
          currentView: action.payload,
          monthlies: [...state.monthlies.monthlies, action.payload]
        },
      }
    case 'CHANGE_MONTHLY_VIEW':
      return {
        ...state,
        monthlies: {
          ...state.monthlies,
          currentView: action.payload,
        }
      }
    default:
      return state
  }
}

export default expensesReducer;
