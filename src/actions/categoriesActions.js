import BackendCallout from '../services/BackendCallout';

export const fetchCategories = filter => {
  return (dispatch) => {
    BackendCallout.getFromApi('/api/v1/categories')
      .then(data => {
        return dispatch({
          type: 'FETCH_CATEGORIES',
          payload: data.rows
        });
      });
  }
}