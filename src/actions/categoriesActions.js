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
  return (dispatch) => {
    BackendCallout.postToApi('/api/v1/categories', newCategory)
      .then((response) => {
        return dispatch({
          type: 'NEW_CATEGORY',
          payload: response
        })
      });
  }
}

export const updateCategory = (categoryToUpdate) => {
  return (dispatch) => {
    BackendCallout.putToApi(`/api/v1/categories/${categoryToUpdate.id}`, categoryToUpdate)
      .then((responseCategory) => {
        return dispatch({
          type: 'UPDATE_CATEGORY',
          payload: responseCategory
        })
      });
  }
}

export const deleteCategory = (categoryToDelete) => {
  return (dispatch) => {
    BackendCallout.delete(`/api/v1/categories/${categoryToDelete.id}`)
      .then((response) => {
        return dispatch({
          type: 'DELETE_CATEGORY',
          payload: categoryToDelete.id
        })
      });
  }
}