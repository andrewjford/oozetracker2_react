import BackendCallout from '../components/BackendCallout';

const API_URL = process.env.BACKEND_API_URL;

export const fetchExpenses = filter => {
  return (dispatch) => {
    BackendCallout.getFromApi('/api/v1/expenses')
      .then(data => {
        return dispatch({
          type: 'FETCH_EXPENSES',
          payload: data
        });
      })

  }
}