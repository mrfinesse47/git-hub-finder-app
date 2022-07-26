const githubReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      console.log("setting loading");
      return { ...state, loading: true };
    case "SET_USERS":
      return { ...state, users: action.payload, loading: false };
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    case "SET_REPOS":
      return { ...state, repos: action.payload, loading: false };
    default:
      return state;
  }
};

export default githubReducer;
