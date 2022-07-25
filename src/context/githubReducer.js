const githubReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true };
    case "SET_USERS":
      return { ...state, users: action.payload, loading: false };
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    default:
      return state;
  }
};

export default githubReducer;
