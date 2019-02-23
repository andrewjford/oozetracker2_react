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
    case 'NEW_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      }
    case 'UPDATE_CATEGORY':
      const updatedCategories = state.categories.map((category) => {
        if (category.id === action.payload.id) {
          return action.payload;
        } else {
          return category;
        }
      });

      return {
        ...state,
        categories: updatedCategories,
      }
    case 'DELETE_CATEGORY':
      const filteredCategories = state.categories.filter((category) => {
        return category.id !== action.payload;
      });
      return {
        ...state,
        categories: filteredCategories,
      }
    default:
      return state
  }
}

export default categoriesPageReducer;
