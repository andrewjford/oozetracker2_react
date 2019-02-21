const categoriesPageReducer = (state = {
  displayCategoryInput: false,
  inlineEditValue: null,
  categories: [],
}, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORIES':
      return {
        ...state,
        categories: action.payload,
      }
    default:
      return state
  }
}

export default categoriesPageReducer;
