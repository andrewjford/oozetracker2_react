import BackendCallout from '../services/BackendCallout';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchRecentExpenses = () => {
  return (dispatch, getState) => {
    return BackendCallout.getFromApi(`${API_URL}/api/v1/reports/recent`, getState().account.token)
      .then(data => {
        return dispatch({
          type: 'FETCH_RECENT_EXPENSES',
          payload: data.rows
        });
      });
  }
}

export const createExpense = (newExpense) => {
  return (dispatch, getState) => {
    BackendCallout.postToApi(`${API_URL}/api/v1/expenses`, newExpense, getState().account.token)
      .then((responseExpense) => {
        return dispatch({
          type: 'NEW_EXPENSE',
          payload: responseExpense,
        })
      });
  }
}

export const updateExpense = (expense) => {
  return (dispatch, getState) => {
    BackendCallout.putToApi(`${API_URL}/api/v1/expenses/${expense.id}`, expense, getState().account.token)
      .then((responseExpense) => {
        return dispatch({
          type: 'UPDATE_EXPENSE',
          payload: responseExpense,
        })
      })
  }
}

export const getExpense = (id) => {
  return (dispatch, getState) => {
    BackendCallout.getFromApi(`${API_URL}/api/v1/expenses/${id}`, getState().account.token)
      .then(expense => {
        return dispatch({
          type: 'GET_EXPENSE',
          payload: expense,
        })
      })
  }
}

export const deleteExpense = (id) => {
  return (dispatch, getState) => {
    BackendCallout.delete(`${API_URL}/api/v1/expenses/${id}`, getState().account.token)
      .then(response => {
        return dispatch({
          type: 'DELETE_EXPENSE',
          payload: id,
        })
      });
  }
}

export const getMonthly = (monthObject) => {
  return (dispatch, getState) => {
    BackendCallout.postToApi(`${API_URL}/api/v1/reports/monthly`, monthObject, getState().account.token)
    .then(report => {
        return dispatch({
          type: 'GET_MONTHLY',
          payload: report,
        });
      })
      .catch(error => {
        console.log(error)
      });
  }
}

export const changeMonthlyView = (monthly) => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_MONTHLY_VIEW',
      payload: monthly,
    })
  }
}