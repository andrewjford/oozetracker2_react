import BackendCallout from '../services/BackendCallout';
import { fetchRecentExpenses } from './expenseActions';
import { fetchCategories } from './categoriesActions';

const API_URL = process.env.REACT_APP_API_URL;

export const login = (account) => {
  return (dispatch) => {
    BackendCallout.postToApi(`${API_URL}/api/v1/login`, account)
      .then(response => {
        return dispatch({
          type: 'ACCOUNT_LOGIN',
          payload: {token: response.token, id: response.user.id},
        });
      })
      .then((data) => {
        dispatch(fetchRecentExpenses(data.payload.token));
        dispatch(fetchCategories(data.payload.token));
      });

  }
}