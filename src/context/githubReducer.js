const githubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: true };
    case "SET_USERS":
      return { ...state, users: action.payload.items, loading: false };
    default:
      return state;
  }
};

export default githubReducer;
