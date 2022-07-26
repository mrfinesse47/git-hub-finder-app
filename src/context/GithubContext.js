//explained in https://www.udemy.com/course/react-front-to-back-2022/learn/lecture/29768922
import { createContext, useReducer } from "react";
import githubReducer from "./githubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  //reducer needs an initial state
  const initialState = { users: [], user: {}, repos: [], loading: false };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
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
