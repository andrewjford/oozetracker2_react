import BackendCallout from '../services/BackendCallout';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchRecentExpenses = (token) => {
  return (dispatch) => {
    BackendCallout.getFromApi('/api/v1/reports/recent', token)
      .then(data => {
        return dispatch({
          type: 'FETCH_RECENT_EXPENSES',
          payload: data.rows
        });
      });
  }
}

export const createExpense = (newExpense) => {
  return (dispatch) => {
    BackendCallout.postToApi('/api/v1/expenses', newExpense)
      .then((responseExpense) => {
        return dispatch({
          type: 'NEW_EXPENSE',
          payload: responseExpense,
        })
      });
  }
}

export const updateExpense = (expense) => {
  return (dispatch) => {
    BackendCallout.putToApi(`/api/v1/expenses/${expense.id}`, expense)
      .then((responseExpense) => {
        return dispatch({
          type: 'UPDATE_EXPENSE',
          payload: responseExpense,
        })
      })
  }
}

export const getExpense = (id) => {
  return (dispatch) => {
    BackendCallout.getFromApi('/api/v1/expenses/' + id)
      .then(expense => {
        return dispatch({
          type: 'GET_EXPENSE',
          payload: expense,
        })
      })
  }
}

export const deleteExpense = (id) => {
  return (dispatch) => {
    BackendCallout.delete('/api/v1/expenses/' + id)
      .then(response => {
        return dispatch({
          type: 'DELETE_EXPENSE',
          payload: id,
        })
      });
  }
}

export const getMonthly = (monthObject) => {
  return (dispatch) => {
    BackendCallout.postToApi('/api/v1/reports/monthly', monthObject)
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