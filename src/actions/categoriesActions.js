import BackendCallout from '../services/BackendCallout';

export const fetchCategories = () => {
  return (dispatch, getState) => {
    BackendCallout.getFromApi('/api/v1/categories', getState().account.token)
      .then(data => {
        return dispatch({
          type: 'FETCH_CATEGORIES',
          payload: data.rows
        });
      });
  }
}

export const createCategory = (newCategory) => {
  return (dispatch, getState) => {
    BackendCallout.postToApi('/api/v1/categories', newCategory, getState().account.token)
      .then((response) => {
        return dispatch({
          type: 'NEW_CATEGORY',
          payload: response
        })
      });
  }
}

export const updateCategory = (categoryToUpdate) => {
  return (dispatch, getState) => {
    BackendCallout.putToApi(`/api/v1/categories/${categoryToUpdate.id}`, categoryToUpdate, getState().account.token)
      .then((responseCategory) => {
        return dispatch({
          type: 'UPDATE_CATEGORY',
          payload: responseCategory
        })
      });
  }
}

export const deleteCategory = (categoryToDelete) => {
  return (dispatch, getState) => {
    BackendCallout.delete(`/api/v1/categories/${categoryToDelete.id}`, getState().account.token)
      .then((response) => {
        return dispatch({
          type: 'DELETE_CATEGORY',
          payload: categoryToDelete.id
        })
      });
  }
}