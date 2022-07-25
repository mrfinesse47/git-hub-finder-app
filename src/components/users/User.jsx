import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import GithubContext from "../../context/githubContext";

const User = () => {
  const { login } = useParams();

  const { loading, user, getUser } = useContext(GithubContext);

  useEffect(() => {
    getUser(login);
  }, []);
  if (loading) {
    return <Spinner />;
  }
  return <div>{user.login}</div>;
};

export default User;
