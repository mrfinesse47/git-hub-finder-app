const githubReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true };
    case "SET_USERS":
      return { ...state, users: action.payload, loading: false };
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    case "SET_REPOS":
      return { ...state, repos: action.payload, loading: false };
    case "SET_USER_AND_REPOS":
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      };
    default:
      return state;
  }
};

export default githubReducer;
