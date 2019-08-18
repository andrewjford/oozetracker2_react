const defaultState = {
  token: null,
  email: null,
  name: null,
  id: null
}

const accountReducer = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload.token
      };
    case "ADD_DETAILS":
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name,
        id: action.payload.id
      };
    case "UPDATE_ACCOUNT":
      if (action.payload.name) {
        return {
          ...state,
          name: action.payload.name
        };
      }
      return {
        ...state
      };
    case "PURGE_ACCOUNT_STATE":
        return defaultState;
    default:
      return state;
  }
};

export default accountReducer;
