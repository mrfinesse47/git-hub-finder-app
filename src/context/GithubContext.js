//explained in https://www.udemy.com/course/react-front-to-back-2022/learn/lecture/29768922
import { createContext, useReducer } from "react";
import githubReducer from "./githubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  //reducer needs an initial state
  const initialState = { users: [], user: {}, repos: [], loading: false };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // const clearUsers = () => {
  //   dispatch({ type: "SET_USERS", payload: [] });
  // };

  return (
    // <GithubContext.Provider
    //   value={{
    //     users,
    //     user,
    //     repos,
    //     loading,
    //     getUsers,
    //     clearUsers,
    //     getUser,
    //     getUserRepos,
    //   }}
    // >
    //   {children}
    // </GithubContext.Provider>
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  ); //cildren is the entire app
};

export default GithubContext;
