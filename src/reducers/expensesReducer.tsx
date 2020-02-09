import { ExpenseState } from "../types/expenseTypes";

const defaultState: ExpenseState = {
  monthlies: {},
  expenses: [],
  dataFetched: false,
  byMonth: {}
};

const expensesReducer = (
  state = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "FETCH_RECENT_EXPENSES":
      return {
        ...state,
        expenses: action.payload,
        dataFetched: true
      };
    case "NEW_EXPENSE":
      const sortedExpenses = [action.payload, ...state.expenses].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return {
        ...state,
        expenses: sortedExpenses
      };
    case "UPDATE_EXPENSE":
      const updatedExpenses = state.expenses.map(expense => {
        if (expense.id === action.payload.id) {
          return action.payload;
        } else {
          return expense;
        }
      });

      return {
        ...state,
        expenses: updatedExpenses
      };
    case "GET_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload]
      };
    case "DELETE_EXPENSE":
      const afterDelete = state.expenses.filter(expense => {
        return expense.id !== action.payload;
      });
      return {
        ...state,
        expenses: afterDelete
      };
    case "GET_MONTHLY":
      const monthString: string = `${action.payload.year}-${action.payload
        .month + 1}`;

      return {
        ...state,
        monthlies: {
          ...state.monthlies,
          [monthString]: action.payload
        }
      };
    case "GET_MONTH_BY_CATEGORY":
      return {
        ...state,
        byMonth: {
          ...state.byMonth,
          [action.payload.monthString]: {
            ...state.byMonth[action.payload.monthString],
            [action.payload.categoryId]: action.payload.expenses
          }
        }
      };
    case "PURGE_EXPENSES":
      return defaultState;
    default:
      return state;
  }
};

export default expensesReducer;
