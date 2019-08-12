const accountReducer = (
  state = {
    token: null,
    email: null,
    name: null,
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
      }
    default:
      return state;
  }
};

export default accountReducer;
