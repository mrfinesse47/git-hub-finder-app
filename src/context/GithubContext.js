//explained in https://www.udemy.com/course/react-front-to-back-2022/learn/lecture/29768922
import { createContext, useReducer } from "react";
import githubReducer from "./githubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = { users: [], loading: false };
  const [state, dispatch] = useReducer(githubReducer, initialState);

  //get initial users only testing purposes
  const fetchUsers = async () => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}users`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    });
    const data = await response.json();

    dispatch({ type: "GET_USERS", payload: data });
  };
  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };
  // the context provider will wrap everything in app
  // fetch users will be called when the desired component loads by using useeffect

  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, fetchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
