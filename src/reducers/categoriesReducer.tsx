import {
  CategoriesState,
  CategoriesMap,
  Category
} from "../interfaces/categoryInterfaces";

const defaultState: CategoriesState = {
  displayCategoryInput: false,
  categories: [],
  categoriesMap: {},
  dataFetched: false
};

const categoriesPageReducer = (
  state = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "FETCH_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
        categoriesMap: action.payload.reduce(
          (accum: CategoriesMap, category: Category) => {
            accum[category.id] = category;
            return accum;
          },
          {}
        ),
        dataFetched: true
      };
    case "NEW_CATEGORY":
      const newCategoryMap = {
        ...state.categoriesMap
      };
      newCategoryMap[action.payload.id] = action.payload;
      return {
        ...state,
        categories: [...state.categories, action.payload],
        categoriesMap: newCategoryMap
      };
    case "UPDATE_CATEGORY":
      const updatedCategories = state.categories.map(category => {
        if (category.id === action.payload.id) {
          return action.payload;
        } else {
          return category;
        }
      });
      const updatedCategoryMap = {
        ...state.categoriesMap
      };
      updatedCategoryMap[action.payload.id] = action.payload;

      return {
        ...state,
        categories: updatedCategories,
        categoriesMap: updatedCategoryMap
      };
    case "DELETE_CATEGORY":
      const filteredCategories = state.categories.filter(category => {
        return category.id !== action.payload;
      });
      const filteredCategoryMap = {
        ...state.categoriesMap
      };
      delete filteredCategoryMap[action.payload.id];

      return {
        ...state,
        categories: filteredCategories,
        categoriesMap: filteredCategoryMap
      };
    case "PURGE_CATEGORIES":
      return defaultState;
    default:
      return state;
  }
};

export default categoriesPageReducer;
