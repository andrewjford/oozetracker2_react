import BackendCallout from '../services/BackendCallout';

const API_URL = process.env.BACKEND_API_URL;

export const fetchRecentExpenses = filter => {
  return (dispatch) => {
    BackendCallout.getFromApi('/api/v1/reports/recent')
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