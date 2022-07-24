//explained in https://www.udemy.com/course/react-front-to-back-2022/learn/lecture/29768922
import { createContext, useReducer } from "react";
import githubReducer from "./githubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  //reducer needs an initial state
  const initialState = { users: [], loading: false };
  //nice futher destructuring would normally be [state,dispatch]
  const [{ users, loading }, dispatch] = useReducer(
    githubReducer,
    initialState
  );

  const clearUsers = () => {
    dispatch({ type: "SET_USERS", payload: [] });
  };

  //get users after search
  const getUsers = async (text) => {
    const params = new URLSearchParams({ q: text });
    setLoading();
    const response = await fetch(`${GITHUB_URL}search/users?${params}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` },
    });
    const { items } = await response.json();

    //I guess the magic is that the payload can be different based on the type
    dispatch({ type: "SET_USERS", payload: items });
  };
  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
    //you can dispatch with no payload as well
  };
  // the context provider will wrap everything in app
  // user search calls usecontext

  return (
    <GithubContext.Provider value={{ users, loading, getUsers, clearUsers }}>
      {children}
    </GithubContext.Provider>
  ); //cildren is the entire app
};

export default GithubContext;
