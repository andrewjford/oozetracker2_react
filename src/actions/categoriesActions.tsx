import BackendCallout from "../services/BackendCallout";
import { Dispatch } from "redux";
import { RootState } from "../interfaces/generalInterfaces";
import { Category } from "../interfaces/categoryInterfaces";
const API_URL = process.env.REACT_APP_API_URL;

type GetState = () => RootState;

export const fetchCategories = () => {
  return (dispatch: Dispatch, getState: GetState) => {
    return BackendCallout.getFromApi(
      `${API_URL}/api/v1/categories`,
      getState().account.token
    ).then(data => {
      return dispatch({
        type: "FETCH_CATEGORIES",
        payload: data.rows
      });
    });
  };
};

export const createCategory = (newCategory: Category) => {
  return (dispatch: Dispatch, getState: GetState) => {
    BackendCallout.postToApi(
      `${API_URL}/api/v1/categories`,
      newCategory,
      getState().account.token
    ).then(response => {
      return dispatch({
        type: "NEW_CATEGORY",
        payload: response
      });
    });
  };
};

export const updateCategory = (categoryToUpdate: Category) => {
  return (dispatch: Dispatch, getState: GetState) => {
    BackendCallout.putToApi(
      `${API_URL}/api/v1/categories/${categoryToUpdate.id}`,
      categoryToUpdate,
      getState().account.token
    ).then(responseCategory => {
      return dispatch({
        type: "UPDATE_CATEGORY",
        payload: responseCategory
      });
    });
  };
};

export const deleteCategory = (categoryToDelete: Category) => {
  return (dispatch: Dispatch, getState: GetState) => {
    BackendCallout.delete(
      `${API_URL}/api/v1/categories/${categoryToDelete.id}`,
      getState().account.token
    ).then(response => {
      return dispatch({
        type: "DELETE_CATEGORY",
        payload: categoryToDelete.id
      });
    });
  };
};
