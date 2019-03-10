import BackendCallout from '../services/BackendCallout';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchExpenses = filter => {
  return (dispatch) => {
    BackendCallout.getFromApi('/api/v1/reports/recent')
      .then(data => {
        return dispatch({
          type: 'FETCH_EXPENSES',
          payload: data.rows
        });
      });

  }
}