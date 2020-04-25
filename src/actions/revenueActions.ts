import BackendCallout from "../services/BackendCallout";
import { Dispatch } from "redux";
import { RootState } from "../interfaces/generalInterfaces";
import { Revenue } from "../interfaces/revenueInterfaces";
const API_URL = process.env.REACT_APP_API_URL;

type GetState = () => RootState;

export const fetchRevenues = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    return BackendCallout.getFromApi(
      `${API_URL}/api/v1/revenues`,
      getState().account.token
    ).then((data) => {
      return dispatch({
        type: "FETCH_REVENUES",
        payload: data.rows,
      });
    });
  };
};

export const createRevenue = (newRevenue: Revenue) => {
  return (dispatch: Dispatch, getState: GetState) => {
    BackendCallout.postToApi(
      `${API_URL}/api/v1/revenues`,
      newRevenue,
      getState().account.token
    ).then((response) => {
      return dispatch({
        type: "NEW_REVENUE",
        payload: response,
      });
    });
  };
};

export const updateRevenue = (revenueToUpdate: Revenue) => {
  return (dispatch: Dispatch, getState: GetState) => {
    BackendCallout.putToApi(
      `${API_URL}/api/v1/revenues/${revenueToUpdate.id}`,
      revenueToUpdate,
      getState().account.token
    ).then((responseRevenue) => {
      return dispatch({
        type: "UPDATE_REVENUE",
        payload: responseRevenue,
      });
    });
  };
};

export const deleteRevenue = (revenueToDelete: Revenue) => {
  return (dispatch: Dispatch, getState: GetState) => {
    BackendCallout.delete(
      `${API_URL}/api/v1/revenues/${revenueToDelete.id}`,
      getState().account.token
    ).then((response) => {
      return dispatch({
        type: "DELETE_REVENUE",
        payload: revenueToDelete.id,
      });
    });
  };
};
