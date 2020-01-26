import BackendCallout from "../services/BackendCallout";
import { MonthRequest, ExpenseFormState } from "../types/expenseTypes";
import { Dispatch } from "redux";
import { RootState } from "../types/generalTypes";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchRecentExpenses = () => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    return BackendCallout.getFromApi(
      `${API_URL}/api/v1/expenses?pageSize=10`,
      getState().account.token
    ).then(data => {
      return dispatch({
        type: "FETCH_RECENT_EXPENSES",
        payload: data.expenses
      });
    });
  };
};

export const createExpense = (newExpense: ExpenseFormState) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    return BackendCallout.postToApi(
      `${API_URL}/api/v1/expenses`,
      newExpense,
      getState().account.token
    ).then(responseExpense => {
      return dispatch({
        type: "NEW_EXPENSE",
        payload: responseExpense
      });
    });
  };
};

export const updateExpense = (expense: ExpenseFormState) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    BackendCallout.putToApi(
      `${API_URL}/api/v1/expenses/${expense.id}`,
      expense,
      getState().account.token
    ).then(responseExpense => {
      return dispatch({
        type: "UPDATE_EXPENSE",
        payload: responseExpense
      });
    });
  };
};

export const getExpense = (id: string) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    BackendCallout.getFromApi(
      `${API_URL}/api/v1/expenses/${id}`,
      getState().account.token
    ).then(expense => {
      return dispatch({
        type: "GET_EXPENSE",
        payload: expense
      });
    });
  };
};

export const deleteExpense = (id: string) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    BackendCallout.delete(
      `${API_URL}/api/v1/expenses/${id}`,
      getState().account.token
    ).then(response => {
      return dispatch({
        type: "DELETE_EXPENSE",
        payload: id
      });
    });
  };
};

export const getMonthly = (monthObject: MonthRequest) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    BackendCallout.postToApi(
      `${API_URL}/api/v1/reports/monthly`,
      monthObject,
      getState().account.token
    )
      .then(report => {
        return dispatch({
          type: "GET_MONTHLY",
          payload: report
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const changeMonthlyView = (monthly: MonthRequest) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: "CHANGE_MONTHLY_VIEW",
      payload: monthly
    });
  };
};

export const getAllMonth = (monthString: string, targetDate: Date) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const lastDayOfMonth = new Date(
      targetDate.getFullYear(),
      targetDate.getMonth() + 1,
      0
    );
    const paramsArray = [
      `startDate=${lastDayOfMonth.getFullYear()}-${lastDayOfMonth.getMonth() +
        1}-01`,
      `endDate=${lastDayOfMonth.getFullYear()}-${lastDayOfMonth.getMonth() +
        1}-${lastDayOfMonth.getDate()}`,
      `pageSize=ALL`
    ];

    return BackendCallout.getFromApi(
      `${API_URL}/api/v1/expenses/?` + paramsArray.join("&"),
      getState().account.token
    ).then(response => {
      return dispatch({
        type: "GET_ALL_MONTH",
        payload: {
          monthString,
          expenses: response.expenses
        }
      });
    });
  };
};
