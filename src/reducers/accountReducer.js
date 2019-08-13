const accountReducer = (
  state = {
    token: null,
    email: null,
    name: null,
    id: null
  },
  action
) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload.token
      };
    case "REMOVE_TOKEN":
      const { token, ...rest } = state;
      return {
        ...rest
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
    default:
      return state;
  }
};

export default accountReducer;
