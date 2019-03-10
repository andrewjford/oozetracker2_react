import BackendCallout from '../services/BackendCallout';

const API_URL = process.env.REACT_APP_API_URL;

export const login = (account) => {
  return (dispatch) => {
    BackendCallout.postToApi(`${API_URL}/api/v1/login`, account)
      .then(response => {
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

export const setTokenFromLocalStorage = (token) => {
  return (dispatch) => {
    return dispatch({
      type: 'SET_TOKEN',
      payload: {token},
    });
  }
}