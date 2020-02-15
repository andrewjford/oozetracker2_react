import { ExpenseState, Expense } from "../types/expenseTypes";

const defaultState: ExpenseState = {
  monthlies: {},
  expenses: {},
  dataFetched: false,
  byMonth: {}
};

const expensesReducer = (
  state = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "FETCH_RECENT_EXPENSES":
      const expenseMap = action.payload.reduce((map: any, expense: Expense) => {
        map[expense.id] = expense;
        return map;
      }, {});
      return {
        ...state,
        expenses: {
          ...state.expenses,
          ...expenseMap
        },
        dataFetched: true
      };
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: {
          ...state.expenses,
          [action.payload.id]: action.payload
        }
      };
    case "DELETE_EXPENSE":
      const afterDelete = {
        ...state,
        expenses: {
          ...state.expenses
        }
      };

      delete afterDelete.expenses[action.payload];

      return afterDelete;
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
      const expensesForMap = action.payload.expenses.reduce(
        (map: any, expense: Expense) => {
          map[expense.id] = expense;
          return map;
        },
        {}
      );

      return {
        ...state,
        expenses: {
          ...state.expenses,
          ...expensesForMap
        },
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
