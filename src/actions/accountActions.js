import BackendCallout from '../services/BackendCallout';
import { fetchRecentExpenses } from './expenseActions';
import { fetchCategories } from './categoriesActions';

const API_URL = process.env.REACT_APP_API_URL;

export const login = (account) => {
  return (dispatch) => {
    dispatch(loginCallout(account))
      .then(() => {
        dispatch(fetchRecentExpenses());
      })
      .then(() => {
        dispatch(fetchCategories());
      })
      .catch(error => console.log('login failed'))
  }
}

export const loginCallout = (account) => {
  console.log('here     '+process.env.REACT_APP_API_URL);
  return (dispatch) => {
    return BackendCallout.postToApi(`${API_URL}/api/v1/login`, account)
      .then(response => {
        const expiryDate = new Date();
        expiryDate.setSeconds(response.tokenExpiration);
        localStorage.setItem('token', response.token);
        localStorage.setItem('expiryDate', expiryDate);

        return dispatch({
          type: 'SET_TOKEN',
          payload: {token: response.token},
        });
      })
      .catch(error => console.log('login callout failed' + error.message));
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiryDate');

  return (dispatch) => {
    return dispatch({
      type: 'REMOVE_TOKEN',
      payload: null,
    })
  }
}

export const setTokenFromLocalStorage = (token) => {
  return (dispatch) => {
    return dispatch({
      type: 'SET_TOKEN',
      payload: {token},
    });
  }
}

export const register = (form) => {
  return (dispatch) => {
    dispatch(registerCallout(form))
      .then(() => {
        dispatch(fetchRecentExpenses());
      })
      .then(() => {
        dispatch(fetchCategories());
      })
      .catch(error => console.log('register failed'));
  }
}

export const registerCallout = (form) => {
  return (dispatch, getState) => {
    return BackendCallout.postToApi('/api/v1/register', form, getState().account.token)
      .then((response) => {
        const expiryDate = new Date();
        expiryDate.setSeconds(response.tokenExpiration);
        localStorage.setItem('token', response.token);
        localStorage.setItem('expiryDate', expiryDate);

        return dispatch({
          type: 'SET_TOKEN',
          payload: {token: response.token},
        });
      });
  }
}
