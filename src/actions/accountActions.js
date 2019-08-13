import BackendCallout from "../services/BackendCallout";
import { fetchRecentExpenses } from "./expenseActions";
import { fetchCategories } from "./categoriesActions";

const API_URL = process.env.REACT_APP_API_URL;

export const login = account => {
  return dispatch => {
    return BackendCallout.postToApi(`${API_URL}/api/v1/login`, account)
      .then(response => {
        const expiryDate = new Date();
        expiryDate.setSeconds(response.tokenExpiration);
        localStorage.setItem("token", response.token);
        localStorage.setItem("expiryDate", expiryDate);

        return dispatch({
          type: "SET_TOKEN",
          payload: { token: response.token }
        });
      })
      .then(() => {
        dispatch(fetchRecentExpenses());
      })
      .then(() => {
        dispatch(fetchCategories());
      });
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiryDate");

  return dispatch => {
    return dispatch({
      type: "REMOVE_TOKEN",
      payload: null
    });
  };
};

export const setTokenFromLocalStorage = token => {
  return dispatch => {
    return dispatch({
      type: "SET_TOKEN",
      payload: { token }
    });
  };
};

export const register = form => {
  return (dispatch, getState) => {
    return BackendCallout.postToApi(
      `${API_URL}/api/v1/register`,
      form,
      getState().account.token
    )
      .then(response => {
        const expiryDate = new Date();
        expiryDate.setSeconds(response.tokenExpiration);
        localStorage.setItem("token", response.token);
        localStorage.setItem("expiryDate", expiryDate);

        return dispatch({
          type: "SET_TOKEN",
          payload: { token: response.token }
        });
      })
      .then(() => {
        dispatch(fetchRecentExpenses());
      })
      .then(() => {
        dispatch(fetchCategories());
      });
  };
};

export const getDetails = () => {
  return (dispatch, getState) => {
    return BackendCallout.getFromApi(
      `${API_URL}/api/v1/account`,
      getState().account.token
    ).then(response => {
      return dispatch({
        type: "ADD_DETAILS",
        payload: response
      });
    });
  };
};

export const updateAccount = updatedAccount => {
  return (dispatch, getState) => {
    const account = getState().account;
    return BackendCallout.putToApi(
      `${API_URL}/api/v1/accounts/${account.id}`,
      updatedAccount,
      account.token
    ).then(response => {
      return dispatch({
        type: "UPDATE_ACCOUNT",
        payload: response
      });
    });
  };
};
